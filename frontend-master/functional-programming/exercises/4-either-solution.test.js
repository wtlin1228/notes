// Definitions
// ====================
const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`,
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`,
})

const fromNullable = x => (x != null ? Right(x) : Left(null))

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const logIt = x => {
  console.log(x)
  return x
}

const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i

// Exercise: Either
// Goal: Refactor each example using Either
// Bonus: no curlies
// =========================

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const street = user =>
  Right(user)
    .chain(user => fromNullable(user.address))
    .chain(address => fromNullable(address.street))
    .fold(
      () => 'no street',
      x => x
    )

test('Ex1: street', () => {
  const user = { address: { street: { name: 'Willow' } } }
  expect(street(user)).toStrictEqual({ name: 'Willow' })
  expect(street({})).toBe('no street')
  expect(street({ address: { street: null } })).toBe('no street')
})

// Ex2: Refactor parseDbUrl to return an Either instead of try/catch
// =========================
const parseDbUrl = cfg =>
  Right(cfg)
    .chain(c => tryCatch(() => JSON.parse(c)))
    .map(x => x.url.match(DB_REGEX))
    .fold(
      () => null,
      x => x
    )

test('Ex2: parseDbUrl', () => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
  expect(parseDbUrl(config)[1]).toBe('sally')
  expect(parseDbUrl()).toBe(null)
})

// Ex3: Using Either and the functions above, refactor startApp
// =========================
const startApp = cfg =>
  fromNullable(parseDbUrl(cfg))
    .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
    .fold(
      () => "can't get config",
      x => x
    )

test('Ex3: startApp', () => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
  expect(String(startApp(config))).toBe('starting mydb, sally, muppets')
  expect(String(startApp())).toBe("can't get config")
})

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
const streetName = user => {
  const address = user.address

  if (address) {
    const street = address.street

    if (street) {
      return street.name
    }
  }

  return 'no street'
}

test('Ex1: streetName', () => {
  const user = { address: { street: { name: 'Willow' } } }
  expect(street(user)).toStrictEqual({ name: 'Willow' })
  expect(street({})).toBe('no street')
  expect(streetName({ address: { street: null } })).toBe('no street')
})

// Ex2: Refactor parseDbUrl to return an Either instead of try/catch
// =========================
const parseDbUrl = cfg => {
  try {
    const c = JSON.parse(cfg) // throws if it can't parse
    return c.url.match(DB_REGEX)
  } catch (e) {
    return null
  }
}

test('Ex2: parseDbUrl', () => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
  expect(parseDbUrl(config)[1]).toBe('sally')
  expect(parseDbUrl()).toBe(null)
})

// Ex3: Using Either and the functions above, refactor startApp
// =========================
const startApp = cfg => {
  const parsed = parseDbUrl(cfg)

  if (parsed) {
    const [_, user, password, db] = parsed
    return `starting ${db}, ${user}, ${password}`
  } else {
    return "can't get config"
  }
}

test('Ex3: startApp', () => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
  expect(String(startApp(config))).toBe('starting mydb, sally, muppets')
  expect(String(startApp())).toBe("can't get config")
})

# Either

## Why Either

```js
const findColor = name =>
  ({
    red: '#ff4444',
    blue: '#3b5998',
    yellow: '#fff68f',
  }[name])

const res = findColor('red') // '#ff4444'
const res = findColor('redd') // undefined
const res = findColor('red').toUpperCase() // '#FF4444'
const res = findColor('redd').toUpperCase() // TypeError: Cannot read property 'toUpperCase' of undefined
```

### how to avoid this error?

```js
const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
})

const findColor = name => {
  const found = {
    red: '#ff4444',
    blue: '#3b5998',
    yellow: '#fff68f',
  }[name]

  return found ? Right(found) : Left('missing')
}

const res = () =>
  findColor('red')
    .map(x => x.toUpperCase())
    .map(x => x.slice(1))
    .fold(
      () => 'no color!',
      x => x
    )

console.log(res())
```

### Introduce fromNullable

```js
const fromNullable = x => (x != null ? Right(x) : Left(x))

const findColor = name =>
  fromNullable(
    {
      red: '#ff4444',
      blue: '#3b5998',
      yellow: '#fff68f',
    }[name]
  )
```

### Introduce tryCatch

```js
const getPort = () => {
  try {
    const str = fs.readFileSync('config.json')
    const config = JSON.parse(str)
    return config.port
  } catch (e) {
    return 3000
  }
}

const result = getPort()
```

transform it into

```js
const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const readFileSync = path => tryCatch(() => fs.readFileSync(path))
const parseJSON = contents => tryCatch(() => JSON.parse(contents))

const getPort = () =>
  readFileSync('config.json')
    .chain(parseJSON)
    .map(config => port)
    .fold(
      () => 8080,
      x => x
    )

const result = getPort()
```

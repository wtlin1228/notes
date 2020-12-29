# Functor

## Introduce Box

Goal: Transform `nextCharForNumberString` into chain format.

```js
const nextCharForNumberString = str => {
  const trimmed = str.trim()
  const number = parseInt(trimmed)
  const nextNumber = new Number(number + 1)
  return String.fromCharCode(nextNumber)
}

const result = nextCharForNumberString('  64 ')

console.log(result) // 'A'
```

```js
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: `Box(${x})`,
})

const nextCharForNumberString = str =>
  Box(str)
    .map(x => x.trim())
    .map(parseInt)
    .map(x => new Number(x + 1))
    .map(String.fromCharCode)
    .fold(x => x)

const result = nextCharForNumberString('  64')

console.log(result) // 'A'
```

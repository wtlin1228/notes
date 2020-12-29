// Setup
//==============
const _ = require('ramda')
const split = _.curry((delimiter, string) => string.split(delimiter))

// Exercise 1
//==============

const words = function (str) {
  return split(' ', str)
}

test('Ex1: split', () => {
  expect(words('Jingle bells Batman smells')).toStrictEqual([
    'Jingle',
    'bells',
    'Batman',
    'smells',
  ])
})

// Exercise 1a
//==============
//use map to make a new words fn that not only works on 1 string, but on an array of strings.

const sentences = xs => _.map(words, xs)

test('Ex1a: map/split', () => {
  expect(
    sentences(['Jingle bells Batman smells', 'Robin laid an egg'])
  ).toStrictEqual([
    ['Jingle', 'bells', 'Batman', 'smells'],
    ['Robin', 'laid', 'an', 'egg'],
  ])
})

// Exercise 2
//==============
const filterQs = function (xs) {
  return _.filter(function (x) {
    return _.test(/q/gi, x)
  }, xs)
}

test('Ex2: filter', () => {
  expect(
    filterQs(['quick', 'camels', 'quarry', 'over', 'quails'])
  ).toStrictEqual(['quick', 'quarry', 'quails'])
})

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max

const _keepHighest = (x, y) => (x >= y ? x : y) // <- leave be

// TODO: rewrite max in its "simplest" form
const max = function (xs) {
  return _.reduce(
    function (acc, x) {
      return _keepHighest(acc, x)
    },
    0,
    xs
  )
}

test('Ex3: max', () => {
  expect(max([323, 523, 554, 123, 5234])).toStrictEqual(5234)
})

// Bonus 1:
// ============
// wrap array's built in slice to be functional and curried like ramda fn's.
// //[1,2,3].slice(0, 2)

const slice = undefined

test('Bonus 1', () => {
  expect(slice(1)(3)(['a', 'b', 'c'])).toStrictEqual(['b', 'c'])
})

// Bonus 2:
// ============
// use slice to define a function take() that takes n elements from an array. make it curried
const take = undefined

test('Bonus 2', () => {
  expect(take(2)(['a', 'b', 'c'])).toStrictEqual(['a', 'b'])
})

# Transforms

Use traverse, we get Task of array instead of array of Tasks

```js
const fs = require('fs')
const { Task, Either, Id } = require('types')
const { Right, Left, fromNullable } = Either
const { List, Map } = require('immutable-ext')

const httpGet = (path, params) => Task.of(`${path}: result`)

const getUser = x => httpGet('/user', { id: x })
const getTimeline = x => httpGet('/timeline/${x}', {})
const getAds = () => httpGet('/ads', {})

List([getUser, getTimeline, getAds])
  .traverse(Task.of, f => f())
  .fork(console.log, x => console.log(x.toJS()))

// [
//   '/user: result',
//   '/timeline/undefined: result',
//   '/ads: result',
// ]
```

Another example

```js
const fs = require('fs')
const { Task, Either, Id } = require('types')
const { Right, Left, fromNullable } = Either
const { List, Map } = require('immutable-ext')

const greaterThan5 = x => (x.length > 5 ? Right(x) : Left('not greater than 5'))

const looksLikeEmail = x => (x.match(/@/gi) ? Right(x) : Left('not an email'))

const email = 'wtlin1228@gmail.com'
const res = List([greaterThan5, lookLikeEmail]).traverse(Either.of, v =>
  v(email)
)
// It's Either([result, result])
// Not [Either(result), Either(result)]

res.fold(console.log, x => console.log(x.toJS()))
// [
//   'wtlin1228@gmail.com',
//   'wtlin1228@gmail.com',
// ]
```

Another example with natural transformation

```js
const fs = require('fs')
const { Task, Either, Id } = require('types')
const { Right, Left, fromNullable } = Either
const { List, Map } = require('immutable-ext')

// nt(a.map(f)) == nt(a).map(f)
const eitherToTask = e => e.fold(Task.rejected, Task.of)

const fake = id => ({ id, name: 'user1', best_friend_id: id + 1 })

const Db = {
  find: id =>
    Task((rej, res) =>
      setTimeout(() => res(id > 2 ? Right(fake(id)) : Left('not found')), 100)
    ),
}

const send = (code, json) =>
  console.log(`sending ${code}: ${JSON.stringify(json)}`)

Db.find(1) // Task(Either(User))
  .chain((
    eu // Either(User)
  ) =>
    eu.fold(
      e => Task.of(eu),
      u => Db.find(u.best_friend_id) // Task(Either(User))
    )
  )
  .fork(
    error => send(500, { error }),
    eu =>
      eu.fold(
        error => send(404, { error }),
        x => send(200, x)
      )
  )

// with natural transformation
Db.find(1) // Task(Either(User))
  .chain(eitherToTask) // Task(User)
  .chain(u => Db.find(u.best_friend_id)) // Task(Either(User))
  .chain(eitherToTask) // Task(User)
  .fork(
    error => send(500, { error }),
    u => send(200, u)
  )
```

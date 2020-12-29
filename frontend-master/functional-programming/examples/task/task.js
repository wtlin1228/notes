const fs = require('fs')

const Task = fork => ({
  fork,
  ap: other =>
    Task((rej, res) => fork(rej, f => other.fork(rej, x => res(f(x))))),
  map: f => Task((rej, res) => fork(rej, x => res(f(x)))),
  chain: f => Task((rej, res) => fork(rej, x => f(x).fork(rej, res))),
  concat: other =>
    Task((rej, res) =>
      fork(rej, x =>
        other.fork(rej, y => {
          console.log('X', x, 'Y', y)
          res(x.concat(y))
        })
      )
    ),
  fold: (f, g) =>
    Task((rej, res) =>
      fork(
        x => f(x).fork(rej, res),
        x => g(x).fork(rej, res)
      )
    ),
})
Task.of = x => Task((rej, res) => res(x))
Task.rejected = x => Task((rej, res) => rej(x))
Task.fromPromised = fn => (...args) =>
  Task((rej, res) =>
    fn(...args)
      .then(res)
      .catch(rej)
  )

// const app = () =>
//   fs.readFile('./config.json', 'utf-8', (err, contents) => {
//     console.log(err, contents)
//     if (err) throw err

//     const newContents = contents.replace(/3/g, '6')

//     fs.writeFile('./config1.json', newContents, (err, _) => {
//       if (err) throw err
//       console.log('success!')
//     })
//   })

const readFile = (path, enc) =>
  Task((rej, res) =>
    fs.readFile(path, enc, (err, contents) => (err ? rej(err) : res(contents)))
  )

const writeFile = (path, contents) =>
  Task((rej, res) =>
    fs.writeFile(path, contents, (err, _) => (err ? rej(err) : res()))
  )

const app = () =>
  readFile('./config.json', 'utf-8')
    .map(contents => contents.replace(/3/g, '6'))
    .chain(contents => writeFile('./config1.json', contents))

app().fork(console.error, () => console.log('success!'))

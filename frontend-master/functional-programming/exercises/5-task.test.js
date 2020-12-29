// SETUP
// =========================

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

const posts = { 1: { title: 'First' }, 2: { title: 'Second' } }

const comments = {
  First: [{ id: 1, body: 'Brilliant!' }],
  Second: [{ id: 2, body: 'Unforgivable' }],
}

const getPost = id =>
  Task((rej, res) =>
    setTimeout(() => (posts[id] ? res(posts[id]) : rej('not found')), 200)
  )

const getComments = post =>
  Task((rej, res) => setTimeout(() => res(comments[post.title]), 200))

// Exercise: Task
// Goal: Refactor each example using Task
// Bonus points: no curly braces

// Ex1: Use the result of getPost() and upperCase the title. Posts and comments are defined above and look like {title: String} and {id: Int, body: String} respectively.
// =========================
const postTitle = (
  id // uppercase the title of the result of getPost()
) => getPost(id)

test('Ex1: postTitle', done => {
  postTitle(1).fork(done, t => {
    expect(t).toBe('FIRST')
    done()
  })
})

// Ex2: pass in the post to getComments(), defined above, then assign the returned comments to the post
// =========================
const commentsForPost = id => getPost(id)

test('Ex2: commentsForPost', done => {
  commentsForPost(2).fork(done, t => {
    expect(t.title).toBe('Second')
    expect(t.comments).toBe(comments['Second'])
    done()
  })
})

// Ex3: Wrap location.href in a Task to make it "pure"
// =========================
const getHref = location.href // wrap me in Task

test('Ex3: getHref', done => {
  getHref.fork(done, t => {
    expect(!!t.match('cdpn.io')).toBe(false)
    done()
  })
})

# `tsc` examples

## TODO

- [ ] compile with `lib` as the output directory
- [ ] compile in "watch mode"
- [ ] compile with declaration file output
- [ ] compile to ES2015 vs commonjs modules
- [ ] use a `tsconfig.json`
  - [ ] source maps
  - [ ] declaration maps
  - [ ] module target (`es3` vs `es5` vs `es2017`)

## Notes

1. `$ node_modules/.bin/tsc examples/hello-ts/src/index.ts`
   This version is compatible with IE6.

2. `node_modules/.bin/tsc examples/hello-ts/src/index.ts --target ES2015`
   Promise came back, but no async & await.

3. `node_modules/.bin/tsc examples/hello-ts/src/index.ts --target ES2017`
   Async & await came back.

4. `node_modules/.bin/tsc examples/hello-ts/src/index.ts --target ES2017 --module commonjs`
   Make it runnable in node.

5. `node_modules/.bin/tsc examples/hello-ts/src/index.ts --target ES2017 --module commonjs --watch`
   Run it in watch mode.

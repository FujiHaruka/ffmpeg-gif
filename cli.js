#!/usr/bin/env node

const pkg = require('./package.json')
const commander = require('commander')

let argGiven = false

commander
  .version(pkg.version)
  .arguments('<input> <output>')
  .option('-f, --fps <fps>', 'fps', '20')
  .option('-s, --scale <scale>', 'resize to width:height')
  .option('-S, --seek <seek>', 'seek to time')
  .option('-t, --time <time>', 'total duration')
  .action((input, output, { fps, scale, seek, time }) => {
    argGiven = true
    // TODO
  })
  .parse(process.argv)

if (!argGiven) {
  commander.help()
}

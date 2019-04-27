var fs = require('fs')
var path = require('path')
var readline = require('readline')
var program = require('commander')
var rc = require('../rc')
var exit_bak = process.exit
program
  .version('0.0.1')
  .allowUnknownOption()
  .option('-r, --registry <registry>', 'use custom registry', rc.registry)
  .option('-d, --dist-url <disturl>', 'use custom dist url', rc.disturl)
  .option('-l, --log-level <loglevel>', 'use custom log level', rc.loglevel)
program.parse(process.argv)
program.registry && (rc.registry = program.registry)
program.distUrl && (rc.disturl = program.distUrl)
program.logLevel && (rc.loglevel = program.logLevel)
if (!_exit.exited) {
  _main()
}
// Graceful exit for async STDIO
function _exit(code) {
  var draining = 0
  var streams = [process.stdout, process.stderr]

  function done() {
    if (!(draining--)) {
      exit_bak(code)
    }
  }
  _exit.exited = true
  streams.forEach(function (stream) {
    draining += 1
    stream.write('', done)
  })
  done()
}

function _confirm(msg, cb) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(msg, function (input) {
    rl.close()
    cb(/^y|yes|ok|true$/i.test(input))
  })
}

function _write(path, content, mode) {
  fs.writeFileSync(path, content, {
    mode: mode || 0o666
  })
  console.log('success!!!')
}

function _generateFile(filePath) {
  var content = 'registry={registry}\ndisturl={disturl}\nloglevel={loglevel}\n'
  content = content.replace(/\{(\w+)\}/gi, function (a, b) {
    return rc[b]
  })
  _write(filePath, content)
}

function _overwrite(filePath) {
  _generateFile(filePath)
}

function _existNpmRC(filePath) {
  fs.exists(filePath, function (exists) {
    if (exists) {
      _confirm('ATTENTION: .npmrc is exist, over write? [y/N] ', function (ans) {
        ans ? _overwrite(filePath) : console.log('bye!')
      })
    } else {
      _generateFile(filePath)
    }
  })
}

function _main() {
  var filePath = path.resolve(process.cwd(), '.npmrc')
  console.log('writing path: ' + filePath)
  _existNpmRC(filePath)
}
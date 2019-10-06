const path = require('path')
const gify = require('../gify')

process.chdir(path.join(__dirname, '..'))

gify('test/test.mp4', 'tmp/out.gif', {
  fps: '5',
  scale: '120:-1',
  seek: '2',
  time: '3',
})

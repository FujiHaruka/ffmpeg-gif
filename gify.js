const spawn = require('child_process').spawn;
const ffmpeg = require('@ffmpeg-installer/ffmpeg')
const rimraf = require('rimraf');
const flat = (a, b) => a.concat(b);

function gify (input, output, options) {
  const suffix = '__tmp__palette_' + Date.now() + '.png';
  const tmpFileName = input + suffix;
  let needsCleanup = false;

  const ss = options.start ? ['-ss', options.start] : '';
  const t = options.time ? ['-t', options.time] : '';
  const inputFlag = ['-i', input];
  const fps = 'fps=' + (options.fps || 20) + '';
  const scale = options.scale ? ('scale=' + options.scale + ':flags=lanczos') : '';
  const filterStr = [fps, scale].filter(Boolean).join(',');
  const filter1 = ['-vf', filterStr + ',palettegen'];
  const filter2 = ['-filter_complex', filterStr + '[x];[x][1:v]paletteuse'];

  const pass1Flags = ['-y', ss, t, inputFlag, filter1, tmpFileName].filter(Boolean).reduce(flat, []);
  const pass2Flags = ['-y', ss, t, inputFlag, '-i', tmpFileName, filter2, '-f', 'gif', output].filter(Boolean).reduce(flat, []);
  const proc = spawn(ffmpeg.path, pass1Flags, { stdio: 'inherit' });
  proc.on('exit', code => {
    needsCleanup = true;
    if (code !== 0) return bail(code);
    const proc2 = spawn(ffmpeg.path, pass2Flags, { stdio: 'inherit' });
    proc2.on('exit', code => {
      if (code !== 0) return bail(code);
      finish();
    });
  });

  function bail(exitCode) {
    console.error(new Error('Exited with code ' + exitCode));
    finish();
  }

  function finish() {
    if (!needsCleanup) return;
    rimraf.sync(tmpFileName);
    needsCleanup = false;
  }

  process.on('exit', () => {
    finish();
  });

  process.on('SIGINT', (code) => {
    finish();
    process.exit(code);
  });
}

module.exports = gify

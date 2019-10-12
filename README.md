# node-gify-cli

Forked from [Jam3/ffmpeg-gif](https://github.com/Jam3/ffmpeg-gif).

A small script that converts videos to a high quality GIF, by spawning `ffmpeg` in two passes using `palettegen` filter.

No need to install `ffmpeg` separately. It is included in the dependencies.

## Install

```sh
$ npm install gify-cli -g
```

## Examples

```sh
# create 320w 30fps gif
$ gify input.mov output.gif --fps=30 --scale=320:-1

# seek to 23s and make the gif 10s in length
$ gify input.mov output.gif --seek 23 --time 10

# seek/time takes any ffmpeg duration format
$ gify input.mov output.gif -S 00:10:00
```

## Usage

```sh
$ gify -h
```

## License

MIT, see [LICENSE](./LICNSE) for details.

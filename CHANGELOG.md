# Changelog

### 5.0.0

- Added support for overriding the default Uglify configuration.
- Fixed an issue where passing a negated path (to ignore a file) causes an assertion here.
- In order to allow Watchify to use the Browserify cache for fast rebuilds, default `cache` and `packageCache` configuration options have been added.
- **Breaking:** Removed `gulp-phpunit` and `gulp-phpspec`, in favor of piping to a simple shell script. If you are running `mix.phpUnit()` or `mix.phpSpec()`, please note [the argument adjustment](https://github.com/laravel/elixir/commit/5fa4b861a6950479300d5d8883b4ee93760e566a): `mix.phpUnit(src, command)` and `mix.phpSpec(src, command)`, respectively.

### 4.2.1

- Remove all unsafe optimizations performed by the [cssnano](http://cssnano.co/options/) plugin. You may re-enable these by updating your config: `Elixir.config.css.cssnano.pluginOptions.safe = false`.

### 4.2
- Added `mix.exec(command, watchPath)` method. If you've ever needed to trigger a shell command as part of your compile process, you'll be happy to see this. Try out `mix.exec('say "Hello there"')` for an example.
- Swapped out the "gulp-minify-css" plugin (now deprecated) with the recommended "gulp-cssnano". If you were manually overriding any Elixir options for "gulp-minify-css", please update them for "gulp-cssnano". This likely won't affect you otherwise.

### 4.1

- Added `mix.combine([src], outputPath)` method. This is useful in the instance where you want to concatenate an array of files, without running any unnecessary and slow compilation (Uglify, Sourcemaps, etc.). You'll frequently use this for combining pre-minified libraries and such.

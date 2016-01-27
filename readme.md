# Laravel Elixir

## Introduction

Laravel Elixir provides a clean, fluent API for defining basic Gulp tasks for your Laravel application. Elixir supports several common CSS and JavaScript pre-processors, and even testing tools.

If you've ever been confused about how to get started with Gulp and asset compilation, you will love Laravel Elixir!


## Official Documentation

Documentation for Elixir can be found on the [Laravel website](http://laravel.com/docs/elixir).

## License

Laravel Elixir is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

## Changelog

### 4.1

- Added `mix.combine([src], outputPath)` method. This is useful in the instance where you want to concatenate an array of files, without running any unnecessary and slow compilation (Uglify, Sourcemaps, etc.). You'll frequently use this for combining pre-minified libraries and such.


### 4.2
- Added `mix.exec(command, watchPath)` method. If you've ever needed to trigger a shell command as part of your compile process, you'll be happy to see this. Try out `mix.exec('say "Hello there"')` for an example.
- Swapped out the "gulp-minify-css" plugin (now deprecated) with the recommended "gulp-cssnano". If you were manually overriding any Elixir options for "gulp-minify-css", please update them for "gulp-cssnano". This likely won't affect you otherwise.

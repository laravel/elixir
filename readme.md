# Laravel Elixir

- [Introduction](#introduction)
- [Installation & Setup](#installation)
- [Usage](#usage)
- [Extensions](#extensions)

<a name="introduction"></a>
## Introduction


<a name="installation"></a>
## Installation & Setup

### Installing Node

Before triggering Gulp, you must first ensure that Node.js is installed.

    node -v

By default, Laravel Homestead includes everything you need; however, if you aren't using Vagrant, then you
can easily install Node by visiting [nodejs.org](http://nodejs.org), and clicking install. Don't worry, it's
quick and easy!

 ### Gulp

Next, you'll want to pull in Gulp globally, like so:

    npm install --global gulp

### Laravel Elixir

The only remaining step is to install Elixir! With a new install of Laravel, you'll find a `package.json` file. You may
install these dependencies by running:

    npm install

<a name="usage"></a>
## Usage

Now that you've installed Elixir, you'll be compiling, concatenating, and watching in no time!

#### Compile Less

    elixir(function(mix) {
        mix.less("bootstrap.less")
    });

#### Compile Sass

    elixir(function(mix) {
        mix.sass("bootstrap.scss")
    });

#### Compile CoffeeScript

    elixir(function(mix) {
        mix.coffee()
    });

#### Compile All Less and CoffeeScript

    elixir(function(mix) {
        mix.less()
           .coffee();
    });

#### Trigger PHPUnit Tests

    elixir(function(mix) {
        mix.phpUnit();
    });

#### Trigger PHPSpec Tests

    elixir(function(mix) {
        mix.phpSpec();
    });

#### Combine Stylesheets

    elixir(function(mix) {
        mix.styles([
            'css/normalize.css',
            'css/main.css'
        ]);
    });

#### Combine Scripts

    elixir(function(mix) {
        mix.scripts([
            'js/jquery.js',
            'js/app.js'
        ]);
    });

#### Version/Hash a File

    elixir(function(mix) {
        mix.version('css/all.css');
    });

This will append a unique hash to the filename, allowing for cache-busting. Perhaps something like: `all-16d570a7.css`.

Within your views, you may use the `elixir()` function to load the correct asset. Here's an example:

    <link rel="stylesheet" href="{{ elixir('css/all.css') }}">

Behind the scenes, the `elixir()` function will determine the name of the hashed file that should be included.

#### Scan For Routes

    elixir(function(mix) {
        mix.routes();
    });

This will automatically monitor your controllers for changes (and route annotations), and re-generate the cached routes file.
 The same is true for events.

 #### Scan For Events

     elixir(function(mix) {
         mix.events();
     });



#### Put It All Together

    elixir(function(mix) {
        mix.less("bootstrap.less")
           .coffee()
           .phpUnit()
           .version("css/bootstrap.css")
           .routes()
           .events();
    });


<a name="extensions"></a>
## Extensions

You can even create your own Gulp tasks, and hook them into Elixir. Imagine that you want to add a fun task that
 uses the Terminal to verbally notify you with some message. Here's what that might look like:

     var gulp = require('gulp');
     var elixir = require('laravel-elixir');
     var shell = require('gulp-shell');

     elixir.extend('message', function(message) {

         gulp.task('say', function() {
             gulp.src('').pipe(shell('say ' + message));
         });

         return this.queueTask('say');

     });

That's it! You may either place this at the top of your Gulpfile, or instead extract it to a custom tasks file. If you
choose the latter approach, simple require it into your Gulpfile, like so:

    require('./custom-tasks')

You're done! Now, you can mix it in.

    elixir(function(mix) {
        mix.message('Tea, Earl Grey, Hot');
    });

Now, each time you trigger Gulp, Picard will make some tea.
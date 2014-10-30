# Laravel Elixir

- [Introduction](#introduction)
- [Installation & Setup](#installation)
- [Usage](#usage)
- [Gulp](#gulp)
- [Extensions](#extensions)

<a name="introduction"></a>
## Introduction

Laravel Elixir provides a clean, fluent API for defining some basic [Gulp](http://gulpjs.com) tasks for your
Laravel application. Elixir supports several common CSS, JavaScript and even testing tools!


<a name="installation"></a>
## Installation & Setup

### Installing Node

Before triggering Elixir, you must first ensure that Node.js is installed on your machine.

    node -v

By default, Laravel Homestead includes everything you need; however, if you aren't using Vagrant, then you
can easily install Node by visiting [nodejs.org](http://nodejs.org), and clicking install. Don't worry, it's
quick and easy!

### Gulp

Next, you'll want to pull in [Gulp](http://gulpjs.com) globally, like so:

    npm install --global gulp

### Laravel Elixir

The only remaining step is to install Elixir! With a new install of Laravel, you'll find a `package.json` file in the root. You may
install the dependencies it references by running:

    npm install

<a name="usage"></a>
## Usage

Now that you've installed Elixir, you'll be compiling, concatenating, and watching in no time!

#### Compile Less

    elixir(function(mix) {
        mix.less("bootstrap.less");
    });

#### Compile Sass

    elixir(function(mix) {
        mix.sass("bootstrap.scss");
    });

#### Compile CoffeeScript

    elixir(function(mix) {
        mix.coffee();
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
            "css/normalize.css",
            "css/main.css"
        ]);
    });
    
This will assume that the `public/` folder is the base directory.    

#### Combine Scripts

    elixir(function(mix) {
        mix.scripts([
            "js/jquery.js",
            "js/app.js"
        ]);
    });

#### Combine All Scripts in a Special Directory

    elixir(function(mix) {
        mix.scripts('', 'resources/assets/scripts');
    });

#### Combine Multiple Sets of Scripts

    elixir(function(mix) {
        mix.scripts(['js/jquery.js', 'js/main.js'])
           .scripts(['js/forum.js', 'js/threads.js']);
    });

#### Version/Hash a File

    elixir(function(mix) {
        mix.version("css/all.css");
    });

This will append a unique hash to the filename, allowing for cache-busting. Perhaps something like: `all-16d570a7.css`.

Within your views, you may use the `elixir()` function to load the appropriately hashed asset. Here's an example:

    <link rel="stylesheet" href="{{ elixir("css/all.css") }}">

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


<a name="gulp"></a>
## Gulp

Now that you've told Elixir which tasks to execute, you only need to trigger Gulp from the command line.

#### Execute All Registered Tasks Once

    gulp

#### Watch Assets for Changes

    gulp watch

#### Watch Tests and PHP Classes for Changes

    gulp tdd

> **Note:** All tasks will assume a development environment, and will exclude minification. For production, use `gulp --production`.

<a name="extensions"></a>
## Extensions

You can even create your own Gulp tasks, and hook them into Elixir. Imagine that you want to add a fun task that
 uses the Terminal to verbally notify you with some message. Here's what that might look like:

     var elixir = require("laravel-elixir");
     var gulp = require("gulp");
     var shell = require("gulp-shell");

     elixir.extend("message", function(message) {

         gulp.task("say", function() {
             gulp.src("").pipe(shell("say " + message));
         });

         return this.queueTask("say");

     });

Notice that we `extend` Elixir's API by passing the key that we will use within our Gulpfile, as well as a callback function that will create the Gulp task.

If you want your custom task to be monitored, then register a watcher as well.

    this.registerWatcher("message", "**/*.php");

This lines designates that when any file that matches the regex, `**/*.php` is modified, we want to trigger the `message` task.

That's it! You may either place this at the top of your Gulpfile, or instead extract it to a custom tasks file. If you
choose the latter approach, simple require it into your Gulpfile, like so:

    require("./custom-tasks")

You're done! Now, you can mix it in.

    elixir(function(mix) {
        mix.message("Tea, Earl Grey, Hot");
    });

With this addition, each time you trigger Gulp, Picard will request some tea.

### Available Extension

You'll find a number of Elixir extensions at [npmjs.org](https://www.npmjs.org/search?q=laravel-elixir), under the "laravel-elixir-*" namespace.

- [Stylus](https://www.npmjs.org/package/laravel-elixir-stylus)
- [Codeception](https://www.npmjs.org/package/laravel-elixir-codeception)
- [Browserify](https://www.npmjs.org/package/laravel-elixir-browserify)

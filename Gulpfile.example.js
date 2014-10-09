var elixir = require('./vendor/laravel/elixir/Elixir');

/*
 |----------------------------------------------------------------
 | Have a Drink
 |----------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic
 | Gulp tasks for your Laravel application. Elixir supports
 | several common CSS, JavaScript and even testing tools!
 |
 | In addition, Elixir will monitor your files for changes and
 | rebuild your scanned route and event configurations each
 | time you update your code. It is quick and convenient!
 |
 */

elixir(function(mix) {
    mix.less("bootstrap.less")
       .routes()
       .events()
       .phpUnit();
});

import Elixir from 'laravel-elixir';

const config = Elixir.config;
let _;
let browserSync;

/*
 |----------------------------------------------------------------
 | BrowserSync
 |----------------------------------------------------------------
 |
 | Browsersync makes your browser testing workflow faster by
 | synchronizing URLs, behavior, and code changes across
 | across multiple devices. And, now it's in Elixir!
 |
 */

Elixir.extend('browserSync', function (options) {
    loadPlugins();

    options = _.extend({
        files: [
            config.appPath + '/**/*.php',
            config.get('public.css.outputFolder') + '/**/*.css',
            config.get('public.js.outputFolder') + '/**/*.js',
            config.get('public.versioning.buildFolder') + '/rev-manifest.json',
            config.viewPath +'/**/*.php'
        ],
        watchOptions: {
            usePolling: true
        },
        snippetOptions: {
            rule: {
                match: /(<\/body>|<\/pre>)/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        }
    }, config.browserSync, options);

    // Browsersync will only run during `gulp watch`.
    if (Elixir.isWatching()) {
        browserSync.init(options);
    }

    new Elixir.Task('browserSync', function () {}).watch();
});

/**
 * Load the required Gulp plugins on demand.
 */
const loadPlugins = function () {
    _ = require('underscore');
    browserSync = require('browser-sync').create();
};

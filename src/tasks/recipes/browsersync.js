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

    // Browsersync will only run during `gulp watch`.
    if (Elixir.isWatching()) {
        browserSync.init(getOptions(options));
    }

    new Elixir.Task('browserSync', function () {}).watch();
});


/**
 * Load the required Gulp plugins on demand.
 */
function loadPlugins() {
    _ = require('underscore');
    browserSync = require('browser-sync').create();
};


/**
 * Get all Browsersync options.
 *
 * @param  {object|null} options
 * @return {object}
 */
function getOptions(options) {
    let config = Elixir.config;

    return _.extend({
        files: [
            config.appPath + '/**/*.php',
            config.get('public.css.outputFolder') + '/**/*.css',
            config.get('public.js.outputFolder') + '/**/*.js',
            config.get('public.versioning.buildFolder') + '/rev-manifest.json',
            config.viewPath + '/**/*.php'
        ],

        watchOptions: {
            usePolling: true
        },

        snippetOptions: {
            rule: {
                match: /(<\/body>|<\/pre>)/i,
                fn: (snippet, match) => snippet + match
            }
        }
    }, config.browserSync, options);
}

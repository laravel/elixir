var p = require('path');
var gutils = require('gulp-util');

/*
 |----------------------------------------------------------------
 | Master Configuration
 |----------------------------------------------------------------
 |
 | This file contains the proper paths and options for each and
 | and every Gulp task that Elixir wraps up. To override any
 | setting, reference elixir.config.* from your Gulpfile.
 |
 | Alternatively you may create an elixir.json file within your
 | project root. As JSON, modify any settings contained here
 | and they'll take precedence over these defaults. Easy!
 |
 */

var config = {

    tasks: [],

    assetsPath: 'resources/assets',

    publicPath: 'public',

    appPath: 'app',

    production: !! gutils.env.production,

    sourcemaps: true,

    css: {
        folder: 'css',

        outputFolder: 'css',

        autoprefix: {
            enabled: true,

            options:  {
                browsers: ['last 2 versions'],
                cascade: false
            }
        },

        sass: {
            folder: 'sass',

            pluginOptions: {
                outputStyle: !! gutils.env.production
                    ? 'compressed'
                    : 'nested'
            }
        },

        less: {
            folder: 'less',

            pluginOptions: {}
        }
    },

    js: {
        folder: 'js',

        outputFolder: 'js',

        babel: {
            options: {
                stage: 2,
                compact: false
            }
        },

        browserify: {
            options: {},

            transformers: [
                {
                    name: 'babelify',
                    options: {
                        stage: 2,
                        compact: false
                    }
                },
                {
                    name: 'partialify',
                    options: {}
                }
            ]
        },

        coffee: {
            folder: 'coffee',

            options: {}
        }
    },

    testing: {
        phpUnit: {
            path: 'tests',

            options: {
                debug: true,
                notify: true
            }
        },

        phpSpec: {
            path: 'spec',

            options: {
                verbose: 'v',
                notify: true
            }
        }
    },

    versioning: {
        buildFolder: 'build'
    }

};


/**
 * Fetch a config item, using a string dot-notation.
 *
 * @param  {string} path
 * @return {mixed}
 */
config.get = function(path) {
    var basePath;
    var current = config;

    var segments = path.split('.');

    // If the path begins with "assets" or "public," then
    // we can assume that the user wants to prefix the
    // a base path to the given option they request.
    if (segments[0] == 'assets' || segments[0] == 'public') {
        basePath = config[segments.shift()+'Path'];
    }

    segments.forEach(function(segment) {
        current = current[segment];
    });

    return p.join(basePath, current);
};


module.exports = config;

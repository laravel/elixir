import fs from 'fs';
import map from 'vinyl-map';
import {extend} from 'underscore';
import Compiler from './Compiler';
import gulpWebpack from 'webpack-stream';

class JavaScriptCompiler extends Compiler {
    /**
     * Create a new compiler instance.
     *
     * @param  {object|null} options
     */
    constructor(options) {
        super(options);

        if (fs.existsSync('webpack.config.js')) {
            this.webpackConfig = require(process.cwd()+'/webpack.config.js');
        }
    }


    /**
     * Retrieve the full Gulp task.
     *
     * @param {Task} task
     */
    toGulp(task) {
        this.task = task;

        return (
            gulp
            .src(task.src.path)
            .pipe(this.webpack())
            .on('error', this.onError)
            .pipe(this.minify())
            .pipe(this.saveAs(gulp))
            .pipe(this.onSuccess())
        );
    }


    /**
     * Run the files through Webpack.
     */
    webpack() {
        return gulpWebpack(extend({
            watch: Elixir.isWatching(),
            devtool: Elixir.config.sourcemaps ? 'source-map' : '',
            output: {
                filename: this.task.output.name
            },
            module: {
                loaders: Elixir.config.js.webpack.loaders
            }
        }, this.webpackConfig, this.options), require('webpack'));
    }


    /**
     * Uglify the code.
     */
    minify() {
        if (Elixir.config.production) {
            return Elixir.Plugins.uglify(
                Elixir.config.js.uglify.options
            );
        }

        return map(function () {});
    }
}


export default JavaScriptCompiler;

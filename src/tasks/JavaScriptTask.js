import fs from 'fs';
import {extend} from 'underscore';
import gulpWebpack from 'webpack-stream';

class JavaScriptTask extends Elixir.Task {
    /**
     * Create a new JavaScriptTask instance.
     *
     * @param  {string}      name
     * @param  {GulpPaths}   paths
     * @param  {object|null} options
     */
    constructor(name, paths, options) {
        super(name, null, paths);

        this.options = options;

        if (fs.existsSync('webpack.config.js')) {
            this.webpackConfig = require(process.cwd()+'/webpack.config.js');
        }
    }


    /**
     * Build up the Gulp task.
     */
    gulpTask() {
        return (
            gulp
            .src(this.src.path)
            .pipe(this.webpack())
            .on('error', this.onError())
            .pipe(this.minify())
            .on('error', this.onError())
            .pipe(this.saveAs(gulp))
            .pipe(this.onSuccess())
        );
    }


    /**
     * Run the files through Webpack.
     */
    webpack() {
        this.recordStep('Running Webpack');

        return gulpWebpack(extend({
            watch: Elixir.isWatching(),
            devtool: Elixir.config.sourcemaps ? 'source-map' : '',
            output: {
                filename: this.output.name
            },
            module: {
                loaders: Elixir.config.js.webpack.loaders
            },
            stats: {
                assets: false,
                version: false
            }
        }, this.webpackConfig, this.options), require('webpack'));
    }
}


export default JavaScriptTask;

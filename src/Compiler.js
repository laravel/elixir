import map from 'vinyl-map';
import CleanCSS from 'clean-css';

class Compiler {
    /**
     * Create a new Compiler instance.
     *
     * @param {object|null} options
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * Retrieve the full Gulp task.
     */
    toGulp(task) {
        this.task = task;

        return (
            gulp
            .src(task.src.path)
            .pipe(this.initSourceMaps())
            .pipe(this.compile())
            .on('error', this.onError)
            .pipe(this.autoPrefix())
            .pipe(this.concat())
            .pipe(this.minify())
            .pipe(this.writeSourceMaps())
            .pipe(this.saveAs(gulp))
            .pipe(this.onSuccess())
        );
    }

    /**
     * Get the "ucwords" task name.
     */
    name() {
        return this.task.name.substr(0,1).toUpperCase() + this.task.name.substr(1);
    }

    /**
     * Compile the Less.
     */
    compile() {
        this.task.log();

        return this.plugin();
    }

    /**
     * Run the plugin.
     */
    plugin() {
        return Elixir.Plugins[this.task.name](this.getOptions());
    }

    /**
     * Get the plugin options.
     *
     * @return {object}
     */
    getOptions() {
        return this.options || Elixir.config.css[this.task.name].pluginOptions;
    }

    /**
     * Initialize the sourcemaps.
     */
    initSourceMaps() {
        if (Elixir.config.sourcemaps) {
            return Elixir.Plugins.sourcemaps.init();
        }

        return map(function () {});
    }

    /**
     * Write to the sourcemaps file.
     */
    writeSourceMaps() {
        if (Elixir.config.sourcemaps) {
            return Elixir.Plugins.sourcemaps.write('.');
        }

        return map(function () {});
    }

    /**
     * Apply CSS auto-prefixing.
     */
    autoPrefix() {
        if (Elixir.config.css.autoprefix.enabled) {
            return Elixir.Plugins.autoprefixer(
                Elixir.config.css.autoprefix.options
            )
        }

        return map(function () {});
    }

    /**
     * Minify the compiled output.
     */
    minify() {
        return map(function(buff, filename) {
            if (Elixir.config.production) {
                let options = Elixir.config.css.minifier.pluginOptions;

                return new CleanCSS(options).minify(buff.toString()).styles;
            }
        });
    }

    /**
     * Apply concatenation to the incoming stream.
     */
    concat() {
        return Elixir.Plugins.concat(this.task.output.name);
    }

    /**
     * Set the destination path for the compiler.
     *
     * @param {object} gulp
     */
    saveAs(gulp) {
        return gulp.dest(this.task.output.baseDir);
    }

    /**
     * Handle a compilation error.
     *
     * @param {object} e
     */
    onError(e) {
        new Elixir.Notification().error(e, 'Compilation Failed!');

        this.emit('end');
    }

    /**
     * Handle successful compilation.
     */
    onSuccess() {
        return new Elixir.Notification(`${this.name()} Compiled!`);
    }
}


export default Compiler;

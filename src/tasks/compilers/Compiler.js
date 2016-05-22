import map from 'vinyl-map';

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
     * Compile the Less.
     */
    compile() {
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
        return new Elixir.Notification(`${this.task.ucName()} Compiled!`);
    }
}


export default Compiler;

class CssTask extends Elixir.Task {
    /**
     * Create a new CssTask instance.
     *
     * @param {string}      name
     * @param {GulpPaths}   paths
     * @param {object|null} options
     */
    constructor(name, paths, options) {
        super(name, null, paths);

        this.options = options;
    }


    /**
     * Build the Gulp task.
     */
    gulpTask() {
        return (
            gulp
            .src(this.src.path)
            .pipe(this.initSourceMaps())
            .pipe(this.compile())
            .on('error', this.onError())
            .pipe(this.autoPrefix())
            .pipe(this.concat())
            .pipe(this.minify())
            .pipe(this.writeSourceMaps())
            .pipe(this.saveAs(gulp))
            .pipe(this.onSuccess())
        );
    }


    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src.baseDir + Elixir.config.css[this.name].search)
            .ignore(this.output.path);
    }


    /**
     * Compile the CSS.
     */
    compile() {
        let plugin = Elixir.Plugins[this.name] ||
                     Elixir.config.css[this.name].plugin;

        return plugin(
            this.options || Elixir.config.css[this.name].pluginOptions
        );
    }
}


export default CssTask;

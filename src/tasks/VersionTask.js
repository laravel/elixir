let fs = require('fs');
let del = require('del');
let glob = require('glob');
let vinylPaths = require('vinyl-paths');

class VersionTask extends Elixir.Task {

    /**
     * Create a new CssTask instance.
     *
     * @param {string}    name
     * @param {GulpPaths} paths
     */
    constructor(name, paths) {
        super(name, null, paths);

        this.publicPath = Elixir.config.publicPath;
        this.buildPath = this.output.baseDir;
    }


    /**
     * Build the Gulp task.
     */
    gulpTask($) {
        let files = vinylPaths();

        this.recordStep('Versioning');

        this.deleteManifestFiles();

        return (
            gulp
            .src(this.src.path, { base: `./${this.publicPath}` })
            .pipe(gulp.dest(this.buildPath))
            .pipe(files)
            .pipe($.rev())
            .pipe(this.updateVersionedPathInFiles($))
            .pipe(gulp.dest(this.buildPath))
            .pipe($.rev.manifest())
            .pipe(this.saveAs(gulp))
            .on('end', this.onComplete(files))
        );
    }


    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src.path);
    }


    /**
     * Update files to point to the newly versioned file name.
     *
     * @param {Elixir.Plugins} $
     */
    updateVersionedPathInFiles($) {
        let buildFolder = this.buildPath.replace(this.publicPath, '').replace('\\', '/');

        return $.revReplace({ prefix: buildFolder });
    }


    /**
     * Empty all relevant files from the build directory.
     */
    deleteManifestFiles() {
        let manifest = `${this.buildPath}/rev-manifest.json`;

        this.recordStep('Emptying "build" Directory');

        fs.stat(manifest, (err, stat) => {
            if (err) return;

            manifest = JSON.parse(fs.readFileSync(manifest));

            for (let key in manifest) {
                del.sync(`${this.buildPath}/${manifest[key]}`, { force: true });
            }
        });
    }


    /**
     * Copy source maps to the build directory.
     */
    copyMaps() {
        this.recordStep('Copying Source Maps');

        this.src.path.forEach(file => {
            glob(file, {}, (error, files) => {
                if (error) return;

                files.filter(file => fs.existsSync(`${file}.map`))
                     .forEach(this.copyMap.bind(this));
            });
        });
    }


    /**
     * Copy a single map file over.
     *
     * @param {string} srcMap
     */
    copyMap(srcMap) {
        let destMap = srcMap.replace(this.publicPath, this.buildPath);

        fs.createReadStream(`${srcMap}.map`)
          .pipe(fs.createWriteStream(`${destMap}.map`));
    }


    /**
     * Called once versioning has completed.
     *
     * @param  mixed files
     * @return {function}
     */
    onComplete(files) {
        return () => {
            // The actual file will be copied over to the build
            // folder, but we only care about the versioned one.
            // So we can safely delete it.
            del(files.paths.filter(
                file => fs.lstatSync(file).isFile()
            ), { force: true });

            // We'll also copy over any relevant source maps.
            this.copyMaps();
        };
    }

}


export default VersionTask;

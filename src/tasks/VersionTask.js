let fs = require('fs');
let del = require('del');
let glob = require('glob');

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

        if (this.src.baseDir == this.buildPath) {
            if (this.src.path.find(path => /\*/.test(path))) {
                Elixir.fail(
                    'Because you\'ve overridden the "mix.version()" build path ' +
                    'to be the same as your source path, you cannot pass a ' +
                    'regular expression. Please use full file paths instead.'
                );
            }
        }
    }


    /**
     * Build the Gulp task.
     */
    gulpTask($) {
        this.recordStep('Versioning');

        this.deleteManifestFiles();

        return (
            gulp
            .src(this.src.path, { base: `./${this.publicPath}` })
            .pipe($.rev())
            .pipe(this.updateVersionedPathInFiles($))
            .pipe(gulp.dest(this.buildPath))
            .pipe($.rev.manifest())
            .pipe(this.saveAs(gulp))
            .on('end', this.copyMaps.bind(this))
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

        this.recordStep('Rewriting File Paths');

        return $.revReplace({ prefix: buildFolder });
    }


    /**
     * Empty all relevant files from the build directory.
     */
    deleteManifestFiles() {
        let manifest = `${this.buildPath}/rev-manifest.json`;

        if (! fs.existsSync(manifest)) return;

        manifest = JSON.parse(fs.readFileSync(manifest));

        for (let key in manifest) {
            del.sync(`${this.buildPath}/${manifest[key]}`, { force: true });
        }
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

}


export default VersionTask;

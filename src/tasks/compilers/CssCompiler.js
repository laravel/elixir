import map from 'vinyl-map';
import CleanCSS from 'clean-css';
import Compiler from './Compiler';

class CssCompiler extends Compiler {
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
}


export default CssCompiler;

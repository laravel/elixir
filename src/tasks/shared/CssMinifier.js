import CleanCSS from 'clean-css';
import map from 'vinyl-map';

export default () => {
    let options = Elixir.config.css.minifier.pluginOptions;

    return map(function (buff, filename) {
        return new CleanCSS(options)
            .minify(buff.toString())
            .styles;
    });
};

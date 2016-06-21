import VersionTask from '../VersionTask';

/*
 |----------------------------------------------------------------
 | Versioning / Cache Busting
 |----------------------------------------------------------------
 |
 | This task will append a small hash on the end of your file
 | and generate a manifest file which contains the current
 | "version" of the filename for the application to use.
 |
 */

Elixir.extend('version', function(src, buildPath) {
    new VersionTask('version', getPaths(src, buildPath));
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  buildPath
 * @return {GulpPaths}
 */
function getPaths(src, buildPath) {
    src = Array.isArray(src) ? src : [src];
    buildPath = buildPath || Elixir.config.get('public.versioning.buildFolder')

    return new Elixir.GulpPaths()
        .src(src, Elixir.config.publicPath)
        .output(buildPath);
};

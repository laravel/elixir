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

    let paths = new Elixir.GulpPaths()
        .src(src, Elixir.config.publicPath)
        .output(buildPath);

    // We've no interested in tracking the builder directory,
    // so we will always exclude it from the src set.
    paths.src.path = paths.src.path.concat(['!'+buildPath, '!'+buildPath+'/**']);

    return paths;
};

var utilities = require('./Utilities');
var config = require('laravel-elixir').config;

var MergeRequest = function(files, baseDir, outputDir, ext) {
    this.baseDir = baseDir || config.assetsDir + ext;
    this.search = '**/*.' + ext;
    this.files = utilities.prefixDirToFiles(this.baseDir, files || this.search);
    this.type = ext;
    this.concatFileName = 'all.' + ext;

    this.setOutputDir(outputDir);
};

MergeRequest.prototype.setOutputDir = function(outputDir) {
    var pathSegments;

    if (outputDir.indexOf('.' + this.type) > -1) {
        pathSegments = outputDir.split('/');

        this.concatFileName = pathSegments.pop();
        outputDir = pathSegments.join('/');
    }

    this.outputDir = outputDir;
};

module.exports = MergeRequest;

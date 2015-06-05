var utilities = require('./Utilities');
var config    = require('laravel-elixir').config;

var MergeRequest = function(files, baseDir, outputDir, ext) {
    var output = utilities.parse(outputDir);

    this.baseDir = baseDir || config.assetsDir + ext;
    this.search = '**/*.' + ext;
    this.files = utilities.prefixDirToFiles(this.baseDir, files || this.search);
    this.type = ext;
    this.outputDir = output.baseDir;
    this.concatFileName = output.name || 'all.' + ext;
    this.outputPath = this.outputDir + '/' + this.concatFileName;
};

module.exports = MergeRequest;

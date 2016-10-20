// var Plugin = require('markdown-it-regexp');
var Plugin = MarkdownItPlugins.getPlugin('markdown-it-regexp');

var MdVariablesEnhanced = function MdVariablesEnhanced(dataFunction, regex, matchMapper = (x => x[1])) {
    return Plugin(
        regex,
        function(match, utils) {
            var data = dataFunction(matchMapper(match));
            if((typeof data !== "undefined") && (data !== null)) {
                return data;
            }
            else {
                console.warn('MdVariablesEnhanced: null or undefined returned (match, mappedMatch, result)', match, matchMapper(match), data);
                return '';
            }
        }
    );
};

// module.exports = MdVariables;

_MarkdownItPlugins['mdvariables-enhanced'] = {
  plugin: MdVariablesEnhanced
};
/* global MarkdownItPlugins: true */
/* global _MarkdownItPlugins: true */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
  'package-utils': '^0.2.1'
});
const PackageUtilities = require('package-utils');

var _mip = function MarkdownItPlugins() {}; 
MarkdownItPlugins = new _mip();
_MarkdownItPlugins = {};

PackageUtilities.addPropertyGetter(MarkdownItPlugins, 'list', () => Object.keys(_MarkdownItPlugins));

PackageUtilities.addImmutablePropertyFunction(MarkdownItPlugins, 'getPlugin', function getPlugin(name) {
	return MarkdownItPlugins.get(name).plugin;
});

PackageUtilities.addImmutablePropertyFunction(MarkdownItPlugins, 'getDefaultOptions', function getDefaults(name) {
	return MarkdownItPlugins.get(name).defaultOptions;
});

PackageUtilities.addImmutablePropertyFunction(MarkdownItPlugins, 'get', function get(name) {
	if (!_MarkdownItPlugins[name]) {
		throw new Meteor.Error('no-such-plugin');
	} else {
		var ret = {
			plugin: _MarkdownItPlugins[name].plugin
		};
		if (!!_MarkdownItPlugins[name].defaultOptions) {
			ret.defaultOptions = _MarkdownItPlugins[name].defaultOptions;
		}
		return ret;
	}
});
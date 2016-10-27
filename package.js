Package.describe({
	name: 'convexset:markdown-it-plugins',
	version: '0.1.1',
	summary: 'Some plugins for MarkdownIt wrapped for Meteor',
	git: 'https://github.com/convexset/meteor-markdown-it-plugins',
	documentation: 'README.md'
});

Npm.depends({
	'string': '3.3.3',
	'lodash.assign': '4.2.0',
	'lodash.repeat': '4.1.0',
});

Package.onUse(function(api) {
	api.versionsFrom('1.3.1');
	api.use([
		'ecmascript',
		'es5-shim',
		'tmeasday:check-npm-versions@0.3.1'
	]);

	////////////////////////////////////////////////////////////////////////
	// Core
	////////////////////////////////////////////////////////////////////////
	api.addFiles('markdown-it-plugins.js');
	api.export('MarkdownItPlugins');

	////////////////////////////////////////////////////////////////////////
	// Fake Require
	////////////////////////////////////////////////////////////////////////
	api.addFiles('tools/polyfiller.js');

	////////////////////////////////////////////////////////////////////////
	// Misc
	////////////////////////////////////////////////////////////////////////
	api.addFiles('misc/token-prototype.js');

	////////////////////////////////////////////////////////////////////////
	// The Plugins
	////////////////////////////////////////////////////////////////////////
	api.addFiles('plugins/markdown-it-abbr.js');
	api.addFiles('plugins/markdown-it-anchor.js');
	api.addFiles('plugins/markdown-it-attrs.js');
	api.addFiles('plugins/markdown-it-center-text.js');
	api.addFiles('plugins/markdown-it-checkbox.js');
	api.addFiles('plugins/markdown-it-container.js');
	api.addFiles('plugins/markdown-it-emoji.js');
	api.addFiles('plugins/markdown-it-expand-tabs.js');
	api.addFiles('plugins/markdown-it-footnote.js');
	api.addFiles('plugins/markdown-it-implicit-figures.js');
	api.addFiles('plugins/markdown-it-imsize-no-autofill.js');
	api.addFiles('plugins/markdown-it-ins-del.js');
	api.addFiles('plugins/markdown-it-mark.js');
	api.addFiles('plugins/markdown-it-modify-token.js');
	api.addFiles('plugins/markdown-it-modify-token-modified.js');
	api.addFiles('plugins/markdown-it-regexp.js');
	api.addFiles('plugins/markdown-it-sanitizer.js');
	api.addFiles('plugins/markdown-it-smartarrows.js');
	api.addFiles('plugins/markdown-it-sub.js');
	api.addFiles('plugins/markdown-it-sup.js');
	api.addFiles('plugins/markdown-it-table-of-contents.js');
	api.addFiles('plugins/markdown-it-video.js');
	api.addFiles('plugins/mdvariables.js');
	api.addFiles('plugins/mdvariables-enhanced.js');
});

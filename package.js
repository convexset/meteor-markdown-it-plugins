Package.describe({
	name: 'convexset:markdown-it-plugins',
	version: '0.0.2',
	summary: 'Some plugins for MarkdownIt wrapped for Meteor',
	git: 'https://github.com/convexset/meteor-markdown-it-plugins',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.use([
		'ecmascript',
		'es5-shim',
		'underscore',
		'convexset:package-utils@0.1.12',
		'convexset:string.js@3.3.1',
		'stevezhu:lodash@4.5.1',
		// 'peerlibrary:util@0.3.0'
	]);

	////////////////////////////////////////////////////////////////////////
	// Core
	////////////////////////////////////////////////////////////////////////
	api.addFiles('markdown-it-plugins.js');
    api.export('MarkdownItPlugins');

	////////////////////////////////////////////////////////////////////////
	// Fake Require
	////////////////////////////////////////////////////////////////////////
	api.addFiles('tools/fake-require.js');
	api.addFiles('tools/registrations.js');

	////////////////////////////////////////////////////////////////////////
	// Fake Require Registrations
	////////////////////////////////////////////////////////////////////////	
	api.addFiles('tools/underscore/underscore-1.8.3.js');

	api.addFiles('tools/util-browser/0.0.2/inherits.js');
	api.addFiles('tools/util-browser/0.0.2/process.js');
	api.addFiles('tools/util-browser/0.0.2/is-buffer.js');
	api.addFiles('tools/util-browser/0.0.2/util-browser.js');
	
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
	api.addFiles('plugins/markdown-it-ins-del.js');
	api.addFiles('plugins/markdown-it-mark.js');
	api.addFiles('plugins/markdown-it-regexp.js');
	api.addFiles('plugins/markdown-it-regexp-enhanced.js');
	api.addFiles('plugins/markdown-it-sanitizer.js');
	api.addFiles('plugins/markdown-it-smartarrows.js');
	api.addFiles('plugins/markdown-it-sub.js');
	api.addFiles('plugins/markdown-it-sup.js');
	api.addFiles('plugins/markdown-it-table-of-contents.js');
	api.addFiles('plugins/markdown-it-video.js');
	api.addFiles('plugins/mdvariables.js');
	api.addFiles('plugins/mdvariables-enhanced.js');



});

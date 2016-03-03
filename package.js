Package.describe({
	name: 'convexset:markdown-it-plugins',
	version: '0.0.1',
	summary: 'Some plugins for MarkdownIt',
	git: 'https://github.com/convexset/meteor-markdown-it-plugins',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.use([
		'ecmascript',
		'underscore',
		'convexset:package-utils@0.1.12',
		'stevezhu:lodash@4.5.1',
		// 'peerlibrary:util@0.3.0'
	]);

	api.addFiles('markdown-it-plugins.js');

	api.addFiles('tools/fake-require.js');
	api.addFiles('tools/string/string.js');
	
	api.addFiles('plugins/markdown-it-sub.js');
	api.addFiles('plugins/markdown-it-sup.js');
	api.addFiles('plugins/markdown-it-regexp.js');
	api.addFiles('plugins/markdown-it-regexp-enhanced.js');
	api.addFiles('plugins/mdvariables.js');
	api.addFiles('plugins/mdvariables-enhanced.js');

    api.export('MarkdownItPlugins');
});

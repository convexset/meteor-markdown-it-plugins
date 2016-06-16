var items = {};
const PackageUtilities = require('package-utils');

fakeRequireRegister = function fakeRequireRegister(name, payload) {
	if (!!items[name]) {
		console.warn('[FakeRequire] overwriting ' + name);
	}
	items[name] = payload;
};

fakeRequire = function fakeRequire(name) {
	if (!!items[name]) {
		return items[name];
	} else {
		console.warn('[FakeRequire] ' + name + ' not registered');
	}
};

PackageUtilities.addImmutablePropertyFunction(MarkdownItPlugins, '_fakeRequire', fakeRequire);
PackageUtilities.addImmutablePropertyFunction(MarkdownItPlugins, '_fakeRequireList', () => Object.keys(items));
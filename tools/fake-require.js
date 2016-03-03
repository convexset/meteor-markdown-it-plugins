var items = {};

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
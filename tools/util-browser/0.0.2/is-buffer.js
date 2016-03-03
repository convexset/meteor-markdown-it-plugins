fakeRequireRegister('util-browser/is-buffer|0.0.2', function isBuffer(arg) {
	return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
});
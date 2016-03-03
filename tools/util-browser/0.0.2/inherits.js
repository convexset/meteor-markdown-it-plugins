if (typeof Object.create === 'function') {
	// implementation from standard node.js 'util' module

	fakeRequireRegister('util-browser/inherits|0.0.2', function inherits(ctor, superCtor) {
	// module.exports = function inherits(ctor, superCtor) {
		ctor.super_ = superCtor
		ctor.prototype = Object.create(superCtor.prototype, {
			constructor: {
				value: ctor,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
	// };
	});
} else {
	// old school shim for old browsers
	fakeRequireRegister('util-browser/inherits|0.0.2', function inherits(ctor, superCtor) {
	// module.exports = function inherits(ctor, superCtor) {
		ctor.super_ = superCtor
		var TempCtor = function() {}
		TempCtor.prototype = superCtor.prototype
		ctor.prototype = new TempCtor()
		ctor.prototype.constructor = ctor
	// };
	});
}
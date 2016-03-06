polyfillPrototype = function polyfillPrototype(prototypeObj, src) {
	_.forEach(src, function(item, name) {
		if (typeof prototypeObj[name] === "undefined") {
			prototypeObj[name] = item;
		}
	});
}
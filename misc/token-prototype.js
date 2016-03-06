markdownIt6_tokenPrototype = {
  // https://github.com/markdown-it/markdown-it/blob/master/lib/token.js

	/**
	 * Token.attrIndex(name) -> Number
	 *
	 * Search attribute index by name.
	 **/
	attrIndex: function attrIndex(name) {
		var attrs, i, len;

		if (!this.attrs) {
			return -1;
		}

		attrs = this.attrs;

		for (i = 0, len = attrs.length; i < len; i++) {
			if (attrs[i][0] === name) {
				return i;
			}
		}
		return -1;
	},


	/**
	 * Token.attrPush(attrData)
	 *
	 * Add `[ name, value ]` attribute to list. Init attrs if necessary
	 **/
	attrPush: function attrPush(attrData) {
		if (this.attrs) {
			this.attrs.push(attrData);
		} else {
			this.attrs = [attrData];
		}
	},


	/**
	 * Token.attrSet(name, value)
	 *
	 * Set `name` attribute to `value`. Override old value if exists.
	 **/
	attrSet: function attrSet(name, value) {
		var idx = this.attrIndex(name),
			attrData = [name, value];

		if (idx < 0) {
			this.attrPush(attrData);
		} else {
			this.attrs[idx] = attrData;
		}
	},


	/**
	 * Token.attrJoin(name, value)
	 *
	 * Join value to existing attribute via space. Or create new attribute if not
	 * exists. Useful to operate with token classes.
	 **/
	attrJoin: function attrJoin(name, value) {
		var idx = this.attrIndex(name);

		if (idx < 0) {
			this.attrPush([name, value]);
		} else {
			this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
		}
	},
}
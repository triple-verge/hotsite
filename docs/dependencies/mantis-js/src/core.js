	var $, Mantis;

	$ = function (selector) {
		return new Mantis.fn.init(selector);
	};

	Mantis = function (nodes) {
		var _nodes = nodes;
		for (var i = 0; i < _nodes.length; i++ ) {
			this[i] = _nodes[i];
		}
		this.length = _nodes.length;
		this.selector = _nodes.selector;
	};

	Mantis.fn = Mantis.prototype = {
		init: function (selector) {
			if (!selector) return this;

			var nodes;
			if (typeof selector === 'string') {
				nodes = document.querySelectorAll(selector);
			} else if (selector.length) {
				nodes = selector;
			} else {
				nodes = [selector];
			}
			nodes.selector = selector;
			return new Mantis(nodes);
		}, // init

		each: function (callback) {
			this.map(callback);
			return this;
		}, // each

		map: function (callback) {
			var results = [];
			for (var i = 0; i < this.length; i++) {
				results.push(callback.call(this, this[i], i));
			}
			return results;
		}, // map

		mapOne: function (callback) {
			var m = this.map(callback);
			return m.length > 1 ? m : m[0];
		} // mapOne
	}; // Mantis.fn

	Mantis.fn.init.prototype = Mantis.fn;

	Mantis.extend = Mantis.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}

		if (length === i) {
			target = this;
			--i;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) !== null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src ? src : [];

						} else {
							clone = src ? src : {};
						}

						target[name] = Mantis.extend(deep, clone, copy);

					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	}; // Mantis.extend

	$.extend = function (obj1, obj2) {
		for (var p in obj2) {
			try {
				if (obj2[p].constructor == Object) {
					obj1[p] = $.extend(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
			} catch(e) {
				obj1[p] = obj2[p];
			}
		}

		return obj1;
	}; // $.extend

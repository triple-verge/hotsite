	// Traversing
	Mantis.fn.extend({
		filter: function (selector) {
			if (typeof selector === 'function') {
				return this.each(function(el, index) {
					selector.call(el, index);
				});
			} else {
				var result = [];
				var filter = this.parent().find(selector);
				var _length = filter.length;
				var i = 0;

				this.each(function(el) {
					var _el = el;

					while (i < _length && _el === filter[i]) {
						result.push(_el);
						i++;
					}
				});
				return $(result);
			}
		}, // filter

		find: function (selector) {
			var result = [];

			this.each(function (el) {
				var _el = el.querySelectorAll(selector);
				var _length = _el.length;
				var i = 0;

				while (i < _length) {
					result.push(_el[i]);
					i++;
				}
			});

			var _result = $(result);
			_result.selector = this.selector + ' ' + selector;
			return _result;
		}, // find

		children: function (selector) {
			var result = [];

			if (typeof selector !== 'undefined') {
				var children = [];

				this.each(function (el) {
					var _children = el.children;
					if (_children.length) {
						for (var i = 0; i < _children.length; i++) {
							var _c = _children[i];
							if (children.indexOf(_c) === -1) {
								children.push(_c);
							}
						}
					}
				});

				return $(children).filter(selector);
			} else {
				this.each(function (el) {
					var children = el.children;

					for (var i = 0; i < children.length; i++) {
						var _children = children[i];
						if (result.indexOf(_children) === -1) {
							result.push(_children);
						}
					}
				});

				return $(result);
			}
		}, // children

		index: function (selector) {
			return this;
		},

		eq: function (index) {
			if (index >= 0) {
				return $(this[index]);
			} else {
				var _this = this;
				return $(_this[_this.length + (index)]);
			}
		}, // eq

		first: function () {
			return $(this[0]);
		}, // first

		last: function () {
			return $(this).eq(-1);
		}, // last

		prev: function () {
			var result = [];

			this.each(function(el) {
				var previous = el.previousElementSibling;
				if (previous !== null) {
					result.push(previous);
				}
			});

			return $(result);
		}, // prev - todo

		next: function (selector) {
			if (typeof selector !== 'undefined') {
				//
			} else {
				var result = [];

				this.each(function(el) {
					var next = el.nextElementSibling;
					if (next !== null) {
						result.push(next);
					}
					console.log(el);
				});

				return _result;
			}
		}, // next - todo

		parent: function (selector) {
			var result = [];

			this.each(function (el) {
				var _parentElement = el.parentElement;
				if (result.indexOf(_parentElement) === -1) {
					result.push(_parentElement);
				}
			});

			return (typeof selector === 'undefined') ? $(result) : $(result).filter(selector);
		}, // parent

		siblings: function (selector) {
			var result = [];

			this.each(function (el) {
				var children = el.parentElement.children;

				for (var i = 0; i < children.length; i++) {
					var _children = children[i];
					if (result.indexOf(_children) === -1 && _children !== el) {
						result.push(_children);
					}
				}
			});

			return (typeof selector === 'undefined') ? $(result) : $(result).filter(selector);
		}, // siblings

		slice: function (start, end) {
			var result = [];

			if (typeof end === 'undefined') {
				end = this.length;
			}

			this.each(function (el, index) {
				if (index >= start && index <= end) {
					result.push(el);
				}
			});

			return $(result);
		}, // slice
	}); // Traversing - end

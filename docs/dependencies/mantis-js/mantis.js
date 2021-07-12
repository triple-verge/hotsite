/*!
 * Mantis.js
 * https://github.com/acauamontiel/Mantis.js
 *
 * Copyright 2013 Acaua Montiel
 * Released under the MIT license
 */

;(function () {

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

	// Manipulation
	Mantis.fn.extend({
		html: function (content) {
			if (typeof content !== 'undefined') {
				return this.each(function (el) {
					el.innerHTML = content;
				});
			} else {
				return this.mapOne(function (el) {
					return el.innerHTML;
				});
			}
		}, // html

		append: function (content) {
			return this.each(function (el) {
				el.innerHTML += content;
			});
		}, // append - todo

		prepend: function (content) {
			return this.each(function (el) {
				var a = el.innerHTML;
				el.innerHTML = content+a;
			});
		}, // prepend - todo

		empty: function () {
			return this.each(function (el) {
				$(el).html('').val('');
			});
		}, // empty

		remove: function () {
			return this.each(function (el) {
				el.outerHTML = '';
			});
		} // remove
	}); // Manipulation - end

	// Attributes
	Mantis.fn.extend({
		attr: function (attr, value) {
			if (typeof attr === 'object') {
				return this.each(function(el) {
					for (var a in attr) {
						el.setAttribute(a, attr[a]);
					}
				});
			} else {
				if (typeof value !== 'undefined') {
					return this.each(function(el) {
						el.setAttribute(attr, value);
					});
				} else {
					return this.mapOne(function (el) {
						return el.getAttribute(attr);
					});
				}
			}
		}, // attr

		removeAttr: function (value) {
			var v = value.split(' ');
			return this.each(function(el) {
				for (var i = 0; i < v.length; i++) {
					el.removeAttribute(v[i]);
				}
			});
		}, // removeAttr

		hasAttr: function (value) {
			var v = value.split(' '),
				r = false;
			this.each(function(el) {
				for (var i = 0; i < v.length; i++) {
					if (el.hasAttribute(v[i])) {
						r = true;
					}
				}
			});
			return r;
		} // hasAttr
	}); // Attributes - end

	// Classes
	Mantis.fn.extend({
		addClass: function (value) {
			if (this[0].classList) {
				var v = value.split(' ');

				this.each(function (el) {
					for (var i = 0; i < v.length; i++) {
						el.classList.add(v[i]);
					}
				});

				return this;
			} else {
				return this.each(function (el) {
					el.className += (el.className === '') ? value : ' '+value;
				});
			}
		}, // addClass

		removeClass: function (value) {
			var v = value.split(' ');

			if (this[0].classList) {
				this.each(function (el) {
					for (var i = 0; i < v.length; i++) {
						el.classList.remove(v[i]);
					}
				});

				return this;
			} else {
				return this.each(function (el) {
					var c = ' '+el.className.replace(/[\t\r\n]/g, ' ')+' ';

					for (var i = 0; i < v.length; i++) {
						while (c.indexOf(' ' + v[i] + ' ') >= 0 ) {
							c = c.replace(' ' + v[i] + ' ', ' ');
						}
					}

					el.className = c.replace(/^\s+|\s+$/g, '');
				});
			}
		}, // removeClass

		hasClass: function (value) {
			var v = value.split(' '),
				r = false;

			if (this[0].classList) {
				this.each(function(el) {
					for (var i = 0; i < v.length; i++) {
						if (el.classList.contains(v[i])) {
							r = true;
						}
					}
				});
			} else {
				this.each(function (el) {
					var c = ' ' + el.className.replace(/[\t\r\n]/g, ' ') + ' ';

					for (var i = 0; i < v.length; i++) {
						while (c.indexOf(' ' + v[i] + ' ') >= 0 ) {
							c = c.replace(' ' + v[i] + ' ', ' ');
							r = true;
						}
					}
				});
			}

			return r;
		}, // hasClass

		toggleClass: function (value) {
			var v = value.split(' ');
			return this.each(function (el) {
				for (var i = 0; i < v.length; i++) {
					var $el = $(el);
					if ($el.hasClass(v[i])) {
						el.removeClass(v[i]);
					} else {
						$el.addClass(v[i]);
					}
				}
			});
		} // toggleClass
	}); // Classes - end

	// CSS
	Mantis.fn.extend({
		css: function (prop, value) {
			if (typeof prop === 'object') {
				return this.each(function(el) {
					for (var p in prop) {
						el.style[p] = prop[p];
					}
				});
			} else {
				if (typeof value !== 'undefined') {
					return this.each(function(el) {
						el.style[prop] = value;
					});
				} else {
					return this.mapOne(function (el) {
						return el.style[prop];
					});
				}
			}
		} // css
	}); // CSS - end

	// Forms
	Mantis.fn.extend({
		val: function (value) {
			if (typeof value !== 'undefined') {
				return this.each(function (el) {
					el.value = value;
				});
			} else {
				return this.mapOne(function (el) {
					return el.value;
				});
			}
		}, // val

		focus: function () {
			return this.each(function (el) {
				el.focus();
			});
		}, // focus

		blur: function () {
			return this.each(function (el) {
				el.blur();
			});
		}, // blur

		change: function () {
			return this.each(function (el) {
				el.change();
			});
		}, // change

		submit: function () {
			return this.each(function (el) {
				el.submit();
			});
		} // submit
	});	// Forms - end

	// Events
	Mantis.fn.extend({
		on: function (evt) {
			var els, fn;

			if (typeof arguments[1] === 'string') {
				els = this.find(arguments[1]);
				fn = arguments[2];
			} else {
				els = this;
				fn = arguments[1];
			}

			return els.each(function (el) {
				if (document.addEventListener) {
					el.addEventListener(evt, fn, false);
				} else if (document.attachEvent)  {
					el.attachEvent('on' + evt, fn);
				} else {
					el['on' + evt] = fn;
				}
			});
		}, // on

		off: function (evt) {
			var els, fn;

			if (typeof arguments[1] === 'string') {
				els = this.find(arguments[1]);
				fn = arguments[2];
			} else {
				els = this;
				fn = arguments[1];
			}

			return els.each(function (el) {
				if (document.removeEventListener) {
					el.removeEventListener(evt, fn, false);
				} else if (document.detachEvent)  {
					el.detachEvent('on' + evt, fn);
				} else {
					el['on' + evt] = null;
				}
			});
		}, // off

		trigger: function (evt) {
			var eventName;
			if (document.createEvent) {
				eventName = document.createEvent('CustomEvent');
				eventName.initEvent(evt, true, true);
			} else if (document.createEventObject) {
				eventName = document.createEventObject();
				eventName.evt = evt;
			}
			return this.each(function (el) {
				if (el.dispatchEvent) {
					el.dispatchEvent(eventName);
				} else if (el.fireEvent) {
					el.fireEvent('on' + eventName.evt, eventName);
				}
			});
		} // trigger
	}); // Events - end

	// AJAX
	Mantis.fn.extend({
		load: function (url, callback) {
			return this.each(function (el) {
				$.ajax({
					url: url,
					success: function (data) {
						$(el).html(data);

						if (callback) {
							callback();
						}
					}
				});
			});
		} // load - todo
	}); // AJAX - end

	$.ajax = function (params) {
		var xhr;

		var defaults = {
			type: 'GET',
			async: true,
			context: window,
			data: '',
			success: function () {
			},
			error: function () {
			}
		};

		var p = $.extend(defaults, params);

		if (typeof XMLHttpRequest !== 'undefined') {
			xhr = new XMLHttpRequest();
		} else {
			var versions = [
				'MSXML2.XmlHttp.5.0',
				'MSXML2.XmlHttp.4.0',
				'MSXML2.XmlHttp.3.0',
				'MSXML2.XmlHttp.2.0',
				'Microsoft.XmlHttp'
			];

			for (var i = 0, len = versions.length; i < len; i++) {
				try {
					xhr = new ActiveXObject(versions[i]);
						break;
				} catch (e) {}
			}
		}

		xhr.onreadystatechange = function () {
			if(xhr.readyState < 4) {
				p.error();
				return;
			}

			if(xhr.status !== 200) {
				p.error();
				return;
			}

			if(xhr.readyState === 4) {
				p.success(xhr.response);
			}
		};

		xhr.open(p.type, p.url, p.async);
		xhr.send(p.data);
	}; // $.ajax - todo

	// indexOf polyfill for IE8
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (searchElement, fromIndex) {
			if ( this === undefined || this === null ) {
				throw new TypeError( '"this" is null or not defined' );
			}

			var length = this.length >>> 0; // Hack to convert object.length to a UInt32

			fromIndex = +fromIndex || 0;

			if (Math.abs(fromIndex) === Infinity) {
				fromIndex = 0;
			}

			if (fromIndex < 0) {
				fromIndex += length;
				if (fromIndex < 0) {
					fromIndex = 0;
				}
			}

			for (;fromIndex < length; fromIndex++) {
				if (this[fromIndex] === searchElement) {
					return fromIndex;
				}
			}

			return -1;
		};
	}

	if (!Array.prototype.map) {
		Array.prototype.map = function(fun /*, thisArg */) {
			'use strict';

			if (this === void 0 || this === null) {
				throw new TypeError();
			}

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== 'function') {
				throw new TypeError();
			}

			var res = new Array(len);
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++) {
				if (i in t) {
					res[i] = fun.call(thisArg, t[i], i, t);
				}
			}

			return res;
		};
	}

	if ( typeof window === 'object' && typeof window.document === 'object' ) {
		window.$ = $;
	}

})(window);

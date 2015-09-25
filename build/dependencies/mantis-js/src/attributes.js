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

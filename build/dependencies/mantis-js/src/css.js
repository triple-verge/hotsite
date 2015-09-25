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

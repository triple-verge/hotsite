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

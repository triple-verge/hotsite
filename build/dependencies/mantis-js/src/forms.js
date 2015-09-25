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

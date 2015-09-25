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

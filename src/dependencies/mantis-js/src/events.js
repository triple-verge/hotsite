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

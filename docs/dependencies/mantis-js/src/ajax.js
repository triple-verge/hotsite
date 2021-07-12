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

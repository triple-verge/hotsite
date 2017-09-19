'use strict';

var logo = require('./logo.js'),
	utils = require('./utils.js');

module.exports = function () {
	document.addEventListener('DOMContentLoaded', function (e) {
		if (utils.hasWebGL() && $('#logo').length) {
			logo.init();
		}

		if (location.pathname === '/reel.html') {
			$('body').addClass('loaded');
		}
	}, false);

	$(window).on('load', function () {
		$('body').addClass('loaded');
	});
};

'use strict';

var logo = require('./logo.js'),
	utils = require('./utils.js');

module.exports = function () {
	document.addEventListener('DOMContentLoaded', function (e) {
		if (utils.hasWebGL()) {
			logo.init();
		}
	}, false);

	$(window).on('load', function () {
		$('body').addClass('loaded');
	});
};

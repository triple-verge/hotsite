'use strict';

var utils = {};

utils.vary = function (n, v) {
	return Math.random() * ((n + v) - (n - v)) + (n - v);
};

utils.hasWebGL = function () {
	var canvas = document.createElement('canvas');

	try {
		return !!(
			window.WebGLRenderingContext &&
			(
				canvas.getContext('webgl') ||
				canvas.getContext('experimental-webgl')
			)
		);
	}
	catch (e) {
		return false;
	}
};

utils.isTouch = !!('ontouchstart' in window);

module.exports = utils;

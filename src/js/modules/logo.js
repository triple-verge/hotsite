'use strict';

var THREE = require('../../dependencies/threejs/build/three.min.js'),
	OBJLoader = require('./OBJLoader.js'),
	utils = require('./utils.js'),
	loader = new THREE.OBJLoader(),
	logo = {
		container: document.getElementById('logo'),
		w: 175,
		h: 175,
		scene: null,
		camera: null,
		lights: {},
		renderer: null,
		obj: null
	},
	_logo;

logo.addLights = function () {
	var ambient = new THREE.AmbientLight(0x666666),
		point = new THREE.PointLight(0xffffff, 1),
		i;

	point.position.set(1, 1, 1).normalize();

	_logo.lights.ambient = ambient;
	_logo.lights.point = point;

	_logo.scene.add(_logo.lights.ambient);
	_logo.scene.add(_logo.lights.point);

	if (! utils.isTouch) {
		_logo.animateLights();
	}
};

logo.animateLights = function () {
	function getPosition (e) {
		var a = 15;

		return {
			x: (e.pageX - (window.innerWidth / 2)) / a,
			y: (e.pageY - (window.innerHeight / 2)) / a
		};
	}

	$(window).on('mousemove', function (e) {
		_logo.lights.point.position.set(getPosition(e).x, getPosition(e).y, 12);
	});
};

logo.addLogo = function () {
	loader.load('img/logo.obj', function (obj) {
		var material = new THREE.MeshLambertMaterial({
				color: 0xffffff
			});

		_logo.obj = obj;

		obj.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.geometry.computeVertexNormals();
				child.material = material;
				child.scale.set(1.25, 1.25, 1.25);
				child.geometry.applyMatrix(
					new THREE.Matrix4().makeTranslation(0, 0, -0.25)
				);

				_logo.mesh = child;
				_logo.animateLogo();
			}
		});

		_logo.scene.add(obj);
	});
};

logo.animateLogo = function () {
	var mesh = _logo.mesh,
		rotationX = Math.PI * 0.5;

	$(_logo.container).on('frame', function () {
		var now = Date.now();
		mesh.position.set(0, (Math.sin(now / 750) * 0.1) + 0.2, 0);
		mesh.rotation.set(rotationX, 0, Math.sin(now / 625) * 0.3);
	});
};

logo.setCanvas = function () {
	_logo.scene = new THREE.Scene();

	_logo.camera = new THREE.PerspectiveCamera(50, this.w / this.h, 1, 1000);
	_logo.camera.position.z = 1.6;

	_logo.renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	_logo.renderer.setSize(this.w, this.h);
	_logo.container.innerHTML = '';
	_logo.container.appendChild(_logo.renderer.domElement);
};

logo.render = function () {
	_logo.renderer.render(_logo.scene, _logo.camera);
	$(_logo.container).trigger('frame');
	window.requestAnimationFrame(_logo.render);
};

logo.init = function () {
	_logo = this;

	_logo.setCanvas();
	_logo.addLights();
	_logo.addLogo();
	_logo.render();
};

module.exports = logo;

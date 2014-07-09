

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
		
		this.scene = null;
		this.camera = null;
		this.renderer = null;
	//	this.mesh = null;
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		this.sceneContainer = document.getElementById('scene-container');
		
		_initScene.call(this);
		
		TweenLite.ticker.addEventListener('tick', _render, this);
	};
	
	
	Index.prototype.bindEvents = function() {
		
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	var _initScene = function() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, APP.Main.windowW/APP.Main.windowH, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();
		
		this.renderer.setSize(APP.Main.windowW, APP.Main.windowH);
		this.sceneContainer.appendChild(this.renderer.domElement);
		
		var geometry = new THREE.CubeGeometry(100, 100, 100);
		var material = new THREE.MeshBasicMaterial({color:0x9900ff, wireframe:true});
		this.cube = new THREE.Mesh(geometry, material);
		
		this.scene.add(this.cube);
		
		this.camera.position.z = 500;
	};
	
	
	var _render = function() {
		APP.Main.stats.begin();
		
		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.025;
		
		this.renderer.render(this.scene, this.camera);
		
		APP.Main.stats.end();
	};
	
	
	return new Index();
	
	
})(window);


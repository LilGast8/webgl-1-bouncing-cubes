

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
		
		this.scene = null;
		this.camera = null;
		this.renderer = null;
	//	this.mesh = null;
		
		this.cube = null;
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
		this.camera = new THREE.PerspectiveCamera(75, APP.Main.windowW/APP.Main.windowH, 0.1, 10000);
		this.renderer = new THREE.WebGLRenderer({antialias:true});
		
		this.renderer.setSize(APP.Main.windowW, APP.Main.windowH);
		this.sceneContainer.appendChild(this.renderer.domElement);
		
	//	var geometry = new THREE.CubeGeometry(100, 100, 100);
		var geometry = new THREE.BoxGeometry(100, 100, 100);
	//	var material = new THREE.MeshBasicMaterial({color:0x9900ff, wireframe:true});
	//	var material = new THREE.MeshBasicMaterial({color:0x9900ff, wireframe:false});
	//	var material = new THREE.MeshPhongMaterial({color:0x9900ff, wireframe:false});
		
	//	var material = new THREE.MeshLambertMaterial({color:0x0099ff, wireframe:false});
		var material = new THREE.MeshPhongMaterial({color:0x0099ff, wireframe:false});
		this.cube = new THREE.Mesh(geometry, material);
		
		this.scene.add(this.cube);
		
		/* -------- Light 1 -------- *
		this.directionalLight = new THREE.DirectionalLight(0xffffff);
		this.directionalLight.position.set(-20, 20, 200);
		this.scene.add(this.directionalLight);
		*/
		
		/* -------- Light 2 -------- *
		this.ambientLight = new THREE.AmbientLight(0x111111);
		this.scene.add(this.ambientLight);
		
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
		this.directionalLight.position.set(-20, 20, 200);
		this.scene.add(this.directionalLight);
		*/
		
		/* -------- Light 3 -------- *
		this.pointLight = new THREE.PointLight(0xffffff, 1, 0);
		this.pointLight.position.set(30, 30, 150);
		this.scene.add(this.pointLight);
		*/
		
		/* -------- Light 4 -------- *
		this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
		this.scene.add(this.hemisphereLight);
		*/
		
		/* -------- Light 5 -------- */
		this.spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/3, 150);
		this.spotLight.position.set(-500, 250, 500);
		this.scene.add(this.spotLight);
		
		
		
	//	this.camera.position.y = -100;
		this.camera.position.z = 500;
		
		this.cube.rotation.x = 35;
		this.cube.rotation.y = 20;
		
		this.renderer.render(this.scene, this.camera);
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


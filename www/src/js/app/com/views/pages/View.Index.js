

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
		
		this.scene = null;
		this.camera = null;
		this.renderer = null;
		this.cubeContainer = null;
		
		this.projector = null;
		this.mouseVector = null;
		
		this.NB_X_ROWS = 29;
		this.NB_Y_ROWS = 15;
		this.NB_CUBES = this.NB_X_ROWS*this.NB_Y_ROWS;
		this.aCubes = [];
		this.aMeshCubes = [];
		
		this.DIST_MIN = 4000;
		this.DIST_MAX = 7000;
		this.SPEED_ENLARGE = 20;
		this.SPEED_REDUCE = 50;
		
		this.isEnlarge = false;
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		this.$.sceneContainer = $(document.getElementById('scene-container'));
		
		_initScene.call(this);
		_initCubes.call(this);
		
		TweenLite.ticker.addEventListener('tick', _render, this);
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
		this.mouseMoveSceneProxy = $.proxy(_kick, this);
		this.$.sceneContainer.on('mousemove', this.mouseMoveSceneProxy);
		
		this.mouseDownSceneProxy = $.proxy(_enlargeLight, this);
		this.$.sceneContainer.on('mousedown', this.mouseDownSceneProxy);
		
		this.mouseUpSceneProxy = $.proxy(_reduceLight, this);
		this.$.sceneContainer.on('mouseup', this.mouseUpSceneProxy);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.camera.aspect = APP.Main.windowW/APP.Main.windowH;
		this.camera.updateProjectionMatrix();
		
		this.renderer.setSize(APP.Main.windowW, APP.Main.windowH);
	};
	
	
	var _initScene = function() {
		this.scene = new THREE.Scene();
		
		this.camera = new THREE.PerspectiveCamera(50, APP.Main.windowW/APP.Main.windowH, 1, 20000);
	//	this.camera.position.set(0, 0, 3300);
		
	//	this.camera.position.set(0, -2500, 300);
	//	this.camera.rotation.set(-80, 0, 0);
		
	//	this.camera.position.set(-3000, -1500, 3300);
	//	this.camera.rotation.set(0, 0, 0);
	//	this.camera.position.set(-4500, -3500, 1300);
	//	this.camera.rotation.set(1.5, -1, 0);
		
		this.renderer = new THREE.WebGLRenderer({antialias:true});
		this.renderer.setSize(APP.Main.windowW, APP.Main.windowH);
	//	this.renderer.setClearColor(0xdddddd);
		this.renderer.setClearColor(0x000000);
	//	this.renderer.setClearColor(Math.random()*0xffffff);
		this.$.sceneContainer[0].appendChild(this.renderer.domElement);
		
		
		
		
		this.camera.position.set(0, 0, 5500);
		
		this.cubeContainer = new THREE.Object3D();
		this.cubeContainer.position.set(390, 0, 0);
		var rotX = -65*Math.PI/180;
		var rotY = 0*Math.PI/180;
		var rotZ = 40*Math.PI/180;
		this.cubeContainer.rotation.set(rotX, rotY, rotZ);
		this.scene.add(this.cubeContainer);
		
		
		
		
		
		this.projector = new THREE.Projector();
		this.mouseVector = new THREE.Vector3();
		
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		this.directionalLight.position.set(0, 0, 800);
		this.scene.add(this.directionalLight);
		
		
		this.pointLight = new THREE.PointLight(0xffffff, 2, 3000);
		this.pointLight = new THREE.PointLight(0xffffff, 2, this.DIST_MIN);
		this.pointLight.position.set(0, 0, 3000);
	//	this.scene.add(this.pointLight);
	};
	
	
	var _initCubes = function() {
		var cube = null;
		var posX = -200/2*(this.NB_X_ROWS-1);
		var posY = 200/2*(this.NB_Y_ROWS-1);
		
		for(var i=0; i<this.NB_CUBES; i++) {
			cube = new APP.Views.Cube(i+1, posX, posY);
			cube.init();
			this.aCubes.push(cube);
			this.aMeshCubes.push(cube.cube);
			
			posX += 200;
			if(i%this.NB_X_ROWS == this.NB_X_ROWS-1) {
				posX = -200/2*(this.NB_X_ROWS-1);
				posY -= 200;
			}
		}
	};
	
	
	var _render = function() {
		APP.Main.stats.begin();
		
		for(var i=0; i<this.aCubes.length; i++) {
			this.aCubes[i].render();
		}
		
		_manageLightDistance.call(this);
		
		this.renderer.render(this.scene, this.camera);
		
		APP.Main.stats.end();
	};
	
	
	var _kick = function(e) {
		var posX = (-APP.Main.windowW/2+e.clientX)*2;
		var posY = (APP.Main.windowH/2-e.clientY)*2;
		TweenLite.to(this.pointLight.position, 1.5, {x:posX, y:posY, ease:Quad.easeOut});
		
		this.mouseVector.x = (e.clientX/APP.Main.windowW)*2-1;
		this.mouseVector.y = -(e.clientY/window.innerHeight)*2+1;
		var raycaster = this.projector.pickingRay(this.mouseVector, this.camera);
		
		var intersects = raycaster.intersectObjects(this.aMeshCubes);
		
		if(intersects.length > 0) {
			var clickedCube = intersects[0];
			var cubeToKick = null;
			
			for(var i=0; i<this.aCubes.length; i++) {
				if(clickedCube.object.uuid == this.aMeshCubes[i].uuid) {
					cubeToKick = this.aCubes[i];
					break;
				}
			}
			
			cubeToKick.kick();
		}
		
		return false;
	};
	
	
	var _enlargeLight = function() {
		this.isEnlarge = true;
	};
	
	
	var _reduceLight = function() {
		this.isEnlarge = false;
	};
	
	
	var _manageLightDistance = function() {
		var lightDistance = this.pointLight.distance;
		
		if(this.isEnlarge && lightDistance<this.DIST_MAX) 
			this.pointLight.distance += this.SPEED_ENLARGE;
		else if(!this.isEnlarge && lightDistance>this.DIST_MIN) 
			this.pointLight.distance -= this.SPEED_REDUCE;
	};
	
	
	return new Index();
	
	
})(window);


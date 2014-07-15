

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
		
		this.NB_X_ROWS = 30;
		this.NB_Y_ROWS = 15;
		this.NB_CUBES = this.NB_X_ROWS*this.NB_Y_ROWS;
		this.aCubes = [];
		this.aMeshCubes = [];
		
		this.P3D = {
			CC_X : 390,
			CC_ROT_X : -65*Math.PI/180,
			CC_ROT_Y : 0*Math.PI/180,
			CC_ROT_Z : 40*Math.PI/180,
			CAM_Z : 5500
		};
		this.F3D = {
			CC_X : 0,
			CC_ROT_X : 0,
			CC_ROT_Y : 0,
			CC_ROT_Z : 0,
			CAM_Z : 3300
		};
		this.GL_INTENSITY = 1;
		this.PL_INTENSITY = 2;
		this.PL_DISTANCE = 4000;
		this.TCFDL_DISTANCE = 2800;
		
		this.backgroundColor = 'Dark';
		this.colorizationMode = 'FromGreyToColorToGrey';
		this.cameraMode = 'Perspective3D';
		this.lightMode = 'GlobalLight';
		this.autoKick = false;
		
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
	
	
	Index.prototype.updateCubes = function() {
		_removeCubes.call(this);
		_initCubes.call(this);
	};
	
	
	Index.prototype.darkenCubes = function() {
		for(var i=0; i<this.aCubes.length; i++) 
			this.aCubes[i].darken('change');
	};
	
	
	Index.prototype.colorizeCubes = function() {
		for(var i=0; i<this.aCubes.length; i++) 
			this.aCubes[i].colorize('change');
	};
	
	
	Index.prototype.changeView = function(v) {
		if(v == 'Perspective3D') {
			TweenLite.to(this.cubeContainer.position, 1.5, {x:this.P3D.CC_X, ease:Quart.easeInOut});
			TweenLite.to(this.cubeContainer.rotation, 1.5, {x:this.P3D.CC_ROT_X, y:this.P3D.CC_ROT_Y, z:this.P3D.CC_ROT_Z, ease:Quart.easeInOut});
			TweenLite.to(this.camera.position, 1.5, {z:this.P3D.CAM_Z, ease:Quart.easeInOut});
		}
		else if(v == 'Flat3D') {
			TweenLite.to(this.cubeContainer.position, 1.5, {x:this.F3D.CC_X, ease:Quart.easeInOut});
			TweenLite.to(this.cubeContainer.rotation, 1.5, {x:this.F3D.CC_ROT_X, y:this.F3D.CC_ROT_Y, z:this.F3D.CC_ROT_Y, ease:Quart.easeInOut});
			TweenLite.to(this.camera.position, 1.5, {z:this.F3D.CAM_Z, ease:Quart.easeInOut});
		}
	};
	
	
	Index.prototype.changeBackground = function(v) {
		if(v == 'Dark') this.renderer.setClearColor(0x000000);
		else if(v == 'Light') this.renderer.setClearColor(0xdddddd);
	};
	
	
	Index.prototype.changeLight = function(v) {
		if(v == 'GlobalLight') {
			TweenLite.to(this.pointLight, 2, {intensity:0, ease:Quad.easeOut});
			TweenLite.to(this.directionalLight, 2, {intensity:this.GL_INTENSITY, ease:Quad.easeOut});
		}
		else if(v == 'PartialLight') {
			TweenLite.to(this.directionalLight, 2, {intensity:0, ease:Quad.easeOut});
			TweenLite.to(this.pointLight, 2, {intensity:this.PL_INTENSITY, distance:this.PL_DISTANCE, ease:Quad.easeOut});
		}
		else if(v == 'TheyComeFromDarkness') {
			TweenLite.to(this.directionalLight, 2, {intensity:0, ease:Quad.easeOut});
			TweenLite.to(this.pointLight, 2, {intensity:this.PL_INTENSITY, distance:this.TCFDL_DISTANCE, ease:Quad.easeOut});
			TweenLite.to(this.pointLight.position, 2, {x:0, y:0, ease:Quad.easeOut});
		}
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
		this.camera.position.set(0, 0, 5500);
		
		this.renderer = new THREE.WebGLRenderer({antialias:true});
		this.renderer.setSize(APP.Main.windowW, APP.Main.windowH);
		this.renderer.setClearColor(0x000000);
		this.$.sceneContainer[0].appendChild(this.renderer.domElement);
		
		this.cubeContainer = new THREE.Object3D();
		this.cubeContainer.position.set(390, 0, 0);
		this.cubeContainer.rotation.set(this.P3D.CC_ROT_X, this.P3D.CC_ROT_Y, this.P3D.CC_ROT_Z);
		this.scene.add(this.cubeContainer);
		
		this.projector = new THREE.Projector();
		this.mouseVector = new THREE.Vector3();
		
		this.directionalLight = new THREE.DirectionalLight(0xffffff, this.GL_INTENSITY);
		this.directionalLight.position.set(0, 0, 800);
		this.scene.add(this.directionalLight);
		
		this.pointLight = new THREE.PointLight(0xffffff, 0, this.PL_DISTANCE);
		this.pointLight.position.set(0, 0, 3000);
		this.scene.add(this.pointLight);
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
		
		for(i=0; i<this.aCubes.length; i++) {
			this.aCubes[i].cube.material.needsUpdate = true;
		}
	};
	
	
	var _removeCubes = function() {
		for(var i=0; i<this.NB_CUBES; i++) {
			this.aCubes[i].destroy();
			this.aCubes[i] = null;
		}
		this.aCubes = [];
		this.aMeshCubes = [];
		
		this.NB_X_ROWS = Math.round(this.NB_X_ROWS);
		this.NB_Y_ROWS = Math.round(this.NB_Y_ROWS);
		this.NB_CUBES = this.NB_X_ROWS*this.NB_Y_ROWS;
	};
	
	
	var _render = function() {
		APP.Main.stats.begin();
		
		var idCubeToKick = !this.autoKick ? null : Math.round(Math.random()*this.NB_CUBES);
		
		for(var i=0; i<this.aCubes.length; i++) {
			this.aCubes[i].render();
			if(i == idCubeToKick) this.aCubes[i].kick(this.colorizationMode);
		}
		
		this.renderer.render(this.scene, this.camera);
		
		APP.Main.stats.end();
	};
	
	
	var _kick = function(e) {
		if(this.lightMode == 'PartialLight') {
			var posX = (-APP.Main.windowW/2+e.clientX)*4;
			var posY = (APP.Main.windowH/2-e.clientY)*4;
			TweenLite.to(this.pointLight.position, 1.5, {x:posX, y:posY, ease:Quad.easeOut});
		}
		
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
			
			cubeToKick.kick(this.colorizationMode);
		}
		
		return false;
	};
	
	
	var _enlargeLight = function() {
		this.isEnlarge = true;
	};
	
	
	var _reduceLight = function() {
		this.isEnlarge = false;
	};
	
	
	return new Index();
	
	
})(window);


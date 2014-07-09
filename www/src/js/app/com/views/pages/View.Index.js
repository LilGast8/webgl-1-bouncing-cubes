

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
		
		this.scene = null;
		this.camera = null;
		this.renderer = null;
		this.projector = null;
		
		this.NB_X_ROWS = 5;
		this.NB_Y_ROWS = 3;
		this.NB_CUBES = this.NB_X_ROWS*this.NB_Y_ROWS;
		this.aCubes = [];
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
		
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	var _initScene = function() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(50, APP.Main.windowW/APP.Main.windowH, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({antialias:true});
		this.projector = new THREE.Projector();
		
		this.renderer.setSize(APP.Main.windowW, APP.Main.windowH);
		this.$.sceneContainer[0].appendChild(this.renderer.domElement);
		
		
		/* -------- Light 1 -------- */
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		this.directionalLight.position.set(-20, 20, 200);
		this.scene.add(this.directionalLight);
		
		
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
		
		/* -------- Light 5 -------- *
		this.spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/3, 150);
		this.spotLight.position.set(-500, 250, 500);
		this.scene.add(this.spotLight);
		*/
		
		
		this.camera.position.z = 500;
	};
	
	
	var _initCubes = function() {
		var cube = null;
		var posX = -200/2*(this.NB_X_ROWS-1);
		var posY = 200/2*(this.NB_Y_ROWS-1);
		
		for(var i=0; i<this.NB_CUBES; i++) {
			cube = new APP.Views.Cube(i+1, posX, posY);
			cube.init();
			this.aCubes.push(cube);
			
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
		
		this.renderer.render(this.scene, this.camera);
		
		APP.Main.stats.end();
	};
	
	
	return new Index();
	
	
})(window);


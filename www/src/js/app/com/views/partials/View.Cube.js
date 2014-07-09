

APP.Views = APP.Views || {};


APP.Views.Cube = (function(window){
	
	
	function Cube(id, x, y) {
		APP.View.call(this);
		
		this.name = 'cube-'+id;
		
		this.x = x;
		this.y = y;
		this.rotationX = Math.random()*0.1-0.05;
		this.rotationY = Math.random()*0.1-0.05;
		
		this.scene = null;
		this.cube = null;
	}
	
	
	Cube.prototype = Object.create(APP.View.prototype);
	Cube.prototype.constructor = Cube;
	
	
	Cube.prototype.initElt = function() {
		this.scene = APP.Views.Index.scene;
		
		var color = new THREE.Color(0xffffff);
		color.setRGB(Math.random(), Math.random(), Math.random());
		var geometry = new THREE.BoxGeometry(100, 100, 100);
		var material = new THREE.MeshPhongMaterial({color:color, wireframe:false});
		
		this.cube = new THREE.Mesh(geometry, material);
		this.cube.position.x = this.x;
		this.cube.position.y = this.y;
		this.cube.position.z = -200;
		
		this.scene.add(this.cube);
	};
	
	
	Cube.prototype.bindEvents = function() {
		
	};
	
	
	Cube.prototype.render = function() {
		this.cube.rotation.x += this.rotationX;
		this.cube.rotation.y += this.rotationY;
	};
	
	
	return Cube;
	
	
})(window);



APP.Views = APP.Views || {};


APP.Views.Cube = (function(window){
	
	
	function Cube(id, x, y) {
		APP.View.call(this);
		
		this.name = 'cube-'+id;
		
		this.x = x;
		this.y = y;
		this.z = 0;
		this.rotationX = Math.random()*0.1-0.05;
		this.rotationY = Math.random()*0.1-0.05;
		this.rotationZ = Math.random()*0.1-0.05;
		
		this.isKicked = false;
		this.coeffRotation = 1;
		
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
		var material = new THREE.MeshPhongMaterial({color:color});
		
		this.cube = new THREE.Mesh(geometry, material);
		this.cube.position.x = this.x;
		this.cube.position.y = this.y;
		this.cube.position.z = this.z;
		
		this.scene.add(this.cube);
	};
	
	
	Cube.prototype.bindEvents = function() {
		
	};
	
	
	Cube.prototype.render = function() {
		this.cube.rotation.x += this.rotationX*this.coeffRotation;
		this.cube.rotation.y += this.rotationY*this.coeffRotation;
		this.cube.rotation.z += this.rotationZ*this.coeffRotation;
	};
	
	
	Cube.prototype.kick = function() {
		if(this.isKicked) return false;
		else this.isKicked = true;
		
		var durUp = 1.5;
		var durDown = 3;
		var delay = durUp-0.5;
		
		TweenLite.to(this.cube.material.color, durUp+durDown, {r:Math.random(), g:Math.random(), b:Math.random(), ease:Quart.easeOut});
		
		TweenLite.to(this, durUp, {coeffRotation:0.1, ease:Quad.easeOut});
		TweenLite.to(this, durDown, {coeffRotation:1, ease:Quad.easeOut, delay:delay});
		
		TweenLite.to(this.cube.position, durUp, {z:2000, ease:Quart.easeOut});
		var self = this;
		TweenLite.to(this.cube.position, durDown, {z:0, ease:Bounce.easeOut, delay:delay, onComplete:function(){
			self.isKicked = false;
		}});
	};
	
	
	return Cube;
	
	
})(window);


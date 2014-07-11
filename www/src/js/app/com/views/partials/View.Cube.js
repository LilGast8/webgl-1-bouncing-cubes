

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
		this.greyId = null;
		
		this.isKicked = false;
		this.coeffRotation = 1;
		
		this.scene = null;
		this.cubeContainer = null;
		this.cube = null;
	}
	
	
	Cube.prototype = Object.create(APP.View.prototype);
	Cube.prototype.constructor = Cube;
	
	
	Cube.prototype.initElt = function() {
		this.scene = APP.Views.Index.scene;
		this.cubeContainer = APP.Views.Index.cubeContainer;
		
	//	var color = new THREE.Color();
	//	color.setRGB(Math.random(), Math.random(), Math.random());
		
		var greyId = Math.round(Math.random()*255);
		var color = new THREE.Color('rgb('+greyId+','+greyId+','+greyId+')');
		this.greyId = color.r;
		
		var geometry = new THREE.BoxGeometry(100, 100, 100);
		var material = new THREE.MeshPhongMaterial({color:color});
		
		this.cube = new THREE.Mesh(geometry, material);
		this.cube.position.x = this.x;
		this.cube.position.y = this.y;
		this.cube.position.z = this.z;
		
	//	this.scene.add(this.cube);
		this.cubeContainer.add(this.cube);
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
		
		var cubeUpDur = 1.5;
		var cubeDownDur = 3;
		var cubeDelay = cubeUpDur-0.5;
		
		var toColorDur = cubeDelay;
		var toGreyDur = 0.9;
		var toGreyDelay = cubeDownDur-toGreyDur;
		
		TweenLite.to(this.cube.material.color, toColorDur, {r:Math.random(), g:Math.random(), b:Math.random(), ease:Quart.easeOut});
		TweenLite.to(this.cube.material.color, toGreyDur, {r:this.greyId, g:this.greyId, b:this.greyId, ease:Quad.easeOut, delay:toGreyDelay});
		
		TweenLite.to(this, cubeUpDur, {coeffRotation:0.1, ease:Quad.easeOut});
		TweenLite.to(this, cubeDownDur, {coeffRotation:1, ease:Quad.easeOut, delay:cubeDelay});
		
		TweenLite.to(this.cube.position, cubeUpDur, {z:2000, ease:Quart.easeOut});
		var self = this;
		TweenLite.to(this.cube.position, cubeDownDur, {z:0, ease:Bounce.easeOut, delay:cubeDelay, onComplete:function(){
			self.isKicked = false;
		}});
	};
	
	
	return Cube;
	
	
})(window);


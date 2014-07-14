

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
		
		var color = APP.Views.Index.colorizationType == 'FromColorToColor' ? this.colorize('init') : this.darken('init');
		var geometry = new THREE.BoxGeometry(100, 100, 100);
		var material = new THREE.MeshPhongMaterial({color:color});
		
		this.cube = new THREE.Mesh(geometry, material);
		this.cube.position.set(this.x, this.y, this.z);
		
		this.cubeContainer.add(this.cube);
	};
	
	
	Cube.prototype.bindEvents = function() {
		
	};
	
	
	Cube.prototype.destroy = function() {
		this.cubeContainer.remove(this.cube);
		
		this.name = null;
		
		this.x = null;
		this.y = null;
		this.z = null;
		this.rotationX = null;
		this.rotationY = null;
		this.rotationZ = null;
		this.greyId = null;
		
		this.isKicked = null;
		this.coeffRotation = null;
		
		this.scene = null;
		this.cubeContainer = null;
		this.cube = null;
		
		this.scene = null;
		this.cubeContainer = null;
	};
	
	
	Cube.prototype.render = function() {
		this.cube.rotation.x += this.rotationX*this.coeffRotation;
		this.cube.rotation.y += this.rotationY*this.coeffRotation;
		this.cube.rotation.z += this.rotationZ*this.coeffRotation;
	};
	
	
	Cube.prototype.kick = function(type) {
		if(this.isKicked) return false;
		else this.isKicked = true;
		
		var cubeUpDur = 1.5;
		var cubeDownDur = 3;
		var cubeDelay = cubeUpDur-0.5;
		
		var toColorDur = cubeDelay;
		var toGreyDur = 0.9;
		var toGreyDelay = cubeDownDur-toGreyDur;
		
		if(type == 'FromGreyToColorToGrey') {
			TweenLite.to(this.cube.material.color, toColorDur, {r:Math.random(), g:Math.random(), b:Math.random(), ease:Quart.easeOut});
			TweenLite.to(this.cube.material.color, toGreyDur, {r:this.greyId, g:this.greyId, b:this.greyId, ease:Quad.easeOut, delay:toGreyDelay});
		}
		else if(type == 'FromGreyToColor' || type == 'FromColorToColor') 
			TweenLite.to(this.cube.material.color, cubeUpDur, {r:Math.random(), g:Math.random(), b:Math.random(), ease:Quart.easeOut});
		
		TweenLite.to(this, cubeUpDur, {coeffRotation:0.1, ease:Quad.easeOut});
		TweenLite.to(this, cubeDownDur, {coeffRotation:1, ease:Quad.easeOut, delay:cubeDelay});
		
		TweenLite.to(this.cube.position, cubeUpDur, {z:2000, ease:Quart.easeOut});
		var self = this;
		TweenLite.to(this.cube.position, cubeDownDur, {z:0, ease:Bounce.easeOut, delay:cubeDelay, onComplete:function(){
			self.isKicked = false;
		}});
	};
	
	
	Cube.prototype.darken = function(type) {
		var greyId = Math.round(Math.random()*255);
		var color = new THREE.Color('rgb('+greyId+','+greyId+','+greyId+')');
		this.greyId = color.r;
		
		if(type == 'init') return color;
		else if(type == 'change') TweenLite.to(this.cube.material.color, 2, {r:this.greyId, g:this.greyId, b:this.greyId, ease:Quad.easeOut});
	};
	
	
	Cube.prototype.colorize = function(type) {
		if(type == 'init') {
			var color = new THREE.Color();
			color.setRGB(Math.random(), Math.random(), Math.random());
			return color;
		}
		else if(type == 'change') TweenLite.to(this.cube.material.color, 2, {r:Math.random(), g:Math.random(), b:Math.random(), ease:Quad.easeOut});
	};
	
	
	return Cube;
	
	
})(window);


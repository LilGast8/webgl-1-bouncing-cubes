

APP.View = (function(window) {
	
	
	function View() {
		APP.EventDispatcher.call(this);
		
		this.$ = {};
		
		this.EVENT = {
			LOADED : 'loaded',
			INIT : 'init',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
	}
	
	
	View.prototype = Object.create(APP.EventDispatcher.prototype);
	View.prototype.constructor = View;
	
	
	View.prototype.init = function() {
		this.initElt();
		this.bindEvents();
	};
	
	
	View.prototype.initElt = function() {
		
	};
	
	
	View.prototype.bindEvents = function() {
		
	};
	
	
	View.prototype.unbindEvents = function() {
		
	};
	
	
	View.prototype.killTweens = function() {
		
	};
	
	
	View.prototype.destroy = function() {
		this.unbindEvents();
		
		this.killTweens();
		
		this.$ = {};
	};
	
	
	return View;
	
	
})(window);


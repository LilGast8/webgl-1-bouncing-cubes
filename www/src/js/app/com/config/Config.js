

APP.Config = (function(window) {
	
	
	function Config() {
		this.LOCALHOST = LOCALHOST;
		this.PROD  = PROD;
		this.WEB_ROOT = WEB_ROOT;
		
		this.BROWSER = null;
		this.BROWSER_VERSION = null;
		this.DEVICE = null;
		this.IS_IE = null;
		this.IE_VERSION = null;
	}
	
	
	Config.prototype.init = function() {
		this.BROWSER = Detectizr.browser.name;
		this.BROWSER_VERSION = Detectizr.browser.version;
		this.DEVICE = Detectizr.device.type;
		this.IS_IE = APP.Config.BROWSER == 'ie' ? true : false;
		this.IE_VERSION = null;
	};
	
	
	return new Config();
	
	
})(window);


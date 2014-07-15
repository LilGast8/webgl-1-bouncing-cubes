

APP.DatGui = (function(window){
	
	
	function DatGui() {
		this.$ = {};
		this.gui = null;
	}
	
	
	DatGui.prototype.init = function() {
		this.gui = new dat.GUI({
			width : 300
		});
		var changeXRows = this.gui.add(APP.Views.Index, 'NB_X_ROWS', 10, 40);
		var changeYRows = this.gui.add(APP.Views.Index, 'NB_Y_ROWS', 10, 40);
		var background = this.gui.add(APP.Views.Index, 'backgroundColor', ['Dark', 'Light', 'EpilepticKiller']);
		var colorization = this.gui.add(APP.Views.Index, 'colorizationMode', ['FromGreyToColorToGrey', 'FromGreyToColor', 'FromColorToColor']);
		var camera = this.gui.add(APP.Views.Index, 'cameraMode', ['Perspective3D', 'Flat3D']);
	//	var light = this.gui.add(APP.Views.Index, 'lightMode', ['GlobalLight', 'PartialLight', 'TheyComeFromDarkness']);
		this.light = this.gui.add(APP.Views.Index, 'lightMode', ['GlobalLight', 'PartialLight', 'TheyComeFromDarkness']);
		
		changeXRows.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		changeYRows.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		background.onChange(APP.Views.Index.changeBackground.bind(APP.Views.Index));
		colorization.onChange(_manageColorization.bind(this));
	//	camera.onChange(APP.Views.Index.changeView.bind(APP.Views.Index));
		camera.onChange(_manageCamera.bind(this));
		this.light.onChange(_manageLight.bind(this));
		
		this.$.bgcModeSelect = $('.dg .main ul li:nth-child(3) select');
		this.$.lightModeSelect = $('.dg .main ul li:nth-child(6) select');
		
		_disabledLightSelect.call(this);
	};
	
	
	var _manageColorization = function(v) {
		if(v == 'FromGreyToColorToGrey' || v == 'FromGreyToColor') APP.Views.Index.darkenCubes();
		else if(v == 'FromColorToColor') APP.Views.Index.colorizeCubes();
	};
	
	
	var _manageCamera = function(v) {
		if(v == 'Perspective3D') {
			if(this.$.lightModeSelect[0].selectedIndex == 1) {
				this.$.lightModeSelect[0].selectedIndex = 0;
				APP.Views.Index.changeLight('GlobalLight');
			}
			_disabledLightSelect.call(this);
		}
		else if(v == 'Flat3D') _enabledLightSelect.call(this);
		
		APP.Views.Index.changeView(v);
	};
	
	
	var _manageLight = function(v) {
		if(v == 'TheyComeFromDarkness') {
			console.log(this.gui.__controllers[2]);
			console.log(this.gui.__controllers[2].options);
			console.log(this.gui.__controllers[2].__select);
			
			if(this.gui.__controllers[2].getValue() != 'Dark') this.gui.__controllers[2].setValue('Dark');
			
		//	this.gui.__controllers[2].__select.disabled = true;
			_disabledBgcSelect.call(this);
			
			/*
			if(this.$.bgcModeSelect[0].selectedIndex !== 0) {
				console.log('bg dark');
				
			//	this.$.bgcModeSelect[0].selectedIndex = 0;
				
			//	console.log(this.light);
			//	this.light.updateDisplay();
			//	console.log(this.gui.__controllers);
			//	this.gui.__controllers[2].setValue();
				
				
			//	APP.Views.Index.changeBackground('Dark');
			//	light.onChange();
			}
			*/
			
		}
		else _enabledBgcSelect.call(this);
		
		APP.Views.Index.changeLight(v);
	};
	
	
	var _disabledBgcSelect = function() {
	//	this.$.bgcModeSelect[0].disabled = true;
		this.gui.__controllers[2].__select.disabled = true;
	};
	
	
	var _enabledBgcSelect = function() {
	//	this.$.bgcModeSelect[0].disabled = false;
		this.gui.__controllers[2].__select.disabled = false;
	};
	
	
	var _disabledLightSelect = function() {
		this.$.lightModeSelect[0].disabled = true;
	};
	
	
	var _enabledLightSelect = function() {
		this.$.lightModeSelect[0].disabled = false;
	};
	
	
	return new DatGui();
	
	
})(window);


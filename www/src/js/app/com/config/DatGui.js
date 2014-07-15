

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
		var light = this.gui.add(APP.Views.Index, 'lightMode', ['GlobalLight', 'PartialLight', 'TheyComeFromDarkness']);
		this.gui.add(APP.Views.Index, 'autoKick');
		
		changeXRows.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		changeYRows.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		background.onChange(APP.Views.Index.changeBackground.bind(APP.Views.Index));
		colorization.onChange(_manageColorization.bind(this));
		camera.onChange(_manageCamera.bind(this));
		light.onChange(_manageLight.bind(this));
		
		this.bgcModeController = this.gui.__controllers[2];
		this.bgcModeSelect = this.bgcModeController.__select;
		this.lightModeController = this.gui.__controllers[5];
		this.lightModeSelect = this.lightModeController.__select;
		
		_disabledLightSelect.call(this);
	};
	
	
	var _manageColorization = function(v) {
		if(v == 'FromGreyToColorToGrey' || v == 'FromGreyToColor') APP.Views.Index.darkenCubes();
		else if(v == 'FromColorToColor') APP.Views.Index.colorizeCubes();
	};
	
	
	var _manageCamera = function(v) {
		if(v == 'Perspective3D') {
			if(this.lightModeController.getValue() != 'GlobalLight') this.lightModeController.setValue('GlobalLight');
			_disabledLightSelect.call(this);
		}
		else _enabledLightSelect.call(this);
		
		APP.Views.Index.changeView(v);
	};
	
	
	var _manageLight = function(v) {
		if(v == 'TheyComeFromDarkness') {
			if(this.bgcModeController.getValue() != 'Dark') this.bgcModeController.setValue('Dark');
			_disabledBgcSelect.call(this);
		}
		else _enabledBgcSelect.call(this);
		
		APP.Views.Index.changeLight(v);
	};
	
	
	var _disabledBgcSelect = function() {
		this.bgcModeSelect.disabled = true;
	};
	
	
	var _enabledBgcSelect = function() {
		this.bgcModeSelect.disabled = false;
	};
	
	
	var _disabledLightSelect = function() {
		this.lightModeSelect.disabled = true;
	};
	
	
	var _enabledLightSelect = function() {
		this.lightModeSelect.disabled = false;
	};
	
	
	return new DatGui();
	
	
})(window);


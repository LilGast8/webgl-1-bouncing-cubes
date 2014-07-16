

APP.DatGui = (function(window){
	
	
	function DatGui() {
		this.$ = {};
		this.gui = null;
	}
	
	
	DatGui.prototype.init = function() {
		this.gui = new dat.GUI({
			width : 300
		});
		var changeRowsX = this.gui.add(APP.Views.Index, 'nbRowsX', 10, 40).step(1);
		var changeRowsY = this.gui.add(APP.Views.Index, 'nbRowsY', 10, 40).step(1);
		var background = this.gui.add(APP.Views.Index, 'backgroundColor', ['Dark', 'Light', 'EpilepticKiller']);
		var colorization = this.gui.add(APP.Views.Index, 'colorizationMode', ['FromGreyToColorToGrey', 'FromGreyToColor', 'FromColorToColor']);
		var camera = this.gui.add(APP.Views.Index, 'cameraMode', ['Perspective3D', 'Flat3D']);
		var light = this.gui.add(APP.Views.Index, 'lightMode', ['GlobalLight', 'PartialLight', 'TheyComeFromDarkness']);
		this.gui.add(APP.Views.Index, 'autoKick');
		this.gui.add(APP.Views.Index, 'massiveKick');
		this.gui.add(APP.Views.Index, 'mkDelay', 0, 2500, 100).step(10);
		var mkByWaves = this.gui.add(APP.Views.Index, 'mkByWaves');
		
		changeRowsX.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		changeRowsY.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		background.onChange(_manageBackground.bind(this));
		colorization.onChange(_manageColorization.bind(this));
		camera.onChange(_manageCamera.bind(this));
		light.onChange(_manageLight.bind(this));
		mkByWaves.onChange(_manageMkByWaves.bind(this));
		
		this.bgcModeController = this.gui.__controllers[2];
		this.cameraModeController = this.gui.__controllers[4];
		this.lightModeController = this.gui.__controllers[5];
		this.mkDelayController = this.gui.__controllers[8];
		this.mkByWavesController = this.gui.__controllers[9];
	};
	
	
	var _manageBackground = function(v) {
		if(v != 'Dark' && this.lightModeController.getValue() != 'GlobalLight') this.lightModeController.setValue('GlobalLight');
		
		APP.Views.Index.changeBackground(v);
	};
	
	var _manageColorization = function(v) {
		if(v == 'FromGreyToColorToGrey' || v == 'FromGreyToColor') APP.Views.Index.darkenCubes();
		else if(v == 'FromColorToColor') APP.Views.Index.colorizeCubes();
	};
	
	
	var _manageCamera = function(v) {
		if(v == 'Perspective3D' && this.lightModeController.getValue() != 'GlobalLight') this.lightModeController.setValue('GlobalLight');
		
		APP.Views.Index.changeView(v);
	};
	
	
	var _manageLight = function(v) {
		if(v != 'GlobalLight' && this.cameraModeController.getValue() != 'Flat3D') this.cameraModeController.setValue('Flat3D');
		if(v != 'GlobalLight' && this.bgcModeController.getValue() != 'Dark') this.bgcModeController.setValue('Dark');
		
		APP.Views.Index.changeLight(v);
	};
	
	
	var _manageMkByWaves = function(v) {
		if(v && this.mkDelayController.getValue() !== 0) this.mkDelayController.setValue(100);
	};
	
	
	return new DatGui();
	
	
})(window);


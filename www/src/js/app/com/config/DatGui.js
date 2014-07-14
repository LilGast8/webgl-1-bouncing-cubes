

APP.DatGui = (function(window){
	
	
	function DatGui() {
		this.gui = null;
	}
	
	
	DatGui.prototype.init = function() {
		this.gui = new dat.GUI({
			width : 300
		});
		console.log(this.gui);
		var changeXRows = this.gui.add(APP.Views.Index, 'NB_X_ROWS', 10, 40);
		var changeYRows = this.gui.add(APP.Views.Index, 'NB_Y_ROWS', 10, 40);
		var background = this.gui.add(APP.Views.Index, 'backgroundColor', ['Dark', 'Light']);
		var colorization = this.gui.add(APP.Views.Index, 'colorizationType', ['FromGreyToColorToGrey', 'FromGreyToColor', 'FromColorToColor']);
		var camera = this.gui.add(APP.Views.Index, 'cameraType', ['Perspective3D', 'Flat3D']);
		var light = this.gui.add(APP.Views.Index, 'lightType', ['DirectionalLight', 'PointLight']);
		
		changeXRows.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		changeYRows.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		background.onChange(APP.Views.Index.changeBackground.bind(APP.Views.Index));
		colorization.onChange(_manageColorization.bind(this));
		camera.onChange(APP.Views.Index.changeView.bind(APP.Views.Index));
		light.onChange(APP.Views.Index.changeLight.bind(APP.Views.Index));
		
		$('.dg .main ul li:nth-child(6) select')[0].disabled = 'disabled';
	};
	
	
	var _manageColorization = function(v) {
		if(v == 'FromGreyToColorToGrey' || v == 'FromGreyToColor') APP.Views.Index.darkenCubes();
		else if(v == 'FromColorToColor') APP.Views.Index.colorizeCubes();
	};
	
	
	return new DatGui();
	
	
})(window);


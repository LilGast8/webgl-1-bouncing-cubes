

APP.DatGui = (function(window){
	
	
	function DatGui() {
		this.gui = null;
	}
	
	
	DatGui.prototype.init = function() {
		this.gui = new dat.GUI();
		var changeXRows = this.gui.add(APP.Views.Index, 'NB_X_ROWS', 10, 40);
		var changeYRows = this.gui.add(APP.Views.Index, 'NB_Y_ROWS', 10, 40);
		var colorization = this.gui.add(APP.Views.Index, 'colorizationType', ['FromGreyToColorToGrey', 'FromGreyToColor', 'FromColorToColor']);
		var camera = this.gui.add(APP.Views.Index, 'cameraType', ['Perspective3D', 'Flat3D']);
		
		changeXRows.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		changeYRows.onFinishChange(APP.Views.Index.updateCubes.bind(APP.Views.Index));
		colorization.onChange(_manageColorization.bind(this));
		camera.onChange(APP.Views.Index.changeView.bind(APP.Views.Index));
	};
	
	
	var _manageColorization = function(v) {
		if(v == 'FromGreyToColorToGrey' || v == 'FromGreyToColor') APP.Views.Index.darkenCubes();
		else if(v == 'FromColorToColor') APP.Views.Index.colorizeCubes();
	};
	
	
	return new DatGui();
	
	
})(window);


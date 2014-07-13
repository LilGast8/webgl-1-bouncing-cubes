

APP.DatGui = (function(window){
	
	
	function DatGui() {
		this.gui = null;
	}
	
	
	DatGui.prototype.init = function() {
		this.gui = new dat.GUI();
		var changeXRows = this.gui.add(APP.Views.Index, 'NB_X_ROWS', 10, 40);
		var changeYRows = this.gui.add(APP.Views.Index, 'NB_Y_ROWS', 10, 40);
		var colorizationType = this.gui.add(APP.Views.Index, 'colorizationType', ['FromGreyToColorToGrey', 'FromGreyToColor', 'FromColorToColor']);
		
		changeXRows.onFinishChange(_changeNumberCube.bind(this));
		changeYRows.onFinishChange(_changeNumberCube.bind(this));
		colorizationType.onChange(_manageColorization.bind(this));
	};
	
	
	var _changeNumberCube = function(v) {
		APP.Views.Index.updateCubes();
	};
	
	
	var _manageColorization = function(v) {
		if(v == 'FromGreyToColorToGrey') APP.Views.Index.darkenCubes();
		else if(v == 'FromGreyToColor') APP.Views.Index.darkenCubes();
		else if(v == 'FromColorToColor') APP.Views.Index.colorizeCubes();
	};
	
	
	return new DatGui();
	
	
})(window);


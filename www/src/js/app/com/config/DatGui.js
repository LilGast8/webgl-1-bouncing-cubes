

APP.DatGui = (function(window){
	
	
	function DatGui() {
		this.gui = null;
	}
	
	
	DatGui.prototype.init = function() {
		this.gui = new dat.GUI();
		this.gui.add(APP.Views.Index, 'NB_X_ROWS', 10, 40);
		this.gui.add(APP.Views.Index, 'NB_Y_ROWS', 10, 40);
		this.gui.add(APP.Views.Index, 'colorizationType', ['FromGrayToColorToGray', 'FromGrayToColor', 'FromColorToColor']);
		
	//	gui.add(text, 'speed', -5, 5);
	//	gui.add(text, 'displayOutline');
	//	gui.add(text, 'explode');
	};
	
	
	return new DatGui();
	
	
})(window);


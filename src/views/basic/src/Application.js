//# A Basic View <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/views/basic/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//This file demonstrates how to create a simple view.

//Import the ui.View class.
import ui.View as View;

//## Class: Application
exports = Class(GC.Application, function() {

	this._settings = {
		logsEnabled: window.DEV_MODE,
		showFPS: window.DEV_MODE,
		clearEachFrame: true,
		alwaysRepaint: true,
		preload: []
	};

	this.initUI = function() {
		// Create a single red squared view...
		var view = new View({
			superview: this.view,
			backgroundColor: "red",
			x: 20,
			y: 20,
			width: 100,
			height: 100
		});
	};

	this.launchUI = function () {};
});

//The output should look like this screenshot:
//<img src="./doc/screenshot.png" alt="a view screenshot" class="screenshot">

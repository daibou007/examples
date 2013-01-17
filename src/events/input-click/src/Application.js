//# Handling click events <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/events/input-click/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//This file demonstrates how to handle click events, when the view is clicked the color changes.

//Import the `ui.View` class.
import ui.View as View;

//## Class: Application
//Create an application with the clickable view.
exports = Class(GC.Application, function () {

	//Create a new instance of the ClickBox view with the applications view as superview.
	this.initUI = function () {
		var clickbox = new ClickBox({
			superview: this.view,
			x: 10,
			y: 10,
			width: 100,
			height: 100,
			backgroundColor: "#ff0000"
		});
	};

	this.launchUI = function () {};
});

//## Class: ClickBox
//Create a view which changes color when clicked.
var ClickBox = Class(View, function (supr) {
	this.init = function (opts) {
		supr(this, "init", [opts]);

		this.on('InputSelect', function () {
			// Change the background color of this view
			var bg_color = (this.style.backgroundColor === '#ff0000') ? '#0000ff' : '#ff0000';
			this.updateOpts({backgroundColor: bg_color});
		});
	};
});

//The output should look like this screenshot:
//<img src="./doc/screenshot1.png" alt="a book screenshot" class="screenshot">
//After clicking on the red rectangle the screen should look like this:
//<img src="./doc/screenshot2.png" alt="a book screenshot" class="screenshot">

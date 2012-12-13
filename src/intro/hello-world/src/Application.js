//# Hello, World!

//Import the [TextView](http://doc.gameclosure.com/api/ui-text.html#class-ui.textview) class to use as a local variable.
import ui.TextView as TextView;

//## Class: Application
exports = Class(GC.Application, function () {

	//The settings for the application. Details can be found in the [AppEngine API docs](http://doc.gameclosure.com/api/appengine.html#application-settings).
	this._settings = {
		logsEnabled: window.DEV_MODE,
		showFPS: window.DEV_MODE,
		clearEachFrame: true,
		alwaysRepaint: true,
		preload: []
	};

	//The `initUI` function is called after the scene graph has been created.
	this.initUI = function () {
		//Create a new TextView
		var textview = new TextView({
			superview: this.view, //Once attached to the view hierarchy it is a part of the scene graph and will be rendered.
			layout: "box", //The layout system is explained in detail in the [Designing User Interfaces Guide](http://doc.gameclosure.com/guide/designing-user-interfaces.html).
			text: "Hello, world!", //The text to display.
			color: "white"
		});
	};

	//The `launchUI` function is executed when teh game is ready and the splash screen has been removed.
	this.launchUI = function () {};
});

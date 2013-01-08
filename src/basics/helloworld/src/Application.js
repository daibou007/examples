//# Hello, World! <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/basics/helloworld/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//For a more detailed walk-through, take a look at the [Hello, World! Guide](http://doc.gameclosure.com/guide/hello-world.html).

//Import the [TextView](http://doc.gameclosure.com/api/ui-text.html#class-ui.textview) class to use locally.
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
			//Once attached to the view hierarchy it is a part of the scene graph and will be rendered.
			superview: this.view,
			//The layout system is explained in detail in the [Designing User Interfaces Guide](http://doc.gameclosure.com/guide/designing-user-interfaces.html).
			layout: "box",
			//The text to display.
			text: "Hello, world!",
			color: "white"
		});
	};

	//The `launchUI` function is executed when teh game is ready and the splash screen has been removed.
	this.launchUI = function () {};
});

//## Modify a View's Style
//Create many views with random positions, sizes, rotations, and colors.

//Import the `device` module and `ui.View` class.
import device;
import ui.View as View;

//## Class: Application
exports = Class(GC.Application, function () {
	this.initUI = function () {
		//Create 200 views
		for (var i = 0; i < 200; i++) {
			//Randomize the size, shape, position, and color of each View.
			var view = new View({
				superview: this.view,
				x: Math.random() * device.width - 25,
				y: Math.random() * device.height - 25,
				width: Math.random() * 50,
				height: Math.random() * 50,
				r: Math.random() * (Math.PI * 2),
				backgroundColor: getRandomColor()
			});
		}
	};
});

//Generate a random color string in hexadecimal format.
function getRandomColor () {
	var hex = Math.floor(Math.random() * 0xFFFFFF);
	return '#' + ('000000' + hex.toString(16)).substr(-6); //pad string
}

//<img src="./doc/screenshot.png" alt="view style screenshot" class="screenshot">
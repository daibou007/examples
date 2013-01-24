import device;

import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		this.view.style.backgroundColor = "#FFFFFF";

		//Create button2 first because button1 and button2 bind callbacks to this button...
		this._button2 = new ButtonView({
			superview: this.view,
			width: 200,
			height: 60,
			x: device.width / 2 - 100,
			y: 150,
			images: {
				up: "resources/images/window3.png",
				down: "resources/images/window2.png",
				unselect: "resources/images/window3.png",
				disabled: "resources/images/window2.png"
			},
			scaleMethod: '9slice',
			sourceSlices: {
				horizontal: {left: 25, center: 100, right: 25},
				vertical: {top: 25, middle: 100, bottom: 25}
			},
			title: "Button",
			text: {
				size: 20
			}
		});

		//When this button is clicked then the button in the middle will be disabled...
		new ButtonView({
			superview: this.view,
			width: 200,
			height: 60,
			x: device.width / 2 - 100,
			y: 50,
			images: {
				up: "resources/images/window1.png",
				down: "resources/images/window2.png",
				unselect: "resources/images/window3.png"
			},
			scaleMethod: '9slice',
			sourceSlices: {
				horizontal: {left: 25, center: 100, right: 25},
				vertical: {top: 25, middle: 100, bottom: 25}
			},
			on: {
				up: bind(this._button2, "setState", ButtonView.states.DISABLED)
			},
			title: "Disable",
			text: {
				size: 20
			}
		});

		//When this button is clicked then the button in the middle will be enabled...
		new ButtonView({
			superview: this.view,
			width: 200,
			height: 60,
			x: device.width / 2 - 100,
			y: 250,
			images: {
				up: "resources/images/window1.png",
				down: "resources/images/window2.png",
				unselect: "resources/images/window3.png"
			},
			scaleMethod: '9slice',
			sourceSlices: {
				horizontal: {left: 25, center: 100, right: 25},
				vertical: {top: 25, middle: 100, bottom: 25}
			},
			on: {
				down: bind(this._button2, "setState", ButtonView.states.UP)
			},
			title: "Enable",
			text: {
				size: 20
			}
		});
	};

	this.launchUI = function () {};
});
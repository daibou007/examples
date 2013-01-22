import device;

import ui.View as View;
import ui.TextView as TextView;
import ui.widget.SliderView as SliderView;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		this.view.style.backgroundColor = "#FFFFFF";

		this._sliderVer = new SliderView({
			superview: this.view,
			minValue: 0,
			maxValue: 100,
			value: 50,
			active: true, // Optional

			track: {
				active: 'resources/images/window3.png',
				inactive: 'resources/images/window1.png',
				scaleMethod: '9slice',
				sourceSlices: {
					horizontal: {left: 50, center: 100, right: 50},
					vertical: {top: 50, middle: 100, bottom: 50}
				},
				destSlices: {
					horizontal: {left: 10, right: 10},
					vertical: {top: 10, bottom: 10}
				}
			},
			thumb: {
				active: 'resources/images/window3.png',
				pressed: 'resources/images/window2.png',
				inactive: 'resources/images/window1.png',
				scaleMethod: '9slice',
				sourceSlices: {
					horizontal: {left: 50, center: 100, right: 50},
					vertical: {top: 50, middle: 100, bottom: 50}
				},
				destSlices: {
					horizontal: {left: 10, right: 10},
					vertical: {top: 10, bottom: 10}
				}
			},

			x: device.width / 2 - 120,
			y: 50,
			width: 30,
			height: 200
		});
		this._sliderVer.on("Change", bind(this, "onChangeVer"));

		// Show the vertical value
		this._horValue = new TextView({
			superview: this.view,
			backgroundColor: "#E0E0E0",
			x: device.width / 2 - 60,
			y: 60,
			width: 120,
			height: 50,
			color: "#000000",
			size: 11,
			horizontalAlign: "center",
			verticalALign: "center",
			text: "horizontal\n50",
			clip: true,
			autoFontSize: false,
			wrap: true
		});

		this._sliderHor = new SliderView({
			superview: this.view,
			minValue: 0,
			maxValue: 100,
			value: 50,
			active: true, // Optional

			track: {
				activeColor: '#008800',
				inactiveColor: '#E0E0E0'
			},
			thumb: {
				activeColor: '#00AA00',
				pressedColor: '#990000',
				inactiveColor: '#B0B0B0'
			},

			x: device.width / 2 - 80,
			y: 10,
			width: 200,
			height: 30
		});
		this._sliderHor.on("Change", bind(this, "onChangeHor"));

		// Show the vertical value
		this._verValue = new TextView({
			superview: this.view,
			backgroundColor: "#E0E0E0",
			x: device.width / 2 - 60,
			y: 120,
			width: 120,
			height: 50,
			color: "#000000",
			size: 11,
			horizontalAlign: "center",
			verticalALign: "center",
			text: "vertical\n50",
			clip: true,
			autoFontSize: false,
			wrap: true
		});

		var left = device.width / 2 - 140;
		//A button to change the value of the horizontal slider
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setHorValue"),
			x: left,
			y: 270,
			title: "hor value",
			options: [0, 50, 100]
		});
		//A button to set the padding of the horizontal slider
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setHorPadding"),
			x: left,
			y: 305,
			title: "hor padding",
			options: [0, 4, [4, 20]]
		});
		//A button to change the horizontal thumb size
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setHorThumbSize"),
			x: left,
			y: 340,
			title: "hor thumb",
			options: ["auto", 60, 100]
		});
		//A button to change the horizontal increment
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setHorIncrement"),
			x: left,
			y: 375,
			title: "hor increment",
			options: [false, 1, 3, 5]
		});
		//A button to change the horizontal range
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setHorRange"),
			x: left,
			y: 410,
			title: "hor range",
			options: [[0, 100], [-50, 50], [-200, -100]]
		});
		//A button to activate/deactivate the horizontal slider
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setHorActive"),
			x: left,
			y: 445,
			title: "hor active",
			options: [true, false]
		});

		var left = device.width / 2 + 5;
		//A button to change the contents of the TextView
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setVerValue"),
			x: left,
			y: 270,
			title: "ver value",
			options: [0, 50, 100]
		});
		//A button to set the padding of the vertical slider
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setVerPadding"),
			x: left,
			y: 305,
			title: "ver padding",
			options: [0, 4, [20, 4]]
		});
		//A button to activate/deactivate the vertical slider
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setVerThumbSize"),
			x: left,
			y: 340,
			title: "ver thumb",
			options: ["auto", 60, 100]
		});
		//A button to change the vertical increment
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setVerIncrement"),
			x: left,
			y: 375,
			title: "ver increment",
			options: [false, 1, 3, 5]
		});
		//A button to change the horizontal range
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setVerRange"),
			x: left,
			y: 410,
			title: "ver range",
			options: [[0, 100], [-50, 50], [100, 200]]
		});
		//A button to activate/deactivate the vertical slider
		new SliderViewSetting({
			superview: this.view,
			callback: bind(this, "setVerActive"),
			x: left,
			y: 445,
			title: "ver active",
			options: [true, false]
		});
	};

	this.onChangeHor = function (value) {
		this._horValue.setText("horizontal\n" + value);
	};

	this.onChangeVer = function (value) {
		this._verValue.setText("vertical\n" + value);
	};

	this.setHorValue = function (value) {
		this._sliderHor.setValue(value);
	};

	this.setHorPadding = function (padding) {
		this._sliderHor.style.padding = padding;
	};

	this.setHorThumbSize = function (thumbSize) {
		this._sliderHor.setThumbSize(thumbSize);
	};

	this.setHorIncrement = function (increment) {
		this._sliderHor.setIncrement(increment);
	};

	this.setHorRange = function (range) {
		this._sliderHor.setMinValue(range[0]);
		this._sliderHor.setMaxValue(range[1]);
	};

	this.setHorActive = function (active) {
		this._sliderHor.setActive(active);
	};

	this.setVerValue = function (value) {
		this._sliderVer.setValue(value);
	};

	this.setVerPadding = function (padding) {
		this._sliderVer.style.padding = padding;
	};

	this.setVerThumbSize = function (thumbSize) {
		this._sliderVer.setThumbSize(thumbSize);
	};

	this.setVerIncrement = function (increment) {
		this._sliderVer.setIncrement(increment);
	};

	this.setVerRange = function (range) {
		this._sliderVer.setMinValue(range[0]);
		this._sliderVer.setMaxValue(range[1]);
	};

	this.setVerActive = function (active) {
		this._sliderVer.setActive(active);
	};

	this.launchUI = function () {};
});

function optionValue (s) {
	s += "";
	return (s.length > 10) ? (s.substr(0, 10) + "...") : s;
}

//A button to modify settings of the TextView
var SliderViewSetting = Class(View, function (supr) {
	this.init = function (opts) {
		opts.width = 135;
		opts.height = 30;

		supr(this, "init", [opts]);

		this._textViewOpts = opts.textViewOpts;
		this._callback = opts.callback;
		this._optionIndex = 0;
		this._options = opts.options;
		this._title = opts.title;

		this._text = new TextView({
			superview: this,
			backgroundColor: "#404040",
			width: opts.width,
			height: opts.height,
			color: "#FFFFFF",
			size: 11,
			horizontalAlign: "center",
			verticalALign: "center",
			wrap: false,
			autoSize: false,
			autoFontSize: false,
			text: opts.title + "=" + optionValue(this._options[0]),
			clip: true
		});
	};

	this.onInputSelect = function () {
		//Step through the available options
		this._optionIndex = (this._optionIndex + 1) % this._options.length;
		this._text.setText(this._title + "=" + optionValue(this._options[this._optionIndex]));
		this._callback(this._options[this._optionIndex]);
	};
});
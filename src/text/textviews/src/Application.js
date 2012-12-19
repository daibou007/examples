import ui.View as View;
import ui.TextView as TextView;
import device;

function optionValue (s) {
	s += "";
	return (s.length > 10) ? (s.substr(0, 10) + "...") : s;
}

var TextViewSetting = Class(View, function (supr) {
	this.init = function (opts) {
		opts.width = 135;
		opts.height = 30;

		supr(this, "init", [opts]);

		this._target = opts.target;
		this._textViewOpts = opts.textViewOpts;
		this._options = opts.options;
		this._optionIndex = 0;
		this._property = opts.property;

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
			text: opts.property + "=" + optionValue(this._options[0]),
			clip: true
		});
	};

	this.onInputSelect = function () {
		this._optionIndex = (this._optionIndex + 1) % this._options.length;
		this._text.setText(this._property + "=" + optionValue(this._options[this._optionIndex]));
		this._textViewOpts[this._property] = this._options[this._optionIndex];
		this._target.updateOpts(this._textViewOpts);
	};
});

exports = Class(GC.Application, function () {

	this._settings = {
		logsEnabled: window.DEV_MODE,
		showFPS: window.DEV_MODE,
		clearEachFrame: true,
		alwaysRepaint: true,
		preload: []
	};

	this.initUI = function () {
		this.view.style.backgroundColor = "#FFFFFF";

		this._textViewOpts = {
			superview: this.view,
			layout: "box",
			text: "Aenean ipsum nisi, facilisis id lacinia ut, viverra vel justo.",
			color: "#FFFFFF",
			backgroundColor: "#FF0000",
			horizontalAlign: "left",
			wrap: true,
			autoSize: false,
			autoFontSize: false,
			verticalAlign: "top",
			x: device.width / 2 - 140,
			y: 10,
			width: 280,
			height: 200,
			size: 70,
			fontFamily: "Arial Black",
			clip: true
		};
		var textView = new TextView(this._textViewOpts);
		var left = device.width / 2 - 140;
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 220,
			property: "text",
			options: ["Aenean ipsum nisi, facilisis id lacinia ut, viverra vel justo.", "Ipsum."]
		});

		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 255,
			property: "size",
			options: [70, 30, 20]
		});
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 290,
			property: "width",
			options: [280, 110, 60]
		});
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 325,
			property: "height",
			options: [200, 100, 50]
		});
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 360,
			property: "autoFontSize",
			options: [false, true]
		});
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 395,
			property: "autoSize",
			options: [false, true]
		});
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 430,
			property: "wrap",
			options: [true, false]
		});

		left = device.width / 2 + 5;

		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 220,
			property: "horizontalAlign",
			options: ["left", "center", "right", "justify"]
		});
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 255,
			property: "horizontalPadding",
			options: [0, 25, [10, 30]]
		});
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 290,
			property: "verticalAlign",
			options: ["top", "middle", "bottom"]
		});
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 325,
			property: "verticalPadding",
			options: [0, 25, [10, 30]]
		});
	};

	this.launchUI = function () {};
});

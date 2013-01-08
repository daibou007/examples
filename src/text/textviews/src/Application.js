//# TextView: Text wrapping and alignment <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/text/textviews/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//This demo demonstrates different setting for the TextView class
import ui.View as View;
import ui.TextView as TextView;
import device;

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

		//Create the initial options, these options can be changed with the buttons defined below...
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
		//Create the TextView with the initial options
		var textView = new TextView(this._textViewOpts);

		var left = device.width / 2 - 140;
		//A button to change the contents of the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 220,
			property: "text",
			options: ["Aenean ipsum nisi, facilisis id lacinia ut, viverra vel justo.", "Ipsum."]
		});

		//A button to change the font size property of the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 255,
			property: "size",
			options: [70, 30, 20]
		});
		//A button to change the width of the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 290,
			property: "width",
			options: [280, 110, 60]
		});
		//A button to change the height of the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 325,
			property: "height",
			options: [200, 100, 50]
		});
		//A button the change the autoFontSize property of the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 360,
			property: "autoFontSize",
			options: [false, true]
		});
		//A button the change the autoSize property of the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 395,
			property: "autoSize",
			options: [false, true]
		});
		//A button to change the wrap property of the TextView
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

		//A button the change the horizontal text alignment of the text within the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 220,
			property: "horizontalAlign",
			options: ["left", "center", "right", "justify"]
		});
		//A button to change the horizontal padding of the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 255,
			property: "horizontalPadding",
			options: [0, 25, [10, 30]]
		});
		//A button to change the vertical alignment of the text within the TextView
		new TextViewSetting({
			superview: this.view,
			target: textView,
			textViewOpts: this._textViewOpts,
			x: left,
			y: 290,
			property: "verticalAlign",
			options: ["top", "middle", "bottom"]
		});
		//A button to change the vertical padding of TextView
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

function optionValue (s) {
	s += "";
	return (s.length > 10) ? (s.substr(0, 10) + "...") : s;
}

//A button to modify settings of the TextView
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
		//Step through the available options
		this._optionIndex = (this._optionIndex + 1) % this._options.length;
		this._text.setText(this._property + "=" + optionValue(this._options[this._optionIndex]));
		this._textViewOpts[this._property] = this._options[this._optionIndex];
		this._target.updateOpts(this._textViewOpts);
	};
});
//The output should look like this screenshot:
//<img src="./doc/screenshot.png" alt="a book screenshot" class="screenshot">
import ui.TextView as TextView;
import ui.View as View;
import ui.widget.GridView as GridView;

import device;

var DemoCellView = Class(View, function (supr) {
	this.move = function () {
		var opts = this._opts;
		var col = opts.col;
		var row = opts.row;

		col++;
		if (col >= this._superview.getCols()) {
			col = 0;
			row++;
			if (row >= this._superview.getRows()) {
				row = 0;
			}
		}
		opts.col = col;
		opts.row = row;
	};
});

exports = Class(GC.Application, function () {

	this._settings = {
		logsEnabled: window.DEV_MODE,
		showFPS: window.DEV_MODE,
		clearEachFrame: true, // Turning this off will improve performance, if the whole screen is being painted
		alwaysRepaint: true,
		preload: []
	};

	this.setHorizontalMargin = function (horizontalMargin) {
		this._gridView.updateOpts({horizontalMargin: horizontalMargin});
	};

	this.setVerticalMargin = function (verticalMargin) {
		this._gridView.updateOpts({verticalMargin: verticalMargin});
	};

	this.setHorizontalGutter = function (horizontalGutter) {
		this._gridView.updateOpts({horizontalGutter: horizontalGutter});
	};

	this.setVerticalGutter = function (verticalGutter) {
		this._gridView.updateOpts({verticalGutter: verticalGutter});
	};

	this.setCols = function (cols) {
		this._gridView.setCols(cols);
	};

	this.setRows = function (rows) {
		this._gridView.setRows(rows);
	};

	this.setColspan = function (colspan) {
		this._demoCell._opts.colspan = colspan;
	};

	this.setRowspan = function (rowspan) {
		this._demoCell._opts.rowspan = rowspan;
	};

	this.moveCell = function () {
		this._demoCell.move();
	};

	this.initUI = function () {
		this.view.style.backgroundColor = "#FFFFFF";

		this._gridView = new GridView({
			superview: this.view,
			backgroundColor: "#FF0000",
			x: device.width / 2 - 140,
			y: 10,
			width: 280,
			height: 200,
			cols: 5,
			rows: 4,
			//Make hide cells out of the grid range...
			hideOutOfRange: true,
			//Make cells in the grid range visible...
			showInRange: true
		});

		this._demoCell = new DemoCellView({superview: this._gridView, backgroundColor: "#880000", col: 0, row: 0});

		var left = device.width / 2 - 140;

		//A button to change the horizontal margin of the GridView
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 220,
			property: "horizontalMargin",
			setter: bind(this, "setHorizontalMargin"),
			options: [0, 10, [5, 15], [10, 0]]
		});
		//A button to change the vertical margin of the GridView
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 255,
			property: "verticalMargin",
			setter: bind(this, "setVerticalMargin"),
			options: [0, 10, [5, 15], [10, 0]]
		});
		//A button to change the number of columns
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 290,
			property: "cols",
			setter: bind(this, "setCols"),
			options: [5, 4]
		});
		//A button to change the colspan
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 325,
			property: "colspan",
			setter: bind(this, "setColspan"),
			options: [1, 2, 3]
		});
		//A button to move the cell
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 360,
			property: "",
			setter: bind(this, "moveCell"),
			options: ["move"]
		});

		left = device.width / 2 + 5;

		//A button to change the horizontal gutter of the GridView
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 220,
			property: "horizontalGutter",
			setter: bind(this, "setHorizontalGutter"),
			options: [0, 10]
		});
		//A button to change the vertical gutter of the GridView
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 255,
			property: "verticalGutter",
			setter: bind(this, "setVerticalGutter"),
			options: [0, 10]
		});
		//A button to change the number of rows
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 290,
			property: "rows",
			setter: bind(this, "setRows"),
			options: [4, 3]
		});
		//A button to change the number of rows
		new TextViewSetting({
			superview: this.view,
			target: this._gridView,
			x: left,
			y: 325,
			property: "rowspan",
			setter: bind(this, "setRowspan"),
			options: [1, 2, 3]
		});
	};

	this.launchUI = function () {};
});

function optionValue (s) {
	s += "";
	return (s.length > 10) ? (s.substr(0, 10) + "...") : s;
}

//A button to modify settings of a View
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
		this._setter = opts.setter;

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
		this._setter(this._options[this._optionIndex]);
	};
});
//The output should look like this screenshot:
//<img src="./doc/screenshot.png" alt="a book screenshot" class="screenshot">
import ui.TextView as TextView;
import ui.ScrollView as ScrollView;

import ui.View as View;

var Tabs = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(opts, {layout: "linear"});

		supr(this, "init", [opts]);

		this._position = opts.position || "top";
		this._buttonSize = opts.buttonSize || 30;

		this._panes = {};
		this._index = 0;

		var buttonsOpts = merge(opts.buttonsOpts, {superview: this, tag: "buttons"});
		this._buttons = new ScrollView(buttonsOpts);
		this._buttons.getContentView().updateOpts({layout: "linear", direction: "horizontal"});
		var contentOpts = merge(opts.contentOpts, {superview: this, flex: 1, layout: "linear", direction: "vertical", tag: "content"});
		this._content = new View(contentOpts);

		this._opts.buttonOpts = merge(this._opts.buttonOpts, {flex: 1});

		this.setButtonPosition(this._position);
	};

	this.addPane = function (button, child) {
		var index = button;

		if (typeof button === "string") {
			this._opts.buttonOpts.text = button;
			this._opts.buttonOpts.tag = button;
			button = new TextView(this._opts.buttonOpts);
		} else {
			this._index++;
			index = this._index.toString();
		}

		this._panes[index] = child;
		this._buttons.addSubview(button);

		child.style.visible = !this._content.getSubviews().length;
		this._content.addSubview(child);

		return index;
	};

	this.getPane = function (child) {

	};

	this.getPaneByTitle = function (title) {

	};

	this.removePane = function (child) {

	};

	this.removePaneByTitle = function (title) {

	};

	this.selectPane = function (child) {

	};

	this.selectPaneByTitle = function (title) {

	};

	this.getButton = function (title) {

	};

	this.setButtonPosition = function (position) {
		this.removeSubview(this._buttons);
		this.removeSubview(this._content);

		this._position = position;

		this._content.updateOpts({width: undefined, height: undefined});

		console.log(this._position);
		var views = [];
		switch (this._position) {
			case "top":
				views = [this._buttons, this._content];
				this.updateOpts({direction: "vertical"});
				this._buttons.getContentView().updateOpts({direction: "horizontal", width: undefined, height: this._buttonSize});
				this._buttons.updateOpts({width: undefined, height: this._buttonSize});
				this._content.updateOpts({direction: "vertical"});
				break;

			case "bottom":
				views = [this._content, this._buttons];
				this.updateOpts({direction: "vertical"});
				this._buttons.getContentView().updateOpts({direction: "horizontal", width: undefined, height: this._buttonSize});
				this._buttons.updateOpts({width: undefined, height: this._buttonSize});
				this._content.updateOpts({direction: "vertical"});
				break;

			case "left":
				views = [this._buttons, this._content];
				this.updateOpts({direction: "horizontal"});
				this._buttons.getContentView().updateOpts({direction: "vertical"});
				this._buttons.getContentView().updateOpts({width: this._buttonSize, height: undefined});
				this._buttons.updateOpts({width: this._buttonSize, height: undefined});
				this._content.updateOpts({direction: "horizontal"});
				break;

			case "right":
				views = [this._content, this._buttons];
				this.updateOpts({direction: "horizontal"});
				this._buttons.getContentView().updateOpts({direction: "vertical"});
				this._buttons.getContentView().updateOpts({width: this._buttonSize, height: undefined});
				this._buttons.updateOpts({width: this._buttonSize, height: undefined});
				this._content.updateOpts({direction: "horizontal"});
				break;
		}

		console.log(this._buttons._opts);
		this.addSubview(views[0]);
		this.addSubview(views[1]);
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
		var test = 0;

		this._tabs = new Tabs({
			superview: this,
			x: 10,
			y: 10,
			width: 300,
			height: 300,
			buttonsOpts: {
				backgroundColor: "#00FF00"
			},
			contentOpts: {
				backgroundColor: "#FF0000"
			}
		});

		var pane1 = new TextView({
			text: "Donec fringilla tempor odio quis tincidunt. Aenean ultricies dictum aliquet. Duis convallis nisl in est pretium pharetra.",
			flex: 1,
			wrap: true,
			horizontalAlign: "left",
			horizontalPadding: 20,
			verticalAlign: "top",
			verticalPadding: 20,
			tag: "pane1"
		});
		var pane2 = new TextView({
			text: "Curabitur quis velit eget lectus vestibulum sagittis. Sed et leo mauris, nec consequat urna. Praesent lorem nisi, fermentum eu posuere nec, aliquam quis risus. Donec faucibus erat ac nibh imperdiet vulputate. Sed ornare vulputate pellentesque.",
			flex: 1,
			wrap: true,
			horizontalAlign: "left",
			horizontalPadding: 20,
			verticalAlign: "top",
			verticalPadding: 20,
			tag: "pane2"
		});
		this._tabs.addPane("Hello", pane1);
		this._tabs.addPane("World", pane2);

		this._button = new View({
			superview: this,
			x: 10,
			y: 370,
			width: 100,
			height: 30,
			backgroundColor: "#888888"
		}).onInputSelect = bind(
			this,
			function() {
				test = (test + 1) & 3;
				this._tabs.setButtonPosition(["top", "bottom", "left", "right"][test]);
			}
		);
	};

	this.launchUI = function () {};
});

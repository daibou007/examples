import ui.TextView as TextView;
import ui.ScrollView as ScrollView;

import ui.View as View;

var Tabs = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(opts, {layout: "linear"});

		supr(this, "init", [opts]);

		this.tag = "tabs";

		this._position = opts.position || "top";
		this._buttonSize = opts.buttonSize || 30;

		this._activePane = null;
		this._panes = [];
		this._index = 1;

		var buttonsOpts = merge(opts.buttonsOpts, {superview: this, tag: "buttons"});
		this._buttons = new ScrollView(buttonsOpts);
		this._buttons.getContentView().updateOpts({layout: "linear", direction: "horizontal"});
		//this._buttons = new View(buttonsOpts);
		this._buttons.updateOpts({layout: "linear", direction: "horizontal"});
		var contentOpts = merge(opts.contentOpts, {superview: this, flex: 1, layout: "linear", direction: "vertical", tag: "content"});
		this._content = new View(contentOpts);

		this._opts.buttonOpts = merge(this._opts.buttonOpts, {flex: 1});

		this.setButtonPosition(this._position);
	};

	this._createButton = function (button) {
		var result = {};

		if (typeof button === "string") {
			var buttonOpts = {};
			for (var i in this._opts.buttonOpts) {
				buttonOpts[i] = this._opts.buttonOpts[i];
			}
			buttonOpts.text = button;
			result.buttonView = new TextView(buttonOpts);
			result.title = button;
		} else {
			result.buttonView = button;
			result.title = this._index++;
		}

		return result;
	};

	this.addPane = function (button, child) {
		var paneInfo = this._createButton(button);

		paneInfo.contentView = child;
		paneInfo.paneView = new View({layout: "box", layoutWidth: "100%", layoutHeight: "100%", visible: !this._content.getSubviews().length});
		paneInfo.paneView.tag = "pane" + (this._panes.length + 1);
		paneInfo.paneView.addSubview(child);
		paneInfo.buttonView.onInputSelect = bind(this, "onClickButton", paneInfo);

		this._buttons.addSubview(paneInfo.buttonView);
		this._content.addSubview(paneInfo.paneView);

		this._panes.push(paneInfo);

		this._activePane = this._activePane || paneInfo;

		return paneInfo.title;
	};

	this.onClickButton = function (paneInfo) {
		if (paneInfo !== this._activePane) {
			if (this._activePane) {
				this._activePane.paneView.updateOpts({visible: false});
				this.publish("HidePane", this._activePane);
			}
			this._activePane = paneInfo;
			this._activePane.paneView.updateOpts({visible: true});
			this.setButtonPosition(this._position); // this forces the layout to reflow...
			this.publish("ShowPane", paneInfo);
		}
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

		var dir = 0;
		var dirs = ["horizontal", "vertical"];
		var views = [];
		var buttonWidth, buttonHeight; // Don't assign values, one needs to be undefined!

		switch (this._position) {
			case "top":
				views = [this._buttons, this._content];
				buttonHeight = this._buttonSize;
				dir = 1;
				break;

			case "bottom":
				views = [this._content, this._buttons];
				buttonHeight = this._buttonSize;
				dir = 1;
				break;

			case "left":
				views = [this._buttons, this._content];
				buttonWidth = this._buttonSize;
				dir = 0;
				break;

			case "right":
				views = [this._content, this._buttons];
				buttonWidth = this._buttonSize;
				dir = 0;
				break;
		}

		this.updateOpts({direction: dirs[dir]});
		this._buttons.updateOpts({width: buttonWidth, height: buttonHeight});
		this._buttons.getContentView().updateOpts({direction: dirs[(dir + 1) & 1]});
		this._content.updateOpts({direction: dirs[dir]});

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
		var test = 3;

		this.view.tag = "root";

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
			},
			position: ["top", "bottom", "left", "right"][test],
			backgroundColor: "#0000DD"
		});

		var pane1 = new TextView({
			text: "Donec fringilla tempor odio quis tincidunt. Aenean ultricies dictum aliquet. Duis convallis nisl in est pretium pharetra.",
			wrap: true,
			horizontalAlign: "left",
			horizontalPadding: 20,
			verticalAlign: "top",
			verticalPadding: 20,
			tag: "pane1",
			backgroundColor: "#FFDD00",
			layout: "box",
			layoutWidth: "100%",
			layoutHeight: "100%"
		});
		var pane2 = new TextView({
			text: "Curabitur quis velit eget lectus vestibulum sagittis. Sed et leo mauris, nec consequat urna. Praesent lorem nisi, fermentum eu posuere nec, aliquam quis risus. Donec faucibus erat ac nibh imperdiet vulputate. Sed ornare vulputate pellentesque.",
			wrap: true,
			horizontalAlign: "left",
			horizontalPadding: 20,
			verticalAlign: "top",
			verticalPadding: 20,
			tag: "pane2",
			backgroundColor: "#00FFDD",
			layout: "box",
			layoutWidth: "100%",
			layoutHeight: "100%"
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

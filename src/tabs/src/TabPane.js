import ui.View as View;
import ui.ScrollView as ScrollView;

import .TabButton;

var TabPane = exports = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(opts, {layout: "linear"});

		supr(this, "init", [opts]);

		this.tag = "tabs";

		this._tabPosition = opts.tabPosition || "top";
		this._buttonSize = opts.buttonSize || 30;

		this._activePane = null;
		this._panes = [];
		this._index = 1;
		this._zIndex = 255;
		this._zIndexTimeout = null;

		opts.buttonsOpts = merge(
			opts.buttonsOpts,
			{
				superview: this,
				tag: "buttons",
				overlap: 1
			}
		);
		this._buttons = new ScrollView(opts.buttonsOpts);
		this._buttons.getContentView().updateOpts({layout: "linear", direction: "horizontal"});
		this._buttons.updateOpts({layout: "linear", direction: "horizontal"});

		var contentOpts = merge(
			opts.contentOpts,
			{
				superview: this,
				flex: 1,
				layout: "linear",
				direction: "vertical",
				tag: "content",
				//top: -2,
				backgroundColor: "#D0D0D0"
			}
		);
		this._content = new View(contentOpts);
		this._content.zIndex = -1;

		this._opts.buttonOpts = merge(this._opts.buttonOpts, {flex: 1});

		this.setTabPosition(this._tabPosition);
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
		paneInfo.paneView = new View({
			layout: "box",
			layoutWidth: "100%",
			layoutHeight: "100%",
			visible: !this._content.getSubviews().length
		});
		paneInfo.paneView.tag = "pane" + (this._panes.length + 1);
		paneInfo.paneView.addSubview(child);
		paneInfo.buttonView.onInputSelect = bind(this, "onClickButton", paneInfo);

		if ((this._tabPosition === "top") || (this._tabPosition === "bottom")) {
			paneInfo.buttonView.style.height = this._buttonSize;
		} else {
			paneInfo.buttonView.style.width = this._buttonSize;
		}

		this._buttons.addSubview(paneInfo.buttonView);
		this._content.addSubview(paneInfo.paneView);

//		if (this._panes.length) {
//			button.style.left = this._opts.buttonsOpts.overlap;
//		}

		this._panes.push(paneInfo);

		this._activePane = this._activePane || paneInfo;
		this._zIndexTimeout && clearTimeout(this._zIndexTimeout);
		this._zIndexTimeout = setTimeout(
			bind(
				this,
				function () {
					this._activePane.buttonView.style.zIndex = this._zIndex;
					this._zIndexTimeout = null;
				}
			),
			50
		);

		if (button instanceof TabButton) {
			button.setActive(this._activePane === paneInfo);
			button.setTabPane(this);
		}

		this._updateButtons();

		return paneInfo.title;
	};

	this._updateButtons = function () {
		var overlap = this._opts.buttonsOpts.overlap;
		var panes = this._panes;
		var pane = panes[0];
		var property = ((this._position === "top") || (this._position === "bottom")) ? "left" : "top";

		pane.buttonView.style.left = 0;
		pane.buttonView.style.top = 0;

		for (i = 1, j = panes.length; i < j; i++) {
			panes[i].buttonView.style[property] = overlap;
		}
	};

	this.onClickButton = function (paneInfo) {
		if (paneInfo !== this._activePane) {
			if (this._activePane) {
				if (this._activePane.buttonView instanceof TabButton) {
					this._activePane.buttonView.setActive(false);
				}
				this._activePane.paneView.updateOpts({visible: false});
				this.publish("HidePane", this._activePane);
			}

			this._zIndex++;
			paneInfo.buttonView.style.zIndex = this._zIndex;
			if (paneInfo.buttonView instanceof TabButton) {
				paneInfo.buttonView.setActive(true);
			}
			this._activePane = paneInfo;
			this._activePane.paneView.updateOpts({visible: true});
			this.setTabPosition(this._tabPosition); // this forces the layout to reflow...
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

	this.setTabPosition = function (tabPosition) {
		this.removeSubview(this._buttons);
		this.removeSubview(this._content);

		this._tabPosition = tabPosition;

		this._content.updateOpts({width: undefined, height: undefined});

		var dir = 0;
		var dirs = ["horizontal", "vertical"];
		var views = [];
		var buttonWidth, buttonHeight; // Don't assign values, one needs to be undefined!
		var scrollX = false;
		var scrollY = false;

		switch (this._tabPosition) {
			case "top":
				views = [this._buttons, this._content];
				buttonHeight = this._buttonSize;
				dir = 1;
				scrollX = true;
				break;

			case "bottom":
				views = [this._content, this._buttons];
				buttonHeight = this._buttonSize;
				dir = 1;
				scrollX = true;
				break;

			case "left":
				views = [this._buttons, this._content];
				buttonWidth = this._buttonSize;
				dir = 0;
				scrollY = true;
				break;

			case "right":
				views = [this._content, this._buttons];
				buttonWidth = this._buttonSize;
				dir = 0;
				scrollY = true;
				break;
		}

		this.updateOpts({direction: dirs[dir]});
		this._buttons.updateOpts({width: buttonWidth, height: buttonHeight, scrollX: scrollX, scrollY: scrollY});
		this._buttons.getContentView().updateOpts({direction: dirs[(dir + 1) & 1]});
		this._content.updateOpts({direction: dirs[dir]});

		this.addSubview(views[0]);
		this.addSubview(views[1]);
	};

	this.getTabPosition = function () {
		return this._tabPosition;
	};
});
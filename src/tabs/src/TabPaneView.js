import ui.View as View;
import ui.ScrollView as ScrollView;

import .TabPane;
import .TabButton;

var TabPaneView = exports = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(opts, {layout: "linear"});

		supr(this, "init", [opts]);

		this.tag = "tabs";

		this._tabPosition = opts.tabPosition || "top";

		this._buttonHeight = opts.buttonHeight || 30;
		this._buttonPadding = (opts.buttonPadding === undefined) ? 10 : opts.buttonPadding;
		this._buttonFixedWidth = opts.buttonFixedWidth;
		this._buttonCanScroll = false;

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
				backgroundColor: "#D0D0D0"
			}
		);
		this._content = new View(contentOpts);
		this._content.zIndex = -1;

		this._opts.buttonOpts = merge(this._opts.buttonOpts, {flex: 1});

		this.setTabPosition(this._tabPosition);
	};

	this._findTabPaneIndex = function (tabPane) {
		var panes = this._panes;
		var i = panes.length;
		while (i) {
			if (panes[--i] === tabPane) {
				return i;
			}
		}
		return false;
	};

	this._updateButtons = function () {
		var overlap = this._opts.buttonsOpts.overlap;
		var panes = this._panes;
		var property = this.getOffsetProperty();
		var tabPane = panes[0];
		var buttonView = tabPane.getButtonView();

		buttonView.style.left = 0;
		buttonView.style.top = 0;

		for (i = 1, j = panes.length; i < j; i++) {
			panes[i].getButtonView().style[property] = overlap;
		}
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
		var opts = this._createButton(button);

		opts.tabPaneView = this;
		opts.contentView = child;
		opts.buttonView.style[this.getSizeProperty()] = this._buttonHeight;

		this._buttons.addSubview(opts.buttonView);

		var tabPane = new TabPane(opts);
		tabPane.subscribe("Select", this, "onSelectPane");
		tabPane.subscribe("Remove", this, "onRemovePane");

		opts.buttonView.onInputSelect = bind(this, "onClickButton", tabPane);

		this._panes.push(tabPane);

		this._activePane = this._activePane || tabPane;
		this._zIndexTimeout && clearTimeout(this._zIndexTimeout);
		this._zIndexTimeout = setTimeout(
			bind(
				this,
				function () {
					this._activePane._buttonView.style.zIndex = this._zIndex;
					this._zIndexTimeout = null;
				}
			),
			50
		);

		if (button instanceof TabButton) {
			button.setPadding(this._buttonPadding);
			button.setFixedWidth(this._buttonFixedWidth);
			button.setActive(this._activePane === tabPane);
			button.setTabPane(this);
		}

		this._updateButtons();

		return tabPane;
	};

	this.onClickButton = function (tabPane) {
		if (tabPane !== this._activePane) {
			tabPane.select();
			this.setTabPosition(this._tabPosition); // this forces the layout to reflow...
		}
	};

	this.onSelectPane = function (tabPane) {
		this._activePane && this._activePane.deselect();
		this._activePane = tabPane;
	};

	this.onRemovePane = function (tabPane) {
		var index = this._findTabPaneIndex(tabPane);
		(index !== false) && this._panes.splice(index, 1);
	};

	this.reflow = function () {
		var property = this.getSizeProperty();
		var panes = this._panes;
		var size = 0;
		var i = panes.length;

		while (i) {
			size += panes[--i]._buttonView.style[property];
		}

		this._buttonCanScroll = size > this.style[property];

		var scrollX = false;
		var scrollY = false;

		if (this.isHorizontal()) {
			scrollX = this._buttonCanScroll;
		} else {
			scrollY = this._buttonCanScroll;
		}

		this._buttons.updateOpts({scrollX: scrollX, scrollY: scrollY});
	};

	this.isHorizontal = function () {
		return (this._tabPosition === "top") || (this._tabPosition === "bottom");
	};

	this.getOffsetProperty = function () {
		return this.isHorizontal() ? "left" : "top";
	};

	this.getSizeProperty = function () {
		return this.isHorizontal() ? "height" : "width";
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
				buttonHeight = this._buttonHeight;
				dir = 1;
				scrollX = this._buttonCanScroll;
				break;

			case "bottom":
				views = [this._content, this._buttons];
				buttonHeight = this._buttonHeight;
				dir = 1;
				scrollX = this._buttonCanScroll;
				break;

			case "left":
				views = [this._buttons, this._content];
				buttonWidth = this._buttonHeight; // Rotated 90 degrees, height assigned to width...
				dir = 0;
				scrollY = this._buttonCanScroll;
				break;

			case "right":
				views = [this._content, this._buttons];
				buttonWidth = this._buttonHeight; // Rotated 270 degrees, height assigned to width...
				dir = 0;
				scrollY = this._buttonCanScroll;
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

	this.getNextZIndex = function() {
		this._zIndex++;
		return this._zIndex;
	};

	this.getContent = function () {
		return this._content;
	};
});
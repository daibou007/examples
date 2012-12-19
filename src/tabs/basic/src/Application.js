import ui.View as View;
import ui.TextView as TextView;

import device;

import ui.widget.TabPaneView as TabPaneView;
import ui.widget.TabPaneButton as TabPaneButton;

var text1 = "Donec fringilla tempor odio quis tincidunt. Aenean ultricies dictum aliquet. Duis convallis nisl in est pretium pharetra.";
var text2 = "Curabitur quis velit eget lectus vestibulum sagittis. Sed et leo mauris, nec consequat urna. Praesent lorem nisi, fermentum eu posuere nec, aliquam quis risus. Donec faucibus erat ac nibh imperdiet vulputate. Sed ornare vulputate pellentesque.";
var text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec volutpat odio. Aliquam erat volutpat. Etiam vel consectetur tortor. Morbi vel facilisis leo. Nunc et erat in risus egestas posuere quis in neque. Suspendisse potenti.";

var TabPaneSetting = Class(View, function (supr) {
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
			text: opts.property + (this._target["set" + this._property] ? ("=" + this._options[0]) : ""),
			clip: true
		});
	};

	this.onInputSelect = function () {
		this._optionIndex = (this._optionIndex + 1) % this._options.length;

		if (this._target["set" + this._property]) {
			this._text.setText(this._property + "=" + this._options[this._optionIndex]);
			this._target["set" + this._property](this._options[this._optionIndex]);
		} else {
			this._options[this._optionIndex]();
		}
	};
});

var TextPage = Class(TextView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				wrap: true,
				horizontalAlign: "left",
				horizontalPadding: 20,
				verticalAlign: "top",
				verticalPadding: 20,
				layout: "box",
				layoutWidth: "100%",
				layoutHeight: "100%",
				color: "#000000"
			}
		);
		supr(this, "init", [opts]);
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

	this.addTabs = function () {
		this._tabPanes.push(this._tabs.addPane(new TabPaneButton({title: "Another"}), new TextPage({text: "This is another tab"})));
		this._tabPanes.push(this._tabs.addPane(new TabPaneButton({title: "Tab"}), new TextPage({text: "And this is one more tab"})));
	};

	this.removeTabs = function () {
		this._tabPanes.pop().remove();
		this._tabPanes.pop().remove();
	};

	this.initUI = function () {
		this.view.style.backgroundColor = "#FFFFFF";

		this._tabPanes = [];

		this._tabs = new TabPaneView({ superview: this, x: device.width / 2 - 140, y: 10, width: 280, height: 200, tabPosition: "top"});
		this._tabPanes.push(this._tabs.addPane(new TabPaneButton({title: "Game"}), new TextPage({text: text1})));
		this._tabPanes.push(this._tabs.addPane(new TabPaneButton({title: "Closure"}), new TextPage({text: text2})));
		this._tabPanes.push(this._tabs.addPane(new TabPaneButton({title: "Tabs"}), new TextPage({text: text3})));

		var left = device.width / 2 - 140;

		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 220,
			property: "TabPosition",
			options: ["top", "right", "bottom", "left"]
		});

		left = device.width / 2 + 5;

		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 220,
			property: "add/remove",
			options: [bind(this, "removeTabs"), bind(this, "addTabs")]
		});
	};

	this.launchUI = function () {};
});
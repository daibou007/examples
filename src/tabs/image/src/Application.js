import ui.TextView as TextView;
import ui.ScrollView as ScrollView;
import ui.ImageScaleView as ImageScaleView;
import ui.View as View;

import device;

import ui.widget.TabPaneView as TabPaneView;
import ui.widget.TabPaneButton as TabPaneButton;

var text1 = "Donec fringilla tempor odio quis tincidunt. Aenean ultricies dictum aliquet. Duis convallis nisl in est pretium pharetra.";
var text2 = "Curabitur quis velit eget lectus vestibulum sagittis. Sed et leo mauris, nec consequat urna. Praesent lorem nisi, fermentum eu posuere nec, aliquam quis risus. Donec faucibus erat ac nibh imperdiet vulputate. Sed ornare vulputate pellentesque.";
var text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec volutpat odio. Aliquam erat volutpat. Etiam vel consectetur tortor. Morbi vel facilisis leo. Nunc et erat in risus egestas posuere quis in neque. Suspendisse potenti.";

var TextPage = Class(ImageScaleView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				layout: "box",
				layoutWidth: "100%",
				layoutHeight: "100%",
				image: "resources/images/box.png",
				scaleMethod: "9slice",
				sourceSlices: {horizontal: {left: 3, center: 24, right: 3}, vertical: {top: 3, middle: 24, bottom: 3}},
				destSlices: {horizontal: {left: 3, right: 3}, vertical: {top: 3, bottom: 3}}
			}
		);
		supr(this, "init", [opts]);

		new TextView({
			superview: this,
			text: opts.text,
			wrap: true,
			horizontalAlign: "left",
			horizontalPadding: 20,
			verticalAlign: "top",
			verticalPadding: 20,
			layout: "box",
			layoutWidth: "100%",
			layoutHeight: "100%",
			color: "#000000"
		});
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

	this._createTabButton = function (title) {
		return new TabPaneButton({
			superview: this.view,
			image: "resources/images/tab.png",
			activeImage: "resources/images/tabActive.png",
			scaleMethod: "9slice",
			sourceSlices: {horizontal: {left: 20, center: 80, right: 20}, vertical: {top: 0, middle: 100, bottom: 0}},
			destSlices: {horizontal: {left: 20, right: 20}, vertical: {top: 0, bottom: 0}},
			color: "#505050",
			activeColor: "#000000",
			title: title
		});
	};

	this.initUI = function () {
		this.view.style.backgroundColor = "#FFFFFF";

		var tabs = new TabPaneView({
			superview: this,
			x: 10,
			y: 10,
			width: device.width - 20,
			height: 300,
			buttonOpts: {
				overlap: -30,
				padding: 50
			},
			tabPosition: "top"
		});
		tabs.addPane(this._createTabButton("Game"), new TextPage({text: text1}));
		tabs.addPane(this._createTabButton("Closure"), new TextPage({text: text2}));
		tabs.addPane(this._createTabButton("Tabs"), new TextPage({text: text3}));
	};

	this.launchUI = function () {};
});
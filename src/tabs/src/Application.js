import ui.TextView as TextView;
import ui.ScrollView as ScrollView;
import ui.ImageScaleView as ImageScaleView;

import ui.View as View;

import .TabPaneView;
import .TabButton;

var TextPage = Class(ImageScaleView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				layout: "box",
				layoutWidth: "100%",
				layoutHeight: "100%"
				//image: "resources/images/box.png",
				//scaleMethod: "9slice",
				//sourceSlices: {horizontal: {left: 3, center: 24, right: 3}, vertical: {top: 3, middle: 24, bottom: 3}},
				//destSlices: {horizontal: {left: 3, right: 3}, vertical: {top: 3, bottom: 3}}
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
		return new TabButton({
			superview: this.view,
			//x: 10,
			//y: 410,
			//width: 10,
			//height: 30,
			//image: "resources/images/tab.png",
			//activeImage: "resources/images/tabActive.png",
			//color: "#404040",
			//activeColor: "#000000",
			//backgroundColor: "red",
			//activeBackgroundColor: "green",
			title: title
		});
	};

	this.initUI = function () {
		var test = 2;

		this.view.tag = "root";
		this.view.style.backgroundColor = "#FFFFFF";

		this._tabs = new TabPaneView({
			superview: this,
			x: 10,
			y: 10,
			width: 300,
			height: 300,
			//buttonFixedWidth: 30,
			//buttonsOpts: {
			//	overlap: 30
			//},
			//contentOpts: {
			//	backgroundColor: "red"
			//},
			tabPosition: ["top", "bottom", "left", "right"][test]
		});

		var pane1 = new TextPage({
			text: "Donec fringilla tempor odio quis tincidunt. Aenean ultricies dictum aliquet. Duis convallis nisl in est pretium pharetra."
		});
		var pane2 = new TextPage({
			text: "Curabitur quis velit eget lectus vestibulum sagittis. Sed et leo mauris, nec consequat urna. Praesent lorem nisi, fermentum eu posuere nec, aliquam quis risus. Donec faucibus erat ac nibh imperdiet vulputate. Sed ornare vulputate pellentesque."
		});
		var pane3 = new TextPage({
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec volutpat odio. Aliquam erat volutpat. Etiam vel consectetur tortor. Morbi vel facilisis leo. Nunc et erat in risus egestas posuere quis in neque. Suspendisse potenti."
		});
		this._tabs.addPane(this._createTabButton("Hello"), pane1);
		this._tabs.addPane(this._createTabButton("World"), pane2);
		this._tabs.addPane(this._createTabButton("Game"), pane3);
	};

	this.launchUI = function () {};
});

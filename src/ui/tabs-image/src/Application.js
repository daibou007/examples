//# Tabs, image
//This demo demonstrates tabs styles with images
import ui.TextView as TextView;
import ui.ImageScaleView as ImageScaleView;

import device;

import ui.widget.TabPaneView as TabPaneView;
import ui.widget.TabPaneButtonView as TabPaneButtonView;

//A number of dummy texts which will be displayed in the tab panes
var text1 = "Donec fringilla tempor odio quis tincidunt. Aenean ultricies dictum aliquet. Duis convallis nisl in est pretium pharetra.";
var text2 = "Curabitur quis velit eget lectus vestibulum sagittis. Sed et leo mauris, nec consequat urna. Praesent lorem nisi, fermentum eu posuere nec, aliquam quis risus. Donec faucibus erat ac nibh imperdiet vulputate. Sed ornare vulputate pellentesque.";
var text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec volutpat odio. Aliquam erat volutpat. Etiam vel consectetur tortor. Morbi vel facilisis leo. Nunc et erat in risus egestas posuere quis in neque. Suspendisse potenti.";

//Create a tab page with a nine slice image border
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

		//The content for this pane
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

	//Create a button with a three slice image for the borders
	this._createTabButton = function (title) {
		return new TabPaneButtonView({
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
				//The buttons overlap
				buttonMargin: -30,
				padding: 30
			},
			//Move the content up two pixels to align the border
			contentOpts: {
				top: -2
			},
			tabPosition: TabPaneView.tabPosition.TOP
		});
		//Add three panes
		tabs.addPane(this._createTabButton("Game"), new TextPage({text: text1}));
		tabs.addPane(this._createTabButton("Closure"), new TextPage({text: text2}));
		tabs.addPane(this._createTabButton("Tabs"), new TextPage({text: text3}));
	};

	this.launchUI = function () {};
});
//The output should look like this screenshot:
//<img src="./doc/screenshot.png" alt="a book screenshot" class="screenshot">
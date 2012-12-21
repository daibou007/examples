import ui.View as View;
import ui.TextView as TextView;
import ui.ImageView as ImageView;

import device;

import ui.widget.TabPaneView as TabPaneView;

var text1 = "Donec fringilla tempor odio quis tincidunt. Aenean ultricies dictum aliquet. Duis convallis nisl in est pretium pharetra.";
var text2 = "Curabitur quis velit eget lectus vestibulum sagittis. Sed et leo mauris, nec consequat urna. Praesent lorem nisi, fermentum eu posuere nec, aliquam quis risus. Donec faucibus erat ac nibh imperdiet vulputate. Sed ornare vulputate pellentesque.";
var text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec volutpat odio. Aliquam erat volutpat. Etiam vel consectetur tortor. Morbi vel facilisis leo. Nunc et erat in risus egestas posuere quis in neque. Suspendisse potenti.";

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

	this.addIconPane = function (image, title, text) {
		var tabPane = this._tabs.addPane(title, new TextPage({text: text}))

		new ImageView({
			superview: tabPane.getButtonView(),
			image: "resources/images/" + image,
			layout: "box",
			width: 16,
			height: 16,
			right: 12,
			top: 18
		});

		return tabPane;
	};

	this.initUI = function () {
		this._tabPanes = [];
		this._index = 0;

		this._tabs = new TabPaneView({
			superview: this,
			x: 0,
			y: 0,
			layoutWidth: device.width,
			layoutHeight: device.height,
			tabPosition: TabPaneView.tabPosition.BOTTOM,
			buttonOpts: {
				image: "resources/images/tab.png",
				activeImage: "resources/images/tabActive.png",
				fontSize: 16,
				activeColor: "#FFFFFF",
				tabSize: TabPaneView.tabSize.FLEX,
				padding: [15, 0],
				buttonMargin: 0,
				buttonHeight: 50,
				horizontalAlign: "left"
			}
		});
		this._tabPanes.push(this.addIconPane("brick.png", "Brick", text1));
		this._tabPanes.push(this.addIconPane("accept.png", "Accept", text2));
		this._tabPanes.push(this.addIconPane("bell.png", "Bell", text3));
	};

	this.launchUI = function () {};
});
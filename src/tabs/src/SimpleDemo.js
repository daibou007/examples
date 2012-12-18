import ui.TextView as TextView;

import device;

import .TabPaneView;
import .TabButton;

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

	this.initUI = function () {
		this.view.style.backgroundColor = "#FFFFFF";

		var tabs = new TabPaneView({ superview: this, x: 10, y: 10, width: device.width - 20, height: 300, tabPosition: "top"});
		tabs.addPane(new TabButton({title: "Game"}), new TextPage({text: text1}));
		tabs.addPane(new TabButton({title: "Closure"}), new TextPage({text: text2}));
		tabs.addPane(new TabButton({title: "Tabs"}), new TextPage({text: text3}));
	};

	this.launchUI = function () {};
});
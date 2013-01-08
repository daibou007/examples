//# Tabs, Basic <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/ui/tabs-basic/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//This demo demonstrates the different options for a tab pane
import device;
import ui.View as View;
import ui.TextView as TextView;
import ui.resource.Image as Image;
import ui.widget.TabPaneView as TabPaneView;

//A number of dummy texts which will be displayed in the tab panes
var text1 = "Donec fringilla tempor odio quis tincidunt. Aenean ultricies dictum aliquet. Duis convallis nisl in est pretium pharetra.";
var text2 = "Curabitur quis velit eget lectus vestibulum sagittis. Sed et leo mauris, nec consequat urna. Praesent lorem nisi, fermentum eu posuere nec, aliquam quis risus. Donec faucibus erat ac nibh imperdiet vulputate. Sed ornare vulputate pellentesque.";
var text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec volutpat odio. Aliquam erat volutpat. Etiam vel consectetur tortor. Morbi vel facilisis leo. Nunc et erat in risus egestas posuere quis in neque. Suspendisse potenti.";

//The TextPage holds the content shown in the tabs
var TextPage = Class(TextView, function (supr) {
	this.init = function (opts) {
		opts = merge(opts, {
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

	// Add two tab panes
	this.addTabs = function () {
		this._tabPanes.push(this._tabs.addPane("Another", new TextPage({text: "This is another tab"})));
		this._tabPanes.push(this._tabs.addPane("Tab", new TextPage({text: "And this is one more tab"})));
	};

	//Remove two tab panes
	this.removeTabs = function () {
		this._tabPanes.pop().remove();
		this._tabPanes.pop().remove();
	};

	//Select the next tab pane
	this.selectNext = function () {
		this._index = (this._index + 1) % this._tabPanes.length;
		this._tabPanes[this._index].select();
	};

	//Change the sizing to AUTO, the tabs take the size needed to fit the title
	this.setTabSizeAuto = function () {
		this._tabs.updateButtonOpts({tabSize: TabPaneView.tabSize.AUTO});
	};

	//Change the sizing to FIXED, the tabs take the given fixed size
	this.setTabSizeFixed = function () {
		this._tabs.updateButtonOpts({tabSize: TabPaneView.tabSize.FIXED});
	};

	//Change the sizing to FLEX, the tabs take the width of the tab pane view divided by the number of tabs
	this.setTabSizeFlex = function () {
		this._tabs.updateButtonOpts({tabSize: TabPaneView.tabSize.FLEX});
	};

	//Horizontal align the title to the left
	this.setAlignLeft = function () {
		this._tabs.updateButtonOpts({horizontalAlign: "left"});
	};

	//Horizontal align the title to the center
	this.setAlignCenter = function () {
		this._tabs.updateButtonOpts({horizontalAlign: "center"});
	};

	//Horizontal align the title to the right
	this.setAlignRight = function () {
		this._tabs.updateButtonOpts({horizontalAlign: "right"});
	};

	//Vertical align the title to the top
	this.setAlignTop = function () {
		this._tabs.updateButtonOpts({verticalAlign: "top"});
	};

	//Vertical align the title to the middle
	this.setAlignMiddle = function () {
		this._tabs.updateButtonOpts({verticalAlign: "middle"});
	};

	//Vertical align the title to the bottom
	this.setAlignBottom = function () {
		this._tabs.updateButtonOpts({verticalAlign: "bottom"});
	};

	//Add a background image to the tab buttons
	this.addImage = function () {
		this._tabs.updateButtonOpts({image: "resources/images/tab.png"});
	};

	//Remove the background image from the tab buttons by assigning an empty image
	this.removeImage = function () {
		this._tabs.updateButtonOpts({image: new Image()});
	};

	this.initUI = function () {
		this.view.style.backgroundColor = "#FFFFFF";

		//An array to store references to the tab panes
		this._tabPanes = [];
		//The active tab pane
		this._index = 0;

		//Create a tab pane
		this._tabs = new TabPaneView({
			superview: this,
			x: device.width / 2 - 140,
			y: 10,
			width: 280,
			height: 200,
			//Start options for the tab button
			buttonOpts: {
				tabSize: TabPaneView.tabSize.AUTO,
				padding: 10,
				fixedWidth: 70
			}
		});
		//Add the panes and save them in the _tabPanes array
		this._tabPanes.push(this._tabs.addPane("Game", new TextPage({text: text1})));
		this._tabPanes.push(this._tabs.addPane("Closure", new TextPage({text: text2})));
		this._tabPanes.push(this._tabs.addPane("Tabs", new TextPage({text: text3})));

		//Create buttons to select different options for the tab pane
		var left = device.width / 2 - 140;

		//A button to change the size of the tab buttons
		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 220,
			property: "TabPosition",
			options: [TabPaneView.tabPosition.TOP, TabPaneView.tabPosition.RIGHT, TabPaneView.tabPosition.BOTTOM, TabPaneView.tabPosition.LEFT]
		});
		//A button to change the sizing of the buttons
		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 255,
			property: "TabSize",
			options: [bind(this, "setTabSizeAuto"), bind(this, "setTabSizeFixed"), bind(this, "setTabSizeFlex")]
		});
		//A button to change the horizontal alignment of the text of the tab buttons
		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 290,
			property: "HorizontalAlign",
			options: [bind(this, "setAlignLeft"), bind(this, "setAlignCenter"), bind(this, "setAlignRight")]
		});
		//A button to change the vertical alignment of the text of the tab buttons
		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 325,
			property: "VerticalAlign",
			options: [bind(this, "setAlignTop"), bind(this, "setAlignMiddle"), bind(this, "setAlignBottom")]
		});
		//A button the set or remove the background image
		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 360,
			property: "Image",
			options: [bind(this, "removeImage"), bind(this, "addImage")]
		});

		left = device.width / 2 + 5;

		//A button to add or remove extra panes
		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 220,
			property: "add/remove",
			options: [bind(this, "removeTabs"), bind(this, "addTabs")]
		});
		//A button to select the next tab pane
		new TabPaneSetting({
			superview: this.view,
			target: this._tabs,
			x: left,
			y: 255,
			property: "select next",
			options: [bind(this, "selectNext")]
		});
	};

	this.launchUI = function () {};
});

//Create a view to display a tab option...
var TabPaneSetting = Class(View, function (supr) {
	this.init = function (opts) {
		opts.width = 135;
		opts.height = 30;

		supr(this, "init", [opts]);

		this._target = opts.target;
		this._textViewOpts = opts.textViewOpts;
		//The available options
		this._options = opts.options;
		//The selected option
		this._optionIndex = 0;
		//The property controlled by this button
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
		//Step through the options
		this._optionIndex = (this._optionIndex + 1) % this._options.length;

		//Check if it's a setter or a property
		if (this._target["set" + this._property]) {
			this._text.setText(this._property + "=" + this._options[this._optionIndex]);
			this._target["set" + this._property](this._options[this._optionIndex]);
		} else {
			this._options[this._optionIndex]();
		}
	};
});
//The output should look like this screenshot:
//<img src="./doc/screenshot.png" alt="a book screenshot" class="screenshot">
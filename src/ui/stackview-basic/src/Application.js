//# Multiple Stacked Modals Using a StackView <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/ui/stackview-basic/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>

import ui.View as View;
import ui.TextView as TextView;
import ui.StackView as StackView;

//## Class: Application
exports = Class(GC.Application, function () {
	this.initUI = function () {
		this.style.backgroundColor = "#FFFFFF";

		var stackView = new StackView({
			superview: this.view,
			x: 50,
			y: 50,
			height: 200,
			width: 200,
			backgroundColor: "#999"
		});

		//when added to a stackView, child views take the same dimensions.
		var front = new TextView({
			x: 0,
			y: 0,
			text: "Click to dismiss! This is the front view.",
			backgroundColor: "#00F" //blue
		});

		var middle = new TextView({
			x: 0,
			y: 0,
			text: "Click to dismiss! This is the middle view.",
			backgroundColor: "#0F0" //green
		});

		var back = new TextView({
			x: 0,
			y: 0,
			text: "Click to dismiss! This is the back view.",
			backgroundColor: "#F00" //red
		});

		function popOff () {
			stackView.pop(this);
		}

		front.on('InputStart', popOff);
		middle.on('InputStart', popOff);
		back.on('InputStart', popOff);

		//Don't animate the views as they are attached to the stackView.
		stackView.push(front, true);
		stackView.push(middle, true);
		stackView.push(back, true);
	};

	this.launchUI = function () {};
});

//<img src="./doc/screenshot.png" alt="view style screenshot" class="screenshot">

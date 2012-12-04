import ui.TextView;

import src.Slide as Slide;

exports = Class(Slide, function () {
	this.title = "Text";
	
	this.example = function () {
		// This is centered in the demo area.
		var textview = new ui.TextView({
			superview: this,
			width: 568,
			height: 400,
			x: 36,
			y: 108,
			text: "Hello, world!",
			fontSize: 72,
			shadow: true,
			shadowColor: "#999",
			verticalAlign: "top"
		});
	};
});

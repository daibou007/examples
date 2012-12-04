import ui.TextPromptView;
import ui.TextView;

import src.Slide as Slide;

exports = Class(Slide, function (supr) {
	this.title = "User text input";
	
	this.example = function () {
		// We need a view to display the message.
		var message = new ui.TextView({
			superview: this, //
			x: 36, //
			y: 200, //
			text: "Hello!",
			fontSize: 48,
			textAlign: "left",
			verticalAlign: "top",
			layout: "box"
		});
		
		// This is basically a textview, with the addition of a prompt option.
		var textinputview = new ui.TextPromptView({
			superview: this, //
			width: 568, //
			height: 1, //
			x: 36, //
			y: 108, //
			backgroundColor: "hsla(345, 81%, 50%, 0.2)",
			text: "Name...",
			prompt: "Please enter your name:",
			fontSize: 36,
			textAlign: "left",
			horizontalPadding: 5,
			verticalPadding: 5
		});

		textinputview.on("Change", function (name) {
			// We get passed the entered text, then update the message with it.
			message.setText("Hello, " + name + "!");
		});
	};
});

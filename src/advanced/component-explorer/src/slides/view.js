import animate;
import ui.View;
import ui.TextView;

import resources.configs.global as config;
import src.Slide as Slide;

exports = Class(Slide, function (supr) {
	this.title = "Basics";
	
	this.textList = [
		"Welcome to the Game Closure SDK tour!",
		"Let's get started. Here's a view with a background color and input handler.",
		"On the right is the associated code.",
		"Tap the view to proceed."
	];
	
	this.textOpts = {
		height: 200,
		x: 0,
		y: 0,
		fontSize: 36,
		horizontalPadding: 36,
		verticalPadding: 36,
		textAlign: "left",
		verticalAlign: "top"
	};
	
	// Recursively shows the intro text and associated elements.
	this.showText = function (i) {
		var text = this.textView.getText() + " " + this.textList[i];
		
		// We can't animate specific sections of text, so create a temporary
		// TextView that includes the new text...
		var more = new ui.TextView(merge({
			superview: this,
			opacity: 0,
			text: text
		}, this.textOpts));
		
		// ...and fade that in.
		animate(more).wait(1000).then({
			opacity: 1
		}, 300, animate.easeIn).then(function () {
			// Now, update the original TextView...
			this.textView.updateOpts({text: text});
			
			// ...and remove the temporary one.
			more.removeFromSuperview()
			
			// More left? Continue!
			i < this.textList.length - 1 && this.showText(i + 1);
		}.bind(this));
		
		// Also fade in the view if it's being mentioned.
		i === 1 && animate(this.getSubview(2)).wait(2500).then({
			opacity: 1
		}, 1000);
		
		// Same with the code.
		i === 2 && animate(this.code).wait(2500).then({
			opacity: 1
		}, 1000);
	};
	
	this.buildView = function () {
		supr(this, "buildView");
		
		// Hide and reposition things! We need a clean slate.
		this.title.bar.style.opacity = 0;
		this.getSubview(2).style.opacity = 0;
		this.code.style.opacity = 0;
		this.code.style.y = 200;
		
		this.textView = new ui.TextView(merge({
			superview: this,
			width: this.getSuperview().style.width,
			height: 100,
			text: ""
		}, this.textOpts));
		
		this.showText(0);
	};
	
	this.example = function () {
		var deck = this.getSuperview();
		
		var view = new ui.View({
			superview: this,
			backgroundColor: "#F0F",
			width: 300,
			height: 300,
			x: 36,
			y: 200
		});

		view.on("InputSelect", function () {
			// Since we've hidden the top bar, this has to be called manually.
			deck.next();
		});
	};
});

import animate;
import ui.View;

import src.Slide as Slide;

exports = Class(Slide, function () {
	this.title = "Animation";
	
	this.example = function () {
		// We need a view to animate.
		var view = new ui.View({
			superview: this,
			width: 100,
			height: 100,
			x: 36,
			y: 108,
			backgroundColor: "#F00"
		});
		
		// Here's an Immediately Invoking Function Expression (IIFE).
		(function move () {
			// It's recursive! We're just animating it to a random position in
			// the area we use for demo views, and repeating that forever.
			animate(view).then({
				x: 36 + Math.floor(Math.random() * 468),
				y: 108 + Math.floor(Math.random() * 476)
			}, 1000).then(move);
		})();
	};
});

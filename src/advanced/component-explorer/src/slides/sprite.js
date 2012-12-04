import ui.SpriteView;

import src.Slide as Slide;

exports = Class(Slide, function () {
	this.title = "Sprites";
	
	this.example = function () {
		var sprite = new ui.SpriteView({
			superview: this,
			width: 200,
			height: 200,
			x: 36,
			y: 108,
			url: "resources/images/spinner"
		});
		
		// The sprite images are at resources/images/spinner-blue-*.png.
		sprite.startAnimation("blue");
	};
});

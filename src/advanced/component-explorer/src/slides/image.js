import ui.ImageView;

import src.Slide as Slide;

exports = Class(Slide, function () {
	this.title = "Images";
	
	this.example = function () {
		new ui.ImageView({
			superview: this,
			width: 256,
			height: 256,
			x: 36,
			y: 108,
			image: "resources/images/avatar.png"
		});
	};
});

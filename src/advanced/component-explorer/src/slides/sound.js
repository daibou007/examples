import Sound;
import ui.ImageView;

import src.Slide as Slide;

exports = Class(Slide, function () {
	this.title = "Sound";
	
	this.example = function () {
		var sfx = new Sound({
			path: "resources/sounds/effects",
			files: {
				swish: {
					background: false
				}
			}
		});
		
		var imageview = new ui.ImageView({
			superview: this,
			width: 128,
			height: 128,
			x: 36,
			y: 108,
			image: "resources/images/play.png"
		});

		imageview.on("InputSelect", function () {
			sfx.play("swish");
		});
	};
});

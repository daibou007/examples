import ui.Color;
import ui.View;

import src.Slide as Slide;

exports = Class(Slide, function () {
	this.title = "Colors";
	
	this.example = function () {
		// Let's grab a color!
		var color = new ui.Color("#0060FF");
		
		// We also need a view to display it.
		var view = new ui.View({
			superview: this,
			width: 300,
			height: 300,
			x: 36,
			y: 108
		});
		
		// This will be called every tick, and gets passed a delta. We use the
		// dt here to achieve a constant spin rate.
		view.tick = function (dt) {
			this.style.backgroundColor =
				color.spin(dt / 10).toHex();
		};
	};
});

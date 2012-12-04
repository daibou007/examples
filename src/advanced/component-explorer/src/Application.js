import device;
import ui.ImageView;
import ui.View;

import resources.configs.global as config;
import src.Deck as Deck;

exports = Class(GC.Application, function () {
	// Scales the deck. In some apps, this might also include x/y axis positioning.
	this.scaleUI = function () {
		this.deck.style.scale = (config.width / config.height) > (device.width / device.height)
			? device.width / config.width
			: device.height / config.height;
	};
	
	this.launchUI = function () {
		// A white background. This is only necessary because we aren't using
		// images everywhere, and the root view is black.
		var view = new ui.View({
			superview: this.view,
			width: device.width,
			height: device.height,
			backgroundColor: "#FFF"
		});
		
		// A nice background graphic, at actual size and positioned at the real center.
		var imageview = new ui.ImageView({
			superview: this.view,
			width: 300,
			height: 200,
			x: (device.width / 2) - (300 / 2),
			y: (device.height / 2) - (200 / 2),
			opacity: 0.1,
			image: "resources/images/gcfull.png"
		});
		
		// The deck is a scaled and clipped container plus controller for slides.
		this.deck = new Deck({
			superview: this.view,
			width: config.width,
			height: config.height,
			clip: true,
			slides: config.slides.map(function (name) {
				return jsio("import src.slides." + name);
			})
		});
		
		// Here we only scale once, but it could also be attached to a resize event.
		this.scaleUI();
	};
});

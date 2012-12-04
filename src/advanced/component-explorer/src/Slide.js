import ui.ImageView;
import ui.ScrollView;
import ui.TextView;
import ui.View;

import resources.configs.global as config;
import resources.configs.menu as config.menu;
import src.lib.NineSliceImageView;

exports = Class(ui.View, function (supr) {
	this.init = function (opts) {
		this.index = opts.index;
		
		// Contains the slide title and the rest of the top bar elements created below.
		this.title = {
			text: (opts.index + 1) + ". " + this.title
		};
		
		supr(this, "init", arguments);
	};
	
	this.buildView = function () {
		// Top bar background.
		this.title.bar = new ui.View({
			superview: this,
			width: config.width,
			height: config.height / 10,
			backgroundColor: "#333"
		});
		
		// Slide title text.
		this.title.text = new ui.TextView({
			superview: this.title.bar,
			width: config.width,
			x: 24,
			text: this.title.text,
			color: "#FFF",
			fontSize: 48,
			lineHeight: 1.5,
			textAlign: "left"
		});
		
		// Previous slide button.
		this.title.prev = new ui.ImageView({
			superview: this.title.bar,
			width: 52,
			height: 52,
			x: 1094,
			y: 10,
			image: "resources/images/prev.png"
		}).once("InputSelect", function () {
			this.getSuperview().prev();
		}.bind(this));
		
		// Slide menu button.
		this.title.menu = new ui.ImageView({
			superview: this.title.bar,
			width: 64,
			height: 64,
			x: 1150,
			y: 4,
			image: "resources/images/menu.png"
		}).once("InputSelect", function () {
			this.menu();
		}.bind(this));
		
		// Next slide button.
		this.title.next = new ui.ImageView({
			superview: this.title.bar,
			width: 52,
			height: 52,
			x: 1218,
			y: 10,
			image: "resources/images/next.png"
		}).once("InputSelect", function () {
			this.getSuperview().next();
		}.bind(this));
		
		// Magic? Nope! Just Function#toString().
		var code = this.example.toString()
			// Pull out the wrapper syntax.
			.replace(/.+\{((?:.|\s)+)\}$/, "$1")
			// Un-indent two levels.
			.replace(/^\t\t/mg, "")
			// Remove comments.
			.replace(/\n\t*\/\/.*/g, "")
			// Collapse marked lines for brevity.
			.replace(/(.*\/\/\n)+/g, "\t..\n")
			// TextView doesn't like tabs.
			.replace(/\t/g, "    ");
		
		// A somewhat involved TextView for displaying the formatted example code.
		this.code = new ui.TextView({
			superview: this,
			width: config.width / 2,
			height: 1,
			x: config.width / 2,
			y: 108,
			backgroundColor: "hsla(200, 40%, 50%, 0.25)",
			text: code,
			fontSize: 28,
			lineHeight: 1,
			textAlign: "left",
			horizontalPadding: 10,
			verticalPadding: -18,
			strokeStyle: "rgba(255, 255, 255, 0.5)"
		});
		
		// Finally, the example code also actually gets run so that we can see the results.
		this.example();
	};
	
	// This creates a scrolling menu for switching slides.
	this.menu = function () {
		// First we need a background.
		new src.lib.NineSliceImageView({
			superview: this,
			width: config.menu.width,
			height: config.menu.height,
			x: config.menu.x,
			y: config.menu.y,
			image: "resources/images/frame/frame9SecWhiteDimensionalLine"
		});
		
		// Then we need a ScrollView.
		var scroller = new ui.ScrollView({
			superview: this,
			width: config.menu.width,
			height: config.menu.height - 10,
			x: config.menu.x,
			y: config.menu.y + 5,
			dragRadius: 0,
			scrollX: false,
			scrollBounds: {
				minY: 0,
				maxY: config.menu.row * config.slides.length
			},
			layout: 'box'
		});
		
		// Here we just loop through the slide list and create TextViews for each one.
		config.slides.forEach(function (slide, index) {
			new ui.TextView({
				superview: scroller,
				height: config.menu.row,
				y: index * config.menu.row,
				text: (index + 1) + ". " + slide,
				fontSize: 36,
				lineHeight: 2,
				textAlign: "left",
				horizontalPadding: 20,
				backgroundColor: index === this.index ? "rgba(0, 204, 68, 0.2)" : null,
				layout: 'box'
			}).once("InputSelect", function () {
				this.getSuperview().change(index);
			}.bind(this));
		}, this);
		
		// Lastly we need a frame. This goes "over" everything else to take
		// advantage of some shadows. Because of that, we let events pass through it.
		new src.lib.NineSliceImageView({
			superview: this,
			canHandleEvents: false,
			width: config.menu.width,
			height: config.menu.height,
			x: config.menu.x,
			y: config.menu.y,
			image: "resources/images/frame/frame9SecGrayOutline"
		});
	};
});

import animate;
import ui.View;

import resources.configs.global as config;

exports = Class(ui.View, function (supr) {
	this.init = function (opts) {
		this.slides = opts.slides;
		
		supr(this, "init", arguments);
	};
	
	this.buildView = function () {
		this.current = this.create(0, 0);
	};
	
	// Attempts to create a slide.
	this.create = function (index, offset) {
		var slide = this.slides[index];
		
		return slide ? new slide({
			superview: this,
			width: config.width,
			height: config.height,
			x: offset,
			index: index
		}) : false;
	};
	
	// Switches to a new slide.
	this.change = function (index) {
		this.current.removeFromSuperview();
		
		this.current = this.create(index, 0);
	};
	
	// Does a transition to the left or right slide (depending on the "sign"),
	// managing them along the way.
	this.transition = function (next) {
		var sign = next ? 1 : -1;
		var curr = this.current;
		var next = this.create(curr.index + sign, config.width * sign);
		
		if (!next) { return; }
		
		animate({
			curr: 0,
			next: config.width * sign
		}).then({
			curr: -config.width * sign,
			next: 0
		}, 500, animate.easeInOut, function () {
			curr.style.x = this.curr;
			next.style.x = this.next;
		}).then(function () {
			curr.removeFromSuperview();
			
			this.current = next;
		}.bind(this));
	};
	
	this.prev = function () {
		this.transition(false);
	};
	
	this.next = function () {
		this.transition(true);
	};
});

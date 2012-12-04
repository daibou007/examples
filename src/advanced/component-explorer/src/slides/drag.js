import ui.View;

import src.Slide as Slide;

exports = Class(Slide, function () {
	this.title = "Dragging";
	
	this.example = function () {
		var view = new ui.View({
			superview: this,
			width: 100,
			height: 100,
			x: 36,
			y: 108,
			backgroundColor: "#0060FF"
		});

		view.on("InputStart", function () {
			// Once we've got input, we have to enable dragging detection.
			this.startDrag();
		});
		
		view.on("Drag", function (devt, mevt, dt) {
			// Drag events will fire constantly, and are passed a "drag event",
			// "move event", and delta. We use the dt to update the position.
			this.style.x += dt.x;
			this.style.y += dt.y;
		});
	};
});

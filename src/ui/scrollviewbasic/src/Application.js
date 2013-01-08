//# Create a ScrollView <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/ui/scrollviewbasic/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//In this example, we’ll use the `ScrollView` as a viewport to move around a large background image.
//Dragging the screen moves the map until it reaches the edge of the scroll bounds. The scrollview
//has an offset applied to view the image initially 800 pixels in on the x and y axis.

import ui.ScrollView as ScrollView;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;

var bgimage = new Image({url: 'resources/images/europemap.png'});

//## Class: Application
exports = Class(GC.Application, function () {

	this.launchUI = function () {
		var scrollview = new ScrollView({
			superview: this.view,
			offsetX: -800,
			offsetY: -800,
			scrollBounds: {
				minX: 0,
				maxX: bgimage.getWidth(), //=> 2291 px
				minY: 0,
				maxY: bgimage.getHeight() //=> 1682 px
			}
		});

		var imageview = new ImageView({
			superview: scrollview,
			image: bgimage,
			width: bgimage.getWidth(),
			height: bgimage.getHeight(),
			autoSize: true
		});

		this.view.push(scrollview); //add to the root StackView
	};
});

//<img src="./doc/screenshot1.png" alt="scrollview screenshot" class="screenshot">

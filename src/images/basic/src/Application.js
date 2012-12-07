//# Displaying an Image
//This example requires an image in your resources directory and renders it to the screen.
//This following demo application shows how to display an image.

//Import the image view class.
import ui.ImageView as ImageView;

//## Class: Application
exports = Class(GC.Application, function() {
	//Initialize the UI.
	this.initUI = function() {
		//Create an imageView, the application has a root view which is used as the superview for the ImageView.
		var imageview = new ImageView({
			superview: this.view,
			x: 0,
			y: 0,
			scale: 0.75,
			layout: 'box',
			image: "resources/images/book.png"
		});
	};
});

//The output should look like this screenshot:
//<img src="./doc/screenshot1.png" alt="a book screenshot" class="screenshot">

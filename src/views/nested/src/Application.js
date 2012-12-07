//## Nesting views
//This file demonstrates the nesting of [views](http://doc.gameclosure.com/api/ui-view.html).
//Create two rectangles, one red and blue. The red rectangle is displayed in front of the blue by modifying its `zIndex` property.

//Import information about the device.
import device;
//Import ui.View class.
import ui.View as View;

//## Class: Application
exports = Class(GC.Application, function () {
  this.initUI = function () {
    var doublebox = new DoubleBox();
    this.view.addSubview(doublebox);
  };
});

//## Class: DoubleBox
var DoubleBox = Class(View, function (supr) {
  //Called before the first render of the view.
  this.buildView = function () {
		//Create a View with a red background color.
    var redbox = new View({
      superview: this,
      x: 0,
      y: 0,
      width: device.width / 2,
      height: device.height / 2,
      backgroundColor: '#f00',
      zIndex: 1
    }); 
		//Create a View with a blue background color.
    var bluebox = new View({
      superview: this,
      x: 100,
      y: 100,
      width: device.width / 2,
      height: device.height / 2,
      backgroundColor: '#00f'
    });
  };
});

//Load this code as the `Application.js` file in your project, run the simulator, and you should see something like this:
//<img src="./doc/screenshot1.png" alt="nested views screenshot" class="screenshot">

//## 9-Slice Image Scaling
//Given the following image:
//<img src="./doc/button.png" alt="button image" class="screenshot" style="display:block;width:200px;">

//We can scale it to the dimensions of the device (with a slight centering for visibility) so
//that the rounded corners maintain their integrity while the middle section is scaled out.
//This way buttons can maintain their style despite the dimensions of the device.

//Here, the image is sliced and scaled out, and a label is given to the button by assigning a
//`TextView` as a child. The child view’s dimensions is set to the width and height of the middle
//section of the `ImageScaleView`, and set to a very light blue so you can see it in the example
//below. The debugging flag of the `ImageScaleView` is set to true so you can see how the slices
//are sectioned off.


import device;
import ui.ImageScaleView;
import ui.TextView;

var offset_pos = 20,
    offset_slice_x = 40,
    offset_slice_y = 50;

exports = Class(GC.Application, function () {
  this.initUI = function () {
    
    var imagescaleview = new ui.ImageScaleView({
      superview: this.view,
      x: offset_pos / 2,
      y: offset_pos / 2,
      width: device.width - offset_pos,
      height: device.height - offset_pos,
      image: 'resources/images/button.png',
      scaleMethod: '9slice',
      debug: true,
      sourceSlices: {
        horizontal: {
          left: offset_slice_x,
          center: offset_slice_x,
          right: offset_slice_x
        },
        vertical: {
          top: offset_slice_y,
          middle: offset_slice_y,
          bottom: offset_slice_y
        }
      },
      destSlices: {
        horizontal: {
          left: offset_slice_x,
          right: offset_slice_x
        },
        vertical: {
          top: offset_slice_y,
          bottom: offset_slice_y
        }
      }
    });

    imagescaleview.on('InputSelect', function () {
      console.log("You clicked the big button!");
    });
    
    var text = new ui.TextView({
      superview: imagescaleview,
      backgroundColor: 'rgba(0,0,255,0.2)', //transparent blue
      x: offset_slice_x,
      y: offset_slice_y,
      width: imagescaleview.style.width - (offset_slice_x * 2),
      height: imagescaleview.style.height - (offset_slice_y * 2),
      text: "Click Me!",
      fontSize: 32
    });
  };
});

//Run this code as the `Application.js` file in your project, and you should see something
//like this in the simulator:
//<img src="./doc/screenshot1.png" alt="9-slice screenshot" class="screenshot">

//# 3-Slice Image Scaling <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/images/nineslice/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>

import device;
import ui.ImageScaleView;

exports = Class(GC.Application, function () {
	this.initUI = function () {
		this.style.backgroundColor = "#FFFFFF";

		var y = device.height / 2 - 165;
		for (var i = 0; i < 3; i++) {
			new ui.ImageScaleView({
				superview: this.view,
				x: device.width / 2 - 110,
				y: y + i * 110 + 10,
				width: 100,
				height: 100,
				image: 'resources/images/window.png',
				scaleMethod: '2slice',
				debug: true,
				sourceSlices: {
					horizontal: {left: 50, right: 100}
				},
				destSlices: {
					horizontal: {left: 10 + i * 20}
				}
			});

			new ui.ImageScaleView({
				superview: this.view,
				x: device.width / 2 + 10,
				y: y + i * 110 + 10,
				width: 100,
				height: 100,
				image: 'resources/images/window.png',
				scaleMethod: '2slice',
				debug: true,
				sourceSlices: {
					vertical: {top: 50, bottom: 100}
				},
				destSlices: {
					vertical: {top: 10 + i * 20}
				}
			});
		}
	};
});

//Run this code as the `Application.js` file in your project, and you should see something
//like this in the simulator:
//<img src="./doc/screenshot.png" alt="9-slice screenshot" class="screenshot">
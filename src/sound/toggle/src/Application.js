//# Toggle a sound <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/sound/toggle/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>

//Given the following audio files in your project directory:
//<pre>
//project
//.
//├── manifest.json
//├── sdk/ -> /path/to/basil/sdk
//├── build/
//├── resources/
//│   └── sounds/
//│       ├── music/
//│       │   └── levelmusic.mp3
//│       └── effect/
//│           └── boink.mp3
//└── src/
//    └── Application.js
//</pre>

import device;
import ui.View as View;
import AudioManager;

exports = Class(GC.Application, function () {
	this.initUI = function () {
		this.sound = new AudioManager({
			path: 'resources/sounds',
			files: {
				levelmusic: {
					background: true,
					loop: true
				}
			}
		});

		var play = new View({
			superview: this,
			x: device.width/2 - 125,
			y: 100,
			width: 100,
			height: 100,
			backgroundColor: '#00ff00'
		});

		play.on('InputSelect', bind(this, function () {
			this.sound.play('levelmusic');
		}));

		var stop = new View({
			superview: this,
			x: device.width/2 + 25,
			y: 100,
			width: 100,
			height: 100,
			backgroundColor: '#ff0000'
		});

		stop.on('InputSelect', bind(this, function () {
			this.sound.pause('levelmusic');
		}));
	};
});
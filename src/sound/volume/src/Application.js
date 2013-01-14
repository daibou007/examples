//# Setting the sound volume <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/sound/volume/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//This example shows how to set the volume of a sound effect.
//How to use: Click on one of the views to play an effect

//Import device the get the screen size, the AudioManager class for playing sounds and effects and the View class to display views:
import device;
import AudioManager;
import ui.View as View;

//## Class: Application
//Create an application and set the default properties.
exports = Class(GC.Application, function () {
	this.initUI = function () {
		this._sound = new AudioManager({
			path: 'resources/audio/',
			// Load one sound effects:
			//    "resources/audio/bubble_hit_01.mp3"
			// or:
			//    "resources/audio/bubble_hit_01.ogg"
			files: {
				sound1: {
					volume: 0.8
				}
			}
		});

		// Create three views, click on them the hear an effect play...
		var w = device.width / 3;
		var colors = ["#FF0000", "#00FF00", "#0000FF"];
		var volumes = [0.2, 0.6, 1.0];
		for (var i = 0; i < 3; i++) {
			var soundview = new SoundView({
				superview: this.view,
				x: i * w + 10,
				y: 10,
				width: w - 20,
				height: 100,
				sound: this._sound,
				volume: volumes[i],
				backgroundColor: colors[i]
			})
		}
	};

	this.launchUI = function () {};
});

//## Class: SoundView
//Create a view which can be clicked to play a sound.
var SoundView = Class(View, function(supr) {
	this.init = function(opts) {
		supr(this, "init", [opts]);

		this._sound = opts.sound;
		this._volume = opts.volume;
	};

	this.onInputSelect = function() {
		this._sound.setVolume("sound1", this._volume);
		this._sound.play("sound1");
	};
});

//# Create a SpriteView <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/ui/spriteview-basic/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//Given the following project layout for resources:
//<pre>
//project
//.
//├── manifest.json
//├── sdk/ -> /path/to/basil/sdk
//├── build/
//├── resources/
//│   └── images/
//│        └── characters/
//│             ├── carl-idle-01.png
//│             ├── carl-idle-02.png
//│             ├── carl-idle-03.png
//│             ├── carl-idle-04.png
//│             ├── carl-walk-01.png
//│             ├── carl-walk-02.png
//│             └── carl-walk-03.png
//└── src/
//    └── Application.js
//</pre>

import ui.SpriteView as SpriteView;

//## Class: Application
exports = Class(GC.Application, function () {
	this.initUI = function () {
		var sprite = new SpriteView({
			superview: this.view,
			x: 0,
			y: 0,
			width: 60,
			height: 60,
			url: "resources/images/characters/carl",
			defaultAnimation: 'idle'
		});

		//Play the 'walk' animation once, then return to idle.
		sprite.startAnimation('walk');
	};
});

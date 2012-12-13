import device;
import ui.ImageView as ImageView;
import ui.SpriteView as SpriteView;

//art delivered at 576x1024 is a ratio = 0.5625 ---1024 max texture size
//scaled up 720x1280, same ratio

// 576x1024 * 1.25 = 720x1280


//all screen coordinates are in this 576x1024 space
//art should be delivered at this size
var bounds_width = 576,
    bounds_height = 1024,
    base_width = bounds_width,
    base_height = device.screen.height * (bounds_width / device.screen.width), //864
    scale = device.screen.width / base_width,
    right_boundary = base_width, //right boundry for screen wrapping
    left_boundary = 0,
    vx = 0;

exports = Class(GC.Application, function () {
  this._settings = {
    alwaysRepaint: true
  };

  this.initUI = function () {
    
    //scale the root view
    this.view.style.width = base_width;
    this.view.style.height = base_height;
    this.view.style.scale = scale;
    
    var background = new ImageView({
      superview: this.view,
      x: 0,
      y: 0,
      width: base_width,
      height: base_height,
      image: "resources/images/background.jpg", //576x1024
      zIndex: 0
    });

    var sprite = new SpriteView({
      superview: background,
      x: base_width/2,
      y: base_height - 400,
      width: 300,
      height: 300,
      url: "resources/images/sdkBot/sdkBot",
      defaultAnimation: 'idle',
      autoStart: true,
      zIndex: 1
    });

    //sprite movement is determined by mouse position relative to the sprite
    this.view.on('InputSelect', function (evt, pt) {
      //localize point to sprite, which is one-level deep
      var x0 = sprite.style.x + sprite.style.width/2,
          y0 = sprite.style.y + sprite.style.height/2;

      //if the sprite is clicked, stop movement and return to idle animation
      if (sprite.containsLocalPoint({x: pt.x - sprite.style.x, y: pt.y - sprite.style.y})) {
        if (sprite.isPlaying) {
          vx = 0;
          sprite.resetAnimation();
        }
      } else if (pt.x < sprite.style.x + sprite.style.width/2) {
        //walk left
        vx = -2;
        sprite.stopAnimation();
        if (sprite.style.flipX) { sprite.style.flipX = false; }
        sprite.startAnimation('walk', {loop: true});
        
      } else {
        //walk right
        vx = 2;
        sprite.stopAnimation();
        if (!sprite.style.flipX) { sprite.style.flipX = true; }
        sprite.startAnimation('walk', {loop: true});
      }
    });

    GC.app.engine.on('Tick', function () {
      //add horizontal movement
      sprite.style.x += vx;

      //screen wrapping
      if (sprite.style.x > right_boundary) {
        sprite.style.x = left_boundary - sprite.style.width;
      } else if (sprite.style.x + sprite.style.width < left_boundary) {
        sprite.style.x = right_boundary;
      }
    });
  };
});

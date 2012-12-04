import lib.Callback;

import ui.ImageView;
import ui.View;

exports = Class(ui.View, function (supr) {
	this.defaults = {
		image: null,
		postfix: ["_01", "_02", "_03", "_04", "_05", "_06", "_07", "_08", "_09"],
		extension: ".png",
	}
	
	this.init = function (opts) {
		this._opts = opts = merge(opts, this.defaults);
		
		supr(this, "init", [opts]);
	};
	
	this.buildView = function () {
		this.style.visible = false;
		this.imageViews = [];

		var loadedCb = new lib.Callback();
		for (var i = 0; i < 9; i++) {
			var view = this.imageViews[i] = new ui.ImageView({
				parent: this,
				image: this._opts.image + this._opts.postfix[i] + this._opts.extension,
				canHandleEvents: false,
				autoSize: true,
			});
			view.doOnLoad(loadedCb.chain());
		}
		
		loadedCb.run(this.layout.bind(this));
		loadedCb.run(function () { this.style.visible = this._opts.visible || true; }.bind(this));
	};
	
	this._moveView = function (idx, x, y, w, h) {
		var s = this.imageViews[idx].style;
		s.x = x;
		s.y = y;
		s.width = w;
		s.height = h;
	};
	
	this.layout = function () {
		var w = this.style.width;
		var h = this.style.height;
		this._sizeHash = w + 'x' + h;
		
		var views = this.imageViews;
		var tlWidth = views[0].style.width;
		var tlHeight = views[0].style.height;
		var trWidth = views[2].style.width;
		var trHeight = views[2].style.height;
		var blWidth = views[6].style.width;
		var blHeight = views[6].style.height;
		var brWidth = views[8].style.width;
		var brHeight = views[8].style.height;

		
		// top row
		this._moveView(0, 0, 0, tlWidth, tlHeight);
		this._moveView(1, tlWidth, 0, w - tlWidth - trWidth, tlHeight);
		this._moveView(2, w - trWidth, 0, trWidth, trHeight);
		// middle row
		this._moveView(3, 0, tlHeight, tlWidth, h - tlHeight - blHeight);
		this._moveView(4, tlWidth, tlHeight, w - tlWidth - trWidth, h - tlHeight - blHeight);
		this._moveView(5, w - trWidth, trHeight, trWidth, h - trHeight - brHeight);
		// bottom row
		this._moveView(6, 0, h - blHeight, blWidth, blHeight);
		this._moveView(7, blWidth, h - blHeight, w - blWidth - brWidth, blHeight);
		this._moveView(8, w - brWidth, h - brHeight, brWidth, brHeight);
	};
	
	this.tick = function () {
		// TODO: replace with tricks from timestep's ui branch
		if (this.imageViews && (this.style.width + 'x' + this.style.height) != this._sizeHash) {
			this.layout();
		}
	};
});
import ui.ImageScaleView as ImageScaleView;
import ui.TextView as TextView;

var TabButton = exports = Class(ImageScaleView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				width: 1,
				height: 1,
				activeBackgroundColor: "#D0D0D0",
				backgroundColor: "#E0E0E0",
				color: "#B0B0B0",
				activeColor: "#000000"
			}
		);
		supr(this, "init", [opts]);

		this._title = new TextView({
			superview: this,
			x: 0,
			y: 0,
			width: opts.width,
			height: opts.height,
			text: opts.title,
			layout: "box",
			layoutWidth: "100%",
			layoutHeight: "100%",
			autoSize: true,
			autoFontSize: false,
			wrap: false,
			horizontalPadding: 10
		});
		this._title.subscribe("Resize", this, "onResize");
	};

	this.setActive = function (active) {
		var opts = this._opts;

		if (opts.image) {
			this.setImage(active ? opts.activeImage : opts.image);
		} else {
			this.style.backgroundColor = active ? opts.activeBackgroundColor : opts.backgroundColor;
		}
		opts.color && this._title.updateOpts({color: active ? opts.activeColor : opts.color});
	};

	this.setTabPane = function (tabPane) {
		this._tabPane = tabPane;
	};

	this.onResize = function () {
		if (this._tabPane) {
			var tabPosition = this._tabPane.getTabPosition();
			switch (tabPosition) {
				case "top":
				case "bottom":
					this.style.width = this._title.style.width;
					this._title.style.anchorX = 0;
					this._title.style.anchorY = 0;
					this._title.style.r = 0;
					break;

				case "left":
					this.style.height = this._title.style.height;
					this._title.style.anchorX = this._title.style.width / 2;
					this._title.style.anchorY = this._title.style.height / 2;
					this._title.style.r = Math.PI * 1.5;
					break;

				case "right":
					this.style.height = this._title.style.height;
					this._title.style.anchorX = this._title.style.width / 2;
					this._title.style.anchorY = this._title.style.height / 2;
					this._title.style.r = Math.PI * 0.5;
					break;
			}
		}
	};
});

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
			wrap: false
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

	this.setFixedWidth = function (fixedWidth) {
		this._fixedWidth = fixedWidth;
		this.onResize();
	};

	this.setPadding = function (padding) {
		this._title.updateOpts({horizontalPadding: padding});
	};

	this.onResize = function () {
		if (this._tabPane) {
			var title = this._title;

			switch (this._tabPane.getTabPosition()) {
				case "top":
				case "bottom":
					if (this._fixedWidth) {
						title.style.x = 10;
						this.style.width = this._fixedWidth;
					} else {
						title.style.x = 0;
						this.style.width = title.style.width;
					}
					title.style.anchorX = 0;
					title.style.anchorY = 0;
					title.style.r = 0;
					break;

				case "left":
					if (this._fixedWidth) {
						title.style.y = -10;
						this.style.height = this._fixedWidth;
					} else {
						title.style.y = 0;
						this.style.height = title.style.height;
					}
					title.style.anchorX = title.style.width / 2;
					title.style.anchorY = title.style.height / 2;
					title.style.r = Math.PI * 1.5;
					break;

				case "right":
					if (this._fixedWidth) {
						title.style.y = 10;
						this.style.height = this._fixedWidth;
					} else {
						title.style.y = 0;
						this.style.height = title.style.height;
					}
					title.style.anchorX = title.style.width / 2;
					title.style.anchorY = title.style.height / 2;
					title.style.r = Math.PI * 0.5;
					break;
			}
		}
	};
});
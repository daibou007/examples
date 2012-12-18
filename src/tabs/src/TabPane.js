import ui.View as View;

import lib.PubSub as PubSub;

import .TabButton;

var TabPane = exports = Class(PubSub, function (supr) {
	this.init = function (opts) {
		supr(this, "init", [opts]);

		this._tabPaneView = opts.tabPaneView;
		this._buttonView = opts.buttonView;
		this._contentView = opts.contentView; // The user defined view...
		this._paneView = new View({
			layout: "box",
			layoutWidth: "100%",
			layoutHeight: "100%",
			visible: !opts.tabPaneView.getContent().getSubviews().length
		});
		this._paneView.addSubview(this._contentView);
		this._tabPaneView.getContent().addSubview(this._paneView);
	};

	this.select = function () {
		this.publish("Select", this);

		this._buttonView.style.zIndex = this._tabPaneView.getNextZIndex();
		(this._buttonView instanceof TabButton) && this._buttonView.setActive(true);
		this._paneView.updateOpts({visible: true});
		this._tabPaneView.publish("ShowPane", this);
	};

	this.deselect = function () {
		(this._buttonView instanceof TabButton) && this._buttonView.setActive(false);
		this._paneView.updateOpts({visible: false});
		this._tabPaneView.publish("HidePane", this);
	};

	this.remove = function () {
		this._buttonView.removeFromSuperview();
		this._paneView.removeFromSuperview();

		this.publish("Remove", this);
	};

	this.getContentView = function () {
		return this._contentView;
	};

	this.getButtonView = function () {
		return this._buttonView;
	};
});
//# A Basic List <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/ui/listbasic/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//Displaying a list of items requires the coordinated use of three classes: `ui.widget.ListView`,
//`ui.widget.CellView`, and `GCDataSource`. There are components that handle some of these for you,
//but to understand how they work together, we’ll display a list of arbitrary data that we can
//scroll and click.

//Import device to get the screen size.
import device;
//Import `GCDataSource` to store the items.
import GCDataSource;
//Import the `List` and `Cell` classes to create a list.
import ui.widget.List as List;
import ui.widget.Cell as Cell;
import ui.widget.ButtonView as ButtonView;

import ui.TextView as TextView;
import ui.TextPromptView as TextPromptView;
import ui.View as View;

import util.ajax as ajax;

var COLOR1 = 'rgb(59,89,152)';
var COLOR2 = 'rgb(109,132,180)';
var COLOR3 = 'rgb(205,216,234)';
var COLOR4 = 'rgb(255,255,255)';
var COLOR5 = 'rgb(175,189,212)';
var COLOR6 = 'rgb(18,20,54)';

var InfoDataSource = Class(GCDataSource, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				key: 'id',
				reverse: true,
				//Sort by oldest first
				sorter: function (data) { return data.created_time; }
			}
		);

		supr(this, 'init', [opts]);

		this.add({id: '0', title: 'Loading', itemsLoaded: 0});
		this.load();
	};

	this.load = function () {
		var loadingItem = this.get('0');

		loadingItem.title = 'Loading';
		loadingItem.loading = true;

		this.emit('DataChanged');

		ajax.get(
			{
				url: 'http://graph.facebook.com/search',
				headers: {'Content-Type': 'text/plain'},
				data: {q: 'phone+game', type: 'post'},
				type: 'json'
			},
			bind(this, 'onData')
		);
	};

	this.sort = function () {
		supr(this, 'sort');

		var i = this._byIndex.length;
		while (i) this._byIndex[--i].index = i;
	};

	this._leadingZero = function (s, length) {
		s += '';
		while (s.length < length) s = '0' + s;
		return s;
	};

	this.onData = function (err, response) {
		if (!err) {
			for (var i = 0; i < response.data.length; i++) {
				var item = response.data[i];
				var date = new Date(item.created_time);

				item.posted = this._leadingZero(date.getHours(), 2) + ':' + this._leadingZero(date.getMinutes(), 2) + ' - ' +
					(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
			}

			this.add(response.data);
			this.sort();

			var loadingItem = this.get('0');

			loadingItem.title = 'Load more';
			loadingItem.loading = false;
			loadingItem.itemsLoaded = this.getCount();

			this.emit('DataChanged');
		}
	};
});

//## Class: Application
//Create an application, set the default properties.
exports = Class(GC.Application, function () {

	this._settings = {
		logsEnabled: window.DEV_MODE,
		showFPS: window.DEV_MODE,
		clearEachFrame: true,
		alwaysRepaint: true,
		preload: []
	};

	this.getCell = function () {
		var infoList = this._infoList;

		return new InfoCell({superview: infoList, infoData: this._infoData});
	};

	this.initUI = function () {
		//https://graph.facebook.com/search?q=phone+game&type=post
		//http://graph.facebook.com/search?q=phone+game&type=post
		this.style.backgroundColor = COLOR4;

		//Set up the datasource.
		this._infoData = new InfoDataSource();
		this._infoData.on('DataChanged', bind(this, 'onDataChanged'));

		this._title = new TextView({
			superview: this,
			x: 0,
			y: 0,
			width: device.width,
			height: 50,
			size: 30,
			text: 'Search Facebook',
			color: COLOR4,
			backgroundColor: COLOR1
		});

		//Create the List, which inherits from `ScrollView`.
		this._infoList = new List({
			superview: this.view,
			x: 0,
			y: 50,
			width: device.width,
			height: device.height - 100,
			//Use the dataSource:
			dataSource: this._infoData,
			selectable: 'multi',
			maxSelections: 10,
			scrollX: false,
			getCell: bind(this, 'getCell')
		});

		this._searchLabel = new TextView({
			superview: this,
			x: 0,
			y: device.height - 50,
			width: device.width / 2,
			height: 50,
			size: 20,
			text: 'search for:',
			horizontalAlign: 'right',
			color: COLOR1,
			backgroundColor: COLOR5
		});
		this._search = new TextPromptView({
			superview: this,
			x: device.width / 2,
			y: device.height - 50,
			width: device.width / 2,
			height: 50,
			size: 20,
			text: 'game',
			horizontalAlign: 'left',
			padding: [0, 0, 0, 6],
			color: COLOR1,
			backgroundColor: COLOR5,
			value: 'game',
			prompt: 'Enter a search term:'
		});
	};

	this.onDataChanged = function () {
		var subviews = this._infoList.getContentView().getSubviews();
		var i = subviews.length;

		while (i) {
			subviews[--i].update();
		}
	};

	this.launchUI = function () {};
});

//## Class: InfoCell
//Subclass a Cell which is a view, it can have child views, and accepts data from a List.
var InfoCell = Class(Cell, function (supr) {
	this.init = function (opts) {
		this._infoData = opts.infoData;

		opts.width = device.width;
		opts.height = 75;

		supr(this, 'init', [opts]);

		this._loadMore = new TextView({
			superview: this,
			x: 10,
			y: 5,
			width: device.width - 20,
			height: 60,
			size: 25,
			color: COLOR2,
			text: 'Loading...'
		});
		this._loaded = new TextView({
			superview: this._loadMore,
			x: 0,
			y: 0,
			width: device.width - 20,
			height: 60,
			size: 11,
			color: COLOR6,
			verticalAlign: 'bottom',
			text: ''
		});

		this._messageContainer = new View({
			superview: this,
			x: 0,
			y: 0,
			width: device.width,
			height: 75
		});

		this._from = new TextView({
			superview: this._messageContainer,
			x: 10,
			y: 5,
			width: device.width - 20,
			height: 20,
			size: 13,
			horizontalAlign: 'left',
			color: COLOR2
		});
		this._posted = new TextView({
			superview: this._messageContainer,
			x: 10,
			y: 5,
			width: device.width - 20,
			height: 20,
			size: 13,
			horizontalAlign: 'right',
			color: COLOR2
		});
		this._message = new TextView({
			superview: this._messageContainer,
			x: 10,
			y: 25,
			width: device.width - 20,
			height: 47,
			size: 13,
			horizontalAlign: 'left',
			verticalAlign: 'top',
			wrap: true,
			autoFontSize: false,
			autoSize: false,
			clip: true,
			color: COLOR6
		});
	};

	this._toLength = function (s, length) {
		if (s.length > length) {
			var i = Math.max(0, length - 10);
			while (i < length - 1) {
				if (s[i] === ' ') {
					break;
				}
				i++;
			}
			s = s.substr(0, i) + '...';
		}
		return s;
	};

	this._onSelect = function () {
		(this._data.id === '0') && this._infoData.load();
	};

	this.update = function () {
		var data = this._data;
		var loadMore = (data.id === '0');

		this.style.backgroundColor = ((data.index & 1) === 0) ? COLOR3 : COLOR4;

		this._loadMore.style.visible = loadMore;
		this._messageContainer.style.visible = !loadMore;

		if (loadMore) {
			this._loadMore.setText(data.title);
			this._loaded.setText('(' + data.itemsLoaded + ' items loaded)');
		} else {
			this._from.setText(this._toLength(data.from.name || '', 40));
			this._posted.setText(data.posted);
			this._message.setText(this._toLength(data.message || '', 100));
		}
	};

	//Called when a cell is put on screen.
	//We'll use it to update our TextView child.
	this.setData = function (data) {
		this._data = data;
		this.update();
	};
});

//Run this code in the simulator, and you should see something like the following screenshot.
//You can drag the list up and down, but not right or left. When you click on a film title, it
//will turn red and output its title in the debugging console.
//<img src="./doc/screenshot.png" alt="listview screenshot" class="screenshot">
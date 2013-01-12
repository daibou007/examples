//# A Basic List <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/ui/list-basic/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
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
import ui.TextView as TextView;

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

	this.initUI = function () {
		this.style.backgroundColor = '#FFFFFF';

		//Set up the datasource.
		var filmData = new GCDataSource({
			//Entries require a key, which defaults to 'id'.
			key: 'title',
			//Sort by oldest first
			sorter: function (data) { return data.year; }
		});
		//And load our data.
		filmData.add(scifiFilms);

		//Create the List, which inherits from `ScrollView`.
		var filmList = new List({
			superview: this.view,
			x: 0,
			y: 0,
			width: device.width,
			height: device.height,
			//Use the dataSource:
			dataSource: filmData,
			scrollX: false,
			getCell: function () { return new FilmCell({superview: filmList, height: 50}); }
		});
	};

	this.launchUI = function () {};
});

//## Class: FilmCell
//Subclass a Cell which is a view, it can have child views, and accepts data from a List.
var FilmCell = Class(Cell, function (supr) {
	this.init = function (opts) {
		opts.width = device.width;
		opts.height = 32;

		supr(this, 'init', [opts]);

		this._data = null;
		this._textview = new TextView({superview: this});

		this.on('InputSelect', function () {
			//Attach this property to the data object,
			//it'll stick because objects are passed by reference, but be careful!
			this._data.color = '#FF0000';
			this._textview.updateOpts({color: this._data.color});
			console.log('Selected: ' + this._data.title);
		});
	};

	this.buildView = function () {
		this._textview.updateOpts({
			width: this.style.width,
			height: this.style.height
		});
	};

	// Called when a cell is put on screen.
	// We'll use it to update our TextView child.
	this.setData = function (data) {
		var filmListing = data.title + ' (' + data.year + ')';
		var textColor = (data.color || '#000000');

		this._textview.updateOpts({color: textColor});
		this._textview.setText(filmListing);
		this._data = data; // Store it for the input event handler
	};
});

//These are the items which will be displayed in the list.
var scifiFilms = [
	{title: 'Blade Runner', year: 1982},
	{title: '2001: A Space Odyssey', year: 1968},
	{title: 'Alien', year: 1979},
	{title: 'The Terminator', year: 1984},
	{title: 'The Matrix', year: 1999},
	{title: 'Close Encounters of the Third Kind', year: 1977},
	{title: 'Inception', year: 2010},
	{title: 'WALL-E', year: 2008},
	{title: 'Metropolis', year: 1927},
	{title: 'Tron', year: 1982},
	{title: 'E.T.: The Extra-Terrestrial', year: 1982},
	{title: 'Back to the Future', year: 1985},
	{title: 'Tron', year: 1982},
	{title: 'Solaris', year: 1972},
	{title: 'Brazil', year: 1985},
	{title: 'Star Trek II: The Wrath of Khan', year: 1982},
	{title: 'Star Wars', year: 1977},
	{title: 'Planet of the Apes', year: 1968},
	{title: 'RoboCop', year: 1987},
	{title: 'Godzilla', year: 1954},
	{title: 'Mad Max', year: 1979}
];

//Run this code in the simulator, and you should see something like the following screenshot.
//You can drag the list up and down, but not right or left. When you click on a film title, it
//will turn red and output its title in the debugging console.
//<img src="./doc/screenshot.png" alt="listview screenshot" class="screenshot">
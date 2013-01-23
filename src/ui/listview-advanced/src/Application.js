// # An advanced List <a title="View raw file" href="https://raw.github.com/gameclosure/addon-examples/master/src/ui/list-advanced/src/Application.js"><img src="../../include/download_icon.png" class="icon"></a>
//
// This example assumes you already understand the concepts used in the <a
// href="?">basic list</a> example.  Here, we'll explore nesting lists to
// display multiple lists within the same scrolling container.  The overall
// structure is to have a single outer list, where each cell in the outer list
// contains its own `DataSource` and `ListView`.  These sublists won't be the
// same height since they will contain a random number of cells, so the outer
// `ListView` will have `isFixedHeight` set to `false`.  We'll be losing the
// optimization benefits since we no longer set the height of the outer cells
// to the same height, so we're assuming that we won't have too many outer
// cells.
//
// Note that an alternative implementation is to use a `ScrollView` instead of
// the outer list with a `linear` layout set on the `ScrollView's`
// `contentView`.  Then each sublist could be added directly to the
// `ScrollView`.  The main difference is whether this outer list is backed by
// a `DataSource` or controlled manually by the developer.

import ui.TextView as TextView;
import ui.View;
import ui.widget.ListView;
import ui.widget.CellView;
import ui.widget.ScrollTracker as ScrollTracker;

// All `ListView` instances are backed by a `DataSource`
import squill.models.DataSource as DataSource;

// The `generator` is a fun API for generating random names
import gc.generator;

// Define a view for the sublist cells
var ItemCell = Class(ui.widget.CellView, function (supr) {

	this._def = {
		// Use a basic gray style.
		backgroundColor: '#222',

		// Sublist cells are fixed height.  This allows us to have thousands
		// of sublist cells in our nested lists taking advantage of the
		// `ListView` performance optimizations on the sublists.
		height: 50,

		// We won't do anything fancy for this example.  Just render two pieces
		// of text.  Use `justifyContent` to space the subviews out evenly.
		layout: 'linear', direction: 'vertical',
		justifyContent: 'space-outside',

		subviews: [
			{id: 'name', type: 'text',
				color: 'white', fontSize: 12, fontWeight: 'bold',
				autoFontSize: false, autoSize: true, padding: "0 10"},
			{id: 'number', type: 'text',
				color: '#888', fontSize: 9,
				autoFontSize: false, autoSize: true, padding: "0 10"},

			// Add a little styling: a 1px bottom border.
			{bottom: 0, backgroundColor: '#444', height: 1, inLayout: false}
		]
	};

	// This is called whenever the ItemCell gets reused, so reset the views to match
	// the data we've been asked to display.
	this.setData = function (data) {
		supr(this, 'setData', arguments);

		this.name.setText(data.name);
		this.number.setText(data.number);
	}

});

// Define a view for the cells in the outer list.  Each cell contains a header
// and a single sublist.
var TopLevelList = Class(ui.widget.CellView, function (supr) {

	this._def = {
		// The header and sublist should be laid out vertically.
		layout: 'linear', direction: 'vertical',

		// The height of the cell is not fixed.  It should wrap its content,
		// since the sublist will change height depending on how many items
		// are in the sublist's `DataSource`.
		layoutHeight: 'wrapContent',

		subviews: [
			{id: 'header', type: 'text', left: 20, top: 20,
				backgroundColor: '#444', color: 'white',
				autoSize: true, padding: "10 10 5 10"},

			// Add a 1px border below the header
			{backgroundColor: '#444', height: 1, layoutWidth: '100%'},

			// The sublist definition specifies using the `ItemCell`
			// constructor.  `autoSize` is set to `true` to disable scrolling
			// and automatically expand the height of the ListView to the height
			// of its cells.  `isFixedSize` is set to `true` to optimize the
			// rendering of the sublist cells, rendering only cells that are
			// currently visible.
			{id: 'content',
				type: 'list',
				layoutWidth: '100%',
				cellCtor: ItemCell,
				autoSize: true,
				isFixedSize: true
			}
		]
	};

	this.setData = function (data) {
		supr(this, 'setData', arguments);

		this.header.setText(data.header);
		this.content.setDataSource(data.content);
	}

});

// Define and export the top-level Application view
exports = Class(ui.View, function () {

	// helper function for generating the JSON for styled buttons
	function getButtonDef (text, opts) {
		return merge(opts, {
			type: 'button',
			color: 'white',
			backgroundColor: '#666',
			margin: "5 0 5 5",
			layoutWidth: 'wrapContent',
			layoutHeight: 'wrapContent',
			subviews: {
				backgroundColor: '#444',
				color: '#AAA',
				margin: 1,
				text: text,
				type: 'text',
				autoSize: true,
				padding: "5 10",
			}
		});
	}

	this._def = {
		// We'll use a common layout of a fixed-height header and dynamic-
		// height body (`flex` set to `1`).  The header height will be 
		// determined by the height of its buttons, which have autoSize
		// enabled.
		layout: 'linear',
		direction: 'vertical',
		scale: GC.ui.getScale(),
		subviews: [
			{id: 'header',
				backgroundColor: '#222',
				layout: 'linear', direction: 'horizontal',
				layoutWidth: '100%', layoutHeight: 'wrapContent',
				subviews: [
					getButtonDef('Add List', {id: 'addListBtn'}),
					getButtonDef('Add Item', {id: 'addItemBtn'}),

					// bottom border
					{inLayout: false,
						bottom: 0, height: 1, backgroundColor: '#111'}
				]},
			{id: 'content',
				// The height of the outer list is set to fill the space
				// remaining after the header height is computed.
				flex: 1,
				layoutWidth: '100%',

				// The outer list has `isFixedSize` set to false since its
				// cells do not all have the same height.
				type: 'list',
				isFixedSize: false,
				cellCtor: TopLevelList
			}
		]
	};

	this.initUI = function () {

		// Create an empty `DataSource` for the outer list.
		this.data = new DataSource();
		this.content.setDataSource(this.data);

		// Each time the "Add List" button is pressed, add a new item to our
		// DataSource, effectively adding a new list to the screen.
		this.addListBtn.on('InputSelect', bind(this, function () {

			// The ID for each item must be unique, so use the length of the
			// DataSource (as long as we don't delete items from the
			// DataSource, this will be unique).
			var uid = 'list' + this.data.length;

			// The list should have a random number of items stored in a 
			// DataSource object (rendered by the sublist).
			var subitems = new DataSource();

			// Add the new item
			this.data.add({
				id: uid, // must be unique
				header: 'List ' + this.data.length,
				content: subitems
			});

			// Add a random number of new subitems
			var numItems = Math.random() * 60 + 2 | 0;
			for (var i = 0; i < numItems; ++i) {
				subitems.add({
					id: 'item' + i,
					number: Math.random(),
					name: gc.generator.username()
				});
			}
		}));

		// Add a tracker to the ScrollView to show the
		// current position
		this.content.addFixedView(new ScrollTracker({
				target: this.content,
				width: 10,
				right: 5,
				top: 5,
				bottom: 5
			}));
	};

});

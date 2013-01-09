import ui.View as View;
import ui.dialogs as dialogs;
import ui.TextView as TextView;
import ui.ImageScaleView as ImageScaleView;

exports = Class(GC.Application, function () {

	this._settings = {
		logsEnabled: window.DEV_MODE,
		showFPS: window.DEV_MODE,
		clearEachFrame: true,
		alwaysRepaint: true,
		preload: []
	};

	this.initUI = function () {
		// var textview = new TextView({
		// 	superview: this.view,
		// 	layout: "box",
		// 	text: "Hello, world!",
		// 	color: "white"
		// });

		this.style.scale = GC.ui.getScale();

		this.style.layout = 'linear';

		this.addSubview([
				{
					id: 'alertBtn',
					type: TextView,
					width: 100, height: 80,
					bottom: 10,
					backgroundColor: 'red',
					text: 'alert',
					color: 'white'
				},
				{
					id: 'promptBtn',
					type: TextView,
					width: 100, height: 80,
					bottom: 10,
					backgroundColor: 'blue',
					text: 'prompt',
					color: 'white'
				},
				{
					id: 'confirmBtn',
					type: TextView,
					width: 100, height: 80,
					backgroundColor: 'green',
					text: 'confirm',
					color: 'white'
				},
				{
					id: 'themeBtn',
					type: TextView,
					width: 100, height: 30,
					text: 'set theme',
					color: 'white'
				}
			]);

		this.alertBtn.on('InputSelect', function () {
			dialogs.alert("hello");
		});

		this.promptBtn.on('InputSelect', function openPrompt () {
			var dialog = dialogs.prompt({
				title: "Your name?",
				text: "Please enter your name",
				placeholder: "<tap here>"
			}, function (err, value) {
				if (!err) {
					if (typeof value == 'string') {
						dialogs.alert("Hello " + value);
					} else {
						openPrompt();
					}
				}
			});
		});

		this.confirmBtn.on('InputSelect', function () {
			dialogs.confirm("Are you sure you want to quit?");
		});

		this.themeBtn.on('InputSelect', function () {
			dialogs.defaultTheme = new dialogs.Theme({
				underlay: {},
				dialog: {
					background: {
						type: ImageScaleView,
						image: "resources/images/dialog.png",
						scaleMethod: '9slice',
						sourceSlices: {
							horizontal: {
								left: 20,
								right: 20 
							},
							vertical: {
								top: 20,
								bottom: 20
							}
						}
					},
					header: {
					},
					title: {
						horizontalAlign: 'center',
						verticalPadding: [25, 0],
						horizontalPadding: [20, 20],
						fontWeight: 'bold',
						fontSize: 14,
						autoSize: true,
						layoutWidth: '100%'
					},
					text: {
						horizontalAlign: 'center',
						verticalPadding: [15, 15],
						horizontalPadding: [30, 30],
						minWidth: 200
					},
					footer: {
						padding: "0 20 25 20"
					},
					input: {
						left: 40,
						right: 40,
					}
				},
				button: {
					backgroundColor: '#666',
					color: 'white',
					minWidth: 50,
					verticalPadding: [5, 5],
					autoSize: true,
					margin: "5 5 5 0"
				}
			});
		});
	};
	
	this.launchUI = function () {};
});

Ext.define('krf_new.view.east.WindowSiteNHighChart', {
	extend: 'Ext.window.Window',
	xtype: 'east-windowsitenhighchart',

	requires: [

		'Ext.chart.*',
		'Ext.window.MessageBox'
	],

	id: 'windowSiteNHighChart',
	constrain: true,
	minimizable: true,

	preX: null,
	preY: null,
	preWidth: null,
	preHeight: null,

	onEsc:false,
	parentId:null,
	
	cls: 'subWindow-x-form-item-label-default',
	header: {
		cls: 'subWindow-x-form-item-label-default',
		titlePosition: 2,
		items: [{
			xtype: 'label',
			text: '하이차트정보',
			id: 'tabBoChart',
			style: 'cursor:pointer; border:none !important; padding:2px 0; text-align:center; font-size: 13px;',
			width: 75,
			height: 21,
			listeners: {
				el: {
					click: function (obj, el, evt) {
						ChangeBoTabIndex(0);
					}
				}
			}
		}, {
			xtype: 'label',
			text: '지점정보',
			id: 'tabBoSite',
			style: 'cursor:pointer; border:none !important; padding:2px 0; text-align:center; font-size: 13px;',
			width: 75,
			height: 20,
			listeners: {
				el: {
					click: function (obj, el, evt) {
						ChangeBoTabIndex(1);
					}
				}
			}
		}]
	},

	layout: {
		type: 'vbox'
	},

	width: 500,
	height: 550,
	draggable: true,
	listeners: {//resize될때 chart panel width값 변경
		'resize': function (win, width, height, opt) {
			var highChartPanel = Ext.getCmp("highChartPanel");
			//var siteCharttest = Ext.getCmp("siteCharttest");
			//var siteinfotest = Ext.getCmp("siteinfotest");
			var bositeInfoPanel = Ext.getCmp("bositeInfoPanel");
			bositeInfoPanel.setWidth(width);//정보창 사이즈 조절

			highChartPanel.setWidth(width);
			highChartPanel.setHeight(height);
			// siteCharttest.setWidth(width);
			// siteCharttest.setHeight(height - 80);
		}, "minimize": function (window, opts) {
			if (!window.collapsed) {
				var centerContainer = Ext.getCmp('center_container');

				window.preX = window.getX();
				window.preY = window.getY();
				window.preWidth = window.getWidth();
				window.preHeight = window.getHeight();


				window.collapse();
				window.setWidth(270);
				window.alignTo(centerContainer, 'bl-bl');
			} else {
				window.setX(window.preX);
				window.setY(window.preY);
				window.setWidth(window.preWidth);
				window.setHeight(window.preHeight);

				window.expand();
			}

		}
	},
	//	cls: 'khLee-window-panel-header khLee-x-window-default ',

	items: [{
		xtype: 'container',
		id: 'infoContentsHigh',
		layout: {
			type: 'card'
		},
		items: [{
			xtype: 'east-highChartpanel'
		}
		, {
			xtype: 'east-bositeinfopanel'
		}
	]
	}],
	initComponent: function () {
		this.on("beforeclose", function windSitreNChartClose() {
			$KRF_APP.global.CommFn.resetHighChart();
		});
		this.callParent();
	}
});
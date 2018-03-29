Ext.define('krf_new.view.center.Center', {

	extend: 'Ext.panel.Panel',

	requires: ['krf_new.view.center.CenterController',
		'krf_new.view.center.ReachNameToolbar',
		'krf_new.view.center.ReachCountSToolbar',
		'krf_new.view.center.ReachCountEToolbar'],


	//	title: '&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" />',

	collapsible: false,
	controller: 'center',

	cls: 'khLee-x-header',
	xtype: 'app-default-center',

	layout: {
		type: 'absolute'
	},
	items: [{ xtype: 'app-map-coreMap', x: 0, y: 0 },
	//			{xtype: 'center-dronetoolbar', id: 'droneToolbar', style:'z-index: 30000; position: absolute;', x:0, y:0, hidden:true},
	//			{xtype: 'center-dronedetailexp', id: 'droneDetailExp', style:'z-index: 30000; position: absolute;', x:0, y:0, hidden:true},
	//			{xtype: 'center-reachtoolbar', id: 'reachToolbar', style:'z-index: 30000; position: absolute;', cls : 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target', x:0, y:0, hidden:true},
	{ xtype: 'center-reachnametoolbar', id: 'reachNameToolbar', style: 'border-style: none !important; background: transparent none !important; border-width: 2px !important; z-index: 30000; position: absolute !important;', x: 179, y: 112, hidden: true },
	{ xtype: 'center-reachcountstoolbar', id: 'reachCountSToolbar', style: 'border-style: none !important; background: transparent none !important; border-width: 2px !important;', x: 179, y: 112, hidden: true },
	{ xtype: 'center-reachcountetoolbar', id: 'reachCountEToolbar', style: 'border-style: none !important; background: transparent none !important; border-width: 2px !important; width:31px !important;', x: 179, y: 112, hidden: true },
	{ xtype: 'legendchl-panel', id: 'chlLegend', hidden: true },
	{ xtype: 'legendphy-panel', id: 'phyLegend', hidden: true }
	],
	initComponent: function () {
		this.callParent();
	}
});
Ext.define('krf_new.view.center.ThreeDimCenter', {

	extend: 'Ext.panel.Panel',

	requires: [],

	collapsible: false,
	controller: 'center',

	cls: 'khLee-x-header',
	xtype: 'app-threeDim-center',

	layout: {
		type: 'absolute'
	},
	items: [{
		xtype: 'component',
		itemId: 'threeDim-iframe',
		id: 'krf3diframe',
		autoScroll: true,
		autoEl: {
			tag: 'iframe',
			style: 'height: 100%; width: 100%;',
			id: 'krf3diframe'
		}
	}
	],
	initComponent: function () {
		this.callParent();
	}
});
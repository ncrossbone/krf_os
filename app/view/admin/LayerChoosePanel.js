Ext.define('krf_new.view.admin.LayerChoosePanel', {

	extend: 'Ext.panel.Panel',

	requires: ['krf_new.view.admin.UserGridPanel'],

	collapsible: false,
	// controller: 'center',

	cls: 'khLee-x-header',
	xtype: 'app-default-center',

	layout: {
		type: 'border'
	},
	items: [{xtype:'userGridPanel' ,region: 'center', width:400},
			{xtype:'userGridPanel' ,region: 'east', width:200}],
	initComponent: function () {
		this.callParent();
	}
});
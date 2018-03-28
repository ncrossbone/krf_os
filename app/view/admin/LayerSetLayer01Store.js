Ext.define('krf_new.view.admin.LayerSetLayer01Store', {

	extend: 'Ext.data.TreeStore',

	autoLoad: false,

	// proxy: {
	// 	type: 'ajax',
	// 	url: 'resources/data/west/Layer01Data.json',
	// 	reader: {
	// 		type: 'json'
	// 	}
	// },

	constructor: function () {
		this.callParent();
	},
	listeners: {
	}
});

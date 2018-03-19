Ext.define('krf_new.store.west.ThreeDimMeasuredStore', {

	extend: 'Ext.data.TreeStore',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'resources/data/west/ThreeDimMeasuredData.json',
		reader: {
			type: 'json'
		}
	},

	constructor: function () {
		this.callParent();
	},

	listeners: {
	}
});

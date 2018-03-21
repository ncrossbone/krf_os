Ext.define('krf_new.store.west.ThreeDimLayer01Store', {

	extend: 'Ext.data.TreeStore',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'resources/data/west/ThreeDimLayer01Data.json',
		reader: {
			type: 'json'
		}
	},

	constructor: function () {
		this.callParent();
	},

	listeners: {
		load : function(){
			console.log(arguments);
		}
	}
});

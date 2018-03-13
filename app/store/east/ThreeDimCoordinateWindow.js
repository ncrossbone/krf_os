Ext.define('krf_new.store.east.ThreeDimCoordinateWindow', {
	extend: 'Ext.data.Store',
	fields: [
		'index',
		'x',
		'y'
	],
	listeners: {
		
		load: function(store) {
		}
	}
});

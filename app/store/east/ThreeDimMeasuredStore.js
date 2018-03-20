Ext.define('krf_new.store.east.ThreeDimMeasuredStore', {
	extend: 'Ext.data.Store',

	fields: ['id', 'name'],
	data: [
		{ id: 'bod', name: 'BOD' },
		{ id: 'doc', name: 'DOC' },
		{ id: 'cod', name: 'COD' },
		{ id: 'tn', name: 'TN' },
		{ id: 'tp', name: 'TP' },
		{ id: 'temp', name: 'TEMP' },
		{ id: 'ph', name: 'PH' },
		{ id: 'ss', name: 'SS' },
		{ id: 'cloa', name: 'CLOA' },
		{ id: 'toc', name: 'TOC' }
	]
});

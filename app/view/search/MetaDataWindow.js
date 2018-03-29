Ext.define('krf_new.view.search.MetaDataWindow', {

	extend: 'Ext.window.Window',

	xtype: 'search-metaDataWindow',

	id: 'metaDataWindow',

	title: '메타데이터',
	resizable: false,
	constrain: true,
	header: { cls: 'subWindow-x-form-item-label-default' },
	cls: 'metaWindow-x-form-item-label-default',
	html: ''
});
Ext.define('krf_new.view.search.ViewDataWindow', {

	extend: 'Ext.window.Window',

	xtype: 'search-viewDataWindow',

	id: 'viewDataWindow',
	height:430,
	width:300,

	title: '경관/항공 데이터',
	resizable: false,
	constrain: true,
	header: { cls: 'subWindow-x-form-item-label-default' },
	cls: 'metaWindow-x-form-item-label-default',
	html: ''
});
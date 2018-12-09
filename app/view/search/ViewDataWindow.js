Ext.define('krf_new.view.search.ViewDataWindow', {

	extend: 'Ext.window.Window',

	xtype: 'search-viewDataWindow',

	id: 'viewDataWindow',
	height:550,
	width:250,

	title: '경관데이터',
	resizable: false,
	constrain: true,
	header: { cls: 'subWindow-x-form-item-label-default' },
	cls: 'metaWindow-x-form-item-label-default',
	html: ''
});
Ext.define('krf_new.view.search.threeDim.LegendDEM', {

	extend: 'Ext.window.Window',
	id: 'legendDEM',
	xtype: 'legendDEM-panel',

	height: 42,
	width: 223,

	title: 'DEM 범례',
	header: false,

	layout: {
		type: 'absolute'
	},

	cls: 'khLee-window-panel-header-expand',
	style: 'border-width: 0px !important; background: #fff !important;',

	items: [{
		xtype: 'image',
		id: 'LegendChlimgLegend',
		src: './resources/images/demLegend.png',
		style: 'border:0px;',
		height: 42,
		width: 223
	}]
});
Ext.define('krf_new.view.center.drone.LegendBlue', {

	extend: 'Ext.window.Window',
	id: 'blueLegend',
	xtype: 'legendblue-panel',

	height: 54,
	width: 232,

	title: '남조류세포',
	header: false,

	layout: {
		type: 'absolute'
	},

	cls: 'khLee-window-panel-header-expand',
	style: 'border-width: 0px !important; background: #fff !important;',

	items: [{
		xtype: 'image',
		id: 'LegendBlueimgLegend',
		src: './resources/images/drone/legend/standard03.png',
		style: 'border:0px;',
		height: 54,
		width: 232
	}]
});
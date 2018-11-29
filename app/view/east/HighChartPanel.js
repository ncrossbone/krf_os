Ext.define('krf_new.view.east.HighChartPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'east-highChartpanel',
	id: 'highChartPanel',
	//renderTo: Ext.getBody(),
	title: '차트정보',
	header: false,
	controller: 'highChartController',
	layout: {
		type: 'fit'
	},
	width: 450,
	height: 600,
	y: 5,
	html:('<div id="waterLevelChartDiv">'),
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	initComponent: function () {
		this.callParent();
		
	}
});
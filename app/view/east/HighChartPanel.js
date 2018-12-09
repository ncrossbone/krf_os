Ext.define('krf_new.view.east.HighChartPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'east-highChartpanel',
	id: 'highChartPanel',
	//renderTo: Ext.getBody(),
	title: '차트정보',
	header: false,
	controller: 'highChartPanelController',
	layout: {
		type: 'fit'
	},
	width: 450,
	height: 600,
	y: 5,
	items:[{
		xtype: 'container',
		id: 'highChartContiner',
		html:('<div id="chartPanel"> '
			+' <div id="siteNameLabel"></div> '
			+' <div class="con_right rs"> '
			+'	<select style="display: none;" id="startYearHigh"><option></option></select> '
			+'	<select style="display: none;" id="startMonthHigh"><option></option></select> '
			+'	<select style="display: none;" id="startGFlagHigh"><option></option></select> '
			+'	<select style="display: none;" id="startDayHigh"><option></option></select> '
			+'	<select style="display: none;" id="startHFlagHigh"><option></option></select> '
			+'	<span class="ml5 mr5">~</span> '
			+'	<select style="display: none;" id="endYearHigh"><option></option></select> '
			+'	<select style="display: none;" id="endMonthHigh"><option></option></select> '
			+'	<select style="display: none;" id="endGFlagHigh"><option></option></select> '
			+'	<select style="display: none;" id="endDayHigh"><option></option></select> '
			+'	<select style="display: none;" id="endHFlagHigh"><option></option></select> '
			+' </div> '
			+ '<ul class="c_tab" id="highChartSelectItem"><li></li></ul>'
			+ '<div id="krfHighChartDiv"></div>'
			+ '<ul id="chartUl"></ul>'
			+ '</div>'),
		cls: 'khLee-window-panel-header khLee-x-window-default ',
	}],
	
	
	initComponent: function () {
		this.callParent();
		
	}
});
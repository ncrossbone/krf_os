Ext.define('Report.view.east.rptSetSiteAttr', {
	
	extend: 'Ext.container.Container',
	
	xtype : 'rpt-east-rptSetSiteAttr',
		
	id: 'rptSetSiteAttr',
	
	title: '지점속성',
	
	layout: {
		type: 'hbox'
	},
	
	width: "100%",
	height: 25,
	
	items: [{
		xtype:"image",
		src:"../resources/images/button/blit_st_01.png",
		style:"margin-top: 8px"
	},{
		xtype: "label",
		text: "지점속성",
		style: "margin-top: 4px; padding-right: 10px; margin-left:10px; font-weight: bold;"
	}, {
		xtype: "label",
		text: "",
		style: "margin-top: 4px; padding-right: 10px;"
	}, {
		xtype: "checkbox",
		id: "chkRptAttr1",
		boxLabel: "수질지점",
		checked: true,
		width: 80
	}, {
		xtype: "checkbox",
		id: "chkRptAttr2",
		boxLabel: "주요지점",
		width: 80
	}, {
		xtype: "checkbox",
		id: "chkRptAttr3",
		boxLabel: "대표지점",
		width: 80
	}, {
		xtype: "checkbox",
		id: "chkRptAttr4",
		boxLabel: "총량지점",
		width: 80
	}]
});
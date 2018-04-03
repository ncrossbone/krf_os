Ext.define('Report.view.east.rptPollutionList', {

    extend: 'Ext.container.Container',

    xtype: 'rpt-east-rptPollutionList',


    id: 'rptPollutionList',

    title: '지점',

    layout: {
        type: 'hbox'
    },

    width: "100%",

    //siteIds: opener.Ext.getCmp("siteListWindow").siteIds,

    items: [{
        xtype: "label",
        text: "",
        style: "margin-top: 4px;"
    }, /*{
		xtype: "container",
		width: 26
	}, {
		xtype: "label",
		text: "점",
		style: "margin-top: 4px; padding-right: 10px;"
	}, {
		xtype: "label",
		text: ":",
		style: "margin-top: 4px; padding-right: 10px;"
	}, */{
        xtype: "treepanel",
        id: "treeRptPollutionList",
        rootVisible: false,
        cls: 'khLee-x-grid-cell',
        width: 430,
        height: 250,
        title: "오염원",
        //autoScroll: true,
        store: Ext.create('Report.store.east.treeRptPollutionStore'),
        columns: [{
            xtype: 'treecolumn',
            text: "리치",
            align: "left",
            style: "color:black;",
            width: 150,
            sortable: false,
            dataIndex: 'siteName',
            //dataIndex: 'text',
            checked: false,
            locked: true
        }, {
            //xtype: 'treecolumn',
            text: "주소",
            width: 300,
            style: "color:black; text-align:center;",
            sortable: false,
            dataIndex: 'siteAddr',
            checked: false
        }/*, {
            //xtype: 'treecolumn',
            text: "조사기관",
            width: 100,
            sortable: true,
            dataIndex: 'siteOrg',
            checked: true,
            locked: true
        }*/]
    }]
});
/**
* North Controller
*/
Ext.define('krf_new.view.east.ChartPanelController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.chartPanelController',
	id: 'chartController',
	imageDown: function () {
		var siteCharttest = Ext.getCmp('siteCharttest');
		setActionInfo(siteCharttest.store.parentId, siteCharttest.store.orgParentId, "", siteCharttest.store.siteCD, "차트저장");
		siteCharttest.download({
			type: 'image/svg+xml',
			filename: 'image'
		})
	},
	
	showConfig: function () {
		var dateWinCtl = Ext.getCmp("datePanel1");

		if (!dateWinCtl) {
			dateWinCtl = Ext.create("krf_new.view.east.ChartPanelDate");
		}

		if (dateWinCtl.hidden) {
			Ext.getCmp('center_container').add(dateWinCtl);
			dateWinCtl.show();
		}
	}
});
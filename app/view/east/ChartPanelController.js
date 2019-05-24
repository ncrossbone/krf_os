/**
* North Controller
*/
Ext.define('krf_new.view.east.ChartPanelController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.chartPanelController',
	id: 'chartController',
	imageDown: function () {
		var siteCharttest = Ext.getCmp('siteCharttest');
		//setActionInfo(siteCharttest.store.parentId, siteCharttest.store.orgParentId, "", siteCharttest.store.siteCD, "차트저장");

		var logLayerCode = siteCharttest.store.orgParentId != '' ? siteCharttest.store.orgParentId : siteCharttest.store.parentId;
		//'인트라넷/보' , '타입' , '레이어코드' , '지점아이디', '계정'
		setActionInfo('W', 'S', logLayerCode, siteCharttest.store.siteCD, $KRF_APP.loginInfo.userId);

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
	},
	onAxisLabelRender: function (axis, label, layoutContext) {
		var chartPanel = Ext.getCmp('windowSiteNChart');
		
		if (chartPanel.parentId == 'H') {
			return layoutContext.renderer(Ext.String.format('{0}.{1}.{2}',label.substring(0,4), label.substring(4,6), label.substring(6,8)));
		} else {

			return layoutContext.renderer(label);
		}

	},
});
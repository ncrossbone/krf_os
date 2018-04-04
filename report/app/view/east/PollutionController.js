Ext.define('Report.view.east.PollutionController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.pollutionController',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged'
		}
	},
	columnMap: {
		'01': 'POP_SUM',
		'02': 'LIVESTOCK_CNT',
		'03': 'WUSE_W_SUM',
		'04': 'AREA_SUM',
		'05': 'AREA_REG_TOTAL',
		'06': 'PRODUCT_AMT',
		'07': 'WW_AMT'
	},

	onCheckChanged: function (node, checked, btnId) {
		if (checked) {
			if (node.data.reachData.length > 0) {

				var year = '2013';
				var collNm = this.columnMap[node.data.id];
				var pollutionKind = parseInt(node.data.id);

				var catDatas = [];
				for (var i = 0; i < node.data.reachData.length; i++) {
					catDatas.push(node.data.reachData[i].data);
				}
				Ext.getCmp("treeRptPollutionList").removeCls("dj-mask-noneimg");
				Ext.getCmp("treeRptPollutionList").addCls("dj-mask-withimg");
				Ext.getCmp("treeRptPollutionList").mask("loading", "loading...");


				var reportMap = Ext.getCmp('_rptMapDiv_');
				reportMap.showCatPollutionLayer(catDatas, year, collNm, pollutionKind + '', function (imgPath) {
					node.data.imgPath = imgPath;
					
					Ext.getCmp("treeRptPollutionList").unmask();
				});
			}
		}
	}
});

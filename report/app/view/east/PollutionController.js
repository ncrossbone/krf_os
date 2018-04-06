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
		var reportMap = Ext.getCmp('_rptMapDiv_');

		reportMap.clearPollutionLayers();

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

				reportMap.showCatPollutionLayer(catDatas, year, collNm, pollutionKind + '', function (imgPath) {
					node.data.imgPath = imgPath;
					var treeRptPollutionList = Ext.getCmp('treeRptPollutionList');
					var models = treeRptPollutionList.getStore().getRange();

					for (var i = 0; i < models.length; i++) {
						if (models[i].id == node.id) {
							models[i].set('imgFlag', '생성 완료');
						}
					}
					treeRptPollutionList.unmask();
				});
			}
		}
	}
});

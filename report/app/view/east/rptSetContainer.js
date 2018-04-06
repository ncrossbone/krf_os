Ext.define('Report.view.east.rptSetContainer', {

	extend: 'Ext.container.Container',

	xtype: 'rpt-east-rptSetContainer',

	requires: ['Report.view.east.rptSetPeriod',
		'Report.view.east.rptSetItems',
		'Report.view.east.rptSetSiteAttr',
		'Report.view.east.rptSetSiteList',
		'Report.view.east.rptSetCondition',
		'Report.view.east.rptPollutionList'],

	id: 'rptSetContainer',

	title: '리포팅 셋팅 컨테이너',
	header: false,

	layout: {
		type: 'vbox'
	},

	width: "100%",
	height: 800,

	/*style: "margin-left: 20px; margin-top: 20px;",*/
	style: "margin-top: 20px;",
	items: [{
		xtype: 'rpt-east-rptSetCondition',
		title: '검색조건',
		style: "margin-left: 20px;"
	}, {
		xtype: 'container',
		height: 10
	}, {
		xtype: 'rpt-east-rptSetPeriod',
		title: '기간',
		style: "margin-left: 20px;"
	}, {
		xtype: 'container',
		height: 10
	}, {
		xtype: 'rpt-east-rptSetItems',
		title: '항목',
		hidden: true,
		style: "margin-left: 20px;"
	}, {
		xtype: 'rpt-east-rptSetSiteAttr',
		title: '지점속성',
		style: "margin-left: 20px;",
		hidden: true
	}, {
		xtype: 'container',
		height: 10
	}, {
		xtype: 'rpt-east-rptSetSiteList',
		title: '지점',
		height: 300
	}, {
		xtype: 'rpt-east-rptPollutionList',
		id: 'pollutionContainer',
		title: '오염원',
		height: 300
	}, {
		xtype: 'container',
		layout: {
			type: 'fit'
		},
		items: [{
			xtype: 'image',
			src: '../resources/images/button/btn_report.png',
			style: 'cursor: pointer; margin-left:170px;',
			text: '리포트보기',
			listeners: {
				el: {
					click: function () {
						var reportMap = Ext.getCmp('_rptMapDiv_');
						reportMap.resetMapLayers();

						var paramCode = "";
						var listStore = Ext.getCmp("treeRptSiteList").getStore();
						for (var i = 0; i < listStore.data.items.length; i++) {

							if (listStore.data.items[i].data.leaf == true) {

								if (listStore.data.items[i].data.checked == true) {

									paramCode += "'" + listStore.data.items[i].data.id + "', ";
								}
							}
						}

						paramCode = paramCode.substring(0, paramCode.length - 2);

						var radio = Ext.getCmp("rptRadio").lastValue.rb;

						var startYear = Ext.getCmp("cmbRptPeriodStYear").getValue();
						var endYear = Ext.getCmp("cmbRptPeriodEdYear").getValue();

						if (endYear < startYear) {
							alert("검색 종료년도가 시작년도보다 작습니다.");
							return;
						}

						if (endYear - startYear > 2) {
							alert("검색 기간은 3년을 초과할 수 없습니다.");
							return;
						}

						if (radio != "1") {
							startYear = Ext.getCmp("cmbRptPeriodStYear").getValue() + "." + Ext.getCmp("cmbRptPeriodStMonth").getValue();
							endYear = Ext.getCmp("cmbRptPeriodEdYear").getValue() + "." + Ext.getCmp("cmbRptPeriodEdMonth").getValue();
						}

						var pollutionStore = Ext.getCmp("treeRptPollutionList").getStore();
						var pollutionImages = '';
						var pollCnt = 0;
						for (var i = 0; i < pollutionStore.data.items.length; i++) {

							if (pollutionStore.data.items[i].data.leaf == true) {

								if (pollutionStore.data.items[i].data.checked == true) {
									pollCnt++;
									pollutionImages += '&img' + pollutionStore.data.items[i].data.id + '=' + encodeURIComponent(pollutionStore.data.items[i].data.imgPath);
								}
							}
						}

						var paramUrl = '../ClipReport4/reportView.jsp?';

						reportMap.report(paramCode, startYear, endYear, function (imagePath) {
							paramUrl += 'imgPath=' + encodeURIComponent(imagePath);
							paramUrl += '&paramCode=' + paramCode;
							paramUrl += '&startYear=' + startYear;
							paramUrl += '&endYear=' + endYear;
							paramUrl += '&iCnt=' + pollCnt;
							paramUrl += pollutionImages;
							window.open(paramUrl, "", "width=1000,height=1000,status=no,toolbar=no,scrollbars=no");
						});

					}
				}
			}
		}]
	}]
});
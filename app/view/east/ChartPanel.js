Ext.define('krf_new.view.east.ChartPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'east-chartpanel',

	id: 'chartPanel',
	//renderTo: Ext.getBody(),
	title: '차트정보',
	header: false,
	controller: 'chartPanelController',
	layout: {
		type: 'fit'
	},

	width: 450,
	height: 600,
	y: 5,

	cls: 'khLee-window-panel-header khLee-x-window-default ',

	items: [{
		xtype: 'container',
		layout: {
			type: 'vbox'
		},
		items: [{
			xtype: 'cartesian',
			id: 'siteCharttest',
			preText: '',
			html: '<div style="position:absolute; right:20px; z-index:5;">' +
				'<img id="btnShowSearchWindow" src="./resources/images/button/btn_date.gif" onclick=Ext.create(\"krf_new.view.east.ChartPanelController\").showConfig() style="cursor:pointer;"/>' +
				'<img id="btnImageDown" src="./resources/images/button/icon_save.gif" onclick=Ext.create(\"krf_new.view.east.ChartPanelController\").imageDown() style="cursor:pointer;"/>' +
				'</div>',
			interactions: 'crosszoom',
			legend: {
				id: 'chartPanelLegend',
				docked: 'bottom',
				listeners: {
					boxready: function (lenendInstance) {
						var parentWIndow = this.up('window');
						if (parentWIndow.parentId == 'H') {
							$('#' + lenendInstance.id + ' .x-legend-item')[0].remove();
						} else {
							$('#' + lenendInstance.id).hide();
						}
					}
				}
			},
			innerPadding: {
				left: 30,
				right: 30
			},
			insetPadding: {
				top: 40,
				left: 10,
				right: 10,
				bottom: 10
			},
			width: 450,
			height: 500,
			padding: '10 0 0 0',
			style: {
				'background': '#fff'
			},
			animate: true,
			shadow: false,

			axes: [{
				type: 'numeric',
				position: 'left',
				grid: true,
				minimum: 0
			}, {
				type: 'category',
				position: 'bottom',
				style: {
					textPadding: 50
				},
				grid: true,
				label: {
					rotate: {
						degrees: -45
					}
				},
				renderer: 'onAxisLabelRender'
			}],
			series: [{
				text: 'month',
				type: 'line',
				axis: 'left',
				xField: 'WMCYMD',
				yField: 'ITEM_VALUE',
				title: '측정값',
				marker: true,
				tips: {
					trackMouse: true,
					style: 'background: #FFF',
					height: 40,
					showDelay: 0,
					dismissDelay: 0,
					hideDelay: 0,
					renderer: function (tooltip, storeItem) {

						var series = Ext.getCmp("siteCharttest");

						var format = '';
						var itemNm = storeItem.get('ITEM_NAME');
						if (itemNm.indexOf('AMT') > -1) {
							format = itemNm;
						} else {
							var itemNms = itemNm.split('_');
							format = itemNms[0];
							if (itemNms.length > 1) {
								format = itemNms.slice(1, itemNms.length).join('_');
							}
						}

						var maVal = "";
						//2019-02-25 정량한계 미만
						if(storeItem.get("ITEM_VALUE_1") == "정량한계미만 "){
							maVal = "정량한계미만";
						}else{
							maVal = Ext.util.Format.number(storeItem.get(series.series[0]._yField), $KRF_APP.global.AttrFn.getAttrFormat(storeItem.joined[0].parentId, format));
						}

						tooltip.setTitle('측정일 : ' + storeItem.get(series.series[0]._xField) + '<br>' + '측정값 : ' + maVal);
					}
				}
			}, {
				text: 'month',
				type: 'line',
				axis: 'left',
				xField: 'PREDICT_DT',
				yField: 'BOD_1',
				title: '과거수질자료',
				marker: true,
				tips: {
					trackMouse: true,
					style: 'background: #FFF',
					height: 40,
					showDelay: 0,
					dismissDelay: 0,
					hideDelay: 0,
					renderer: function (tooltip, storeItem) {

						var series = Ext.getCmp("siteCharttest");

						var format = '';
						var day = storeItem.get(series.series[1]._xField).substring(0, 4) + "년"
							+ storeItem.get(series.series[1]._xField).substring(4, 6) + "월"
							+ storeItem.get(series.series[1]._xField).substring(6, 8) + "일";

						var maVal = Ext.util.Format.number(storeItem.get(series.series[1]._yField), $KRF_APP.global.AttrFn.getAttrFormat(storeItem.joined[0].parentId, format));

						tooltip.setTitle('측정일 : ' + day + '<br>' + '측정값 : ' + maVal);
					}
				}
			}, {
				text: 'month',
				type: 'line',
				axis: 'left',
				xField: 'PREDICT_DT',
				yField: 'BOD_2',
				title: '예보결과D',
				marker: true,
				tips: {
					trackMouse: true,
					style: 'background: #FFF',
					height: 40,
					showDelay: 0,
					dismissDelay: 0,
					hideDelay: 0,
					renderer: function (tooltip, storeItem) {
						var series = Ext.getCmp("siteCharttest");

						var format = '';
						var day = storeItem.get(series.series[2]._xField).substring(0, 4) + "년"
							+ storeItem.get(series.series[2]._xField).substring(4, 6) + "월"
							+ storeItem.get(series.series[2]._xField).substring(6, 8) + "일";

						var maVal = Ext.util.Format.number(storeItem.get(series.series[2]._yField), $KRF_APP.global.AttrFn.getAttrFormat(storeItem.joined[0].parentId, format));

						tooltip.setTitle('측정일 : ' + day + '<br>' + '측정값 : ' + maVal);
					}
				}
			}, {
				text: 'month',
				type: 'line',
				axis: 'left',
				xField: 'PREDICT_DT',
				yField: 'BOD_3',
				title: '예보결과D-1',
				marker: true,
				tips: {
					trackMouse: true,
					style: 'background: #FFF',
					height: 40,
					showDelay: 0,
					dismissDelay: 0,
					hideDelay: 0,
					renderer: function (tooltip, storeItem) {
						var series = Ext.getCmp("siteCharttest");

						var format = '';
						var day = storeItem.get(series.series[3]._xField).substring(0, 4) + "년"
							+ storeItem.get(series.series[3]._xField).substring(4, 6) + "월"
							+ storeItem.get(series.series[3]._xField).substring(6, 8) + "일";

						var maVal = Ext.util.Format.number(storeItem.get(series.series[3]._yField), $KRF_APP.global.AttrFn.getAttrFormat(storeItem.joined[0].parentId, format));

						tooltip.setTitle('측정일 : ' + day + '<br>' + '측정값 : ' + maVal);
					}
				}
			}, {
				text: 'month',
				type: 'line',
				axis: 'left',
				xField: 'PREDICT_DT',
				yField: 'BOD_4',
				title: '예보결과D-2',
				marker: true,
				tips: {
					trackMouse: true,
					style: 'background: #FFF',
					height: 40,
					showDelay: 0,
					dismissDelay: 0,
					hideDelay: 0,
					renderer: function (tooltip, storeItem) {
						var series = Ext.getCmp("siteCharttest");

						var format = '';
						var day = storeItem.get(series.series[4]._xField).substring(0, 4) + "년"
							+ storeItem.get(series.series[4]._xField).substring(4, 6) + "월"
							+ storeItem.get(series.series[4]._xField).substring(6, 8) + "일";

						var maVal = Ext.util.Format.number(storeItem.get(series.series[4]._yField), $KRF_APP.global.AttrFn.getAttrFormat(storeItem.joined[0].parentId, format));

						tooltip.setTitle('측정일 : ' + day + '<br>' + '측정값 : ' + maVal);
					}
				}
			}],
			listeners: {
				storechange: function () {
					var parentWIndow = this.up('window');

					if (parentWIndow) {
						if (parentWIndow.parentId == 'H') {
							Ext.getCmp('chartPanelLegend').show();
						} else {
							Ext.getCmp('chartPanelLegend').hide();
						}
					}

				}
			}
		}]
	}],

	initComponent: function () {
		this.callParent();
	}
});
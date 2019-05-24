Ext.define('krf_new.view.south.SearchResultGrid', {

	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',

	xtype: 'south-grid-searchresult',

	id: 'searchResultContainer',
	height: '100%',
	width: '100%',

	gridId: null,

	initComponent: function () {
		this.items = [{
			xtype: 'container',
			id: 'grid-container_' + this.gridId,
			width: '100%',
			height: '100%',
			items: [{
				xtype: 'grid',
				layerId: "A",
				plugins: ['bufferedrenderer', 'gridfilters'],
				cls: 'khLee-x-column-header-text',
				siteIds: "",
				parentIds: [],
				header: {
					height: 5
				},
				title: '검색결과',
				siteId: '',
				beforeRender: function () {
					var me = this;
					var parentCtl = this.findParentByType("window");

					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);

					parentCtl.on("resize", function () {
						////console.info(parentCtl);
						me.setWidth(parentCtl.getWidth() - 10);
						me.setHeight(parentCtl.getHeight() - 110);
					});

				},
				columns: [{
					text: '측정소코드',
					//dataIndex: 'PT_NO',
					dataIndex: 'WQMN_CODE',
					hidden: true,
					hideable: false, // filter Columns영역에 보이지 않기
					width: 0
				}, {
					text: '측정소명',
					//dataIndex: 'PT_NM',
					dataIndex: 'WQMN_NM',
					width: 100,
					//filterable: true,
					//filter: {type: 'string'},
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } },
					listeners: {
						click: function (tblView, el, rowCnt, colCnt, row) {
							////console.info(this.findParentByType("grid").parentIds);
							var gridCtl = this.findParentByType("grid")
							var parentIds = gridCtl.parentIds;
							var siteId = row.record.data.WQMN_CODE;
							var parentId = "";

							for (var i = 0; i < parentIds.length; i++) {
								if (siteId == parentIds[i].siteId) {
									parentId = parentIds[i].parentId;
								}
							}

							if (parentId == "") {
								siteMovePoint(parentIds, siteId);
							} else {
								siteMovePoint(parentId, siteId);
							}
						}
					}
				}, {
					text: '년도',
					//dataIndex: 'WMYR',
					dataIndex: 'YEAR',
					width: 50,
					filter: { type: 'numeric'/*, fields: {}*/ }
				}, {
					text: '월',
					//dataIndex: 'WMOD',
					dataIndex: 'MT',
					width: 50,
					filter: { type: 'numeric'/*, fields: {}*/ }
				}, {
					text: '측정일자',
					//dataIndex: 'WMCYMD',
					dataIndex: 'CHECK_DE', // 수정필요
					width: 90,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '회차',
					//dataIndex: 'WMWK',
					dataIndex: 'TME',
					width: 90,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '수심',
					//dataIndex: 'WMDEP',
					dataIndex: 'WTRSMPLE_DE',
					//hidden: true,
					//hideable: false, // filter Columns영역에 보이지 않기
					width: 90,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '레이어코드',
					dataIndex: 'parentId',// 수정필요
					hidden: true,
					hideable: true, // filter Columns영역에 보이지 않기
					width: 0
				}, {
					text: 'BOD (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_BOD',
						dataIndex: 'CURR_1052',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'BOD'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_BOD',
						dataIndex: 'CHART_1052',
						//data: [4, 3, 4, 6, 2],
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(  //'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'BOD'));
												return yVal + " ㎎/L";
											}
										}

									}
								}

							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 5.8,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)

						}
					}]
				}, {
					text: 'DO (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_DO',
						dataIndex: 'CURR_1054',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DOC'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_DO',
						dataIndex: 'CHART_1054',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DOC'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 15.5,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'COD (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_COD',
						dataIndex: 'CURR_1049', // 확인필요
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'COD'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_COD',
						dataIndex: 'CHART_1049',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'COD'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 11.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'T-N (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TN',
						dataIndex: 'CURR_1055',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TN'));
							}
						},
						filter: 'number'
					}, {
						text: '추이변화',
						//dataIndex: 'CHART_TN',
						dataIndex: 'CHART_1055',
						width: 80,
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TN'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.628,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'T-P (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TP',
						dataIndex: 'CURR_1056',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TP'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_TP',
						dataIndex: 'CHART_1056',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TP'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0.237,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '수온 (℃)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TEMP',
						dataIndex: 'CURR_1060',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TEMP'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_TEMP',
						dataIndex: 'CHART_1060',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TEMP'));
												return yVal + " ℃";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 28.8,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'pH',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_PH',
						dataIndex: 'CURR_1039',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PH'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_PH',
						dataIndex: 'CHART_1039',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PH'));
												return yVal;
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 9.5,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'SS (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_SS',
						dataIndex: 'CURR_1053',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'SS'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_SS',
						dataIndex: 'CHART_1053',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter, 
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'SS'));
												return yVal + " ㎎/L";
											}
										}
									},
									renderer: function(value){
										console.info(value)
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							renderer: function (value) {
							},
							chartRangeMax: 27.7,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '클로로필a (㎎/㎥)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_CLOA',
						dataIndex: 'CURR_1063',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CLOA'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CLOA',
						dataIndex: 'CHART_1063',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]} </p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CLOA'));
												return yVal + " ㎎/㎥";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 30.4,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'TOC (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TOC',
						dataIndex: 'CURR_1073',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TOC'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_TOC',
						dataIndex: 'CHART_1073',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TOC'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '유량 (㎥/s)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_AMNT',
						dataIndex: 'CURR_1059',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'AMNT'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_AMNT',
						dataIndex: 'CHART_1059',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'AMNT'));
												return yVal + " ㎥/s";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'DTN (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_DTN',
						dataIndex: 'CURR_1066',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DNT'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_DTN',
						dataIndex: 'CHART_1066',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DNT'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'NO₃-N (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_NO3N',
						dataIndex: 'CURR_1013',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'NO3N'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_NO3N',
						dataIndex: 'CHART_1013',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'NO3N'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'NH₃-N (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_NH3N',
						dataIndex: 'CURR_1012',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'NH3N'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_NH3N',
						dataIndex: 'CHART_1012',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'NH3N'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'DTP (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_DTP',
						dataIndex: 'CURR_1067',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DTP'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_1067',
						//dataIndex: 'CHART_DTP',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DTP'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'PO₄-P (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_POP',
						dataIndex: 'CURR_1065',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'POP'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_POP',
						dataIndex: 'CHART_1065',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'POP'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '투명도 (m)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TRANS',
						dataIndex: 'CURR_1062',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TRANS'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_TRANS',
						dataIndex: 'CHART_1062',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TRANS'));
												return yVal + " m";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '조류 (개체수/㎖)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_ALGOL',
						dataIndex: 'CURR_1070',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ALGOL'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_ALGOL',
						dataIndex: 'CHART_1070',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ALGOL'));
												return yVal + " 개체수/㎖";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '총대장균군수 (총대장균군수/100㎖)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TCOLI',
						dataIndex: 'CURR_1002',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TCOLI'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_TCOLI',
						dataIndex: 'CHART_1022',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TCOLI'));
												return yVal + " 총대장균군수/100㎖";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '분원성대장균군수 (분원성대장균군수/100㎖)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_ECOLI',
						dataIndex: 'CURR_1004',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ECOLI'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_ECOLI',
						dataIndex: 'CHART_1004',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ECOLI'));
												return yVal + " 분원성대장균군수/100㎖";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '안티몬 (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_ANTIMON',
						dataIndex: 'CURR_1083',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ANTIMON'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_ANTIMON',
						dataIndex: 'CHART_1083',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ANTIMON'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'phenol (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_PHENOL',
						dataIndex: 'CURR_1016',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PHENOL'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_PHENOL',
						dataIndex: 'CHART_1016',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PHENOL'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '색도(도)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_COL',
						dataIndex: 'CURR_1037',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'COL'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_COL',
						dataIndex: 'CHART_1037',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'COL'));
												return yVal + " 도";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'N-H (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_NHEX',
						dataIndex: 'CURR_1064',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'NHEX'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_NHEX',
						dataIndex: 'CHART_1064',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'NHEX'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Fe (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_FE',
						dataIndex: 'CURR_1043',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'FE'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_FE',
						dataIndex: 'CHART_1043',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'FE'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Mn (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_MN',
						dataIndex: 'CURR_1064',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'MN'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_MN',
						dataIndex: 'CHART_1064',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'MN'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Cd (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_CD',
						dataIndex: 'CURR_1014',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CD'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CD',
						dataIndex: 'CHART_1014',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CD'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'CN (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_CN',
						dataIndex: 'CURR_1010',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CN'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CN',
						dataIndex: 'CHART_1010',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CN'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Pb (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_PB',
						dataIndex: 'CURR_1005',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PB'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_PB',
						dataIndex: 'CHART_1005',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PB'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Cr6+ (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_CR6',
						dataIndex: 'CURR_1011',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CR6'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CR6',
						dataIndex: 'CHART_1011',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CR6'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Cr (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_CR',
						dataIndex: 'CURR_1057',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CR'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CR',
						dataIndex: 'CHART_1057',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CR'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'As (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_AS',
						dataIndex: 'CURR_1007',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'AS'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_AS',
						dataIndex: 'CHART_1007',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'AS'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Hg (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_HG',
						dataIndex: 'CURR_1009',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'HG'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_HG',
						dataIndex: 'CHART_1009',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'HG'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Cu (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						// /dataIndex: 'CURR_CU',
						dataIndex: 'CURR_1061',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CU'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CU',
						dataIndex: 'CHART_1061',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CU'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'Zn (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_ZN',
						dataIndex: 'CURR_1040',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ZN'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_ZN',
						dataIndex: 'CHART_1040',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ZN'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'F (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_FL',
						dataIndex: 'CURR_1006',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'FL'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_FL',
						dataIndex: 'CHART_1006',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'FL'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'ABS (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_ABS',
						dataIndex: 'CURR_1038',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ABS'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_ABS',
						dataIndex: 'CHART_1038',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'ABS'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'cl- (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_CL',
						dataIndex: 'CURR_1041',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CL'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CL',
						dataIndex: 'CHART_1041',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CL'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'TCE (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TCE',
						dataIndex: 'CURR_1023',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TCE'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_TCE',
						dataIndex: 'CHART_1023',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TCE'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'PCE (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_PCE',
						dataIndex: 'CURR_1022',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PCE'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_PCE',
						dataIndex: 'CHART_1022',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PCE'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '사염화탄소 (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_CCL4',
						dataIndex: 'CURR_1030',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CCL4'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CCL4',
						dataIndex: 'CHART_1030',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CCL4'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '1,2-디클로로에탄 (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_DCETH',
						dataIndex: 'CURR_1071',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DCETH'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_DCETH',
						dataIndex: 'CHART_1071',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DCETH'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '디클로로메탄 (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_DCM',
						dataIndex: 'CURR_1024',						
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DCM'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_DCM',
						dataIndex: 'CHART_1024',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DCM'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '벤젠 (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_BENZENE',
						dataIndex: 'CURR_1025',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'BENZENE'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_BENZENE',
						dataIndex: 'CHART_1025',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'BENZENE'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '클로로포름 (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_CHCL3',
						dataIndex: 'CURR_1072',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CHCL3'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_CHCL3',
						dataIndex: 'CHART_1072',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'CHCL3'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '유기인 (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_OP',
						dataIndex: 'CURR_1048',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'OP'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_OP',
						dataIndex: 'CHART_1048',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'OP'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'PCB (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_PCB',
						dataIndex: 'CURR_1094',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PCB'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_PCB',
						dataIndex: 'CHART_1094',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PCB'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'DEHP (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_DEHP',
						dataIndex: 'CURR_1082',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DEHP'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_DEHP',
						dataIndex: 'CHART_1082',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DEHP'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'DIOX (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_DIOX',
						dataIndex: 'CURR_1086',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DIOX'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_DIOX',
						dataIndex: 'CHART_1086',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'DIOX'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: '포름알데히드 (㎎/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_HCHO',
						dataIndex: 'CURR_1093',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'HCHO'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_HCHO',
						dataIndex: 'CHART_1093',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'HCHO'));
												return yVal + " ㎎/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'HCB (㎍/L)',
					hidden: true,
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_HCB',
						dataIndex: 'CURR_1094',
						width: 105,
						renderer: function (value) {
							if (value == 999999999) {
								return "정량한계미만";
							}
							else if (value == 888888888) {
								return "";
							}
							else {
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'HCHO'));
							}
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_HCB',
						dataIndex: 'CHART_1094',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										if (yVal == null) {
											return yVal = "";
										} else {
											if(yVal == 0.000000001){//정량한계미만
												return "정량한계미만";
											}else{
												yVal = Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'HCHO'));
												return yVal + " ㎍/L";
											}
										}
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull: false,  // false : null 포함
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}
				]
			}]
		}];
		this.callParent();
		// 검색조건 컨트롤 초기화

		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
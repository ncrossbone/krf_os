Ext.define('krf_new.view.south.SearchResultGrid_B', {

	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',

	xtype: 'south-grid-searchresult',
	id: 'searchResultContainer_B',

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
				layerId: 'B',
				//id: 'grdSearchResult',
				//id: this.up('container').up('container'),
				plugins: ['bufferedrenderer', 'gridfilters'],
				cls: 'khLee-x-column-header-text',
				height: 215,
				loadMask: true,
				//plugins: 'bufferedrenderer',
				siteIds: "",
				parentIds: [],
				//height: '100%',
				header: {
					height: 5
				},
				title: '검색결과',
				siteId: '',
				//store: 'KRF_DEV.store.south.SearchResultGrid',
				//store: Ext.create('KRF_DEV.store.south.SearchResultGrid'),
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
					text: '사업장코드',
					dataIndex: 'BPLC_CODE',
					//hidden: true,
					//hideable: false, // filter Columns영역에 보이지 않기
					width: 0
				}, {
					text: '사업장명',
					dataIndex: 'BPLC_NM',
					width: 100,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } },
					listeners: {
						click: function (tblView, el, rowCnt, colCnt, row) {
							////console.info(this.findParentByType("grid").parentIds);
							var gridCtl = this.findParentByType("grid");
							var parentIds = gridCtl.parentIds;
							var siteId = row.record.data.BPLC_CODE;
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
					text: '대권역',
					dataIndex: 'LDT_CODE_NM',
					hidden: true,
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '중권역',
					dataIndex: 'MDT_CODE_NM',
					hidden: true,
					width: 70,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: 'SDT_CODE_NM',
					dataIndex: 'AS_NM',
					hidden: true,
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '방류구분번호',
					dataIndex: 'DCWTRH_NO',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '조사일',
					dataIndex: 'STDR_DE',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '시설구분',
					dataIndex: 'BPLC_KND_NM',
					hidden: true,
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '처리용량',
					dataIndex: 'PROCESS_CPCTY',
					hidden: true,
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: 'BOD (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_BOD',
						dataIndex: 'CURR_1052',
						width: 100,
						renderer: function (value) {
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'BOD'));
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_BOD',
						dataIndex: 'CHART_1052',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'BOD'));
										return yVal;
									}
								}
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 2.86,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'COD (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_COD',
						dataIndex: 'CURR_1049',
						width: 100,
						renderer: function (value) {
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'COD'));
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
								'<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'COD'));
										return yVal;
									}
								}
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 10.56,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'SS (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_SS',
						dataIndex: 'CURR_1053',
						width: 100,
						renderer: function (value) {
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'SS'));
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
								'<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'SS'));
										return yVal;
									}
								}
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 9.02,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'T-N (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TN',
						dataIndex: 'CURR_1055',
						width: 100,
						renderer: function (value) {
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TN'));
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_TN',
						dataIndex: 'CHART_1055',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TN'));
										return yVal;
									}
								}
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 10.78,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text: 'T-P (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TP',
						dataIndex: 'CURR_1056',
						width: 100,
						renderer: function (value) {
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TP'));
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
								'<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TP'));
										return yVal;
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 1.98,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {

					text: 'pH',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_PH',
						dataIndex: 'CURR_1039',
						width: 100,
						renderer: function (value) {
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PH'));
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
								'<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'PH'));
										return yVal;
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 8.69,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]

				}, {

					text: '적산유량(평균) (㎥/Hour)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_FLW',
						dataIndex: 'CURR_1098',
						width: 100,
						renderer: function (value) {
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'FLW'));
						},
						filter: { type: 'numeric'/*, fields: {}*/ }
					}, {
						text: '추이변화',
						width: 80,
						//dataIndex: 'CHART_FLW',
						dataIndex: 'CHART_1098',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
								'<tpl for=".">',
								'<p>측정일자 : {[this.formatX(values.x)]}</p>',
								'<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'FLW'));
										return yVal;
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 1061.5,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]

				}, {

					text: '총유기탄소 (㎎/L)',
					columns: [{
						text: '측정값',
						//dataIndex: 'CURR_TOC',
						dataIndex: 'CURR_1073',
						width: 100,
						renderer: function (value) {
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TOC'));
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
								'<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
								'</tpl>',
								{
									formatX: $KRF_APP.global.CommFn.dateFormatter,
									formatY: function (yVal) {
										yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId, 'TOC'));
										return yVal;
									}
								}
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							spotRadius: 1,
							chartRangeMax: 11,
							chartRangeMin: 0,
							valueSpots: { '-100:': 'red' } // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]

				}, {
					text: '시도',
					dataIndex: 'DO_NM',
					hidden: true,
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '시군구',
					dataIndex: 'CTY_NM',
					hidden: true,
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '읍면동',
					dataIndex: 'DONG_NM',
					hidden: true,
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '동리',
					dataIndex: 'RI_NM',
					hidden: true,
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}]
			}]
		}];

		this.callParent();

		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("사업장TMS", this.down("grid"));
	}
});
Ext.define('krf_new.view.south.SearchResultGrid_L', {

	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',

	xtype: 'south-grid-searchresult',

	id: 'searchResultContainer_L',
	height: '100%',
	width: '100%',
	gridId: null,
	//취수장
	initComponent: function () {
		
		this.items = [{
			xtype: 'container',
			id: 'grid-container_' + this.gridId,
			width: '100%',
			height: '100%',
			items: [{
				xtype: 'grid',
				layerId: 'J',
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
					text: '지점명',
					dataIndex: 'ENVBSIS_SITE_MANAGE_NM',
					width: 120,
					listeners: {
						click: function (tblView, el, rowCnt, colCnt, row, a, b) {
							var centerContainer = Ext.getCmp('center_container');
							//보고서 정보
							var searchResultGrid_L_Window = Ext.getCmp('searchResultGrid_L_Window')
							
							searchResultGrid_L_Window = Ext.create('krf_new.view.south.SearchResultGrid_L_Window');
							//추가
							centerContainer.add(searchResultGrid_L_Window);
							

							var store = Ext.create('krf_new.store.south.SearchResultGrid_L_Window', {
								async: true,
								siteId: a.data.ENVBSIS_SITE_MANAGE_NO,
							});
							store.load();


						}
					}
				},{
					text: '측정일자',
					dataIndex: 'MESURE_DE',
					width: 120
				},{
					text: '생물학적산소요구량',
					dataIndex: 'BOD',
					width: 120
				},{
					text: '화학적산소요구량',
					dataIndex: 'COD',
					width: 120
				},{
					text: '총유기탄소',
					dataIndex: 'TOC',
					width: 120
				},{
					text: '총질소',
					dataIndex: 'TN',
					width: 120
				},{
					text: '총인',
					dataIndex: 'TP',
					width: 120
				},{
					text: '부유물질',
					dataIndex: 'SS',
					width: 120
				},{
					text: '조류',
					dataIndex: 'SEAWEED',
					width: 120
				},{
					text: '저서성대형무척추동물',
					dataIndex: 'BEMA',
					width: 120
				},{
					text: '어류',
					dataIndex: 'FISHES',
					width: 120
				}]
			}]
		}];

		this.callParent();
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
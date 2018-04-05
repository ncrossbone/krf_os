Ext.define('krf_new.view.south.SearchResultGrid_J002', {

	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',

	xtype: 'south-grid-searchresult',

	id: 'searchResultContainer_J002',
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
					text: '정수장코드',
					dataIndex: 'FCLTS_NO',
					width: 120
				},{
					text: '정수장명',
					dataIndex: 'FCLTY_NM',
					width: 120
				},{
					text: '정수장위치',
					dataIndex: 'ADRES_DETAIL',
					width: 250
				},{
					text: '수원',
					dataIndex: 'WATSRC_CODE',
					width: 120
				},{
					text: '정수처리방식',
					dataIndex: 'WTM_PROCESS_MTH',
					width: 120
				},{
					text: '전화번호',
					dataIndex: 'TELNO',
					width: 120
				},{
					text: '준공연도',
					dataIndex: 'COMPET_DE',
					width: 120
				},{
					text: '광역구분',
					dataIndex: 'WDR_LCLTY_SE_CODE',
					width: 120
				},{
					text: '소독제',
					dataIndex: 'DISCHA_KND',
					width: 120
				},{
					text: '시설용량(m³/일)',
					dataIndex: 'FCLTY_CPCTY',
					width: 120
				},{
					text: '사용여부',
					dataIndex: 'USE_AT',
					width: 120
				}]
			}]
		}];

		this.callParent();
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
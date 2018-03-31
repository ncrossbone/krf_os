Ext.define('krf_new.view.south.SearchResultGrid_H', {

	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',

	xtype: 'south-grid-searchresult',

	id: 'searchResultContainer_H',

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
				layerId: 'H',
				plugins: ['bufferedrenderer', 'gridfilters'],
				cls: 'khLee-x-column-header-text',
				height: 215,
				loadMask: true,
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
					text: '지점',
					dataIndex: 'SPOT_CODE',
					hidden: true,
					hideable: false, // filter Columns영역에 보이지 않기
					width: 0
				}, {
					text: '예측기준일',
					dataIndex: 'DE',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '예측일시',
					dataIndex: 'PREDICT_DT',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: 'BOD (㎎/L)',
					dataIndex: 'BOD',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '클로로필a (㎎/㎥)',
					dataIndex: 'CHLA',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: 'DO (㎎/L)',
					dataIndex: 'DOC',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '유량 (㎥/s)',
					dataIndex: 'FLUX',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: '수온 (℃)',
					dataIndex: 'WTRTP',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }

				}, {
					text: 'NH₃-N (㎎/L)',
					dataIndex: 'NH3',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}, {
					text: 'NO₃-N (㎎/L)',
					dataIndex: 'NO3',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }

				}, {
					text: 'PO₄-P (㎎/L)',
					dataIndex: 'OP4',
					width: 110,
					filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
				}]
			}]
		}];
		this.callParent();

		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
Ext.define('krf_new.view.south.SearchResultGrid_K', {

	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',

	xtype: 'south-grid-searchresult',

	id: 'searchResultContainer_K',
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
				layerId: 'K',
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
					text: '측정일시',
					dataIndex: 'MESURE_DE',
					width: 120
				},{
					text: '배출구번호',
					dataIndex: 'DCWTRH_MANAGE_NO',
					width: 120
				},{
					text: '배출시설관리번호',
					dataIndex: 'EXHST_FCLTY_MANAGE_NO',
					width: 120
				},{
					text: '배출시설명',
					dataIndex: 'EXHST_FCLTY_NM',
					width: 120
				},{
					text: '측정방법',
					dataIndex: 'MESURE_MTH',
					width: 120
				},{
					text: '연료명',
					dataIndex: 'FUEL_NM',
					width: 120
				},{
					text: '사용량(ton/일)',
					dataIndex: 'FUEL_USGQTY',
					width: 120
				},{
					text: '원료명',
					dataIndex: 'MTRAL_NM',
					width: 120
				},{
					text: '사용량(ton/일)',
					dataIndex: 'MTRAL_USGQTY',
					width: 120
				},{
					text: '오염물질명',
					dataIndex: 'CNTMNNT_NM',
					width: 120
				},{
					text: '농도(mg/ℓ)',
					dataIndex: 'DNSTY',
					width: 120
				},{
					text: '특정수실유해물질유부',
					dataIndex: 'SSWTY_ENNC',
					width: 120
				},{
					text: '방류량(㎥/일)',
					dataIndex: 'DWEQTY',
					width: 120
				},{
					text: '허가배출기준',
					dataIndex: 'PRMISN_EXHST_STDR',
					width: 120
				}]
			}]
		}];

		this.callParent();
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
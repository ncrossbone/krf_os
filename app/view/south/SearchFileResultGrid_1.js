Ext.define('krf_new.view.south.SearchFileResultGrid_1', {

	extend: 'Ext.container.Container',

	xtype: 'south-grid-searchfileresult_1',

	id: 'searchFileResultContainer_1',
	height: '100%',
	width: '100%',

	gridId: null,

	initComponent: function () {
		this.items = [{
			xtype: 'container',
			id: 'grid-container_' + this.gridId + '_1',
			width: '100%',
			height: '100%',
			items: [{
				xtype: 'grid',
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
					text: '선택',
					dataIndex: ''
				},{
					text: '보 명칭',
					dataIndex: 'OBSNM'
				},{
					text: '자료 명칭',
					dataIndex: 'DTA_NM'
				},{
					text: '제목',
					dataIndex: 'DOC_SJ'
				},{
					text: '발행일',
					dataIndex: 'DOC_PBLICTE_DE'
				},{
					text: '발행기관',
					dataIndex: 'DOC_PBLICTE_INSTT_NM'
				}]
			}]
		}];
		this.callParent();
		// 검색조건 컨트롤 초기화

		//$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
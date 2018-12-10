Ext.define('krf_new.view.south.SearchFileResultGrid_2', {

	extend: 'Ext.container.Container',

	xtype: 'south-grid-searchfileresult_2',

	id: 'searchFileResultContainer_2',
	height: '100%',
	width: '100%',

	gridId: null,

	initComponent: function () {
		this.items = [{
			xtype: 'container',
			id: 'grid-container_' + this.gridId+"_2",
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
					xtype: 'checkcolumn',
					header: '선택',
					dataIndex: 'admin',
					listeners: {
						beforecheckchange: function() {
							return true;
						}
					},
					width: 60,
					editor: {
						xtype: 'checkbox',
						cls: 'x-grid-checkheader-editor',
						inputValue: true,
						uncheckedValue: false
					}
				},{
					text: '구분',
					dataIndex: 'SE',
					width: 120
				},{
					text: '수계',
					dataIndex: 'WRSSM_NM'
				},{
					text: '보 구간',
					dataIndex: 'OBSNM',
					width: 120
				},{
					text: '지점명',
					dataIndex: 'SPOT_NM',
					width: 120
				},{
					text: '촬영일시',
					dataIndex: 'POTOGRF_DE'
				},{
					text: '파일명',
					dataIndex: 'FILE_REAL_NM',
					width: 300
				}]
			}]
		}];
		this.callParent();
		// 검색조건 컨트롤 초기화

		//$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
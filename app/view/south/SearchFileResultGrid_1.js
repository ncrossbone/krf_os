Ext.define('krf_new.view.south.SearchFileResultGrid_1', {

	extend: 'Ext.container.Container',

	xtype: 'south-grid-searchfileresult_1',

	id: 'searchFileResultContainer_1',
	height: '100%',
	width: '100%',
	
	closable: true,
	closeText: '×',

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
					xtype: 'checkcolumn',
					header: '선택',
					dataIndex: 'admin',
					listeners: {
						beforecheckchange: function(a,b,c,d,e) {
							// 체크 되었는지 확인
							d.checked = c;
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
					text: '보 명칭',
					dataIndex: 'OBSNM'

				},{
					text: '자료 명칭',
					dataIndex: 'DTA_NM',
					width: 300
				},{
					text: '제목',
					dataIndex: 'DOC_SJ',
					width: 300
				},{
					text: '발행일',
					dataIndex: 'DOC_PBLICTE_DE'
				},{
					text: '발행기관',
					dataIndex: 'DOC_PBLICTE_INSTT_NM',
					width: 120
				}]
			}]
		}];
		this.callParent();
		// 검색조건 컨트롤 초기화

		//$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
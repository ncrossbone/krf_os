Ext.define('krf_new.view.south.SearchResultGrid_EsstgHgVtnSe', {

	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',

	xtype: 'south-grid-searchresult',

	id: 'searchResultContainer_E',
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
				layerId: 'E',
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
					text: '연도',
					dataIndex: 'EXAMIN_TME',
					width: 0
				}, {
					text: '회차',
					dataIndex: 'EXAMIN_YEAR',
					width: 90
				}, {
					text: '대권역',
					dataIndex: 'WRSSM_NM',
					width: 90
				}, {
					text: '중권역',
					dataIndex: 'AM_NM',
					width: 90
				}, {
					text: '지점코드',
					dataIndex: 'EXBF_CD',
					width: 90
				}, {
					text: '조사정보',
					columns: [{
						text: '위도',
						dataIndex: 'LA_CRDNT',
						width: 100
					},{
						text: '경도',
						dataIndex: 'LO_CRDNT',
						width: 100
					},{
						text: '조사일',
						dataIndex: 'EXAMIN_DE',
						width: 100
					},{
						text: '조사기관',
						dataIndex: 'EXMEN_NM',
						width: 100
					},{
						text: '조사자',
						dataIndex: 'EXMNR_NM',
						width: 100
					}]
				}, {
					text: '채집불가',
					columns: [{
						text: '특이사항',
						dataIndex: 'EXMIMP_PTCR_MATT',
						width: 100
					}]
				}, {
					text: '채집가능',
					columns: [{
						text: '특이사항',
						dataIndex: 'EXAMIN_PTCR_MATT',
						width: 100
					}]
				}, {
					text: '식생구분',
					columns: [{
						text: '면적',
						width: 100,
						columns: [{
							text: '습지',
							dataIndex: 'VTSEAR_MV',
							width: 100
						},{
							text: '육상',
							dataIndex: 'VTSEAR_LDPLMY',
							width: 100
						},{
							text: '외래',
							dataIndex: 'VTSEAR_FNPLMY',
							width: 100
						},{
							text: '인공구조물 및 나지',
							dataIndex: 'VTSEAR_AS',
							width: 100
						},{
							text: '수역 및 자연하상',
							dataIndex: 'VTSEAR_WATERS',
							width: 100
						},{
							text: '경작',
							dataIndex: 'VTSEAR_FMLND',
							width: 100
						},{
							text: '합',
							dataIndex: 'VTSEAR_SM',
							width: 100
						}]
					},{
						text: '면적(%)',
						width: 100,
						columns: [{
							text: '습지',
							dataIndex: 'VTSEAT_MV',
							width: 100
						},{
							text: '육상',
							dataIndex: 'VTSEAT_LDPLMY',
							width: 100
						},{
							text: '외래',
							dataIndex: 'VTSEAT_FNPLMY',
							width: 100
						},{
							text: '인공구조물 및 나지',
							dataIndex: 'VTSEAT_AS',
							width: 100
						},{
							text: '수역 및 자연하상',
							dataIndex: 'VTSEAT_WATERS',
							width: 100
						},{
							text: '경작',
							dataIndex: 'VTSEAT_FMLND',
							width: 100
						},{
							text: '합',
							dataIndex: 'VTSEAT_SM',
							width: 100
						}]
					}]
				},{
					text: '식생층위구분',
					columns: [{
						text: '우정종',
						width: 100,
						columns: [{
							text: '국명',
							dataIndex: 'VTALSE_DMCY_NM',
							width: 100
						},{
							text: '면적',
							dataIndex: 'VTALSE_DMCY_AR',
							width: 100
						}]
					}]
				},{
					text: 'HDV',
					dataIndex: 'VTNTEL_IDEX'
				},{
					text: '건강성등급',
					dataIndex: 'VTNTEL_GRAD'
				}]
			}]
		}];

		this.callParent();
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
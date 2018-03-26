Ext.define('krf_new.view.south.SearchResultGrid_EsstgHgFishSe', {

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
				},{
					text: '채집불가',
					columns: [{
						text: '특이사항',
						dataIndex: 'EXMIMP_PTCR_MATT',
						width: 100
					}]
				},{
					text: '채집가능',
					columns: [{
						text: '특이사항',
						dataIndex: 'EXAMIN_PTCR_MATT',
						width: 100
					}]
				},{
					text: '조사일반',
					columns: [{
						text: '채집소요시간',
						dataIndex: 'COLLT_CD',
						width: 100
					}]
				},{
					text: 'M1 다양도지수',
					dataIndex: 'M1_DIV_IDEX'
				},{
					text: 'M2 총종수',
					dataIndex: 'M2_TTERE_CO',
					width: 100
				},{
					text: 'M3 회유성이종수',
					dataIndex: 'M3_MFERE_CO',
					width: 100
				},{
					text: 'M4 기수종수',
					dataIndex: 'M4_HRERE_CO',
					width: 100
				},{
					text: 'M5 해산이류종수',
					dataIndex: 'M5_ALERE_CO',
					width: 100
				},{
					text: 'M6 내성상주종율',
					dataIndex: 'M6_TEERE_RT',
					width: 100
				},{
					text: 'M7 저서종률',
					dataIndex: 'M7_LTRERE_RATE',
					width: 100
				},{
					text: 'M8 비정상개체율',
					dataIndex: 'M8_ABMIND_RATE',
					width: 100
				},{
					text: 'M1 점수',
					dataIndex: 'M1_GRAD',
					width: 100
				},{
					text: 'M2 점수',
					dataIndex: 'M2_GRAD',
					width: 100
				},{
					text: 'M3 점수',
					dataIndex: 'M3_GRAD',
					width: 100
				},{
					text: 'M4 점수',
					dataIndex: 'M4_GRAD',
					width: 100
				},{
					text: 'M5 점수',
					dataIndex: 'M5_GRAD',
					width: 100
				},{
					text: 'M6 점수',
					dataIndex: 'M6_GRAD',
					width: 100
				},{
					text: 'M7 점수',
					dataIndex: 'M7_GRAD',
					width: 100
				},{
					text: 'M8 점수',
					dataIndex: 'M8_GRAD',
					width: 100
				},{
					text: 'BMI',
					dataIndex: 'IBI_IDEX',
					width: 100
				},{
					text: '건강성등급',
					dataIndex: 'IBI_GRAD',
					width: 100
				}]
			}]
		}];

		this.callParent();
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
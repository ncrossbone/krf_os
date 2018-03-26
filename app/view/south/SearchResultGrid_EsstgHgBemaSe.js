Ext.define('krf_new.view.south.SearchResultGrid_EsstgHgBemaSe', {

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
					text: '조사환경',
					columns: [{
						text: '기상조건',
						columns: [{
							text: '기온',
							dataIndex: 'WETHER_TMPRT',
							width: 100
						},{
							text: '수온',
							dataIndex: 'WETHER_WT',
							width: 100
						}]
					}]
				},{
					text: '조사방법',
					columns: [{
						text: 'Surber net(30*30)',
						dataIndex: 'SBN30_EXAMIN_CO',
						width: 100
					},{
						text: '드랫지',
						dataIndex: 'DR_EXAMIN_CO',
						width: 100
					},{
						text: '포나',
						dataIndex: 'POR20_EXAMIN_CO',
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
						dataIndex: 'EXMAT_PTCR_MATT',
						width: 100
					}]
				},{
					text: '출현종수',
					dataIndex: 'SPCS_CO'
				},{
					text: '개채말도',
					dataIndex: 'INDVD_DN'
				},{
					text: '민감종',
					columns: [{
						text: '종수',
						dataIndex: 'SENSP_CO',
						width: 100
					},{
						text: '종수비',
						dataIndex: 'SENSP_CO_RATE',
						width: 100
					},{
						text: '개체밀도',
						dataIndex: 'SNTIND_DN_RT',
						width: 100
					},{
						text: '개채밀도비',
						dataIndex: 'SNTIND_DN_RATE',
						width: 100
					}]
				},{
					text: '내종성',
					columns: [{
						text: '종수',
						dataIndex: 'TOESP_CO_RT',
						width: 100
					},{
						text: '종수비',
						dataIndex: 'TOESP_CO_RATE',
						width: 100
					},{
						text: '개체밀도',
						dataIndex: 'TOE_INDVD_DN',
						width: 100
					},{
						text: '개체밀도비',
						dataIndex: 'TOE_INDVD_DN_RATE',
						width: 100
					}]
				},{
					text: '민감종/내성종',
					columns: [{
						text: '내성종비',
						dataIndex: 'SNTOSP_CO_RATE',
						width: 100
					},{
						text: '개체밀도비',
						dataIndex: 'SNTOIN_DN_RATE',
						width: 100
					}]
				},{
					text: '기수종',
					columns: [{
						text: '종수',
						dataIndex: 'BKPKSP_CO',
						width: 100
					},{
						text: '종수비',
						dataIndex: 'BKPKSP_CO_RATE',
						width: 100
					},{
						text: '개체밀도',
						dataIndex: 'HRSMN_INDDN',
						width: 100
					},{
						text: '개체밀도비',
						dataIndex: 'HRSMN_INDDN_RATE',
						width: 100
					}]
				},{
					text: '군집지수',
					columns: [{
						text: '우정도',
						dataIndex: 'CLUSTER_DOM_IDEX',
						width: 100
					},{
						text: '다양도',
						dataIndex: 'CLUSTER_DIV_IDEX',
						width: 100
					},{
						text: '풍부도',
						dataIndex: 'CLUSTER_ABNDNC_IDEX',
						width: 100
					},{
						text: '균등도',
						dataIndex: 'CLUSTER_EQLTY_IDEX',
						width: 100
					}]
				},{
					text: 'M1 종루',
					dataIndex: 'M1_SPCS_CO'
				},{
					text: 'M2 개체밀도',
					dataIndex: 'M2_INDVD_DN'
				},{
					text: 'M3 민감종수',
					dataIndex: 'M3_SENSP_CO'
				},{
					text: 'M4 민감종말도',
					dataIndex: 'M4_SENSP_DN'
				},{
					text: 'M5 기수종수',
					dataIndex: 'M5_BKPKSP_CO'
				},{
					text: 'M6 기수종밀도',
					dataIndex: 'M6_BKPKSP_DN'
				},{
					text: 'M7 다양도지수',
					dataIndex: 'M7_DIV_IDEX'
				},{
					text: 'KEBI',
					dataIndex: 'KEBI_TOTAL'
				},{
					text: '건강성등급',
					dataIndex: 'KEBI_GRAD'
				}]
			}]
		}];

		this.callParent();
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
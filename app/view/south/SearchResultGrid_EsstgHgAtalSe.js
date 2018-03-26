Ext.define('krf_new.view.south.SearchResultGrid_EsstgHgAtalSe', {

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
					dataIndex: 'YEAR',
					width: 0
				}, {
					text: '회차',
					dataIndex: 'TME',
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
					text: '하천현황',
					columns: [{
						text: '하천명',
						dataIndex: 'RIVST_CD',
						width: 100
					}]
				},{
					text: '서식지',
					columns: [{
						text: '서식지 조건',
						columns: [{
							text: '모래',
							dataIndex: 'HBTT_SAND_RT'
						},{
							text: '자살',
							dataIndex: 'HBTT_PEBB_RT'
						},{
							text: '기반암',
							dataIndex: 'HBTT_ROCK_RT'
						},{
							text: '작은나무조각',
							dataIndex: 'HBTT_LP_RT'
						},{
							text: '큰나무조각',
							dataIndex: 'HBTT_BP_RT'
						},{
							text: '식물뿌리 등',
							dataIndex: 'HBTT_ROOT_RT'
						}]
					},{
						text: '흐름상태',
						columns: [{
							text: '여울',
							dataIndex: 'FLOW_RAPIDS_RT'
						},{
							text: '흐름',
							dataIndex: 'FLOW_FLOW_RT'
						},{
							text: '소',
							dataIndex: 'FLOW_SMALL_RT'
						}]
					},{
						text: '서식조건 기타',
						columns: [{
							text: 'CANOPY',
							dataIndex: 'HBTT_CANOPY_RT'
						},{
							text: '수변식생피복',
							dataIndex: 'HBTT_VECV_RT'
						}]
					}]
				},{
					text: '시료채집',
					columns: [{
						text: '채집도구',
						dataIndex: 'SPLORE_COLLT_CD'
					},{
						text: '채집방법',
						dataIndex: 'SPLORE_COLLM_CD'
					},{
						text: '샘플 채집수 구성',
						columns: [{
							text: '모래',
							dataIndex: 'SMPLE_SAND_RT'
						},{
							text: '자갈',
							dataIndex: 'SMPLE_PEBB_RT'
						},{
							text: '기반암',
							dataIndex: 'SMPLE_ROCK_RT'
						},{
							text: '작은나무조각',
							dataIndex: 'SMPLE_LP_RT'
						},{
							text: '큰나무조각',
							dataIndex: 'SMPLE_BP_RT'
						},{
							text: '식물뿌리',
							dataIndex: 'SMPLE_ROOT_RT'
						}]
					}]
				},{
					text: '수변 및 하천 환경',
					columns: [{
						text: '물빛',
						dataIndex: 'DCOL_CD'
					},{
						text: '냄새',
						dataIndex: 'SMELL_CD'
					},{
						text: '수변환경',
						columns: [{
							text: '초본',
							dataIndex: 'SHVE_ABSTRCT_RT'
						},{
							text: '관목',
							dataIndex: 'SHVE_SRB_RT'
						}]
					},{
						text: '토지이용',
						columns: [{
							text: '도시',
							dataIndex: 'LAD_CTY_RT'
						},{
							text: '숲',
							dataIndex: 'LAD_FRT_RT'
						},{
							text: '농경지',
							dataIndex: 'LAD_FRLND_RT'
						},{
							text: '공단',
							dataIndex: 'LAD_PBLCRP_RT'
						},{
							text: '준설',
							dataIndex: 'LAD_DC_RT'
						},{
							text: '축사',
							dataIndex: 'LAD_STALL_RT'
						}]
					},{
						text: '모래퇴적',
						columns: [{
							text: '침식',
							dataIndex: 'SAND_WASH_RT_CD'
						}]
					},{
						text: '보의 위치 및 영향',
						columns: [{
							text: '위치 구분',
							dataIndex: 'BR_SE_CD'
						},{
							text: '거리',
							dataIndex: 'BR_DSTNC'
						},{
							text: '수질영향',
							dataIndex: 'BR_QLTWTR_AFFC_YN'
						}]
					}]
				},{
					text: '환경요인',
					columns: [{
						text: '하폭',
						dataIndex: 'ENVRN_BTRV'
					},{
						text: '수심',
						dataIndex: 'ENVRN_DPWT'
					},{
						text: '수온',
						dataIndex: 'ENVRN_WT'
					},{
						text: 'DO',
						dataIndex: 'ENVRN_DO'
					},{
						text: 'pH',
						dataIndex: 'ENVRN_PH'
					},{
						text: '전기전도도',
						dataIndex: 'ENVRN_CONDT'
					},{
						text: '탁도',
						dataIndex: 'ENVRN_NTU'
					},{
						text: '염도',
						dataIndex: 'ENVRN_SALT_DO_RT'
					},{
						text: 'COD',
						dataIndex: 'ENVRN_CHOXDM'
					},{
						text: 'TN',
						dataIndex: 'ENVRN_TN'
					},{
						text: 'TP',
						dataIndex: 'ENVRN_TP'
					}]
				},{
					text: '채집불가',
					columns: [{
						text: '특이사항',
						dataIndex: 'NTIPS_PTCR_MATT'
					},{
						text: '세부내용',
						dataIndex: 'NTIPS_DETAIL_CN'
					}]
				},{
					text: '채집가능',
					columns: [{
						text: '특이사항',
						dataIndex: 'NOTI_POSS_PTCR_MATT'
					}]
				},{
					text: '생물량',
					columns: [{
						text: '얼룩소',
						dataIndex: 'LBDY_QY_CHLA'
					},{
						text: '유기물',
						dataIndex: 'LBDY_QY_AFDM'
					}]
				},{
					text: '출현종 수',
					dataIndex: 'TOT_INDVD_CO'
				},{
					text: '영양염오염지수',
					dataIndex: 'TDI_LVB_IDEX'
				},{
					text: '건강성등급',
					dataIndex: 'TDI_GRAD'
				}]
			}]
		}];

		this.callParent();
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});
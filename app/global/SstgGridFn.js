Ext.define("krf_new.global.SstgGridFn", {
    singleton: true, // 요게 있어야 set, get 메서드 사용가능..


    // -하천
    // EsstgHcAtalSe : 부착돌말류
    // EsstgHcBemaSe : 저서성대형무척추
    // EsstgHcBemaSe
    // EsstgHcFishSe : 어류
    // EsstgHcInhaSe : 서식 및 수변환경
    // EsstgHcQltwtrSe : 수질
    // EsstgHcVtnSe : 수변식생

    // -하구
    // EsstgHgAtalSe : 부착돌말류
    // EsstgHgBemaSe : 저서성대형무척추
    // EsstgHgFishSe : 어류
    // EsstgHgVtnSe : 식생



    getEsstgHcAtalSe: function(val){
        var grid = null;
        if(val == 1){
            grid = [{
                text: '연도',
                dataIndex: 'YEAR',
                width: 90
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
                dataIndex: 'MDT_NM',
                width: 90
            }, {
                text: '지점코드',
                dataIndex: 'SPOT_CODE',
                width: 90
            }, {
                text: '지점명',
                dataIndex: 'SPOT_NM',
                width: 90
            }, {
                text: '조사정보',
                columns: [{
                    text: '위도',
                    dataIndex: 'LA',
                    width: 100
                },{
                    text: '경도',
                    dataIndex: 'LO',
                    width: 100
                },{
                    text: '조사일',
                    dataIndex: 'DE',
                    width: 100
                },{
                    text: '날씨',
                    dataIndex: 'WETHR_SE',
                    width: 100
                },{
                    text: '조사기관',
                    dataIndex: 'EXAMIN_INSTT_NM',
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
                    dataIndex: 'RIVER_STLE_SE',
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
                        dataIndex: 'HBTT_RAP_RT'
                    },{
                        text: '흐름',
                        dataIndex: 'HBTT_FLOW_RT'
                    },{
                        text: '소',
                        dataIndex: 'HBTT_POND_RT'
                    }]
                },{
                    text: '서식조건 기타',
                    columns: [{
                        text: 'CANOPY',
                        dataIndex: 'HBTT_CNPY_RT'
                    },{
                        text: '수변식생피복',
                        dataIndex: 'HBTT_HBTT_VEGCOV_RTVECV_RT'
                    }]
                }]
            },{
                text: '시료채집',
                columns: [{
                    text: '채집도구',
                    dataIndex: 'SMPLE_COLCT_UNT'
                },{
                    text: '채집방법',
                    dataIndex: 'SMPLE_COLCT_MTH'
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
                    dataIndex: 'RE_DCOL_SE'
                },{
                    text: '냄새',
                    dataIndex: 'RE_SMELL_SE'
                },{
                    text: '수변환경',
                    columns: [{
                        text: '초본',
                        dataIndex: 'RE_HRB_RT'
                    },{
                        text: '관목',
                        dataIndex: 'RE_SRB_RT'
                    }]
                },{
                    text: '토지이용',
                    columns: [{
                        text: '도시',
                        dataIndex: 'RE_CTY_RT'
                    },{
                        text: '숲',
                        dataIndex: 'RE_FRT_RT'
                    },{
                        text: '농경지',
                        dataIndex: 'RE_FRLND_RT'
                    },{
                        text: '공단',
                        dataIndex: 'RE_ISRLPX_RT'
                    },{
                        text: '준설',
                        dataIndex: 'RE_DRDG_RT'
                    },{
                        text: '축사',
                        dataIndex: 'RE_STALL_RT'
                    }]
                },{
                    text: '모래퇴적',
                    columns: [{
                        text: '침식',
                        dataIndex: 'RE_WASH_SE'
                    }]
                },{
                    text: '보의 위치 및 영향',
                    columns: [{
                        text: '위치 구분',
                        dataIndex: 'BRRER_LC_SE'
                    },{
                        text: '거리',
                        dataIndex: 'BRRER_GAP_DSTNC'
                    },{
                        text: '수질영향',
                        dataIndex: 'BRRER_AFWQ_SE'
                    }]
                }]
            },{
                text: '환경요인',
                columns: [{
                    text: '하폭',
                    dataIndex: 'ENVFTR_BTRV'
                },{
                    text: '수심',
                    dataIndex: 'ENVFTR_DPWT'
                },{
                    text: '수온',
                    dataIndex: 'ENVFTR_WTRTP'
                },{
                    text: 'DO',
                    dataIndex: 'ENVFTR_DOC'
                },{
                    text: 'pH',
                    dataIndex: 'ENVFTR_PH'
                },{
                    text: '전기전도도',
                    dataIndex: 'ENVFTR_EC'
                },{
                    text: '탁도',
                    dataIndex: 'ENVFTR_TUR'
                }]
            },{
                text: '채집불가',
                columns: [{
                    text: '특이사항',
                    dataIndex: 'CLIMP_PARTCLR_MATTER'
                },{
                    text: '세부내용',
                    dataIndex: 'CLIMP_DETAIL_CN'
                }]
            },{
                text: '채집가능',
                columns: [{
                    text: '특이사항',
                    dataIndex: 'CLPSS_PARTCLR_MATTER'
                }]
            },{
                text: '생물량',
                columns: [{
                    text: '얼룩소',
                    dataIndex: 'CHLA_QY'
                },{
                    text: '유기물',
                    dataIndex: 'AFDM_QY'
                }]
            },{
                text: '출현종 수',
                dataIndex: 'TOT_CELL_DN'
            },{
                text: '지표종',
                columns:[{
                    text: '호정수성종',
                    columns:[{
                        text: '종수',
                        dataIndex: 'KSP_CO'
                    },{
                        text: '종수비',
                        dataIndex: ''
                    },{
                        text: '세포밀도',
                        dataIndex: ''
                    },{
                        text: '상대밀도',
                        dataIndex: ''
                    }]
                }]
            },{
                text: '풍부도',
                dataIndex: 'RIC_IDEX'
            },{
                text: '법정보호종',
                dataIndex: 'LPRSP_CN'
            },{
                text: '외래종',
                dataIndex: 'EXO_CN'
            },{
                text: '영양염오염지수',
                dataIndex: 'TDI'
            },{
                text: '건강성등급',
                dataIndex: 'HEALTH_GRAD'
            }];
        }else{
            grid = [{
                text: '연도',
                dataIndex: 'YEAR'
            },{
                text: '회차',
                dataIndex: 'TME'
            },{
                text: '지점코드',
                dataIndex: 'SPOT_CODE'
            },{
                text: '지점명',
                dataIndex: 'SPOT_NM'
            },{
                text: '학명',
                dataIndex: 'SCNCENM'
            },{
                text: '국명',
                dataIndex: 'KORNM'
            },{
                text: '개체수',
                dataIndex: 'CELL_CO'
            }]
        }
        

        return grid;
    },

    getEsstgHcBemaSe: function(val){
        var grid = null;
        if(val == 1){
            grid = [{
                text: '연도',
                dataIndex: 'YEAR',
                width: 90
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
                dataIndex: 'MDT_NM',
                width: 90
            }, {
                text: '지점코드',
                dataIndex: 'SPOT_CODE',
                width: 90
            }, {
                text: '지점명',
                dataIndex: 'SPOT_NM',
                width: 90
            }, {
                text: '조사정보',
                columns: [{
                    text: '위도',
                    dataIndex: 'LA',
                    width: 100
                },{
                    text: '경도',
                    dataIndex: 'LO',
                    width: 100
                },{
                    text: '조사일',
                    dataIndex: 'DE',
                    width: 100
                },{
                    text: '날씨',
                    dataIndex: 'WETHR_SE',
                    width: 100
                },{
                    text: '조사기관',
                    dataIndex: 'EXAMIN_INSTT_NM',
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
                        dataIndex: 'TMPRT',
                        width: 100
                    },{
                        text: '수온',
                        dataIndex: 'WTRTP',
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
                    text: 'Surber net(50*50)',
                    dataIndex: 'SBN50_EXAMIN_CO',
                    width: 100
                },{
                    text: '드렛지',
                    dataIndex: 'DR_EXAMIN_CO',
                    width: 100
                },{
                    text: '에크만',
                    dataIndex: 'EK_EXAMIN_CO',
                    width: 100
                }]
            },{
                text: '유역환경',
                columns:[{
                    text: '유역이용',
                    columns:[{
                        text: '산림',
                        dataIndex: 'DRGUSE_MTST_AT'
                    },{
                        text: '목초지',
                        dataIndex: 'DRGUSE_FORAGE_AT'
                    },{
                        text: '마을',
                        dataIndex: 'DRGUSE_VILAGE_AT'
                    },{
                        text: '상가, 음식점',
                        dataIndex: 'DRGUSE_SOPSRT_AT'
                    },{
                        text: '농경지',
                        dataIndex: 'DRGUSE_FRLND_AT'
                    },{
                        text: '공장',
                        dataIndex: 'DRGUSE_FCTRY_AT'
                    },{
                        text: '주거',
                        dataIndex: 'DRGUSE_RESIDE_AT'
                    },{
                        text: '기타',
                        dataIndex: 'DRGUSE_ETC_AT'
                    },{
                        text: '기타내용',
                        dataIndex: 'DRGUSE_ETC_CN'
                    }]
                },{
                    text: '오염원',
                    columns:[{
                        text: '생활하수',
                        dataIndex: 'POLTNSRC_LVSEWG_AT'
                    },{
                        text: '축산폐수',
                        dataIndex: 'POLTNSRC_LSKR_AT'
                    },{
                        text: '산업폐수',
                        dataIndex: 'POLTNSRC_WSTR_AT'
                    },{
                        text: '기타',
                        dataIndex: 'POLTNSRC_ETC_AT'
                    },{
                        text: '기타내용',
                        dataIndex: 'POLTNSRC_ETC_CN'
                    }]
                }]
            },{
                text: '수변환경',
                columns:[{
                    text:'식생',
                    columns:[{
                        text: '교목',
                        dataIndex: 'RE_VTN_TRE_RT'
                    },{
                        text: '관목',
                        dataIndex: 'RE_VTN_SRB_RT'
                    },{
                        text: '식생',
                        dataIndex: 'RE_VTN_HRB_RT'
                    }]
                },{
                    text: '수피도',
                    dataIndex: 'RE_CNPY_SE'
                },{
                    text: '범량원의이용',
                    dataIndex: 'RE_FLD_USE_SE'
                },{
                    text: '제방(좌안)',
                    columns:[{
                        text: '자연',
                        dataIndex: 'RE_LFTBNK_NATURE_AT'
                    },{
                        text:'석축',
                        dataIndex: 'RE_LFTBNK_STON_AT'
                    },{
                        text:'돌망태',
                        dataIndex: 'RE_LFTBNK_GABN_AT'
                    },{
                        text:'콘트리트',
                        dataIndex: 'RE_LFTBNK_CNCRT_AT'
                    },{
                        text:'수직',
                        dataIndex: 'RE_LFTBNK_VERTCL_AT'
                    },{
                        text:'자연형',
                        dataIndex: 'RE_RHTBNK_NATURE_AT'
                    }]
                },{
                    text: '제방(우안)',
                    columns:[{
                        text: '석축',
                        dataIndex: 'RE_RHTBNK_STON_AT'
                    },{
                        text:'돌망태',
                        dataIndex: 'RE_RHTBNK_GABN_AT'
                    },{
                        text:'콘트리트',
                        dataIndex: 'RE_RHTBNK_CNCRT_AT'
                    },{
                        text:'수직',
                        dataIndex: 'RE_RHTBNK_VERTCL_AT'
                    }]
                }]
            },{
                text: '하상구조',
                columns:[{
                    text: '진흙',
                    dataIndex: 'STR_MD_RT'
                },{
                    text: '모래',
                    dataIndex: 'STR_SAND_RT'
                },{
                    text: '잔자갈',
                    dataIndex: 'STR_SBAL_RT'
                },{
                    text: '자갈',
                    dataIndex: 'STR_PEBB_RT'
                },{
                    text: '작은돌',
                    dataIndex: 'STR_SS_RT'
                },{
                    text: '큰돌',
                    dataIndex: 'STR_LS_RT'
                }]
            },{
                text: '하천현황',
                columns:[{
                    text: '하천유형',
                    dataIndex: 'RIVER_TY_SE'
                },{
                    text: '수리수문',
                    columns:[{
                        text: '하폭',
                        dataIndex: 'BTRV'
                    },{
                        text: '수폭',
                        dataIndex: 'WTRBT'
                    },{
                        text: '평균수심',
                        dataIndex: 'AVRG_DPWT'
                    },{
                        text: '평균유속',
                        dataIndex: 'AVRG_SPFLD'
                    }]
                },{
                    text: '지형',
                    columns:[{
                        text: '여울',
                        dataIndex: 'RIVER_RAP_RT'
                    },{
                        text: '흐름역',
                        dataIndex: 'RIVER_FLOW_RT'
                    },{
                        text: '소',
                        dataIndex: 'RIVER_POND_RT'
                    }]
                },{
                    text: '기타',
                    columns:[{
                        text: '투명도',
                        dataIndex: 'TRNSPRC_SE'
                    }]
                }]
            },{
                text: '채집불가',
                columns:[{
                    text: '특이사항',
                    dataIndex: 'CLIMP_PARTCLR_MATTER'
                }]
            },{
                text: '우점종 및 점유율',
                columns:[{
                    text: '학명',
                    dataIndex: 'DKPAR_SCNCENM'
                },{
                    text: '점유율',
                    dataIndex: 'DKPAR_POSSESN_RT'
                },{
                    text: '개체수',
                    dataIndex: 'DKPAR_INDVD_CO'
                }]
            },{
                text: '다양도',
                dataIndex: 'DIV_IDEX'
            },{
                text: '종풍부도',
                dataIndex: 'RIC_IDEX'
            },{
                text: '균등도',
                dataIndex: 'EVN_IDEX'
            },{
                text: '지표종',
                columns: [{
                    text: 'EPT',
                    columns: [{
                        text: '출현종수',
                        dataIndex: 'EPT_SPCS_CO'
                    },{
                        text: '출현종수비',
                        dataIndex: 'EPT_SPCS_RT'
                    },{
                        text: '출현개체밀도',
                        dataIndex: 'EPT_INDVD_CO'
                    },{
                        text: '출현개체밀도비율',
                        dataIndex: 'EPT_INDVD_RT'
                    }]
                }]
            },{
                text: 'BMI',
                dataIndex: 'BMI'
            },{
                text: '건강성등급',
                dataIndex: 'HEALTH_GRAD'
            }]
        }else{
            grid = [{
                text: '연도',
                dataIndex: 'YEAR'
            },{
                text: '회차',
                dataIndex: 'TME'
            },{
                text: '지점코드',
                dataIndex: 'SPOT_CODE'
            },{
                text: '지점명',
                dataIndex: 'SPOT_NM'
            },{
                text: '학명',
                dataIndex: 'SCNCENM'
            },{
                text: '국명',
                dataIndex: 'KORNM'
            },{
                text: '개체수',
                dataIndex: 'INDVD_CO'
            }]
        }
        return grid;
    },

    getEsstgHcFishSe: function(val){
        var grid = null;
        if(val  == 1){
            grid = [{
                text: '연도',
                dataIndex: 'YEAR',
                width: 90
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
                dataIndex: 'MDT_NM',
                width: 90
            }, {
                text: '지점코드',
                dataIndex: 'SPOT_CODE',
                width: 90
            }, {
                text: '지점명',
                dataIndex: 'SPOT_NM',
                width: 90
            }, {
                text: '조사정보',
                columns: [{
                    text: '위도',
                    dataIndex: 'LA',
                    width: 100
                },{
                    text: '경도',
                    dataIndex: 'LO',
                    width: 100
                },{
                    text: '조사일',
                    dataIndex: 'DE',
                    width: 100
                },{
                    text: '날씨',
                    dataIndex: 'WETHR_SE',
                    width: 100
                },{
                    text: '조사기관',
                    dataIndex: 'EXAMIN_INSTT_NM',
                    width: 100
                },{
                    text: '조사자',
                    dataIndex: 'EXMNR_NM',
                    width: 100
                }]
            },{
                text: '조사일반',
                columns:[{
                    text: '하천차수',
                    dataIndex: 'RIVER_ODR',
                },{
                    text: '채집소요시간',
                    dataIndex: 'COLCT_REQRE_TIME',
                }]
            },{
                text: '채집방법',
                columns:[{
                    text: '채집도구',
                    dataIndex: 'COLCT_UNT_SE',
                },{
                    text: '흐름상태',
                    dataIndex: 'FLOW_STTUS_SE',
                }]
            },{
                text: '하상구조',
                columns:[{
                    text: '암반',
                    dataIndex: 'STR_ROCK_RT',
                },{
                    text: '콘크리트',
                    dataIndex: 'STR_CNCRT_RT',
                },{
                    text: '진흙',
                    dataIndex: 'STR_MD_RT',
                },{
                    text: '모래',
                    dataIndex: 'STR_SAND_RT',
                },{
                    text: '전자갈',
                    dataIndex: 'STR_SBAL_RT',
                },{
                    text: '자갈',
                    dataIndex: 'STR_PEBB_RT',
                },{
                    text: '작은돌',
                    dataIndex: 'STR_SS_RT',
                },{
                    text: '큰돌',
                    dataIndex: 'STR_LS_RT',
                }]
            },{
                text: '하천형태',
                columns:[{
                    text: '형태특성',
                    dataIndex: 'RIVER_STLE_SE',
                },{
                    text: '흐름상태',
                    dataIndex: 'FLOW_VE_SE',
                }]
            },{
                text: '채집불가',
                columns:[{
                    text: '특이사항',
                    dataIndex: 'CLIMP_PARTCLR_MATTER',
                },{
                    text: '세부내용',
                    dataIndex: 'CLIMP_DETAIL_CN',
                }]
            },{
                text: '채집가능',
                columns:[{
                    text: '특이사항',
                    dataIndex: 'CLPSS_PARTCLR_MATTER',
                }]
            },{
                text: '비정상',
                columns:[{
                    text: '개체수',
                    dataIndex: 'ABNRM_INDVD_CO',
                },{
                    text: '개체수비',
                    dataIndex: 'ABNRM_INDVD_RT',
                }]
            },{
                text: '통합평가',
                columns:[{
                    text: 'M1 (국내종의 총 종수)',
                    dataIndex: 'UNEVL_M1_PT',
                },{
                    text: 'M2 (여울성 저서종수)',
                    dataIndex: 'UNEVL_M2_PT',
                },{
                    text: 'M3 (민감종수)',
                    dataIndex: 'UNEVL_M3_PT',
                },{
                    text: 'M4 (내성종의 개체수 비율)',
                    dataIndex: 'UNEVL_M4_PT',
                },{
                    text: 'M5 (잡식종의 개체수 비율)',
                    dataIndex: 'UNEVL_M5_PT',
                },{
                    text: 'M6 (국내종의 충식종 개체수 비율)',
                    dataIndex: 'UNEVL_M6_PT',
                },{
                    text: 'M7 (채집된 국내종의 총 개체수)',
                    dataIndex: 'UNEVL_M7_PT',
                },{
                    text: 'M8 (비정상종의 개체수 비율)',
                    dataIndex: 'UNEVL_M8_PT',
                }]
            },{
                text: 'FAI',
                dataIndex: 'FAI',
            },{
                text: '건강성등급',
                dataIndex: 'HEALTH_GRAD',
            },{
                text: '총종수',
                dataIndex: 'TOT_SPCS_CO',
            },{
                text: '총개체수',
                dataIndex: 'TOT_INDVD_CO',
            },{
                text: '지표종',
                columns:[{
                    text: '민감종',
                    columns:[{
                        text: '출현종수',
                        dataIndex: 'SSP_CO'
                    },{
                        text: '출현종수비',
                        dataIndex: 'SSP_RT'
                    },{
                        text: '개체수',
                        dataIndex: 'SSP_INDVD_CO'
                    },{
                        text: '개체수비',
                        dataIndex: 'SSP_INDVD_RT'
                    }]	
                },{
                    text: '내성종',
                    columns:[{
                        text: '출현종수',
                        dataIndex: 'TSP_CO'
                    },{
                        text: '출현종수비',
                        dataIndex: 'TSP_RT'
                    },{
                        text: '개체수',
                        dataIndex: 'TSP_INDVD_CO'
                    },{
                        text: '개체수비',
                        dataIndex: 'TSP_INDVD_RT'
                    }]	
                }]
            },{
                text: '풍부도',
                dataIndex: 'RIC_IDEX'
            },{
                text: '우점종',
                columns:[{
                    text: '국명',
                    dataIndex: 'DKPAR_KORNM'
                },{
                    text: '개체수',
                    dataIndex: 'DKPAR_INDVD_CO'
                },{
                    text: '점유율',
                    dataIndex: 'DKPAR_POSSESN_RT'
                }]	
            },{
                text: '국내종',
                columns:[{
                    text: '개체수비',
                    dataIndex: 'DSP_INDVD_RT'
                }]	
            },{
                text: '여울성저서종',
                columns:[{
                    text: '개체수비',
                    dataIndex: 'RSP_INDVD_RT'
                }]	
            },{
                text: '잡식성종',
                columns:[{
                    text: '개체수비',
                    dataIndex: 'PSP_INDVD_RT'
                }]	
            },{
                text: '비정상종',
                columns:[{
                    text: '개체수비',
                    dataIndex: 'ASP_INDVD_RT'
                }]	
            }]
        }else{
            grid = [{
                text: '연도',
                dataIndex: 'YEAR'
            },{
                text: '회차',
                dataIndex: 'TME'
            },{
                text: '지점코드',
                dataIndex: 'SPOT_CODE'
            },{
                text: '지점명',
                dataIndex: 'SPOT_NM'
            },{
                text: '학명',
                dataIndex: 'SCNCENM'
            },{
                text: '국명',
                dataIndex: 'KORNM'
            },{
                text: '개체수',
                dataIndex: 'INDVD_CO'
            },{
                text: '외래종 여부',
                dataIndex: 'EXO_AT'
            },{
                text: '고유종 여부',
                dataIndex: 'END_AT'
            },{
                text: '멸종위기야생동물 I급 여부',
                dataIndex: 'ENSPC_1CLS_AT'
            },{
                text: '멸종위기야생동물 II급 여부',
                dataIndex: 'ENSPC_2CLS_AT'
            },{
                text: '천연기념물 여부',
                dataIndex: 'NTRMN_AT'
            }]
        }
        return grid;
    },

    getEsstgHcInhaSe: function(val){
        var grid = null;
        if(val == 1){
            grid =[{
                text: '연도',
                dataIndex: 'YEAR',
                width: 90
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
                dataIndex: 'MDT_NM',
                width: 90
            }, {
                text: '지점코드',
                dataIndex: 'SPOT_CODE',
                width: 90
            }, {
                text: '지점명',
                dataIndex: 'SPOT_NM',
                width: 90
            }, {
                text: '조사정보',
                columns: [{
                    text: '위도',
                    dataIndex: 'LA',
                    width: 100
                },{
                    text: '경도',
                    dataIndex: 'LO',
                    width: 100
                },{
                    text: '조사일',
                    dataIndex: 'DE',
                    width: 100
                },{
                    text: '날씨',
                    dataIndex: 'WETHR_SE',
                    width: 100
                },{
                    text: '조사기관',
                    dataIndex: 'EXAMIN_INSTT_NM',
                    width: 100
                },{
                    text: '조사자',
                    dataIndex: 'EXMNR_NM',
                    width: 100
                }]
            },{
                text: '조사일반',
                columns: [{
                    text: '하천등급',
                    dataIndex: 'RIVER_GRAD',
                    width: 100
                },{
                    text: '고도',
                    dataIndex: 'ALTTD',
                    width: 100
                },{
                    text: '배후습지',
                    dataIndex: 'RRSMLD_SE',
                    width: 100
                }]
            },{
                text: '채집불가',
                columns: [{
                    text: '특이사항',
                    dataIndex: 'EXIMP_PARTCLR_MATTER',
                    width: 100
                },{
                    text: '세부내용',
                    dataIndex: 'EXIMP_DETAIL_CN',
                    width: 100
                }]
            },{
                text: '채집가능',
                columns: [{
                    text: '특이사항',
                    dataIndex: 'EXPSS_PARTCLR_MATTER',
                    width: 100
                }]
            },{
                text: '자연적 종횡사주',
                dataIndex: 'LBSB_CO_EVL',
                width: 100
            },{
                text: '하도 정비 및 하도특성의 자연성 정도',
                dataIndex: 'NTRLTY_DGREE_EVL',
                width: 100
            },{
                text: '유속 다양성',
                dataIndex: 'SPFLD_DVRSTY_EVL',
                width: 100
            },{
                text: '하천변 폭',
                dataIndex: 'RVS_BT_EVL',
                width: 100
            },{
                text: '저수로 하안공',
                dataIndex: 'RSV_ARV_EVL',
                width: 100
            },{
                text: '제방하안 재료',
                dataIndex: 'ARV_MATRL_EVL',
                width: 100
            },{
                text: '저질 상태',
                dataIndex: 'SEDM_STTUS_EVL',
                width: 100
            },{
                text: '횡구조물',
                dataIndex: 'WDSTRCTU_DSTRBNC_EVL',
                width: 100
            },{
                text: '제외지 토지 이용',
                dataIndex: 'FRCE_LANDUSE_EVL',
                width: 100
            },{	
                text: '제내지 토지 이용',
                dataIndex: 'PRLL_LANDUSE_EVL',
                width: 100
            },{
                text: 'HRI',
                dataIndex: 'HRI',
                width: 100
            },{
                text: '건강성 등급',
                dataIndex: 'HEALTH_GRAD',
                width: 100
            }];
        }
        return grid;
    },

    getEsstgHcQltwtrSe: function(val){
        var grid = null;
        if(val == 1){
            grid = [{
                text: '연도',
                dataIndex: 'YEAR',
                width: 90
            }, {
                text: '회차',
                dataIndex: 'TME',
                width: 90
            }, {
                text: '지점코드',
                dataIndex: 'SPOT_CODE',
                width: 90
            }, {
                text: '지점명',
                dataIndex: 'SPOT_NM',
                width: 90
            }, {
                text: '수온',
                dataIndex: 'WTRTP',
                width: 90
            }, {
                text: 'DO',
                dataIndex: 'DOC',
                width: 90
            }, {
                text: 'pH',
                dataIndex: 'PH',
                width: 90
            }, {
                text: 'Conductivity',
                dataIndex: 'EC',
                width: 90
            }, {
                text: 'Turbidity',
                dataIndex: 'TUR',
                width: 90
            }, {
                text: 'BOD',
                dataIndex: 'BOD',
                width: 90
            }, {
                text: 'NH3-N',
                dataIndex: 'NH3N',
                width: 90
            }, {
                text: 'NO3-N',
                dataIndex: 'NO3N',
                width: 90
            }, {
                text: 'T-N',
                dataIndex: 'TN',
                width: 90
            }, {
                text: 'PO4-P',
                dataIndex: 'PO4P',
                width: 90
            }, {
                text: 'T-P',
                dataIndex: 'TP',
                width: 90
            }, {
                text: 'Chl-a',
                dataIndex: 'CHLA',
                width: 90
            }, {
                text: 'SS',
                dataIndex: 'SS',
                width: 90
            }, {
                text: '비고',
                dataIndex: 'RM',
                width: 90
            }, {
                text: '세부사항',
                dataIndex: 'DETAIL_MATTER',
                width: 90
            }];
        }
        return grid;
    },

    getEsstgHcVtnSe: function(val){
        var grid = null;
        if(val == 1){
            grid = [{
                text: '연도',
                dataIndex: 'YEAR',
                width: 90
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
                dataIndex: 'MDT_NM',
                width: 90
            }, {
                text: '지점코드',
                dataIndex: 'SPOT_CODE',
                width: 90
            },{
                text: '지점명',
                dataIndex: 'SPOT_NM',
                width: 100
            },{
                text: '조사정보',
                columns: [{
                    text: '위도',
                    dataIndex: 'LA',
                    width: 100
                },{
                    text: '경도',
                    dataIndex: 'LO',
                    width: 100
                },{
                    text: '조사일',
                    dataIndex: 'DE',
                    width: 100
                },{
                    text: '날씨',
                    dataIndex: 'WETHR_SE',
                    width: 100
                },{
                    text: '조사기관',
                    dataIndex: 'EXAMIN_INSTT_NM',
                    width: 100
                },{
                    text: '조사자',
                    dataIndex: 'EXMNR_NM',
                    width: 100
                }]
            },{
                text: '면적',
                columns: [{
                    text: '수로',
                    dataIndex: 'WTCORS_AR',
                    width: 100
                },{
                    text: '나지',
                    dataIndex: 'BRGRD_AR',
                    width: 100
                },{
                    text: '인공구조물',
                    dataIndex: 'ARSTRU_AR',
                    width: 100
                },{
                    text: '산림',
                    dataIndex: 'MTST_AR',
                    width: 100
                },{
                    text: '주거',
                    dataIndex: 'RESIDE_AR',
                    width: 100
                },{
                    text: '경작',
                    dataIndex: 'CLVT_AR',
                    width: 100
                }]
            },{
                text: '채집불가',
                columns: [{
                    text: '특이사항',
                    width: 100,
                    dataIndex: 'EXIMP_PARTCLR_MATTER'
                },{
                    text: '세부사항',
                    width: 100,
                    dataIndex: 'EXIMP_DETAIL_CN'
                }]
            },{
                text: '채집가능',
                columns: [{
                    text: '특이사항',
                    dataIndex: 'EXPSS_PARTCLR_MATTER'
                    
                }]
            },{
                text: '우점군락',
                columns: [{
                    text: '버드나무속(율)',
                    dataIndex: 'DOMPT_SALX_RT',
                    width: 100
                },{
                    text: '벼과(율)',
                    dataIndex: 'DOMPT_GRMN_RT',
                    width: 100
                },{
                    text: '시초과(율)',
                    dataIndex: 'DOMPT_CPRC_RT',
                    width: 100
                },{
                    text: '절대습지식생(율)',
                    dataIndex: 'DOMPT_OBL_RT',
                    width: 100
                },{
                    text: '상대습지식생(율)',
                    dataIndex: 'DOMPT_FACW_RT',
                    width: 100
                },{
                    text: '절대및상대습지식생(율)',
                    dataIndex: 'DOMPT_OBLFACW_RT',
                    width: 100
                },{
                    text: '교목(율)',
                    dataIndex: 'DOMPT_TRE_RT',
                    width: 100
                },{
                    text: '귀화종(율)',
                    dataIndex: 'DOMPT_NATSPCS_RT',
                    width: 100
                },{
                    text: '생태교란종(율)',
                    dataIndex: 'DOMPT_DISSPCS_RT',
                    width: 100
                },{
                    text: '지정속(율)',
                    dataIndex: 'DOMPT_APGEN_RT',
                    width: 100
                }]
            },{
                text: '우점면적',
                columns: [{
                    text: '버드나무속(율)',
                    dataIndex: 'DOMAR_SALX_RT',
                    width: 100
                },{
                    text: '벼과(율)',
                    dataIndex: 'DOMAR_GRMN_RT',
                    width: 100
                },{
                    text: '사초과(율)',
                    dataIndex: 'DOMAR_CPRC_RT',
                    width: 100
                },{
                    text: '절대습지식생(율)',
                    dataIndex: 'DOMAR_OBL_RT',
                    width: 100
                },{
                    text: '상대습지식생(율)',
                    dataIndex: 'DOMAR_FACW_RT',
                    width: 100
                },{
                    text: '절대및상대습지식생(율)',
                    dataIndex: 'DOMAR_OBLFACW_RT',
                    width: 100
                },{
                    text: '교목(율)',
                    dataIndex: 'DOMAR_TRE_RT',
                    width: 100
                },{
                    text: '귀화종(율)',
                    dataIndex: 'DOMAR_NATSPCS_RT',
                    width: 100
                },{
                    text: '생태교란종(율)',
                    dataIndex: 'DOMAR_DISSPCS_RT',
                    width: 100
                },{
                    text: '지정속(율)',
                    dataIndex: 'DOMAR_APGEN_RT',
                    width: 100
                }]
            },{
                text: '평가',
                columns: [{
                    text: 'HAA(율)',
                    dataIndex: 'EVL_HAA_RT',
                    width: 100
                },{
                    text: 'EA(율)',
                    dataIndex: 'EVL_EA_RT',
                    width: 100
                },{
                    text: 'WTD(율)',
                    dataIndex: 'EVL_WTD_RT',
                    width: 100
                },{
                    text: 'SALFRAA(율)',
                    dataIndex: 'EVL_SALFRAA_RT',
                    width: 100
                },{
                    text: 'TOSC(율)',
                    dataIndex: 'EVL_TOSC_RT',
                    width: 100
                },{
                    text: 'BTI(율)',
                    dataIndex: 'EVL_BTI_RT',
                    width: 100
                },{
                    text: 'HAA(점수)',
                    dataIndex: 'EVL_HAA_SCORE',
                    width: 100
                },{
                    text: 'EA(점수)',
                    dataIndex: 'EVL_EA_SCORE',
                    width: 100
                },{
                    text: 'WTD(점수)',
                    dataIndex: 'EVL_WTD_SCORE',
                    width: 100
                },{
                    text: 'SALFRAA(점수)',
                    dataIndex: 'EVL_SALFRAA_SCORE',
                    width: 100
                },{
                    text: 'TOSC(점수)',
                    dataIndex: 'EVL_TOSC_SCORE',
                    width: 100
                },{
                    text: 'BTI(점수)',
                    dataIndex: 'EVL_BTI_SCORE',
                    width: 100
                }]
            },{
                text: '총 군집수',
                dataIndex: 'TOT_COMM_CO'
            },{
                text: '총 면적',
                dataIndex: 'TOT_AR'
            },{
                text: 'RVI',
                dataIndex: 'RVI'
            },{
                text: '건강성등급',
                dataIndex: 'HEALTH_GRAD'
            }];
        }else if(val == 2){
            grid = [{
                text: '연도',
                dataIndex: 'YEAR'
            },{
                text: '회차',
                dataIndex: 'TME'
            },{
                text: '지점코드',
                dataIndex: 'SPOT_CODE'
            },{
                text: '지점명',
                dataIndex: 'SPOT_NM'
            },{
                text: '학명',
                dataIndex: 'SCNCENM'
            },{
                text: '국명',
                dataIndex: 'KORNM'
            },{
                text: '출현여부',
                dataIndex: 'ERE_AT'
            }]
        }else if(val == 3){
            grid = [{
                text: '연도',
                dataIndex: 'YEAR'
            },{
                text: '회차',
                dataIndex: 'TME'
            },{
                text: '지점코드',
                dataIndex: 'SPOT_CODE'
            },{
                text: '지점명',
                dataIndex: 'SPOT_NM'
            },{
                text: '학명',
                dataIndex: 'SCNCENM'
            },{
                text: '국명',
                dataIndex: 'KORNM'
            },{
                text: '면적',
                dataIndex: 'AR'
            }]
        }else if(val == 4){
            grid = [{
                text: '연도',
                dataIndex: 'YEAR'
            },{
                text: '회차',
                dataIndex: 'TME'
            },{
                text: '지점코드',
                dataIndex: 'SPOT_CODE'
            },{
                text: '지점명',
                dataIndex: 'SPOT_NM'
            },{
                text: '조사정보',
                columns:[{
                    text: '시점',
                    columns:[{
                        text: '위도',
                        dataIndex: 'PNTTM_LA'
                    },{
                        text: '경도',
                        dataIndex: 'PNTTM_LO'
                    },{
                        text: '각도',
                        dataIndex: 'PNTTM_ANGLE'
                    },{
                        text: '목표물',
                        dataIndex: 'PNTTM_TARGT'
                    }]
                },{
                    text: '종점',
                    columns:[{
                        text: '위도',
                        dataIndex: 'TMNL_LA'
                    },{
                        text: '경도',
                        dataIndex: 'TMNL_LO'
                    }]
                },{
                    text: '위치',
                    dataIndex: 'LC'
                }]
            },{
                text: '제외지',
                columns:[{
                    text: '하천구조',
                    dataIndex: 'FRCE_RVSTRCT_SE'
                },{
                    text: '교란',
                    dataIndex: 'FRCE_DSTRB_SE'
                }]
            },{
                text: '제내지',
                columns:[{
                    text: '좌안',
                    dataIndex: 'PRLL_LFTBNK_SE'
                },{
                    text: '우안',
                    dataIndex: 'PRLL_RHTBNK_SE'
                }]
            },{
                text: '체집불가',
                columns:[{
                    text: '특이사항',
                    dataIndex: 'EXIMP_PARTCLR_MATTER'
                }]
            }]
        }else if(val == 5){
            grid = [{
                text: '연도',
                dataIndex: ''
            },{
                text: '회차',
                dataIndex: ''
            },{
                text: '지점코드',
                dataIndex: ''
            },{
                text: '지점명',
                dataIndex: ''
            },{
                text: '구간번호',
                dataIndex: ''
            },{
                text: '거리',
                dataIndex: ''
            },{
                text: '각도',
                dataIndex: ''
            },{
                text: '상대높이',
                dataIndex: ''
            },{
                text: '수심',
                dataIndex: ''
            },{
                text: '하상재질',
                dataIndex: ''
            },{
                text: '나지구분',
                dataIndex: ''
            },{
                text: '군집',
                dataIndex: ''
            },{
                text: '교목',
                columns:[{
                    text: '높이',
                    dataIndex: ''
                },{
                    text: '피도',
                    dataIndex: ''
                }]
            },{
                text: '이교목',
                columns:[{
                    text: '높이',
                    dataIndex: ''
                },{
                    text: '피도',
                    dataIndex: ''
                }]
            },{
                text: '관목',
                columns:[{
                    text: '높이',
                    dataIndex: ''
                },{
                    text: '피도',
                    dataIndex: ''
                }]
            },{
                text: '초본식물',
                columns:[{
                    text: '높이',
                    dataIndex: ''
                },{
                    text: '피도',
                    dataIndex: ''
                }]
            }]
        }else if(val == 6){
            grid = [{
                text: '연도',
                dataIndex: ''
            },{
                text: '회차',
                dataIndex: ''
            },{
                text: '지점코드',
                dataIndex: ''
            },{
                text: '지점명',
                dataIndex: ''
            },{
                text: '학명',
                dataIndex: ''
            },{
                text: '국명',
                dataIndex: ''
            },{
                text: '우점도(지수)',
                dataIndex: ''
            }]
        }
        return grid;
    },





    getEsstgHgAtalSe: function(val){
        var grid = null;
        if(val == 1){
            grid = [{
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
            }];
        }else if(val == 2){
            grid = [{
                text: '연도1',
                dataIndex: 'EXAMIN_YEAR'
            },{
                text: '회차2',
                dataIndex: 'EXAMIN_TME'
            },{
                text: '지점코드3',
                dataIndex: 'EXBF_NM'
            },{
                text: '지점명',
                dataIndex: 'EXBF_CD'
            },{
                text: '학명',
                dataIndex: 'SP_SCNCENM'
            },{
                text: '국명',
                dataIndex: 'SP_KORNM'
            },{
                text: '개체수',
                dataIndex: 'INDVD_CO'
            }]
        }
        return grid;
        
    },

    getEsstgHgBemaSe: function(val){
        var grid = null;
        if(val == 1){
            grid = [{
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
            }];
        }else if(val == 2){
            grid = [{
                text: '연도',
                dataIndex: 'EXAMIN_TME'
            },{
                text: '회차',
                dataIndex: 'EXAMIN_YEAR'
            },{
                text: '지점코드',
                dataIndex: 'EXBF_NM'
            },{
                text: '지점명',
                dataIndex: 'EXBF_CD'
            },{
                text: '학명',
                dataIndex: 'SP_SCNCENM'
            },{
                text: '국명',
                dataIndex: 'SP_KORNM'
            },{
                text: '개체수',
                dataIndex: 'INDVD_CO'
            }]
        }
        return grid;
    },

    getEsstgHgFishSe: function(val){
        var grid = null;
        if(val == 1){
            grid = [{
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
            }];
        }else if(val == 2){
            grid = [{
                text: '연도',
                dataIndex: 'EXAMIN_TME'
            },{
                text: '회차',
                dataIndex: 'EXAMIN_YEAR'
            },{
                text: '지점코드',
                dataIndex: 'EXBF_NM'
            },{
                text: '지점명',
                dataIndex: 'EXBF_CD'
            },{
                text: '학명',
                dataIndex: 'SP_SCNCENM'
            },{
                text: '국명',
                dataIndex: 'SP_KORNM'
            },{
                text: '개체수',
                dataIndex: 'INDVD_CO'
            }]
        }
        return grid;
    },

    getEsstgHgVtnSe: function(val){
        var grid = null;
        if(val == 1){
            grid = [{
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
            }];
        }else if(val == 2){
            grid = [{
                text: '연도',
                dataIndex: 'EXAMIN_YEAR'
            },{
                text: '회차',
                dataIndex: 'EXAMIN_TME'
            },{
                text: '지점코드',
                dataIndex: 'EXBF_NM'
            },{
                text: '지점명',
                dataIndex: 'EXBF_CD'
            },{
                text: '군락명',
                dataIndex: 'CLY_NM'
            },{
                text: '식생명',
                dataIndex: 'VTN_NM'
            },{
                text: '군락면적',
                dataIndex: 'CLY_AR'
            }]
        }
        return grid;
    }

});
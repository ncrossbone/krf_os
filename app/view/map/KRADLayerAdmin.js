Ext.define("krf_new.view.map.KRADLayerAdmin", {

	kradServiceUrl: "",

	map: null,
	popup: null,
	mapClickObj: null,
	mapClickEvt: null,
	btnObj: null,
	btnId: "",
	drawOption: "",
	eventType: "", // 이벤트 타입 (Reach, Point, Line 등)
	stEvtArr: [], // 시작위치 이벤트 그래픽 배열
	edEvtArr: [], // 끝위치 이벤트 그래픽 배열
	stEvtTypes: [], // 시작위치 이벤트 타입 (Reach, Point, Line 등)
	edEvtTypes: [], // 끝위치 이벤트 타입 (Reach, Point, Line 등)
	clickedReachLines: [], // 최초 클릭된(맵 클릭시마다) 리치라인 배열
	rchIds: [], // 최초 클릭된(맵 클릭시마다) 리치 아이디 배열
	stRchIds: [], // 시작위치 리치 아이디 배열
	stRchDids: [],
	edRchIds: [], // 끝위치 리치 아이디 배열
	edRchDids: [],
	arrDownGrp: [], // 하류 그래픽 배열

	arrLineGrp: [], // 리치라인 그래픽 배열
	arrAreaGrp: [], // 집수구역 그래픽 배열

	arrLineGrpTmp: [], // 리치라인 임시 그래픽 배열
	arrAreaGrpTmp: [], // 집수구역 임시 그래픽 배열

	arrLineGrp_s: [], // 소하천 리치라인 그래픽 배열
	arrAreaGrp_s: [], // 소하천 집수구역 그래픽 배열

	arrCommGrp: [], // 공통하류 배열
	tmpEvtLineGrp: [], // KRAD 라인 이벤트 임시 배열
	arrEvtLineGrp: [], // KRAD 라인 이벤트 그래픽 배열

	cmDnRchDid: [], // 양지점 공통으로 만나는 하류지점
	cmRiRchDid: [], // 양지점 공통으로 만나는 하류지점 오른쪽 상류
	cmLeRchDid: [], // 양지점 공통으로 만나는 하류지점 왼쪽 상류

	isNotBon: false, //공통하루에 시작지점이 존재함
	isNotBon1: false, //공통하루에 시작지점이 존재함
	isNotBon2: false, //공통하루에 시작지점이 존재함

	realTimeStBtnChk: true,
	realTimeEnBtnChk: true,

	arrDownGrpStart: "",
	arrDownGrpStartBon: "", //시작지점 본류
	arrDownGrpEnd: "",
	arrDownGrpEndBon: "",  //끝지점 본류

	arr1RRchDid: "",
	arr1LRchDid: "",
	arr2RRchDid: "",
	arr2LRchDid: "",

	bonStLine: "",
	bonEnLine: "",

	clickFS: [], //클릭 배열담기(시작/끝)

	falseDid1: "",
	falseDid2: "",

	arrCnt: 0, //배열 카운트
	stCnt: 0, //시작 카운트
	edCnt: 0, //끝 카운트
	maxSelect: false,

	countInfo: [], //카운트 정보 (시작/끝 지점명,지점번호,배열위치 등...)
	startName: "",  //시작지점 명칭
	endName: "",    //끝지점 명칭

	downGrpLayer: null, // 하류 그래픽
	tmpGrpLayer: null, // 임시 그래픽 레이어
	symGrpLayer: null, // 심볼 그래픽 레이어
	lineGrpLayer: null, // 리치라인 그래픽 레이어
	areaGrpLayer: null, // 집수구역 그래픽 레이어

	lineGrpLayer_sub: null, // 리치라인 그래픽 레이어
	areaGrpLayer_sub: null, // 집수구역 그래픽 레이어

	areaGrpLayer_sub: null, // 집수구역 그래픽 레이어

	miniLineGrpLayer: null, //미니맵 그래픽 레이어

	lineGrpLayer_s: null, //소하천 리치라인 그래픽 레이어
	areaGrpLayer_s: null, //소하천 집수구역 그래픽 레이어

	lineGrpLayer_s_sub: null, //소하천 리치라인 그래픽 레이어
	areaGrpLayer_s_sub: null, //소하천 집수구역 그래픽 레이어

	stSymbol: null, // 시작위치 심볼
	edSymbol: null, // 끝위치 심볼


	reachLineSym: null, // 리치 라인 심볼
	reachAreaSym: null, // 리치 집수구역 심볼
	reachAreaSym_sub: null, // 리치 집수구역 심볼

	addReachLineSym: null, // 리치 라인 심볼
	addReachAreaSym: null, // 리치 집수구역 심볼

	removeReachLineSym: null, // 리치 라인 심볼
	removeReachAreaSym: null, // 리치 집수구역 심볼

	reachLineSym_s: null, // 소하천 리치 라인 심볼
	reachAreaSym_s: null, // 소하천 리치 집수구역 심볼

	overSymbol_P: null, // 마우스 오버 심볼 포인트
	drawSymbol_P: null, // krad point 심볼
	overSymbol_L: null, // 마우스 오버 심볼 라인
	tempSymbol_L: null, // 임시 drow 심볼
	drawSymbol_L: null, // krad line 심볼
	drawSymbol_A: null, // krad area 심볼
	drawSymbol_D: null, // 하류 심볼

	kradInfo: [],

	isShowPopup: false, // 팝업 오픈 여부
	isSearchStop: false, // 검색 종료 플래그
	clickPopBtnId: "", // 클릭된 컨텍스트 메뉴 버튼 아이디

	searchConfigInfoJson: null, // 검색설정 JSON


	//소하천
	sRiverLineArray: [], // 라인
	sRiverAreaArray: [], // 집수구역

	removeLineTmp: [],
	removeFirstLine: null,
	removeFirstBonBreak: null,

	geometryService: null,
	geometry: null,

	firstLine: null,

	constructor: function (map, geometryService) {

		var me = this;
		me.map = map;
		me.geometryService = geometryService;

		me.setKRADInfo();

		me.setDynamicLayer();

		require(["esri/symbols/SimpleMarkerSymbol",
			"esri/symbols/SimpleLineSymbol",
			"esri/symbols/SimpleFillSymbol",
			"dojo/_base/Color",
			"esri/layers/GraphicsLayer",
			"esri/symbols/PictureMarkerSymbol"],
			function (SimpleMarkerSymbol,
				SimpleLineSymbol,
				SimpleFillSymbol,
				Color,
				GraphicsLayer,
				PictureMarkerSymbol) {

				me.drawSymbol_P = new SimpleMarkerSymbol();
				me.drawSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
				me.drawSymbol_P.setSize(10);
				me.drawSymbol_P.setColor(new Color([255, 0, 0, 1]));

				me.overSymbol_P = new SimpleMarkerSymbol();
				me.overSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
				me.overSymbol_P.setSize(20);
				me.overSymbol_P.setColor(new Color([255, 0, 0, 1]));

				me.overSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 8);
				me.tempSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 5);
				me.drawSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255]), 5);

				me.drawSymbol_D = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0, 0.5]), 5); // 하류 심볼

				me.drawSymbol_A = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([0, 0, 255, 0.3]));
				me.drawSymbol_empty = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 255]), 2);



				/*var yoffset = "";
				if(Ext.browser.is.Chrome){
					xoffset = -11; 
				}else{
					xoffset = 0;
				}*/

				me.stSymbol = new PictureMarkerSymbol({
					"angle": 0,
					"yoffset": 14,
					"type": "esriPMS",
					"url": "./resources/images/symbol/btn_start01.png",
					"contentType": "image/png",
					"width": 26,
					"height": 32
				});

				me.edSymbol = new PictureMarkerSymbol({
					"angle": 0,
					"yoffset": 14,
					"type": "esriPMS",
					"url": "./resources/images/symbol/btn_end01.png",
					"contentType": "image/png",
					"width": 26,
					"height": 32
				});



				me.miniMapLineSym = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID
					, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5)
					, new Color([255, 255, 255, 0.1]));

				me.reachLineSym = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
				me.reachAreaSym = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2),
					new Color([255, 255, 0, 0.3]));

				me.reachAreaSym_sub = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2),
					new Color([255, 255, 0, 0.3]));

				//임시저장 
				me.addReachLineSym = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
				me.addReachAreaSym = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2),
					new Color([255, 255, 0, 0.3]));

				me.removeReachLineSym = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
				me.removeReachAreaSym = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5),
					new Color([255, 255, 255, 0.1]));


				me.reachLineSym_s = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([100, 10, 31]), 5);
				me.reachAreaSym_s = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2),
					new Color([100, 100, 0, 0.3]));

				me.downGrpLayer = new GraphicsLayer();
				me.downGrpLayer.id = "downGrpLayer";
				me.downGrpLayer.visible = true;
				me.map.addLayer(me.downGrpLayer);

				me.miniLineGrpLayer = new GraphicsLayer();
				me.miniLineGrpLayer.id = "miniLineGrpLayer";
				me.miniLineGrpLayer.visible = true;
				me.map.addLayer(me.miniLineGrpLayer);



				if (me.map.id == "_subMapDiv_") {
					me.lineGrpLayer_sub = new GraphicsLayer();
					me.lineGrpLayer_sub.id = "lineGrpLayer_sub";
					me.lineGrpLayer_sub.visible = true;
					me.map.addLayer(me.lineGrpLayer_sub);

					me.areaGrpLayer_sub = new GraphicsLayer();
					me.areaGrpLayer_sub.id = "areaGrpLayer_sub";
					me.areaGrpLayer_sub.visible = true;
					me.map.addLayer(me.areaGrpLayer_sub);

					me.lineGrpLayer_s_sub = new GraphicsLayer();
					me.lineGrpLayer_s_sub.id = "lineGrpLayer_s_sub";
					me.lineGrpLayer_s_sub.visible = true;
					me.map.addLayer(me.lineGrpLayer_s_sub);

					me.areaGrpLayer_s_sub = new GraphicsLayer();
					me.areaGrpLayer_s_sub.id = "areaGrpLayer_s_sub";
					me.areaGrpLayer_s_sub.visible = true;
					me.map.addLayer(me.areaGrpLayer_s_sub);
				} else {
					me.areaGrpLayer = new GraphicsLayer();
					me.areaGrpLayer.id = "areaGrpLayer";
					me.areaGrpLayer.visible = true;
					me.map.addLayer(me.areaGrpLayer);

					me.lineGrpLayer = new GraphicsLayer();
					me.lineGrpLayer.id = "lineGrpLayer";
					me.lineGrpLayer.visible = true;
					me.map.addLayer(me.lineGrpLayer);

					me.lineGrpLayer_s = new GraphicsLayer();
					me.lineGrpLayer_s.id = "lineGrpLayer_s";
					me.lineGrpLayer_s.visible = true;
					me.map.addLayer(me.lineGrpLayer_s);

					me.areaGrpLayer_s = new GraphicsLayer();
					me.areaGrpLayer_s.id = "areaGrpLayer_s";
					me.areaGrpLayer_s.visible = true;
					me.map.addLayer(me.areaGrpLayer_s);
				}

				me.tmpGrpLayer = new GraphicsLayer();
				me.tmpGrpLayer.id = "tmpGrpLayer";
				me.tmpGrpLayer.visible = true;
				me.map.addLayer(me.tmpGrpLayer);

				me.symGrpLayer = new GraphicsLayer();
				me.symGrpLayer.id = "symGrpLayer";
				me.symGrpLayer.visible = true;
				me.map.addLayer(me.symGrpLayer);
			});
	},

	clickCnt: function (clickType) {
		var me = this;

		var reachClose = Ext.getCmp('reach_close');
		reachClose.setDisabled(false);

		//최대 5개 선택되었을 경우
		if (me.clickFS.length != 0) {
			for (var i = 0; i < me.clickFS.length; i++) {

				if (clickType == "startPoint") {
					if (me.clickFS[i] == "startPoint") {

						var chkYn = false;

						for (var a = 0; a < me.symGrpLayer.graphics.length; a++) {
							if (me.symGrpLayer.graphics[a].symbol.gubun == "start") {

								if (me.symGrpLayer.graphics[a].symbol.url.substr(35, 1) == me.stCnt) {
									chkYn = true;
								}
							}
						}


						if (chkYn == true) {
							alert("시작지점이 존재합니다");
						} else {
							alert("시작지점을 선택해주세요 ");
						}

						me.realTimeStBtnChk = false;
					}
				}

				if (clickType == "endPoint") {
					if (me.clickFS[i] == "endPoint") {

						for (var a = 0; a < me.symGrpLayer.graphics.length; a++) {
							if (me.symGrpLayer.graphics[a].symbol.gubun == "start") {
								if (me.symGrpLayer.graphics[a].symbol.url.substr(35, 1) == me.stCnt) {
									chkYn = true;
								}
							}
						}
						if (chkYn == true) {
							alert("끝지점이 존재합니다");
						} else {
							alert("끝지점을 선택해주세요 ");
						}

						me.realTimeEnBtnChk = false;
					}
				}
			}

			if (me.realTimeStBtnChk && me.realTimeEnBtnChk) {
				if (clickType == "startPoint") {
					realTimeStBtnChk = true;
				} else if (clickType == "endPoint") {
					realTimeEnBtnChk = true;
				}
				me.clickFS.push(clickType);
			}

		} else {
			if (clickType == "startPoint") {
				realTimeStBtnChk = true;
			} else if (clickType == "endPoint") {
				realTimeEnBtnChk = true;
			}
			me.clickFS.push(clickType);
		}

    	/*if(clickType == "startPoint"){
			realTimeStBtnChk = true;
		}else if(clickType == "endPoint"){
			realTimeEnBtnChk = true;
		}
		me.clickFS.push(clickType);*/

	},

	setKradOnOff: function (kradLayer) {

		var me = this;
		if (me.dynamicLayer) {
			me.dynamicLayer.setVisibleLayers(kradLayer);
		}
	},

	setDynamicLayer: function () {
		return;
		var me = this;

		me.dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(me.kradServiceUrl);
		me.dynamicLayer.id = "kradLayerAdmin"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer.visible = true;
		me.map.addLayer(me.dynamicLayer);
		me.dynamicLayer.setVisibleLayers([-1]);

	},
	setKRADInfo: function () {
		return;
		var me = this;

		me.kradServiceUrl = $KRF_APP.coreMap._kradInfo.kradServiceUrl;

		/* khLee Test 임시 설정 개발완료 후 삭제할것.. */
		/*me.kradInfo = [{
			EXT_DATA_ID: "OBS_WQ_STR_EV",
			TITLE: "하천 수질 관측소",
			CHECKED: true,
			EVENT_TYPE: "Point",
			PD_LAYER_ID: 6, //
			PE_LAYER_ID: 7,
			LO_LAYER_ID: null,
			LD_LAYER_ID: null,
			LE_LAYER_ID: 8,
			AE_LAYER_ID: 9,
			AO_LAYER_ID: null
		}, {
			EXT_DATA_ID: "ACCD_1024_EV",
			TITLE: "오염사고경로",
			CHECKED: true,
			EVENT_TYPE: "Line",
			PD_LAYER_ID: null,
			PE_LAYER_ID: 0,
			LO_LAYER_ID: 2,
			LD_LAYER_ID: 3,
			LE_LAYER_ID: 1,
			AO_LAYER_ID: 4,
			AE_LAYER_ID: 5
		}, {
			EXT_DATA_ID: "FAC_1026_EV",
			TITLE: "하수종말처리시설",
			CHECKED: true,
			EVENT_TYPE: "Point",
			PD_LAYER_ID: 16,
			PE_LAYER_ID: 17,
			LO_LAYER_ID: null,
			LD_LAYER_ID: null,
			LE_LAYER_ID: 18,
			AE_LAYER_ID: 19,
			AO_LAYER_ID: null
		}];*/
		/* khLee Test 임시 설정 개발완료 후 삭제할것.. 끝 */
	},
	// Context Menu 팝업 생성

	//클릭이벤트
	showMiniPopup: function () {

		var me = this;

		var x = me.mapClickEvt.x + 10;
		var y = me.mapClickEvt.y;

		var bodyWidth = Ext.getBody().getWidth();
		var bodyHeight = Ext.getBody().getHeight();
		var popWidth = 80;
		var popHeight = 120;

		if (x > bodyWidth - popWidth) {

			x = bodyWidth - popWidth - 10;
		}

		if (y > bodyHeight - popHeight) {

			y = bodyHeight - popHeight - 10;
		}

		// 팝업 닫기
		me.closePopup();

		if (me.popup == undefined || me.popup == null) {

			me.popup = Ext.create("krf_new.view.map.SriverEvtPop", {
				id: "sriverEvtPop",
				width: popWidth,
				height: 54,
				x: x,
				y: y
			}).show();
		}
	},

	showPopup: function () {

		var me = this;

		var x = me.mapClickEvt.x + 10;
		var y = me.mapClickEvt.y;

		var bodyWidth = Ext.getBody().getWidth();
		var bodyHeight = Ext.getBody().getHeight();
		var popWidth = 80;
		var popHeight = 120;

		if (x > bodyWidth - popWidth) {

			x = bodyWidth - popWidth - 10;
		}

		if (y > bodyHeight - popHeight) {

			y = bodyHeight - popHeight - 10;
		}

		// 팝업 닫기
		me.closePopup();

		if (me.popup == undefined || me.popup == null) {

			me.popup = Ext.create("krf_new.view.krad.kradEvtPop", {
				id: "kradEvtPop",
				width: popWidth,
				height: popHeight,
				x: x,
				y: y
			}).show();
		}
	},
	closePopup: function () {

		if (this.popup != undefined && this.popup != null) {

			this.popup.close();
			this.popup = null;
		}
	},
    /* 맵 클릭 이벤트 켜기
     * [params drawOption]	: 그리기 옵션 ("startPoint", "endPoint", "" 등)
     * [params isShowPopup]	: 컨텍스트 메뉴 팝업 보이기 여부 */
	onMapClickEvt: function (drawOption, btnId) {
		initKradEvt();

		var me = this;
		if (drawOption != undefined && drawOption != null && drawOption != "") {

			me.drawOption = drawOption;
		}

		//me.btnObj = SetBtnOnOff(btnId);

		/* 버튼 On, Off */
		if (btnId != undefined && btnId != null && btnId != "") {

			me.btnObj = SetBtnOnOff(btnId);

		}
		me.btnId = btnId;

		var isMapClickEvt = false;
		me.isShowPopup = false;

		//var reachClose = Ext.getCmp('reach_close');
		if (me.btnObj != undefined && me.btnObj != null) {
			/* 커서 설정 */
			if (me.btnObj.btnOnOff == "on") {

				isMapClickEvt = true;
				me.isShowPopup = true;

				//btn_start0001.cur
				if (me.drawOption == "startPoint") {
					Ext.get('_mapDiv__gc').setStyle('cursor', 'url(./resources/images/symbol/btn_start01.cur),auto');
					if (me.checkSubMap()) {
						Ext.get('_subMapDiv__gc').setStyle('cursor', 'url(./resources/images/symbol/btn_start01.cur),auto');
					}

				}
				else if (me.drawOption == "endPoint") {
					Ext.get('_mapDiv__gc').setStyle('cursor', 'url(./resources/images/symbol/btn_end01.cur),auto');
					if (me.checkSubMap()) {
						Ext.get('_subMapDiv__gc').setStyle('cursor', 'url(./resources/images/symbol/btn_end01.cur),auto');
					}

				}

			}
			/* 커서 설정 끝 */
			if (isMapClickEvt == true) {
				/* 클릭 이벤트 설정 */
				require(["dojo/on"],
					function (on) {
						//$KRF_APP.coreMap._krad

						/* 지도 이동을 염두에 두고 down일때 이벤트 지정 */
						me.mapMdownObj = on(me.map, "mouse-down", function (evt) {
							if ((evt.which && evt.which == 3) || (evt.button && evt.button == 2)) {
							} else { // 오른클릭이 아닐때만 이벤트 입력

								me.mapClickEvt = evt;
							}
						});


						me.mapClickObj = on(me.map, "mouse-up", function (evt) {
							if (me.mapClickEvt != undefined && me.mapClickEvt != null) {

								if (me.mapClickEvt.x != evt.x || me.mapClickEvt.y != evt.y) {

									// 지도 이동 시 팝업 띄우지 않는다. 해당 리치 정보도 담지않는다. me.setRchIdsWithEvent();, me.showPopup(); 안들어가게..
									me.isShowPopup = false;
								}
								else {

									if (me.map.getLevel() < 11) {

										alert("현재 축척에서는 지원되지 않습니다. 확대해주세요.");
										// 이벤트 초기화
										initKradEvt();
										me.isShowPopup = false;
										SetBtnOnOff(btnId, "off");
										return;
									}
									else {

										me.isShowPopup = true;
									}
								}
							}

							if ((evt.which && evt.which == 3) || (evt.button && evt.button == 2)) {

								// 오른버튼 컨텍스트 메뉴 막기
								/*document.oncontextmenu = function(evt){return false;}
								
								if(me.mapClickEvt != undefined && me.mapClickEvt != null){
									
									me.showPopup();
								}*/
							}
							else {

								// 오른버튼 컨텍스트 메뉴 풀기
								// 검색설정 JSON 셋팅 ($KRF_APP.coreMap._krad.searchConfigInfoJson)
								me.getSearchConfigInfo();

								/* 검색설정 "상류" 체크 시 */
								if ($KRF_APP.coreMap._krad.searchConfigInfoJson.isUpDraw == true) {

									_rchUpSearch.searchWithEvent(evt);
									// 종료 검색 체크
									me.isStopCheck();
								} else { /* 검색설정 "상류" 체크 시 끝 */
									if (me.isShowPopup == true) {

										//소하천 on/off
										/*if(Ext.getCmp("btnLayerSRiver").btnOnOff == "on"){
											me.setSRchIdsWithEvent();
										}else{
											me.setRchIdsWithEvent();
										}*/
										//me.setRchIdsWithEvent();
										//me.setRchIdsWithEvent();

										var searchConfigInfo = localStorage['_searchConfigInfo_'];
										var jsonConf = JSON.parse(searchConfigInfo);


										if (me.drawOption == "startPoint" || me.drawOption == "endPoint") {
											if (jsonConf.isSRiver) { //소하천 선택되었을시
												me.showMiniPopup();
											} else {// 소하천이 꺼져있을때는 기존 검색로직
												me.setRchIdsWithEvent();
											}
										} else {
											me.setRchIdsWithEvent();
										}

									} else {

										me.closePopup();
									}
								}
							}
						});

						if (me.checkSubMap()) {
							me.mapMdownObj = on($KRF_APP.subMap.map, "mouse-down", function (evt) {

								if ((evt.which && evt.which == 3) || (evt.button && evt.button == 2)) {
								}
								else { // 오른클릭이 아닐때만 이벤트 입력

									me.mapClickEvt = evt;
								}
							});

							me.mapClickObj = on($KRF_APP.subMap.map, "mouse-up", function (evt) {

								if (me.mapClickEvt != undefined && me.mapClickEvt != null) {

									if (me.mapClickEvt.x != evt.x || me.mapClickEvt.y != evt.y) {

										// 지도 이동 시 팝업 띄우지 않는다. 해당 리치 정보도 담지않는다. me.setRchIdsWithEvent();, me.showPopup(); 안들어가게..
										me.isShowPopup = false;
									}
									else {

										if ($KRF_APP.subMap.map.getLevel() < 11) {

											alert("현재 축척에서는 지원되지 않습니다. 확대해주세요.");
											// 이벤트 초기화
											initKradEvt();
											me.isShowPopup = false;
											SetBtnOnOff(btnId, "off");
											return;
										}
										else {

											me.isShowPopup = true;
										}
									}
								}

								if ((evt.which && evt.which == 3) || (evt.button && evt.button == 2)) {

									// 오른버튼 컨텍스트 메뉴 막기
									/*document.oncontextmenu = function(evt){return false;}
									
									if(me.mapClickEvt != undefined && me.mapClickEvt != null){
										
										me.showPopup();
									}*/
								}
								else {

									// 오른버튼 컨텍스트 메뉴 풀기
									// 검색설정 JSON 셋팅 ($KRF_APP.coreMap._krad.searchConfigInfoJson)
									me.getSearchConfigInfo();

									/* 검색설정 "상류" 체크 시 */
									if ($KRF_APP.coreMap._krad.searchConfigInfoJson.isUpDraw == true) {

										_rchUpSearch.searchWithEvent(evt);
										// 종료 검색 체크
										me.isStopCheck();
									}
									else { /* 검색설정 "상류" 체크 시 끝 */
										if (me.isShowPopup == true) {

											var searchConfigInfo = localStorage['_searchConfigInfo_'];
											var jsonConf = JSON.parse(searchConfigInfo);


											if (me.drawOption == "startPoint" || me.drawOption == "endPoint") {
												if (jsonConf.isSRiver) { //소하천 선택되었을시
													me.showMiniPopup();
												} else {// 소하천이 꺼져있을때는 기존 검색로직
													me.setRchIdsWithEvent();
												}
											} else {
												me.setRchIdsWithEvent();
											}

										} else {

											me.closePopup();
										}
									}
								}
							});
						}





					});
				/* 클릭 이벤트 설정 끝 */
			}
			else {

				me.closePopup();
			}
		}
	},
	/* 맵 클릭 이벤트 끄기 */
	offMapClickEvt: function () {

		var me = this;

		if (me.mapMdownObj != undefined && me.mapMdownObj != null) {

			me.mapMdownObj.remove();
			me.mapMdownObj = null;
		}

		if (me.mapClickObj != undefined && me.mapClickObj != null) {

			me.mapClickObj.remove();
			me.mapClickObj = null;
		}
	},
	onMapDragEvt: function (drawOption, btnId) {

		initKradEvt();

		var me = this;

		if (drawOption != undefined && drawOption != null && drawOption != "") {

			me.drawOption = drawOption;
		}

		/* 버튼 On, Off */
		if (btnId != undefined && btnId != null && btnId != "") {

			me.btnObj = SetBtnOnOff(btnId);
		}

		me.isShowPopup = false;




		//krf_new.global.Obj.showSimpleTooltip("선택할 영역을 드래그하세요.");
		var isLevel = false;
		require(["esri/toolbars/draw",
			"dojo/on",
			"esri/geometry/geometryEngine",
			"esri/symbols/TextSymbol",
			"esri/graphic",
			"esri/symbols/Font",
			"esri/Color",
			"esri/tasks/BufferParameters"], function (Draw, on, geometryEngine, TextSymbol, Graphic, Font,
				Color, BufferParameters) {

				var mapClickObj = on(me.map, "mouse-up", function (evt) {

					if (me.map.getLevel() < 11) {
						mapClickObj.remove();
						return;
					}

				});



				var selectionToolbar = new Draw(me.map, { showTooltips: false });



				if (me.drawOption == "extent") {
					selectionToolbar.activate(Draw.EXTENT);
				} else if (me.drawOption == "radius") {

					selectionToolbar.activate(Draw.POINT);

				} else if (me.drawOption == "circle") {

					selectionToolbar.activate(Draw.CIRCLE);

					//반경 그릴시
					var centerPt = ""; //센터 포인트 좌표

					var textSymbol = new TextSymbol("");
					var font = new Font("15px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
					textSymbol.setFont(font);
					textSymbol.setColor(new Color([255, 0, 0]));
					var radiusText = new Graphic(null, textSymbol, null, null);

					//드래그 시작시 그래픽 생성 , 센터 좌표 변수생성
					me.map.on("mouse-drag-start", function (evt) {

						if (me.drawOption == "circle") {
							centerPt = evt;
							me.map.graphics.add(radiusText);
						}

					});

					// 드래그중 반경 값 확인, 값 변경
					me.map.on('mouse-drag', function (dragEvt) {

						//버튼 클릭이벤트가 동일하므로 radius 일때는 return 시켜준다
						if (me.drawOption == "radius") {
							return;
						}

						if (me.drawOption == "circle") {
							//반지름 값 구하기 (시작포인트 현제 포인트)
							var pl = new esri.geometry.Polyline(me.map.spatialReference);
							pl.addPath([centerPt.mapPoint, dragEvt.mapPoint]);

							//반지름값, 단위 미터
							var radius = geometryEngine.geodesicLength(pl, "meters");

							//반지름 * 2 = 지름
							var radiusValue = Math.round(radius * 2);

							// 1000 이상시 km, 1000 이하일시 m 값 나눔
							if (radiusValue > 1000) {
								radiusValue = radiusValue.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1.') + " 킬로미터(km)";
							} else {
								radiusValue = radiusValue + " 미터(m)";
							}

							//텍스트 심볼 값 변경
							textSymbol.setText(radiusValue);
							radiusText.setGeometry(centerPt.mapPoint);
						}


					});
				}

				on(selectionToolbar, "DrawEnd", function (evt) {
					if (me.drawOption == "radius") {

						if (evt.type != "point") {
							return;
						}

						var btn = Ext.getCmp("btnMenu07");
						if (btn.btnOnOff == "off") {
							return;
						}
						var radiusText = parseFloat(Ext.getCmp("radiusText").getValue());

						if (isNaN(radiusText)) {
							alert("숫자만 입력 가능합니다.");
							return;
						}
						var params = new BufferParameters();
						params.distances = [radiusText];

						params.outSpatialReference = me.map.spatialReference;
						params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;

						require(["esri/geometry/normalizeUtils"], function (normalizeUtils) {

							normalizeUtils.normalizeCentralMeridian([evt]).then(function (normalizedGeometries) {
								var normalizedGeometry = normalizedGeometries[0];

								me.geometryService.simplify([normalizedGeometry], function (geometries) {
									params.geometries = geometries;

									me.geometryService.buffer(params, function (result) {

										if (result.length > 0) {
											evt = result[0];
											var symbol = new esri.symbol.SimpleFillSymbol(
												esri.symbol.SimpleFillSymbol.STYLE_SOLID,
												new esri.symbol.SimpleLineSymbol(
													esri.symbol.SimpleLineSymbol.STYLE_SOLID,
													new dojo.Color([255, 0, 0, 0.65]), 2
												),
												new dojo.Color([255, 0, 0, 0.35])
											);

											var graphic = new esri.Graphic(evt, symbol);
											me.map.graphics.clear();
											me.map.graphics.add(graphic);


											if (me.map.getLevel() < 11) {
												alert("현재 축척에서는 지원되지 않습니다. 확대해주세요.");
											} else {
												me.mapClickEvt = evt;
												me.setRchIdsWithEvent();
											}
											selectionToolbar.deactivate();

											SetBtnOnOff(btnId, "off");
											SetBtnOnOff("btnMenu07", "off");

											krf_new.global.Obj.hideSimpleTooltip();

											var radiusToolbar = Ext.getCmp("radiusToolbar");
											radiusToolbar.hide();

										}

									})

								});
							});

						});


					} else {
						//return;
						me.map.graphics.clear();

						if (me.map.getLevel() < 11) {
							alert("현재 축척에서는 지원되지 않습니다. 확대해주세요.");
						} else {
							me.mapClickEvt = evt;
							me.setRchIdsWithEvent();
						}
						selectionToolbar.deactivate();
						SetBtnOnOff(btnId, "off");
						krf_new.global.Obj.hideSimpleTooltip();
					}

				});
			});
	},
	offMapDragEvt: function () {

		krf_new.global.Obj.hideSimpleTooltip();
	},


	//소하천 리치클릭
	setSRchIdsWithEvent: function (feature) {

		var me = this;

		require(["esri/tasks/query",
			"esri/tasks/QueryTask",
			"esri/geometry/Point",
			"esri/geometry/Extent"], function (Query, QueryTask, Point, Extent) {

				var queryTask = new QueryTask($KRF_DEFINE.sRiver + "/" + $KRF_DEFINE.sRiverReach); // 소하천 리치라인
				var query = new Query();
				query.returnGeometry = true;
				query.outFields = ["*"];

				if (feature == undefined) {
					var centerPoint = new Point(me.mapClickEvt.mapPoint.x, me.mapClickEvt.mapPoint.y, me.mapClickEvt.mapPoint.spatialReference);
					var mapWidth = me.map.extent.getWidth();
					var pixelWidth = mapWidth / me.map.width;
					var tolerance = 10 * pixelWidth;

					var queryExtent = new Extent(1, 1, tolerance, tolerance, me.mapClickEvt.mapPoint.spatialReference);
					query.geometry = queryExtent.centerAt(centerPoint);

				} else {
					if (feature.attributes.D_SRCH_ID == undefined) {
						query.where = "SRCH_ID = '" + feature.attributes.SCAT_ID + "'";
					} else {
						query.where = "SRCH_ID = '" + feature.attributes.D_SRCH_ID + "'";
					}

				}

				queryTask.execute(query, function (featureSet) {
					if (featureSet.features.length > 0) {
						me.execSLineFeature(featureSet);
					} else {
						//리치라인이 없을시  getSRiverCatId
						var queryTaskArea = new QueryTask($KRF_DEFINE.sRiver + "/" + $KRF_DEFINE.sRiverCat); // 소하천 집수구역
						var queryArea = new Query();
						queryArea.returnGeometry = true;
						queryArea.outFields = ["*"];
						queryArea.geometry = me.mapClickEvt.mapPoint;
						queryTaskArea.execute(queryArea, function (featureSetArea) {
							if (featureSetArea.features.length > 0) {
								me.setSRchIdsWithEvent(featureSetArea.features[0]);
							} else {
								alert("소하천 집수구역이 없습니다.");
								me.setRchIdsWithEvent();
							}

						});

					}
				});


			});


	},

	///////////소하천///////////////////////////////////////////////////
	execSLineFeature: function (featureSet) {

		var me = this;

		var feature = featureSet.features[0];
		me.sRiverLineArray.push(feature);
		me.getSRiverCatId(feature);
		//me.drawGraphic(feature, "reachLine_s");

		if (feature.attributes.RD_SRCH_ID == null && feature.attributes.LD_SRCH_ID == null && feature.attributes.D_RCH_ID != null) {
			me.setRchIdsWithEvent(featureSet);
			//기존 검색으로 넘어간다
		} else {
			//소하천이 존재하므로 소하천 검색을한다.
			me.setSRchIdsWithEvent(feature);
		}

	},


    /* 이벤트(클릭, 드래그 등)로 리치라인에서 리치아이디 가져오기
     * 이벤트에 리치라인이 포함되지 않으면 집수구역 조회
     * 조회 완료 후 컨텍스트 메뉴 팝업 오픈 */
	setRchIdsWithEvent: function (featureSet) {
		var me = this;

		require(["esri/tasks/query",
			"esri/tasks/QueryTask",
			"esri/geometry/Point",
			"esri/geometry/Extent"], function (Query, QueryTask, Point, Extent) {

				////console.info("시작 or 선택 클릭시 리치라인 55"+_mapServiceUrl_v3 + "/" + _reachLineLayerId);
				var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
				var query = new Query();
				query.returnGeometry = true;
				//query.outFields = ["*"];
				query.outFields = ["CAT_DID",
					"RCH_ID",
					"RCH_DID",
					"RD_RCH_DID",
					"LD_RCH_DID",
					"GEO_TRIB",
					"LU_RCH_DID",
					"RU_RCH_DID",
					"RIV_NM"];

				if (featureSet != undefined) {
					//query.where = "SRCH_ID = '" + feature.attributes.D_SRCH_ID + "'" ;
					query.where = "RCH_ID = '" + featureSet.features[0].attributes.D_RCH_ID + "'";
				} else {
					if (me.mapClickEvt == undefined || me.mapClickEvt == null) {

						alert("클릭 이벤트가 지정되지 않았습니다.");
						return;
					}

					if ((me.mapClickEvt.type != undefined && me.mapClickEvt.type == "point") ||
						(me.mapClickEvt.mapPoint != undefined && me.mapClickEvt.mapPoint.type != undefined && me.mapClickEvt.mapPoint.type == "point")) {
						var centerPoint = new Point(me.mapClickEvt.mapPoint.x, me.mapClickEvt.mapPoint.y, me.mapClickEvt.mapPoint.spatialReference);
						var mapWidth = me.map.extent.getWidth();
						var pixelWidth = mapWidth / me.map.width;
						var tolerance = 10 * pixelWidth;

						var queryExtent = new Extent(1, 1, tolerance, tolerance, me.mapClickEvt.mapPoint.spatialReference);

						query.geometry = queryExtent.centerAt(centerPoint);

					}
					else {

						if (me.mapClickEvt.mapPoint != undefined && me.mapClickEvt.mapPoint != null) {
							query.geometry = me.mapClickEvt.mapPoint;

						}
						else {

							query.geometry = me.mapClickEvt;

						}
					}
				}



				me.rchIds = [];
				me.clickedReachLines = [];

				// 이벤트로 리치라인 조회
				queryTask.execute(query, function (featureSet) {

					if (featureSet.features.length > 0) {
						me.execLineFeature(featureSet);
					} else {
						//console.info(_mapServiceUrl_v3 + "/" + _reachAreaLayerId);
						var areaQueryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachAreaLayerId); // 집수구역 URL
						var areaQuery = new Query();
						areaQuery.returnGeometry = true;
						//areaQuery.outFields = ["*"];
						areaQuery.outFields = ["CAT_ID", "CAT_DID"];
						areaQuery.geometry = query.geometry;
						// 이벤트로 집수구역 조회
						areaQueryTask.execute(areaQuery, function (areaFS) {

							if (areaFS.features.length > 0) {

								var lineQueryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
								var lineQuery = new Query();
								lineQuery.returnGeometry = true;
								//lineQuery.outFields = ["*"];
								lineQuery.outFields = ["CAT_DID",
									"RCH_ID",
									"RCH_DID",
									"RD_RCH_DID",
									"LD_RCH_DID",
									"GEO_TRIB",
									"LU_RCH_DID",
									"RU_RCH_DID",
									"RIV_NM"];
								lineQuery.where = "CAT_DID IN (";

								for (var i = 0; i < areaFS.features.length; i++) {

									lineQuery.where += "'" + areaFS.features[i].attributes.CAT_DID + "', ";
								}

								lineQuery.where = lineQuery.where.substring(0, lineQuery.where.length - 2) + ")";

								// 조건으로 리치라인 조회
								lineQueryTask.execute(lineQuery, function (lineFS) {

									if (lineFS.features.length > 0) {
										me.execLineFeature(lineFS);
									}
									else {

										alert("해당 구역에 리치라인을 찾을 수 없습니다.");
									}
								});
							}
						});
					}
				});
			});
	},
	execLineFeature: function (featureSet) {
		var me = this;

		var overlap = false;

		if (me.drawOption == "endPoint" || me.drawOption == "startPoint") {
			//첫번쨰 feature 선택

			var feature = featureSet.features[0];
			//me.rchIds에 선택된 첫번째 RCH_ID 입력
			me.rchIds.push(feature.attributes.RCH_ID);
			me.clickedReachLines.push(feature); // 최초 클릭된(맵 클릭시마다) 리치라인 배열

			if ($KRF_APP.coreMap._krad.kradInfo.length == 0) {
				me.setClickEvt($KRF_APP.coreMap._krad.mapClickEvt, "Reach");
				// 이벤트 초기화
				initKradEvt();
			}
			else {

				me.showPopup();
			}
		} else if (me.drawOption == "reachLineRemove") {

			var lineFeature = featureSet.features[0];

			me.setDownAndComm([lineFeature.attributes.RCH_DID], [], 0, "RCH_DID");

		} else {

			for (var i = 0; i < featureSet.features.length; i++) {

				var feature = featureSet.features[i];

				//if(me.drawOption == "addPoint" || me.drawOption == "extent" || me.drawOption == "circle"){
				if (me.drawOption == "extent" || me.drawOption == "circle" || me.drawOption == "radius") {

					var catDid = feature.attributes.CAT_DID;

					// 그래픽 그리기
					me.drawGraphic(feature, "reachLine");
					// 집수구역 그리기
					me.setReachArea(catDid);
					// 버튼 끄기
					SetBtnOnOff(me.btnObj.id, "off");
					// 이벤트 초기화
					initKradEvt();
				}
				else if (me.drawOption == "removePoint") {

					var catDid = feature.attributes.CAT_DID;

					for (var a = 0; a < me.arrAreaGrp.length; a++) {
						if (me.arrAreaGrp[a].attributes.CAT_DID == catDid) {
							overlap = true;
						}
					}

					if (!overlap) {
						return alert("선택되어 있지 않은 지점");
					}

					me.drawGraphic(feature, "removeReachLine");
					me.setReachAreaTmp(catDid);

					//initKradEvt();
				} else if (me.drawOption == "addPoint") {

					var catDid = feature.attributes.CAT_DID;


					var me = this;
					var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;


					for (var a = 0; a < me.arrAreaGrp.length; a++) {
						if (me.arrAreaGrp[a].attributes.CAT_DID == catDid) {
							overlap = true;
						}
					}

					if (overlap) {
						return alert("중복된 지점");
					}

					me.drawGraphic(feature, "addReachLine");
					me.setReachAreaTmp(catDid);

				}
			}

		}


		//if(me.drawOption == "addPoint" || me.drawOption == "extent" || me.drawOption == "circle" || me.drawOption == "removePoint"){
		if (me.drawOption == "extent" || me.drawOption == "circle") {

			me.map.graphics.clear();

			// 검색 종료 체크
			//me.isStopCheck();


			Ext.defer(clear = function () {

				// 지점 목록 창 띄우기
				$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, { searchText: 'selectReach' });

				// 검색결과 창 띄우기
				ShowSearchResultReach("");

			}, 2000, this);


		} else if (me.drawOption == "radius") {

			Ext.defer(clear = function () {

				me.map.graphics.clear();

				// 검색 종료 체크
				me.isStopCheck();

			}, 2000, this);

		}
	},
	drawTempGrp: function (paramEvtType) {

		var me = this;

		// 템프 그래픽 이벤트 끄기
		me.offTmpGrpEvt();

		// 이벤트 타입 설정 (Point, Line 등)
		me.eventType = paramEvtType;

		require(["esri/tasks/QueryTask",
			"esri/tasks/query",
			"esri/layers/GraphicsLayer",
			"dojo/on"],
			function (QueryTask,
				Query,
				GraphicsLayer,
				on) {

				for (var i = 0; i < me.kradInfo.length; i++) {

					//if(me.kradInfo[i].CHECKED == true){

					var extDataId = me.kradInfo[i].EXT_DATA_ID;
					var eventType = me.kradInfo[i].EVENT_TYPE;
					var layerId = "";
					var qWhere = "";

					if (eventType == paramEvtType) {

						if (paramEvtType == "Point") {

							layerId = me.kradInfo[i].PE_LAYER_ID;
						}

						if (paramEvtType == "Line") {

							layerId = me.kradInfo[i].LO_LAYER_ID;
						}

						qWhere = "EXT_DATA_ID = '" + extDataId + "' AND RCH_ID IN (";

						for (var idCnt = 0; idCnt < me.rchIds.length; idCnt++) {

							qWhere += "'" + me.rchIds[idCnt] + "', ";
						}

						qWhere = qWhere.substring(0, qWhere.length - 2) + ")";
					}

					if (layerId == null || layerId == "") {

						continue;
					}

					var queryTask = new QueryTask(me.kradServiceUrl + "/" + layerId);
					var query = new Query();
					query.returnGeometry = false;
					query.outFields = ["*"];
					query.where = qWhere;
					queryTask.execute(query, function (featureSet) {

						var features = featureSet.features;

						if (features != undefined && features.length > 0) {

							for (var fCnt = 0; fCnt < features.length; fCnt++) {

								var graphic = features[fCnt];

								if (paramEvtType == "Point") {

									graphic.setSymbol(me.drawSymbol_P);
									me.tmpGrpLayer.add(graphic);
								}

								if (paramEvtType == "Line") {

									var extId = graphic.attributes.EXT_DATA_ID;
									var orgId = graphic.attributes.ORG_ID;

									var kInfoIdx = me.kradInfo.map(function (obj) {
										return obj.EXT_DATA_ID;
									}).indexOf(extId);

									if (kInfoIdx > -1) {

										var queryTaskLine = new QueryTask(me.kradServiceUrl + "/" + me.kradInfo[kInfoIdx].LO_LAYER_ID);
										var queryLine = new Query();
										queryLine.returnGeometry = true;
										queryLine.outFields = ["*"];
										queryLine.where = "EXT_DATA_ID = '" + extId + "' AND ORG_ID = " + orgId;

										queryTaskLine.execute(queryLine, function (lineSet) {

											me.tmpEvtLineGrp = [];

											for (var fCnt2 = 0; fCnt2 < lineSet.features.length; fCnt2++) {

												lineSet.features[fCnt2].setSymbol(me.tempSymbol_L);
												me.tmpGrpLayer.add(lineSet.features[fCnt2]);

												var eIdx = me.tmpEvtLineGrp.map(function (obj) {
													return obj.attributes.LINE_EVENT_ID;
												}).indexOf(lineSet.features[fCnt2].attributes.LINE_EVENT_ID);

												if (eIdx == -1) {

													lineSet.features[fCnt2].attributes.drawOption = me.drawOption;
													me.tmpEvtLineGrp.push(lineSet.features[fCnt2]);
												}
											}
										});
									}
								}
							}
						}
					});
					//}
				}
			});

		// KRAD 이벤트 생성
		me.onTmpGrpEvt(paramEvtType);
	},
	// 임시 그래픽 레이어 (tmpGrpLayer) 이벤트 켜기
	onTmpGrpEvt: function (paramEvtType) {

		var me = this;

		require(["esri/tasks/QueryTask",
			"esri/tasks/query",
			"esri/layers/GraphicsLayer",
			"dojo/on",
			"esri/InfoTemplate"],
			function (QueryTask,
				Query,
				GraphicsLayer,
				on,
				InfoTemplate) {

				me.mOverObj = on(me.tmpGrpLayer, "mouse-over", function (evt) {

					if (paramEvtType == "Point") {

						var infoIdx = me.kradInfo.map(function (obj) {
							return obj.EXT_DATA_ID;
						}).indexOf(evt.graphic.attributes.EXT_DATA_ID);

						var siteNm = evt.graphic.attributes.지점명 != undefined ? evt.graphic.attributes.지점명 : (evt.graphic.attributes.시설명 != undefined ? evt.graphic.attributes.시설명 : "");
						var siteAddr = evt.graphic.attributes.주소 != undefined ? evt.graphic.attributes.주소 : "";
						var siteCorp = evt.graphic.attributes.조사기관 != undefined ? evt.graphic.attributes.조사기관 : (evt.graphic.attributes.운영기관 != undefined ? evt.graphic.attributes.운영기관 : "");

						var infoTitle = "";
						if (infoIdx > -1) {
							infoTitle = me.kradInfo[infoIdx].TITLE;
						}
						var infoContent = "지&nbsp;점&nbsp;&nbsp;명 : " + siteNm + "<br>";
						infoContent += "주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 : " + siteAddr + "<br>";
						infoContent += "운영기관 : " + siteCorp;

						var template = new InfoTemplate(infoTitle, infoContent);
						evt.graphic.setInfoTemplate(template)

						me.map.infoWindow.setContent(evt.graphic.getContent());
						me.map.infoWindow.setTitle(evt.graphic.getTitle());
						me.map.infoWindow.show(evt.screenPoint,
							me.map.getInfoWindowAnchor(evt.screenPoint));

						evt.graphic.setSymbol(me.overSymbol_P);
					}
					else if (paramEvtType = "Line") {

						var graphics = me.tmpEvtLineGrp;

						for (var i = 0; i < graphics.length; i++) {

							graphics[i].setSymbol(me.overSymbol_L);
						}
					}
				});

				me.mOutObj = on(me.tmpGrpLayer, "mouse-out", function (evt) {

					if (paramEvtType == "Point") {

						me.map.infoWindow.hide();
						evt.graphic.setSymbol(me.drawSymbol_P);
					}
					else if (paramEvtType == "Line") {

						var graphics = me.tmpEvtLineGrp;

						for (var i = 0; i < graphics.length; i++) {

							graphics[i].setSymbol(me.tempSymbol_L);
						}
					}
				});

				me.mClickObj = on(me.tmpGrpLayer, "mouse-down", function (evt) {
					// 변수 셋팅 및 하류조회
					me.setClickEvt(evt, paramEvtType);
				});

				/* 마우스 업 시 infowindow hidden */
				var mUpObj = on(me.map, "mouse-up", function (evt) {

					var obj = me.map.infoWindow;
					var hCnt = 0;

					// 1초 체크
					var timerObj = window.setInterval(function () {

						obj.hide();

						hCnt++;

						if (hCnt > 10) {

							window.clearInterval(timerObj);
							mUpObj.remove();
						}
					}, 100);
				});
			});
	},
	// 임시 그래픽 레이어 (tmpGrpLayer) 이벤트 끄기
	offTmpGrpEvt: function () {

		var me = this;

		if (me.mOverObj != undefined && me.mOverObj != null) {
			me.mOverObj.remove();
		}

		if (me.mOutObj != undefined && me.mOutObj != null) {
			me.mOutObj.remove();
		}

		if (me.mClickObj != undefined && me.mClickObj != null) {
			me.mClickObj.remove();
		}
	},
	// 변수 셋팅, 이벤트 끄기 및 하류조회
	setClickEvt: function (evt, eventType) {

		var me = this;
		// 임시 그래픽 이벤트 끄기 및 그래픽 삭제
		me.offTmpGrpEvt();
		// 맵클릭 이벤트 끄기
		$KRF_APP.coreMap._krad.offMapClickEvt();

		var geo = null;
		var rchIds = [];
		var siteNms = [];
		var rchId = "";
		var rchDid = "";
		var siteNm = "";
		if (eventType == "Point") {

			geo = evt.graphic.geometry;

			rchId = evt.graphic.attributes.RCH_ID;
			siteNm = evt.graphic.attributes.지점명 != undefined ? evt.graphic.attributes.지점명 :
				(evt.graphic.attributes.시설명 != undefined ? evt.graphic.attributes.시설명 : "");

			rchIds.push(rchId);
			siteNms.push(siteNm);
		}
		else if (eventType == "Line") {

			geo = evt.mapPoint;

			/* 선택 라인 배열에 넣기 2차 */
			me.arrEvtLineGrp.push(me.tmpEvtLineGrp);
			var graphics = me.tmpEvtLineGrp;

			graphics.sort(function (a, b) {
				return a.attributes.EVENT_ORDER - b.attributes.EVENT_ORDER;
			});

			for (var i = 0; i < graphics.length; i++) {

				// event order 처음(상류), 마지막(하류)만 셋팅
				if (i == 0 || i == graphics.length - 1) {

					rchId = graphics[i].attributes.RCH_ID;
					rchIds.push(rchId);
					siteNms.push("");
				}
			}
		}
		else if (eventType == "Reach") {

			geo = me.mapClickEvt.mapPoint;

			var rIdx = me.clickedReachLines.length - 1;
			rchId = me.clickedReachLines[rIdx].attributes.RCH_ID;
			rchIds.push(rchId);
			rchDid = me.clickedReachLines[rIdx].attributes.RCH_DID;
			siteNm = me.clickedReachLines[rIdx].attributes.지점명 != undefined ? me.clickedReachLines[rIdx].attributes.지점명 :
				(me.clickedReachLines[rIdx].attributes.시설명 != undefined ? me.clickedReachLines[rIdx].attributes.시설명 :
					(me.clickedReachLines[rIdx].attributes.RIV_NM != undefined ? me.clickedReachLines[rIdx].attributes.RIV_NM : ""));
			siteNms.push(siteNm);

		}

		me.drawSymbol(geo); // 심볼 그리기
		for (var i = 0; i < rchIds.length; i++) {

			if (me.drawOption == "startPoint") {
				// 시작위치 하천명 셋팅
				SetStEdSiteName("start", siteNms[i]);
				me.startName = siteNms[i];

				// 시작위치 KRAD Event 배열 넣기
				me.stEvtArr.push(evt.graphic);

				// 시작위치 RCH_ID 배열 넣기
				me.stRchIds.push(rchIds[i]);

				if (rchDid != "") {

					var idx = me.stRchDids.indexOf(rchDid);
					if (idx == -1) {
						me.stRchDids.push(rchDid);
					}
				}

				// 시작위치 이벤트 타입 배열 넣기 (Reach, Point, Line 등)
				me.stEvtTypes.push(eventType);

				//시작 카운트
				//me.stCnt++;

				//var rCountSToolbar = Ext.getCmp("ReachCountSToolbar");
				//var rCountEToolbar = Ext.getCmp("ReachCountEToolbar");
				/*if(rCountSToolbar == undefined){
					rCountSToolbar = Ext.create('krf_new.view.center.ReachCountSToolbar');
					rCountSToolbar.show();
				}
				
				if(rCountEToolbar == undefined){
					rCountEToolbar = Ext.create('krf_new.view.center.ReachCountEToolbar');
					rCountEToolbar.show();
				}*/

				// var reachs_close = Ext.getCmp("reachs_close");
				// reachs_close.setHidden(false);
				// reachs_close.setSrc("./resources/images/symbol/btn_num"+me.stCnt+".png");
				//reachs_close.setSrc("")

				/*var reachCountToolbar = Ext.getCmp("reachCountToolbar");
				if(reachCountToolbar != undefined){
					reachCountToolbar.items.items[0].setValue(me.stCnt);
				}*/

			}

			if (me.drawOption == "endPoint") {

				// 시작위치 하천명 셋팅
				SetStEdSiteName("end", siteNms[i]);
				me.endName = siteNms[i];
				// 끝위치 KRAD Event 배열 넣기
				me.edEvtArr.push(evt.graphic);

				// 끝위치 RCH_ID 배열 넣기
				me.edRchIds.push(rchIds[i]);

				if (rchDid != "") {

					var idx = me.edRchDids.indexOf(rchDid);
					if (idx == -1) {
						me.edRchDids.push(rchDid);
					}
				}

				// 끝위치 이벤트 타입 배열 넣기 (Reach, Point, Line 등)
				me.edEvtTypes.push(eventType);

				//끝 카운트
				//me.edCnt++;

				var reache_close = Ext.getCmp("reache_close");
				reache_close.setHidden(false);
				reache_close.setSrc("./resources/images/symbol/btn_num" + me.edCnt + ".png");

				/*var reachCountToolbar = Ext.getCmp("reachCountToolbar");
				
				if(reachCountToolbar != undefined){
					reachCountToolbar.items.items[1].setValue(me.edCnt);
				}*/
			}

			if (rchDid != "") {
				// 하류 및 공통하류 셋팅
				me.setDownAndComm([rchDid], [], 0, "RCH_DID");

			}
			else {
				// 하류 및 공통하류 셋팅
				me.setDownAndComm(rchIds, [], 0, "RCH_ID");

			}
		}
	},
	/* 심볼그리기 */
	drawSymbol: function (evt) {

		var me = this;

		if (me.drawOption == "startPoint" || me.drawOption == "endPoint") {

			require(["esri/graphic"], function (Graphic) {

				var graphic = null;
				var subGraphic = null; //미니맵 그래픽
				var btnId = null;

				if (me.drawOption == "startPoint") {
					btnId = "btnMenu04";
					if (me.checkSubMap()) {
						subGraphic = new Graphic(evt, $KRF_APP.subMap._krad.stSymbol);
					}

					graphic = new Graphic(evt, me.stSymbol);
				}
				if (me.drawOption == "endPoint") {
					btnId = "btnMenu05";
					if (me.checkSubMap()) {
						subGraphic = new Graphic(evt, $KRF_APP.subMap._krad.edSymbol);
					}
					graphic = new Graphic(evt, me.edSymbol);
				}


				me.symGrpLayer.add(graphic); // 그래픽 추가
				if (me.checkSubMap()) {
					$KRF_APP.subMap._krad.symGrpLayer.add(subGraphic); // 미니맵 그래픽 추가
				}



				// 커서 디폴트
				Ext.get('_mapDiv__gc').setStyle('cursor', 'default');
				if (me.checkSubMap()) {
					Ext.get('_subMapDiv__gc').setStyle('cursor', 'default');
				}



				// 버튼 off
				SetBtnOnOff(btnId, "on");
			});
		}
	},

	//미니맵이 켜져있는지 확인
	checkSubMap: function () {
		var check = false;
		if (Ext.get('_subMapDiv__gc')) {
			check = true;
		}
		return check;
	},

	removeLastSymbol: function () {

		// 마지막 심볼 삭제 (2개 삭제)
		this.symGrpLayer.remove(this.symGrpLayer.graphics[this.symGrpLayer.graphics.length - 2]);
		this.symGrpLayer.remove(this.symGrpLayer.graphics[this.symGrpLayer.graphics.length - 1]);
	},
	chkGeoTrib: function (geoTrib) {

		/** 검색설정(본류, 지류) 체크 **/
		var confInfo = localStorage['_searchConfigInfo_'];
		if (confInfo != undefined && confInfo != null) {

			var jsonConf = JSON.parse(confInfo);

			// 지류검색이 아닐때
			if (jsonConf.isJiDraw == false) {

				if (geoTrib != 0) {

					return false;
				}
			}
		}

		return true;
		/** 검색설정(본류, 지류) 체크 끝 **/
	},
	/* 하류 및 공통하류 셋팅 */
	setDownAndComm: function (rchIds, tmpArr, cnt, colNm) {

		var me = this;
		require(["esri/tasks/query",
			"esri/tasks/QueryTask"],
			function (Query,
				QueryTask) {

				var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
				var query = new Query();
				query.returnGeometry = true;
				//query.outFields = ["*"];
				query.outFields = ["CAT_DID",
					"RCH_DID",
					"RD_RCH_DID",
					"LD_RCH_DID",
					"GEO_TRIB",
					"LU_RCH_DID",
					"RU_RCH_DID"];

				query.where = colNm;

				/*if(cnt == 0){
					
					query.where = "RCH_ID ";
				}
				else{
					
					query.where = "RCH_DID ";
				}*/

				query.where += " IN ("

				for (var i = 0; i < rchIds.length; i++) {

					query.where += "'" + rchIds[i] + "', ";
				}

				query.where = query.where.substring(0, query.where.length - 2) + ")";


				// 리치라인 조회
				queryTask.execute(query, function (featureSet) {

					if (featureSet.features.length > 0) {

						for (var fCnt = 0; fCnt < featureSet.features.length; fCnt++) {

							var feature = featureSet.features[fCnt];
							var rchDid = feature.attributes.RCH_DID;
							//tmpArr를 map으로 돌려(tmpArr에 attributes.RCH_DID) rchDid와 같은게 있는지 확인
							var tmpIdx = tmpArr.map(function (obj) {
								return obj.attributes.RCH_DID;
							}).indexOf(rchDid);

							if (tmpIdx == -1) {

								/* khLee 하류 그래픽 그리기 (필요없을때 삭제(주석) 요..) */
								/*feature.setSymbol(me.drawSymbol_D);
								me.downGrpLayer.add(feature);*/
								/* 하류 그래픽 그리기 끝 */

								cnt++;

								var isEndLD = false;
								var isEndRD = false;

								tmpArr.push(feature);

								var ldRchDid = feature.attributes.LD_RCH_DID;
								if (ldRchDid != undefined && ldRchDid.trim() != "") {

									// 좌측 하류 검색 (재귀호출)
									me.setDownAndComm([ldRchDid], tmpArr, cnt, "RCH_DID");
								}
								else {

									// 좌측하류 검색 종료
									isEndLD = true;
								}

								var rdRchDid = feature.attributes.RD_RCH_DID;
								if (rdRchDid != undefined && rdRchDid.trim() != "") {

									// 우측 하류 검색 (재귀호출)
									me.setDownAndComm([rdRchDid], tmpArr, cnt, "RCH_DID");
								}
								else {

									// 우측하류 검색 종료
									isEndRD = true;
								}


								// 좌/우측 하류 검색 종료 시
								if (isEndLD == true && isEndRD == true) {

									// 하류라인 지우기
									if (me.drawOption == "reachLineRemove") {

										// 집수구역 선택된곳에 첫번째 하류를 찾는 function
										me.findReachLineTmp(tmpArr, 0, false);


									};

									/* 좌/우측 하류 동시 존재 시 한번만 입력되도록 push 플래그 설정 */
									var isPush = true;


									//  me.arrDownGrp = 시작지점 끝지점이 완료된후
									// 시작지점 끝지점이 동일할경우 break
									for (var dnCnt = 0; dnCnt < me.arrDownGrp.length; dnCnt++) {
										if (me.arrDownGrp[dnCnt][0].attributes.RCH_DID == tmpArr[0].attributes.RCH_DID) {
											isPush = false;
											break;
										}
									}
									/* 좌/우측 하류 동시 존재 시 한번만 입력되도록 push 플래그 설정 끝 */

									var lastIdx = -1;
									//시작지점 끝지점 루프돌면서 각 해당하는 리치아이디를 찾아낸다?? 만약없으면?
									for (var dnCnt = 0; dnCnt < me.arrDownGrp.length; dnCnt++) {
										var isBreak = false;

										for (var tmpCnt = 0; tmpCnt < tmpArr.length; tmpCnt++) {

											var tmpRchDid = tmpArr[tmpCnt].attributes.RCH_DID;
											var commIdx = me.arrDownGrp[dnCnt].map(function (obj) {
												return obj.attributes.RCH_DID;
											}).indexOf(tmpRchDid);
											if (commIdx > -1) {
												var cIdx = me.arrCommGrp.map(function (obj) {
													return obj.attributes.RCH_DID;
												}).indexOf(tmpRchDid);

												if (cIdx == -1) {

													// 좌/우측 하류 동시 존재 시 한번만 입력되도록..
													if (isPush == true) {
														// 공통 하류 배열 담기..
														me.arrCommGrp.push(tmpArr[tmpCnt]);

													} else {//isPush 시작지점과 끝지점이 같을시
														//console.info("else");
														//me.sRiverDraw(tmpArr[0]);
													}
												}

												// tmpCnt : 좌/우 측 하류 번호    lastIdx : 동일 하류번호
												if (tmpCnt > lastIdx) {

													lastIdx = tmpCnt;
												}

												//루프 멈춤
												isBreak = true;
												break;
											}
										}

										if (isBreak = true) {

											break;
										}
									}

									if (lastIdx > -1) {
										// 시작위치, 끝위치 선택 완료 시

										if (me.stRchIds.length > 0 && me.edRchIds.length > 0) {

											if (me.stRchIds == me.edRchIds) {
												me.sRiverDraw(tmpArr[0]);
											} else {
												for (var i = 0; i < me.arrCommGrp.length; i++) {

													var commRchDid = me.arrCommGrp[i].attributes.RCH_DID;
													var commGeoTrib = me.arrCommGrp[i].attributes.GEO_TRIB;

													var isGeoTrib = me.chkGeoTrib(commGeoTrib);
													if (isGeoTrib == false) {

														alert("선택된 시작위치, 끝위치 사이에 본류가 흐르지 않습니다.\r\n검색설정을 확인하세요.");
														// 마지막 심볼 삭제
														me.removeLastSymbol();
														return;
													} else {

														//#####




														SetBtnOnOff("btnMenu04", "off");
														SetBtnOnOff("btnMenu05", "off");
														//버튼 off




														//시작지점 끝지점 공통하류 존재시 option 줄곳

														//공통 하류 rchDid 담기
														me.cmDnRchDid.push(tmpRchDid);

														//공통 하류 지점에 우측상류
														me.cmRiRchDid.push(tmpArr[tmpCnt].attributes.LU_RCH_DID);

														//공통 하류 지점에 좌측상류
														me.cmLeRchDid.push(tmpArr[tmpCnt].attributes.RU_RCH_DID);

														// 상류 검색
														me.setReachUpLine(commRchDid, 0, false);

														// 종료 검색 체크
														me.isStopCheck();

													}
												}
											}


										}

									}
									else {

										if (me.arrDownGrp.length > 0) {

											alert("위치간 만나는 하류가 없습니다.");
											// 마지막 심볼 삭제
											me.removeLastSymbol();

											//만나는 하류가 없을시 버튼 되돌리기
											SetBtnOnOff("btnMenu04", "off");
											SetBtnOnOff("btnMenu05", "off");


											me.clickFS = [];
											me.clearVariable();


											return;
										}
									}

									// 좌/우측 하류 동시 존재 시 한번만 입력되도록..
									if (isPush == true) {
										// 하류 그래픽 배열에 담기
										me.arrDownGrp.push(tmpArr);

									}
								}
							}
						}
					}
				});
			});
	},
	searchCnt: 0, // 검색 카운트

	//선택된 집수구역에 가장 첫번째 집수구역을 찾는 function
	findReachLineTmp: function (tmpArr) {
		var me = this;
		var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;

		var firstLine = "";
		var firstGeo = "";
		var firstAttributes = "";
		var firstBon = true;
		me.removeFirstLine = tmpArr[0].attributes.CAT_DID;

		//클릭된 하천에서 선택된 리치중에 가장 처음 유입되는 하류를 찾는 로직
		for (var i = 0; i < tmpArr.length; i++) {
			var tmpValue = reachAdmin.arrLineGrp.map(function (e) {
				return e.attributes.CAT_DID;
			}).indexOf(tmpArr[i].attributes.CAT_DID);


			if (tmpValue == -1) {
				firstAttributes = tmpArr[i].attributes;
				firstLine = tmpArr[i].attributes.CAT_DID;
				me.firstLine = tmpArr[i].attributes.CAT_DID;
				firstGeo = tmpArr[i].attributes.GEO_TRIB;
			}
			if (firstLine != "") {
				break;
			}

		}



		//본류를 찾기 0번째 라인에서부터 본류를 만나면 클릭된 하천이 본류 // 아니면 지류 (지류일때 동작 로직)
		for (var k = 0; k < tmpArr.length; k++) {
			if (tmpArr[k].attributes.GEO_TRIB == firstAttributes.GEO_TRIB) {
				//console.info("배열중에 클릭 geo와 본류 geo")
				console.info(tmpArr[k].attributes);
				if (k != 0) {
					//본류를 만났을때 본류에서 우측상류인지 죄측상류인지 확인하기위해 본류 전단계와 본류 좌우측 상류 비교
					if (tmpArr[k - 1].attributes.CAT_DID == tmpArr[k].attributes.LU_RCH_DID) {//좌측일까??
						me.firstBonBreak = tmpArr[k].attributes.RU_RCH_DID;
					} else if (tmpArr[k - 1].attributes.CAT_DID == tmpArr[k].attributes.RU_RCH_DID) {
						me.firstBonBreak = tmpArr[k].attributes.LU_RCH_DID;
					} else {
						console.info("없음");
					}
				}
				break;
			}
		};
		// console.info("removeFirstLine:"+me.removeFirstLine)
		// console.info("firstBonBreak:"+me.firstBonBreak);
		// console.info("firstLine:"+firstLine);
		if (firstLine != "") {
			// 상류 찾기
			me.setReachUpLineTmp(firstLine);
		}
	},

	//임시 하류삭제를 위한 조회
	setReachUpLineTmp: function (catDid) {
		var me = this;
		var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;
		var breakFor = false;
		//me.firstBonBreak

		require(["esri/tasks/query", "esri/tasks/QueryTask"],
			function (Query, QueryTask) {


				var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
				var query = new Query();
				query.returnGeometry = true;
				query.outFields = ["CAT_DID",
					"RD_RCH_DID",
					"LD_RCH_DID",
					"LU_RCH_DID",
					"RU_RCH_DID"];
				query.where = "RCH_DID = '" + catDid + "'";

				// 리치라인 조회
				queryTask.execute(query, function (featureSet) {

					if (featureSet.features.length > 0) {

						//그려진 집수구역에서 지금 찾은 상류중라인이 있는지 없는지 확인 
						var tmpValue = reachAdmin.arrLineGrp.map(function (e) {
							return e.attributes.CAT_DID;
						}).indexOf(featureSet.features[0].attributes.CAT_DID);

						//가장 처음 하류 라인에서 띄어 넘고 그다음 집수구역중에 끊어지는 라인에서 return;						
						if (tmpValue == -1) {
							if (me.firstLine != featureSet.features[0].attributes.CAT_DID) {
								me.firstLine = null; //초기화
								return;
							}
						}


						for (var i = 0; i < reachAdmin.arrLineGrp.length; i++) {
							if (reachAdmin.arrLineGrp[i].attributes.CAT_DID == featureSet.features[0].attributes.CAT_DID) {
								//선택된 리치에서 본류를 찾아서 반대편 상류에서 break후 return;
								if (me.firstBonBreak == featureSet.features[0].attributes.CAT_DID) {
									me.firstBonBreak = null;
									return;
								}

								me.removeGraphic(featureSet.features[0], "reachLine");
								me.removeGraphic(featureSet.features[0], "reachArea");
								breakFor = true;
							}

							if (breakFor) {
								break;
							}


						}

						//클릭지점이 넘어서면 return;
						if (me.removeFirstLine == featureSet.features[0].attributes.CAT_DID) {
							return;
						}

						if (featureSet.features[0].attributes.LU_RCH_DID != "" || featureSet.features[0].attributes.LU_RCH_DID != undefined || featureSet.features[0].attributes.LU_RCH_DID != null) {
							me.setReachUpLineTmp(featureSet.features[0].attributes.LU_RCH_DID);
						}

						if (featureSet.features[0].attributes.RU_RCH_DID != "" || featureSet.features[0].attributes.RU_RCH_DID != undefined || featureSet.features[0].attributes.RU_RCH_DID != null) {
							me.setReachUpLineTmp(featureSet.features[0].attributes.RU_RCH_DID);
						}




						//me.removeGraphic(tmpArr[i], "reachLine");						

					}
				})
			});

	},


    /* 상류 리치라인 조회 및 그리기
     * rchDid: 검색될 리치 아이디(DID)
     * cnt: 상류검색 카운트 */
	setReachUpLine: function (rchDid, cnt) {

		var me = this;

		/* 초기화 시 검색 종료 */
		//if(me.searchStopCheck(cnt) == false){ return false };

		me.searchCnt++; // 검색 카운트 증가

		rchDid = rchDid.replace(/ /gi, "");

		if (rchDid == "") {

			return;
		}

		require(["esri/tasks/query",
			"esri/tasks/QueryTask"],
			function (Query,
				QueryTask) {

				var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
				var query = new Query();
				query.returnGeometry = true;
				//query.outFields = ["*"];
				query.outFields = ["CAT_DID",
					"RCH_ID",
					"RCH_DID",
					"RD_RCH_DID",
					"LD_RCH_DID",
					"GEO_TRIB",
					"LU_RCH_DID",
					"RU_RCH_DID",
					"RIV_NM"];
				query.where = "RCH_DID = '" + rchDid + "'";

				// 리치라인 조회
				queryTask.execute(query, function (featureSet) {

					if (featureSet.features.length > 0) {

						var feature = featureSet.features[0];
						var rchId = feature.attributes.RCH_ID; //KRF 리치 아이디
						var rchDid = feature.attributes.RCH_DID; // 분활코드 아이디
						var catDid = feature.attributes.CAT_DID; //집수구역 분활코드
						var geoTrib = feature.attributes.GEO_TRIB; //하천차수

						var stIdx = me.stRchIds.indexOf(rchId); //시작위치 리치아이디	 
						var edIdx = me.edRchIds.indexOf(rchId);	//끝위치 리치아이디
						var stDidx = me.stRchDids.indexOf(rchDid);
						var edDidx = me.edRchDids.indexOf(rchDid);

						var fal1Did = me.falseDid1.indexOf(rchDid);
						var fal2Did = me.falseDid2.indexOf(rchDid);

						//var falseDid = 

						var kradUpDown = "";
						var evtType = "";
						var isSearch = false;

						/* 검색, 그리기 조건 설정 */
						var evtType = "";
						var arrIdx = -1; // 배열 인덱스
						var eLineIdx = -1; // 라인 이벤트 인덱스
						var dnIdx = -1;
						for (var i = 0; i < me.arrDownGrp.length; i++) {

							// 하류 배열 인덱스
							dnIdx = me.arrDownGrp[i].map(function (obj) {
								return obj.attributes.RCH_DID;
							}).indexOf(rchDid);
							if (dnIdx > -1) {

								break;
							}
						}



						if (cnt == 0) {

							//me.sRiverLineArray //소하천 배열
							if (me.sRiverLineArray.length > 0) {
								for (var sRiver = 0; sRiver < me.sRiverLineArray.length; sRiver++) {
									me.drawGraphic(me.sRiverLineArray[sRiver], "reachLine_s");
								}
								//me.drawGraphic(me.sRiverAreaArray[sRiver], "reachArea_s");
							}
							if (me.sRiverAreaArray.length > 0) {
								for (var sRiverArea = 0; sRiverArea < me.sRiverAreaArray.length; sRiverArea++) {
									me.drawGraphic(me.sRiverAreaArray[sRiverArea], "reachArea_s");
								}
							}




							if (me.clickFS[0] == "startPoint") {
								me.arrDownGrpStart = 0;
								me.arrDownGrpEnd = 1;
							} else if (me.clickFS[1] == "startPoint") {
								me.arrDownGrpStart = 1;
								me.arrDownGrpEnd = 0;
							}

							//,시작지점 끝지점 판별후 다음 사용을 위해 리셋
							me.clickFS = [];

							me.arrCnt++;

							var textSearchText_Start = Ext.getCmp("textSearchText_Start").value;
							var textSearchText_End = Ext.getCmp("textSearchText_End").value;

							//검색이 되는 경우 countInfo배열에 정보 담기 (cntNum : 검색순서 / stNm : 시작지점명청 / edNm : 끝지점명청)
							//me.countInfo.push({'cntNum':me.arrCnt, 'stNm':textSearchText_Start,'edNm':textSearchText_End});



							// 1.본류가 흐르는지 지류가 호르는지 찾는다 지류대  2.지류 대 지류 검색시 공통하류에서 좌측 / 우측 상류를 bonLine에 담는다.
							for (var arrList = 0; arrList < me.arrDownGrp[me.arrDownGrpStart].length; arrList++) {
								if (me.arrDownGrp[me.arrDownGrpStart][arrList].attributes.RCH_DID == me.cmRiRchDid ||
									me.arrDownGrp[me.arrDownGrpStart][arrList].attributes.RCH_DID == me.cmLeRchDid) { //공통하류의 오른쪽 상류 아이디

									me.bonStLine = me.arrDownGrp[me.arrDownGrpStart][arrList].attributes;
									if (me.arrDownGrp[me.arrDownGrpStart][arrList].attributes.GEO_TRIB == 0) {
										me.isNotBon1 = false;
									} else {
										me.isNotBon1 = true;
									}
								}
							}


							for (var arrList2 = 0; arrList2 < me.arrDownGrp[me.arrDownGrpEnd].length; arrList2++) {
								if (me.arrDownGrp[me.arrDownGrpEnd][arrList2].attributes.RCH_DID == me.cmRiRchDid ||
									me.arrDownGrp[me.arrDownGrpEnd][arrList2].attributes.RCH_DID == me.cmLeRchDid) {  //공통하류의 왼쪽 상류 아이디

									me.bonEnLine = me.arrDownGrp[me.arrDownGrpEnd][arrList2].attributes;
									if (me.arrDownGrp[me.arrDownGrpEnd][arrList2].attributes.GEO_TRIB == 0) {
										me.isNotBon2 = false;
									} else {
										me.isNotBon2 = true;
									}

								}
							}



							if (me.isNotBon1 == true && me.isNotBon2 == true) {
								me.isNotBon = true;
							} else {
								me.isNotBon = false;
							}



							var startArrayCut = [];
							var endArrayCut = [];

							for (var a = 0; a < me.arrDownGrp[me.arrDownGrpStart].length; a++) {
								if (me.arrDownGrp[me.arrDownGrpStart][a].attributes.GEO_TRIB == me.bonStLine.GEO_TRIB) {

									startArrayCut.push(a);
								}
							}

							for (var b = 0; b < me.arrDownGrp[me.arrDownGrpEnd].length; b++) {
								if (me.arrDownGrp[me.arrDownGrpEnd][b].attributes.GEO_TRIB == me.bonEnLine.GEO_TRIB) {

									endArrayCut.push(b);
								}
							}



							var linefalse1 = false;
							var linefalse2 = false;

							if (endArrayCut[0] != undefined) {
								var point2bonRchDid = me.arrDownGrp[me.arrDownGrpEnd][endArrayCut[0]].attributes.RCH_DID; // 하류를 따라가다 가장처음만나는 본류1
								me.arr2RRchDid = me.arrDownGrp[me.arrDownGrpEnd][endArrayCut[0]].attributes.LU_RCH_DID;
								me.arr2LRchDid = me.arrDownGrp[me.arrDownGrpEnd][endArrayCut[0]].attributes.RU_RCH_DID;

								for (var d = 0; d < me.arrDownGrp[me.arrDownGrpEnd].length; d++) {
									if (me.arrDownGrp[me.arrDownGrpEnd][d].attributes.RCH_DID == me.arr2RRchDid) {
										linefalse2 = true;
									}
								}

								if (linefalse2 == false) {
									me.falseDid2 = me.arr2RRchDid;
								} else {
									me.falseDid2 = me.arr2LRchDid;
								}
							}


							if (startArrayCut[0] != undefined) {
								var point1bonRchDid = me.arrDownGrp[me.arrDownGrpStart][startArrayCut[0]].attributes.RCH_DID; // 하류를 따라가다 가장처음만나는 본류2
								me.arr1RRchDid = me.arrDownGrp[me.arrDownGrpStart][startArrayCut[0]].attributes.LU_RCH_DID;
								me.arr1LRchDid = me.arrDownGrp[me.arrDownGrpStart][startArrayCut[0]].attributes.RU_RCH_DID;

								for (var c = 0; c < me.arrDownGrp[me.arrDownGrpStart].length; c++) {
									if (me.arrDownGrp[me.arrDownGrpStart][c].attributes.RCH_DID == me.arr1RRchDid) {
										linefalse1 = true;
									}
								}

								if (linefalse1 == false) {
									me.falseDid1 = me.arr1RRchDid;
								} else {
									me.falseDid1 = me.arr1LRchDid;
								}
							}





						}

						// 최초 검색된 하류에 속해있거나 본류가 아니면 검색 계속..
						// 본류이면서 검색된 하류에 속해있지 않으면 검색 안함
						if (dnIdx > -1 || geoTrib != 0) {

							// 공통 하류는 그리지 않음 (cnt == 0)
							if (cnt > 0) {

								evtType = "Reach";
							}

							/* 라인 이벤트 그래픽 판단 */
							for (arrIdx = 0; arrIdx < me.arrEvtLineGrp.length; arrIdx++) {

								eLineIdx = me.arrEvtLineGrp[arrIdx].map(function (obj) {

									return obj.attributes.RCH_ID;
								}).indexOf(rchId);

								if (eLineIdx > -1) {

									evtType = "Line";

									break;
								}
							}
							/* 라인 이벤트 그래픽 판단 끝 */

							isSearch = true;
						}

						// 시작위치 또는 끝위치 일때
						//if(me.isNotBon){
						if (stDidx != -1 || edDidx != -1 || stIdx != -1 || edIdx != -1 || rchDid == me.falseDid1 || rchDid == me.falseDid2) {

							if (stIdx > -1) { // 시작위치 일 때

								evtType = me.stEvtTypes[stIdx];
							}
							else if (edIdx > -1) { // 끝위치 일 때

								evtType = me.edEvtTypes[edIdx];
							}


							if (cnt == 0) {

								isSearch = true;
								kradUpDown = "up";
							} else {

								if (evtType != "Reach") {
									isSearch = false;
								} else {
									if (stDidx != -1 || edDidx != -1) {
										isSearch = false;
									}

									if (rchDid == me.falseDid1 || rchDid == me.falseDid2) {
										if (me.falseDid1 == me.stRchDids || me.falseDid1 == me.edRchDids
											|| me.falseDid2 == me.stRchDids || me.falseDid2 == me.edRchDids) {
											isSearch = true;
										} else {
											isSearch = false;
										}

									}

								}



								kradUpDown = "down";
							}

						}

						if (stDidx != -1 || edDidx != -1 || stIdx != -1 || edIdx != -1) {

							if (stIdx > -1) { // 시작위치 일 때

								evtType = me.stEvtTypes[stIdx];
							}
							else if (edIdx > -1) { // 끝위치 일 때

								evtType = me.edEvtTypes[edIdx];
							}

							if (cnt == 0) {

								isSearch = true;
								kradUpDown = "up";
							} else {

								if (evtType != "Reach") {
									isSearch = false;
								} else {
									if (stDidx != -1 || edDidx != -1) {
										isSearch = false;
									}
								}

								if (rchDid == me.falseDid1 || rchDid == me.falseDid2) {
									isSearch = false;
								}

								kradUpDown = "down";
							}

						}
						//}


						/* 검색, 그리기 조건 설정 끝 */
						var isGeoTrib = me.chkGeoTrib(geoTrib);

						if (isGeoTrib == false) {
							evtType = "none";
						}


						// 이벤트 타입에 따라 그리기 유형 다르게.. ***********
						if (evtType == "Reach") {
							// 그래픽 그리기

							if (rchDid != me.falseDid1 && rchDid != me.falseDid2) {
								me.drawGraphic(feature, "reachLine");
								// 집수구역 그리기
								me.setReachArea(catDid);
							}




						}
						else if (evtType == "Point") {

							// KRAD 라인, 집수구역 조회 및 그리기
							me.setKradPointGrp(rchId, kradUpDown);
						}
						else if (evtType == "Line") {

							if (arrIdx > -1 && eLineIdx > -1) {
								////console.info(rchDid);
								// 그래픽 그리기
								me.drawGraphic(me.arrEvtLineGrp[arrIdx][eLineIdx], "kradLine");

								var evtId = me.arrEvtLineGrp[arrIdx][eLineIdx].attributes.LINE_EVENT_ID;
								var extId = me.arrEvtLineGrp[arrIdx][eLineIdx].attributes.EXT_DATA_ID;

								// 시작위치 또는 끝위치 일때
								if (stIdx != -1 || edIdx != -1) {
									////console.info("dd");
									// 라인이벤트 집수구역 그리기
									me.setKradAreaGrp(evtId, extId);
								}
								else {

									// 집수구역 그리기
									me.setReachArea(catDid);
								}
							}
						}


						if (isSearch == true) {

							cnt++;
							var luRchDid = feature.attributes.LU_RCH_DID;

							if (luRchDid != undefined && luRchDid.trim() != "") {
								// 좌측 상류 검색 (재귀호출)
								me.setReachUpLine(luRchDid, cnt);

							}

							var ruRchDid = feature.attributes.RU_RCH_DID;

							if (ruRchDid != undefined && ruRchDid.trim() != "") {
								// 우측 상류 검색 (재귀호출)
								me.setReachUpLine(ruRchDid, cnt);
							}
						}
						else {
							////console.info(me.arrDownGrp);
						}
					}
				});
			});
	},
	tmpSearchCnt: 0, // 검색 카운트 체크용
	afterChkCnt: 0, // 목록창, 결과창 띄운 후 체크 카운트
	// 검색 종료 체크
	isStopCheck: function () {
		var me = this;
		var originTimer = null;
		var checkedTimer = null;

		// 타이머 돌리기 0.2초
		originTimer = setInterval(chkCnt = function () {

			// 검색 카운트 같으면
			if (me.searchCnt == me.tmpSearchCnt) {

				if (originTimer != null) {
					// 타이머 중지
					clearInterval(originTimer);
					me.clearVariable();

				}

				// 지점 목록 창 띄우기
				//Ext.ShowSiteListWindow("selectReach");
				$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, { searchText: 'selectReach' });

				// 검색결과 창 띄우기
				ShowSearchResultReach("");

				// 임시 그래픽 이벤트 종료
				me.offTmpGrpEvt();
				me.tmpGrpLayer.clear();

				// 0.5초 뒤에 실행 체크했을때도 같으면
				Ext.defer(clear = function () {

					if (me.searchCnt == me.tmpSearchCnt) {

						// 0.2초 단위 타이머
						var checkedTimer = setInterval(afterChk = function () {

							me.afterChkCnt++;

							// 타이머 작동 10초 뒤 타이머 종료
							if (me.afterChkCnt >= 10) {

								if (checkedTimer != null) {
									clearInterval(checkedTimer);
								}

								me.afterChkCnt = 0;
							}
							else {

								// 결과 창 띄운 후 10초간 검색 카운트에 변화 있으면 재귀호출
								if (me.searchCnt != me.tmpSearchCnt) {

									if (checkedTimer != null) {
										clearInterval(checkedTimer);
									}

									me.isStopCheck();
								}
							}
						}, 1000);
					}
					else {

						if (originTimer != null) {
							// 타이머 중지
							clearInterval(originTimer);

						}

						if (checkedTimer != null) {
							clearInterval(checkedTimer);
						}

						me.isStopCheck();
					}
				}, 1000, this);
			}
			else {

				// 검색카운트 다르면 체크용 변수에 저장
				me.tmpSearchCnt = me.searchCnt;
			}
		}, 1000);
	},


	getSRiverCatId: function (feature) {

		var me = this;

		var sCatId = feature.attributes.SCAT_ID;

		require(["esri/tasks/query",
			"esri/tasks/QueryTask"], function (Query, QueryTask) {

				var queryTask = new QueryTask($KRF_DEFINE.sRiver + "/" + $KRF_DEFINE.sRiverCat); // 소하천집수구역 URL
				var query = new Query();
				query.returnGeometry = true;
				query.outFields = ["*"];

				query.where = "SCAT_ID = '" + sCatId + "'";

				// 집수구역 조회
				queryTask.execute(query, function (featureSet) {

					if (featureSet.features.length > 0) {

						me.sRiverAreaArray.push(featureSet.features[0]);

					}



				});
			});


	},

	sRiverDraw: function (array) {

		var me = this;

		var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;
		me.drawGraphic2(array, me.reachLineSym, me.lineGrpLayer, me.arrLineGrp, reachAdmin.arrLineGrp);


		var me = this;

		require(["esri/tasks/query",
			"esri/tasks/QueryTask"], function (Query, QueryTask) {
				var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachAreaLayerId); // 집수구역 URL
				var query = new Query();
				query.returnGeometry = true;
				query.outFields = ["CAT_DID", "CAT_ID"];
				query.where = "CAT_DID = '" + array.attributes.CAT_DID + "'";
				// 집수구역 조회
				queryTask.execute(query, function (featureSet) {
					if (featureSet.features.length > 0) {
						me.drawGraphic2(featureSet.features[0], me.reachAreaSym, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp);
					}
				});
			});


		//me.sRiverLineArray //소하천 배열
		if (me.sRiverLineArray.length > 0) {
			for (var sRiver = 0; sRiver < me.sRiverLineArray.length; sRiver++) {
				me.drawGraphic(me.sRiverLineArray[sRiver], "reachLine_s");
			}
		}

		if (me.sRiverAreaArray.length > 0) {
			for (var sRiverArea = 0; sRiverArea < me.sRiverAreaArray.length; sRiverArea++) {
				me.drawGraphic(me.sRiverAreaArray[sRiverArea], "reachArea_s");
			}
		}

		//isStopCheck
		me.isStopCheck();
	},






	/* 그래픽 그리기 */
	drawGraphic: function (graphic, grpType) {

		var me = this;
		var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;
		if (grpType == "reachLine") {

			me.drawGraphic2(graphic, me.reachLineSym, me.lineGrpLayer, me.arrLineGrp, reachAdmin.arrLineGrp);
		}


		////////////////////////////////////////////////////////////////////////////////////////////////
		//리치제거 tmp 임시로 그래픽 그리고 삭제완료할떄 한번에 삭제
		if (grpType == "removeReachLine") {

			me.drawGraphic2(graphic, me.removeReachLineSym, me.tmpGrpLayer, me.arrLineGrpTmp, reachAdmin.arrLineGrpTmp);
		}

		if (grpType == "removeReachArea") {

			me.drawGraphic2(graphic, me.removeReachAreaSym, me.tmpGrpLayer, me.arrAreaGrpTmp, reachAdmin.arrAreaGrpTmp);
		}

		////////////////////////////////////////////////////////////////////////////////////////////////
		//리치추가 tmp
		if (grpType == "addReachLine") {

			me.drawGraphic2(graphic, me.addReachLineSym, me.lineGrpLayer, me.arrLineGrpTmp, reachAdmin.arrLineGrpTmp);
		}

		if (grpType == "addReachArea") {

			me.drawGraphic2(graphic, me.addReachAreaSym, me.areaGrpLayer, me.arrAreaGrpTmp, reachAdmin.arrAreaGrpTmp);
		}

		////////////////////////////////////////////////////////////////////////////////////////////////

		//소하천
		if (grpType == "reachLine_s") {

			me.drawGraphic2_s(graphic, me.reachLineSym_s, me.lineGrpLayer_s, me.arrLineGrp_s, reachAdmin.arrLineGrp);
		}

		if (grpType == "reachArea_s") {

			me.drawGraphic2_s(graphic, me.reachAreaSym_s, me.areaGrpLayer_s, me.arrAreaGrp_s, reachAdmin.arrAreaGrp);
		}
		//////////////////////////////////////////////////////////////////////////////////////////////




		if (grpType == "reachArea") {

			me.drawGraphic2(graphic, me.reachAreaSym, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp);
		}

		if (grpType == "kradLine") {

			me.drawGraphic2(graphic, me.drawSymbol_L, me.lineGrpLayer, me.arrLineGrp, reachAdmin.arrLineGrp);
		}

		if (grpType == "kradArea") {

			me.drawGraphic2(graphic, me.drawSymbol_A, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp);
		}

		if (grpType == "kradEmpty") {

			me.drawGraphic2(graphic, me.drawSymbol_empty, me.areaGrpLayer, [], []);
		}
	},


	drawGraphic2_s: function (graphic, symbol, layer, arrObj, reachArr) {

		var me = this;

		//subMap 레이어 올리기 ( ** object copy ** );
		if (me.checkSubMap()) { // 미니맵이 켜져있는지 확인
			me.subMapLayerDraw(layer, symbol, graphic);
		}

		// 그래픽 그린다.
		graphic.setSymbol(symbol);
		layer.add(graphic);
		// 배열에 넣기
		arrObj.push(graphic);
		// 리치 배열 넣기
		reachArr.push(graphic);

	},

	drawGraphic2: function (graphic, symbol, layer, arrObj, reachArr) {

		var me = this;

		var currId = graphic.attributes.LINE_EVENT_ID != undefined ? graphic.attributes.LINE_EVENT_ID :
			(graphic.attributes.AREA_EVENT_ID != undefined ? graphic.attributes.AREA_EVENT_ID :
				(graphic.attributes.RCH_DID != undefined ? graphic.attributes.RCH_DID :
					(graphic.attributes.RCH_ID != undefined ? graphic.attributes.RCH_ID : graphic.attributes.CAT_DID)));

		var idx = arrObj.map(function (obj) {

			var objId = obj.attributes.LINE_EVENT_ID != undefined ? obj.attributes.LINE_EVENT_ID :
				(obj.attributes.AREA_EVENT_ID != undefined ? obj.attributes.AREA_EVENT_ID :
					(obj.attributes.RCH_DID != undefined ? obj.attributes.RCH_DID :
						(obj.attributes.RCH_ID != undefined ? obj.attributes.RCH_ID :
							obj.attributes.CAT_DID)));

			return objId;
		}).indexOf(currId);

		if (idx == -1) {


			//subMap 레이어 올리기 ( ** object copy ** );
			if (me.checkSubMap()) {// 미니맵이 켜져있는지 확인
				me.subMapLayerDraw(layer, symbol, graphic);
			}


			// 그래픽 그린다.
			graphic.setSymbol(symbol);
			layer.add(graphic);

			// 배열에 넣기
			arrObj.push(graphic);
			// 리치 배열 넣기
			reachArr.push(graphic);
		}
	},

	//미니맵 레이어 
	subMapLayerDraw: function (layer, symbol, graphic) {

		var subGraphic = $.extend({}, graphic);
		var subSymbol = $.extend({}, symbol);

		subGraphic.setSymbol(subSymbol);


		console.info(layer.id);
		if (layer.id != "tmpGrpLayer") {
			//if(layer.id != "tmpGrpLayer" || layer.id !=  "areaGrpLayer_s" || layer.id !=  "lineGrpLayer_s"){
			$KRF_APP.subMap._krad[layer.id + "_sub"].add(subGraphic);
		}


	},

	clone: function (obj) {

		if (obj === null || typeof (obj) !== 'object') {

			return obj;
		}

		var copy = obj.constructor();

		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				copy[attr] = obj[attr];
			}
		}
		return copy;
	},

	/* 그래픽 지우기 */
	removeGraphic: function (graphic, grpType) {

		var me = this;
		var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;

		if (grpType == "reachLine") {

			me.removeGraphic2(graphic, me.lineGrpLayer, me.arrLineGrp, reachAdmin.arrLineGrp);

		}

		if (grpType == "reachArea") {

			me.removeGraphic2(graphic, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp);
		}
	},
	removeGraphic2: function (graphic, layer, arrObj, reachArr) {

		var me = this;

		var currId = graphic.attributes.LINE_EVENT_ID != undefined ? graphic.attributes.LINE_EVENT_ID :
			(graphic.attributes.AREA_EVENT_ID != undefined ? graphic.attributes.AREA_EVENT_ID :
				(graphic.attributes.RCH_DID != undefined ? graphic.attributes.RCH_DID :
					(graphic.attributes.RCH_ID != undefined ? graphic.attributes.RCH_ID : graphic.attributes.CAT_DID)));

		var grpIdx = layer.graphics.map(function (obj) {

			var objId = obj.attributes.LINE_EVENT_ID != undefined ? obj.attributes.LINE_EVENT_ID :
				(obj.attributes.AREA_EVENT_ID != undefined ? obj.attributes.AREA_EVENT_ID :
					(obj.attributes.RCH_DID != undefined ? obj.attributes.RCH_DID :
						(obj.attributes.RCH_ID != undefined ? obj.attributes.RCH_ID :
							obj.attributes.CAT_DID)));

			return objId;
		}).indexOf(currId);


		var idx = arrObj.map(function (obj) {

			var objId = obj.attributes.LINE_EVENT_ID != undefined ? obj.attributes.LINE_EVENT_ID :
				(obj.attributes.AREA_EVENT_ID != undefined ? obj.attributes.AREA_EVENT_ID :
					(obj.attributes.RCH_DID != undefined ? obj.attributes.RCH_DID :
						(obj.attributes.RCH_ID != undefined ? obj.attributes.RCH_ID :
							obj.attributes.CAT_DID)));

			return objId;
		}).indexOf(currId);

		var rchIdx = reachArr.map(function (obj) {

			var objId = obj.attributes.LINE_EVENT_ID != undefined ? obj.attributes.LINE_EVENT_ID :
				(obj.attributes.AREA_EVENT_ID != undefined ? obj.attributes.AREA_EVENT_ID :
					(obj.attributes.RCH_DID != undefined ? obj.attributes.RCH_DID :
						(obj.attributes.RCH_ID != undefined ? obj.attributes.RCH_ID :
							obj.attributes.CAT_DID)));

			return objId;
		}).indexOf(currId);

		if (grpIdx > -1) {

			layer.remove(layer.graphics[grpIdx]);
		}

		if (idx > -1) {

			// 배열에서 삭제
			arrObj.splice(idx, 1);
		}

		if (rchIdx > -1) {

			// 리치 배열에서 삭제
			reachArr.splice(rchIdx, 1);
		}
	},


	/* 리치 집수구역 셋팅 */
	setReachArea: function (catDid) {

		var me = this;

		require(["esri/tasks/query",
			"esri/tasks/QueryTask"], function (Query, QueryTask) {

				var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachAreaLayerId); // 집수구역 URL
				var query = new Query();
				query.returnGeometry = true;
				//query.outFields = ["*"];
				query.outFields = ["CAT_DID", "CAT_ID"];

				query.where = "CAT_DID = '" + catDid + "'";

				// 집수구역 조회
				queryTask.execute(query, function (featureSet) {

					for (var i = 0; i < featureSet.features.length; i++) {

						// 집수구역 그리기
						var feature = featureSet.features[i];
						me.drawGraphic(feature, "reachArea");
					}
				});
			});
	},

	setReachAreaTmp: function (catDid) {

		var me = this;

		require(["esri/tasks/query",
			"esri/tasks/QueryTask"], function (Query, QueryTask) {

				var areaQueryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachAreaLayerId); // 집수구역 URL
				var query = new Query();
				query.returnGeometry = true;
				//query.outFields = ["*"];
				query.outFields = ["CAT_DID", "CAT_ID"];

				query.where = "CAT_DID = '" + catDid + "'";

				// 집수구역 조회
				areaQueryTask.execute(query, function (featureSet) {

					for (var i = 0; i < featureSet.features.length; i++) {

						// 집수구역 그리기
						var feature = featureSet.features[i];
						if (me.drawOption == "addPoint") {
							me.drawGraphic(feature, "addReachArea");
						} else if (me.drawOption == "removePoint") {
							me.drawGraphic(feature, "removeReachArea");
						}

					}
				});
			});
	},
	// KRAD 라인, 집수구역 조회 및 그리기
	setKradPointGrp: function (rchId, kradUpDown) {

		var me = this;

		var extDataId = "";
		var eventOrder = "";
		var stIdx = me.stRchIds.indexOf(rchId);
		var edIdx = me.edRchIds.indexOf(rchId);

		if (stIdx > -1) {

			extDataId = me.stEvtArr[stIdx].attributes.EXT_DATA_ID;
			eventOrder = me.stEvtArr[stIdx].attributes.EVENT_ORDER;
		}
		else if (edIdx > -1) {

			extDataId = me.edEvtArr[edIdx].attributes.EXT_DATA_ID;
			eventOrder = me.edEvtArr[edIdx].attributes.EVENT_ORDER;
		}

		var kInfoIdx = me.kradInfo.map(function (obj) {
			return obj.EXT_DATA_ID;
		}).indexOf(extDataId);

		if (kInfoIdx > -1) {

			var eventType = me.kradInfo[kInfoIdx].EVENT_TYPE;
			var peLayerId = null;
			var leLayerId = null;
			var aeLayerId = null;

			if (eventType == "Point") {

				peLayerId = me.kradInfo[kInfoIdx].PE_LAYER_ID;
				leLayerId = me.kradInfo[kInfoIdx].LE_LAYER_ID;
				aeLayerId = me.kradInfo[kInfoIdx].AE_LAYER_ID;

				require(["esri/tasks/query",
					"esri/tasks/QueryTask"],
					function (Query,
						QueryTask) {

						var queryTaskLE = new QueryTask(me.kradServiceUrl + "/" + leLayerId);
						var queryLE = new Query();
						var queryEmpty = new Query();
						queryLE.returnGeometry = true;
						queryEmpty.returnGeometry = true;
						queryLE.outFields = ["*"];
						queryEmpty.outFields = ["*"];
						queryLE.where = "RCH_ID = '" + rchId + "'";
						queryEmpty.where = "RCH_ID = '" + rchId + "'";
						if (kradUpDown == "up") {
							queryLE.where += " AND EVENT_ORDER <= " + eventOrder;
							queryEmpty.where += " AND EVENT_ORDER > " + eventOrder;
						}
						if (kradUpDown == "down") {
							queryLE.where += " AND EVENT_ORDER > " + eventOrder;
							queryEmpty.where += " AND EVENT_ORDER <= " + eventOrder;
						}

						queryTaskLE.execute(queryLE, function (fSetLE) {

							var features = fSetLE.features;

							if (features != undefined && features.length > 0) {

								for (var fCnt = 0; fCnt < features.length; fCnt++) {

									// 그래픽 그리기
									me.drawGraphic(features[fCnt], "kradLine");
								}

								var queryTaskAE = new QueryTask(me.kradServiceUrl + "/" + aeLayerId);

								queryTaskAE.execute(queryLE, function (fSetAE) {

									if (fSetAE.features != undefined && fSetAE.features.length > 0) {

										for (var faCnt = 0; faCnt < fSetAE.features.length; faCnt++) {

											// 그래픽 그리기
											me.drawGraphic(fSetAE.features[faCnt], "kradArea");
										}
									}

									queryTaskAE.execute(queryEmpty, function (fSetEmpty) {

										if (fSetEmpty.features.length > 0) {

											for (var emCnt = 0; emCnt < fSetEmpty.features.length; emCnt++) {

												// 그래픽 그리기
												me.drawGraphic(fSetEmpty.features[emCnt], "kradEmpty");
											}
										}
									});
								});
							}
						});
					});
			}
		}
	},
	// 라인 이벤트의 집수구역 그리기
	setKradAreaGrp: function (evtId, extId) {

		var me = this;

		require(["esri/tasks/query",
			"esri/tasks/QueryTask"],
			function (Query,
				QueryTask) {

				var kInfoIdx = me.kradInfo.map(function (obj) {
					return obj.EXT_DATA_ID;
				}).indexOf(extId);

				if (kInfoIdx > -1) {

					var eventType = me.kradInfo[kInfoIdx].EVENT_TYPE;
					var aoLayerId = me.kradInfo[kInfoIdx].AO_LAYER_ID;
					var aeLayerId = me.kradInfo[kInfoIdx].AE_LAYER_ID;

					var queryTask = new QueryTask(me.kradServiceUrl + "/" + aoLayerId);
					var query = new Query();
					query.returnGeometry = true;
					query.outFields = ["*"];
					query.where = "AREA_EVENT_ID = '" + evtId + "'";

					queryTask.execute(query, function (featureSet) {

						var queryTaskAE = new QueryTask(me.kradServiceUrl + "/" + aeLayerId);

						queryTaskAE.execute(query, function (fSetAE) {

							var aeFeatures = fSetAE.features; // AE 피처

							var drawType = "";

							if (aeFeatures.length == 0) {

								drawType = "reachArea";
							}
							else {

								drawType = "kradArea";

								query.where = "CAT_DID = '" + aeFeatures[0].attributes.CAT_DID + "' AND AREA_EVENT_ID <> '" + evtId + "'";
								queryTaskAE.execute(query, function (fSet) {

									if (fSet.features.length > 0) {

										for (var i = 0; i < fSet.features.length; i++) {

											// 그래픽 그리기
											me.drawGraphic(fSet.features[i], "kradEmpty");
										}
									}
								});
							}

							var features = featureSet.features; // AO 피처

							for (var i = 0; i < features.length; i++) {

								// 그래픽 그리기
								me.drawGraphic(features[i], drawType);
							}
						});
					});
				}
			});
	},
	/* KRAD 조회 여부 */
	fIsKRADSearch: function () {

		if (localStorage['_searchConfigInfo_'] != undefined && localStorage['_searchConfigInfo_'] != null) {

			var sConfInfo = JSON.parse(localStorage['_searchConfigInfo_']);

			if (sConfInfo.isKrad != undefined && sConfInfo.isKrad != null) {
				return sConfInfo.isKrad;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	},
	// KRAD 전체 그래픽, 이벤트 및 변수 초기화
	clearKradAll: function () {
		var me = this;

		if (me.map.infoWindow != undefined && me.map.infoWindow != null) {
			me.map.infoWindow.hide();
		}

		/* 그래픽 클리어 */
		me.clearGraphic();

		/* 팝업 닫기 */
		me.closePopup();

		/* 이벤트 클리어 */
		me.offMapClickEvt(); // 맵 클릭 이벤트 끄기
		me.offTmpGrpEvt(); // 임시 그래픽 레이어 (tmpGrpLayer) 이벤트 끄기

		/* 전역변수 클리어 */
		me.clearVariable();
	},
	/* 그래픽 클리어 */
	clearGraphic: function () {

		var me = this;

		if (me.tmpGrpLayer != undefined && me.tmpGrpLayer != null) {
			me.tmpGrpLayer.clear();
		}

		if (me.symGrpLayer != undefined && me.symGrpLayer != null) {
			me.symGrpLayer.clear();
		}

		if (me.lineGrpLayer != undefined && me.lineGrpLayer != null) {
			me.lineGrpLayer.clear();
		}

		if (me.areaGrpLayer != undefined && me.areaGrpLayer != null) {
			me.areaGrpLayer.clear();
		}

		if (me.lineGrpLayer_s != undefined && me.lineGrpLayer_s != null) {
			me.lineGrpLayer_s.clear();
		}

		if (me.areaGrpLayer_s != undefined && me.areaGrpLayer_s != null) {
			me.areaGrpLayer_s.clear();
		}



		if (me.checkSubMap()) {
			if ($KRF_APP.subMap._krad.lineGrpLayer_sub != undefined && $KRF_APP.subMap._krad.lineGrpLayer_sub != null) {
				$KRF_APP.subMap._krad.lineGrpLayer_sub.clear();
			}

			if ($KRF_APP.subMap._krad.areaGrpLayer_sub != undefined && $KRF_APP.subMap._krad.areaGrpLayer_sub != null) {
				$KRF_APP.subMap._krad.areaGrpLayer_sub.clear();
			}

			if ($KRF_APP.subMap._krad.lineGrpLayer_s_sub != undefined && $KRF_APP.subMap._krad.lineGrpLayer_s_sub != null) {
				$KRF_APP.subMap._krad.lineGrpLayer_s_sub.clear();
			}

			if ($KRF_APP.subMap._krad.areaGrpLayer_s_sub != undefined && $KRF_APP.subMap._krad.areaGrpLayer_s_sub != null) {
				$KRF_APP.subMap._krad.areaGrpLayer_s_sub.clear();
			}
		}
	},

	clearVariable: function () {

		var me = this;

		me.mapClickEvt = null;
		me.btnObj = null;

		me.drawOption = "";
		me.eventType = ""; // 이벤트 타입 (Reach, Point, Line 등)
		me.stEvtArr = []; // 시작위치 이벤트 그래픽 배열
		me.edEvtArr = [];  // 끝위치 이벤트 그래픽 배열
		me.stEvtTypes = []; // 시작위치 이벤트 타입 (Reach, Point, Line 등)
		me.edEvtTypes = []; // 끝위치 이벤트 타입 (Reach, Point, Line 등)
		me.clickedReachLines = []; // 최초 클릭된(맵 클릭시마다) 리치라인 배열
		me.rchIds = []; // 최초 클릭된(맵 클릭시마다) 리치 아이디 배열
		me.stRchIds = []; // 시작위치 리치 아이디 배열
		me.stRchDids = [];
		me.edRchIds = []; // 끝위치 리치 아이디 배열
		me.edRchDids = [];
		me.arrDownGrp = []; // 하류 그래픽 배열
		me.arrLineGrp = []; // 리치라인 그래픽 배열

		//me.arrAreaGrp = []; // 집수구역 그래픽 배열 전역변수중 arrAreaGrp는 검색결과에 쓰이니 clear X
		me.arrCommGrp = []; // 공통하류 그래픽 배열
		me.tmpEvtLineGrp = []; // 라인 이벤트 임시 배열
		me.arrEvtLineGrp = []; // 라인 이벤트 리치 배열
		me.arrLineGrp_s = []; // 소하천 라인 그래픽 배열
		me.arrAreaGrp_s = []; // 소하천 집수구역 그래픽 배열

		var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;

		//reachAdmin.arrLineGrp = []; // 기존 리치 라인 그래픽 배열
		//reachAdmin.arrAreaGrp = []; // 기존 리치 집수구역 그래픽 배열

		me.isSearchStop = true;

		me.cmRiRchDid = [];
		me.cmLeRchDid = [];
		me.isNotBon = false;
		me.isNotBon1 = false;
		me.isNotBon2 = false;
		me.clickFS = [];

		me.arrDownGrpStart = "";
		me.arrDownGrpEnd = "";


		me.bonStLine = "";
		me.bonEnLine = "";

		me.falseDid1 = "";
		me.falseDid2 = "";

		me.arr1RRchDid = "";
		me.arr1LRchDid = "";

		me.arr2RRchDid = "";
		me.arr2LRchDid = "";




	},
	searchStopCheck: function (cnt) {

		var me = this;
		/* 초기화 시 검색 종료 */
		if (cnt == 0) {

			me.isSearchStop = false;
		}

		if (me.isSearchStop == true) {

			var sec = 0;
			var timer = setInterval(function () {

				sec++;
				ResetButtonClick(); // 초기화;

				// 2초 후 검색 종료 플래그 변경
				if (sec >= 2) {

					clearInterval(timer);
					me.isSearchStop = false;
				}
			}, 1000);

			return false;
		}
		/* 초기화 시 검색 종료 끝 */

		return true;
	},
	getSearchConfigInfo: function () {

		var searchConfig = Ext.getCmp("searchConfig");
		if (searchConfig.getLocalStorage() == undefined || searchConfig.getLocalStorage() == "undefined") {
			searchConfig.setLocalStorage();
		}
		this.searchConfigInfoJson = searchConfig.getLocalStorage();

	}
});
Ext.define('krf_new.view.search.ButtonPanelController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.buttonpanel',

	endBtnOnOff: 'off',

	init: function(){
		$KRF_APP.addListener($KRF_EVENT.REACH_MODE_ON, this.onClickButton, this);
	},

	// 조류항공사진버튼
	onClickDrone: function (obj, el, evt) {
		var currCtl = SetBtnOnOff(el.id);
		//		var btnModeReach = Ext.getCmp("btnModeReach");
		//		var westCon = Ext.getCmp('west_container')

		if (currCtl.btnOnOff == "on") {
			$KRF_APP.fireEvent($KRF_EVENT.SHOW_DRONE_TOOLBAR);

			Layer01OnOff($KRF_DEFINE.reachNodeLayerId, "off");
			Layer01OnOff($KRF_DEFINE.reachLineLayerId, "off");
			Layer01OnOff($KRF_DEFINE.reachFlowLayerId, "off");
			Layer01OnOff($KRF_DEFINE.LakeLayerId, "off");

			/* 수질측정지점 레이어 off */
			Layer01OnOff("1", "off");
			Layer01OnOff("2", "off");
			Layer01OnOff("3", "off");
			Layer01OnOff("4", "off");
			Layer01OnOff("5", "off");

			SetBtnOnOff("btnFlowLayer", "off");
			SetBtnOnOff("btnReachLayer", "off");
			SetBtnOnOff("btnReachNodeLayer", "off");
		} else {
			$KRF_APP.fireEvent($KRF_EVENT.HIDE_DRONE_TOOLBAR);

			// 항공영상 초기화
			$KRF_APP.global.DroneFn.onClickResetButton();

			/* 수질측정지점 레이어 on */
			Layer01OnOff("1", "on");
			Layer01OnOff("2", "on");
			Layer01OnOff("3", "on");
			Layer01OnOff("4", "on");
			Layer01OnOff("5", "on");

			Ext.defer(function () {
				Layer01OnOff($KRF_DEFINE.reachNodeLayerId, "on");
				Layer01OnOff($KRF_DEFINE.reachLineLayerId, "on");
				Layer01OnOff($KRF_DEFINE.reachFlowLayerId, "on");
				//Layer01OnOff($KRF_DEFINE.LakeLayerId, "on"); // 190819 왜들어간지 모르겠어서 주석처리
				SetBtnOnOff("btnFlowLayer", "on");
				SetBtnOnOff("btnReachLayer", "on");
				SetBtnOnOff("btnReachNodeLayer", "on");
			}, 100);
		}

		// 물환경 연동 마커 초기화
		var paramMarker = $KRF_APP.coreMap.map.getLayer("siteSymbolGraphic");
		if (paramMarker != undefined) {
			paramMarker.hide();
		}
	},
	// 주제도 선택
	onClickLayer: function (obj, el, evt) {
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		$KRF_APP.fireEvent($KRF_EVENT.WEST_TAB_CHANGE, currCtl.btnOnOff);
	},

	// 정보창 클릭
	onClickInfo: function (obj, el, evt) {
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);

		//추가 160704 pdj
		var listWinCtl = Ext.getCmp("siteListWindow");
		var windowSiteNChart = Ext.getCmp("windowSiteNChart");

		if (listWinCtl != undefined) {
			if (currCtl.btnOnOff == "off") {
				listWinCtl.hide();
				if (windowSiteNChart != undefined) {
					windowSiteNChart.hide();
				}
				/*Ext.HideSiteListWindow(currCtl);
				HideWindowSiteNChart();*/
			}
			else {
				listWinCtl.show();

				if (windowSiteNChart != undefined) {
					windowSiteNChart.show();
				}
				//Ext.ShowSiteListWindow("test");
			}
		}

	},

	// 검색결과창 클릭
	onClickResult: function (obj, el, evt) {
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		//console.info(el.id);
		var searchResultWindow = Ext.getCmp("searchResultWindow");
		/*
		if(currCtl.btnOnOff == "off"){
			Ext.HideSearchResult();
		}
		else{
			Ext.ShowSearchResult("grid-tab-2", "하천수");
		}
		*/
		if (searchResultWindow != undefined) {
			if (currCtl.btnOnOff == "on") {
				//ShowSearchResult(_searchType);
				searchResultWindow.show();
			}
			else {
				//HideSearchResult();
				searchResultWindow.hide();
			}
		}


	},

	onClickFavorite: function (obj, el, evt) {
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		var popSaveCtl = Ext.getCmp("popSave");
		if (popSaveCtl != undefined) {
			popSaveCtl.hide();
		}
		var popOpenCtl = Ext.getCmp("popOpen");
		if (popOpenCtl != undefined) {
			popOpenCtl.hide();
		}

		// 즐겨찾기 팝업
		var popCtl = Ext.getCmp("Favorite");
		if (popCtl == undefined) {
			popCtl = Ext.create('krf_new.view.east.FavoriteWindow_v3');
		}

		Ext.getCmp('center_container').add(popCtl);

		////console.info(popCtl.hidden);
		if (popCtl.hidden == true) {
			popCtl.show();
		} else {
			popCtl.hide();
		}
	},

	onClickButton: function (evtArgs, el) {

		var currCtl = Ext.getCmp(el.id);

		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id, "on");

		// 리치모드 버튼
		if (el.id == "btnModeReach" || el.id == "btnModeReach_center") {
			var westContents = Ext.getCmp("searchAreaContents");
			this.btnHidden('reach');
			var btnName = Ext.getCmp("btnNameSearch");
			if (btnName.btnOnOff == "off") {
				btnName = SetBtnOnOff("btnNameSearch");
			}
			//westContents.setActiveItem(3); // 명칭찾기 리치모드 인덱스
			westContents.setActiveItem(2); // 명칭찾기 리치모드 인덱스 (2019-04-04 통합검색으로 변경)

			var aEl = Ext.get('reachTable');
			if (aEl != null) {
				aEl.dom.hidden = false;
			}

			// Dim 처리 서비스 레이어
			var activeLayer = $KRF_APP.coreMap.map.getLayer("ReachLayerAdminBackground");
			if (activeLayer != undefined) {
				activeLayer.setVisibleLayers([0]);
				activeLayer.setVisibility(true);
			}

			// 시뮬레이션용 서비스 레이어
			activeLayer = $KRF_APP.coreMap.map.getLayer("DynamicLayerAdmin_ReachTest");
			if (activeLayer != undefined) {
				activeLayer.setVisibility(true);
			}

			var me = $KRF_APP.coreMap;
			$KRF_APP.coreMap.map.graphics.clear();

			$KRF_APP.fireEvent($KRF_EVENT.DRAW_END);
			$KRF_APP.fireEvent($KRF_EVENT.SHOW_REACH_TOOLBAR);

			var kradMetaInfo = Ext.getCmp("kradMetaInfo");
			var kradSchConf = Ext.getCmp("kradSchConf");

			if (kradMetaInfo != undefined) {
				kradMetaInfo.close();
			}
			if (kradSchConf != undefined) {
				kradSchConf.close();
			}
			//KRAD 레이어 로컬스토리지 내용으로 Visibility
			var confInfo2 = localStorage['_kradExtInfo2_'];  //사용자지정 로컬스토리지
			var kradLayer = [];
			if (confInfo2 != undefined || confInfo2 != null) {
				var jsonConf2 = JSON.parse(confInfo2);

				if (jsonConf2.length > 0) {
					for (var i = 0; i < jsonConf2.length; i++) {
						if (jsonConf2[i].EVENT_TYPE == "Point") {
							kradLayer.push(jsonConf2[i].PE_LAYER_ID);
						}
						if (jsonConf2[i].EVENT_TYPE == "Line") {
							kradLayer.push(jsonConf2[i].LO_LAYER_ID);
						}
					}
				}

				$KRF_APP.coreMap._krad.setKradOnOff(kradLayer);
				$KRF_APP.coreMap._krad.kradInfo = jsonConf2;
			}
		}

		// 일반모드 버튼
		if (el.id == "btnModeNomal" || el.id == "btnModeNomal_center") {  
			this.btnHidden('normal');
			// 리치 선택 종료
			$KRF_APP.coreMap.reachLayerAdmin_v3_New.drawEnd();

			//일반모드 선택시 수계찾기로 이동
			var westContents = Ext.getCmp("searchAreaContents");
			var btnWater = Ext.getCmp("btnWaterSearch");
			if (btnWater.btnOnOff == "off") {
				btnName = SetBtnOnOff("btnWaterSearch");
				westContents.setActiveItem(0); // 일반모드시 수계찾기로 바꿈
			}

			var aEl = Ext.get('reachTable');
			if (aEl != null) {
				aEl.dom.hidden = true;
			}

			/* 전체 레이어 끄기 */
			var dynamicLayerAdminReach = $KRF_APP.coreMap.map.getLayer("DynamicLayerAdmin_ReachTest");
			if (dynamicLayerAdminReach != undefined) {
				dynamicLayerAdminReach.setVisibility(false);
			}

			reachAdminBackgroundLayer = $KRF_APP.coreMap.map.getLayer("ReachLayerAdminBackground");
			if (reachAdminBackgroundLayer != undefined) {
				reachAdminBackgroundLayer.setVisibility(false);
			}
			/* 전체 레이어 끄기 끝 */

			$KRF_APP.coreMap.map.graphics.clear();
			$KRF_APP.fireEvent($KRF_EVENT.DRAW_END);
			$KRF_APP.fireEvent($KRF_EVENT.HIDE_REACH_TOOLBAR);

			var kradMetaInfo = Ext.getCmp("kradMetaInfo");
			var kradSchConf = Ext.getCmp("kradSchConf");

			if (kradMetaInfo != undefined) {
				kradMetaInfo.close();
			}
			if (kradSchConf != undefined) {
				kradSchConf.close();
			}

			var searchConfigHeader = Ext.getCmp("searchConfigHeader");
			if (searchConfigHeader != undefined) {
				searchConfigHeader.close();
			}
			//KRAD 레이어 해제
			var kradLayer = [];
			$KRF_APP.coreMap._krad.setKradOnOff(kradLayer);
		}

		// 리치 툴바 스마트검색 버튼
		if (el.id == "btnMenu01") {
			// 이미지 셋팅, 이미지 변화 없게 할라구.. 시연 뒤에 삭제할 것..
			Ext.SetSrc(currCtl);

			var ctl = Ext.getCmp("popSmart");
			if (ctl == undefined) {
				ctl = Ext.create("Ext.window.Window", {
					title: '스마트검색',
					id: 'popSmart',
					cls: 'khLee-window-panel-header khLee-x-window-default ',
					items: [{
						xtype: 'image',
						src: './resources/images/popup/20150812_smart.gif',
						width: 307,
						height: 475
					}],
					x: 410,
					y: 170
				});
			}
			ctl.show();
		}

		// 리치 추가 버튼
		if (el.id == "btnMenu02") {
			// 리치 선택
			$KRF_APP.coreMap.reachLayerAdmin.pointDraw("dd", "btnMenu02");
		}

		// 리치 툴바 시작위치 버튼
		if (el.id == "btnMenu04") {
			Ext.get('_mapDiv__gc').setStyle('cursor', 'url(./resources/images/symbol/startPoint.cur),auto');
			$KRF_APP.fireEvent('pointDrawClick', "point", el.id, false);
		}

		// 리치 툴바 끝위치 버튼
		if (el.id == "btnMenu05") {
			Ext.get('_mapDiv__gc').setStyle('cursor', 'url(./resources/images/symbol/endPoint.cur),auto');
			$KRF_APP.fireEvent('pointDrawClick', "point", el.id, true);

			if (this.endBtnOnOff == "off") {
				if (Ext.getCmp("btnMenu05").src.indexOf("_on") > -1)
					this.endBtnOnOff = "on";
			} else {
				if (Ext.getCmp("btnMenu05").src.indexOf("_on") > -1) {
					// 끝위치 버튼 셋팅
					Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
					Ext.get('_mapDiv__gc').setStyle('cursor', 'default');
					$KRF_APP.fireEvent($KRF_EVENT.DRAW_END);
					this.endBtnOnOff = "off";
					// 끝위치 버튼 셋팅 끝
				}
			}
		}

		// 드래그 선택 버튼
		if (el.id == "btnMenu06") {

			// 끝위치 버튼 셋팅
			Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
			Ext.get('_mapDiv__gc').setStyle('cursor', 'default');
			$KRF_APP.fireEvent($KRF_EVENT.DRAW_END);
			this.endBtnOnOff = "off";
			// 끝위치 버튼 셋팅 끝

			// 레이어 On/Off
			$KRF_APP.fireEvent($KRF_EVENT.REACH_TEST_ON_OFF, $KRF_EVENT.DYNAMIC_LAYER_REACH_TEST, $KRF_EVENT.RESET, 1);
			// $KRF_APP.fireEvent("Reach_TestOnOff", "DynamicLayer_Reach_Test", "reset", 1);

			// 모든 창닫기
			Ext.HideSiteListWindow(currCtl);
			Ext.HideSiteInfoWindow();
			Ext.HideChartResult();

			$KRF_APP.coreMap.reachLayerAdmin.extentDraw();
		}

		// 반경 선택 버튼
		if (el.id == "btnMenu07") {
			$KRF_APP.coreMap.map.graphics.clear();

			// 끝위치 버튼 셋팅
			Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
			Ext.get('_mapDiv__gc').setStyle('cursor', 'default');
			$KRF_APP.fireEvent($KRF_EVENT.DRAW_END);
			this.endBtnOnOff = "off";
			// 끝위치 버튼 셋팅 끝

			// 레이어 On/Off
			$KRF_APP.fireEvent($KRF_EVENT.REACH_TEST_ON_OFF, $KRF_EVENT.DYNAMIC_LAYER_REACH_TEST, $KRF_EVENT.RESET, 1);

			// 모든 창닫기
			Ext.HideSiteListWindow(currCtl);
			Ext.HideSiteInfoWindow();
			Ext.HideChartResult();
		}

		// 설정저장 버튼
		if (el.id == "btnMenuSave") {
			// 이미지 셋팅, 이미지 변화 없게 할라구.. 시연 뒤에 삭제할 것..
			Ext.SetSrc(currCtl);

			// 끝위치 버튼 셋팅
			Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
			Ext.get('_mapDiv__gc').setStyle('cursor', 'default');
			$KRF_APP.fireEvent($KRF_EVENT.DRAW_END);
			this.endBtnOnOff = "off";
			// 끝위치 버튼 셋팅 끝

			// 레이어 On/Off
			$KRF_APP.fireEvent($KRF_EVENT.REACH_TEST_ON_OFF, $KRF_EVENT.DYNAMIC_LAYER_REACH_TEST, $KRF_EVENT.SAVE, 1);
			// $KRF_APP.fireEvent("Reach_TestOnOff", "DynamicLayer_Reach_Test", "save", 1);

			// 지점목록 보여주기
			$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, $KRF_EVENT.DYNAMIC_LAYER_REACH_TEST, $KRF_EVENT.SAVE, 1);
			//    		Ext.ShowSiteListWindow("test");
		}

		// 물환경 연동 마커 초기화
		var coreMap = GetCoreMap();
		var paramMarker = coreMap.map.getLayer("siteSymbolGraphic");
		if (paramMarker != undefined) {
			paramMarker.hide();
		}
	},

	btnHidden: function (mode) {
		var toggleBtnIdArr = ['btnNotice', 'btnQnA', 'btnMenual'];
		var isShow = null;
		mode == 'reach' ? isShow = false : isShow = true;
		for (var i = 0; i < toggleBtnIdArr.length; i++) {
			var btnObj = Ext.getCmp(toggleBtnIdArr[i]);
			isShow ? btnObj.show() : btnObj.hide();
		}

	}
});

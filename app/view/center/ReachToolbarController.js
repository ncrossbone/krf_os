Ext.define('krf_new.view.center.ReachToolbarController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.reachToolbar',

	onClickButtonTemp: function (obj, el, evt) {

		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);

	},

	// 스마트선택 버튼 클릭
	onClickSmart: function (obj, el, evt) {
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);

		// 본류, 지류 설정창
		var popCtl = Ext.getCmp("searchConfig");
		var kradMetaInfo = Ext.getCmp("kradMetaInfo");
		var cContainer = Ext.getCmp("cont_container");
		var rToolbar = Ext.getCmp("reachToolbar");

		var popCtlIdx = rToolbar.getReachModeBtnIdx(el.id);

		// 설정창 show
		if (currCtl.btnOnOff == "on") {
			popCtl.show();

			popCtl.setX(rToolbar.getX() + (rToolbar.itemWidth * popCtlIdx));
			popCtl.setY(rToolbar.getY() + (rToolbar.itemHeight + 1));
			SetWestCollapseXY("show");
		} else {
			popCtl.hide();

			if (kradMetaInfo != undefined) {
				kradMetaInfo.hide();
			}

		}
	},

	onClickKrad: function (obj, el, evt) {

		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);

		// 본류, 지류 설정창
		var kradConf = Ext.getCmp("kradSchConf");
		if (kradConf == undefined) {
			kradConf = Ext.create("krf_new.view.krad.kradSchConf");
		}

		// 설정창 show
		if (currCtl.btnOnOff == "on") {

			kradConf.show();
			SetWestCollapseXY("show");
		}
		else {
			kradConf.close();
			kradConf.hide();
		}

		// 부하량 주제도 off
		catTMLayerOnOff("off");

	},

	//마우스 커서 변경
	mouseCursor: function (el) {


		if (Ext.getCmp([el.id]).btnOnOff == 'on') {
			Ext.get('_mapDiv__gc').setStyle('cursor', 'url(./resources/images/symbol/' + el.id + '.cur),auto');
		} else {
			initKradEvt();
		}

		//if
		//Ext.get('_mapDiv__gc').setStyle('cursor', 'url(./resources/images/symbol/btn_start' + sCnt + '.cur),auto');
		//else
		//initKradEvt();
	},

	// 리치추가 버튼 클릭
	onClickAddReach: function (obj, el, evt) {
		var me = this;
		// 맵 클릭 이벤트 켜기
		//$KRF_APP.coreMap._krad.onMapClickEvt("addPoint", el.id);
		// 부하량 주제도 off
		//catTMLayerOnOff("off");

		//SetBtnOnOff("btnMenu02", "off");
		var btnMenu02 = Ext.getCmp("btnMenu02");

		if (btnMenu02.btnOnOff == "off") {

			// 맵 클릭 이벤트 켜기
			$KRF_APP.coreMap._krad.onMapClickEvt("addPoint", el.id);

			// 부하량 주제도 off
			catTMLayerOnOff("off");

		} else {

			//tmp에 저장되어 있는 graphic을 지우고 원래 graphic으로 배열을 넘겨준다.
//graphic, me.reachAreaSym, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp
			var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;
			//console.info($KRF_APP.subMap._krad.arrLineGrpTmp);
			for (var i = 0; i < $KRF_APP.coreMap._krad.arrLineGrpTmp.length; i++) {
				$KRF_APP.coreMap._krad.drawGraphic2($KRF_APP.coreMap._krad.arrLineGrpTmp[i], $KRF_APP.coreMap._krad.reachLineSym
					, $KRF_APP.coreMap._krad.lineGrpLayer, $KRF_APP.coreMap._krad.arrLineGrp, reachAdmin.arrLineGrp);
					
			};
			for (var j = 0; j < $KRF_APP.coreMap._krad.arrAreaGrpTmp.length; j++) {
				$KRF_APP.coreMap._krad.drawGraphic2($KRF_APP.coreMap._krad.arrAreaGrpTmp[j], $KRF_APP.coreMap._krad.reachAreaSym
					, $KRF_APP.coreMap._krad.areaGrpLayer, $KRF_APP.coreMap._krad.arrAreaGrp, reachAdmin.arrAreaGrp);
					
			};

			// 검색 종료 체크(지점목록,검색결과)
			$KRF_APP.coreMap._krad.isStopCheck();
			SetBtnOnOff("btnMenu02", "off");

			$KRF_APP.coreMap._krad.arrLineGrpTmp = [];
			$KRF_APP.coreMap._krad.arrAreaGrpTmp = [];
			if($KRF_APP.coreMap._krad.checkSubMap()){
				$KRF_APP.subMap._krad.arrLineGrpTmp = [];
				$KRF_APP.subMap._krad.arrAreaGrpTmp = [];
			}
			

			reachAdmin.arrLineGrpTmp = [];
			reachAdmin.arrAreaGrpTmp = [];
		}

		me.mouseCursor(el);

	},

	// 구간제거 버튼 클릭
	onClickRemoveReach: function (obj, el, evt) {

		//미니맵 EDIT EVENT 끄기
		$KRF_APP.fireEvent($KRF_EVENT.STOPEDITEVENT);

		var me = this;

		var btnMenu03 = Ext.getCmp("btnMenu03");
		//console.info(btnMenu02.btnOnOff);

		if (btnMenu03.btnOnOff == "off") {
			// 맵 클릭 이벤트 켜기
			$KRF_APP.coreMap._krad.onMapClickEvt("removePoint", el.id);

			// 부하량 주제도 off
			catTMLayerOnOff("off");

		} else {

			//tmp에 저장되어 있는 graphic을 지우고(검색종료 체크때 임시 graphic 삭제) 원래 graphic으로 배열을 넘겨준다.
			var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;
			for (var i = 0; i < $KRF_APP.coreMap._krad.arrLineGrpTmp.length; i++) {
				$KRF_APP.coreMap._krad.removeGraphic($KRF_APP.coreMap._krad.arrLineGrpTmp[i], "reachLine");
			};

			for (var j = 0; j < $KRF_APP.coreMap._krad.arrAreaGrpTmp.length; j++) {
				$KRF_APP.coreMap._krad.removeGraphic($KRF_APP.coreMap._krad.arrAreaGrpTmp[j], "reachArea");
			};

			// 검색 종료 체크(지점목록,검색결과)
			$KRF_APP.coreMap._krad.isStopCheck();
			SetBtnOnOff("btnMenu03", "off");


			$KRF_APP.coreMap._krad.arrLineGrpTmp = [];
			$KRF_APP.coreMap._krad.arrAreaGrpTmp = [];
			reachAdmin.arrLineGrpTmp = [];
			reachAdmin.arrAreaGrpTmp = [];


		}

		//마우스 이벤트
		me.mouseCursor(el);
	},

	//하류제거
	onClickRemoveReachLine: function (obj, el, evt) {

		//미니맵 EDIT EVENT 끄기
		$KRF_APP.fireEvent($KRF_EVENT.STOPEDITEVENT);

		var me = this;

		$KRF_APP.coreMap._krad.onMapClickEvt("reachLineRemove", el.id);

		//마우스 이벤트
		me.mouseCursor(el);

	},

	onClickMerge: function () {
		var coreMap = Ext.getCmp("_mapDiv_");
		var subCoreMap = Ext.getCmp("_subMapDiv_");

		//$KRF_APP.fireEvent($KRF_EVENT.MAPMOUSEOVER);
		//console.info(coreMap.map);
		//console.info(coreMap.map.graphics);

		//console.info(subCoreMap.map);
		//console.info(subCoreMap.map.graphics);

		// console.info($KRF_APP.coreMap);
		// console.info($KRF_APP.coreMap._krad);
		// console.info($KRF_APP.subMap);
		// console.info($KRF_APP.subMap._krad);
	},

	// 시작위치 버튼 클릭
	onClickStartReach: function (obj, el, evt) {

		//미니맵 EDIT EVENT 끄기
		$KRF_APP.fireEvent($KRF_EVENT.STOPEDITEVENT);

		// if ($KRF_APP.coreMap._krad.maxSelect == true) {
		// 	alert("최대 5개 까지 선택 가능합니다.");
		// 	return;
		// }

		// 맵 클릭 이벤트 켜기
		$KRF_APP.coreMap._krad.clickCnt("startPoint");

		if ($KRF_APP.coreMap._krad.realTimeStBtnChk == false) {
			return;
		}

		$KRF_APP.coreMap._krad.onMapClickEvt("startPoint", el.id);

		// 부하량 주제도 off
		catTMLayerOnOff("off");

	},

	// 끝위치 버튼 클릭
	onClickEndReach: function (obj, el, evt) {

		//미니맵 EDIT EVENT 끄기
		$KRF_APP.fireEvent($KRF_EVENT.STOPEDITEVENT);

		// if ($KRF_APP.coreMap._krad.maxSelect == true) {
		// 	alert("최대 5개 까지 선택 가능합니다.");
		// 	return;
		// }

		$KRF_APP.coreMap._krad.clickCnt("endPoint");
		if ($KRF_APP.coreMap._krad.realTimeEnBtnChk == false) {
			return;
		}
		// 맵 클릭 이벤트 켜기
		$KRF_APP.coreMap._krad.onMapClickEvt("endPoint", el.id);

		// 부하량 주제도 off
		catTMLayerOnOff("off");


		//Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_end01.png) 13 38,auto');

		// 버튼 On/Off
		/*var currCtl = SetBtnOnOff(el.id);
		var coreMap = GetCoreMap();
		var kradLayerAdmin = coreMap.kradLayerAdmin;
		kradLayerAdmin.createMapClickEvtTest("endPoint");*/
	},

	onClickMiniMap: function (obj, el, evt) {
		var me = this;
		var coreMap = Ext.getCmp("_mapDiv_");
		var subMapWindow = Ext.getCmp("subMapWindow");
		var btnMenu10 = Ext.getCmp("btnMenu010").btnOnOff;
		
		if (btnMenu10 == "on") {
			//미니맵 EDIT EVENT 끄기
			$KRF_APP.fireEvent($KRF_EVENT.STOPEDITEVENT);
			SetBtnOnOff("btnMenu010", "off");	
			subMapWindow.hide();
			$KRF_APP.coreMap._krad.miniLineGrpLayer.setVisibility(false);

			Ext.getCmp("btnMenu010").btnOnOff = "off";
		} else {

			SetBtnOnOff("btnMenu010", "on");
			subMapWindow.show();
			$KRF_APP.coreMap._krad.miniLineGrpLayer.setVisibility(true);
			
			$KRF_APP.coreMap.subMapOnOffSetExtent();
			//centerAndZoom__LOD
			//$KRF_APP.subMap
			
			//subMapSetExtent
			// var coreMap = Ext.getCmp("_mapDiv_");
			// var subCoreMap = Ext.getCmp("_subMapDiv_");
			// subCoreMap.map.centerAndZoom($KRF_APP.coreMap.map.extent.getCenter(),$KRF_APP.coreMap.map.__LOD.level + 2);
			// console.info(subCoreMap.map.extent);
			//subCoreMap.map.setExtent(evt.graphic._extent, true);
		}
	},

	// 초기화 버튼 클릭
	onClickReset: function (obj, el, evt) {

		ResetButtonClick();
		initKradEvt();

	},

	// 설정저장 버튼 클릭
	onClickSave: function (obj, el, evt) {

		// 버튼 On/Off
		//var currCtl = SetBtnOnOff(el.id);

		var popOpenCtl = Ext.getCmp("popOpen");
		if (popOpenCtl != undefined)
			popOpenCtl.hide();

		var popFavoriteCtl = Ext.getCmp("Favorite");
		if (popFavoriteCtl != undefined)
			popFavoriteCtl.hide();

		// 팝업 이미지 (임시)
		var popCtl = Ext.getCmp("popSave");

		if (popCtl == undefined) {

			popCtl = Ext.create("Ext.window.Window", {

				title: '설정저장',
				header: false,
				id: 'popSave',
				cls: 'khLee-window-panel-header khLee-x-window-default ',
				layout: {
					type: 'absolute'
				},
				items: [{
					xtype: 'image',
					src: './resources/images/popup/popSave.gif',
					width: 286,
					height: 114
				}, {
					xtype: 'image',
					title: '닫기',
					src: './resources/images/button/icon_close2.gif',
					listeners: {
						el: {
							click: function () {
								var popCtl = Ext.getCmp("popSave");
								popCtl.hide();
							}
						}
					},
					width: 10,
					height: 10,
					x: 264,
					y: 10
				}],
				x: Ext.getBody().getViewSize().width - 286,
				y: 170

			});

		}

		if (popCtl.hidden == true)
			popCtl.show();
		else
			popCtl.hide();

		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},

	// 설정불러오기 버튼 클릭
	onClickOpen: function (obj, el, evt) {

		// 버튼 On/Off
		//var currCtl = SetBtnOnOff(el.id);

		var popSaveCtl = Ext.getCmp("popSave");
		if (popSaveCtl != undefined)
			popSaveCtl.hide();

		var popFavoriteCtl = Ext.getCmp("Favorite");
		if (popFavoriteCtl != undefined)
			popFavoriteCtl.hide();

		// 팝업 이미지 (임시)
		var popCtl = Ext.getCmp("popOpen");

		if (popCtl == undefined) {

			popCtl = Ext.create("Ext.window.Window", {
				title: '설정불러오기',
				header: false,
				id: 'popOpen',
				cls: 'khLee-window-panel-header khLee-x-window-default ',
				layout: {
					type: 'absolute'
				},
				items: [{
					xtype: 'image',
					src: './resources/images/popup/popOpen.gif',
					width: 286,
					height: 215
				}, {
					xtype: 'image',
					title: '닫기',
					src: './resources/images/button/icon_close2.gif',
					listeners: {
						el: {
							click: function () {
								var popCtl = Ext.getCmp("popOpen");
								popCtl.hide();
							}
						}
					},
					width: 10,
					height: 10,
					x: 264,
					y: 10
				}],
				x: Ext.getBody().getViewSize().width - 286,
				y: 170

			});

		}

		if (popCtl.hidden == true)
			popCtl.show();
		else
			popCtl.hide();

		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},

	// 드래그 선택 버튼
	onClickDrag: function (obj, el, evt) {

		// 버튼 On/Off
		//var currCtl = SetBtnOnOff(el.id);

		//var me = KRF_DEV.getApplication().coreMap;

		// 리치 선택 종료
		//me.reachLayerAdmin.drawEnd();
		//me.reachLayerAdmin_v3.drawEnd();
		/*me.reachLayerAdmin_v3_New.drawEnd();
		
		if(currCtl.btnOnOff == "on"){
			//GetCoreMap().reachLayerAdmin.extentDraw("ADD", el.id);
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("EXTENT", el.id); // v3
			GetCoreMap().reachLayerAdmin_v3_New.startDraw("extent"); // v3
		}*/

		$KRF_APP.coreMap._krad.onMapDragEvt("extent", el.id);

		// 부하량 주제도 off
		catTMLayerOnOff("off");

		var me = this;
		me.mouseCursor(el);

	},

	// 반경 선택 버튼
	onClickRadius: function (obj, el, evt) {

		// 버튼 On/Off
		//var currCtl = SetBtnOnOff(el.id);

		//var me = KRF_DEV.getApplication().coreMap;

		// 리치 선택 종료
		//me.reachLayerAdmin.drawEnd();
		//me.reachLayerAdmin_v3.drawEnd();
		//me.reachLayerAdmin_v3_New.drawEnd();

		//SetBtnOnOff("btnSearchResult");
		//if(currCtl.btnOnOff == "on"){
		//GetCoreMap().reachLayerAdmin.radiusDraw("ADD", el.id);
		//GetCoreMap().reachLayerAdmin_v3.pointDraw("CIRCLE", el.id); // v3
		//GetCoreMap().reachLayerAdmin_v3_New.startDraw("circle"); // v3
		//}

		//$KRF_APP.coreMap._krad.onMapDragEvt("circle", el.id);  // 반경 드래그 

		var radiusToolbar = Ext.getCmp("radiusToolbar");

		var btn = Ext.getCmp([el.id]);
		if(btn.btnOnOff == "off"){
			radiusToolbar.show();
		}else{
			radiusToolbar.hide();
		}
		$KRF_APP.coreMap._krad.onMapDragEvt("radius", el.id);    // 반경 클릭
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");

		var me = this;
		me.mouseCursor(el);
	},

	onClickButton: function (btn, el, evt) {

		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);

		var me = $KRF_APP.oreMap;
		var currCtl = Ext.getCmp(el.id);

		// 이미지 셋팅
		Ext.SetSrc(currCtl);

		// 드래그 선택 버튼
		if (el.id == "btnMenu06") {
			//me.map.graphics.clear();

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

			me.reachLayerAdmin.extentDraw();
		}

		// 반경 선택 버튼
		if (el.id == "btnMenu07") {
			me.map.graphics.clear();

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

		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},
	onClick3D: function () {
		var centerCoord = $KRF_APP.coreMap.map.extent.getCenter();

		$KRF_APP.coreMap.transCoord(centerCoord, function (transCoord) {
			$KRF_APP.fireEvent($KRF_EVENT.MODE_CHANGED, { mode: $KRF_APP.THREEDIM_MODE, coord: transCoord[0] });
		}, 102100, 4019);
	}

	//소하천 dynamic 켜기
	// onClickSRiver: function (obj, el, evt) {

	// 	var coreMap = Ext.getCmp("_mapDiv_");
	// 	var subMap = Ext.getCmp("_subMapDiv_");
	// 	// var DynamicLayerSRiver = coreMap.map.getLayer("DynamicLayerSRiver");
	// 	// var subDynamicLayerSRiver = subMap.map.getLayer("DynamicLayerSRiver");
	// 	// console.info(subDynamicLayerSRiver);

	// 	// var btnLayerSRiver = Ext.getCmp("btnLayerSRiver").btnOnOff;

	// 	// if (btnLayerSRiver == "on") {
	// 	// 	DynamicLayerSRiver.setVisibleLayers([-1]);
	// 	// 	subDynamicLayerSRiver.setVisibleLayers([-1]);
	// 	// 	Ext.getCmp("btnLayerSRiver").btnOnOff = "off";
	// 	// } else {
	// 	// 	DynamicLayerSRiver.setVisibleLayers([0, 1, 2]);
	// 	// 	subDynamicLayerSRiver.setVisibleLayers([0, 1, 2]);
	// 	// 	Ext.getCmp("btnLayerSRiver").btnOnOff = "on";
	// 	// }
	// }
});

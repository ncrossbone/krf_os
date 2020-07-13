/*
 * 대국민 app.js
 * 
 */
var $KRF_DEFINE = null;

/*
* 박철 추가 API URL 를 JSON으로 관리
*/
var _API = null;

var $KRF_POSITION = null;

var $KRF_EVENT = {
	DESK_TOP_LOADED: 'desktopLoaded',
	CORE_MAP_LOADED: 'coreMapLoaded',
	MAP_WINDOW_LOADED: 'mapWindowLoaded',
	DYNAMIC_LAYER_ON_OFF: 'dynamicLayerOnOff',
	DRON_DYNAMIC_LAYER_ON_OFF: 'drondynamicLayerOnOff',
	SRIVER_DYNAMIC_LAYER_ON_OFF: 'sRiverdynamicLayerOnOff',
	AREA_SELECT: 'areaSelect',
	POINT_DRAW_CLICK: 'pointDrawClick',
	DRAW_END: 'drawEnd',
	REACH_TEST_ON_OFF: 'Reach_TestOnOff',
	DYNAMIC_LAYER_REACH_TEST: 'DynamicLayer_Reach_Test',
	END: 'end',
	RESET: 'reset',
	SAVE: 'save',
	SET_SELECTED_SITE: 'setSelectedSite',
	SET_SELECTED_CAT_AREA: 'setSelectedCatArea',
	SET_SELECTED_RCHLINE: 'setSelectedRchLine',
	SET_SELECTED_POP_SITE: 'setSelectedPopSite',
	SHOW_SITE_LIST_WINDOW: 'showSiteListWindow',
	HIDE_SITE_LIST_WINDOW: 'hideSiteListWindow',
	SHOW_REACH_TOOLBAR: 'ShowReachToolbar',
	HIDE_REACH_TOOLBAR: 'HideReachToolbar',
	SHOW_DRONE_TOOLBAR: 'ShowDroneToolbar',
	HIDE_DRONE_TOOLBAR: 'HideDroneToolbar',
	MODE_CHANGED: 'windowModeChanged',
	MINIMIZE_WINDOWS: 'minimizeWindows',
	MAP_RESIZE: 'resize',
	SET_MAP_TOOLTIP_LOCATION: 'setMapTooltipLocation',
	MOVE_COMMON: 'moveCommon',
	WEST_TAB_CHANGE: 'WestTabChange',
	INITMINIMAPLINE: 'initMiniMapLine',
	MINIMAPCHANGE: 'MiniMapChange',
	LOADED3D: 'Loaded3D',
	CENTERAT: 'centerAt',
	THREEDIM_MOVE: 'threeDimMove',
	SHOWMETADATAWINDOW: 'showMeatDataWindow',
	HIDEMETADATAWINDOW: 'hideMeatDataWindow',
	THREEDIM_SEND_MESSAGE: 'threeDimSendMessage',
	SHOW_MAP_TOOLBAR: 'showMapToolbar',
	CHECK_MAP_PARAMETER: 'checkMapParameter',
	ADD_AUTO_MOVE_COORDINATE: 'addAutoMoveCoordinate',
	ADD_AUTO_MOVE_CLEAR: 'addAutoMoveClear',
	STOPEDITEVENT: 'stopEditEvent',
	RESIZE_TOOL_ITEMS: 'resizeToolItems',
	THREE_DIM_RESIZE_TOOL_ITEMS: 'threeDimResizeToolItems',
	THREE_DIM_SET_LEGEND_LOCATION: 'threeDimSetLegendLocation',
	SET_TERRAINCROSS_CHART: 'setTerrainCrossChart',
	CREATE_WINDOW: 'createWindow',
	RELOAD_LAYER_SET: 'reloadLayerSet',
	RELOAD_USER_LIST: 'relaodUserList',
	LAYER_SET_COMBO_SET_VALUE: 'layerSetComboSetValue',
	PULL_WATER_DYNAMIC_LAYER_ON_OFF: 'pullWaterdynamicLayerOnOff'
}

var $KRF_WINS = {
	KRF: { MAP: { id: 'map-win' } },
	STATUS: { MAIN: { id: 'status-win' } },
	ADMIN: { MAIN: { id: 'admin-win' } },
	THREEDIM: { MAIN: { id: 'threeDim-win' } },
	REPORT: { MAIN: { id: 'report-win' } },
	LOGIN: { MAIN: { id: 'login-win' } },
	NOTICE: { id: 'browserNoticeWindow' }
};

var $KRF_APP = null;

// 버전 관리
Ext.manifest.loader = { 'cache': '1.0.7', 'cacheParam': '_ver' };

Ext.create('Ext.data.Store', {
	autoLoad: true,
	fields: [{
		name: 'MapserviceUrl'
	}],
	proxy: {
		type: 'ajax',
		url: './resources/data/AppVariable.json',
		reader: {
			type: 'json'
		}
	}
}).load(function (a, b, c) {
	this.each(function (record, cnt, totCnt) {
		$KRF_DEFINE = record.data;
		$KRF_DEFINE.mapToolbarHeight = 58;
		$KRF_DEFINE.windowHeaderHeight = 36;
		$KRF_DEFINE.westToolbarWidth = 80;
		$KRF_DEFINE.threeDimServerURL = 'http://112.217.167.123:40004'
	});
	var apiStore = Ext.create('Ext.data.Store', {
		autoLoad: true,

		fields: [{
			name: 'apiUrls'
		}],
		proxy: {
			type: 'ajax',
			url: './resources/data/APIUrlsTobe.json',
			reader: {
				type: 'json'
			}
		}
	});


	apiStore.load(function (a, b, c) {
		_API = a[0].data;
		// API URL 앞에 분을 문자열을 넣을 수 있다. http://localhost:8080 ...
		// 외부망 표준화 이전 DB / 외부망 표준화 DB
		a[0].data.init('http://localhost:8080/krf'); 

		Ext.application({
			name: 'krf_new',
			requires: ['krf_new.global.Obj',
				'krf_new.global.DroneFn',
				'krf_new.global.CommFn',
				'krf_new.global.TabFn',
				'krf_new.global.AttrFn',
				'krf_new.global.SstgGridFn',
				'Ext.util.LocalStorage'
			],
			autoCreateViewport: 'krf_new.view.main.Main',
			// mainView :'krf_new.view.main.Main',
			desktopApp: null,

			KRF_MODE: 'KRF_MODE',
			STATUS_MODE: 'STATUS_MODE',
			REPORT_MODE: 'REPORT_MODE',
			THREEDIM_MODE: 'THREEDIM_MODE',
			ADMIN_MODE: 'ADMIN_MODE',
			currentMode: '',

			modeWindows: {
				krf: [],
				sb: []
			},

			localStorate: null,

			launch: function () {

				Ext.onReady(function () {
					$('#pageloaddingDiv').remove();

					$KRF_APP = krf_new.getApplication();

					$KRF_APP.localStorate = new Ext.util.LocalStorage({
						id: 'krfStorage'
					});

					$KRF_APP.global = krf_new.global;
					$KRF_APP.global.CommFn.isIEFunc();

					$KRF_APP.addListener($KRF_EVENT.DESK_TOP_LOADED, $KRF_APP.desktopLoaded, this);
					$KRF_APP.addListener($KRF_EVENT.MAP_WINDOW_LOADED, $KRF_APP.mapWindowLoaded, this);
					$KRF_APP.addListener($KRF_EVENT.CORE_MAP_LOADED, $KRF_APP.coreMapLoaded, this);
					// 모드 변경
					$KRF_APP.addListener($KRF_EVENT.MODE_CHANGED, $KRF_APP.modeChanged, this);

					$KRF_APP.addListener($KRF_EVENT.MINIMIZE_WINDOWS, $KRF_APP.minimizeWindows, this);

					$KRF_APP.addListener($KRF_EVENT.CENTERAT, $KRF_APP.centerAt, this);

					$KRF_APP.addListener($KRF_EVENT.CREATE_WINDOW, $KRF_APP.createWindow, this);

					// 리치 툴바 on/off
					$KRF_APP.addListener($KRF_EVENT.SHOW_REACH_TOOLBAR, $KRF_APP.showReachToolbar, this);
					$KRF_APP.addListener($KRF_EVENT.HIDE_REACH_TOOLBAR, $KRF_APP.hideReachToolbar, this);

					$KRF_APP.addListener($KRF_EVENT.SHOW_MAP_TOOLBAR, $KRF_APP.showMapToolbar, this);


					// drone 툴바 on/off
					$KRF_APP.addListener($KRF_EVENT.SHOW_DRONE_TOOLBAR, $KRF_APP.showDroneToolbar, this);
					$KRF_APP.addListener($KRF_EVENT.HIDE_DRONE_TOOLBAR, $KRF_APP.hideDroneToolbar, this);

					// Map 툴팁 위치 조정
					$KRF_APP.addListener($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION, setTooltipXY, this);

					// 지점 목록 window
					$KRF_APP.addListener($KRF_EVENT.SHOW_SITE_LIST_WINDOW, $KRF_APP.showSiteListWindow, this);
					$KRF_APP.addListener($KRF_EVENT.HIDE_SITE_LIST_WINDOW, $KRF_APP.hideSiteListWindow, this);

					$KRF_APP.addListener($KRF_EVENT.WEST_TAB_CHANGE, $KRF_APP.westTabChange, this);

					$KRF_APP.addListener($KRF_EVENT.CHECK_MAP_PARAMETER, $KRF_APP.checkMapParameter, this);

					$KRF_APP.addListener($KRF_EVENT.SHOWMETADATAWINDOW, $KRF_APP.showMetaDataWindow, this);
					$KRF_APP.addListener($KRF_EVENT.HIDEMETADATAWINDOW, $KRF_APP.hideMetaDataWindow, this);

					// $KRF_APP.addListener($KRF_EVENT.RESIZE_TOOL_ITEMS, $KRF_APP.resizeToolItems, this);


					$KRF_APP.showMapToolbar();

					//항공영상 윈도우 생성
					$KRF_APP.showDroneEdit();

					$KRF_APP.mapWindowLoaded(Ext.getCmp('_mapDiv_'));

					Ext.on('resize', function () {

						var width = window.outerWidth;
						var height = window.outerHeight;
						var mapC = Ext.getCmp('_mapDiv_');
						mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
						mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);
						mapC = Ext.getCmp('center_container');
						mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
						mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);
						mapC = Ext.getCmp('cont_container');
						mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
						mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);

						$KRF_APP.resizeToolItems();
						$KRF_APP.setSubWindowLocation();
					});

					Ext.fireEvent('resize');
				});
			},
			mapWindowLoaded: function (map) {

				if (map.id == '_mapDiv_') {
					map.mapRendered();
					$KRF_APP.coreMap = map;
				} else {
					$KRF_APP.subMap = map;
					$KRF_APP.fireEvent($KRF_EVENT.INITMINIMAPLINE);

				}
			},
			// 추후에 초기 맵 extend 변경 가능하게 만들어 놓음
			coreMapLoaded: function (param) {

				if (param.id == '_mapDiv_') {
					var centerContainer = Ext.getCmp('cont_container');
					var searchWindow = Ext.create('krf_new.view.search.MapSearchWindow', { y: $KRF_DEFINE.mapToolbarHeight });
					centerContainer.add(searchWindow);
					searchWindow.show();
					// $KRF_APP.fireEvent($KRF_EVENT.SHOW_MAP_TOOLBAR);
					$KRF_APP.fireEvent($KRF_EVENT.CHECK_MAP_PARAMETER);

					Ext.defer(function () {

						var subMapWindow = Ext.create('krf_new.view.map.SubMapWindow', { id: 'subMapWindow', x: centerContainer.getWidth() - 460, y: centerContainer.getHeight() - 350 });
						centerContainer.add(subMapWindow);

					}, 500);
				}

				$KRF_APP.checkBrowser();
			},
			checkBrowser: function () {
				if (Ext.browser.is.IE) {
					var centerContainer = Ext.getCmp('center_container');
					var smallBrowserWin = Ext.create('Ext.window.Window', {
						id: 'smallBrowserWin',
						constrain: true,
						x: window.innerWidth - 100,
						y: window.innerHeight - 100,
						width: 300,
						resizable: false,
						cls: 'subWindow-x-form-item-label-default',
						bodyStyle: 'background: #405166 !important; color:#fff;',
						header: false,
						items: [{
							xtype: 'label',
							text: '시스템 최적화 방법 (크롬 설치 안내)',
							style: 'cursor: pointer; font-weight: bold; top: 10px; left: 5px; padding: 0px 20px; background: url(./resources/images/button/meta.png) no-repeat;',
							listeners: {
								el: {
									click: function () {
										Ext.getCmp('smallBrowserWin').hide();
										var centerContainer = Ext.getCmp('center_container');
										var noticeWin = Ext.getCmp('browserNoticeWindow');
										if (!noticeWin) {
											Ext.create('krf_new.view.common.BrowserNotice');
											noticeWin = Ext.getCmp('browserNoticeWindow');
										}
										centerContainer.add(noticeWin);
										noticeWin.show();
									}
								}
							},
						}, {
							xtype: 'image',
							style: 'position: absolute; top: 11px; right: 5px;',
							src: './resources/images/button/header-close.png'
						}]
					});
					centerContainer.add(smallBrowserWin);

					smallBrowserWin.show();
					smallBrowserWin.setHeight(40);
				}
			},

			showDroneEdit: function () {
				//console.info($KRF_APP.getDroneLayer);
				if ($KRF_APP.DRONELAYERS != undefined) {
					var dronePanel = Ext.getCmp('adminConfigDRONEPanel');
					if (dronePanel != undefined) {
						if (dronePanel == undefined) {
							dronePanel = Ext.create('krf_new.view.center.AdminConfigDRONEPanel', { x: Ext.getCmp('cont_container').getWidth() - 1220, y: $KRF_DEFINE.mapToolbarHeight });
							Ext.getCmp('cont_container').add(dronePanel);
							dronePanel.hide();
						}
					}
					dronePanel.show();
				} else {
					Ext.Ajax.request({
						url: _API.getDroneLayer,
						dataType: "text/plain",
						method: 'POST',
						async: true,
						success: function (response, opts) {
							var droneLyaer = Ext.util.JSON.decode(response.responseText);
							if (droneLyaer.data.length > 0) {
								$KRF_APP.DRONELAYERS = droneLyaer;
								var dronePanel = Ext.getCmp('adminConfigDRONEPanel');
								if (dronePanel == undefined) {
									dronePanel = Ext.create('krf_new.view.center.AdminConfigDRONEPanel', { x: Ext.getCmp('cont_container').getWidth() - 1220, y: $KRF_DEFINE.mapToolbarHeight });
									Ext.getCmp('cont_container').add(dronePanel);
									dronePanel.hide();
								}
							}
						}
					});
				}


			},

			hideDroneEdit: function () {
				var dronePanel = Ext.getCmp('adminConfigDRONEPanel');
				if (dronePanel != undefined) {
					dronePanel.hide();
				}
			},

			//소하천 dynamic 켜기
			// onClickSRiver: function (obj, el, evt) {

			// 	var coreMap = Ext.getCmp("_mapDiv_");
			// 	//var DynamicLayerSRiver = coreMap.map.getLayer("DynamicLayerSRiver");

			// 	var btnLayerSRiver = Ext.getCmp("btnLayerSRiver").btnOnOff;

			// 	var subMapWindow = Ext.getCmp("subMapWindow");

			// 	if (btnLayerSRiver == "on") {
			// 		//DynamicLayerSRiver.setVisibleLayers([0, 1, 2]);
			// 		//Ext.getCmp("btnLayerSRiver").btnOnOff = "off";
			// 		subMapWindow.show();
			// 	} else {
			// 		//DynamicLayerSRiver.setVisibleLayers([-1]);
			// 		//Ext.getCmp("btnLayerSRiver").btnOnOff = "on";
			// 		subMapWindow.hide();
			// 	}
			// 	return win;
			// },

			resizeToolItems: function () {
				var reachToolbar = Ext.getCmp('reachToolbar');
				if (!reachToolbar) {
					return;
				}
				var toolbarItmes = reachToolbar.items.items;

				var gabWidth = Ext.getCmp('_mapDiv_').getWidth();

				for (var i = 0; i < toolbarItmes.length; i++) {
					if (!toolbarItmes[i].hidden) {
						gabWidth = gabWidth - reachToolbar.itemWidth;
					}

				}
				if (gabWidth < 0) {
					gabWidth = 0;
				}
				var gabCon = Ext.getCmp('gapToolbarContainer');
				gabCon.setWidth(gabWidth + 40);

				var reachNameToolbar = Ext.getCmp('reachNameToolbar');
				if (reachNameToolbar) {
					if (!reachNameToolbar.hidden) {
						setTimeout(function () {
							reachNameToolbar.setX(368);
							reachNameToolbar.setY(96)
						}, 100);
					}
				}
			},

			setSubWindowLocation: function () {

				var rToolbarOnOff = Ext.getCmp("btnModeReach");

				var chlLegend = Ext.getCmp("chlLegend"); // 범례 이미지 컨트롤
				var phyLegend = Ext.getCmp("phyLegend"); // 범례 이미지 컨트롤

				var mapWin = Ext.getCmp('map-win');
				var mapWinX = mapWin.getX();
				var mapWinY = mapWin.getY();
				var mapWinWidth = mapWin.getWidth();
				var mapWinHeight = mapWin.getHeight();

				var legendX = (mapWinWidth + mapWinX) - 244;
				var legendY = (mapWinHeight + mapWinY) - 61;
				Ext.defer(function () {
					if (chlLegend != null && !chlLegend.isHidden()) {
						chlLegend.show();
						chlLegend.setX(legendX);
						chlLegend.setY(legendY);
					}
					if (phyLegend != null && !phyLegend.isHidden()) {
						phyLegend.show();
						phyLegend.setX(legendX);
						phyLegend.setY(legendY);
					}
				}, 1);
			},
			showMapToolbar: function () {
				var rToolbar = Ext.getCmp("reachToolbar");
				var cContainer = Ext.getCmp("cont_container");

				if (rToolbar == undefined) {
					rToolbar = Ext.create('krf_new.view.center.ReachToolbar', {
						id: 'reachToolbar',
						cls: 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target',
						style: 'z-index: 19000; position: absolute; padding: 0px 0 0px 0px !important;'
					});
					cContainer.add(rToolbar);
				}
				rToolbar.show();

				$KRF_APP.resizeToolItems();
			},

			showReachToolbar: function () {
				var rNameToolbar = Ext.getCmp("reachNameToolbar");
				var rToolbar = Ext.getCmp("reachToolbar");
				var cContainer = Ext.getCmp("cont_container");
				var searchConfig = Ext.getCmp("searchConfig");
				var radiusToolbar = Ext.getCmp("radiusToolbar");

				var rNameToolbarIdx = rToolbar.getReachModeBtnIdx('btnMenu04');
				var radiusToolbarIdx = rToolbar.getReachModeBtnIdx('btnMenu07');

				rToolbar.showReachModeBtn();

				if (rNameToolbar == undefined) {
					rNameToolbar = Ext.create('krf_new.view.center.ReachNameToolbar', {});
					cContainer.add(rNameToolbar);
				}

				if (searchConfig == undefined) {
					searchConfig = Ext.create('krf_new.view.center.SearchConfig', {});
					cContainer.add(searchConfig);
				}

				if (radiusToolbar == undefined) {
					radiusToolbar = Ext.create('krf_new.view.center.RadiusToolbar', {});
					cContainer.add(radiusToolbar);
				}

				rNameToolbar.show();
				rNameToolbar.setX(rToolbar.getX() + (rToolbar.itemWidth * rNameToolbarIdx) - 8);
				rNameToolbar.setY(rToolbar.getY() + (rToolbar.itemHeight + 1.4));

				radiusToolbar.show();
				radiusToolbar.setX(rToolbar.getX() + (rToolbar.itemWidth * radiusToolbarIdx) - 8);
				radiusToolbar.setY(rToolbar.getY() + (rToolbar.itemHeight + 1.4));
				radiusToolbar.hide();

				$KRF_APP.resizeToolItems();
			},
			hideReachToolbar: function () {
				var cContainer = Ext.getCmp("cont_container");
				var rToolbar = Ext.getCmp("reachToolbar");
				var rNameToolbar = Ext.getCmp("reachNameToolbar");
				var sConfig = Ext.getCmp("searchConfig");
				var kConfig = Ext.getCmp("kradSchConf");

				var btnObj = rToolbar.query('image');

				for (var i = 0; i < btnObj.length; i++) {
					if (btnObj[i].id.indexOf('btnMenu0') > -1) {
						Ext.getCmp(btnObj[i].id).setVisible(false);
					}
				}

				$KRF_APP.resizeToolItems();

				if (rNameToolbar != undefined && rNameToolbar != null)
					rNameToolbar.hide();
				if (sConfig != undefined && sConfig != null)
					sConfig.hide();
				if (kConfig != undefined && kConfig != null)
					kConfig.hide();
			},
			showDroneToolbar: function () {
				var cContainer = Ext.getCmp("cont_container");

				var droneToolbar = Ext.getCmp("droneToolbar");
				var droneDetailExp = Ext.getCmp("droneDetailExp");

				if (!droneToolbar) {
					droneToolbar = Ext.create('krf_new.view.center.drone.DroneToolbar', {
						x: 351,
						y: 61
					});
					cContainer.add(droneToolbar);
				}

				if (!droneDetailExp) {
					droneDetailExp = Ext.create('krf_new.view.center.drone.DroneDetailExp', {
						x: 494
					});
					cContainer.add(droneDetailExp);
				}
				droneToolbar.show();
				droneDetailExp.show();
			},
			hideDroneToolbar: function () {
				var droneToolbar = Ext.getCmp("droneToolbar");
				var droneDetailExp = Ext.getCmp("droneDetailExp");

				if (droneToolbar) {
					droneToolbar.hide();
				}

				if (droneDetailExp) {
					droneDetailExp.hide();
				}

				var sConfig = Ext.getCmp("searchConfig");
				var kConfig = Ext.getCmp("kradSchConf");

				if (sConfig != undefined && sConfig != null)
					sConfig.hide();
				if (kConfig != undefined && kConfig != null)
					kConfig.hide();

			},
			searchNodeId: function (btn) {

				var layerObj = Ext.getCmp("layer01");
				var nodeObj = "";
				var lyrId = "";

				switch (btn) {
					case "btnReachLayer": lyrId = "RCH_DID"; break;
					case "btnAreaLayer": lyrId = "CAT_DID"; break;
					case "btnFlowLayer": lyrId = "RCH_FLW"; break;
					case "btnReachNodeLayer": lyrId = "NODE_DID"; break;
					case "SRIVER": lyrId = "SRIVER"; break;
					default: break;
				}

				//소하천일 경우 임시
				for (var i = 0; i < layerObj.store.data.items.length; i++) {

					if (layerObj.store.data.items[i].data.siteIdCol == lyrId) {
						nodeObj = layerObj.store.data.items[i];

						var isChecked = nodeObj.get('checked');

						nodeObj.set('checked', !isChecked);
						layerObj.fireEvent('checkchange', nodeObj, !isChecked);

						$KRF_APP.northLink(nodeObj);
					}
				}
			},
			northLink: function (node) {
				if (node.data.siteIdCol != undefined) {
					if (node.data.siteIdCol == "RCH_DID") {
						SetBtnOnOff("btnReachLayer");
					} else if (node.data.siteIdCol == "CAT_DID") {
						SetBtnOnOff("btnAreaLayer");
					} else if (node.data.siteIdCol == "RCH_FLW") {
						SetBtnOnOff("btnFlowLayer");
					} else if (node.data.siteIdCol == 'NODE_DID') {
						SetBtnOnOff("btnReachNodeLayer");
					}
				}
			},
			// 지점 목록 창 띄우기
			showSiteListWindow: function (param) {
				if (param == null || param.searchText == null) {
					return;
				}
				// 검샋시 다른 더튼값 초기화
				var cmbArea1 = Ext.getCmp("cmbArea1");
				var cmbArea2 = Ext.getCmp("cmbArea2");
				var cmbArea3 = Ext.getCmp("cmbArea3");
				var cmbWater1 = Ext.getCmp("cmbWater1");
				var cmbWater2 = Ext.getCmp("cmbWater2");
				var cmbWater3 = Ext.getCmp("cmbWater3");
				var txtSearch = Ext.getCmp("textSearchText");

				var textSearchText_Start = Ext.getCmp("textSearchText_Start");
				var textSearchText_End = Ext.getCmp("textSearchText_End");

				if (param.searchText == 'waterSearch') {// 수계검색시 행정구역 초기화
					cmbArea1.setValue("");
					cmbArea2.setValue("");
					cmbArea3.setValue("");
					txtSearch.setValue("");

					textSearchText_Start.setValue("");
					textSearchText_End.setValue("");
				} else if (param.searchText == 'admSearch') {// 행정구역검색시 수계
					// 초기화
					cmbWater1.setValue("");
					cmbWater2.setValue("");
					cmbWater3.setValue("");
					txtSearch.setValue("");
					textSearchText_Start.setValue("");
					textSearchText_End.setValue("");
				} else if (param.searchText == "nameSearch") {// 명칭찾기시 수계 행정구역
					// 초기화
					cmbArea1.setValue("");
					cmbArea2.setValue("");
					cmbArea3.setValue("");
					cmbWater1.setValue("");
					cmbWater2.setValue("");
					cmbWater3.setValue("");
					textSearchText_Start.setValue("");
					textSearchText_End.setValue("");
				} else if (param.searchText == "SEnameSearch") {
					cmbArea1.setValue("");
					cmbArea2.setValue("");
					cmbArea3.setValue("");
					cmbWater1.setValue("");
					cmbWater2.setValue("");
					cmbWater3.setValue("");
					txtSearch.setValue("");
				} else {
				}

				var siteListWindow = Ext.getCmp("siteListWindow");
				if (siteListWindow == undefined) {
					siteListWindow = Ext.create('krf_new.view.east.SiteListWindow', { x: Ext.getCmp('cont_container').getWidth() - 520, y: $KRF_DEFINE.mapToolbarHeight });
					Ext.getCmp('cont_container').add(siteListWindow);
				}

				siteListWindow.show();

				var store = null;
				var treeCtl = Ext.getCmp("siteListTree");

				if (param.searchType == "krad") {
					store = Ext.create('krf_new.store.east.KradListWindow');
				} else {
					store = Ext.create('krf_new.store.east.SiteListWindow', {
						async: true,
						param: param
					});
				}

				if (param.searchText == "paramSearch") {
					store.paramType = param.searchType;
				}
				store.searchType = param.searchText;
				store.load();
				treeCtl.setStore(store);

				// 좌측 정보창 버튼 on
				SetBtnOnOff("btnSiteListWindow", "on");
			},
			hideSiteListWindow: function (currCtl) {
				var listWinCtl = Ext.getCmp("siteListWindow");
				if (listWinCtl != undefined) {
					listWinCtl.close();
				}
				listWinCtl = Ext.getCmp("siteListWindow_reach");
				if (listWinCtl != undefined) {
					listWinCtl.close();
				}
				// 좌측 정보창 버튼 off
				SetBtnOnOff("btnSiteListWindow", "off");
			},
			westTabChange: function (btnOnOff) {

				var tabIdx = 1;
				var titleNm = '위치검색';
				if (btnOnOff == 'on') {
					tabIdx = 0;
					titleNm = '주제도 선택';
				}

				var westContents = Ext.getCmp("westContents");
				westContents.setActiveItem(tabIdx);
				Ext.getCmp('search-win').setTitle(titleNm);
			},

			showMetaDataWindow: function () {
				var cContainer = Ext.getCmp("cont_container");
				var metaDataWindow = Ext.getCmp('metaDataWindow');
				if (metaDataWindow == undefined) {
					metaDataWindow = Ext.create('krf_new.view.search.MetaDataWindow');
					cContainer.add(metaDataWindow);
				}
				metaDataWindow.show();
			},

			hideMetaDataWindow: function () {
				var metaDataWindow = Ext.getCmp('metaDataWindow');
				metaDataWindow.close();
				//me
			},

			checkMapParameter: function () {
				var getParam = window.location.search.substring(1);
				var params = Ext.urlDecode(getParam);
				if (params.stationType != undefined) {
					var paramIdx = 0;
					if (paramIdx > -1) {
						var siteIds = params.station.split("|");
						var where = "JIJUM_CODE IN (";

						for (var i = 0; i < siteIds.length; i++) {
							if (siteIds[i] != "") {
								where += "'" + siteIds[i] + "', ";
							}
						}
						where = where.substring(0, where.length - 2) + ")";
						require(["esri/tasks/query",
							"esri/tasks/QueryTask",
							"esri/graphic",
							"esri/layers/GraphicsLayer",
							"esri/symbols/PictureMarkerSymbol",
							"esri/graphicsUtils"],
							function (Query,
								QueryTask,
								Graphic,
								GraphicsLayer,
								PictureMarkerSymbol,
								graphicsUtils) {

								var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + '/' + $KRF_DEFINE.siteInfoLayerId);
								var query = new Query();
								query.returnGeometry = true;
								query.outFields = ["*"];
								query.where = where;

								// 리치라인 조회
								queryTask.execute(query, function (featureSet) {

									if (featureSet.features.length > 0) {

										var coreMap = $KRF_APP.coreMap;

										var symbol = new PictureMarkerSymbol({
											"angle": 0,
											"yoffset": 22,
											"type": "esriPMS",
											"url": "./resources/images/symbol/spot_99.gif",
											"contentType": "image/png",
											"width": 30,
											"height": 44
										});

										var graphicLayer = new GraphicsLayer();
										graphicLayer.id = "siteSymbolGraphic";

										for (var i = 0; i < featureSet.features.length; i++) {
											var graphic = new Graphic(featureSet.features[i].geometry, symbol);
											graphicLayer.add(graphic);
										}
										var extent = graphicsUtils.graphicsExtent(graphicLayer.graphics);
										coreMap.map.setExtent(extent);

										Ext.defer(function () {

											var level = coreMap.map.getLevel() - 1;

											if (level > 12) {
												coreMap.map.setLevel(12);
											}
											else {
												coreMap.map.setLevel(level);
											}
										}, 500);
										coreMap.map.addLayer(graphicLayer);

										$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, { searchText: 'paramSearch', searchType: params.stationType });

										// Ext.ShowSiteListWindow("paramSearch", params.stationType);
									}
								});
							});
					}
				}else if(params.droneMode != undefined){
					SetBtnOnOff('btnSearchDrone');
					$KRF_APP.fireEvent($KRF_EVENT.SHOW_DRONE_TOOLBAR);
				}
			}
		});

	});
});







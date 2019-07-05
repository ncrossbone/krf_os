/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
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
	BO_DYNAMIC_LAYER_ON_OFF: 'bodynamicLayerOnOff',
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
	SHOW_BO_LIST_WINDOW: 'showBoListWindow',
	HIDE_BO_LIST_WINDOW: 'hideBoListWindowBo',
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
	PULL_WATER_DYNAMIC_LAYER_ON_OFF: 'pullWaterdynamicLayerOnOff',
	DROUGHT_DYNAMIC_LAYER_ON_OFF: 'droughtDynamicLayerOnOff'

	,HIGH_CHART_CONTROL: 'highChartControl'
	,CREATE_HIGH_CHART: 'createHighChart'
	,SET_HIGH_CHART_DATE: 'setHighChartDate'
	,GET_BO_CODE: 'getBoCode'
	,SET_BO_DATA_MARKER:'setBoDataMarker'
	,REMOVE_BO_DATA_MARKER:'removeBoDataMarker'
	,VIEW_01_GRAPHIC_LAYER: 'view01GraphicLayer'
	,VIEW_02_GRAPHIC_LAYER: 'view02GraphicLayer'
	,VIEW_GRAPHIC_LAYER_CONTROLLER: 'viewGraphicLayerController'
	,SHOWVIEWDATAWINDOW:'showViewDataWindow'
	,HIDEVIEWDATAWINDOW:'hideViewDataWindow'
	,REMOVE_VIEW_GRAPHIC_LAYER: 'removeViewGraphicLayer'
	,MAIN_BO_GRAPHIC_LAYER: 'mainBoGraphicLayer'
	,CREATE_HIGH_CHART_DATE:'createHighChartDate'
	,BO_CENTER_MOVE: 'boCenterMove'
}

var $KRF_WINS = {
	KRF: { MAP: { id: 'map-win' } },
	STATUS: { MAIN: { id: 'status-win' } },
	ADMIN: { MAIN: { id: 'admin-win' } },
	THREEDIM: { MAIN: { id: 'threeDim-win' } },
	REPORT: { MAIN: { id: 'report-win' } },
	LOGIN: { MAIN: { id: 'login-win' } }
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
		a[0].data.init('http://112.217.167.123:40003');
		
		//a[0].data.init('http://localhost:80'); 

		Ext.application({
			name: 'krf_new',
			requires: ['krf_new.Desktop.App',
				'krf_new.global.Obj',
				'krf_new.global.DroneFn',
				'krf_new.global.CommFn',
				'krf_new.global.TabFn',
				'krf_new.global.AttrFn',
				'krf_new.global.SstgGridFn',
				'Ext.util.LocalStorage'
			],

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

			init: function () {
				var me = this;
				$KRF_APP = this;

				me.currentMode = me.KRF_MODE;

				desktopApp = new krf_new.Desktop.App();

				me.localStorate = new Ext.util.LocalStorage({
					id: 'krfStorage'
				});

				$KRF_APP.global = krf_new.global;
				$KRF_APP.global.CommFn.isIEFunc();

				$KRF_APP.addListener($KRF_EVENT.DESK_TOP_LOADED, me.desktopLoaded, me);
				$KRF_APP.addListener($KRF_EVENT.MAP_WINDOW_LOADED, me.mapWindowLoaded, me);
				$KRF_APP.addListener($KRF_EVENT.CORE_MAP_LOADED, me.coreMapLoaded, me);
				// 모드 변경
				$KRF_APP.addListener($KRF_EVENT.MODE_CHANGED, me.modeChanged, me);

				$KRF_APP.addListener($KRF_EVENT.MINIMIZE_WINDOWS, me.minimizeWindows, me);

				$KRF_APP.addListener($KRF_EVENT.CENTERAT, me.centerAt, me);

				$KRF_APP.addListener($KRF_EVENT.CREATE_WINDOW, me.createWindow, me);

				$KRF_APP.highChart = {saveParentId: '' //그룹코드
				, ulIdArr:[] //지점코드
				, ulNameArr:[] //지점명칭
				, seriesArr:[] // 하이차트 데이터
				, removeLabel:false //
				, dateArr: [] // 차트 날짜
				, chartObj:{} // 
				, fFlag : '' // 환경기초시설 구분
				, parentName: '' // 상위 그룹 이름
				, param:{'url':'', 'startYearHigh':'', 'endYearHigh':'' , 'startMonthHigh': '', 'endMonthHigh':'' 
						, 'selectItem':'', 'maxDate':'', 'minDate':'', 'defaultChart':'1'}};
				$KRF_APP.centerPoint = "";
									// shp 데이터 미완성  하드코딩
				$KRF_APP.boObj = [{'ptNo':'1007A20','wSys':'R01', 'isOpen':false ,'ptNm':'강천보' },
								{'ptNo':'1007A27','wSys':'R01', 'isOpen':false ,'ptNm':'여주보'  },
								{'ptNo':'1007A60','wSys':'R01', 'isOpen':false  ,'ptNm':'이포보'  },
								{'ptNo':'2007A25','wSys':'R02', 'isOpen':false ,'ptNm':'상주보' },
								{'ptNo':'2009A05','wSys':'R02', 'isOpen':false ,'ptNm':'낙단보'  },
								{'ptNo':'2009A30','wSys':'R02', 'isOpen':false ,'ptNm':'구미보' },
								{'ptNo':'2011A25','wSys':'R02', 'isOpen':false ,'ptNm':'칠곡보' },
								{'ptNo':'2011A55','wSys':'R02', 'isOpen':true  ,'ptNm':'강정고령보'},
								{'ptNo':'2014A25','wSys':'R02', 'isOpen':true  ,'ptNm':'달성보' },
								{'ptNo':'2014A70','wSys':'R02', 'isOpen':true  ,'ptNm':'합천창녕보'},
								{'ptNo':'2020A32','wSys':'R02', 'isOpen':true  ,'ptNm':'창녕함안보'},
								{'ptNo':'3012A07','wSys':'R03', 'isOpen':true  ,'ptNm':'세종보'},
								{'ptNo':'3012A32','wSys':'R03', 'isOpen':true  ,'ptNm':'공주보'},
								{'ptNo':'3012A42','wSys':'R03', 'isOpen':true  ,'ptNm':'백제보'},
								{'ptNo':'5004A10','wSys':'R04', 'isOpen':true  ,'ptNm':'승촌보'},
								{'ptNo':'5004A35','wSys':'R04', 'isOpen':true  ,'ptNm':'죽산보'}];

				Ext.Ajax.request({
					url: _API.getBoInfo,
					dataType: "text/html",
					method: 'POST',
					async: true,
					success: function (response, opts) {
						var result = Ext.util.JSON.decode(response.responseText);
						if(result.result.length > 0 ) {
							for(var i = 0 ; i < result.result.length; i ++){
								$KRF_APP.boObj.map(function(mapValue){
									if(result.result[i].SPOT_CODE == mapValue.ptNo){
										mapValue.isOpen = result.result[i].OPN_AT;
									}
								})
							}
						}
						
					}
				});


			},
			desktopLoaded: function () {

				$('#pageloaddingDiv').remove();


				// 내부망 로그인정보 조회
				$KRF_APP.loginInfo = $KRF_APP.global.CommFn.getLoginUserInfo();
				$KRF_APP.loginInfo = {};
				if ($KRF_APP.loginInfo == null) {
					this.showLoginWindow();
				} else {

					this.completedLogin({ userId: 'weis_admin' });
					// $('#Admin-shortcut').show();

					// this.showWindowByMode();
				}

				this.checkBrowser();

			},
			showLoginWindow: function () {
				var dp = $KRF_APP.getDesktop();
				var dpWidth = dp.getWidth();
				var dpHeight = dp.getHeight();

				var loginModule = $KRF_APP.getDesktopModule($KRF_WINS.LOGIN.MAIN.id);
				var loginWindow = loginModule.createWindow({ x: (dpWidth / 2) - 200, y: (dpHeight / 2) - 300, width: 400, height: 600 });
				//loginWindow = loginWindow.show();
			},

			completedLogin: function (loginInfo) {
				$KRF_APP.loginInfo = loginInfo;

				if (loginInfo.userId == 'weis_admin') {
					$('#Admin-shortcut').show();
				} else {
					$('#Admin-shortcut').remove();
				}

				// Ext.Ajax.request({
				// 	url: _API.getLayerSetForUser,
				// 	dataType: "text/plain",
				// 	method: 'POST',
				// 	params: { userId: loginInfo.userId },
				// 	async: true,
				// 	success: function (response, opts) {
				// 		var result = Ext.util.JSON.decode(response.responseText);
				// 		if (result.data.length > 0) {
				// 			$KRF_APP.USER_LAYERS = result.data[0];
				// 			$KRF_APP.USER_LAYERS.layerSetIds = JSON.parse(result.data[0].layerSetIds);
				// 		}
				// 	}
				// });
				var result = {"data":[{"layerSetName":"기본 설정","layerSetId":1,"layerSetIds":"[\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"12\",\"13\",\"14\",\"35\",\"36\",\"37\",\"38\",\"39\",\"40\",\"41\",\"42\",\"48\",\"49\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\",\"25\",\"P0\",\"P1\",\"26\",\"27\",\"28\",\"29\",\"30\",\"31\",\"32\",\"33\",\"34\",\"52\",\"53\",\"55\",\"56\",\"57\",\"58\",\"59\",\"S\",\"S0\",\"S1\",\"S2\",\"60\",\"61\",\"62\",\"64\",\"65\",\"66\",\"67\",\"68\",\"69\",\"70\",\"71\",\"72\",\"90\",\"91\",\"D0\",\"D1\",\"D2\",\"D3\",\"D4\",\"V0\",\"V1\",\"V2\"]"}]};
				if (result.data.length > 0) {
					$KRF_APP.USER_LAYERS = result.data[0];
					$KRF_APP.USER_LAYERS.layerSetIds = JSON.parse(result.data[0].layerSetIds);
				}

				Ext.Ajax.request({
					url: _API.getDroneLayer,
					dataType: "text/plain",
					method: 'POST',
					async: true,
					success: function (response, opts) {
						var droneLyaer = Ext.util.JSON.decode(response.responseText);
						if (droneLyaer.data.length > 0) {
							$KRF_APP.DRONELAYERS = droneLyaer;
						}
					}
				});
				this.showWindowByMode();
			},
			showWindowByMode: function () {
				var krfMode = this.localStorate.getItem('krfMode');

				this.modeChanged({ mode: krfMode });

				this.modeChanged({ mode: this.REPORT_MODE });
			},

			//Start 메뉴에서 선택시 호출되는 곳
			createWindow: function (module) {

				var windowMode;

				switch (module.id) {
					case $KRF_WINS.KRF.MAP.id:
						windowMode = this.KRF_MODE;
						break;
					case $KRF_WINS.THREEDIM.MAIN.id:
						windowMode = this.THREEDIM_MODE;
						break;
					case $KRF_WINS.STATUS.MAIN.id:
						windowMode = this.STATUS_MODE;
						break;
					case $KRF_WINS.REPORT.MAIN.id:
						windowMode = this.REPORT_MODE;
						break;
					case $KRF_WINS.ADMIN.MAIN.id:
						windowMode = this.ADMIN_MODE
						break;
				}

				$KRF_APP.fireEvent($KRF_EVENT.MODE_CHANGED, { mode: windowMode });
			},
			showWindow: function (windowId, boundary, param) {

				var currentWindow = $KRF_APP.getDesktop().getActiveWindow();

				var targetWindow = $KRF_APP.getDesktopWindow(windowId);
				var targetModule = $KRF_APP.getDesktopModule(windowId);

				if (param) {
					targetModule.initCoord = param;
				}

				if (targetWindow) {
					// targetWindow.show();
					if (targetWindow.minimized) {
						targetWindow.show();
					} else {

						targetWindow.toFront();

						targetWindow.fireEvent('show');
					}
					return;
				}
				if (targetModule) {
					targetWindow = targetModule.createWindow(boundary);
					targetWindow = targetWindow.show();
				}
			},
			showKRFMode: function (coord) {
				this.showWindow($KRF_WINS.KRF.MAP.id, this.getWindowBoundary(0, 0), coord);
			},
			showReportMode: function () {
				this.showWindow($KRF_WINS.REPORT.MAIN.id, this.getWindowBoundary(690, 700));
			},
			showAdminMode: function () {
				this.showWindow($KRF_WINS.ADMIN.MAIN.id, this.getWindowBoundary(1155, 570));
			},
			showStatusMode: function () {
				this.showWindow($KRF_WINS.STATUS.MAIN.id, this.getWindowBoundary(0, 0));
			},
			showThreeDimMode: function (centerCoord) {
				if (Ext.browser.is.IE == true && Ext.browser.version.major <= 10) {
					alert('3D 지도는 Internet Explorer 11 과 Chrome 에서 사용가능합니다.');
					return;
				}
				var boundary = this.getWindowBoundary(0, 0);
				boundary.coord = centerCoord;

				this.showWindow($KRF_WINS.THREEDIM.MAIN.id, boundary, centerCoord);
			},
			modeChanged: function (param) {

				this.currentMode = param.mode;
				// this.localStorate.setItem('krfMode', param.mode);
				//    	window.location.reload();
				/*
				var currentWindow = $KRF_APP.getDesktop().getActiveWindow();
				if (currentWindow) {
					currentWindow.minimize();
				}
		*/
				switch (param.mode) {
					case this.KRF_MODE:
						this.showKRFMode(param.coord);
						break;
					case this.ADMIN_MODE:
						this.showAdminMode();
						break;
					case this.REPORT_MODE:
						this.showReportMode();
						break;
					case this.STATUS_MODE:
						this.showStatusMode();
						break;
					case this.THREEDIM_MODE:
						this.showThreeDimMode(param.coord);
						break;
					default:
						this.showKRFMode();
				}
			},
			getWindowBoundary: function (width, height) {
				var dp = $('.ux-wallpaper');
				var dpWidth = dp.width();
				var dpHeight = dp.height();

				var offsetX = 0;
				var offsetY = 0;

				if (width && width > 0) {
					offsetX = parseInt((dpWidth / 2) - (width / 2));
					dpWidth = width;
				}
				if (height && height > 0) {
					offsetY = parseInt((dpHeight / 2) - (height / 2));
					dpHeight = height;
				}
				return { x: offsetX, y: offsetY, width: dpWidth, height: dpHeight };
			},

			minimizeWindows: function () {
				var desktop = this.getDesktop();
				desktop.windows.each(function (win) {
					win.minimize();
				});
			},
			mapWindowLoaded: function (map) {
				if (map.id == '_mapDiv_') {
					this.coreMap = map;
				} else {
					this.subMap = map;
					$KRF_APP.fireEvent($KRF_EVENT.INITMINIMAPLINE);

				}
			},
			// 추후에 초기 맵 extend 변경 가능하게 만들어 놓음
			coreMapLoaded: function (param) {
				if (param.id == '_mapDiv_') {
					var centerContainer = Ext.getCmp('center_container');
					var searchWindow = Ext.create('krf_new.view.search.MapSearchWindow', { y: $KRF_DEFINE.mapToolbarHeight });
					centerContainer.add(searchWindow);
					searchWindow.show();
					$KRF_APP.fireEvent($KRF_EVENT.SHOW_MAP_TOOLBAR);
					$KRF_APP.fireEvent($KRF_EVENT.CHECK_MAP_PARAMETER);

					Ext.defer(function () {

						var subMapWindow = Ext.create('krf_new.view.map.SubMapWindow', { id: 'subMapWindow', x: centerContainer.getWidth() - 460, y: centerContainer.getHeight() - 350 });
						centerContainer.add(subMapWindow);

					}, 500);

				}
			},
			checkBrowser: function () {
				if (Ext.browser.is.IE) {
					var dp = $KRF_APP.getDesktop();
					var dpWidth = dp.getWidth();
					var dpHeight = dp.getHeight();

					var noticeWin = Ext.getCmp('browserNoticeWindow');
					var centerContainer = Ext.getCmp('center_container');
					if (!noticeWin) {
						Ext.create('krf_new.view.common.BrowserNotice');
						noticeWin = Ext.getCmp('browserNoticeWindow');
					}
					centerContainer.add(noticeWin);
					noticeWin.show();
				}
			},
			centerAt: function (coord) {
				$KRF_APP.coreMap.transCoord(coord, function (transCoord) {
					$KRF_APP.coreMap.map.centerAt(transCoord[0]);
				}, 4019, 102100);
			},
			getDesktopApp: function () {
				return desktopApp;
			},
			getDesktop: function () {
				return desktopApp.desktop;
			},
			getDesktopWindow: function (id) {
				return desktopApp.desktop.getWindow(id);
			},
			getDesktopModule: function (id) {
				return desktopApp.getModule(id);
			}
		});
	});
});


Ext.on('resize', function () {
	var loadWidth = window.innerWidth;
	var loadHeight = window.innerHeight;
	var mapWin = Ext.getCmp('map-win');

	mapWin.setWidth(loadWidth);
	mapWin.setHeight(loadHeight - 40);
});


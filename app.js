/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
var $KRF_DEFINE = null;


// 버전 관리
//Ext.manifest.loader = { 'cache': '1.0.2', 'cacheParam': '_ver' };

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
		$KRF_DEFINE.threeDimServerURL = 'http://112.218.1.243:38081'
	});
});
/*
* 박철 추가 API URL 를 JSON으로 관리
*/
var _API = null;

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
	//a[0].data.init('http://localhost:8071');
});

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

		$('#pageloaddingDiv').remove();

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
	},
	desktopLoaded: function () {

		if (this.checkBrowser()) {
			// 내부망 로그인정보 조회
			var loginInfo = $KRF_APP.global.CommFn.getLoginUserInfo();
			loginInfo = {};
			if (loginInfo == null) {
				this.showLoginWindow();
			} else {
				$('#Staus-shortcut').show()
				$('#Admin-shortcut').show()

				this.showWindowByMode();
			}
		}
	},
	showLoginWindow: function () {
		var dp = $KRF_APP.getDesktop();
		var dpWidth = dp.getWidth();
		var dpHeight = dp.getHeight();

		var loginModule = $KRF_APP.getDesktopModule($KRF_WINS.LOGIN.MAIN.id);
		var loginWindow = loginModule.createWindow({ x: (dpWidth / 2) - 200, y: (dpHeight / 2) - 300, width: 400, height: 600 });
		//loginWindow = loginWindow.show();
	},

	completedLogin : function(loginInfo){
		if(loginInfo.userId == 'admin'){
			$('#Staus-shortcut').show()
			$('#Admin-shortcut').show()
		}else{
			$('#Staus-shortcut').remove();
			$('#Admin-shortcut').remove()
		}
		this.showWindowByMode();
	},
	showWindowByMode: function () {
		var krfMode = this.localStorate.getItem('krfMode');

		this.modeChanged({ mode: krfMode });
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
		
		var targetWindow = $KRF_APP.getDesktopWindow(windowId);
		var targetModule = $KRF_APP.getDesktopModule(windowId);

		if (param) {
			targetModule.initCoord = param;
		}

		if (targetWindow) {
			targetWindow.show();
			return;
		}
		if(targetModule){
			targetWindow = targetModule.createWindow(boundary);
			targetWindow = targetWindow.show();
		}
	},
	showKRFMode: function (coord) {
		this.showWindow($KRF_WINS.KRF.MAP.id, this.getWindowBoundary(0, 0), coord);
	},
	showReportMode: function () {
		this.showWindow($KRF_WINS.REPORT.MAIN.id, this.getWindowBoundary(690, 850));
	},
	showAdminMode: function () {
		this.showWindow($KRF_WINS.ADMIN.MAIN.id, this.getWindowBoundary(560, 540));
	},
	showStatusMode: function () {
		this.showWindow($KRF_WINS.STATUS.MAIN.id, this.getWindowBoundary(0,0));
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
		var currentWindow = $KRF_APP.getDesktop().getActiveWindow();
		if (currentWindow) {
			currentWindow.minimize();
		}

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

		if(width && width > 0){
			offsetX = (dpWidth/2)-(width/2);
			dpWidth = width;
		}
		if(height && height > 0){
			offsetY = (dpHeight/2)-(height/2);
			dpHeight = height;
		}

		return { x: offsetX, y: offsetY, width: dpWidth, height: dpHeight};
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
		if (Ext.browser.is.IE == true && Ext.browser.version.major < 10) { // IE11 아래 버전 막기
			var dp = $KRF_APP.getDesktop();
			var dpWidth = dp.getWidth();
			var dpHeight = dp.getHeight();

			var noticeModule = $KRF_APP.getDesktopModule($KRF_WINS.NOTICE.id);
			var noticeWindow = noticeModule.createWindow();
			noticeWindow.show();
			return false;
		}
		return true;
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

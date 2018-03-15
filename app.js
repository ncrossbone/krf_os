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
});

var $KRF_POSITION = null;

var $KRF_EVENT = {
	DESK_TOP_LOADED: 'desktopLoaded',
	CORE_MAP_LOADED: 'coreMapLoaded',
	MAP_WINDOW_LOADED: 'mapWindowLoaded',
	DYNAMIC_LAYER_ON_OFF: 'dynamicLayerOnOff',
	DRON_DYNAMIC_LAYER_ON_OFF: 'drondynamicLayerOnOff',
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
	THREE_DIM_RESIZE_TOOL_ITEMS: 'threeDimResizeToolItems'
}

var $KRF_WINS = {
	KRF: { MAP: { id: 'map-win' } },
	STATUS: { MAIN: { id: 'status-win' } },
	ADMIN: { MAIN: { id: 'admin-win' } },
	THREEDIM: { MAIN: { id: 'threeDim-win' } },
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
		'Ext.util.LocalStorage'
	],

	desktopApp: null,

	KRF_MODE: 'KRF_MODE',
	KRF_MODE: 'STATUS_MODE',
	REPORT_MODE: 'REPORT_MODE',
	ADMIN_MODE: 'ADMIN_MODE',
	THREEDIM_MODE: 'THREEDIM_MODE',

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

	},
	desktopLoaded: function () {

		if (this.checkBrowser()) {
			// 내부망 로그인정보 조회
			var loginInfo = $KRF_APP.global.CommFn.getLoginUserInfo();
			loginInfo = {};
			if (loginInfo == null) {
				this.showLoginWindow();
			} else {
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

	showWindowByMode: function () {
		var krfMode = this.localStorate.getItem('krfMode');

		this.modeChanged({ mode: krfMode });
	},
	showKRFMode: function (coord) {
		/*
		for (var i = 0; i < this.modeWindows.sb.length; i++) {
			this.modeWindows.sb[i].close();
		}

		*/

		// var dp = $KRF_APP.getDesktop();
		var dp = $('.ux-wallpaper');

		var dpWidth = dp.width();
		var dpHeight = dp.height();

		var mapWindow = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.MAP.id);
		var mapModule = $KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id);
		mapModule.initCoord = coord;

		if (mapWindow) {
			mapWindow.show();
			return;
		}
		mapWindow = mapModule.createWindow({ x: 0, y: 0, width: dpWidth, height: dpHeight});
		mapWindow = mapWindow.show();

		$KRF_APP.modeWindows.krf.push(mapWindow);


		//            var searchModule = this.getDesktopModule($KRF_WINS.KRF.SEARCH.id);
		//            var searchWindow = searchModule.createWindow({x:82,y:40, height:dpHeight-83});
		//            searchWindow = searchWindow.show();


		//            this.modeWindows.krf.push(searchWindow);

		//    	var dp = this.getDesktop();
		//    	var dpWidth = dp.getWidth();
		//    	var dpHeight = dp.getHeight();
		//    	
		//        var mapModule = this.getDesktopModule($KRF_WINS.KRF.MAP.id);
		//        var mapWindow = mapModule.createWindow({x:0,y:0, width:dpWidth, height:dpHeight-35});
		//        mapWindow = mapWindow.show();
		//        
		////        var searchModule = this.getDesktopModule($KRF_WINS.KRF.SEARCH.id);
		////        var searchWindow = searchModule.createWindow({x:82,y:40, height:dpHeight-83});
		////        searchWindow = searchWindow.show();
		//        
		//        this.modeWindows.krf.push(mapWindow);
		////        this.modeWindows.krf.push(searchWindow);
	},
	showReportMode: function () {
		/*
		$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).release();

		for (var i = 0; i < this.modeWindows.krf.length; i++) {
			this.modeWindows.krf[i].close();
		}
		*/
		var dp = $KRF_APP.getDesktop();
		var dpWidth = dp.getWidth();
		var dpHeight = dp.getHeight();

		var statusWindow = $KRF_APP.getDesktopWindow($KRF_WINS.STATUS.MAIN.id);

		if (statusWindow) {
			statusWindow.show();
			return;
		}

		var statusModule = $KRF_APP.getDesktopModule($KRF_WINS.STATUS.MAIN.id);
		var statusWindow = statusModule.createWindow({ x: 0, y: 0, width: dpWidth, height: dpHeight - 35 });
		statusWindow = statusWindow.show();

		$KRF_APP.modeWindows.sb.push(statusWindow);
	},
	showAdminMode: function () {
		//    	$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).release();

		var dp = $KRF_APP.getDesktop();
		var dpWidth = dp.getWidth();
		var dpHeight = dp.getHeight();

		var adminWindow = $KRF_APP.getDesktopWindow($KRF_WINS.ADMIN.MAIN.id);

		if (adminWindow) {
			adminWindow.show();
			return;
		}

		var adminModule = $KRF_APP.getDesktopModule($KRF_WINS.ADMIN.MAIN.id);
		var adminWindow = adminModule.createWindow({ x: 0, y: 0, width: dpWidth, height: dpHeight - 35 });
		adminWindow = adminWindow.show();


		//		$KRF_APP.modeWindows.sb.push(statusWindow);
	},
	showThreeDimMode: function (centerCoord) {
		//    	$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).release();
		if (Ext.browser.is.IE == true && Ext.browser.version.major <= 10){
			alert('3D 지도는 Internet Explorer 11 과 Chrome 에서 사용가능합니다.');
			return;
		}

		var threeDimWindow = $KRF_APP.getDesktopWindow($KRF_WINS.THREEDIM.MAIN.id);

		if (threeDimWindow) {
			var threeDimModule = $KRF_APP.getDesktopModule($KRF_WINS.THREEDIM.MAIN.id);
			threeDimModule.initCoord = centerCoord;
			threeDimWindow.show();
			return;
		}

		var dp = $('.ux-wallpaper');

		var dpWidth = dp.width();
		var dpHeight = dp.height();
		var threeDimModule = $KRF_APP.getDesktopModule($KRF_WINS.THREEDIM.MAIN.id);
		var threeDimWindow = threeDimModule.createWindow({ x: 0, y: 0, width: dpWidth, height: dpHeight, coord: centerCoord });
		threeDimWindow = threeDimWindow.show();
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
			case this.THREEDIM_MODE:
				this.showThreeDimMode(param.coord);
				break;
			default:
				this.showKRFMode();
		}
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
			var searchWindow = Ext.create('krf_new.view.search.MapSearchWindow', { y: 60 });
			centerContainer.add(searchWindow);
			searchWindow.show();
			$KRF_APP.fireEvent($KRF_EVENT.SHOW_MAP_TOOLBAR);
			$KRF_APP.fireEvent($KRF_EVENT.CHECK_MAP_PARAMETER);

			
			Ext.defer(function () {
				var subMapWindow = Ext.create('krf_new.view.map.SubMapWindow', { id: 'subMapWindow', x: centerContainer.getWidth() - 460, y: centerContainer.getHeight() - 350 });
				centerContainer.add(subMapWindow);
				//subMapWindow.show();
				subMapWindow.hide();
				
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

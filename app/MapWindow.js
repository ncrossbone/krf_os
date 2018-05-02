/*!
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.MapWindow', {
	extend: 'Ext.ux.desktop.Module',
	requires: [
		'krf_new.view.center.Center',
		'krf_new.view.search.ButtonPanel'
	],

	subWindowIds: ['popSiteInfo', 'reachNameToolbar', 'subMapWindow', 'siteListWindow', 'searchResultWindow'
		, 'chlLegend', 'phyLegend', 'droneToolbar', 'droneDetailExp', 'reachCountSToolbar', 'reachCountEToolbar', 'metaDataWindow', 'radiusToolbar'],
	id: 'map-win',
	once: true,
	initCoord: null,

	init: function () {
		this.launcher = {
			text: '<span class="krf-os-startmenu-text">물환경 지리정보</span>',
			iconCls: 'krf-os-startmenu-krf-icon'
		};

		// 리치 툴바 on/off
		$KRF_APP.addListener($KRF_EVENT.SHOW_REACH_TOOLBAR, this.showReachToolbar, this);
		$KRF_APP.addListener($KRF_EVENT.HIDE_REACH_TOOLBAR, this.hideReachToolbar, this);

		$KRF_APP.addListener($KRF_EVENT.SHOW_MAP_TOOLBAR, this.showMapToolbar, this);


		// drone 툴바 on/off
		$KRF_APP.addListener($KRF_EVENT.SHOW_DRONE_TOOLBAR, this.showDroneToolbar, this);
		$KRF_APP.addListener($KRF_EVENT.HIDE_DRONE_TOOLBAR, this.hideDroneToolbar, this);

		// Map 툴팁 위치 조정
		$KRF_APP.addListener($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION, setTooltipXY, this);

		// 지점 목록 window
		$KRF_APP.addListener($KRF_EVENT.SHOW_SITE_LIST_WINDOW, this.showSiteListWindow, this);
		$KRF_APP.addListener($KRF_EVENT.HIDE_SITE_LIST_WINDOW, this.hideSiteListWindow, this);

		$KRF_APP.addListener($KRF_EVENT.WEST_TAB_CHANGE, this.westTabChange, this);

		$KRF_APP.addListener($KRF_EVENT.CHECK_MAP_PARAMETER, this.checkMapParameter, this);

		$KRF_APP.addListener($KRF_EVENT.SHOWMETADATAWINDOW, this.showMetaDataWindow, this);
		$KRF_APP.addListener($KRF_EVENT.HIDEMETADATAWINDOW, this.hideMetaDataWindow, this);

		$KRF_APP.addListener($KRF_EVENT.RESIZE_TOOL_ITEMS, this.resizeToolItems, this);
	},

	createWindow: function (config) {
		var me = this;

		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('map-win');
		var cfg = Ext.applyIf(config || {}, {
			id: 'map-win',
			header: {
				cls: 'krf-os-parentwin-header'
			},
			width: 840,
			height: 680,
			iconCls: 'krf-os-win-title-krf-icon',
			shadow: false,
			animCollapse: false,
			layout: 'border',
			constrain: true,
			constrainHeader: false,
			maximizable: false,
			minimizable: false,
			resizable: false,
			closable: false,
			onEsc: false,
			tools: [],
			listeners: {
				move: function (theWin, xP, yP, theOp) {
					$KRF_APP.fireEvent($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION);
					me.setSubWindowLocation(xP, yP);
				},
				resize: function (win, width, height) {
					var mapC = Ext.getCmp('_mapDiv_');
					mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
					mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);
					mapC = Ext.getCmp('center_container');
					mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
					mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);
					mapC = Ext.getCmp('cont_container');
					mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
					mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);

					$KRF_APP.fireEvent($KRF_EVENT.RESIZE_TOOL_ITEMS);
					me.setSubWindowLocation();
				},
				render: function () {
				},
				afterrender: function () {
				},
				show: function () {
					this.title = '';

					if (me.once) {
						$KRF_APP.coreMap.mapRendered();
						me.once = false;
					} else {
						if (me.initCoord) {
							$KRF_APP.fireEvent($KRF_EVENT.CENTERAT, me.initCoord);
							me.initCoord = null;
						}
					}
				},
				'beforeclose': function () {
					me.once = true;
				}
			},
			items: [{ xtype: 'west-buttonpanel', region: 'west', collapsible: false },
			{
				xtype: 'container',
				id: 'cont_container',
				layout: {
					type: 'absolute'
				},
				region: 'center',
				height: '100%',
				items: [{ xtype: 'app-default-center', id: 'center_container', x: 0, y: 0 }]
			}]
		});

		if (!win) {
			win = desktop.createWindow(cfg);
		}
		return win;
	},

	//소하천 dynamic 켜기
	onClickSRiver: function (obj, el, evt) {

		var coreMap = Ext.getCmp("_mapDiv_");
		var DynamicLayerSRiver = coreMap.map.getLayer("DynamicLayerSRiver");

		var btnLayerSRiver = Ext.getCmp("btnLayerSRiver").btnOnOff;

		var subMapWindow = Ext.getCmp("subMapWindow");

		if (btnLayerSRiver == "on") {
			DynamicLayerSRiver.setVisibleLayers([0, 1, 2]);
			Ext.getCmp("btnLayerSRiver").btnOnOff = "off";
			subMapWindow.show();
		} else {
			DynamicLayerSRiver.setVisibleLayers([-1]);
			Ext.getCmp("btnLayerSRiver").btnOnOff = "on";
			subMapWindow.hide();
		}
		return win;
	},

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
	},

	setSubWindowLocation: function () {

		var rToolbarOnOff = Ext.getCmp("btnModeReach");

		var chlLegend = Ext.getCmp("chlLegend"); // 범례 이미지 컨트롤
		var phyLegend = Ext.getCmp("phyLegend"); // 범례 이미지 컨트롤

		var mapWin = $KRF_APP.getDesktopWindow('map-win');
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

		$KRF_APP.fireEvent($KRF_EVENT.RESIZE_TOOL_ITEMS);
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

		$KRF_APP.fireEvent($KRF_EVENT.RESIZE_TOOL_ITEMS);
	},
	hideReachToolbar: function () {
		var cContainer = Ext.getCmp("center_container");
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

		$KRF_APP.fireEvent($KRF_EVENT.RESIZE_TOOL_ITEMS);

		if (rNameToolbar != undefined && rNameToolbar != null)
			rNameToolbar.close();
		if (sConfig != undefined && sConfig != null)
			sConfig.close();
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
			sConfig.close();
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

				this.northLink(nodeObj);
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
	release: function () {
		var me = this;

		for (var i = 0; i < me.subWindowIds.length; i++) {
			var targetWindow = Ext.getCmp(me.subWindowIds[i]);
			if (targetWindow != null) {
				targetWindow.close();
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

		//		var desktop = this.getDesktop();
		//		
		//		var siteListModule = this.getDesktopModule($KRF_WINS.KRF.SITE_LIST.id);
		//		
		//		var siteListWindow = siteListModule.createWindow({x:desktop.getWidth()-400,y:0, width:400});
		//		siteListWindow = siteListWindow.show();
		//		
		//		this.modeWindows.krf.push(siteListWindow);

		var siteListWindow = Ext.getCmp("siteListWindow");
		if (siteListWindow == undefined) {
			siteListWindow = Ext.create('krf_new.view.east.SiteListWindow', { x: Ext.getCmp('center_container').getWidth() - 520, y: $KRF_DEFINE.mapToolbarHeight });
			Ext.getCmp('center_container').add(siteListWindow);
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
		}
	}
});


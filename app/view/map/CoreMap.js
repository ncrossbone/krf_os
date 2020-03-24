Ext.define('krf_new.view.map.CoreMap', {
	extend: 'Ext.Component',
	xtype: 'app-map-coreMap',

	id: '_mapDiv_',

	requires: [
		'Ext.chart.*',
		'Ext.window.MessageBox'
	],

	map: null,
	fullExtent: null,
	initialExtent: null,
	preExtent: null,
	preResolution: null,
	preLevel: null,
	layerInfo: null,
	baseMap: null,
	editToolbar : null,

	geometryService:null,


	me: null,
	vworldTileInfo: new esri.layers.TileInfo({
		rows: 256, cols: 256, dpi: 96,
		origin: { x: -20037508.342787, y: 20037508.342787 },
		spatialReference: { wkid: 102100 },
		lods: [
			{ level: 0, resolution: 156543.033928, scale: 591657527.591555 },
			{ level: 1, resolution: 78271.5169639999, scale: 295828763.795777 },
			{ level: 2, resolution: 39135.7584820001, scale: 147914381.897889 },
			{ level: 3, resolution: 19567.8792409999, scale: 73957190.948944 },
			{ level: 4, resolution: 9783.93962049996, scale: 36978595.474472 },
			{ level: 5, resolution: 4891.96981024998, scale: 18489297.737236 },
			{ level: 6, resolution: 2445.98490512499, scale: 9244648.868618 },
			{ level: 7, resolution: 1222.99245256249, scale: 4622324.434309 }, //start
			{ level: 8, resolution: 611.49622628138, scale: 2311162.217155 },
			{ level: 9, resolution: 305.748113140558, scale: 1155581.108577 },
			{ level: 10, resolution: 152.874056570411, scale: 577790.554289 },
			{ level: 11, resolution: 76.4370282850732, scale: 288895.277144 },
			{ level: 12, resolution: 38.2185141425366, scale: 144447.638572 },
			{ level: 13, resolution: 19.1092570712683, scale: 72223.819286 },
			{ level: 14, resolution: 9.55462853563415, scale: 36111.909643 },
			{ level: 15, resolution: 4.77731426794937, scale: 18055.954822 },
			{ level: 16, resolution: 2.38865713397468, scale: 9027.977411 },
			{ level: 17, resolution: 1.19432856685505, scale: 4513.988705 },
			{ level: 18, resolution: 0.597164283559817, scale: 2256.994353 }, //end
			{ level: 19, resolution: 0.298582141647617, scale: 1128.497176 }
		]
	}),

	initComponent: function () {
		me = this;
		this.on('afterrender', me.mapLoaded, this);
		this.callParent();
	},

	mapRendered: function (p) {
		require(["esri/map", 'esri/tasks/GeometryService', 'esri/tasks/ProjectParameters', "dojo/domReady!"], function (Map, GeometryService, ProjectParameters) {
			me.map = new Map(me.id, {
				isDoubleClickZoom: false,
				isPan: true,
				logo: false,
				isMapNavigation: true,
				slider: false,
				showAttribution: false,
				zoom: 8,
				autoResize: true,
				navigationMode: 'css-transforms',
				fadeOnZoom: false,
				force3DTransforms: false,
				testCount: 1

			});

			me.gsvc = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
			me.geometryService = new GeometryService($KRF_DEFINE.arcServiceUrl + "/rest/services/Utilities/Geometry/GeometryServer");

			//me.map.resize();
			me.baseMapInit();
			me.baseMap = new CustomMapsLayer();
			me.map.addLayer(me.baseMap);

			me.map.setLevel(8);

			//        	me.map.setExtent(me.initialExtent);

			/* 외부망 항공사진 주석 */
			me.dynamicLayerAdmin1 = Ext.create('krf_new.view.drone.map.DynamicLayerAdmin1', me.map);
			me.reachLayerAdmin_dim = Ext.create('krf_new.view.map.ReachLayerAdminBackground', me.map); // Dim처리 레이어
			me.dynamicLayerAdmin = Ext.create('krf_new.view.map.DynamicLayerAdmin', me.map);
			me.reachLayerAdmin_v3_New = Ext.create('krf_new.view.map.ReachLayerAdmin_v3_New', me.map); // v3 New
			me.searchLayerAdmin = Ext.create('krf_new.view.map.SearchLayerAdmin', me.map);
			me.graphicsLayerAdmin = Ext.create('krf_new.view.map.GraphicsLayerAdmin', me.map);
			//me.labelLayerAdmin = Ext.create('KRF_DEV.view.map.LabelLayerAdmin', me.map);

			// KRAD 전역 Object Setting
			me._krad = Ext.create('krf_new.view.map.KRADLayerAdmin', me.map, me.geometryService);	
			// 검색설정 "상류" 검색 전역 Object Setting
			me._rchUpSearch = Ext.create('krf_new.view.map.SearchReachUp');
			// 리치라인 전역 Object Setting
			me._rchLine = Ext.create('krf_new.view.map.SearchReachLine');
			// 집수구역 전역 Object Setting
			me._rchArea = Ext.create('krf_new.view.map.SearchReachArea');
			// 리치노드 전역 Object Setting
			me._rchNode = Ext.create('krf_new.view.map.SearchReachNode');

			me.featureLayerAdmin = Ext.create('krf_new.view.map.FeatureLayerAdmin1', me.map);

			dojo.connect(me.map, 'onExtentChange', me.onExtentChange);
			

			//mapMouseOver

			//$KRF_APP.addListener($KRF_EVENT.MAPMOUSEOVER, me.map.on('mouse-over', me.mousePosition));
			me.map.on('mouse-over', me.mousePosition)

			//me.map.on('mouse-over', me.mousePosition);

			$KRF_APP.addListener($KRF_EVENT.MINIMAPCHANGE, me.miniMapChnage, me);

			$KRF_APP.addListener($KRF_EVENT.INITMINIMAPLINE, me.initMiniMapLine, me);

			$KRF_APP.addListener($KRF_EVENT.STOPEDITEVENT, me.stopEditEvent);

			$KRF_APP.fireEvent($KRF_EVENT.CORE_MAP_LOADED, me);

			require(["/GIS/app/view/map/task/CustomPrintTask.js"], function () {
				me.printTask = new krf_new.view.map.task.CustomPrintTask(me.map, me.id
					, '/GIS/resources/jsp/CustomPrintTask_New.jsp'
					, "./resources/jsp/proxy.jsp", $KRF_DEFINE.arcServiceUrl, "/resources/saveImgTemp/capture");

			});
		});
	},
	transCoord: function (coord, callback, inSr, outSr, scope) {
		var params = new esri.tasks.ProjectParameters();
		params.geometries = [new esri.geometry.Point(coord.x, coord.y, new esri.SpatialReference({ wkid: inSr }))];
		params.outSR = new esri.SpatialReference(outSr);

		this.gsvc.project(params, function (projectedPoints) {
			if (scope) {
				callback.apply(scope, [projectedPoints])
			} else {
				callback(projectedPoints);
			}
		});
	},
	mapLoaded: function () {
		try{
			$KRF_APP.fireEvent($KRF_EVENT.MAP_WINDOW_LOADED, me);
		}catch(e){
				
		}
		
	},
	baseMapInit: function () {
		dojo.declare('CustomMapsLayer', esri.layers.TiledMapServiceLayer, {
			constructor: function (opts) {
				opts = opts || {};
				this.spatialReference = new esri.SpatialReference({ wkid: 102100 });
				this.tileInfo = me.vworldTileInfo;

				this.fullExtent = new esri.geometry.Extent({
					xmin: 13051204.69152676,
					ymin: 3309091.461517964,
					xmax: 15889117.943692,
					ymax: 5341704.9176768325,
					spatialReference: {
						wkid: 102100
					}
				});

				var size = {
					width: Ext.getCmp('map-win').getWidth() - 80,
					height: Ext.getCmp('map-win').getHeight() - 30
				}

				var xmax, xmin, ymax, ymin;

				if (size.width < 1700 && size.height < 700) {
					xmax = 14501959.12137605;
					xmin = 13607951.638552671;
					ymax = 4711863.804607241;
					ymin = 4267917.544326959;
				} else if (size.width < 1700 && size.height >= 700) {
					xmax = 14501959.12137605;
					xmin = 13607951.638552671;
					ymax = 4571863.804607241;
					ymin = 4267917.544326959;
				} else if (size.width > 1700 && size.width < 1850) {
					xmax = 14683267.752468478;
					xmin = 13616206.83760747;
					ymax = 4613718.660289081;
					ymin = 4100673.3264390025;
				} else if (size.width > 1850 && size.width < 2100) {
					xmax = 14712925.319443125;
					xmin = 13543744.534793127;
					ymax = 4689849.940461114;
					ymin = 4123604.4349245545;
				} else if (size.width > 2100 && size.width < 2300) {
					xmax = 15074625.33728856;
					xmin = 13454771.833869183;
					ymax = 4719507.5074357595;
					ymin = 3903160.045350118;
				} else if (size.width > 2300) {
					xmax = 15255933.968380988;
					xmin = 13365799.132945239;
					ymax = 4795638.7876077925;
					ymin = 3682715.6557756815;
				}

				me.initialExtent = me.preExtent = this.initialExtent = new esri.geometry.Extent({ "type": "extent", "xmin": 13685000.16306413, "ymin": 4082022.691537421, "xmax": 14810153.219421867, "ymax": 4643987.723490009, "spatialReference": { "wkid": 102100 }, "cache": { "_parts": [{ "extent": { "type": "extent", "xmin": 13685000.16306413, "ymin": 4082022.691537421, "xmax": 14810153.219421867, "ymax": 4643987.723490009, "spatialReference": { "wkid": 102100 } }, "frameIds": [0] }] } });

				this.loaded = true;
				this.onLoad(this);
			},
			getTileUrl: function (level, row, col) {

				var baseMapUrl = "http://xdworld.vworld.kr:8080/2d/Base/201612/#level#/#col#/#row#.png".replace(/#level#/gi, level).replace(/#row#/gi, row).replace(/#col#/gi, col);

				return baseMapUrl;
			}
		});
	},
	// 브이월드 위성맵 세팅
	initVWorldSatelliteLayer: function () {
		var me = this;
		dojo.declare("VworldTiledSatelliteMapServiceLayer", esri.layers.TiledMapServiceLayer,
			{
				constructor: function () {
					this.id = "SatelliteMap";
					this.spatialReference = new esri.SpatialReference({ wkid: 102100 });
					this.initialExtent = (this.fullExtent = new esri.geometry.Extent(13417793.028, 3777430.348, 15084515.335, 4772379.684, this.spatialReference));

					this.tileInfo = me.vworldTileInfo;

					this.loaded = true;
					this.onLoad(this);
				},

				getTileUrl: function (level, row, col) {
					var returnUrl = "http://xdworld.vworld.kr:8080/2d/Satellite/201301/" + (level) + "/" + col + "/" + row + ".jpeg";
					return returnUrl;
				}
			});
	},

	// 브이 월드 중첩맵 세팅
	initVWorldHybridLayer: function () {
		var me = this;
		dojo.declare("VworldTiledHybridMapServiceLayer", esri.layers.TiledMapServiceLayer, {
			constructor: function () {
				this.id = "HybridMap";
				this.spatialReference = new esri.SpatialReference({ wkid: 102100 });
				this.initialExtent = (this.fullExtent = new esri.geometry.Extent(13417793.028, 3777430.348, 15084515.335, 4772379.684, this.spatialReference));

				this.tileInfo = me.vworldTileInfo;

				this.loaded = true;
				this.onLoad(this);
			},

			getTileUrl: function (level, row, col) {
				var returnUrl = "http://xdworld.vworld.kr:8080/2d/Hybrid/201512/" + (level) + "/" + col + "/" + row + ".png";
				return returnUrl;
			}
		});
	},

	// 미니맵 init 시 graphicslaeyr 그리기
	initMiniMapLine: function () {
		var me = this;
		var coreMap = Ext.getCmp("_mapDiv_");
		var subCoreMap = Ext.getCmp("_subMapDiv_");
		require(["esri/graphic"
				,"esri/toolbars/edit"
				,"dojo/_base/event"
				,"esri/geometry/Polygon"
				,"esri/symbols/SimpleLineSymbol"
				,"esri/symbols/SimpleFillSymbol"], function (Graphic, Edit, event, Polygon, SimpleLineSymbol, SimpleFillSymbol) {
					//var polygonGraphic = Polygon.fromExtent(subCoreMap.initialExtent);
					var coreMap = Ext.getCmp("_mapDiv_");
					var subCoreMap = Ext.getCmp("_subMapDiv_");


					//subCoreMap.map.centerAndZoom($KRF_APP.coreMap.map.extent.getCenter(),$KRF_APP.coreMap.map.__LOD.level + 2);
					
					//var polygonGraphic = Polygon.fromExtent(Ext.getCmp("_subMapDiv_").graphicsLayerAdmin.map.extent);
					var polygonGraphic = Polygon.fromExtent(subCoreMap.map.extent);
					//var polygonGraphic = Polygon.fromExtent(mkInitExtent);
					var graphic = new Graphic(polygonGraphic, $KRF_APP.coreMap._krad.miniMapLineSym);

					if($KRF_APP.coreMap._krad.miniLineGrpLayer.graphics.length == 0){
						$KRF_APP.coreMap._krad.miniLineGrpLayer.add(graphic);
					}
					//console.info($KRF_APP.coreMap._krad);
					coreMap.editToolbar = new esri.toolbars.Edit(coreMap.map);
					// 클릭될시 리치 검색 클릭시를 유의 해야함
					$KRF_APP.coreMap._krad.miniLineGrpLayer.on("click", function (evt) {
						event.stop(evt);

						var options = {
							allowAddVertices: true,
							allowDeleteVertices: false,
							uniformScaling: true
						};

						coreMap.editToolbar.activate(Edit.MOVE|Edit.SCALE, evt.graphic, options);
						
					});
					
					subCoreMap.map.on('mouse-drag-start', coreMap.stopEditEvent);
					subCoreMap.map.on('click', coreMap.stopEditEvent);
					coreMap.map.on('click', coreMap.stopEditEvent);

					//스케일 조정 stop, 드래그 이벤트 stop
					coreMap.editToolbar.on('scale-stop', coreMap.subMapSetExtent);
					coreMap.editToolbar.on('graphic-move-stop', coreMap.subMapSetExtent);

					
				});
	},

	mousePosition: function(evt){
		$KRF_POSITION = evt.target.id;
	},

	stopEditEvent: function(){

		var coreMap = Ext.getCmp("_mapDiv_");
		var subCoreMap = Ext.getCmp("_subMapDiv_");
		if(coreMap.editToolbar){
			
			coreMap.editToolbar.deactivate();
			coreMap.map.testCount = 0;
			
		}		
	},


	
	//미니맵 setExtent
	subMapSetExtent: function (evt) { 
		
		var me = this;
		var coreMap = Ext.getCmp("_mapDiv_");
		var subCoreMap = Ext.getCmp("_subMapDiv_");
		subCoreMap.map.setExtent(evt.graphic._extent, true);
		coreMap.map.testCount = 1;

	},

	//미니맵 onOff setExtent
	subMapOnOffSetExtent: function () { 
		
		var me = this;
		var coreMap = Ext.getCmp("_mapDiv_");
		var subCoreMap = Ext.getCmp("_subMapDiv_");

		subCoreMap.map.centerAndZoom($KRF_APP.coreMap.map.extent.getCenter(),$KRF_APP.coreMap.map.__LOD.level + 2);
		$KRF_APP.coreMap.map.testCount = 0;
		me.miniMapChnage();

	},

	//소하천 미니맵 change 이벤트
	miniMapChnage: function (map) {

		var me = this;

		var subMapInstance = Ext.getCmp("_subMapDiv_");

		var polygonGraphic = esri.geometry.Polygon.fromExtent(subMapInstance.map.extent);  // 미니맵 extent를 polygon geometry로 변환
		var miniLineGrpLayer = $KRF_APP.coreMap._krad.miniLineGrpLayer;  // 미니맵 라인 graphicslayer
		//coreMap.map.getLayer("DynamicLayerSRiver");
		
		if (miniLineGrpLayer != undefined) {
			if ($KRF_APP.coreMap.map.testCount == 0) {
				if(miniLineGrpLayer.graphics[0] == undefined){
					return;
				}else{
					miniLineGrpLayer.graphics[0].setGeometry(polygonGraphic);
					miniLineGrpLayer.refresh();
				}
				
			}
			
		}
	},

	mapMouseOver: function(){
		// console.info(this);
		// console.info(this.id);
	},

	//맵 change 이벤트
	onExtentChange: function (extent, a, b, obj, c) {
		var me = this;
		var coreMap = Ext.getCmp("_mapDiv_");
		//미니맵 EXTENT 체인지 될시 이벤트
		if (me.id == "_subMapDiv_") {
			$KRF_APP.fireEvent($KRF_EVENT.MINIMAPCHANGE, me);

			//$KRF_APP.fireEvent($KRF_EVENT.INITMINIMAPLINE, me);

			// if (coreMap.map.testCount == 0) {
				
			// 	coreMap.map.testCount = 1;
			// }
			
		}
		// 툴팁 XY 셋팅
		$KRF_APP.fireEvent($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION);

		// $('#sourceGraphic_layer').css('transform',$('#_mapDiv__gc').css('transform'));
		// $('#_mapDiv__gc').css('transform','translate(0px, 0px)');
	},

	extentMove: function (extent, level) {
		var me = this;
		var deferred = me.map.setExtent(extent, true);
		deferred.then(function (value) {
			me.map.setLevel(level);
		}, function (error) {
		});
	},
	print: function () {
		var me = this;
		me.printTask.print();
	},

	capture: function () {
		var me = this;
		me.printTask.capture();
	},

	favoriteExe: function (data) {

		var me = this;
		var extentJson = data.EXTENT;
		var extent = new esri.geometry.Extent(extentJson);
		var level = data.LEVEL;
		var reachLineGArr = data.reachLineGArr;
		var reachAreaGArr = data.reachAreaGArr;
		var pointGArr = data.pointGArr;
		var symbolGArr = data.symbolGArr;
		var downLineGArr = data.downLineGArr;

		//me.reachLayerAdmin_v3_New.addLineGraphic(null);
		//me.reachLayerAdmin_v3_New.addAreaGraphic(null);

		var deferred = me.map.setExtent(extent, true);
		deferred.then(function (value) {
			var deferred2 = me.map.setLevel(level);
			deferred2.then(function (value) {
				if (me._krad.lineGrpLayer) {
					me._krad.lineGrpLayer.clear();
					me._krad.arrLineGrp = [];
					for (var i = 0; i < reachLineGArr.length; i++) {
						me._krad.lineGrpLayer.add(new esri.Graphic(JSON.parse(reachLineGArr[i]))); // 그래픽 추가
						me._krad.arrLineGrp.push(new esri.Graphic(JSON.parse(reachLineGArr[i]))); // 배열추가
					}
				}
				if (me._krad.areaGrpLayer) {
					me._krad.areaGrpLayer.clear();
					me._krad.arrAreaGrp = [];
					for (var i = 0; i < reachAreaGArr.length; i++) {
						me._krad.areaGrpLayer.add(new esri.Graphic(JSON.parse(reachAreaGArr[i]))); // 그래픽 추가
						me._krad.arrAreaGrp.push(new esri.Graphic(JSON.parse(reachAreaGArr[i]))); // 배열추가
					}
				}

				if (me._krad.tmpGrpLayer) {
					me._krad.tmpGrpLayer.clear();
					for (var i = 0; i < pointGArr.length; i++) {
						me._krad.tmpGrpLayer.add(new esri.Graphic(JSON.parse(pointGArr[i])));
						//me.reachLayerAdmin.addLineGraphic(new esri.Graphic(JSON.parse(reachLineGArr[i])));
					}
				}

				if (me._krad.symGrpLayer) {
					me._krad.symGrpLayer.clear();
					for (var i = 0; i < symbolGArr.length; i++) {
						me._krad.symGrpLayer.add(new esri.Graphic(JSON.parse(symbolGArr[i])));
						//me.reachLayerAdmin.addLineGraphic(new esri.Graphic(JSON.parse(reachLineGArr[i])));
					}
				}

				if (me._krad.downGrpLayer) {
					me._krad.downGrpLayer.clear();
					for (var i = 0; i < downLineGArr.length; i++) {
						me._krad.downGrpLayer.add(new esri.Graphic(JSON.parse(downLineGArr[i])));
						//me.reachLayerAdmin.addLineGraphic(new esri.Graphic(JSON.parse(reachLineGArr[i])));
					}
				}

				// 지점 목록 창 띄우기
				// Ext.ShowSiteListWindow("selectReach");

				$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, { searchText: 'selectReach' });

				// 검색결과 창 띄우기
				ShowSearchResultReach("");

			}, function (error2) {
			});
		}, function (error) {
		});
	}
});
Ext.define('krf_new.view.map.DynamicLayerAdmin', {
	map: null,
	layer: null,
	dynamicLayer1: null,
	dynamicLayer2: null,

	dynamicLayerBo: null,

	dynamicLayerSRiver: null,
	//읍면동 / 식생도 / 특밸대책지역 / 오수처리대책 / 상수원보고구역 / 배출시설제한 / 수변구역 / 그린벨트 /총량관리
	fLayers: [], // 투명도 주기위한 레이어 아이디


	constructor: function (map) {
		var me = this;
		me.map = map;
		me.dynamicLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.reachServiceUrl_v3, { showAttribution: true });
		me.dynamicLayer1.id = "DynamicLayer1"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer1.visible = true;
		//		me.dynamicLayer1.showAttribution = true;

		me.dynamicLayer1.setVisibleLayers([1, 2, 3, 4, 5, 56, 57, 58, 65, 66]);

		me.map.addLayer(me.dynamicLayer1);
		me.dynamicLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.reachServiceUrl_v3);
		me.dynamicLayer2.id = "DynamicLayer2"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer2.visible = true;
		me.dynamicLayer2.opacity = 0.5;
		me.dynamicLayer2.setVisibleLayers([-1]);


		me.dynamicLayerSRiver = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.sRiver);
		me.dynamicLayerSRiver.id = "DynamicLayerSRiver";
		me.dynamicLayerSRiver.visible = true;
		me.dynamicLayerSRiver.setVisibleLayers([-1]);
		me.map.addLayer(me.dynamicLayerSRiver);

		me.dynamicLayerPullWater = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.pullWater);
		me.dynamicLayerPullWater.id = "DynamicLayerPullWater";
		me.dynamicLayerPullWater.visible = true;
		me.dynamicLayerPullWater.setVisibleLayers([-1]);
		me.map.addLayer(me.dynamicLayerPullWater);

		me.dynamicLayerDrought = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.pullWater);
		me.dynamicLayerDrought.id = "DynamicLayerDrought";
		me.dynamicLayerDrought.visible = true;
		me.dynamicLayerDrought.setVisibleLayers([-1]);
		me.map.addLayer(me.dynamicLayerDrought);

		
		me.bodynamicLayerOnOffHandler();


		$KRF_APP.addListener($KRF_EVENT.DYNAMIC_LAYER_ON_OFF, me.dynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
		$KRF_APP.addListener($KRF_EVENT.DRON_DYNAMIC_LAYER_ON_OFF, me.drondynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
		$KRF_APP.addListener($KRF_EVENT.SRIVER_DYNAMIC_LAYER_ON_OFF, me.sRiverdynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
		$KRF_APP.addListener($KRF_EVENT.PULL_WATER_DYNAMIC_LAYER_ON_OFF, me.pullWaterdynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
		$KRF_APP.addListener($KRF_EVENT.DROUGHT_DYNAMIC_LAYER_ON_OFF, me.droughtdynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
		$KRF_APP.addListener($KRF_EVENT.BO_DYNAMIC_LAYER_ON_OFF, me.bodynamicLayerOnOffHandler, me); // 보 레이어 on/off 핸들러 추가
		$KRF_APP.addListener($KRF_EVENT.SET_BO_DATA_MARKER, me.setBoDataMarker, me); // 보 데이터 마커 추가
		$KRF_APP.addListener($KRF_EVENT.GET_BO_CODE, me.getBoCode, me); // 보 레이어 on/off 핸들러 추가
	},
	applyRenderer: function (renderer) {
	},

	setBoDataMarker: function(markerData){

		var me = Ext.getCmp("_mapDiv_");

		var symbol = new esri.symbol.PictureMarkerSymbol({
			"angle": 0,
			"yoffset": 0,
			"type": "esriPMS",
			"url": "./resources/images/symbol/spot_99.gif",
			"contentType": "image/png",
			"width": 30,
			"height": 44
		});

		var graphicLayer = new esri.layers.GraphicsLayer();
		graphicLayer.id = "boSymbolGraphic";

		
		var textGraphic = new esri.Graphic(markerData[0], new esri.symbol.TextSymbol(markerData[1]));
			textGraphic.symbol.yoffset = -30;
			textGraphic.symbol.haloColor = new esri.Color([255, 255, 255]);
			textGraphic.symbol.haloSize = 2;
			textGraphic.symbol.font = {
				size: 12,
				family: "NanumGothic",
				weight: "bolder",
				color: new esri.Color([255, 255, 255])
			};

		var graphic = new esri.Graphic(markerData[0],symbol);

			graphicLayer.add(graphic);
			graphicLayer.add(textGraphic);
			graphicLayer.on('click', function(){
				graphicLayer.clear();
			})

		me.map.addLayer(graphicLayer);

	},

	// bo layer remove
	removeBoDataMarker: function(markerData){
		
		var coreMap = $KRF_APP.coreMap;

		if(coreMap.map.getLayer('boSymbolGraphic')){
			coreMap.map.removeLayer(coreMap.map.getLayer('boSymbolGraphic'))
		}

	},

	// setBoDataMarker: function(markerData){

	// 	var coreMap = $KRF_APP.coreMap;

	// 	var symbol = new esri.symbol.PictureMarkerSymbol({
	// 		"angle": 0,
	// 		"yoffset": 22,
	// 		"type": "esriPMS",
	// 		"url": "./resources/images/symbol/spot_99.gif",
	// 		"contentType": "image/png",
	// 		"width": 30,
	// 		"height": 44
	// 	});

	// 	var graphicLayer = new esri.layers.GraphicsLayer();
	// 	graphicLayer.id = "boSymbolGraphic";

	// 	var graphic = new esri.Graphic(markerData,symbol);

	// 		graphicLayer.add(graphic);

	// 	coreMap.map.addLayer(graphicLayer);
	// },

	removeBoDataMarker: function(markerData){

	},

	//보 PARAMETER 값 넘어올시
	getBoCode: function(parameter){

		var me = Ext.getCmp("_mapDiv_");

		var spatialReference = new esri.SpatialReference({ wkid: 102100 });

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.boServiceUrl+"/21"); // 보
		var query = new esri.tasks.Query();

		var x = parameter.boX;
		var y = parameter.boY;
		var convertXY = esri.geometry.lngLatToXY(x,y);


		var centerPoint = new esri.geometry.Point(convertXY[0], convertXY[1], new esri.SpatialReference({ wkid: 102100 }));
		var mapWidth = me.map.extent.getWidth();
		var pixelWidth = mapWidth / me.map.width;
		var tolerance = 10 * pixelWidth;


		var queryExtent = new esri.geometry.Extent(1, 1, tolerance, tolerance, new esri.SpatialReference({ wkid: 102100 }));
		query.geometry = queryExtent.centerAt(centerPoint);
		query.returnGeometry = true; 
		query.outFields = ["*"];
		queryTask.execute(query, function(featureSet){
			console.info(featureSet);
			if(featureSet.features.length > 0){
				$KRF_APP.fireEvent($KRF_EVENT.BO_DYNAMIC_LAYER_ON_OFF, {boCd:featureSet.features[0].attributes.BO_CD});	
				$KRF_APP.fireEvent($KRF_EVENT.SHOW_BO_LIST_WINDOW, {boCd : featureSet.features[0].attributes.BO_CD});
			}	
		});

		$KRF_APP.fireEvent($KRF_EVENT.SET_BO_DATA_MARKER, [centerPoint,parameter.boNm]);
		this.boCenterMove(centerPoint);


		
	},

	moveBoExtent : function(boCd){
		if(boCd){
			var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.boServiceUrl+"/18"); // 보
			var query = new esri.tasks.Query();
			query.where = "BO_CD='"+boCd+"'";
			query.returnGeometry = true; 
			query.outFields = ["*"];
			queryTask.execute(query, function(featureSet){
				if(featureSet.features.length> 0 ){
					var me = Ext.getCmp("_mapDiv_");
					var extent = featureSet.features[0].geometry.getExtent();
					me.map.setExtent(extent, true);
				}
				//console.info(featureSet);
			});
		}

	},

	boCenterMove : function(centerPoint){
		var me = Ext.getCmp("_mapDiv_");
		me.map.centerAndZoom(centerPoint, $KRF_APP.coreMap.map.__LOD.level + 2);
	},

	bodynamicLayerOnOffHandler: function(layerInfo){
		//$KRF_APP.fireEvent($KRF_EVENT.BO_DYNAMIC_LAYER_ON_OFF, '');
		var me = this;
		if(me.map.getLayer('DynamicLayerBo')){
			me.map.removeLayer(me.map.getLayer('DynamicLayerBo'));
		}

		if(layerInfo){
			var imageParameters = new esri.layers.ImageParameters();
			var layerDefs = [];
			layerDefs[18] = "BO_CD='"+layerInfo.boCd+"'";
			layerDefs[21] = "BO_CD='"+layerInfo.boCd+"'";
			
			imageParameters.layerDefinitions = layerDefs;
			imageParameters.layerIds = [18,21];
			imageParameters.layerOption = 'show';
			imageParameters.transparent = true;
			
			me.dynamicLayerBo = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.boServiceUrl, {
				"imageParameters": imageParameters,
				"opacity": 0.5,
				id:'DynamicLayerBo'
			});
			me.map.addLayer(me.dynamicLayerBo);	

			
			this.moveBoExtent(layerInfo.boCd);	
		}

		
		
	},

	// 레이어 on/off 핸들러 정의
	drondynamicLayerOnOffHandler: function (selectInfo) {
	},

	droughtdynamicLayerOnOffHandler: function (selectInfo) {
		var me = this;
		var drought = [-1];
		me.dynamicLayerDrought.setVisibleLayers(drought);
		Ext.each(selectInfo, function (selectObj, index, eObjs) {
			if (selectObj.data.id.indexOf("D") > -1) {
				if (selectObj.data.id.substring(1, 2) != 0) {
					drought.push(selectObj.data.id.substring(1, 2));
				}
			}
		});

		me.dynamicLayerDrought.setVisibleLayers(drought);
	},

	pullWaterdynamicLayerOnOffHandler: function (selectInfo) {
		var me = this;
		var pullWater = [-1];
		me.dynamicLayerPullWater.setVisibleLayers(pullWater);

		Ext.each(selectInfo, function (selectObj, index, eObjs) {
			if (selectObj.data.id.indexOf("P") > -1) {
				pullWater.push(0);
			}
		});

		me.dynamicLayerPullWater.setVisibleLayers(pullWater);
	},

	//소하천 레이어 on/off 핸들러 정의
	sRiverdynamicLayerOnOffHandler: function (selectInfo) {
		var me = this;
		var sLayer = [-1];
		me.dynamicLayerSRiver.setVisibleLayers(sLayer);

		Ext.each(selectInfo, function (selectObj, index, eObjs) {
			if (selectObj.data.id.indexOf("S") > -1) {
				sLayer.push(selectObj.data.id.substring(1, 2));
			}
		});

		me.dynamicLayerSRiver.setVisibleLayers(sLayer);

	},

	// 레이어 on/off 핸들러 정의
	dynamicLayerOnOffHandler: function (selectInfo) {

		var me = this;

		var layers1 = [-1];
		var layers2 = [-1];

		var legendWindow65 = Ext.getCmp("legendwindow_65");
		if (legendWindow65 != undefined) {
			legendWindow65.close();
		}

		var legendWindow63 = Ext.getCmp("legendwindow_63");
		if (legendWindow63 != undefined) {
			legendWindow63.close();
		}

		if (selectInfo.length == 0) {
			me.dynamicLayer1.setVisibleLayers(layers1);
			me.dynamicLayer2.setVisibleLayers(layers2);
			return;
		}

		var initX = 385;
		var initY = Ext.getBody().getHeight();
		Ext.each(selectInfo, function (selectObj, index, eObjs) {
			if (selectObj.data.id == $KRF_DEFINE.toLegend) {
				Ext.create("krf_new.view.map.LegendWindow", {
					id: "legendwindow_63",
					imgSrc: './resources/images/legend/standard02.png',
					imgWidth: 548,
					imgHeight: 329,
					x: initX,
					y: initY - 329
				}).show();
				initX = initX + 550;
			}

			if (selectObj.data.id == $KRF_DEFINE.sicLegend) {
				Ext.create("krf_new.view.map.LegendWindow", {
					id: "legendwindow_65",
					imgSrc: './resources/images/legend/standard01.png',
					imgWidth: 209,
					imgHeight: 275,
					x: initX,
					y: initY - 275
				}).show();
			}

			var layer2Idx = me.getLayerIdx(selectObj.data.id);

			if (layer2Idx > -1) {
				layers2.push(selectObj.data.id);
			} else {

				layers1.push(selectObj.data.id);
			}
		});

		me.dynamicLayer1.setVisibleLayers(layers1);
		me.dynamicLayer2.setVisibleLayers(layers2);
	},

	getLayerIdx: function (layerId) {
		for (var i = 0; i < this.fLayers.length; i++) {
			if (layerId == this.fLayers[i]) {
				return i;
			}
		}
		return -1;
	}
});
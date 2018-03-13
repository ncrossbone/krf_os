Ext.define('krf_new.view.map.SearchLayerAdmin', {
	map: null,
	geometry: null,
	sourceGraphicLayer: null,
	layer1Url: null,
	smpLineSymbol: null,
	simpleFillSymbol: null,

	constructor: function (map) {
		var me = this;
		me.map = map;

		me.layer1Url = $KRF_DEFINE.reachServiceUrl_v3; // 레이어 URL

		me.smpLineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 255, 0.8]), 2);
		me.simpleFillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, me.smpLineSymbol, new dojo.Color([0, 0, 255, 0.1]));

		me.sourceGraphicLayer = new esri.layers.GraphicsLayer();
		me.sourceGraphicLayer.id = "sourceGraphic";
		me.sourceGraphicLayer.visible = true;

		me.map.addLayer(me.sourceGraphicLayer);
		/*
		dojo.connect(me.sourceGraphicLayer, "onClick", function (event) {
			if (event.graphic.img && event.graphic.img == 'btn_close' && event.graphic.geometry.uuid) {
				me.sourceGraphicLayer.clear();
				me.spSearch();
			}
		});
		*/
		
		$KRF_APP.addListener($KRF_EVENT.AREA_SELECT, me.areaSelectHandler, me);
	},
	areaSelectHandler: function (info) {
		var me = this;
		me.sourceGraphicLayer.clear();
		var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/" + info.layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 102100 };

		var idField = "";
		var idValue = "";

		// 행정구역 검색은 info.admCd로 검색
		if (info.idField == undefined || info.idField == "") {
			idField = "ADM_CD";
		}
		else {
			idField = info.idField;
		}

		if (info.idValue == undefined || info.idValue == "") {
			if (info.admCd != undefined && info.admCd != "")
				idValue = info.admCd;
		}
		else {
			idValue = info.idValue;
		}

		query.where = idField + " = '" + idValue + "'";

		query.outFields = ["*"];
		queryTask.execute(query, function (results) {
			Ext.each(results.features, function (obj, index) {
				obj.setSymbol(me.simpleFillSymbol);
				me.sourceGraphicLayer.add(obj);
				var extent = esri.geometry.Polygon(obj.geometry).getExtent();

				me.map.setExtent(extent, true);
				
				me.geometry = obj.geometry;
				
				// 타이머 돌리기 1초
				setTimeout(function () {
					me.sourceGraphicLayer.clear();
				}, 1000 * 3);
			});
		});

		dojo.connect(queryTask, "onError", function (err) {
			//console.info(err);
			alert("오류가 발생하였습니다.")
		});
	}
});
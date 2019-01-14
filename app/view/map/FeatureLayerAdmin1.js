Ext.define('krf_new.view.map.FeatureLayerAdmin1', {
	map: null,
	layerId: null,
	siteId: null,

	constructor: function (map) {
		var me = this;
		me.map = map;

		// 지점 이동 그래픽 레이어
		me.moveGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveGraphicLayer.id = "moveGraphicLayer";
		me.map.addLayer(me.moveGraphicLayer);

		// 집수구역 이동 그래픽 레이어
		me.moveCatGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveCatGraphicLayer.id = "moveCatGraphicLayer";
		me.map.addLayer(me.moveCatGraphicLayer);

		// 리치라인 이동 그래픽 레이어
		me.moveRchGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveRchGraphicLayer.id = "moveRchGraphicLayer";
		me.map.addLayer(me.moveRchGraphicLayer);

		me.movePopGraphicLayer = new esri.layers.GraphicsLayer();
		me.movePopGraphicLayer.id = "movePopGraphicLayer";
		me.map.addLayer(me.movePopGraphicLayer);

		me.view01GraphicLayer = new esri.layers.GraphicsLayer();
		me.view01GraphicLayer.id = "view01GraphicLayer";
		me.map.addLayer(me.view01GraphicLayer);

		me.view02GraphicLayer = new esri.layers.GraphicsLayer();
		me.view02GraphicLayer.id = "view02pGraphicLayer";
		me.map.addLayer(me.view02GraphicLayer);


		me.boGraphicLayer = new esri.layers.GraphicsLayer();
		me.boGraphicLayer.id = "boGraphicLayer";
		me.map.addLayer(me.boGraphicLayer);


		$KRF_APP.addListener($KRF_EVENT.SET_SELECTED_SITE, me.setSelectedSiteHandler, me);
		$KRF_APP.addListener($KRF_EVENT.SET_SELECTED_CAT_AREA, me.setSelectedCatAreaHandler, me);
		$KRF_APP.addListener($KRF_EVENT.SET_SELECTED_RCHLINE, me.setSelectedRchLineHandler, me);
		$KRF_APP.addListener($KRF_EVENT.SET_SELECTED_POP_SITE, me.setSelectedPopSiteHandler, me);


		$KRF_APP.addListener($KRF_EVENT.VIEW_01_GRAPHIC_LAYER, me.view01GraphicLayerController, me);
		$KRF_APP.addListener($KRF_EVENT.VIEW_02_GRAPHIC_LAYER, me.view02GraphicLayerController, me);
		$KRF_APP.addListener($KRF_EVENT.REMOVE_VIEW_GRAPHIC_LAYER, me.removeViewGraphicLayer, me);
		$KRF_APP.addListener($KRF_EVENT.VIEW_GRAPHIC_LAYER_CONTROLLER, me.viewGraphicLayerController, me);

		$KRF_APP.addListener($KRF_EVENT.BO_CENTER_MOVE, me.boCenterMove, me);


		this.mainBoGraphicLayer(); //bo main grpahic layer;
	},

	boCenterMove: function(boCd){
		
		var me = this;

		for(var i = 0 ; i < me.boGraphicLayer.graphics.length ; i++){
			if(me.boGraphicLayer.graphics[i].attributes!= undefined){
				if(me.boGraphicLayer.graphics[i].attributes.PT_NO == boCd.boCd){
					me.map.centerAndZoom(me.boGraphicLayer.graphics[i].geometry, 11);
				}
			}
		}
	},


	mainBoGraphicLayer: function(){

		var me = this;

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.boServiceUrl+"/0");
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 102100 };
		query.outFields = ["*"];
		query.where = "1=1";
		queryTask.execute(query, function (results) {
			if(results.features.length > 0 ){

				

				var coreMap = $KRF_APP.coreMap;
				



				for(var i = 0 ; i < results.features.length ; i ++){

					var image = "";
					//$KRF_APP.boObj.ptNo
					for(var a = 0 ; a < $KRF_APP.boObj.length ; a ++){
						if($KRF_APP.boObj[a].ptNo == results.features[i].attributes.PT_NO){
							if($KRF_APP.boObj[a].isOpen){
								image = "boLayer.gif";
							}else{
								image = "boLayer_off.png";
							}
						}
					}

					var symbol = new esri.symbol.PictureMarkerSymbol({
						"angle": 0,
						"yoffset": 0,
						"type": "esriPMS",
						"url": "./resources/images/symbol/"+image,
						"contentType": "image/gif",
						"width": 22,
						"height": 22
					});

					var graphic = new esri.Graphic(results.features[i].geometry,symbol);
					var textGraphic = new esri.Graphic(results.features[i].geometry, new esri.symbol.TextSymbol(results.features[i].attributes.PT_NM));
					textGraphic.symbol.yoffset = -30;
					textGraphic.symbol.haloColor = new esri.Color([255, 255, 255]);
					textGraphic.symbol.haloSize = 2;
					textGraphic.symbol.font = {
						size: 12,
						family: "NanumGothic",
						weight: "bolder",
						color: new esri.Color([255, 255, 255])
					};

					graphic.attributes = results.features[i].attributes;
					me.boGraphicLayer.add(graphic);	
					me.boGraphicLayer.add(textGraphic);	
				}
				me.boGraphicLayer.on("click", function(evt){	

					$KRF_APP.fireEvent($KRF_EVENT.SHOW_BO_LIST_WINDOW, {boCd : evt.graphic.attributes.PT_NO});
					$KRF_APP.fireEvent($KRF_EVENT.BO_DYNAMIC_LAYER_ON_OFF, {boCd:evt.graphic.attributes.PT_NO});
				})

			}
		})


	},

	// 경관 featurelayer controller
	viewGraphicLayerController: function(node){
		if(node[1]){
			if(node[0].data.id.substr(1,1) == 1){
				this.view01GraphicLayerController();
			}else if(node[0].data.id.substr(1,1) == 2){
				this.view02GraphicLayerController();
			}else{
				this.view01GraphicLayerController();
				this.view02GraphicLayerController();
			}
		}else{
			if(node[0].id == 'V1'){
				this.removeViewGraphicLayer('view01GraphicLayer');
			}else if(node[0].id == 'V2'){
				this.removeViewGraphicLayer('view02GraphicLayer');
			}else{
				this.removeViewGraphicLayer('view01GraphicLayer');
				this.removeViewGraphicLayer('view02GraphicLayer');
			}
			
			
		}
	},

	//경관 remove layer
	removeViewGraphicLayer: function(layerId){
		var me = this;
		if(layerId == "view01GraphicLayer"){
			me.view01GraphicLayer.clear();
		}else if(layerId == "view02GraphicLayer"){
			me.view02GraphicLayer.clear();
		}
		
	},

	//드론 레이어 controller
	view01GraphicLayerController: function(){

		var me = this;

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.boServiceUrl+"/29");
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 102100 };
		query.outFields = ["*"];
		query.where = "1=1";
		queryTask.execute(query, function (results) {
			if(results.features.length > 0 ){

				var coreMap = $KRF_APP.coreMap;
				var symbol = new esri.symbol.PictureMarkerSymbol({
					"angle": 0,
					"yoffset": 22,
					"type": "esriPMS",
					"url": "./resources/images/symbol/symbol_v1.gif",
					"contentType": "image/png",
					"width": 22,
					"height": 22
				});

				for(var i = 0 ; i < results.features.length ; i ++){
					var graphic = new esri.Graphic(results.features[i].geometry,symbol);
					graphic.attributes = results.features[i].attributes;
					me.view01GraphicLayer.add(graphic);	
				}

				me.view01GraphicLayer.on("click", function(evt){
					console.info(evt.graphic);
					//경관사진 가져오기 (검색결과랑 같은 ajax)
					$KRF_APP.global.CommFn.getViewDataAjax(evt.graphic.attributes.SPOT_CODE,'드론촬영').then(function(response) {
						var jsonData = Ext.util.JSON.decode(response.responseText);
						if (jsonData.data.length > 0) {
						 	if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
								console.info(jsonData.data);
								$KRF_APP.global.CommFn.createViewWindow(jsonData.data,'dronePhotoGallery');
						 	}
						}
					}, function(error) {
						console.log(error);
					}).then(function() {
						console.log('success');
					});

				})
			}
		})

	},

	//경관 레이어 controller
	view02GraphicLayerController: function(){

		var me = this;

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.boServiceUrl+"/30");
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 102100 };
		query.outFields = ["*"];
		query.where = "1=1";
		queryTask.execute(query, function (results) {
			if(results.features.length > 0 ){
				console.info(results.features);

				var coreMap = $KRF_APP.coreMap;
				var symbol = new esri.symbol.PictureMarkerSymbol({
					"angle": 0,
					"yoffset": 22,
					"type": "esriPMS",
					"url": "./resources/images/symbol/symbol_v2.gif",
					"contentType": "image/png",
					"width": 22,
					"height": 22
				});

				for(var i = 0 ; i < results.features.length ; i ++){
					var graphic = new esri.Graphic(results.features[i].geometry,symbol);
					graphic.attributes = results.features[i].attributes;
					me.view02GraphicLayer.add(graphic);	
				}

				me.view02GraphicLayer.on("click", function(evt){
					//경관사진 가져오기 (검색결과랑 같은 ajax)
					$KRF_APP.global.CommFn.getViewDataAjax(evt.graphic.attributes.SPOT_CODE,'항공촬영').then(function(response) {
						var jsonData = Ext.util.JSON.decode(response.responseText);
						if (jsonData.data.length > 0) {
						 	if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
								$KRF_APP.global.CommFn.createViewWindow(jsonData.data,'flightPhotoGallery');
						 	}
						}
					}, function(error) {
						console.log(error);
					}).then(function() {
						console.log('success');
					});

				})
		
				

			}
		})

	},

	setSelectedPopSiteHandler: function (layerId, siteId) {

		var me = this;
		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 102100 };
		query.outFields = ["*"];

		/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 */
		var layer01Info = getLayer01Info("id", layerId, null, null);

		if (layer01Info != undefined && layer01Info != null && layer01Info.length > 0) {

			query.where = layer01Info[0].siteIdCol + " = '" + siteId + "'";
		}
		else {
			console.info(layerId + "에 해당하는 siteIdCol(이)가 없습니다. Layer01Data.json 확인 요함.")
		}

		if (query.where == undefined) {

			console.info("쿼리 조건이 설정되지 않았습니다.");
			return;
		}
		/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 끝 */

		queryTask.execute(query, function (results) {

			Ext.each(results.features, function (obj, index) {

				Ext.create("Ext.window.Window", {
					header: true,
					shadow: false,
					plain: true, // 요게 있어야 background: transparent 먹음..
					layout: {
						type: 'absolute'
					},
					html:
						"<!doctype html>																																									" +
						"<html lang=\"ko\">                                                                                                                                                                 " +
						"<head>                                                                                                                                                                             " +
						"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />                                                                                                          " +
						"<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />                                                                                                              " +
						"<title>KRF-TOOLTIP</title>                                                                                                                                                         " +
						"<!--[if lt ie 9]>                                                                                                                                                                  " +
						"<script src=\"./resources/js/html5shiv.js\"></script>                                                                                                                                          " +
						"<![endif]-->                                                                                                                                                                       " +
						"<link href=\"./resources/css/BasicSet.css\" rel=\"stylesheet\" type=\"text/css\" />                                                                                                            " +
						"<style type=\"text/css\">                                                                                                                                                          " +
						"#toolTip { width: 342px; height: 199px; padding: 10px 15px; background: url(./resources/images/popup/Tooltip.png) no-repeat; position: relative; font-size: 12px; font-family:'NanumGothic'; }       " +
						"#toolTip> h1 { font-family: 'malgunbd'; font-size: 20px; margin: 0px; padding: 0px; letter-spacing: -1px; }                                                                        " +
						"#toolTip> dl { margin: 20px 0px 5px 0px; }                                                                                                                                         " +
						"#toolTip> dl:after { content:\"\"; clear:both; display:block; *zoom:1;}                                                                                                            " +
						"#toolTip> dl dt { float: left; font-weight: bold; color: #000; }                                                                                                                   " +
						"#toolTip> dl dd { margin: 0px; color: #434343; text-indent: 5px; }                                                                                                                 " +
						"#toolTip> ul { width: 362px; position: absolute; left: 15px; top: 143px;}                                                                                                          " +
						"#toolTip> ul> li { }                                                                                                                                                               " +
						"#toolTip> ul> li> a { float: left; }                                                                                                                                               " +
						"</style>                                                                                                                                                                           " +
						"</head>                                                                                                                                                                            " +
						"<body>                                                                                                                                                                             " +
						"<div id=\"toolTip\">                                                                                                                                                               " +
						"	<h1>" + obj.attributes.측정소명 + "</h1>                                                                                                                                                                  " +
						"	<dl>                                                                                                                                                                              " +
						"    	<dt>분류 :</dt>                                                                                                                                                               " +
						"        <dd>수질측정지점 > 하천수</dd>                                                                                                                                             " +
						"        <dt>주소 :</dt>                                                                                                                                                            " +
						"        <dd>" + obj.attributes.채수지점 + "</dd>                                                                                       " +
						"    </dl>                                                                                                                                                                          " +
						"    <a href=\"#\"><img src=\"./resources/images/popup/btn_detailView.gif\" /></a>                                                                                                                    " +
						"    <ul>                                                                                                                                                                           " +
						"    	<li style=\"float: left;\">                                                                                                                                                   " +
						"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_chart.gif\" /></a>                                                                                                                    " +
						"            <a href=\"#\"><img src=\"./resources/images/popup/btn_data.gif\" /></a>                                                                                                                  " +
						"        </li>                                                                                                                                                                      " +
						"        <li style=\"float: right; padding-right: 25px;\">                                                                                                                          " +
						"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_startSpot.gif\" /></a>                                                                                                                " +
						"            <a href=\"#\"><img src=\"./resources/images/popup/btn_endSpot.gif\" /></a>                                                                                                               " +
						"        </li>                                                                                                                                                                      " +
						"    </ul>                                                                                                                                                                          " +
						"</div>                                                                                                                                                                             " +
						"</body>                                                                                                                                                                            " +
						"</html>                                                                                                                                                                            "
				}).show();
				//});


				me.movePopGraphicLayer.clear();
				var x = obj.geometry.x;
				var y = obj.geometry.y;

				var tileInfo = $KRF_APP.coreMap.tileInfo;
				var curLevel = me.map.getLevel();
				var resolution = tileInfo.lods[curLevel].resolution;

				x = x + ((1920 - Ext.getBody().getWidth()) / 2 * resolution);
				y = y - ((1080 - Ext.getBody().getHeight()) / 4 * resolution);

				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference);
				me.map.centerAt(point);

			});

		});

	},

	setSelectedSiteHandler: function (layerId, siteId, clickValue) {

		var me = this;

		//	시작지점 끝지점 선택시 --- 명칭찾기,toolbar지점이름 변경
		var reachNameToolbar = Ext.getCmp("reachNameToolbar");
		var textSearchText_Start = Ext.getCmp("textSearchText_Start");
		var textSearchText_End = Ext.getCmp("textSearchText_End");
		var url, width, height = "";
		if (clickValue == "none") {
			url = "./resources/images/symbol/spot_09.png";
			width = 25;
			height = 61;
		} else if (clickValue == "start") {
			$KRF_APP.coreMap._krad.clickCnt("startPoint");

			if ($KRF_APP.coreMap._krad.realTimeStBtnChk == false) {
				return;
			}
			url = "./resources/images/symbol/btn_start01.png";
			width = 26;
			height = 38;

		} else if (clickValue == "end") {
			$KRF_APP.coreMap._krad.clickCnt("endPoint");

			if ($KRF_APP.coreMap._krad.realTimeEnBtnChk == false) {
				return;
			}
			url = "./resources/images/symbol/btn_end01.png";
			width = 26;
			height = 38;
		}

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 102100 };
		query.outFields = ["*"];

		/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 */
		var layer01Info = getLayer01Info("id", layerId, null, null);

		if (layer01Info != undefined && layer01Info != null && layer01Info.length > 0) {

			query.where = layer01Info[0].siteIdCol + " = '" + siteId + "'";
		}
		else {
			console.info(layerId + "에 해당하는 siteIdCol(이)가 없습니다. Layer01Data.json 확인 요함.")
		}

		if (query.where == undefined) {
			console.info("쿼리 조건이 설정되지 않았습니다.");
			return;
		}
		/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 끝 */
		queryTask.execute(query, function (results) {
			Ext.each(results.features, function (obj, index) {
				var parentCheck = "";	//지점구분
				var jijum = obj.attributes; //지점정보
				var jijum_Name = "";	//지점명
				var jijum_Addr = "";	//주소
				var jijum_Cd = "";		//지점토드
				var jijum_Gubun = "";

				if (layer01Info != undefined && layer01Info != null && layer01Info.length > 0) {

					parentCheck = layer01Info[0].layerCode;
					if (layer01Info[0].siteNmCol != undefined && layer01Info[0].siteNmCol != "") {
						jijum_Name = jijum[layer01Info[0].siteNmCol];
					}
					if (layer01Info[0].siteAddrCol != undefined && layer01Info[0].siteAddrCol != "") {
						jijum_Addr = jijum[layer01Info[0].siteAddrCol];
					}
					if (layer01Info[0].siteIdCol != undefined && layer01Info[0].siteIdCol != "") {
						jijum_Cd = jijum[layer01Info[0].siteIdCol];
					}
					if (layer01Info[0].text != undefined && layer01Info[0].text != "") {
						var splitStr = layer01Info[0].text.split('<a');
						if (splitStr) {
							jijum_Gubun = splitStr[0];
						} else {
							jijum_Gubun = layer01Info[0].text;
						}
					}
				}

				//시작지점 끝지점 처리및 지점명 삽입
				if (clickValue == "start") {
					reachNameToolbar.items.items[0].setValue(jijum_Name);
					textSearchText_Start.setValue(jijum_Name);
				}
				if (clickValue == "end") {
					reachNameToolbar.items.items[1].setValue(jijum_Name);
					textSearchText_End.setValue(jijum_Name);
				}

				me.moveGraphicLayer.clear();
				me.moveGraphicLayer.id = "moveGraphicLayer" + siteId;
				if (clickValue == "none") {
					var selectedSymbol = new esri.symbol.PictureMarkerSymbol({
						"angle": 0,
						"type": "esriPMS",
						"url": url,
						"contentType": "image/png",
						"width": width,
						"height": height,
						"yoffset": 16,
						"xoffset": 4
					});

					obj.setSymbol(selectedSymbol);
					me.moveGraphicLayer.add(obj);
				}

				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function () {
					me.moveGraphicLayer.clear();
				}, 10000, this);

				// 지점 포인트 정보
				var point = new esri.geometry.Point(obj.geometry.x, obj.geometry.y, obj.geometry.spatialReference);

				// 센터 이동
				centerAtWithOffset(obj.geometry.x, obj.geometry.y, obj.geometry.spatialReference);

				var popWidth = 370;
				var popHeight = 230;

				/* 사이트 정보 팝업 띄우기 */
				var popCtl = Ext.getCmp("popSiteInfo");

				// 팝업 띄워져있으면 닫기
				if (popCtl != undefined) {
					popCtl.close();
				}
				var mapToolTip = Ext.create("Ext.window.Window", {
					header: false,
					id: 'popSiteInfo',
					shadow: false,
					plain: true, // 요게 있어야 background: transparent 먹음..
					point: point, // 지점 포인트 정보
					width: 380,
					height: 215,
					isMove: false,
					constrain: true,
					style: 'border-style: none !important; background: transparent none !important; height: 700px;',
					layout: {
						type: 'absolute'
					},
					html:
						"<!doctype html>																																									" +
						"<html lang=\"ko\">                                                                                                                                                                 " +
						"<head>                                                                                                                                                                             " +
						"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />                                                                                                          " +
						"<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />                                                                                                              " +
						"<title>KRF-TOOLTIP</title>                                                                                                                                                         " +
						"<!--[if lt ie 9]>                                                                                                                                                                  " +
						"<script src=\"./resources/js/html5shiv.js\"></script>                                                                                                                                          " +
						"<![endif]-->                                                                                                                                                                       " +
						"<link href=\"./resources/css/BasicSet.css\" rel=\"stylesheet\" type=\"text/css\" />                                                                                                            " +
						"<style type=\"text/css\">                                                                                                                                                          " +
						"#toolTip { width: 370px; height: 230px; padding: 15px 15px 15px 10px; background: url(./resources/images/popup/Tooltip.png) no-repeat; position: relative; font-size: 12px; font-family:'NanumGothic'; }       " +
						"#toolTip> a.close { width: 25px; height: 25px; background: #FFF url(./resources/images/button/btn_close.png) center center no-repeat; position: absolute; right: 15px; top: 15px; border: 1px solid #aaa; } " +
						"#toolTip> h1 { font-family: 'malgunbd'; font-size: 20px; margin: 0px; padding: 0px; letter-spacing: -1px; }                                                                        " +
						"#toolTip> dl { margin: 30px 0px 5px 0px; }                                                                                                                                         " +
						"#toolTip> dl:after { content:\"\"; clear:both; display:block; *zoom:1;}                                                                                                            " +
						"#toolTip> dl dt { float: left; font-weight: bold; color: #000; }                                                                                                                   " +
						"#toolTip> dl dd { margin: 0px; color: #434343; text-indent: 5px; }                                                                                                                 " +
						"#toolTip> ul { width: 362px; position: absolute; left: 15px; top: 143px; margin: 0px; padding: 0px; list-style: none; list-position: inside; }                                                                                                          " +
						"#toolTip> ul> li { }                                                                                                                                                               " +
						"#toolTip> ul> li> a { float: left; }                                                                                                                                          " +
						"</style>                                                                                                                                                                           " +
						"</head>                                                                                                                                                                            " +
						"<body>                                                                                                                                                                             " +
						"<div id=\"toolTip\">                                                                                                                                                               " +
						"	<h1>" + jijum_Name + "</h1>" +
						"   <a class=\"close\" onclick=\"closePopSiteInfo();\" href=\"#\"></a>" +
						"<dl>                                                                                                                                                                              " +
						"    	<dt>분류 :</dt>                                                                                                                                                               " +
						"        <dd>" + jijum_Gubun + "</dd>                                                                                                                                             " +
						"        <dt>주소 :</dt>                                                                                                                                                            " +
						"        <dd>" + jijum_Addr + "</dd>                                                                                       " +
						"    </dl>                                                                                                                                                                          " +
						"    <a href=\"#\"><img src=\"./resources/images/popup/btn_detailView.gif\"  onClick=\"ShowWindowSiteNChart(1,'" + jijum_Cd + "','" + jijum_Name + "','" + parentCheck + "');\" /></a>" +
						"    <ul>                                                                                                                                                                           " +
						"    	<li style=\"float: left;\">                                                                                                                                                   " +
						"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_chart.gif\"  onClick=\"ShowWindowSiteNChart(0,'" + jijum_Cd + "','" + jijum_Name + "','" + parentCheck + "');\" /></a>                                                                                                                    " +
						"            <a href=\"#\"><img src=\"./resources/images/popup/btn_data.gif\" onClick=\"ShowToolTipSearchResult('" + jijum_Cd + "','','" + jijum_Name + "','grid_" + jijum_Cd + "','','" + parentCheck + "');\" /></a>                                                                                                                  " +
						"        </li>                                                                                                                                                                   " +
						"        <li id =\"reachTable\"  style=\"float: right; padding-right: 25px;\">                                                                                                                          " +
						"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_startSpot.gif\"  onClick=\"siteMovePoint('" + parentCheck + "','" + jijum_Cd + "' , 'start' );\"  /></a>                                                                                                                " +
						"            <a href=\"#\"><img src=\"./resources/images/popup/btn_endSpot.gif\"   onClick=\"siteMovePoint('" + parentCheck + "','" + jijum_Cd + "' , 'end' );\"  /></a>                                                                                                               " +
						"        </li>                                                                                                                                                                      " +
						"    </ul>                                                                                                                                                                          " +
						"</div>                                                                                                                                                                             " +
						"</body>                                                                                                                                                                            " +
						"</html>                                                                                                                                                                            "
				});

				Ext.getCmp('center_container').add(mapToolTip);
				mapToolTip.show();

				// 툴팁 XY 셋팅
				$KRF_APP.fireEvent($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION);

				var btnNomal = Ext.getCmp("btnModeNomal");
				if (btnNomal.btnOnOff == "on") {
					document.getElementById('reachTable').style.display = "none";
				} else {
					document.getElementById('reachTable').style.display = "blank";
				}

				if (clickValue == "start" || clickValue == "end") {

					var option = "";
					var btnId = "";
					var symbol = null;

					if (clickValue == "start") {
						btnId = "btnMenu04";
						$KRF_APP.coreMap._krad.drawOption = "startPoint";
					}
					if (clickValue == "end") {
						btnId = "btnMenu05";
						$KRF_APP.coreMap._krad.drawOption = "endPoint";
					}

					initKradEvt();
					me.btnObj = SetBtnOnOff(btnId, "off");
					$KRF_APP.coreMap._krad.mapClickEvt = { mapPoint: point };
					// 검색설정 JSON 셋팅 (_krad.searchConfigInfoJson)
					$KRF_APP.coreMap._krad.getSearchConfigInfo();

					/* 검색설정 "상류" 체크 시 */
					if ($KRF_APP.coreMap._krad.searchConfigInfoJson.isUpDraw == true) {
						$KRF_APP.coreMap._rchUpSearch.searchWithEvent(point);
					}
					else { /* 검색설정 "상류" 체크 시 끝 */
						$KRF_APP.coreMap._krad.setRchIdsWithEvent();
					}
					closePopSiteInfo(); // 툴팁 닫기
				}
			});

		});

	},

	// 집수구역 선택
	setSelectedCatAreaHandler: function (layerId, catDId) {
		var me = this;

		// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			me.smpLineSymbol,
			new dojo.Color([255, 0, 0, 0.5])
		);

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 102100 };
		query.outFields = ["*"];

		if (catDId.length == 10)
			query.where = "CAT_DID='" + catDId + "'";
		if (catDId.length == 8)
			query.where = "CAT_ID='" + catDId + "'";

		queryTask.execute(query, function (results) {

			Ext.each(results.features, function (obj, index) {

				me.moveCatGraphicLayer.clear();
				me.moveCatGraphicLayer.id = "moveCatGraphicLayer" + catDId;

				obj.setSymbol(selectedSymbol);
				me.moveCatGraphicLayer.add(obj);

				var extent = esri.geometry.Polygon(obj.geometry).getExtent();
				// 센터 이동
				centerAtWithOffset(extent.getCenter().x, extent.getCenter().y, extent.spatialReference);

				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function () {
					me.moveCatGraphicLayer.clear();
				}, 10000, this);
			});
		});
	},

	// 리치라인 선택
	setSelectedRchLineHandler: function (layerId, catDId) {
		var me = this;

		// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleLineSymbol(
			esri.symbol.SimpleLineSymbol.STYLE_SOLID,
			new dojo.Color([0, 0, 0, 1]),
			5
		);

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 102100 };
		query.outFields = ["*"];

		query.where = "CAT_DID='" + catDId + "'";

		queryTask.execute(query, function (results) {

			me.moveRchGraphicLayer.clear();

			Ext.each(results.features, function (obj, index) {

				me.moveRchGraphicLayer.id = "moveRchGraphicLayer" + catDId;

				obj.setSymbol(selectedSymbol);
				me.moveRchGraphicLayer.add(obj);

				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function () {
					me.moveRchGraphicLayer.clear();
				}, 10000, this);
			});
		});
	}
});
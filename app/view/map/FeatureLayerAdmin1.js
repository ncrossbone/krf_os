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

		$KRF_APP.addListener($KRF_EVENT.SET_SELECTED_SITE, me.setSelectedSiteHandler, me);
		$KRF_APP.addListener($KRF_EVENT.SET_SELECTED_CAT_AREA, me.setSelectedCatAreaHandler, me);
		$KRF_APP.addListener($KRF_EVENT.SET_SELECTED_RCHLINE, me.setSelectedRchLineHandler, me);
		$KRF_APP.addListener($KRF_EVENT.SET_SELECTED_POP_SITE, me.setSelectedPopSiteHandler, me);
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


		//통합환경허가
		if (layerId == '67') {

			siteId = siteId.split('_');

			query.where = layer01Info[0].siteIdCol + " = '" + siteId[0] + "' AND 방류구번호 = '" + siteId[1] + "'";
		}



		if (query.where == undefined) {
			console.info("쿼리 조건이 설정되지 않았습니다.");
			return;
		}

		//상위 스텝 (지점이 아닐경우)
		if(layer01Info[0].children != null){
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

					if (parentCheck == 'L001') {
						jijum_Addr = jijum.CODE_DO + ' ' + jijum.CODE_CTY + ' ' + jijum.CODE_DONG + ' ' + jijum.CODE_RI;
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



				/* 사이트 정보 팝업 띄우기 */
				var popCtl = Ext.getCmp("popSiteInfo");

				// 팝업 띄워져있으면 닫기
				if (popCtl != undefined) {
					popCtl.close();
				}



				//
				var html = ""; //툴팁 html
				var popWidth = 0; //툴팁 width
				var popHeight = 0; //툴팁 height

				// 통합검색 그룹 리스트
				var detailLayerList = {
					'A001': 'Y', 'A002': 'Y'
					, 'B001': 'Y', 'B002': 'Y'
					, 'C001': 'Y', 'C002': 'Y'
					, 'D001': 'Y', 'D003': 'Y', 'D004': 'Y', 'D005': 'Y', 'D006': 'Y'
					, 'E001': 'Y', 'E002': 'Y'
					, 'E003': 'Y', 'E004': 'Y'
					, 'F001': 'Y', 'F002': 'Y', 'F003': 'Y', 'F004': 'Y', 'F006': 'Y', 'F007': 'Y', 'F008': 'Y'
				};

				if (parentCheck == 'M001') {
					jijum_Cd = parentCheck + '_' + jijum_Cd;
				}

				// 레이어별 툴팁 설정
				if (detailLayerList[parentCheck]) {
					popWidth = 415;
					popHeight = 325;

					var sstgBtn = parentCheck.indexOf('E') > -1 ? '<img onClick=\"$KRF_APP.global.CommFn.popupClickEvent(this.id,\'' + jijum_Cd + '\');\" id="sstgPopupNextBtn" src="./resources/images/totalSearch/5.gif" style="position: absolute;right: 30px;top: 152px; cursor: pointer;">' : '';

					html = " <!doctype html>																																											" +
						" <html lang=\"ko\">                                                                                                                                                                        " +
						" <head>                                                                                                                                                                                    " +
						" <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />                                                                                                                 " +
						" <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />                                                                                                                     " +
						" <title>KRF-TOOLTIP</title>                                                                                                                                                                " +
						" <style>                                                                                                                                                                                   " +
						" /*basicset*/                                                                                                                                                                              " +
						" html, body, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, hr, pre, code, form, fieldset, legetns, input, textarea, buttonm p, blockquote, th, td, label, select, p, i {                 " +
						" 	margin: 0px;                                                                                                                                                                            " +
						" 	padding: 0px;                                                                                                                                                                           " +
						" 	font-family: \"돋움\";                                                                                                                                                                   " +
						" }                                                                                                                                                                                         " +
						" dl, dt, dd, ul, ol, li { list-style: none; }                                                                                                                                              " +
						" a { text-decoration: none; color: inherit; }                                                                                                                                              " +
						" img { border: 0px; }                                                                                                                                                                      " +
						"                                                                                                                                                                                           " +
						" /*tooltip*/                                                                                                                                                                               " +
						" #toolTip { border-radius:7px; display:inline-block; padding:10px 6px 6px 6px; position:relative;                                                                                          " +
						" 	background: -webkit-gradient(linear, left top, right top, color-stop(0, #0063cc), color-stop(1, #324ca3));                                                                              " +
						" 	background: -moz-linear-gradient(left, #0063cc 0%, #324ca3 100%);                                                                                                                       " +
						" 	background: -webkit-linear-gradient(left,  #0063cc 0%, #324ca3 100%);                                                                                                                   " +
						" 	background: -o-linear-gradient(left,  #0063cc 0%, #324ca3 100%);                                                                                                                        " +
						" 	background: -ms-linear-gradient(left,  #0063cc 0%, #324ca3 100%);                                                                                                                       " +
						" 	background: linear-gradient(left,  #0063cc 0%, #324ca3 100%);                                                                                                                           " +
						" 	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#0063cc\", endColorstr=\"#324ca3\", gradientType=1);                                                                 " +
						" 	}                                                                                                                                                                                       " +
						" .close { position:absolute; right:15px; top:10px; }                                                                                                                                       " +
						" h1 { color:#fff; font-size:18px; letter-spacing:-1px; font-family:\"dotum\"; margin-left:10px; }                                                                                 " +
						" .tt_cont { background:#fff; border-radius:7px; padding:15px; margin-top:10px; width:400px; box-sizing:border-box; }                                                                       " +
						" .tt_cont p { font-family:\"dotum\"; letter-spacing:-1px; font-size:12px; margin-bottom:10px; }                                                                                            " +
						" .tt_cont p span { margin-left:5px; }                                                                                                                                                      " +
						" .btn:after, .searchbox dd:after, .btn2:after, .sinput:after { display:block; content:\"\"; clear:both; }                                                                                  " +
						" .btn a {  background:#f5f5f5; border:1px solid #c1c7ca; padding:5px 10px; display:inline-block;  font-family:\"dotum\"; letter-spacing:-1px; font-size:12px; }                            " +
						" .d_btn { background:url(\"./resources/images/tooltip/img/btn_bg.png\") no-repeat right 10px center #f5f5f5 !important; padding:5px 20px 5px 10px !important; }                                                           " +
						" .epbtn { float:right !important; margin-right:0 !important; padding:0 !important; border:none !important; background:none !important; }                                                   " +
						" .searchbox { margin-top:10px; }                                                                                                                                                           " +
						" .searchbox dt { background:#405166; color:#fff; padding:8px 15px; font-family:\"dotum\"; letter-spacing:-1px; font-size:14px; font-weight:bold; }                                         " +
						" .searchbox dd { background:#ebebeb; padding:10px 15px; font-family:\"dotum\"; letter-spacing:-1px; font-size:12px;}                                                                       " +
						" .tit { background:url(\"./resources/images/tooltip/img/tit.png\") no-repeat left center; padding-left:7px; font-weight:bold; margin-right:5px; }                                                                         " +
						" .sinput input { background:#fff; border:1px solid #c1c7ca; padding:3px; text-align:center; }                                                                                              " +
						" .btn9 { margin-top:10px; text-align:right; }                                                                                                                                              " +
						" .btn9 a { display:inline-block;  font-family:\"dotum\"; letter-spacing:-1px; font-size:12px; color:#fff; padding:5px 0; border-radius:3px; margin-left:2px; font-weight:bold; width:60px; text-align:center; }	" +
						" .sbtn1 { background:#003873; }																																							" +
						" .sbtn2 { background:#ff7200; }                                                                                                                                                            " +
						" #toolTip:after { content:url(\"./resources/images/tooltip/img/pin.png\"); width:19px; height:20px; position:absolute; left:50%; bottom:-20px; transform:translateX(-50%); }                                              " +
						" </style>                                                                                                                                                                                  " +
						" </head>                                                                                                                                                                                   " +
						"                                                                                                                                                                                           " +
						" <body>                                                                                                                                                                                    " +
						" 	<div id=\"toolTip\">                                                                                                                                                                    " +
						" 		<h1>" + jijum_Name + "</h1>                                                                                                                                                                       " +
						"         <a href=\"javascript:void(0);\" class=\"close\" onclick=\"closePopSiteInfo();\" ><img src=\"./resources/images/tooltip/img/close.png\" alt=\"닫기\"/></a>                                                                                                    " +
						"         <div class=\"tt_cont\">                                                                                                                                                           " +
						" 			<p>                                                                                                                                                                             " +
						"             	<b>[분류]</b>                                                                                                                                                                " +
						"                 <span>" + jijum_Gubun + "</span>                                                                                                                                                         " +
						"         	</p>                                                                                                                                                                            " +
						" 			<p>                                                                                                                                                                             " +
						"             	<b>[주소]</b>                                                                                                                                                                " +
						"                 <span>" + jijum_Addr + "</span>                                                                                                                                   " +
						"         	</p>                                                                                                                                                                            " +
						"             <div class=\"btn\">                                                                                                                                                           " +
						"             	<a href=\"#\" class=\"d_btn\"  onClick=\"ShowWindowSiteNChart(1,'" + jijum_Cd + "','" + jijum_Name + "','" + parentCheck + "');\" >상세보기</a>                                                                                                                                    " +
						"             	<a href=\"#\" onClick=\"ShowWindowSiteNChart(0,'" + jijum_Cd + "','" + jijum_Name + "','" + parentCheck + "');\" >차트정보</a>                                                                                                                                                    " +
						"             	<a href=\"#\" onClick=\"ShowToolTipSearchResult('" + jijum_Cd + "','','" + jijum_Name + "','grid_" + jijum_Cd + "','','" + parentCheck + "');\" >자료조회</a>                                                                                                                                                    " +
						"             	<a href=\"#\" onClick=\"detailSearchClickZoom('" + point.x + "','" + point.y + "');\" class=\"epbtn\"><img src=\"./resources/images/tooltip/img/btn_icon.png\" alt=\"확대\"/></a>                                                                                               " +
						"             </div>                                                                                                                                                                        " +
						"             <dl class=\"searchbox\" id='basicInfoPopup'>                                                                                                                                                      " +
						" 				<dt>[통합검색]" + sstgBtn + "</dt>                                                                                                                                                           " +
						"                 <dd>                                                                                                                                                                      " +
						"                 	<ul class=\"sinput\">                                                                                                                                                   " +
						"                     	<li>                                                                                                                                            " +
						"                         	<span class=\"tit\">반경</span>                                                                                                                                  " +
						"                             <input id=\"detailMeter\" type=\"text\" style=\"width:50px; text-align:right;\"/>                                                                                                " +
						"                             <span>Km</span>                                                                                                                                                " +
						"                 		</li>                                                                                                                                                               " +
						"                     	<li style=\"margin-top:5px;\">                                                                                                                         " +
						"                         	<span class=\"tit\">기간</span>                                                                                                                                  " +
						"                             <select type=\"text\" id=\"detailStartDate\" style=\"width:65px; height:23px; \">                                                                                                                  " +
						"                             </select>                                                                                                                  " +
						"                             <span>년</span>                                                                                                                 " +
						"                             <select type=\"text\" id=\"detailStartMonth\" style=\"width:40px; height:23px; \">                                                                                                                  " +
						"                             </select>                                                                                                                  " +
						"                             <span>월</span>                                                                                                                 " +
						"                             <span>~</span>                                                                                                                                                " +
						"                             <select type=\"text\" id=\"detailEndDate\" style=\"width:65px; height:23px; \">                                                                                                                  " +
						"                             </select>                                                                                                                  " +
						"                             <span>년</span>                                                                                                                 " +
						"                             <select type=\"text\" id=\"detailEndMonth\" style=\"width:40px; height:23px; \">                                                                                                                  " +
						"                             </select>                                                                                                                  " +
						"                             <span>월</span>                                                                                                                 " +
						"                         </li>                                                                                                                                                             " +
						"                 	</ul>                                                                                                                                                                   " +
						"                     <div class=\"btn9\">                                                                                                                                                  " +
						"                     	<a href=\"#\" class=\"sbtn1\" onClick=\"detailSearchClickDefault()\" >간편검색</a>                                                                                                                               " +
						"                     	<a href=\"#\" class=\"sbtn2\" onClick=\"ShowDetailSearch('" + jijum_Cd + "','','" + jijum_Name + "','grid_" + jijum_Cd + "','','" + parentCheck + "');\" >상세검색</a>                                                                                                                            " +
						"                     </div>                                                                                                                                                                " +
						"                 </dd>                                                                                                                                                                     " +
						"             </dl>                                                                                                                                                                         " +

						/*수생태계 정보 관련 */
						"             <dl class=\"searchbox\" style='display:none;' id='sstgInfoPopup'>                                                                                                                                                      " +
						" 				<dt>[수생태정보]<img onClick=\"$KRF_APP.global.CommFn.popupClickEvent(this.id);\" id='sstgPopupPreBtn' src='./resources/images/totalSearch/6.gif' style='position: absolute;right: 30px;top: 152px; cursor: pointer;'></dt>" +
						"                 <dd style='height:108px;'>                                                                                                                                                                      " +

						"                 	<ul class=\"sinput\">                                                                                                                                                   " +
						"                     	<li>                                                                                                                                            " +
						"                         	<span class=\"tit\">항목</span>                                                                                                                                  " +
						"                             <select id=\"sstgPopupItem\" style=\"width:70px; padding: 3px;\">                                                                                                " +
						"								<option>어류</option>" +
						"							  </select>" +
						"							<table style='height:50px; position: absolute; top: 190px; right: 30px; font-size: 11px; border-collapse: collapse; border: 1px solid #595959;'>" +
						"								<tr>" +
						"									<td style='background:#bfbfbf; padding: 2px; text-align:center; font-weight: bold; border-bottom: 1px solid #595959; border-right: 1px solid #595959;'>하천건강성등급</td>" +
						"									<td style='background:#bfbfbf; padding: 2px; text-align:center; font-weight: bold; border-bottom: 1px solid #595959;'>하천건강성지수</td>" +
						"								</tr>" +
						"								<tr>" +
						"									<td id='sstgPopupGrade' style='background:#fff; padding: 2px; text-align:center; border-right: 1px solid #595959;'>A</td>" +
						"									<td id='sstgPopupValue' style='background:#fff; padding: 2px; text-align:center;'>37.2</td>" +
						"								</tr>" +
						"							</table>" +
						"                 		</li>                                                                                                                                                               " +
						"                     	<li style=\"margin-top:5px;\">                                                                                                                                            " +
						"                         	<span class=\"tit\">년도</span>                                                                                                                                  " +
						"                             <select id=\"sstgPopupYear\" style=\"width:73px; padding: 3px;\" onChange=\"$KRF_APP.global.CommFn.popupComboChangeEvent(\'" + jijum_Cd + "\');\">                                                                                                " +
						"								<option value=\"2015\">2015년</option>" +
						"								<option value=\"2016\">2016년</option>" +
						"								<option value=\"2017\" selected>2017년</option>" +
						"								<option value=\"2018\">2018년</option>" +
						"								<option value=\"2019\">2019년</option>" +
						"							  </select>" +
						"                             <select id=\"sstgPopupTme\" style=\"width:64px; padding: 3px;\" onChange=\"$KRF_APP.global.CommFn.popupComboChangeEvent(\'" + jijum_Cd + "\');\">                                                                                                " +
						"								<option value=\"1\">1회차</option>" +
						"								<option value=\"2\">2회차</option>" +
						"							  </select>" +
						"                 		</li>                                                                                                                                                               " +
						"					</ul>"
					"				  </dd>                                                                                                                                                                     " +
						"             </dl>                                                                                                                                                                         " +

						"         </div>                                                                                                                                                                            " +
						"     </div>                                                                                                                                                                                " +
						" </body>                                                                                                                                                                                   " +
						" </html>                                                                                                                                                                                   "
				} else {

					popWidth = 370;
					popHeight = 230;

					var jusoText = parentCheck.substr(0, 1) == 'Z' ? '위치' : '주소';
					html = "<!doctype html>																																									" +
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
						"        <dt>" + jusoText + " :</dt>                                                                                                                                                            " +
						"        <dd>" + jijum_Addr + "</dd>                                                                                       " +
						"    </dl>                                                                                                                                                                          " +
						"    <a href=\"#\"><img src=\"./resources/images/popup/btn_detailView.gif\"  onClick=\"ShowWindowSiteNChart(1,'" + jijum_Cd + "','" + jijum_Name + "','" + parentCheck + "');\" /></a>" +
						"    <ul>                                                                                                                                                                           " +
						"    	<li style=\"float: left;\">                                                                                                                                                   " +
						"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_chart.gif\"  onClick=\"ShowWindowSiteNChart(0,'" + jijum_Cd + "','" + jijum_Name + "','" + parentCheck + "');\" /></a>                                                                                                                    " +
						"            <a href=\"#\"><img src=\"./resources/images/popup/btn_data.gif\" onClick=\"ShowToolTipSearchResult('" + jijum_Cd + "','','" + jijum_Name + "','grid_" + jijum_Cd + "','','" + parentCheck + "');\" /></a>        " +
						//"            <a href=\"#\"><button onClick=\"ShowDetailSearch('" + jijum_Cd + "','','" + jijum_Name + "','grid_" + jijum_Cd + "','','" + parentCheck + "');\" >상세검색</button></a>        " +
						"        </li>                                                                                                                                                                   " +
						"        <li id =\"reachTable\"  style=\"float: right; padding-right: 25px;\">                                                                                                                          " +
						"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_startSpot.gif\"  onClick=\"siteMovePoint('" + parentCheck + "','" + jijum_Cd + "' , 'start' );\"  /></a>                                                                                                                " +
						"            <a href=\"#\"><img src=\"./resources/images/popup/btn_endSpot.gif\"   onClick=\"siteMovePoint('" + parentCheck + "','" + jijum_Cd + "' , 'end' );\"  /></a>                                                                                                               " +
						"        </li>                                                                                                                                                                      " +
						"    </ul>                                                                                                                                                                          " +
						"</div>                                                                                                                                                                             " +
						"</body>                                                                                                                                                                            " +
						"</html>                                                                                                                                                                            "
				}

				var mapToolTip = Ext.create("Ext.window.Window", {
					header: false,
					id: 'popSiteInfo',
					shadow: false,
					resizable: false,
					plain: true, // 요게 있어야 background: transparent 먹음..
					point: point, // 지점 포인트 정보
					//width: 380,
					//height: 215,
					//width: 415,
					//height: 300,
					width: popWidth,
					height: popHeight,
					isMove: false,
					constrain: true,
					style: 'border-style: none !important; background: transparent none !important; height: 700px;',
					layout: {
						type: 'absolute'
					},
					html: html
				});

				Ext.getCmp('center_container').add(mapToolTip);
				mapToolTip.show();

				var yearArr = $KRF_APP.global.CommFn.bindComboYear(2010, 'Desc', '');
				var monthArr = $KRF_APP.global.CommFn.bindComboMonth('Asc', '');

				var yearHtml = '';
				var monthHtml = '';
				for (var i = 0; i < yearArr.length; i++) {
					if (yearArr[i]) {
						yearHtml += '<option>' + (yearArr[i] + '') + '</option>';
					}
				}

				for (var i = 0; i < monthArr.length; i++) {
					if (monthArr[i]) {
						monthHtml += '<option>' + (monthArr[i] + '') + '</option>';
					}
				}

				$('#detailStartDate').html(yearHtml);
				$('#detailStartMonth').html(monthHtml);
				$('#detailEndDate').html(yearHtml);
				$('#detailEndMonth').html(monthHtml);

				// 툴팁 XY 셋팅
				$KRF_APP.fireEvent($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION);

				var btnNomal = Ext.getCmp("btnModeNomal");
				if (document.getElementById('reachTable')) {
					if (btnNomal.btnOnOff == "on") {
						document.getElementById('reachTable').style.display = "none";
					} else {
						document.getElementById('reachTable').style.display = "blank";
					}
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
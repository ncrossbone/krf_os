Ext.define('krf_new.store.east.SiteListWindow', {
	extend: 'Ext.data.TreeStore',
	searchType: '',
	remoteSort: true,
	catDid: [],
	result: null,
	listeners: {

		load: function (store) {
			//this.searchType = "";
			this.searchType = store.searchType;
			var nameInfo = Ext.getCmp("textSearchText");
			//대권역
			var buttonInfo1 = Ext.getCmp("cmbWater1");
			//중권역
			var buttonInfo2 = Ext.getCmp("cmbWater2");
			//소권역
			var buttonInfo3 = Ext.getCmp("cmbWater3");
			//시도
			var amdBtn1 = Ext.getCmp("cmbArea1");
			//시군구
			var amdBtn2 = Ext.getCmp("cmbArea2");
			//읍변동
			var amdBtn3 = Ext.getCmp("cmbArea3");
			var startPoint = Ext.getCmp("textSearchText_Start");
			var endPoint = Ext.getCmp("textSearchText_End");


			if (store.param.isBookmark) {
				var bookmarkData = store.param.bookmarkData;
				if (store.param.searchText = 'waterSearch') {
					buttonInfo1.lastValue = bookmarkData.value1;
					buttonInfo2.lastValue = bookmarkData.value2;
					buttonInfo3.lastValue = bookmarkData.value3;
				} else if (store.param.searchText = 'admSearch') {
					amdBtn1.lastValue = bookmarkData.value1;
					amdBtn2.lastValue = bookmarkData.value2;
					amdBtn3.lastValue = bookmarkData.value3;
				} else if (store.param.searchText = 'nameSearch') {
					nameInfo.rawValue = bookmarkData.value1;
				}
			}

			var bookParamObj = { searchText: store.param.searchText };
			//console.info(bookParamObj.searchText);
			console.info(store.searchType);
			//var catDid = [];
			var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + '/' + $KRF_DEFINE.siteInfoLayerId); // 레이어 URL v3
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			//if (buttonInfo1.lastValue != null) {
			if (bookParamObj.searchText == "waterSearch") {
				bookParamObj.value1 = buttonInfo1.lastValue;
				if (buttonInfo3.lastValue == null || buttonInfo3.lastValue == "") {
					bookParamObj.value2 = buttonInfo2.lastValue;
					query.where = "CAT_DID like '" + buttonInfo2.lastValue + "%'";
				} else {
					bookParamObj.value3 = buttonInfo3.lastValue;
					query.where = "CAT_DID like '" + buttonInfo3.lastValue + "%'";
				}
//			} else if (buttonInfo1.lastValue == null && startPoint.rawValue == "" && endPoint.rawValue == "" && nameInfo.rawValue == "") {
			} else if (bookParamObj.searchText == "admSearch") {
				if (amdBtn2.lastValue == null) {
					bookParamObj.value1 = amdBtn1.lastValue;
					query.where = "ADM_CD like '" + amdBtn1.lastValue + "%'";
				} else if (amdBtn2.lastValue != null && amdBtn3.lastValue == null) {
					bookParamObj.value2 = amdBtn2.lastValue;
					query.where = "ADM_CD like '" + amdBtn2.lastValue.substring(0, 5) + "%'";
				} else {
					bookParamObj.value3 = amdBtn3.lastValue;
					query.where = "ADM_CD like '" + amdBtn3.lastValue.substring(0, 7) + "%'";
				}
			//} else if (buttonInfo1.lastValue == null && amdBtn1.lastValue == null && startPoint.rawValue == "" && endPoint.rawValue == "") {
			} else if (bookParamObj.searchText == "nameSearch") {
				bookParamObj.value1 = nameInfo.rawValue;
				query.where = "JIJUM_NM like '" + nameInfo.rawValue + "%'";
			} else if(bookParamObj.searchText == "SEnameSearch") {
				if (endPoint.rawValue == "") {
					query.where = "JIJUM_NM like '" + startPoint.rawValue + "%'";
				} else {
					query.where = "JIJUM_NM like '" + endPoint.rawValue + "%'";
				}
			}else{
				//console.info(SEnameSearch);
			}

			$KRF_APP.global.CommFn.setBookmarkInfo('spotList', bookParamObj);

			//물환경 연동
			if (store.searchType == "paramSearch") {
				var params = Ext.urlDecode(location.search.substring(1));
				var siteIds = params.station.split("|");
				var inTxt = "";
				for (var i = 0; i < siteIds.length; i++) {
					if (siteIds[i] != "") {
						inTxt += "'" + siteIds[i] + "', ";
					}
				}
				inTxt = inTxt.substring(0, inTxt.length - 2) + ")";
				query.where = "JIJUM_CODE in (" + inTxt;
			} else {
				var paramMarker = $KRF_APP.coreMap.map.getLayer("siteSymbolGraphic");
				if (paramMarker != undefined) {
					paramMarker.hide();
				}
			}

			if (store.searchType == "selectReach") {
				/* 리치모드 지점목록 조건 설정 */
				
				if ($KRF_APP.coreMap._krad.arrAreaGrp.length > 0) {
					this.catDid = [];
					var reachBtn = Ext.getCmp("btnModeReach");

					var catWhere = "CAT_DID IN (";
					var withWhere = "";
					var withoutWhere = "";

					query.where = "CAT_DID IN (";

					var tmpExtIds = [];
					this.catDid = [];
					for (var i = 0; i < $KRF_APP.coreMap._krad.arrAreaGrp.length; i++) {
						this.catDid.push($KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.CAT_DID);
						catWhere += "'" + $KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.CAT_DID + "', ";
						if ($KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.EXT_DATA_ID != undefined &&
							$KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.EXT_DATA_ID != null) {

							var extIdx = tmpExtIds.indexOf($KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.EXT_DATA_ID);
							if (extIdx == -1) {
								tmpExtIds.push($KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.EXT_DATA_ID);
							}
						}
					}
					catWhere = catWhere.substring(0, catWhere.length - 2) + ")";
					query.where = catWhere;
				} else {
					return;
				}
			}

			//표출 X 항목 : 수질자동측정지점(B) , 퇴적물조사지점 (C), 기타측정지점-우량(D002) -AWS(D005) -지상기상(D006) -보관측소(D007)
			/*if(store.searchType != "paramSearch"){
				query.where += "	AND  GROUP_CODE <> 'B' AND  GROUP_CODE <> 'E' AND GROUP_CODE <> 'G' AND LAYER_CODE <> 'D002' AND LAYER_CODE <> 'D005' AND LAYER_CODE <> 'D006' AND LAYER_CODE <> 'D007'	";
			}*/
			//query.where += "AND GROUP_CODE <> 'E'";

			if (store.paramType == "MA") {
				query.where += " AND LAYER_CODE = 'A001' ";
			} else if (store.paramType == "MB") {
				query.where += " AND LAYER_CODE = 'A002' ";
			} else if (store.paramType == "MD") {
				query.where += " AND LAYER_CODE = 'A003' ";
			} else if (store.paramType == "ME") {
				query.where += " AND LAYER_CODE = 'A004' ";
			} else if (store.paramType == "MF") {
				query.where += " AND LAYER_CODE = 'A005' ";
			} else if (store.paramType == "MT") {
				query.where += " AND LAYER_CODE IN ('A001','A002') ";
			} else if (store.paramType == "SD") {
				query.where += " AND LAYER_CODE IN ('C001','C002') ";
			} else if (store.paramType == "OW") {
				query.where += " AND LAYER_CODE = 'D001' ";
			} else if (store.paramType == "OR") {
				query.where += " AND LAYER_CODE = 'D006' ";
			} else if (store.paramType == "OD") {
				query.where += " AND LAYER_CODE = 'D004' ";
			} else if (store.paramType == "OF") {
				query.where += " AND LAYER_CODE = 'D003' ";
			} else if (store.paramType == "TC") {
				query.where += " AND LAYER_CODE = 'E001' ";
			} else if (store.paramType == "AG") {
				query.where += " AND LAYER_CODE IN ('I001','I002','I003') ";
			}
			
			query.orderByFields = ["LAYER_CODE ASC"];
			query.outFields = ["*"];
			// 로딩바 표시
			Ext.getCmp("siteListTree").removeCls("dj-mask-noneimg");
			Ext.getCmp("siteListTree").addCls("dj-mask-withimg");
			Ext.getCmp("siteListTree").mask("loading", "loading...");
			console.info(query.where);
			queryTask.execute(query, function (result) {
				
				this.result = result;
				var fMap = result.features.map(function (obj) {
					return obj.attributes.GROUP_CODE + " | " + obj.attributes.LAYER_CODE + " | " + obj.attributes.JIJUM_CODE + " | " + obj.attributes.JIJUM_NM + " | " + obj.attributes.AREA_EVENT_ID;
				});

				var filterArr = [];
				var newFeatures = [];

				$.each(result.features, function (cnt, feature) {

					if ($.inArray(feature.attributes.LAYER_CODE + feature.attributes.JIJUM_CODE + feature.attributes.EXT_DATA_ID, filterArr) === -1) {

						filterArr.push(feature.attributes.LAYER_CODE + feature.attributes.JIJUM_CODE + feature.attributes.EXT_DATA_ID);
						newFeatures.push(feature);
					}
				});

				result.features = newFeatures;

				var tMap = result.features.map(function (obj) {
					return obj.attributes.GROUP_CODE + " | " + obj.attributes.LAYER_CODE + " | " + obj.attributes.JIJUM_CODE + " | " + obj.attributes.JIJUM_NM + " | " + obj.attributes.AREA_EVENT_ID;
				});

				var jsonStr = "{\n";
				jsonStr += "	\"id\": \"0\", \n";
				jsonStr += "	\"text\":  \"root\", \n";
				jsonStr += "	\"cls\": 'khLee-x-tree-node-text-bold', \n";
				jsonStr += "	\"checked\": true, \n";
				jsonStr += "	\"expanded\": true, \n";
				jsonStr += "	\"children\": [";

				/* 중복 제거한 그룹 코드 배열에 넣기 (arrGroupCodes) */
				var arrGroupCodes = [];

				$.each(result.features, function (cnt, feature) {
					// "==="연산자 값과 타입이 정확하게 일치하는지 판단
					if ($.inArray(feature.attributes.GROUP_CODE, arrGroupCodes) === -1) {

						arrGroupCodes.push(feature.attributes.GROUP_CODE);
					}
				});
				/* 중복 제거한 그룹 코드 배열에 넣기 (arrGroupCodes) 끝 */

				// 그룹 코드 루프 시작
				$.each(arrGroupCodes, function (cnt, groupCode) {

					/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) */
					var groupFeature = result.features.filter(function (feature) {

						if (feature.attributes.GROUP_CODE === groupCode)
							return feature;
					});

					/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) 끝 */
					jsonStr += "{\n";
					jsonStr += "		\"id\": \"" + groupFeature[0].attributes.GROUP_CODE + "\",\n";
					jsonStr += "		\"text\": \"" + groupFeature[0].attributes.GROUP_NM + "(" + groupFeature.length + ")\",\n";
					jsonStr += "		\"cls\": \"khLee-x-tree-node-text-bold\",\n";
					if(groupFeature[0].attributes.GROUP_CODE == "E"){ //  수생태계는
				
						jsonStr += "			\"visible\": \"false\",\n";
					}
					if (groupFeature[0].attributes.GROUP_CODE == "J" ||groupFeature[0].attributes.GROUP_CODE == "G" || groupFeature[0].attributes.GROUP_CODE == "E" || groupFeature[0].attributes.GROUP_CODE == "H") {
						jsonStr += "				\"srchBtnDisabled\": true,\n";
					}
					if (cnt == 0) {
						jsonStr += "		\"expanded\": true,\n";
					} else {
						jsonStr += "		\"expanded\": false,\n";
					}
					jsonStr += "		\"checked\": null,\n";
					jsonStr += "		\"children\": [";

					/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) */
					var arrLayerCodes = [];

					$.each(groupFeature, function (cnt, feature) {
						//if($.inArray(feature.attributes.LAYER_CODE, arrLayerCodes) === -1){
						if ($.inArray(feature.attributes.LAYER_CODE + feature.attributes.EXT_DATA_ID, arrLayerCodes) === -1) {

							arrLayerCodes.push(feature.attributes.LAYER_CODE + feature.attributes.EXT_DATA_ID);
						}
					});
					/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) 끝 */

					// 레이어 코드 루프 시작
					$.each(arrLayerCodes, function (cnt, layerCode) {

						var layerFeatures = groupFeature.filter(function (feature) {
							//if(feature.attributes.LAYER_CODE === layerCode){
							if (feature.attributes.LAYER_CODE + feature.attributes.EXT_DATA_ID === layerCode) {
								if (feature.attributes.EXT_DATA_ID != undefined && feature.attributes.EXT_DATA_ID != null) {
									feature.attributes.LAYER_CODE = feature.attributes.LAYER_CODE + "_" + cnt;
									feature.attributes.LAYER_NM = feature.attributes.LAYER_NM + "_TEST";
									feature.attributes.isKradLayer = true;
								}
								return feature;
							}
						});

						jsonStr += "{\n";
						jsonStr += "			\"id\": \"" + layerFeatures[0].attributes.LAYER_CODE + "\",\n";
						jsonStr += "			\"text\": \"" + layerFeatures[0].attributes.LAYER_NM + "(" + layerFeatures.length + ")\",\n";
						

						if (layerFeatures[0].attributes.GROUP_CODE == "G" || layerFeatures[0].attributes.GROUP_CODE == "E" || layerFeatures[0].attributes.EQ_EVENT_YN == "Y") {
							jsonStr += "				\"srchBtnDisabled\": true,\n";
						}
						if (layerFeatures[0].attributes.isKradLayer != undefined && layerFeatures[0].attributes.isKradLayer != null) {
							jsonStr += "			\"cls\": \"khLee-x-tree-node-text-small-bold\",\n";
						}
						if (cnt == 0) {
							jsonStr += "			\"expanded\": true,\n"; // 펼치기..
						} else {
							jsonStr += "			\"expanded\": false,\n"; // 펼치기..
						}
						jsonStr += "			\"children\": [";


						$.each(layerFeatures, function (cnt, layerFeature) {
							if (layerFeature.attributes.EXT_DATA_ID == undefined || layerFeature.attributes.EXT_DATA_ID == null) {
								if (layerFeature.attributes.GROUP_CODE == "J"){
									jsonStr += "{\n";
									jsonStr += "				\"id\": \""+ layerFeature.attributes.JIJUM_CODE + "\",\n";
									jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
									jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
									jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small\",\n";
									jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
									jsonStr += "				\"leaf\": true,\n";
									jsonStr += "				\"checked\": null\n";
									jsonStr += "			,   \"infoBtnDisabled\": false,\n";
									jsonStr += "				\"chartBtnDisabled\": true,\n";
									jsonStr += "				\"srchBtnDisabled\": false\n";
									jsonStr += "			}, ";
								}else{

									jsonStr += "{\n";
									jsonStr += "				\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "\",\n";
									jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
									jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
									jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small\",\n";
									jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
									jsonStr += "				\"leaf\": true,\n";
									jsonStr += "				\"checked\": null\n";
									if (layerFeature.attributes.GROUP_CODE == "G" || layerFeature.attributes.GROUP_CODE == "E") {
										jsonStr += "			,   \"infoBtnDisabled\": true,\n";
										jsonStr += "				\"chartBtnDisabled\": true,\n";
										jsonStr += "				\"srchBtnDisabled\": true\n";
									}
									jsonStr += "			}, ";

								}
								
							}else{
								jsonStr += "{\n";
								jsonStr += "				\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "_" + cnt + "\",\n";
								jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
								jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
								jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small-bold\",\n";
								jsonStr += "				\"infoBtnDisabled\": true,\n";
								jsonStr += "				\"chartBtnDisabled\": true,\n";
								jsonStr += "				\"srchBtnDisabled\": true,\n";
								jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
								jsonStr += "				\"leaf\": true,\n";
								jsonStr += "				\"checked\": null\n";
								jsonStr += "			}, ";
							}
						});

						if (layerFeatures.length > 0) {
							jsonStr = jsonStr.substring(0, jsonStr.length - 2);
						}

						jsonStr += "]\n";
						jsonStr += "		}, ";
					}); // 레이어 코드 루프 끝

					if (arrLayerCodes.length > 0) {
						jsonStr = jsonStr.substring(0, jsonStr.length - 2);
					}

					jsonStr += "]\n";
					jsonStr += "	}, ";
				}); // 그룹 코드 루프 끝
				if (arrGroupCodes.length > 0) {
					jsonStr = jsonStr.substring(0, jsonStr.length - 2);
				}

				// 부하량 Json String 가져오기 khLee 20160823 추가
				var pollLoadString = store.getPollLoadString();
				var pollutionString = store.getPollutionString();

				store.getSstgString(function(sstgString){
					
					if (pollLoadString != "") {
	
						if (result.features.length == 0) {
							jsonStr += pollLoadString;
						} else {
							jsonStr += ", " + pollLoadString;
						}
					}
	
					if (pollutionString != "") {
	
						if (result.features.length == 0 && pollLoadString == "") {
							jsonStr += pollutionString;
						} else {
							jsonStr += ", " + pollutionString;
						}
					}
	
					
					if (sstgString != "") {
						
						if (result.features.length == 0 && sstgString == "") {
							jsonStr += sstgString;
						} else {
							jsonStr += ", " + sstgString;
						}
					}
	
					jsonStr += "]\n";
	
					jsonStr += "}";
					
					var jsonData = "";
					jsonData = Ext.util.JSON.decode(jsonStr);
					
	
					store.setRootNode(jsonData);
					store.setRootVisible(false);
					// 로딩바 숨김
					Ext.getCmp("siteListTree").unmask();
	
					if (result.features.length == 0 && pollLoadString == "" && pollutionString == "") {
						Ext.getCmp("siteListTree").addCls("dj-mask-noneimg");
						Ext.getCmp("siteListTree").mask("데이터가 존재하지 않습니다.", "noData");
					}
				});
			}, function (error) {
				// 로딩바 숨김
				Ext.getCmp("siteListTree").unmask();
				Ext.getCmp("siteListTree").addCls("dj-mask-noneimg");
				Ext.getCmp("siteListTree").mask("지점정보 조회 오류 발생하였습니다.", "noData");
			});
		}
	},

	getPollLoadString: function () {

		/* 외부망 부하량 검색 막기 */
		//return "";
		//, {\"id\": \"Z001\", \"text\": \"부하량\", \"expanded\": false, \"children\": [{\"id\": \"111111111\", \"text\": \"111111111\", \"catDId\": \"111111111\", \"cls\": \"khLee-x-tree-node-text-small\", \"iconCls\": \"layerNoneImg\", \"leaf\": true, \"checked\": null}]}

		var btnId = "catTMOnOff";

		if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaGrp.length > 0) {

			var pollLoadString = "{\n";
			pollLoadString += "	\"id\": \"pollLoad\",\n";
			pollLoadString += "	\"text\": \"부하량\",\n"; // 집수구역별 조회 개수 집어넣자.. 아래서..
			pollLoadString += "	\"cls\": \"khLee-x-tree-node-text-bold\",\n";
			pollLoadString += "	\"expanded\": false,\n";
			pollLoadString += "	\"checked\": null,\n";
			pollLoadString += "	\"infoBtnDisabled\": true,\n";
			pollLoadString += "	\"chartBtnDisabled\": true,\n";
			pollLoadString += "	\"srchBtnDisabled\": true,\n";
			pollLoadString += "	\"children\": [{\n";

			pollLoadString += "		\"id\": \"pollLoadCat\",\n";
			pollLoadString += "	\"text\": \"<span style='vertical-align:top;'>집수구역별(" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaGrp.length + ")</span>";
			pollLoadString += " <span style='vertical-align:top;'>&nbsp;&nbsp;";
			pollLoadString += " <a style='vertical-align:top;' href='#' onClick='catTMLayerOnOff();'>";
			pollLoadString += " <img id='catTMOnOff' width='28' height='15' src='./resources/images/button/tmPollLoad_off.png' />";
			pollLoadString += " </a>";
			pollLoadString += " </span>\",\n";
			pollLoadString += "		\"expanded\": false,\n";
			pollLoadString += "		\"infoBtnDisabled\": true,\n";
			pollLoadString += "		\"chartBtnDisabled\": true,\n";
			pollLoadString += "		\"srchBtnDisabled\": true,\n";
			pollLoadString += "		\"children\": [";

			pollLoadString += "#pollLoadChildString#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..

			pollLoadString += "]\n";

			pollLoadString += "	}]\n";
			pollLoadString += "}";

			var pollLoadChildString = "";

			for (var i = 0; i < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaGrp.length; i++) {

				pollLoadChildString += "{\n";
				pollLoadChildString += "			\"id\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaGrp[i].attributes.CAT_DID + "\",\n";
				pollLoadChildString += "			\"text\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaGrp[i].attributes.CAT_DID + "\",\n";
				pollLoadChildString += "			\"catDId\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaGrp[i].attributes.CAT_DID + "\",\n";
				pollLoadChildString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
				pollLoadChildString += "			\"iconCls\": \"layerNoneImg\",\n";
				pollLoadChildString += "			\"leaf\": true,\n";
				pollLoadChildString += "			\"checked\": null,\n";
				pollLoadChildString += "			\"infoBtnDisabled\": true,\n";
				pollLoadChildString += "			\"chartBtnDisabled\": true,\n";
				pollLoadChildString += "			\"srchBtnDisabled\": true,\n";
				pollLoadChildString += "		}, ";
			}

			pollLoadChildString = pollLoadChildString.substring(0, pollLoadChildString.length - 2);

			pollLoadString = pollLoadString.replace("#pollLoadChildString#", pollLoadChildString);
			//console.info(pollLoadString);
			return pollLoadString;
		}
		else {

			return "";
		}
	},


	getSstgString:function(callback){
		
		var sstgString = "";

		var queryWhere = "";

		
		if (this.searchType == "paramSearch") {
			var params = Ext.urlDecode(location.search.substring(1));
			var siteIds = params.station.split("|");
			var inTxt = "";
			for (var i = 0; i < siteIds.length; i++) {
				if (siteIds[i] != "") {
					inTxt += "'" + siteIds[i] + "', ";
				}
			}
			inTxt = inTxt.substring(0, inTxt.length - 2) + ")";
			queryWhere = "JIJUM_CODE in (" + inTxt;
		}else{
			
			if(this.catDid.length == 0 ){
				if(typeof(callback) == 'function'){
					callback.call(this , sstgString);
					return;
				}
			}
			
			
			
			queryWhere += "CAT_DID IN (";
			for(var i = 0 ; i < this.catDid.length; i++){
				if(i == this.catDid.length-1){
					queryWhere += "'" +this.catDid[i]+ "'";
				}else{
					queryWhere += "'" +this.catDid[i]+ "',";
				}
				
			}
			queryWhere += ") AND GROUP_CODE = 'E' ";
		}
		
		
		var siteIds = [];

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + '/' + $KRF_DEFINE.siteInfoLayerId); // 레이어 URL v3
		var query = new esri.tasks.Query();
		
		query.where = queryWhere;
		query.returnGeometry = false;
		query.outFields = ['*'];
		
		queryTask.execute(query, function (result) {
			for(var j = 0 ; j < result.features.length; j++){
				siteIds.push(result.features[j].attributes.JIJUM_CODE);
			}
			Ext.Ajax.request({
				url: _API.sstg,
				params: { siteIds: siteIds },
				async: false, // 비동기 = async: true, 동기 = async: false
				success: function (response, opts) {
					var jsonData = Ext.util.JSON.decode(response.responseText);
					
					var ssgtObj = {"hc":{"ATAL_SE":[]
										,"BEMA_SE":[]
										,"FISH_SE":[]
										,"INHA_SE":[]
										,"QLTWTR_SE":[]
										,"VTN_SE":[]}
									
								  ,"hg":{"ATAL_SE":[]
										 ,"BEMA_SE":[]
										 ,"FISH_SE":[]
										 ,"VTN_SE":[]}
										};

					

					for(var k = 0 ; k < jsonData.data.length; k++){
						
						if(jsonData.data[k].SE == "하구"){
							if(jsonData.data[k].ATAL_SE == "1"){
								ssgtObj.hg.ATAL_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

							if(jsonData.data[k].BEMA_SE == "1"){
								ssgtObj.hg.BEMA_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

							if(jsonData.data[k].FISH_SE == "1"){
								ssgtObj.hg.FISH_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

							if(jsonData.data[k].VTN_SE == "1"){
								ssgtObj.hg.VTN_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

						}else if(jsonData.data[k].SE == "하천"){
							if(jsonData.data[k].ATAL_SE == "1"){
								ssgtObj.hc.ATAL_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

							if(jsonData.data[k].BEMA_SE == "1"){
								ssgtObj.hc.BEMA_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

							if(jsonData.data[k].FISH_SE == "1"){
								ssgtObj.hc.FISH_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

							if(jsonData.data[k].VTN_SE == "1"){
								ssgtObj.hc.VTN_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

							if(jsonData.data[k].QLTWTR_SE == "1"){
								ssgtObj.hc.QLTWTR_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}

							if(jsonData.data[k].INHA_SE == "1"){
								ssgtObj.hc.INHA_SE.push({"id":jsonData.data[k].SPOT_CODE, "name":jsonData.data[k].SPOT_NM});
							}
						}
					}
					
					
					var hcLengChk = ssgtObj.hc.ATAL_SE.length +
									ssgtObj.hc.BEMA_SE.length +
									ssgtObj.hc.FISH_SE.length +
									ssgtObj.hc.INHA_SE.length +
									ssgtObj.hc.QLTWTR_SE.length +
									ssgtObj.hc.VTN_SE.length;

					var hgLengChk = ssgtObj.hg.ATAL_SE.length +
									ssgtObj.hg.BEMA_SE.length +
									ssgtObj.hg.FISH_SE.length +
									ssgtObj.hg.VTN_SE.length;
									
					if(hgLengChk + hcLengChk > 0){
						if(jsonData.data.length > 0 ){
							sstgString = "{\n";
							sstgString += "	\"id\": \"Esstg\",\n";
							sstgString += "		\"text\": \"생물측정망\",\n"; 
							sstgString += "	\"cls\": \"khLee-x-tree-node-text-bold\",\n";
							sstgString += "	\"expanded\": false,\n";
							sstgString += "	\"checked\": null,\n";
							sstgString += "	\"infoBtnDisabled\": true,\n";
							sstgString += "	\"chartBtnDisabled\": true,\n";
							sstgString += "	\"srchBtnDisabled\": true,\n";
							sstgString += "	\"children\": [\n";


							if(hcLengChk > 0){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHc\",\n";
								sstgString += "	\"title\": \"하천\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"하천\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": true,\n";
								sstgString += "	\"children\": [";
								if(ssgtObj.hc.ATAL_SE.length > 0 ){
									sstgString += "	  { \n";
									sstgString += "	\"id\": \"EsstgHcAtalSe\",\n";
									sstgString += "	\"title\": \"부착돌말류\",\n"; 
									sstgString += "	\"visible\": \"true\",\n";
									sstgString += "	\"text\": \"부착돌말류\",\n"; 
									sstgString += "	\"expanded\": false,\n";
									sstgString += "	\"infoBtnDisabled\": true,\n";
									sstgString += "	\"chartBtnDisabled\": true,\n";
									sstgString += "	\"srchBtnDisabled\": false,\n";
									sstgString += "	\"children\": [";
									for(var sstgHcAtalSe = 0 ; sstgHcAtalSe < ssgtObj.hc.ATAL_SE.length; sstgHcAtalSe++){
										sstgString += "{\n";
										sstgString += "			\"id\": \"EsstgHcAtalSe" + ssgtObj.hc.ATAL_SE[sstgHcAtalSe].id + "\",\n";
										sstgString += "			\"text\": \"" + ssgtObj.hc.ATAL_SE[sstgHcAtalSe].name + "\",\n";
										sstgString += "			\"eSiteId\": \"" + ssgtObj.hc.ATAL_SE[sstgHcAtalSe].id + "\",\n";
										sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
										sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
										sstgString += "			\"leaf\": true,\n";
										sstgString += "			\"checked\": null,\n";
										sstgString += "			\"infoBtnDisabled\": true,\n";
										sstgString += "			\"chartBtnDisabled\": true,\n";
										sstgString += "			\"srchBtnDisabled\": false,\n";
										sstgString += "		}, ";
									}
									
								sstgString += "	]},";
							}

							if(ssgtObj.hc.BEMA_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHcBemaSe\",\n";
								sstgString += "	\"title\": \"저서성대형무척추동물\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"저서성대형무척추동물\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHcBemaSe = 0 ; sstgHcBemaSe < ssgtObj.hc.BEMA_SE.length; sstgHcBemaSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstgHcBemaSe" + ssgtObj.hc.BEMA_SE[sstgHcBemaSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hc.BEMA_SE[sstgHcBemaSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hc.BEMA_SE[sstgHcBemaSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}

							if(ssgtObj.hc.FISH_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHcFishSe\",\n";
								sstgString += "	\"title\": \"어류\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"어류\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHcFishSe = 0 ; sstgHcFishSe < ssgtObj.hc.FISH_SE.length; sstgHcFishSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstgHcFishSe" + ssgtObj.hc.FISH_SE[sstgHcFishSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hc.FISH_SE[sstgHcFishSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hc.FISH_SE[sstgHcFishSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}

							if(ssgtObj.hc.INHA_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHcInhaSe\",\n";
								sstgString += "	\"title\": \"서식 및 수변환경\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"서식 및 수변환경\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHcInhaSe = 0 ; sstgHcInhaSe < ssgtObj.hc.INHA_SE.length; sstgHcInhaSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstgHcInhaSe" + ssgtObj.hc.INHA_SE[sstgHcInhaSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hc.INHA_SE[sstgHcInhaSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hc.INHA_SE[sstgHcInhaSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}
						
							if(ssgtObj.hc.QLTWTR_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHcQltwtrSe\",\n";
								sstgString += "	\"title\": \"수질\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"수질\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHcQltwtrSe = 0 ; sstgHcQltwtrSe < ssgtObj.hc.QLTWTR_SE.length; sstgHcQltwtrSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstgHcQltwtrSe" + ssgtObj.hc.QLTWTR_SE[sstgHcQltwtrSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hc.QLTWTR_SE[sstgHcQltwtrSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hc.QLTWTR_SE[sstgHcQltwtrSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}
		
							if(ssgtObj.hc.VTN_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHcVtnSe\",\n";
								sstgString += "	\"title\": \"수변식생\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"수변식생\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHcVtnSe = 0 ; sstgHcVtnSe < ssgtObj.hc.VTN_SE.length; sstgHcVtnSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstgHcVtnSe" + ssgtObj.hc.VTN_SE[sstgHcVtnSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hc.VTN_SE[sstgHcVtnSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hc.VTN_SE[sstgHcVtnSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}
							sstgString += "	 ]}, \n";
						}
						
						if(hgLengChk > 0){
		
							sstgString += "	  { \n";
							sstgString += "	\"id\": \"EsstgHg\",\n";
							sstgString += "	\"title\": \"하구\",\n"; 
							sstgString += "	\"visible\": \"true\",\n";
							sstgString += "	\"text\": \"하구\",\n"; 
							sstgString += "	\"expanded\": false,\n";
							sstgString += "	\"infoBtnDisabled\": true,\n";
							sstgString += "	\"chartBtnDisabled\": true,\n";
							sstgString += "	\"srchBtnDisabled\": true,\n";
							sstgString += "	\"children\": [";
							if(ssgtObj.hg.ATAL_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHgAtalSe\",\n";
								sstgString += "	\"title\": \"부착돌말류\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"부착돌말류\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHgAtalSe = 0 ; sstgHgAtalSe < ssgtObj.hg.ATAL_SE.length; sstgHgAtalSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstgHgAtalSe" + ssgtObj.hg.ATAL_SE[sstgHgAtalSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hg.ATAL_SE[sstgHgAtalSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hg.ATAL_SE[sstgHgAtalSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}
		
							if(ssgtObj.hg.BEMA_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHgBemaSe\",\n";
								sstgString += "	\"title\": \"저서성대형무척추동물\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"저서성대형무척추동물\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHgBemaSe = 0 ; sstgHgBemaSe < ssgtObj.hg.BEMA_SE.length; sstgHgBemaSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstgHgBemaSe" + ssgtObj.hg.BEMA_SE[sstgHgBemaSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hg.BEMA_SE[sstgHgBemaSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hg.BEMA_SE[sstgHgBemaSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}
		
							if(ssgtObj.hg.FISH_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstgHgFishSe\",\n";
								sstgString += "	\"title\": \"어류\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"어류\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHcFishSe = 0 ; sstgHcFishSe < ssgtObj.hg.FISH_SE.length; sstgHcFishSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstgHgFishSe" + ssgtObj.hg.FISH_SE[sstgHcFishSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hg.FISH_SE[sstgHcFishSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hg.FISH_SE[sstgHcFishSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}
		
							if(ssgtObj.hg.VTN_SE.length > 0 ){
								sstgString += "	  { \n";
								sstgString += "	\"id\": \"EsstggcVtnSe\",\n";
								sstgString += "	\"title\": \"식생\",\n"; 
								sstgString += "	\"visible\": \"true\",\n";
								sstgString += "	\"text\": \"식생\",\n"; 
								sstgString += "	\"expanded\": false,\n";
								sstgString += "	\"infoBtnDisabled\": true,\n";
								sstgString += "	\"chartBtnDisabled\": true,\n";
								sstgString += "	\"srchBtnDisabled\": false,\n";
								sstgString += "	\"children\": [";
								for(var sstgHcVtnSe = 0 ; sstgHcVtnSe < ssgtObj.hg.VTN_SE.length; sstgHcVtnSe++){
									sstgString += "{\n";
									sstgString += "			\"id\": \"EsstggcVtnSe" + ssgtObj.hg.VTN_SE[sstgHcVtnSe].id + "\",\n";
									sstgString += "			\"text\": \"" + ssgtObj.hg.VTN_SE[sstgHcVtnSe].name + "\",\n";
									sstgString += "			\"eSiteId\": \"" + ssgtObj.hg.VTN_SE[sstgHcVtnSe].id + "\",\n";
									sstgString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									sstgString += "			\"iconCls\": \"layerNoneImg\",\n";
									sstgString += "			\"leaf\": true,\n";
									sstgString += "			\"checked\": null,\n";
									sstgString += "			\"infoBtnDisabled\": true,\n";
									sstgString += "			\"chartBtnDisabled\": true,\n";
									sstgString += "			\"srchBtnDisabled\": false,\n";
									sstgString += "		}, ";
								}
								sstgString += "	]},";
							}
		
							sstgString += "	 ]} \n";
						}
						

						sstgString += "	  ] \n";

						sstgString += "	  } \n";

						}else{
							
							sstgString = "";	
						}
					}
				
					if(typeof(callback) == 'function'){
						
						callback.call(this , sstgString);	
					}
				},
				failure: function (form, action) {
					alert("오류가 발생하였습니다.");
				}
			});
		});
		
	},

	getPollutionString: function () {

		var year = "2013";
		if (this.catDid.length == 0) {
			return "";
		}

		/* 외부망 오염원 검색 막기 */
		//return "";

		//생활계
		var store1 = Ext.create('krf_new.store.east.PollutionResult_01_Catdid', {
			async: false,
			catDid: this.catDid,
			year: year
		});

		//축산계
		var store2 = Ext.create('krf_new.store.east.PollutionResult_02_Catdid', {
			async: false,
			catDid: this.catDid,
			year: year
		});

		//산업계
		var store3 = Ext.create('krf_new.store.east.PollutionResult_03_Catdid', {
			async: false,
			catDid: this.catDid,
			year: year
		});

		//토지계
		var store4 = Ext.create('krf_new.store.east.PollutionResult_04_Catdid', {
			async: false,
			catDid: this.catDid,
			year: year
		});

		//양식계
		var store5 = Ext.create('krf_new.store.east.PollutionResult_05_Catdid', {
			async: false,
			catDid: this.catDid,
			year: year
		});

		//매립계
		var store6 = Ext.create('krf_new.store.east.PollutionResult_06_Catdid', {
			async: false,
			catDid: this.catDid,
			year: year
		});

		//기타수질오염원
		var store7 = Ext.create('krf_new.store.east.PollutionResult_07_Catdid', {
			async: false,
			catDid: this.catDid,
			year: year
		});

		store1.load();
		store2.load();
		store3.load();
		store4.load();
		store5.load();
		store6.load();
		store7.load();

		//전역변수 설정
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution = [];
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01 = [];
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02 = [];
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03 = [];
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04 = [];
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05 = [];
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06 = [];
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07 = [];

		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01.push(store1.data.items);
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02.push(store2.data.items);
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03.push(store3.data.items);
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04.push(store4.data.items);
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05.push(store5.data.items);
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06.push(store6.data.items);
		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07.push(store7.data.items);

		$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution.push(
			["01", $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01, '생활계'],
			["02", $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02, '축산계'],
			["03", $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03, '산업계'],
			["04", $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04, '토지계'],
			["05", $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05, '양식계'],
			["06", $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06, '매립계'],
			["07", $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07, '기타수질오염원']);

		var p01Cnt = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01[0].length;
		var p02Cnt = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02[0].length;
		var p03Cnt = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03[0].length;
		var p04Cnt = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04[0].length;
		var p05Cnt = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05[0].length;
		var p06Cnt = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06[0].length;
		var p07Cnt = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07[0].length;
		

		var treeTitle = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution;
		if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution[0].length > 0) {
			var pollutionString = "{\n";
			pollutionString += "	\"id\": \"pollution\",\n";
			pollutionString += "		\"text\": \"오염원\",\n"; // 집수구역별 조회 개수 집어넣자.. 아래서..
			pollutionString += "	\"cls\": \"khLee-x-tree-node-text-bold\",\n";
			pollutionString += "	\"expanded\": false,\n";
			pollutionString += "	\"checked\": null,\n";
			pollutionString += "	\"infoBtnDisabled\": true,\n";
			pollutionString += "	\"chartBtnDisabled\": true,\n";
			pollutionString += "	\"srchBtnDisabled\": false,\n";

			pollutionString += "	\"children\": [\n";

			if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01[0].length > 0) {

				pollutionString += "	  { \n";
				pollutionString += "	\"id\": \"pollution_01\",\n";
				pollutionString += "	\"title\": \"" + treeTitle[0][2] + "\",\n"; // 외부망 생활계 안보이게
				pollutionString += "	\"visible\": \"true\",\n";
				pollutionString += "	\"storeNm\": \"PollutionResult_01\",\n";
				pollutionString += "	\"text\": \"<span style='vertical-align:top;'>"+treeTitle[0][2]+"(" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01[0].length + ")</span>";
				pollutionString += " <span style='vertical-align:middle;'>&nbsp;&nbsp;";
				pollutionString += " <a style='vertical-align:bottom;' href='#' onClick='pollutionLayerSelect(01);'>";
				pollutionString += " <img id='catPollutionOnOff_01' width='28' height='15' src='./resources/images/button/tmPollution_off.png' />";
				pollutionString += " </a>";
				pollutionString += " </span>\",\n";

				pollutionString += "		\"expanded\": false,\n";
				pollutionString += "		\"infoBtnDisabled\": true,\n";
				pollutionString += "		\"chartBtnDisabled\": true,\n";
				pollutionString += "		\"srchBtnDisabled\": false,\n";
				pollutionString += "		\"children\": [";

				pollutionString += "#pollutionChildString#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..

				var pollutionChildString = "";

				for (var i = 0; i < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01[0].length; i++) {

					pollutionChildString += "{\n";
					pollutionChildString += "			\"id\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01[0][i].data.CAT_DID + "\",\n";
					pollutionChildString += "			\"text\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01[0][i].data.CAT_DID + "\",\n";
					pollutionChildString += "			\"catDId\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_01[0][i].data.CAT_DID + "\",\n";
					pollutionChildString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
					pollutionChildString += "			\"iconCls\": \"layerNoneImg\",\n";
					pollutionChildString += "			\"leaf\": true,\n";
					pollutionChildString += "			\"checked\": null,\n";
					pollutionChildString += "			\"infoBtnDisabled\": true,\n";
					pollutionChildString += "			\"chartBtnDisabled\": true,\n";
					pollutionChildString += "			\"srchBtnDisabled\": true,\n";
					pollutionChildString += "		}, ";
				}

				pollutionChildString = pollutionChildString.substring(0, pollutionChildString.length - 2);

				pollutionString = pollutionString.replace("#pollutionChildString#", pollutionChildString);
				pollutionString += " ]\n";
				pollutionString += "}\n";
			}

			if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02[0].length > 0) {

				if (p01Cnt == 0) {
					pollutionString += "	  { \n";
				} else {
					pollutionString += "	 , { \n";
				}

				pollutionString += "	\"id\": \"pollution_02\",\n";
				pollutionString += "	\"title\": \"" + treeTitle[1][2] + "\",\n";
				pollutionString += "	\"storeNm\": \"PollutionResult_02\",\n";
				pollutionString += "	\"text\": \"<span style='vertical-align:top;'>"+treeTitle[1][2]+"(" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02[0].length + ")</span>";
				pollutionString += " <span style='vertical-align:middle;'>&nbsp;&nbsp;";
				pollutionString += " <a style='vertical-align:bottom;' href='#' onClick='pollutionLayerSelect(02);'>";
				pollutionString += " <img id='catPollutionOnOff_02' width='28' height='15' src='./resources/images/button/tmPollution_off.png' />";
				pollutionString += " </a>";
				pollutionString += " </span>\",\n";

				pollutionString += "		\"expanded\": false,\n";
				pollutionString += "		\"infoBtnDisabled\": true,\n";
				pollutionString += "		\"chartBtnDisabled\": true,\n";
				pollutionString += "		\"srchBtnDisabled\": false,\n";
				pollutionString += "		\"children\": [";

				pollutionString += "#pollutionChild_02String#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..

				var pollutionChild_02String = "";

				for (var i = 0; i < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02[0].length; i++) {

					pollutionChild_02String += "{\n";
					pollutionChild_02String += "			\"id\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02[0][i].data.CAT_DID + "\",\n";
					pollutionChild_02String += "			\"text\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02[0][i].data.CAT_DID + "\",\n";
					pollutionChild_02String += "			\"catDId\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_02[0][i].data.CAT_DID + "\",\n";
					pollutionChild_02String += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
					pollutionChild_02String += "			\"iconCls\": \"layerNoneImg\",\n";
					pollutionChild_02String += "			\"leaf\": true,\n";
					pollutionChild_02String += "			\"checked\": null,\n";
					pollutionChild_02String += "			\"infoBtnDisabled\": true,\n";
					pollutionChild_02String += "			\"chartBtnDisabled\": true,\n";
					pollutionChild_02String += "			\"srchBtnDisabled\": true,\n";
					pollutionChild_02String += "		}, ";
				}

				pollutionChild_02String = pollutionChild_02String.substring(0, pollutionChild_02String.length - 2);

				pollutionString = pollutionString.replace("#pollutionChild_02String#", pollutionChild_02String);

				pollutionString += " ]\n";
				pollutionString += "}\n";
			}

			if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03[0].length > 0) {

				if (p01Cnt == 0 && p02Cnt == 0) {
					pollutionString += "	  { \n";
				} else {
					pollutionString += "	 , { \n";
				}

				pollutionString += "	\"id\": \"pollution_03\",\n";
				pollutionString += "	\"title\": \"" + treeTitle[2][2] + "\",\n";
				pollutionString += "	\"storeNm\": \"PollutionResult_03\",\n";
				pollutionString += "	\"text\": \"<span style='vertical-align:top;'>"+treeTitle[2][2]+"(" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03[0].length + ")</span>";
				pollutionString += " <span style='vertical-align:middle;'>&nbsp;&nbsp;";
				pollutionString += " <a style='vertical-align:bottom;' href='#' onClick='pollutionLayerSelect(03);'>";
				pollutionString += " <img id='catPollutionOnOff_03' width='28' height='15' src='./resources/images/button/tmPollution_off.png' />";
				pollutionString += " </a>";
				pollutionString += " </span>\",\n";

				pollutionString += "		\"expanded\": false,\n";
				pollutionString += "		\"infoBtnDisabled\": true,\n";
				pollutionString += "		\"chartBtnDisabled\": true,\n";
				pollutionString += "		\"srchBtnDisabled\": false,\n";
				pollutionString += "		\"children\": [";

				pollutionString += "#pollutionChild_03String#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..

				var pollutionChild_03String = "";

				for (var i = 0; i < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03[0].length; i++) {

					pollutionChild_03String += "{\n";
					pollutionChild_03String += "			\"id\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03[0][i].data.CAT_DID + "\",\n";
					pollutionChild_03String += "			\"text\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03[0][i].data.CAT_DID + "\",\n";
					pollutionChild_03String += "			\"catDId\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_03[0][i].data.CAT_DID + "\",\n";
					pollutionChild_03String += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
					pollutionChild_03String += "			\"iconCls\": \"layerNoneImg\",\n";
					pollutionChild_03String += "			\"leaf\": true,\n";
					pollutionChild_03String += "			\"checked\": null,\n";
					pollutionChild_03String += "			\"infoBtnDisabled\": true,\n";
					pollutionChild_03String += "			\"chartBtnDisabled\": true,\n";
					pollutionChild_03String += "			\"srchBtnDisabled\": true,\n";
					pollutionChild_03String += "		}, ";
				}

				pollutionChild_03String = pollutionChild_03String.substring(0, pollutionChild_03String.length - 2);

				pollutionString = pollutionString.replace("#pollutionChild_03String#", pollutionChild_03String);

				pollutionString += " ]\n";
				pollutionString += "}\n";
			}

			if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04[0].length > 0) {
				if (p01Cnt == 0 && p02Cnt == 0 && p03Cnt == 0) {
					pollutionString += "	  { \n";
				} else {
					pollutionString += "	 , { \n";
				}
				pollutionString += "	\"id\": \"pollution_04\",\n";
				pollutionString += "	\"title\": \"" + treeTitle[3][2] + "\",\n";
				pollutionString += "	\"storeNm\": \"PollutionResult_04\",\n";
				pollutionString += "	\"text\": \"<span style='vertical-align:top;'>"+treeTitle[3][2]+"(" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04[0].length + ")</span>";
				pollutionString += " <span style='vertical-align:middle;'>&nbsp;&nbsp;";
				pollutionString += " <a style='vertical-align:bottom;' href='#' onClick='pollutionLayerSelect(04);'>";
				pollutionString += " <img id='catPollutionOnOff_04' width='28' height='15' src='./resources/images/button/tmPollution_off.png' />";
				pollutionString += " </a>";
				pollutionString += " </span>\",\n";
				pollutionString += "		\"expanded\": false,\n";
				pollutionString += "		\"infoBtnDisabled\": true,\n";
				pollutionString += "		\"chartBtnDisabled\": true,\n";
				pollutionString += "		\"srchBtnDisabled\": false,\n";
				pollutionString += "		\"children\": [";
				pollutionString += "#pollutionChild_04String#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..
				var pollutionChild_04String = "";
				for (var i = 0; i < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04[0].length; i++) {

					pollutionChild_04String += "{\n";
					pollutionChild_04String += "			\"id\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04[0][i].data.CAT_DID + "\",\n";
					pollutionChild_04String += "			\"text\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04[0][i].data.CAT_DID + "\",\n";
					pollutionChild_04String += "			\"catDId\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_04[0][i].data.CAT_DID + "\",\n";
					pollutionChild_04String += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
					pollutionChild_04String += "			\"iconCls\": \"layerNoneImg\",\n";
					pollutionChild_04String += "			\"leaf\": true,\n";
					pollutionChild_04String += "			\"checked\": null,\n";
					pollutionChild_04String += "			\"infoBtnDisabled\": true,\n";
					pollutionChild_04String += "			\"chartBtnDisabled\": true,\n";
					pollutionChild_04String += "			\"srchBtnDisabled\": true,\n";
					pollutionChild_04String += "		}, ";
				}
				pollutionChild_04String = pollutionChild_04String.substring(0, pollutionChild_04String.length - 2);
				pollutionString = pollutionString.replace("#pollutionChild_04String#", pollutionChild_04String);
				pollutionString += " ]\n";
				pollutionString += "}\n";
			}

			if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05[0].length > 0) {

				if (p01Cnt == 0 && p02Cnt == 0 && p03Cnt == 0 && p04Cnt == 0) {
					pollutionString += "	  { \n";
				} else {
					pollutionString += "	 , { \n";
				}

				pollutionString += "	\"id\": \"pollution_05\",\n";
				pollutionString += "	\"title\": \"" + treeTitle[4][2] + "\",\n";
				pollutionString += "	\"storeNm\": \"PollutionResult_05\",\n";
				pollutionString += "	\"text\": \"<span style='vertical-align:top;'>"+treeTitle[4][2]+"(" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05[0].length + ")</span>";
				pollutionString += " <span style='vertical-align:middle;'>&nbsp;&nbsp;";
				pollutionString += " <a style='vertical-align:bottom;' href='#' onClick='pollutionLayerSelect(05);'>";
				pollutionString += " <img id='catPollutionOnOff_05' width='28' height='15' src='./resources/images/button/tmPollution_off.png' />";
				pollutionString += " </a>";
				pollutionString += " </span>\",\n";
				pollutionString += "		\"expanded\": false,\n";
				pollutionString += "		\"infoBtnDisabled\": true,\n";
				pollutionString += "		\"chartBtnDisabled\": true,\n";
				pollutionString += "		\"srchBtnDisabled\": false,\n";
				pollutionString += "		\"children\": [";

				pollutionString += "#pollutionChild_05String#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..

				var pollutionChild_05String = "";

				for (var i = 0; i < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05[0].length; i++) {

					pollutionChild_05String += "{\n";
					pollutionChild_05String += "			\"id\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05[0][i].data.CAT_DID + "\",\n";
					pollutionChild_05String += "			\"text\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05[0][i].data.CAT_DID + "\",\n";
					pollutionChild_05String += "			\"catDId\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_05[0][i].data.CAT_DID + "\",\n";
					pollutionChild_05String += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
					pollutionChild_05String += "			\"iconCls\": \"layerNoneImg\",\n";
					pollutionChild_05String += "			\"leaf\": true,\n";
					pollutionChild_05String += "			\"checked\": null,\n";
					pollutionChild_05String += "			\"infoBtnDisabled\": true,\n";
					pollutionChild_05String += "			\"chartBtnDisabled\": true,\n";
					pollutionChild_05String += "			\"srchBtnDisabled\": true,\n";
					pollutionChild_05String += "		}, ";
				}

				pollutionChild_05String = pollutionChild_05String.substring(0, pollutionChild_05String.length - 2);
				pollutionString = pollutionString.replace("#pollutionChild_05String#", pollutionChild_05String);
				pollutionString += " ]\n";
				pollutionString += "}\n";

			}

			if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06[0].length > 0) {

				if (p01Cnt == 0 && p02Cnt == 0 && p03Cnt == 0 && p04Cnt == 0 && p05Cnt == 0) {
					pollutionString += "	  { \n";
				} else {
					pollutionString += "	 , { \n";
				}

				pollutionString += "	\"id\": \"pollution_06\",\n";
				pollutionString += "	\"title\": \"" + treeTitle[5][2] + "\",\n";
				pollutionString += "	\"storeNm\": \"PollutionResult_06\",\n";
				pollutionString += "	\"text\": \"<span style='vertical-align:top;'>"+treeTitle[5][2]+"(" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06[0].length + ")</span>";
				pollutionString += " <span style='vertical-align:middle;'>&nbsp;&nbsp;";
				pollutionString += " <a style='vertical-align:bottom;' href='#' onClick='pollutionLayerSelect(06);'>";
				pollutionString += " <img id='catPollutionOnOff_06' width='28' height='15' src='./resources/images/button/tmPollution_off.png' />";
				pollutionString += " </a>";
				pollutionString += " </span>\",\n";
				pollutionString += "		\"expanded\": false,\n";
				pollutionString += "		\"infoBtnDisabled\": true,\n";
				pollutionString += "		\"chartBtnDisabled\": true,\n";
				pollutionString += "		\"srchBtnDisabled\": false,\n";
				pollutionString += "		\"children\": [";
				pollutionString += "#pollutionChild_06String#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..

				var pollutionChild_06String = "";

				for (var i = 0; i < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06[0].length; i++) {

					pollutionChild_06String += "{\n";
					pollutionChild_06String += "			\"id\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06[0][i].data.CAT_DID + "\",\n";
					pollutionChild_06String += "			\"text\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06[0][i].data.CAT_DID + "\",\n";
					pollutionChild_06String += "			\"catDId\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_06[0][i].data.CAT_DID + "\",\n";
					pollutionChild_06String += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
					pollutionChild_06String += "			\"iconCls\": \"layerNoneImg\",\n";
					pollutionChild_06String += "			\"leaf\": true,\n";
					pollutionChild_06String += "			\"checked\": null,\n";
					pollutionChild_06String += "			\"infoBtnDisabled\": true,\n";
					pollutionChild_06String += "			\"chartBtnDisabled\": true,\n";
					pollutionChild_06String += "			\"srchBtnDisabled\": true,\n";
					pollutionChild_06String += "		}, ";
				}
				pollutionChild_06String = pollutionChild_06String.substring(0, pollutionChild_06String.length - 2);
				pollutionString = pollutionString.replace("#pollutionChild_06String#", pollutionChild_06String);
				pollutionString += " ]\n";
				pollutionString += "}\n";
			}


			if ($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07[0].length > 0) {

				if (p01Cnt == 0 && p02Cnt == 0 && p03Cnt == 0 && p04Cnt == 0 && p05Cnt == 0 && p06Cnt == 0) {
					pollutionString += "	  { \n";
				} else {
					pollutionString += "	 , { \n";
				}

				pollutionString += "	\"id\": \"pollution_07\",\n";
				pollutionString += "	\"title\": \"" + treeTitle[6][2] + "\",\n";
				pollutionString += "	\"storeNm\": \"PollutionResult_07\",\n";
				pollutionString += "	\"text\": \"<span style='vertical-align:top;'>"+treeTitle[6][2]+"(" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07[0].length + ")</span>";
				pollutionString += " <span style='vertical-align:middle;'>&nbsp;&nbsp;";
				pollutionString += " <a style='vertical-align:bottom;' href='#' onClick='pollutionLayerSelect(07);'>";
				pollutionString += " <img id='catPollutionOnOff_07' width='28' height='15' src='./resources/images/button/tmPollution_off.png' />";
				pollutionString += " </a>";
				pollutionString += " </span>\",\n";
				pollutionString += "		\"expanded\": false,\n";
				pollutionString += "		\"infoBtnDisabled\": true,\n";
				pollutionString += "		\"chartBtnDisabled\": true,\n";
				pollutionString += "		\"srchBtnDisabled\": false,\n";
				pollutionString += "		\"children\": [";

				pollutionString += "#pollutionChild_07String#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..

				var pollutionChild_07String = "";

				for (var i = 0; i < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07[0].length; i++) {

					pollutionChild_07String += "{\n";
					pollutionChild_07String += "			\"id\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07[0][i].data.CAT_DID + "\",\n";
					pollutionChild_07String += "			\"text\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07[0][i].data.CAT_DID + "\",\n";
					pollutionChild_07String += "			\"catDId\": \"" + $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution_07[0][i].data.CAT_DID + "\",\n";
					pollutionChild_07String += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
					pollutionChild_07String += "			\"iconCls\": \"layerNoneImg\",\n";
					pollutionChild_07String += "			\"leaf\": true,\n";
					pollutionChild_07String += "			\"checked\": null,\n";
					pollutionChild_07String += "			\"infoBtnDisabled\": true,\n";
					pollutionChild_07String += "			\"chartBtnDisabled\": true,\n";
					pollutionChild_07String += "			\"srchBtnDisabled\": true,\n";
					pollutionChild_07String += "		}, ";
				}

				pollutionChild_07String = pollutionChild_07String.substring(0, pollutionChild_07String.length - 2);

				pollutionString = pollutionString.replace("#pollutionChild_07String#", pollutionChild_07String);

				pollutionString += " ]\n";
				pollutionString += "}\n";
			}
			pollutionString += "]}";
			return pollutionString;
		} else {
			return "";
		}
	}
});

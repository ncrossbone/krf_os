Ext.define('krf_new.store.east.BoListWindow', {
	extend: 'Ext.data.TreeStore',
	searchType: '',
	remoteSort: true,
	catDid: [],
	result: null,
	query : null,
	listeners: {

		load: function (store) {
			//this.searchType = "";
			this.searchType = store.searchType;
			this.store = store;
			var nameInfo = Ext.getCmp("textSearchText");
			//대권역
			var buttonInfo1 = Ext.getCmp("cmbWater1");
			//중권역
			var buttonInfo2 = Ext.getCmp("cmbWater2");
			//소권역
			var buttonInfo3 = Ext.getCmp("cmbWater3");
			//보
			var buttonInfo4 = Ext.getCmp("cmbWater4");
			//시도
			var amdBtn1 = Ext.getCmp("cmbArea1");
			//시군구
			var amdBtn2 = Ext.getCmp("cmbArea2");
			//읍변동
			var amdBtn3 = Ext.getCmp("cmbArea3");
			var startPoint = Ext.getCmp("textSearchText_Start");
			var endPoint = Ext.getCmp("textSearchText_End");


			


			var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.catSearchUrl); // 레이어 URL v3
			var query = new esri.tasks.Query();
			query.returnGeometry = false;

			if(!store.boCd){
				return;
			}


			// 보명칭 저장
			if($KRF_APP.coreMap.map.getLayer('boGraphicLayer').graphics.length > 0){
				for(var i = 0 ; i < $KRF_APP.coreMap.map.getLayer('boGraphicLayer').graphics.length ; i++){
					if($KRF_APP.coreMap.map.getLayer('boGraphicLayer').graphics[i].attributes != undefined){
						if($KRF_APP.coreMap.map.getLayer('boGraphicLayer').graphics[i].attributes.PT_NO == store.boCd){
							//$KRF_APP.boName.push($KRF_APP.coreMap.map.getLayer('boGraphicLayer').graphics[i].attributes.PT_NM);
							//$KRF_APP.boName = $KRF_APP.coreMap.map.getLayer('boGraphicLayer').graphics[i].attributes.PT_NM;
						}
					}
				}
			}
			//물환경 연동
			// if (store.searchType == "paramSearch") {
			// 	query.where = "JIJUM_CODE in (" + inTxt;
			// } else {
			// 	var paramMarker = $KRF_APP.coreMap.map.getLayer("siteSymbolGraphic");
			// 	if (paramMarker != undefined) {
			// 		paramMarker.hide();
			// 	}
			// }
			query.where = "BO_CD IN ('"+store.boCd+"')";

			// if (store.searchType == "selectReach") {
			// 	/* 리치모드 지점목록 조건 설정 */

			// 	if ($KRF_APP.coreMap._krad.arrAreaGrp.length > 0) {
			// 		this.catDid = [];
			// 		var reachBtn = Ext.getCmp("btnModeReach");

			// 		var catWhere = "CAT_DID IN (";
			// 		var withWhere = "";
			// 		var withoutWhere = "";

			// 		query.where = "CAT_DID IN (";

			// 		var tmpExtIds = [];
			// 		this.catDid = [];
			// 		for (var i = 0; i < $KRF_APP.coreMap._krad.arrAreaGrp.length; i++) {
			// 			this.catDid.push($KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.CAT_DID);
			// 			catWhere += "'" + $KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.CAT_DID + "', ";
			// 			if ($KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.EXT_DATA_ID != undefined &&
			// 				$KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.EXT_DATA_ID != null) {

			// 				var extIdx = tmpExtIds.indexOf($KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.EXT_DATA_ID);
			// 				if (extIdx == -1) {
			// 					tmpExtIds.push($KRF_APP.coreMap._krad.arrAreaGrp[i].attributes.EXT_DATA_ID);
			// 				}
			// 			}
			// 		}
			// 		catWhere = catWhere.substring(0, catWhere.length - 2) + ")";
			// 		query.where = catWhere;
			// 	} else {
			// 		return;
			// 	}
			// }

			//표출 X 항목 : 수질자동측정지점(B) , 퇴적물조사지점 (C), 기타측정지점-우량(D002) -AWS(D005) -지상기상(D006) -보관측소(D007)
			/*if(store.searchType != "paramSearch"){
				query.where += "	AND  GROUP_CODE <> 'B' AND  GROUP_CODE <> 'E' AND GROUP_CODE <> 'G' AND LAYER_CODE <> 'D002' AND LAYER_CODE <> 'D005' AND LAYER_CODE <> 'D006' AND LAYER_CODE <> 'D007'	";
			}*/
			//query.where += "AND GROUP_CODE <> 'E'";


			query.orderByFields = ["LAYER_CODE ASC"];
			query.outFields = ["*"];
			// 로딩바 표시
			Ext.getCmp("boListTree").removeCls("dj-mask-noneimg");
			Ext.getCmp("boListTree").addCls("dj-mask-withimg");
			//Ext.getCmp("boListTree").mask("loading", "loading...");
			this.query = query;
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

				var boGroup = [];


				$.each(result.features, function (cnt, feature) {
					// "==="연산자 값과 타입이 정확하게 일치하는지 판단
					if ($.inArray(feature.attributes.BO_CD, boGroup) === -1) {

						boGroup.push(feature.attributes.BO_CD);
					}
				});

				
				



				/* 중복 제거한 그룹 코드 배열에 넣기 (arrGroupCodes) 끝 */
				$.each(boGroup, function (cnt, groupCodeBo) {

					var groupFeatureBo = result.features.filter(function (feature) {
						
						//$KRF_APP.highChart.parentName = groupFeatureBo[0].attributes.BO_NM;

						if (feature.attributes.BO_CD === groupCodeBo)
							return feature;
					});

					jsonStr += "{\n";
					jsonStr += "		\"id\": \"BO_" + groupFeatureBo[0].attributes.BO_CD + "\",\n";
					jsonStr += "		\"text\": \"" + groupFeatureBo[0].attributes.BO_NM + "(" + groupFeatureBo.length + ")\",\n";
					jsonStr += "		\"cls\": \"boTreeName\",\n";
					jsonStr += "		\"chartBtnDisabled\": true,\n";
					if (cnt == 0) {
						jsonStr += "		\"expanded\": true,\n";
					} else {
						jsonStr += "		\"expanded\": false,\n";
					}
					jsonStr += "		\"checked\": null,\n";
					jsonStr += "		\"children\": [";

					
					$.each(groupFeatureBo, function (cnt, feature) {
						// "==="연산자 값과 타입이 정확하게 일치하는지 판단
						if ($.inArray(feature.attributes.GROUP_CODE, arrGroupCodes) === -1) {
	
							arrGroupCodes.push(feature.attributes.GROUP_CODE);
						}
					});
					
					// 그룹 코드 루프 시작
					$.each(arrGroupCodes, function (cnt, groupCode) {

						/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) */
						var groupFeature = groupFeatureBo.filter(function (feature) {

							if (feature.attributes.GROUP_CODE === groupCode)
								return feature;
						});

						/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) 끝 */
						jsonStr += "{\n";
						jsonStr += "		\"id\": \"" + groupFeature[0].attributes.GROUP_CODE + "\",\n";
						jsonStr += "		\"text\": \"" + groupFeature[0].attributes.GROUP_NM + "(" + groupFeature.length + ")\",\n";
						jsonStr += "		\"cls\": \"khLee-x-tree-node-text-bold\",\n";
						if (groupFeature[0].attributes.GROUP_CODE == "E") { //  수생태계는
							jsonStr += "			\"visible\": \"false\",\n";
						}
						if (groupFeature[0].attributes.GROUP_CODE == "J" || groupFeature[0].attributes.GROUP_CODE == "G" || groupFeature[0].attributes.GROUP_CODE == "E" || groupFeature[0].attributes.GROUP_CODE == "H") {
							jsonStr += "				\"srchBtnDisabled\": true,\n";
						}
						if (cnt == 0) {
							jsonStr += "		\"expanded\": true,\n";
						} else {
							jsonStr += "		\"expanded\": false,\n";
						}
						jsonStr += "		\"checked\": null,\n";
						jsonStr += "		\"scensBtnDisabled\": true,\n";
						jsonStr += "		\"chartBtnDisabled\": true,\n";
						jsonStr += "		\"rptBtnDisabled\": true,\n";
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
							jsonStr += "				\"scensBtnDisabled\": true,\n";
							jsonStr += "				\"chartBtnDisabled\": true,\n";
							jsonStr += "				\"rptBtnDisabled\": true,\n";
							jsonStr += "			\"children\": [";


							$.each(layerFeatures, function (cnt, layerFeature) {
								if (layerFeature.attributes.EXT_DATA_ID == undefined || layerFeature.attributes.EXT_DATA_ID == null) {
									if (layerFeature.attributes.GROUP_CODE == "J") {
										jsonStr += "{\n";
										jsonStr += "				\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "\",\n";
										jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
										jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
										jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small\",\n";
										jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
										jsonStr += "				\"leaf\": true,\n";
										jsonStr += "				\"checked\": null\n";
										jsonStr += "			,   \"infoBtnDisabled\": false,\n";
										jsonStr += "				\"chartBtnDisabled\": true,\n";
										jsonStr += "				\"scensBtnDisabled\": true,\n";
										jsonStr += "				\"rptBtnDisabled\": true,\n";
										jsonStr += "				\"srchBtnDisabled\": false\n";
										jsonStr += "			}, ";
									}else if (layerFeature.attributes.GROUP_CODE == "H") {

										jsonStr += "{\n";
										jsonStr += "				\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "\",\n";
										jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
										jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
										jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small\",\n";
										jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
										jsonStr += "				\"leaf\": true,\n";
										jsonStr += "				\"scensBtnDisabled\": true,\n";
										jsonStr += "				\"rptBtnDisabled\": true,\n";
										jsonStr += "				\"checked\": null,\n";
										jsonStr += "			    \"infoBtnDisabled\": true,\n";
										jsonStr += "				\"chartBtnDisabled\": true\n";
										jsonStr += "			}, ";

									} else {

										jsonStr += "{\n";
										jsonStr += "				\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "\",\n";
										jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
										jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
										jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small\",\n";
										jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
										jsonStr += "				\"leaf\": true,\n";
										jsonStr += "				\"scensBtnDisabled\": true,\n";
										jsonStr += "				\"rptBtnDisabled\": true,\n";
										jsonStr += "				\"checked\": null\n";
										
										if (layerFeature.attributes.GROUP_CODE == "G" || layerFeature.attributes.GROUP_CODE == "E") {
											jsonStr += "			,   \"infoBtnDisabled\": true,\n";
											jsonStr += "				\"chartBtnDisabled\": true,\n";
											jsonStr += "				\"srchBtnDisabled\": true\n";
										}
										
										jsonStr += "			}, ";

									}

								} else {
									jsonStr += "{\n";
									jsonStr += "				\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "_" + cnt + "\",\n";
									jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
									jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
									jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small-bold\",\n";
									jsonStr += "				\"infoBtnDisabled\": true,\n";
									jsonStr += "				\"chartBtnDisabled\": true,\n";
									jsonStr += "				\"srchBtnDisabled\": true,\n";
									jsonStr += "				\"scensBtnDisabled\": true,\n";
									jsonStr += "				\"rptBtnDisabled\": true,\n";
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

					jsonStr += "]\n";
					jsonStr += "	}, ";
					
					arrGroupCodes = [];
				});//보 그럽 코드

				
				if (boGroup.length > 0) {
					jsonStr = jsonStr.substring(0, jsonStr.length - 2);
				}

				jsonStr += "]\n";

				jsonStr += "}";
				
				var jsonData = "";
				jsonData = Ext.util.JSON.decode(jsonStr);


				store.setRootNode(jsonData);
				store.setRootVisible(false);

			}, function (error) {
				// 로딩바 숨김
				Ext.getCmp("siteListTree").unmask();
				Ext.getCmp("siteListTree").addCls("dj-mask-noneimg");
				Ext.getCmp("siteListTree").mask("지점정보 조회 오류 발생하였습니다.", "noData");
			});
		}
	}
});

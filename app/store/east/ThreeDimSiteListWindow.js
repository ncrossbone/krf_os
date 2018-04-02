Ext.define('krf_new.store.east.ThreeDimSiteListWindow', {
	extend: 'Ext.data.TreeStore',
	remoteSort: true,
	
	listeners: {
		
		load: function(store) {
			
			var nameInfo = Ext.getCmp("textThreeDimSearchText");
			
			var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + '/' + $KRF_DEFINE.siteInfoLayerId); // 레이어 URL v3
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "JIJUM_NM like '"+nameInfo.rawValue+"%'";
			
			query.orderByFields = ["LAYER_CODE ASC"];
			query.outFields = ["*"];
			// 로딩바 표시
			Ext.getCmp("threeDimSiteListTree").removeCls("dj-mask-noneimg");
			Ext.getCmp("threeDimSiteListTree").addCls("dj-mask-withimg");
			Ext.getCmp("threeDimSiteListTree").mask("loading", "loading...");
			
			queryTask.execute(query, function(result){
				
				var fMap = result.features.map(function(obj){
					return obj.attributes.GROUP_CODE + " | " + obj.attributes.LAYER_CODE+ " | " + obj.attributes.JIJUM_CODE + " | " + obj.attributes.JIJUM_NM + " | " + obj.attributes.AREA_EVENT_ID; 
				});
				
				var filterArr= [];
				var newFeatures = [];
				
				$.each(result.features, function(cnt, feature){
					
					if($.inArray(feature.attributes.LAYER_CODE + feature.attributes.JIJUM_CODE + feature.attributes.EXT_DATA_ID, filterArr) === -1){
						
						filterArr.push(feature.attributes.LAYER_CODE + feature.attributes.JIJUM_CODE + feature.attributes.EXT_DATA_ID);
						newFeatures.push(feature);
					}
				});
				
				result.features = newFeatures;
				
				var tMap = result.features.map(function(obj){
					return obj.attributes.GROUP_CODE + " | " + obj.attributes.LAYER_CODE+ " | " + obj.attributes.JIJUM_CODE + " | " + obj.attributes.JIJUM_NM + " | " + obj.attributes.AREA_EVENT_ID; 
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
				
				$.each(result.features, function(cnt, feature){
					// "==="연산자 값과 타입이 정확하게 일치하는지 판단
					if($.inArray(feature.attributes.GROUP_CODE, arrGroupCodes) === -1){
						
						arrGroupCodes.push(feature.attributes.GROUP_CODE);
					}
				});
				/* 중복 제거한 그룹 코드 배열에 넣기 (arrGroupCodes) 끝 */
				
				// 그룹 코드 루프 시작
				$.each(arrGroupCodes, function(cnt, groupCode){
					
					/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) */
					var groupFeature = result.features.filter(function(feature){
						
						if(feature.attributes.GROUP_CODE === groupCode)
							return feature;
					});
					
					/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) 끝 */
					jsonStr += "{\n";
					jsonStr += "		\"id\": \"" + groupFeature[0].attributes.GROUP_CODE + "\",\n";
					jsonStr += "		\"text\": \"" + groupFeature[0].attributes.GROUP_NM + "("+groupFeature.length+")\",\n";
					jsonStr += "		\"cls\": \"khLee-x-tree-node-text-bold\",\n";
					if(groupFeature[0].attributes.GROUP_CODE == "G" || groupFeature[0].attributes.GROUP_CODE == "E"){
						jsonStr += "				\"srchBtnDisabled\": true,\n";
					}
					if(cnt == 0){
						jsonStr += "		\"expanded\": true,\n";
					}else{
						jsonStr += "		\"expanded\": false,\n";
					}
					jsonStr += "		\"checked\": null,\n";
					jsonStr += "		\"children\": [";
					
					/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) */
					var arrLayerCodes = [];
					
					$.each(groupFeature, function(cnt, feature){
						//if($.inArray(feature.attributes.LAYER_CODE, arrLayerCodes) === -1){
						if($.inArray(feature.attributes.LAYER_CODE + feature.attributes.EXT_DATA_ID, arrLayerCodes) === -1){
							
							arrLayerCodes.push(feature.attributes.LAYER_CODE + feature.attributes.EXT_DATA_ID);
						}
					});
					/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) 끝 */
					
					// 레이어 코드 루프 시작
					$.each(arrLayerCodes, function(cnt, layerCode){
						
						var layerFeatures = groupFeature.filter(function(feature){
							//if(feature.attributes.LAYER_CODE === layerCode){
							if(feature.attributes.LAYER_CODE + feature.attributes.EXT_DATA_ID === layerCode){
								if(feature.attributes.EXT_DATA_ID != undefined && feature.attributes.EXT_DATA_ID != null){
									feature.attributes.LAYER_CODE = feature.attributes.LAYER_CODE + "_" + cnt;
									feature.attributes.LAYER_NM = feature.attributes.LAYER_NM + "_TEST";
									feature.attributes.isKradLayer = true;
								}
								return feature;
							}
						});
						
						jsonStr += "{\n";
						jsonStr += "			\"id\": \"" + layerFeatures[0].attributes.LAYER_CODE + "\",\n";
						jsonStr += "			\"text\": \"" + layerFeatures[0].attributes.LAYER_NM + "("+layerFeatures.length+")\",\n";
						if(layerFeatures[0].attributes.GROUP_CODE == "G" || layerFeatures[0].attributes.GROUP_CODE == "E" || layerFeatures[0].attributes.EQ_EVENT_YN == "Y"){
							jsonStr += "				\"srchBtnDisabled\": true,\n";
						}
						if(layerFeatures[0].attributes.isKradLayer != undefined && layerFeatures[0].attributes.isKradLayer != null){
							jsonStr += "			\"cls\": \"khLee-x-tree-node-text-small-bold\",\n";
						}
						if(cnt == 0 ){
							jsonStr += "			\"expanded\": true,\n"; // 펼치기..
						}else{
							jsonStr += "			\"expanded\": false,\n"; // 펼치기..
						}
						jsonStr += "			\"children\": [";
						
						
						$.each(layerFeatures, function(cnt, layerFeature){
							if(layerFeature.attributes.EXT_DATA_ID == undefined || layerFeature.attributes.EXT_DATA_ID == null){
								jsonStr += "{\n";
								jsonStr += "				\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "\",\n";
								jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
								jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
								jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small\",\n";
								jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
								jsonStr += "				\"leaf\": true,\n";
								jsonStr += "				\"checked\": null\n";
								if(layerFeature.attributes.GROUP_CODE == "G" || layerFeature.attributes.GROUP_CODE == "E"){
									jsonStr += "			,   \"infoBtnDisabled\": true,\n";
									jsonStr += "				\"chartBtnDisabled\": true,\n";
									jsonStr += "				\"srchBtnDisabled\": true\n";
								}
								jsonStr += "			}, ";
							}
							else{
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
						
						if(layerFeatures.length > 0){
							jsonStr = jsonStr.substring(0, jsonStr.length - 2);
						}
						
						jsonStr += "]\n";
						jsonStr += "		}, ";
					}); // 레이어 코드 루프 끝
					
					if(arrLayerCodes.length > 0){
						jsonStr = jsonStr.substring(0, jsonStr.length - 2);
					}
					
					jsonStr += "]\n";
					jsonStr += "	}, ";
				}); // 그룹 코드 루프 끝
				if(arrGroupCodes.length > 0){
					jsonStr = jsonStr.substring(0, jsonStr.length - 2);
				}
				
				jsonStr += "]\n";
				
				jsonStr += "}";
				
				var jsonData = Ext.util.JSON.decode(jsonStr);
				
				store.setRootNode(jsonData);
				store.setRootVisible(false);
				// 로딩바 숨김
				Ext.getCmp("threeDimSiteListTree").unmask();
				
				if(result.features.length == 0){
	        		Ext.getCmp("threeDimSiteListTree").addCls("dj-mask-noneimg");
					Ext.getCmp("threeDimSiteListTree").mask("데이터가 존재하지 않습니다.", "noData");
	        	}
				
	        }, function(error){
	        	// 로딩바 숨김
				Ext.getCmp("threeDimSiteListTree").unmask();
				Ext.getCmp("threeDimSiteListTree").addCls("dj-mask-noneimg");
				Ext.getCmp("threeDimSiteListTree").mask("지점정보 조회 오류 발생하였습니다.", "noData");
	        });
	  	}
	}
});

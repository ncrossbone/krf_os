Ext.define('Report.store.east.treeRptSiteListStore', {

	extend: 'Ext.data.TreeStore',

	searchType: '',
	remoteSort: true,

	listeners: {

		load: function (store) {
			var siteObj = parentObj.Ext.getCmp("siteListWindow")

			if(!siteObj){
				//alert('리포트 보기를 재시작 해주세요.');
				//window.close();
				return;
			}
			var siteIds = siteObj.siteIds;
			// esri 스크립트 로드 될때까지 타이머
			
			require(["esri/tasks/QueryTask"],
				function (QueryTask) {

					var queryTask = new esri.tasks.QueryTask(parentObj.$KRF_DEFINE.reachServiceUrl_v3 + '/' + parentObj.$KRF_DEFINE.siteInfoLayerId); // 레이어 URL v3
					var query = new esri.tasks.Query();


					query.returnGeometry = false;
					query.where = "JIJUM_CODE IN (" + siteIds + ")";
					query.outFields = ["*"];

					queryTask.execute(query, function (result) {
						var jsonStr = "{\n";
						jsonStr += "	\"id\": \"0\", \n";
						jsonStr += "	\"siteName\":  \"root\", \n";
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

							/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) */
							var arrLayerCodes = [];

							$.each(groupFeature, function (cnt, feature) {

								if ($.inArray(feature.attributes.LAYER_CODE, arrLayerCodes) === -1) {

									arrLayerCodes.push(feature.attributes.LAYER_CODE);
								}
							});
							/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) 끝 */

							// 레이어 코드 루프 시작
							$.each(arrLayerCodes, function (cnt, layerCode) {

								var layerFeatures = groupFeature.filter(function (feature) {

									if (feature.attributes.LAYER_CODE === layerCode) {

										return feature;
									}
								});

								//console.info(layerFeatures);

								jsonStr += "{\n";
								jsonStr += "		\"id\": \"" + layerFeatures[0].attributes.LAYER_CODE + "\",\n";
								jsonStr += "		\"siteName\": \"" + layerFeatures[0].attributes.LAYER_NM + "(" + layerFeatures.length + ")\",\n";
								jsonStr += "		\"cls\": 'khLee-x-tree-node-text-bold', \n";
								jsonStr += "		\"iconCls\": \"layerNoneImg\",\n";
								jsonStr += "		\"checked\": true,\n";
								jsonStr += "		\"expanded\": true,\n"; // 펼치기..
								jsonStr += "		\"children\": [";

								$.each(layerFeatures, function (cnt, layerFeature) {

									jsonStr += "{\n";
									jsonStr += "			\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "\",\n";
									jsonStr += "			\"siteName\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
									jsonStr += "			\"siteAddr\": \"" + layerFeature.attributes.ADDR + "\",\n";
									//jsonStr += "			\"siteOrg\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
									jsonStr += "			\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
									jsonStr += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
									jsonStr += "			\"iconCls\": \"layerNoneImg\",\n";
									jsonStr += "			\"leaf\": true,\n";
									jsonStr += "			\"checked\": true\n";
									jsonStr += "		}, ";
								});

								jsonStr = jsonStr.substring(0, jsonStr.length - 2);

								jsonStr += "]\n";
								jsonStr += "	}, ";
							}); // 레이어 코드 루프 끝

							jsonStr = jsonStr.substring(0, jsonStr.length - 1);
						}); // 그룹 코드 루프 끝

						jsonStr = jsonStr.substring(0, jsonStr.length - 2);

						jsonStr += "}]\n";
						jsonStr += "}";


						var jsonData = "";
						jsonData = Ext.util.JSON.decode(jsonStr);
						store.setRootNode(jsonData);
					});

				});

		}
	},
});

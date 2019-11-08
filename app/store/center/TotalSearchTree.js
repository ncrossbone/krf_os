Ext.define('krf_new.store.center.TotalSearchTree', {
	extend: 'Ext.data.TreeStore',
	remoteSort: true,
	listeners: {

		load: function (store) {

			var me = this;

			var window = Ext.getCmp('totalSearchDetailWindow');

			var jsonData = store.data;

			var layerList = [];
			//상세검색일시
			if (Ext.getCmp('itemselector')) {
				layerList = Ext.getCmp('itemselector').getValue();
			} else {//아닐시 (수질측정망(하천,호소), 생물측정망 (하천,호소), 퇴적물측정망(하천,호소), 수질자동측정망)
				layerList = ['A001', 'A002', 'C001', 'C002', 'B001'
					, 'HcAtalSe', 'HcBemaSe', 'HcFishSe', 'HcInhaSe', 'HcQltwtrSe', 'HcVtnSe', 'HgAtalSe', 'HgBemaSe', 'HgFishSe', 'HgVtnSe'];
			}

			var paramList = { 'A': [], 'B': [], 'C': [], 'D': [], 'Esstg': [], 'F': [], 'G': [], 'H': [] };
			var siteIds = [];

			//날짜 세팅
			var detailSearchStartYear = "";
			var detailSearchStartMonth = "";
			var detailSearchEndYear = "";
			var detailSearchEndMonth = "";
			if (Ext.getCmp('detailSearchWindow')) {//상세검색일시
				detailSearchStartYear = Ext.getCmp('detail_startYear').value;
				detailSearchStartMonth = Ext.getCmp('detail_startMonth').value;
				detailSearchEndYear = Ext.getCmp('detail_endYear').value;
				detailSearchEndMonth = Ext.getCmp('detail_endMonth').value;

			} else {//아닐시

				var startYear = document.getElementById('detailStartDate').value;
				var endYear = document.getElementById('detailEndDate').value;
				var startMonth = document.getElementById('detailStartMonth').value;
				var endMonth = document.getElementById('detailEndMonth').value;

				detailSearchStartYear = startYear;
				detailSearchStartMonth = startMonth;
				detailSearchEndYear = endYear;
				detailSearchEndMonth = endMonth;
			}

			detailSearchStartMonth = Number(detailSearchStartMonth).toString();
			if (Number(detailSearchStartMonth) < 10 && detailSearchStartMonth.length == 1)
				detailSearchStartMonth = "0" + detailSearchStartMonth;

			detailSearchEndMonth = Number(detailSearchEndMonth).toString();
			if (Number(detailSearchEndMonth) < 10 && detailSearchEndMonth.length == 1)
				detailSearchEndMonth = "0" + detailSearchEndMonth;



			var object = jsonData.map;
			//param siteId 만들기 = ex)A_10230  (GROUP_CODE + _ + JIJUM_CODE)
			for (var key in object) {
				object[key].data.children.map(function (childObj) {
					childObj.children.map(function (obj) {
						if (paramList[childObj.parentId] != undefined) {
							//paramList[childObj.parentId].push(childObj.parentId+'_'+obj.id);
							if (childObj.parentId != 'Esstg') {
								siteIds.push(childObj.parentId + '_' + obj.id);
							} else {
								if (obj.parentId != 'E003' && obj.parentId != 'E004') {
									obj.children.map(function (eObj) {
										siteIds.push('E_' + eObj.eSiteId);
									})
								}
							}
						}
					})
				})
			}

			//중복제거
			siteIds = siteIds.reduce(function (a, b) {
				if (a.indexOf(b) < 0) a.push(b);
				return a;
			}, []);

			// 로딩중 메세지
			window.removeCls("dj-mask-noneimg");
			window.addCls("dj-mask-withimg");
			window.mask("loading", "loading...");

			Ext.Ajax.request({
				url: _API.detialSearchResult,
				dataType: "text/plain",
				method: 'POST',
				params: {
					startYear: detailSearchStartYear,
					startMonth: detailSearchStartMonth,
					endYear: detailSearchEndYear,
					endMonth: detailSearchEndMonth,
					detailSiteIds: siteIds
				},
				async: true,
				success: function (response, opts) {
					if (response.responseText == 'error' || response.responseText == 'fromIndex = -1' || response.responseText == '') {
						window.addCls('dj-mask-noneimg');
						window.mask('정보를 조회하지 못했습니다.', 'noData');
						return;
					}

					var jsonData = Ext.util.JSON.decode(response.responseText);

					if (jsonData.data.length > 0) {

						for (var a = 0; a < jsonData.data.length; a++) {
							if (jsonData.data[a].GROUP_CODE == 'A') {
								jsonData.data[a].sortVal = 1;
							} else if (jsonData.data[a].GROUP_CODE == 'C') {
								jsonData.data[a].sortVal = 2;
							} else if (jsonData.data[a].GROUP_CODE == 'E') {
								jsonData.data[a].sortVal = 3;
							} else if (jsonData.data[a].GROUP_CODE == 'B') {
								jsonData.data[a].sortVal = 4;
							} else if (jsonData.data[a].GROUP_CODE == 'F') {
								jsonData.data[a].sortVal = 5;
							} else if (jsonData.data[a].GROUP_CODE == 'D') {
								jsonData.data[a].sortVal = 6;
							}
						}

						if (jsonData.data[0].msg) {
							window.addCls("dj-mask-noneimg");
							window.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						} else {
							var confirmJsonData = [];

							if (layerList.length > 0) {
								for (var i = 0; i < layerList.length; i++) {

									jsonData.data.map(function (obj) {

										if (layerList[i] == obj.LAYER_CODE) {
											confirmJsonData.push(obj);
										}
									})
								}

							}

							var jsonStr = "{\n";
							jsonStr += "	\"id\": \"0\", \n";
							jsonStr += "	\"text\":  \"root\", \n";
							jsonStr += "	\"checked\": true, \n";
							jsonStr += "	\"expanded\": true, \n";
							jsonStr += "	\"children\": [";


							var arrGroupCodes = [];

							confirmJsonData.sort(function (a, b) {
								return a.sortVal < b.sortVal ? -1 : a.sortVal > b.sortVal ? 1 : 0;
							});

							krf_new.global.CommFn.totalSearchExcelData = confirmJsonData;

							$.each(confirmJsonData, function (cnt, datas) {
								// "==="연산자 값과 타입이 정확하게 일치하는지 판단
								if ($.inArray(datas.GROUP_CODE, arrGroupCodes) === -1) {
									arrGroupCodes.push(datas.GROUP_CODE);
								}

							});

							// 그룹 코드 루프 시작
							$.each(arrGroupCodes, function (cnt, groupCode) {

								var groupFeature = confirmJsonData.filter(function (feature) {

									if (feature.GROUP_CODE === groupCode)
										return feature;
								});

								/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) 끝 */
								jsonStr += "{\n";
								jsonStr += "		\"id\": \"" + groupFeature[0].GROUP_CODE + "\",\n";
								jsonStr += "		\"text\": \"" + groupFeature[0].DTA_SE + " \",\n";
								jsonStr += "		\"cls\": \"khLee-x-tree-node-text-bold\",\n";
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
									if ($.inArray(feature.LAEYR_CODE, arrLayerCodes) === -1) {

										arrLayerCodes.push(feature.LAEYR_CODE);

									}
								});
								/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) 끝 */

								// 그룹 코드 루프 시작
								$.each(arrLayerCodes, function (cnt, layerCode) {

									var layerFeatures = groupFeature.filter(function (feature) {
										//if(feature.attributes.LAYER_CODE === layerCode){
										if (feature.LAEYR_CODE === layerCode) {

											return feature;
										}
									});

									/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) 끝 */
									jsonStr += "{\n";
									jsonStr += "		\"id\": \"" + layerFeatures[0].LAEYR_CODE + "\",\n";
									jsonStr += "		\"text\": \"" + layerFeatures[0].DTA_DETAIL_SE + " \",\n";
									jsonStr += "		\"cls\": \"khLee-x-tree-node-text-bold\",\n";
									if (cnt == 0) {
										jsonStr += "		\"expanded\": true,\n";
									} else {
										jsonStr += "		\"expanded\": false,\n";
									}
									jsonStr += "		\"checked\": null,\n";
									jsonStr += "		\"children\": [";

									/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) */

									// 레이어 코드 루프 시작
									$.each(layerFeatures, function (cnt, layerFeature) {

										jsonStr += "{\n";
										if (layerFeature.GROUP_CODE == 'E') {
											jsonStr += "				\"id\": \"" + layerFeature.LAEYR_CODE + "_" + layerFeature.SITE_CODE + "_" + cnt + "\",\n";
										} else {
											jsonStr += "				\"id\": \"" + layerFeature.SITE_CODE + "_" + cnt + "\",\n";
										}
										jsonStr += "				\"text\": \"" + layerFeature.SITE_NM + "\",\n";
										jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small-bold\",\n";
										jsonStr += "				\"DTA_SE\": \"" + layerFeature.DTA_SE + "\",\n";
										jsonStr += "				\"GROUP_CODE\": \"" + layerFeature.GROUP_CODE + "\",\n";
										jsonStr += "				\"DTA_DETAIL_SE\": \"" + layerFeature.DTA_DETAIL_SE + "\",\n";
										jsonStr += "				\"LAEYR_CODE\": \"" + layerFeature.LAEYR_CODE + "\",\n";
										jsonStr += "				\"SITE_CODE\": \"" + layerFeature.SITE_CODE + "\",\n";
										jsonStr += "				\"SITE_NM\": \"" + layerFeature.SITE_NM + "\",\n";
										jsonStr += "				\"DE\": \"" + layerFeature.DE + "\",\n";
										jsonStr += "				\"TME\": \"" + layerFeature.TME + "\",\n";
										jsonStr += "				\"ADRES\": \"" + layerFeature.ADRES + "\",\n";
										jsonStr += "				\"MESURE_DP\": \"" + layerFeature.MESURE_DP + "\",\n";
										jsonStr += "				\"IEM_1060\": \"" + layerFeature.IEM_1060 + "\",\n";
										jsonStr += "				\"IEM_1054\": \"" + layerFeature.IEM_1054 + "\",\n";
										jsonStr += "				\"IEM_1039\": \"" + layerFeature.IEM_1039 + "\",\n";
										jsonStr += "				\"IEM_1050\": \"" + layerFeature.IEM_1050 + "\",\n";
										jsonStr += "				\"IEM_1052\": \"" + layerFeature.IEM_1052 + "\",\n";
										jsonStr += "				\"IEM_1049\": \"" + layerFeature.IEM_1049 + "\",\n";
										jsonStr += "				\"IEM_1053\": \"" + layerFeature.IEM_1053 + "\",\n";
										jsonStr += "				\"IEM_1055\": \"" + layerFeature.IEM_1055 + "\",\n";
										jsonStr += "				\"IEM_1056\": \"" + layerFeature.IEM_1056 + "\",\n";
										jsonStr += "				\"IEM_1073\": \"" + layerFeature.IEM_1073 + "\",\n";
										jsonStr += "				\"IEM_1013\": \"" + layerFeature.IEM_1013 + "\",\n";
										jsonStr += "				\"IEM_1012\": \"" + layerFeature.IEM_1012 + "\",\n";
										jsonStr += "				\"IEM_1066\": \"" + layerFeature.IEM_1066 + "\",\n";
										jsonStr += "				\"IEM_1067\": \"" + layerFeature.IEM_1067 + "\",\n";
										jsonStr += "				\"IEM_1065\": \"" + layerFeature.IEM_1065 + "\",\n";
										jsonStr += "				\"IDEX\": \"" + layerFeature.IDEX + "\",\n";
										jsonStr += "				\"GRAD\": \"" + layerFeature.GRAD + "\",\n";
										jsonStr += "				\"IEM_1160\": \"" + layerFeature.IEM_1160 + "\",\n";
										jsonStr += "				\"IEM_1155\": \"" + layerFeature.IEM_1155 + "\",\n";
										jsonStr += "				\"TOT_INFLOW_QY\": \"" + layerFeature.TOT_INFLOW_QY + "\",\n";
										jsonStr += "				\"TOT_DWEQTY\": \"" + layerFeature.TOT_DWEQTY + "\",\n";
										jsonStr += "				\"WLV\": \"" + layerFeature.WLV + "\",\n";
										jsonStr += "				\"RAINFL\": \"" + layerFeature.RAINFL + "\",\n";
										jsonStr += "				\"FLUX\": \"" + layerFeature.FLUX + "\",\n";
										jsonStr += "				\"AVRG_SPFLD\": \"" + layerFeature.AVRG_SPFLD + "\",\n";
										jsonStr += "				\"SORT\": \"" + layerFeature.SORT + "\",\n";
										jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
										jsonStr += "				\"leaf\": true,\n";
										jsonStr += "				\"checked\": null\n";
										jsonStr += "			}, ";


									}); // 레이어 코드 루프 

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


							jsonStr += " ]} ";


							var jsonData = "";
							jsonData = Ext.util.JSON.decode(jsonStr);
							store.setRootNode(jsonData);
							store.setRootVisible(false);


							window.unmask();
						}


					} else {
						window.addCls("dj-mask-noneimg");
						window.mask("검색도중 오류가 발생했습니다.", "error");
					}

				}
			})










			//"'1007A45', '1016A10', '1016A30', '1016A32', '1016A35', '1016A37', '1016A40', '1016A45', '1101A35', '1101A37', '1101A40'"



			// Ext.Ajax.request({
			// 	url: 'http://localhost:80/krf/searchResult/detialSearchResult',
			// 	dataType: "text/plain",
			// 	method: 'POST',
			// 	params: {
			// 		startYear:'2017',
			// 		startMonth: '01',
			// 		endYear: '2018',
			// 		endMonth: '12',
			// 		detailSiteIds : siteIds
			// 	},
			// 	async: true,
			// 	success: function (response, opts) {

			// 		var jsonData = Ext.util.JSON.decode(response.responseText);



			// 		var jsonStr = "{\n";
			// 		jsonStr += "	\"id\": \"0\", \n";
			// 		jsonStr += "	\"text\":  \"root\", \n";
			// 		jsonStr += "	\"cls\": 'khLee-x-tree-node-text-bold', \n";
			// 		jsonStr += "	\"checked\": true, \n";
			// 		jsonStr += "	\"expanded\": true, \n";
			// 		jsonStr += "	\"children\": [";


			// 		var arrGroupCodes = [];

			// 		$.each(jsonData.data, function (cnt, datas) {
			// 			// "==="연산자 값과 타입이 정확하게 일치하는지 판단
			// 			if ($.inArray(datas.GROUP_CODE, arrGroupCodes) === -1) {
			// 				arrGroupCodes.push(datas.GROUP_CODE);
			// 			}

			// 		});


			// 		// 그룹 코드 루프 시작
			// 		$.each(arrGroupCodes, function (cnt, groupCode) {

			// 			/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) 끝 */
			// 			jsonStr += "{\n";
			// 			jsonStr += "		\"id\": \"" + groupCode.GROUP_CODE + "\",\n";
			// 			jsonStr += "		\"text\": \"" + groupCode.DTA_SE + " \",\n";
			// 			jsonStr += "		\"cls\": \"khLee-x-tree-node-text-bold\",\n";
			// 			if (cnt == 0) {
			// 				jsonStr += "		\"expanded\": true,\n";
			// 			} else {
			// 				jsonStr += "		\"expanded\": false,\n";
			// 			}
			// 			jsonStr += "		\"checked\": null,\n";
			// 			jsonStr += "		\"children\": [";

			// 			/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) */
			// 			var arrLayerCodes = [];

			// 			$.each(groupCode, function (cnt, feature) {
			// 				//if($.inArray(feature.attributes.LAYER_CODE, arrLayerCodes) === -1){
			// 				if ($.inArray(arrGroupCodes.LAYER_CODE, arrLayerCodes) === -1) {

			// 					arrLayerCodes.push(arrGroupCodes.LAYER_CODE);

			// 				}
			// 			});
			// 			/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) 끝 */

			// 			// 레이어 코드 루프 시작
			// 			$.each(arrLayerCodes, function (cnt, layerCode) {


			// 				jsonStr += "{\n";
			// 				jsonStr += "			\"id\": \"" + layerCode.LAYER_CODE + "\",\n";
			// 				jsonStr += "			\"text\": \"" + layerCode.DTA_DETAIL_SE + "\",\n";
			// 				if (cnt == 0) {
			// 					jsonStr += "			\"expanded\": true,\n"; // 펼치기..
			// 				} else {
			// 					jsonStr += "			\"expanded\": false,\n"; // 펼치기..
			// 				}
			// 				jsonStr += "			\"children\": [";


			// 				$.each(layerCode, function (cnt, layerFeature) {

			// 					jsonStr += "{\n";
			// 					jsonStr += "				\"id\": \"" + layerFeature.SITE_CODE + "\",\n";
			// 					jsonStr += "				\"text\": \"" + layerFeature.SITE_NM + "\",\n";
			// 					jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small-bold\",\n";
			// 					jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
			// 					jsonStr += "				\"leaf\": true,\n";
			// 					jsonStr += "				\"checked\": null\n";
			// 					jsonStr += "			}, ";
			// 				});

			// 				if (layerCode.length > 0) {
			// 					jsonStr = jsonStr.substring(0, jsonStr.length - 2);
			// 				}

			// 				jsonStr += "]\n";
			// 				jsonStr += "		}, ";
			// 			}); // 레이어 코드 루프 끝

			// 			if (arrLayerCodes.length > 0) {
			// 				jsonStr = jsonStr.substring(0, jsonStr.length - 2);
			// 			}

			// 			jsonStr += "]\n";
			// 			jsonStr += "	} ";
			// 		}); // 그룹 코드 루프 끝







			// 		jsonStr += "	\"children\": }";
			// 		jsonStr += "	\"children\": ]";



			// 		console.info(jsonStr);
			// 		var jsonData = "";
			// 		jsonData = Ext.util.JSON.decode(jsonStr);
			// 		console.info(jsonData);



			// 	}
			// });


			// var uniq = paramList.reduce(function(a,b){
			// 	if (a.indexOf(b) < 0 ) a.push(b);
			// 	return a;
			// },[]);

			//console.log(uniq, paramList) // [ 'Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Carl' ]




            /*Ext.Ajax.request({
				url: './resources/data/treeTest.json',
				dataType: "text/plain",
				method: 'POST',
				async: true,
				success: function (response, opts) {

					var jsonData = Ext.util.JSON.decode(response.responseText);
					store.setRootNode(jsonData);
					store.setRootVisible(false);

				}
			});*/
		}
	}
});

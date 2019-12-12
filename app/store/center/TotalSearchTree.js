Ext.define('krf_new.store.center.TotalSearchTree', {
	extend: 'Ext.data.TreeStore',
	remoteSort: true,
	listeners: {

		load: function (store) {

			var me = this;

			var window = Ext.getCmp('totalSearchTree');

			var jsonData = store.data;

			var layerList = [];
			//상세검색일시
			if (Ext.getCmp('itemselector')) {
				layerList = Ext.getCmp('itemselector').getValue();
			} else {//아닐시 (수질측정망(하천,호소), 생물측정망 (하천,호소), 퇴적물측정망(하천,호소), 수질자동측정망)
				layerList = ['A001', 'A002','A003','A004','A005','A006','A007', 'C001', 'C002', 'B001'
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
									if(obj.children != null){
										obj.children.map(function (eObj) {
											siteIds.push('E_' + eObj.eSiteId);
										})
									}
									
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
									if ($.inArray(feature.LAYER_CODE, arrLayerCodes) === -1) {

										arrLayerCodes.push(feature.LAYER_CODE);

									}
								});
								/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) 끝 */

								// 그룹 코드 루프 시작
								$.each(arrLayerCodes, function (cnt, layerCode) {

									var layerFeatures = groupFeature.filter(function (feature) {
										//if(feature.attributes.LAYER_CODE === layerCode){
										if (feature.LAYER_CODE === layerCode) {

											return feature;
										}
									});

									/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) 끝 */
									jsonStr += "{\n";
									jsonStr += "		\"id\": \"" + layerFeatures[0].LAYER_CODE + "\",\n";
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
											jsonStr += "				\"id\": \"" + layerFeature.LAYER_CODE + "_" + layerFeature.SITE_CODE + "_" + cnt + "\",\n";
										} else {
											jsonStr += "				\"id\": \"" + layerFeature.SITE_CODE + "_" + cnt + "\",\n";
										}
										
										jsonStr += "				\"text\": \"" + layerFeature.SITE_NM + "\",\n";
										jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small-bold\",\n";
										jsonStr += "				\"DTA_SE\": \"" + layerFeature.DTA_SE + "\",\n";
										jsonStr += "				\"GROUP_CODE\": \"" + layerFeature.GROUP_CODE + "\",\n";
										jsonStr += "				\"DTA_DETAIL_SE\": \"" + layerFeature.DTA_DETAIL_SE + "\",\n";
										jsonStr += "				\"LAYER_CODE\": \"" + layerFeature.LAYER_CODE + "\",\n";
										jsonStr += "\"SITE_NM\": \"" + layerFeature.SITE_NM + "\",\n";
										jsonStr += "\"DE\": \"" + layerFeature.DE + "\",\n";
										jsonStr += "\"TME\": \"" + layerFeature.TME + "\",\n";
										jsonStr += "\"IEM_1001\": \"" + layerFeature.IEM_1001 + "\",\n";
										jsonStr += "\"IEM_1039\": \"" + layerFeature.IEM_1039 + "\",\n";
										jsonStr += "\"IEM_1054\": \"" + layerFeature.IEM_1054 + "\",\n";
										jsonStr += "\"IEM_1052\": \"" + layerFeature.IEM_1052 + "\",\n";
										jsonStr += "\"IEM_1049\": \"" + layerFeature.IEM_1049 + "\",\n";
										jsonStr += "\"IEM_1053\": \"" + layerFeature.IEM_1053 + "\",\n";
										jsonStr += "\"IEM_1055\": \"" + layerFeature.IEM_1055 + "\",\n";
										jsonStr += "\"IEM_1056\": \"" + layerFeature.IEM_1056 + "\",\n";
										jsonStr += "\"IEM_1073\": \"" + layerFeature.IEM_1073 + "\",\n";
										jsonStr += "\"IEM_1060\": \"" + layerFeature.IEM_1060 + "\",\n";
										jsonStr += "\"IEM_1016\": \"" + layerFeature.IEM_1016 + "\",\n";
										jsonStr += "\"IEM_1050\": \"" + layerFeature.IEM_1050 + "\",\n";
										jsonStr += "\"IEM_1002\": \"" + layerFeature.IEM_1002 + "\",\n";
										jsonStr += "\"IEM_1014\": \"" + layerFeature.IEM_1014 + "\",\n";
										jsonStr += "\"IEM_1010\": \"" + layerFeature.IEM_1010 + "\",\n";
										jsonStr += "\"IEM_1005\": \"" + layerFeature.IEM_1005 + "\",\n";
										jsonStr += "\"IEM_1011\": \"" + layerFeature.IEM_1011 + "\",\n";
										jsonStr += "\"IEM_1007\": \"" + layerFeature.IEM_1007 + "\",\n";
										jsonStr += "\"IEM_1009\": \"" + layerFeature.IEM_1009 + "\",\n";
										jsonStr += "\"IEM_1061\": \"" + layerFeature.IEM_1061 + "\",\n";
										jsonStr += "\"IEM_1040\": \"" + layerFeature.IEM_1040 + "\",\n";
										jsonStr += "\"IEM_1057\": \"" + layerFeature.IEM_1057 + "\",\n";
										jsonStr += "\"IEM_1095\": \"" + layerFeature.IEM_1095 + "\",\n";
										jsonStr += "\"IEM_1096\": \"" + layerFeature.IEM_1096 + "\",\n";
										jsonStr += "\"IEM_1097\": \"" + layerFeature.IEM_1097 + "\",\n";
										jsonStr += "\"IEM_1066\": \"" + layerFeature.IEM_1066 + "\",\n";
										jsonStr += "\"IEM_1012\": \"" + layerFeature.IEM_1012 + "\",\n";
										jsonStr += "\"IEM_1013\": \"" + layerFeature.IEM_1013 + "\",\n";
										jsonStr += "\"IEM_1067\": \"" + layerFeature.IEM_1067 + "\",\n";
										jsonStr += "\"IEM_1065\": \"" + layerFeature.IEM_1065 + "\",\n";
										jsonStr += "\"IEM_1063\": \"" + layerFeature.IEM_1063 + "\",\n";
										jsonStr += "\"IEM_1094\": \"" + layerFeature.IEM_1094 + "\",\n";
										jsonStr += "\"IEM_1004\": \"" + layerFeature.IEM_1004 + "\",\n";
										jsonStr += "\"IEM_1006\": \"" + layerFeature.IEM_1006 + "\",\n";
										jsonStr += "\"IEM_1037\": \"" + layerFeature.IEM_1037 + "\",\n";
										jsonStr += "\"IEM_1064\": \"" + layerFeature.IEM_1064 + "\",\n";
										jsonStr += "\"IEM_1044\": \"" + layerFeature.IEM_1044 + "\",\n";
										jsonStr += "\"IEM_1043\": \"" + layerFeature.IEM_1043 + "\",\n";
										jsonStr += "\"IEM_1038\": \"" + layerFeature.IEM_1038 + "\",\n";
										jsonStr += "\"IEM_1023\": \"" + layerFeature.IEM_1023 + "\",\n";
										jsonStr += "\"IEM_1022\": \"" + layerFeature.IEM_1022 + "\",\n";
										jsonStr += "\"IEM_1030\": \"" + layerFeature.IEM_1030 + "\",\n";
										jsonStr += "\"IEM_1071\": \"" + layerFeature.IEM_1071 + "\",\n";
										jsonStr += "\"IEM_1024\": \"" + layerFeature.IEM_1024 + "\",\n";
										jsonStr += "\"IEM_1025\": \"" + layerFeature.IEM_1025 + "\",\n";
										jsonStr += "\"IEM_1051\": \"" + layerFeature.IEM_1051 + "\",\n";
										jsonStr += "\"IEM_1048\": \"" + layerFeature.IEM_1048 + "\",\n";
										jsonStr += "\"IEM_1083\": \"" + layerFeature.IEM_1083 + "\",\n";
										jsonStr += "\"IEM_1072\": \"" + layerFeature.IEM_1072 + "\",\n";
										jsonStr += "\"IEM_1082\": \"" + layerFeature.IEM_1082 + "\",\n";
										jsonStr += "\"IEM_1086\": \"" + layerFeature.IEM_1086 + "\",\n";
										jsonStr += "\"IEM_1062\": \"" + layerFeature.IEM_1062 + "\",\n";
										jsonStr += "\"IEM_1059\": \"" + layerFeature.IEM_1059 + "\",\n";
										jsonStr += "\"IEM_1093\": \"" + layerFeature.IEM_1093 + "\",\n";
										jsonStr += "\"IEM_1041\": \"" + layerFeature.IEM_1041 + "\",\n";
										jsonStr += "\"IEM_1155\": \"" + layerFeature.IEM_1155 + "\",\n";
										jsonStr += "\"IEM_1026\": \"" + layerFeature.IEM_1026 + "\",\n";
										jsonStr += "\"IEM_1027\": \"" + layerFeature.IEM_1027 + "\",\n";
										jsonStr += "\"IEM_1028\": \"" + layerFeature.IEM_1028 + "\",\n";
										jsonStr += "\"IEM_1029\": \"" + layerFeature.IEM_1029 + "\",\n";
										jsonStr += "\"IEM_1112\": \"" + layerFeature.IEM_1112 + "\",\n";
										jsonStr += "\"IEM_1031\": \"" + layerFeature.IEM_1031 + "\",\n";
										jsonStr += "\"IEM_1032\": \"" + layerFeature.IEM_1032 + "\",\n";
										jsonStr += "\"IEM_1033\": \"" + layerFeature.IEM_1033 + "\",\n";
										jsonStr += "\"IEM_1034\": \"" + layerFeature.IEM_1034 + "\",\n";
										jsonStr += "\"IEM_1035\": \"" + layerFeature.IEM_1035 + "\",\n";
										jsonStr += "\"IEM_1157\": \"" + layerFeature.IEM_1157 + "\",\n";
										jsonStr += "\"IEM_1158\": \"" + layerFeature.IEM_1158 + "\",\n";
										jsonStr += "\"IEM_1008\": \"" + layerFeature.IEM_1008 + "\",\n";
										jsonStr += "\"IEM_1159\": \"" + layerFeature.IEM_1159 + "\",\n";
										jsonStr += "\"IEM_1160\": \"" + layerFeature.IEM_1160 + "\",\n";
										jsonStr += "\"IEM_1084\": \"" + layerFeature.IEM_1084 + "\",\n";
										jsonStr += "\"IEM_1085\": \"" + layerFeature.IEM_1085 + "\",\n";
										jsonStr += "\"IEM_1146\": \"" + layerFeature.IEM_1146 + "\",\n";
										jsonStr += "\"IEM_1015\": \"" + layerFeature.IEM_1015 + "\",\n";
										jsonStr += "\"IEM_1147\": \"" + layerFeature.IEM_1147 + "\",\n";
										jsonStr += "\"IEM_1148\": \"" + layerFeature.IEM_1148 + "\",\n";
										jsonStr += "\"IEM_1149\": \"" + layerFeature.IEM_1149 + "\",\n";
										jsonStr += "\"IEM_1150\": \"" + layerFeature.IEM_1150 + "\",\n";
										jsonStr += "\"IEM_1151\": \"" + layerFeature.IEM_1151 + "\",\n";
										jsonStr += "\"IEM_1152\": \"" + layerFeature.IEM_1152 + "\",\n";
										jsonStr += "\"IEM_1153\": \"" + layerFeature.IEM_1153 + "\",\n";
										jsonStr += "\"IEM_1154\": \"" + layerFeature.IEM_1154 + "\",\n";
										jsonStr += "\"IEM_1111\": \"" + layerFeature.IEM_1111 + "\",\n";
										jsonStr += "\"IEM_1156\": \"" + layerFeature.IEM_1156 + "\",\n";
										jsonStr += "\"IEM_1113\": \"" + layerFeature.IEM_1113 + "\",\n";
										jsonStr += "\"IEM_1114\": \"" + layerFeature.IEM_1114 + "\",\n";
										jsonStr += "\"IEM_1115\": \"" + layerFeature.IEM_1115 + "\",\n";
										jsonStr += "\"IEM_1116\": \"" + layerFeature.IEM_1116 + "\",\n";
										jsonStr += "\"IEM_1117\": \"" + layerFeature.IEM_1117 + "\",\n";
										jsonStr += "\"IEM_1042\": \"" + layerFeature.IEM_1042 + "\",\n";
										jsonStr += "\"IEM_1118\": \"" + layerFeature.IEM_1118 + "\",\n";
										jsonStr += "\"IEM_1119\": \"" + layerFeature.IEM_1119 + "\",\n";
										jsonStr += "\"IEM_1120\": \"" + layerFeature.IEM_1120 + "\",\n";
										jsonStr += "\"IEM_1046\": \"" + layerFeature.IEM_1046 + "\",\n";
										jsonStr += "\"IEM_1121\": \"" + layerFeature.IEM_1121 + "\",\n";
										jsonStr += "\"IEM_1122\": \"" + layerFeature.IEM_1122 + "\",\n";
										jsonStr += "\"IEM_1123\": \"" + layerFeature.IEM_1123 + "\",\n";
										jsonStr += "\"IEM_1124\": \"" + layerFeature.IEM_1124 + "\",\n";
										jsonStr += "\"IEM_1125\": \"" + layerFeature.IEM_1125 + "\",\n";
										jsonStr += "\"IEM_1126\": \"" + layerFeature.IEM_1126 + "\",\n";
										jsonStr += "\"IEM_1127\": \"" + layerFeature.IEM_1127 + "\",\n";
										jsonStr += "\"IEM_1128\": \"" + layerFeature.IEM_1128 + "\",\n";
										jsonStr += "\"IEM_1129\": \"" + layerFeature.IEM_1129 + "\",\n";
										jsonStr += "\"IEM_1130\": \"" + layerFeature.IEM_1130 + "\",\n";
										jsonStr += "\"IEM_1131\": \"" + layerFeature.IEM_1131 + "\",\n";
										jsonStr += "\"IEM_1132\": \"" + layerFeature.IEM_1132 + "\",\n";
										jsonStr += "\"IEM_1133\": \"" + layerFeature.IEM_1133 + "\",\n";
										jsonStr += "\"IEM_1134\": \"" + layerFeature.IEM_1134 + "\",\n";
										jsonStr += "\"IEM_1135\": \"" + layerFeature.IEM_1135 + "\",\n";
										jsonStr += "\"IEM_1136\": \"" + layerFeature.IEM_1136 + "\",\n";
										jsonStr += "\"IEM_1137\": \"" + layerFeature.IEM_1137 + "\",\n";
										jsonStr += "\"IEM_1138\": \"" + layerFeature.IEM_1138 + "\",\n";
										jsonStr += "\"IEM_1139\": \"" + layerFeature.IEM_1139 + "\",\n";
										jsonStr += "\"IEM_1140\": \"" + layerFeature.IEM_1140 + "\",\n";
										jsonStr += "\"IEM_1068\": \"" + layerFeature.IEM_1068 + "\",\n";
										jsonStr += "\"IEM_1069\": \"" + layerFeature.IEM_1069 + "\",\n";
										jsonStr += "\"IEM_1141\": \"" + layerFeature.IEM_1141 + "\",\n";
										jsonStr += "\"IEM_1142\": \"" + layerFeature.IEM_1142 + "\",\n";
										jsonStr += "\"IEM_1143\": \"" + layerFeature.IEM_1143 + "\",\n";
										jsonStr += "\"IEM_1077\": \"" + layerFeature.IEM_1077 + "\",\n";
										jsonStr += "\"IEM_1078\": \"" + layerFeature.IEM_1078 + "\",\n";
										jsonStr += "\"IEM_1081\": \"" + layerFeature.IEM_1081 + "\",\n";
										jsonStr += "\"IEM_1144\": \"" + layerFeature.IEM_1144 + "\",\n";
										jsonStr += "\"IEM_1145\": \"" + layerFeature.IEM_1145 + "\",\n";
										jsonStr += "\"HEALTH_GRAD\": \"" + layerFeature.HEALTH_GRAD + "\",\n";
										jsonStr += "\"LA\": \"" + layerFeature.LA + "\",\n";
										jsonStr += "\"LO\": \"" + layerFeature.LO + "\",\n";
										jsonStr += "\"IEM_1161\": \"" + layerFeature.IEM_1161 + "\",\n";
										jsonStr += "\"EXAMIN_INSTT_NM\": \"" + layerFeature.EXAMIN_INSTT_NM + "\",\n";
										jsonStr += "\"EXMNR_NM\": \"" + layerFeature.EXMNR_NM + "\",\n";
										jsonStr += "\"RIVER\": \"" + layerFeature.RIVER + "\",\n";
										jsonStr += "\"HBTT_SAND_RT\": \"" + layerFeature.HBTT_SAND_RT + "\",\n";
										jsonStr += "\"HBTT_PEBB_RT\": \"" + layerFeature.HBTT_PEBB_RT + "\",\n";
										jsonStr += "\"HBTT_ROCK_RT\": \"" + layerFeature.HBTT_ROCK_RT + "\",\n";
										jsonStr += "\"HBTT_LP_RT\": \"" + layerFeature.HBTT_LP_RT + "\",\n";
										jsonStr += "\"HBTT_BP_RT\": \"" + layerFeature.HBTT_BP_RT + "\",\n";
										jsonStr += "\"HBTT_ROOT_RT\": \"" + layerFeature.HBTT_ROOT_RT + "\",\n";
										jsonStr += "\"RAP_RT\": \"" + layerFeature.RAP_RT + "\",\n";
										jsonStr += "\"FLOW_RT\": \"" + layerFeature.FLOW_RT + "\",\n";
										jsonStr += "\"POND_RT\": \"" + layerFeature.POND_RT + "\",\n";
										jsonStr += "\"HBTT_CNPY_RT\": \"" + layerFeature.HBTT_CNPY_RT + "\",\n";
										jsonStr += "\"HBTT_VEGCOV_RT\": \"" + layerFeature.HBTT_VEGCOV_RT + "\",\n";
										jsonStr += "\"COLCT_UNT\": \"" + layerFeature.COLCT_UNT + "\",\n";
										jsonStr += "\"COLCT_MTH\": \"" + layerFeature.COLCT_MTH + "\",\n";
										jsonStr += "\"RE_DCOL_SE\": \"" + layerFeature.RE_DCOL_SE + "\",\n";
										jsonStr += "\"RE_SMELL_SE\": \"" + layerFeature.RE_SMELL_SE + "\",\n";
										jsonStr += "\"RE_HRB_RT\": \"" + layerFeature.RE_HRB_RT + "\",\n";
										jsonStr += "\"RE_SRB_RT\": \"" + layerFeature.RE_SRB_RT + "\",\n";
										jsonStr += "\"RE_CTY_RT\": \"" + layerFeature.RE_CTY_RT + "\",\n";
										jsonStr += "\"RE_FRT_RT\": \"" + layerFeature.RE_FRT_RT + "\",\n";
										jsonStr += "\"FRLND\": \"" + layerFeature.FRLND + "\",\n";
										jsonStr += "\"RE_ISRLPX_RT\": \"" + layerFeature.RE_ISRLPX_RT + "\",\n";
										jsonStr += "\"RE_DRDG_RT\": \"" + layerFeature.RE_DRDG_RT + "\",\n";
										jsonStr += "\"RE_STALL_RT\": \"" + layerFeature.RE_STALL_RT + "\",\n";
										jsonStr += "\"RE_WASH_SE\": \"" + layerFeature.RE_WASH_SE + "\",\n";
										jsonStr += "\"BRRER_LC_SE\": \"" + layerFeature.BRRER_LC_SE + "\",\n";
										jsonStr += "\"BRRER_GAP_DSTNC\": \"" + layerFeature.BRRER_GAP_DSTNC + "\",\n";
										jsonStr += "\"BRRER_AFWQ_SE\": \"" + layerFeature.BRRER_AFWQ_SE + "\",\n";
										jsonStr += "\"BTRV\": \"" + layerFeature.BTRV + "\",\n";
										jsonStr += "\"TUR\": \"" + layerFeature.TUR + "\",\n";
										jsonStr += "\"CLIMP_PARTCLR_MATTER\": \"" + layerFeature.CLIMP_PARTCLR_MATTER + "\",\n";
										jsonStr += "\"CLIMP_DETAIL_CN\": \"" + layerFeature.CLIMP_DETAIL_CN + "\",\n";
										jsonStr += "\"CLPSS_PARTCLR_MATTER\": \"" + layerFeature.CLPSS_PARTCLR_MATTER + "\",\n";
										jsonStr += "\"CHLA_QY\": \"" + layerFeature.CHLA_QY + "\",\n";
										jsonStr += "\"AFDM_QY\": \"" + layerFeature.AFDM_QY + "\",\n";
										jsonStr += "\"SPCS_CO\": \"" + layerFeature.SPCS_CO + "\",\n";
										jsonStr += "\"INDVD_CO\": \"" + layerFeature.INDVD_CO + "\",\n";
										jsonStr += "\"RIC_IDEX\": \"" + layerFeature.RIC_IDEX + "\",\n";
										jsonStr += "\"LPRSP_CN\": \"" + layerFeature.LPRSP_CN + "\",\n";
										jsonStr += "\"EXO_CN\": \"" + layerFeature.EXO_CN + "\",\n";
										jsonStr += "\"TDI\": \"" + layerFeature.TDI + "\",\n";
										jsonStr += "\"TMPRT\": \"" + layerFeature.TMPRT + "\",\n";
										jsonStr += "\"SBN30_EXAMIN_CO\": \"" + layerFeature.SBN30_EXAMIN_CO + "\",\n";
										jsonStr += "\"SBN50_EXAMIN_CO\": \"" + layerFeature.SBN50_EXAMIN_CO + "\",\n";
										jsonStr += "\"DR_EXAMIN_CO\": \"" + layerFeature.DR_EXAMIN_CO + "\",\n";
										jsonStr += "\"EK_EXAMIN_CO\": \"" + layerFeature.EK_EXAMIN_CO + "\",\n";
										jsonStr += "\"DRGUSE_MTST_AT\": \"" + layerFeature.DRGUSE_MTST_AT + "\",\n";
										jsonStr += "\"DRGUSE_FORAGE_AT\": \"" + layerFeature.DRGUSE_FORAGE_AT + "\",\n";
										jsonStr += "\"DRGUSE_VILAGE_AT\": \"" + layerFeature.DRGUSE_VILAGE_AT + "\",\n";
										jsonStr += "\"DRGUSE_SOPSRT_AT\": \"" + layerFeature.DRGUSE_SOPSRT_AT + "\",\n";
										jsonStr += "\"DRGUSE_FCTRY_AT\": \"" + layerFeature.DRGUSE_FCTRY_AT + "\",\n";
										jsonStr += "\"DRGUSE_RESIDE_AT\": \"" + layerFeature.DRGUSE_RESIDE_AT + "\",\n";
										jsonStr += "\"DRGUSE_ETC_AT\": \"" + layerFeature.DRGUSE_ETC_AT + "\",\n";
										jsonStr += "\"DRGUSE_ETC_CN\": \"" + layerFeature.DRGUSE_ETC_CN + "\",\n";
										jsonStr += "\"POLTNSRC_LVSEWG_AT\": \"" + layerFeature.POLTNSRC_LVSEWG_AT + "\",\n";
										jsonStr += "\"POLTNSRC_LSKR_AT\": \"" + layerFeature.POLTNSRC_LSKR_AT + "\",\n";
										jsonStr += "\"POLTNSRC_WSTR_AT\": \"" + layerFeature.POLTNSRC_WSTR_AT + "\",\n";
										jsonStr += "\"RE_VTN_TREE_RT\": \"" + layerFeature.RE_VTN_TREE_RT + "\",\n";
										jsonStr += "\"RE_FLD_USE_SE\": \"" + layerFeature.RE_FLD_USE_SE + "\",\n";
										jsonStr += "\"RE_LFTBNK_NATURE_AT\": \"" + layerFeature.RE_LFTBNK_NATURE_AT + "\",\n";
										jsonStr += "\"RE_LFTBNK_STON_AT\": \"" + layerFeature.RE_LFTBNK_STON_AT + "\",\n";
										jsonStr += "\"RE_LFTBNK_GABN_AT\": \"" + layerFeature.RE_LFTBNK_GABN_AT + "\",\n";
										jsonStr += "\"RE_LFTBNK_CNCRT_AT\": \"" + layerFeature.RE_LFTBNK_CNCRT_AT + "\",\n";
										jsonStr += "\"RE_LFTBNK_VERTCL_AT\": \"" + layerFeature.RE_LFTBNK_VERTCL_AT + "\",\n";
										jsonStr += "\"RE_RHTBNK_NATURE_AT\": \"" + layerFeature.RE_RHTBNK_NATURE_AT + "\",\n";
										jsonStr += "\"RE_RHTBNK_STON_AT\": \"" + layerFeature.RE_RHTBNK_STON_AT + "\",\n";
										jsonStr += "\"RE_RHTBNK_GABN_AT\": \"" + layerFeature.RE_RHTBNK_GABN_AT + "\",\n";
										jsonStr += "\"RE_RHTBNK_CNCRT_AT\": \"" + layerFeature.RE_RHTBNK_CNCRT_AT + "\",\n";
										jsonStr += "\"RE_RHTBNK_VERTCL_AT\": \"" + layerFeature.RE_RHTBNK_VERTCL_AT + "\",\n";
										jsonStr += "\"STR_MD_RT\": \"" + layerFeature.STR_MD_RT + "\",\n";
										jsonStr += "\"STR_SAND_RT\": \"" + layerFeature.STR_SAND_RT + "\",\n";
										jsonStr += "\"STR_SBAL_RT\": \"" + layerFeature.STR_SBAL_RT + "\",\n";
										jsonStr += "\"STR_PEBB_RT\": \"" + layerFeature.STR_PEBB_RT + "\",\n";
										jsonStr += "\"STR_SS_RT\": \"" + layerFeature.STR_SS_RT + "\",\n";
										jsonStr += "\"STR_LS_RT\": \"" + layerFeature.STR_LS_RT + "\",\n";
										jsonStr += "\"RIVER_TY\": \"" + layerFeature.RIVER_TY + "\",\n";
										jsonStr += "\"WTRBT_SCOPE\": \"" + layerFeature.WTRBT_SCOPE + "\",\n";
										jsonStr += "\"AVRG_SPFLD_SCOPE\": \"" + layerFeature.AVRG_SPFLD_SCOPE + "\",\n";
										jsonStr += "\"DKPAR_SCNCENM\": \"" + layerFeature.DKPAR_SCNCENM + "\",\n";
										jsonStr += "\"DKPAR_POSSESN_RT\": \"" + layerFeature.DKPAR_POSSESN_RT + "\",\n";
										jsonStr += "\"DKPAR_INDVD_CO\": \"" + layerFeature.DKPAR_INDVD_CO + "\",\n";
										jsonStr += "\"DIV_IDEX\": \"" + layerFeature.DIV_IDEX + "\",\n";
										jsonStr += "\"EVN_IDEX\": \"" + layerFeature.EVN_IDEX + "\",\n";
										jsonStr += "\"TSP_CO\": \"" + layerFeature.TSP_CO + "\",\n";
										jsonStr += "\"EPT_INDVD_CO\": \"" + layerFeature.EPT_INDVD_CO + "\",\n";
										jsonStr += "\"EPT_INDVD_RT\": \"" + layerFeature.EPT_INDVD_RT + "\",\n";
										jsonStr += "\"BMI\": \"" + layerFeature.BMI + "\",\n";
										jsonStr += "\"RIVER_ODR\": \"" + layerFeature.RIVER_ODR + "\",\n";
										jsonStr += "\"COLCT_REQRE_TIME\": \"" + layerFeature.COLCT_REQRE_TIME + "\",\n";
										jsonStr += "\"FLOW_STTUS_SE\": \"" + layerFeature.FLOW_STTUS_SE + "\",\n";
										jsonStr += "\"STR_ROCK_RT\": \"" + layerFeature.STR_ROCK_RT + "\",\n";
										jsonStr += "\"STR_CNCRT_RT\": \"" + layerFeature.STR_CNCRT_RT + "\",\n";
										jsonStr += "\"RIVER_STLE_SE\": \"" + layerFeature.RIVER_STLE_SE + "\",\n";
										jsonStr += "\"FLOW_VE_SE\": \"" + layerFeature.FLOW_VE_SE + "\",\n";
										jsonStr += "\"ABNRM_INDVD_CO\": \"" + layerFeature.ABNRM_INDVD_CO + "\",\n";
										jsonStr += "\"ABNRM_INDVD_RT\": \"" + layerFeature.ABNRM_INDVD_RT + "\",\n";
										jsonStr += "\"UNEVL_M1_PT\": \"" + layerFeature.UNEVL_M1_PT + "\",\n";
										jsonStr += "\"UNEVL_M2_PT\": \"" + layerFeature.UNEVL_M2_PT + "\",\n";
										jsonStr += "\"UNEVL_M3_PT\": \"" + layerFeature.UNEVL_M3_PT + "\",\n";
										jsonStr += "\"UNEVL_M4_PT\": \"" + layerFeature.UNEVL_M4_PT + "\",\n";
										jsonStr += "\"UNEVL_M5_PT\": \"" + layerFeature.UNEVL_M5_PT + "\",\n";
										jsonStr += "\"UNEVL_M6_PT\": \"" + layerFeature.UNEVL_M6_PT + "\",\n";
										jsonStr += "\"UNEVL_M7_PT\": \"" + layerFeature.UNEVL_M7_PT + "\",\n";
										jsonStr += "\"UNEVL_M8_PT\": \"" + layerFeature.UNEVL_M8_PT + "\",\n";
										jsonStr += "\"FAI\": \"" + layerFeature.FAI + "\",\n";
										jsonStr += "\"TSP_RT\": \"" + layerFeature.TSP_RT + "\",\n";
										jsonStr += "\"TSP_INDVD_CO\": \"" + layerFeature.TSP_INDVD_CO + "\",\n";
										jsonStr += "\"TSP_INDVD_RT\": \"" + layerFeature.TSP_INDVD_RT + "\",\n";
										jsonStr += "\"DSP_INDVD_RT\": \"" + layerFeature.DSP_INDVD_RT + "\",\n";
										jsonStr += "\"RSP_INDVD_RT\": \"" + layerFeature.RSP_INDVD_RT + "\",\n";
										jsonStr += "\"PSP_INDVD_RT\": \"" + layerFeature.PSP_INDVD_RT + "\",\n";
										jsonStr += "\"ASP_INDVD_RT\": \"" + layerFeature.ASP_INDVD_RT + "\",\n";
										jsonStr += "\"RIVER_GRAD\": \"" + layerFeature.RIVER_GRAD + "\",\n";
										jsonStr += "\"ELEVTN\": \"" + layerFeature.ELEVTN + "\",\n";
										jsonStr += "\"RRSMLD_SE\": \"" + layerFeature.RRSMLD_SE + "\",\n";
										jsonStr += "\"LBSB_CO_EVL\": \"" + layerFeature.LBSB_CO_EVL + "\",\n";
										jsonStr += "\"NTRLTY_PRECSN_EVL\": \"" + layerFeature.NTRLTY_PRECSN_EVL + "\",\n";
										jsonStr += "\"SPFLD_DVRSTY_EVL\": \"" + layerFeature.SPFLD_DVRSTY_EVL + "\",\n";
										jsonStr += "\"RVS_BT_EVL\": \"" + layerFeature.RVS_BT_EVL + "\",\n";
										jsonStr += "\"RSV_ARV_EVL\": \"" + layerFeature.RSV_ARV_EVL + "\",\n";
										jsonStr += "\"ARV_MATRL_EVL\": \"" + layerFeature.ARV_MATRL_EVL + "\",\n";
										jsonStr += "\"SEDM_STTUS_EVL\": \"" + layerFeature.SEDM_STTUS_EVL + "\",\n";
										jsonStr += "\"WDSTRCTU_DSTRBNC_EVL\": \"" + layerFeature.WDSTRCTU_DSTRBNC_EVL + "\",\n";
										jsonStr += "\"FRCE_LANDUSE_EVL\": \"" + layerFeature.FRCE_LANDUSE_EVL + "\",\n";
										jsonStr += "\"PRLL_LANDUSE_EVL\": \"" + layerFeature.PRLL_LANDUSE_EVL + "\",\n";
										jsonStr += "\"HRI\": \"" + layerFeature.HRI + "\",\n";
										jsonStr += "\"WTCORS_AR\": \"" + layerFeature.WTCORS_AR + "\",\n";
										jsonStr += "\"BRGRD_AR\": \"" + layerFeature.BRGRD_AR + "\",\n";
										jsonStr += "\"ARSTRU_AR\": \"" + layerFeature.ARSTRU_AR + "\",\n";
										jsonStr += "\"MTST_AR\": \"" + layerFeature.MTST_AR + "\",\n";
										jsonStr += "\"RESIDE_AR\": \"" + layerFeature.RESIDE_AR + "\",\n";
										jsonStr += "\"CLVT_AR\": \"" + layerFeature.CLVT_AR + "\",\n";
										jsonStr += "\"DOMPT_SALX_RT\": \"" + layerFeature.DOMPT_SALX_RT + "\",\n";
										jsonStr += "\"DOMPT_GRMN_RT\": \"" + layerFeature.DOMPT_GRMN_RT + "\",\n";
										jsonStr += "\"DOMPT_CPRC_RT\": \"" + layerFeature.DOMPT_CPRC_RT + "\",\n";
										jsonStr += "\"DOMPT_OBL_RT\": \"" + layerFeature.DOMPT_OBL_RT + "\",\n";
										jsonStr += "\"DOMPT_FACW_RT\": \"" + layerFeature.DOMPT_FACW_RT + "\",\n";
										jsonStr += "\"DOMPT_OBLFACW_RT\": \"" + layerFeature.DOMPT_OBLFACW_RT + "\",\n";
										jsonStr += "\"DOMPT_TREE_RT\": \"" + layerFeature.DOMPT_TREE_RT + "\",\n";
										jsonStr += "\"DOMPT_NATSPCS_RT\": \"" + layerFeature.DOMPT_NATSPCS_RT + "\",\n";
										jsonStr += "\"DOMPT_DISP_RT\": \"" + layerFeature.DOMPT_DISP_RT + "\",\n";
										jsonStr += "\"DOMPT_APGEN_RT\": \"" + layerFeature.DOMPT_APGEN_RT + "\",\n";
										jsonStr += "\"DOMAR_SALX_RT\": \"" + layerFeature.DOMAR_SALX_RT + "\",\n";
										jsonStr += "\"DOMAR_GRMN_RT\": \"" + layerFeature.DOMAR_GRMN_RT + "\",\n";
										jsonStr += "\"DOMAR_CPRC_RT\": \"" + layerFeature.DOMAR_CPRC_RT + "\",\n";
										jsonStr += "\"DOMAR_OBL_RT\": \"" + layerFeature.DOMAR_OBL_RT + "\",\n";
										jsonStr += "\"DOMAR_FACW_RT\": \"" + layerFeature.DOMAR_FACW_RT + "\",\n";
										jsonStr += "\"DOMAR_OBLFACW_RT\": \"" + layerFeature.DOMAR_OBLFACW_RT + "\",\n";
										jsonStr += "\"DOMAR_TREE_RT\": \"" + layerFeature.DOMAR_TREE_RT + "\",\n";
										jsonStr += "\"DOMAR_NATSPCS_RT\": \"" + layerFeature.DOMAR_NATSPCS_RT + "\",\n";
										jsonStr += "\"DOMAR_DISP_RT\": \"" + layerFeature.DOMAR_DISP_RT + "\",\n";
										jsonStr += "\"DOMAR_APGEN_RT\": \"" + layerFeature.DOMAR_APGEN_RT + "\",\n";
										jsonStr += "\"EVL_HAA_RT\": \"" + layerFeature.EVL_HAA_RT + "\",\n";
										jsonStr += "\"EVL_EA_RT\": \"" + layerFeature.EVL_EA_RT + "\",\n";
										jsonStr += "\"EVL_WTD_RT\": \"" + layerFeature.EVL_WTD_RT + "\",\n";
										jsonStr += "\"EVL_SALFRAA_RT\": \"" + layerFeature.EVL_SALFRAA_RT + "\",\n";
										jsonStr += "\"EVL_TOSC_RT\": \"" + layerFeature.EVL_TOSC_RT + "\",\n";
										jsonStr += "\"EVL_BTI_RT\": \"" + layerFeature.EVL_BTI_RT + "\",\n";
										jsonStr += "\"EVL_HAA_SCORE\": \"" + layerFeature.EVL_HAA_SCORE + "\",\n";
										jsonStr += "\"EVL_EA_SCORE\": \"" + layerFeature.EVL_EA_SCORE + "\",\n";
										jsonStr += "\"EVL_WTD_SCORE\": \"" + layerFeature.EVL_WTD_SCORE + "\",\n";
										jsonStr += "\"EVL_SALFRAA_SCORE\": \"" + layerFeature.EVL_SALFRAA_SCORE + "\",\n";
										jsonStr += "\"EVL_TOSC_SCORE\": \"" + layerFeature.EVL_TOSC_SCORE + "\",\n";
										jsonStr += "\"EVL_BTI_SCORE\": \"" + layerFeature.EVL_BTI_SCORE + "\",\n";
										jsonStr += "\"TOT_COMM_CO\": \"" + layerFeature.TOT_COMM_CO + "\",\n";
										jsonStr += "\"TOT_AR\": \"" + layerFeature.TOT_AR + "\",\n";
										jsonStr += "\"RVI\": \"" + layerFeature.RVI + "\",\n";
										jsonStr += "\"RM\": \"" + layerFeature.RM + "\",\n";
										jsonStr += "\"DETAIL_MATTER\": \"" + layerFeature.DETAIL_MATTER + "\",\n";
										jsonStr += "\"IEM_1058\": \"" + layerFeature.IEM_1058 + "\",\n";
										jsonStr += "\"RAINFL\": \"" + layerFeature.RAINFL + "\",\n";
										jsonStr += "\"WD\": \"" + layerFeature.WD + "\",\n";
										jsonStr += "\"WS\": \"" + layerFeature.WS + "\",\n";
										jsonStr += "\"HD\": \"" + layerFeature.HD + "\",\n";
										jsonStr += "\"ACPLC_ARCSR\": \"" + layerFeature.ACPLC_ARCSR + "\",\n";
										jsonStr += "\"SLVL_ARCSR\": \"" + layerFeature.SLVL_ARCSR + "\",\n";
										jsonStr += "\"PRCPT_PRCP\": \"" + layerFeature.PRCPT_PRCP + "\",\n";
										jsonStr += "\"ACCMLT_RAINFL\": \"" + layerFeature.ACCMLT_RAINFL + "\",\n";
										jsonStr += "\"INFLOW_QY\": \"" + layerFeature.INFLOW_QY + "\",\n";
										jsonStr += "\"ERBSQ_NM\": \"" + layerFeature.ERBSQ_NM + "\",\n";
										jsonStr += "\"DCWTRH_NO\": \"" + layerFeature.DCWTRH_NO + "\",\n";
										jsonStr += "\"PHYSIC_DWEQTY\": \"" + layerFeature.PHYSIC_DWEQTY + "\",\n";
										jsonStr += "\"BIO_DWEQTY\": \"" + layerFeature.BIO_DWEQTY + "\",\n";
										jsonStr += "\"DWEQTY_ELEVTN\": \"" + layerFeature.DWEQTY_ELEVTN + "\",\n";
										jsonStr += "\"TOT_FCLTY_CPCTY\": \"" + layerFeature.TOT_FCLTY_CPCTY + "\",\n";

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

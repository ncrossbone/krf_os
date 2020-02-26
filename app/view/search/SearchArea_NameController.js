Ext.define('krf_new.view.search.SearchArea_NameController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_NameController',

	control: {
		'#btnSearchText': {
			click: 'onTextSearch'
		},
		'#textSearchText': {
			specialkey: function (f, e) {
				if (e.getKey() == e.ENTER) {
					this.onTextSearch();
				}
			}
		}
	},

	writeList: function (result) {
		var layerCodeObj = {};
		var feature = result.features;

		for (var i = 0; i < feature.length; i++) {
			if (!layerCodeObj[feature[i].attributes.GROUP_CODE]) {
				layerCodeObj[feature[i].attributes.GROUP_CODE] = { title: feature[i].attributes.GROUP_NM, child: [] };
			}



			// 비점오염원 중복지점 처리
			if (feature[i].attributes.GROUP_CODE == 'M') {
				var cloneAttr = $KRF_APP.global.CommFn.cloneObj(feature[i].attributes);

				feature[i].attributes.JIJUM_CODE = 'M001_' + feature[i].attributes.JIJUM_CODE;
				feature[i].attributes.LAYER_NM = '비점오염원측정망 - 자동';
				layerCodeObj[feature[i].attributes.GROUP_CODE].child.push(feature[i].attributes);

				cloneAttr.LAYER_NM = '비점오염원측정망 - 수동';
				cloneAttr.LAYER_CODE = 'M002';
				cloneAttr.JIJUM_CODE = 'M002_' + cloneAttr.JIJUM_CODE;
				layerCodeObj[feature[i].attributes.GROUP_CODE].child.push(cloneAttr);
			} else {
				layerCodeObj[feature[i].attributes.GROUP_CODE].child.push(feature[i].attributes);
			}
		}

		var html = '';
		var resultHtml = '';

		for (key in layerCodeObj) {
			resultHtml = '';
			resultHtml += '<table class="totalSearchTable">';
			resultHtml += '<colgroup>';
			resultHtml += '	<col style="width:5%"/>';
			resultHtml += '	<col style=""/>';
			resultHtml += '	<col style="width:5%"/>';
			resultHtml += '	<col style="width:5%"/>';
			resultHtml += '	<col style="width:5%"/>';
			resultHtml += '</colgroup>';
			resultHtml += '<thead>';
			resultHtml += '		<tr>';
			resultHtml += '			<td colspan="5">' + layerCodeObj[key].title + '(' + layerCodeObj[key].child.length + '건)</td>';
			resultHtml += '		</tr>';
			resultHtml += '</thead>';

			resultHtml += '<tbody>';
			for (var i = 0; i < layerCodeObj[key].child.length; i++) {
				resultHtml += '<tr>';
				resultHtml += '	<td><img src="./resources/images/totalSearch/point.png" alt="a"/></td>';
				resultHtml += ' <td>';
				resultHtml += ' 	<span>' + layerCodeObj[key].child[i].JIJUM_NM + '</span>';
				resultHtml += ' 	<span class="n2">[' + layerCodeObj[key].child[i].LAYER_NM + ']</span>';
				resultHtml += ' 	<p>' + layerCodeObj[key].child[i].ADDR + '</p>';
				resultHtml += '	</td>';
				resultHtml += '	<td><a href="javascript:void(0);" onClick="siteMovePoint(\'' + layerCodeObj[key].child[i].LAYER_CODE + '\',\'' + layerCodeObj[key].child[i].JIJUM_CODE + '\',\'start\');" ><img src="./resources/images/totalSearch/Btn_S.png" alt="시작점"/></a></td>';
				resultHtml += '	<td><a href="javascript:void(0);" onClick="siteMovePoint(\'' + layerCodeObj[key].child[i].LAYER_CODE + '\',\'' + layerCodeObj[key].child[i].JIJUM_CODE + '\',\'end\');" ><img src="./resources/images/totalSearch/Btn_E.png" alt="끝점"/></a></td>';
				resultHtml += '	<td><a href="javascript:void(0);" onClick="siteMovePoint(\'' + layerCodeObj[key].child[i].LAYER_CODE + '\',\'' + layerCodeObj[key].child[i].JIJUM_CODE + '\',\'addrLink\');" > <img src="./resources/images/totalSearch/Btn_Search.png" alt="자세히" /></a ></td > ';
				resultHtml += '</tr>';
			}
			resultHtml += '</tbody>';
			resultHtml += '</table>';

			html += resultHtml;
		}

		var listCtl = Ext.getCmp('searchAreaList_Integrated');
		listCtl.setHtml(html);
	},
	onTextSearch: function (button, eOpts, bookmark) {

		//통합검색시 reset 20190523
		//ResetButtonClick();
		var me = this;

		var btnCtl = null;
		var btn = Ext.getCmp("btnSearchText");

		var searchText = Ext.getCmp("textSearchText");

		var treeResach = Ext.getCmp("siteListTree");

		if (treeResach != undefined) {
			var store = treeResach.getStore();
			store.nameInfo = btn.rawValue;
			store.load();
			treeResach.getView().refresh();
			//return;
		} else {

			if (btn.disable == false) {
				btnCtl = btn;
			}
			var currCtl = Ext.getCmp("btnSiteListWindow");
			if (currCtl.btnOnOff == "off") {
				SetBtnOnOff("btnSiteListWindow");
			}
		}

		$KRF_APP.global.CommFn.setBookmarkInfo('spotList', {
			searchText: 'nameSearch',
			value1: btn.rawValue
		});

		$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, {
			searchText: 'nameSearch',
			isBookmark: false
		});
		// Ext.ShowSiteListWindow("nameSearch"); // 지점목록 창 띄우기

		// 리치모드 ON
		$KRF_APP.fireEvent($KRF_EVENT.REACH_MODE_ON, undefined, {
			id: 'btnModeReach'
		});


		// 통합검색 로직 2019-04-03 pdj 리치모드 명칭검색 참조
		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.catSearchUrl); // 레이어 URL
		var query = new esri.tasks.Query();
		query.returnGeometry = false;

		var where = "JIJUM_NM like '%" + searchText.getValue() + "%' ";

		if ($KRF_APP.LAYER_SETTING.length > 0) {
			$KRF_APP.LAYER_SETTING.map(function (obj) {
				if (obj.LYR_USE_AT != "Y") {
					where += "AND LAYER_CODE <> '" + obj.LYR_CODE + "'";
				}
			})
		}



		query.where = where;
		query.orderByFields = ["GROUP_CODE ASC"];
		query.outFields = ["*"];
		//외부망 where 조건
		//query.where += "	AND  GROUP_CODE <> 'B' AND GROUP_CODE <> 'G' AND LAYER_CODE <> 'D002' AND LAYER_CODE <> 'D005' AND LAYER_CODE <> 'D006' AND LAYER_CODE <> 'D007'	";
		queryTask.execute(query, function (result) {
			me.writeList(result);

			return;
			Ext.Ajax.request({
				url: _API.sstgText,
				params: { textField: searchText.getValue() },
				async: false, // 비동기 = async: true, 동기 = async: false
				success: function (response, opts) {
					var jsonData = Ext.util.JSON.decode(response.responseText);

					console.info(jsonData);

					var ssgtObj = {
						"hc": {
							"ATAL_SE": []
							, "BEMA_SE": []
							, "FISH_SE": []
							, "INHA_SE": []
							, "QLTWTR_SE": []
							, "VTN_SE": []
						}

						, "hg": {
							"ATAL_SE": []
							, "BEMA_SE": []
							, "FISH_SE": []
							, "VTN_SE": []
						}
					};


					for (var k = 0; k < jsonData.data.length; k++) {

						if (jsonData.data[k].SE == "하구") {
							if (jsonData.data[k].ATAL_SE == "1") {
								ssgtObj.hg.ATAL_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

							if (jsonData.data[k].BEMA_SE == "1") {
								ssgtObj.hg.BEMA_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

							if (jsonData.data[k].FISH_SE == "1") {
								ssgtObj.hg.FISH_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

							if (jsonData.data[k].VTN_SE == "1") {
								ssgtObj.hg.VTN_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

						} else if (jsonData.data[k].SE == "하천") {
							if (jsonData.data[k].ATAL_SE == "1") {
								ssgtObj.hc.ATAL_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

							if (jsonData.data[k].BEMA_SE == "1") {
								ssgtObj.hc.BEMA_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

							if (jsonData.data[k].FISH_SE == "1") {
								ssgtObj.hc.FISH_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

							if (jsonData.data[k].VTN_SE == "1") {
								ssgtObj.hc.VTN_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

							if (jsonData.data[k].QLTWTR_SE == "1") {
								ssgtObj.hc.QLTWTR_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}

							if (jsonData.data[k].INHA_SE == "1") {
								ssgtObj.hc.INHA_SE.push({ "id": jsonData.data[k].SPOT_CODE, "name": jsonData.data[k].SPOT_NM });
							}
						}
					}

					console.info(ssgtObj);





				},
				failure: function (form, action) {
					alert("오류가 발생하였습니다.");
				}
			})







			return;
			Ext.each(result, function (objLayer, idx, objLayers) {

				var guBunNm = "";

				var listCtl = Ext.getCmp("searchAreaList_Integrated");
				listCtl.removeAll();
				//listCtl.doLayout();

				var layerCnt = 0;

				var saveCnt = [];

				var listCtl_Total = Ext.getCmp("searchAreaList_Integrated_Total");
				//listCtl_Total.doLayout();
				listCtl_Total.removeAll();

				var html = ' <span>"' + searchText.getValue() + '</span>" 검색결과   <span>' + result.features.length + '건</span>'

				listCtl_Total.add({
					xtype: 'label',
					cls: 'dj_reach_list_title',
					html: html
				});


				for (i = 0; i < result.features.length; i++) {


					if (result.features[i].attributes.LAYER_NM != guBunNm) {

						var layerCode = result.features[i].attributes.LAYER_CODE;

						/* 레이어 정보 가져오기 */
						var layer01Info = getLayer01Info("layerCode", layerCode, null, null);
						var iconCls = "";
						if (layer01Info.length > 0) {
							iconCls = layer01Info[0].iconCls;
						}
						else {
							console.info(layerCode + "에 해당하는 iconCls가 없습니다. Layer01Data.json 확인 요함.")
						}

						//listCtl.addCls('dj_accordion');
						listCtl.add({
							xtype: 'panel',
							//autoScroll: true,
							layout: {
								type: 'vbox'
							},
							cls: 'dj_layer_nm',
							title: '&nbsp;' + result.features[i].attributes.LAYER_NM + '&nbsp; (Count)',
							layerCd: layerCode,
							iconCls: iconCls
						});

						saveCnt += "_" + layerCnt;
						guBunNm = result.features[i].attributes.LAYER_NM;
						layerCnt = 0;


					} else if (i == result.features.length - 1) {//마지막 카운트 구하기
						saveCnt += "_" + (layerCnt + 1);
					}

					////console.info(listCtl.);
					var lstLength = listCtl.items.items.length;

					for (j = 0; j < lstLength; j++) {
						if (listCtl.items.items[j].layerCd == layerCode) {
							listCtl.items.items[j].add({
								xtype: 'label',
								cls: 'dj_result_info',
								style: 'left: 13px !important;',
								html:
									"	<table>	" +
									//"        <caption>통합검색</caption> "+
									"        <tbody> " +
									"            <tr> " +
									//"                <td><img src=\"img/table/A.png\" alt=\"a\"/></td> "+
									"                <td class=\"mgl10\"> " +
									"                	<span class=\"n1\"><a href=\"#\" onClick=\"siteMovePoint('" + result.features[i].attributes.LAYER_CODE + "','" + result.features[i].attributes.JIJUM_CODE + "' , 'addrLink');\" ><span>" + result.features[i].attributes.JIJUM_NM + "</span></a></span> " +
									"                    <span class=\"n2\">[" + result.features[i].attributes.GROUP_NM + "]</span> " +
									"                    <p><a href=\"#\" onClick=\"siteMovePoint('" + result.features[i].attributes.LAYER_CODE + "','" + result.features[i].attributes.JIJUM_CODE + "' , 'addrLink');\" ><span>" + result.features[i].attributes.ADDR + "</span></a></p> " +
									"                </td> " +
									"                <td><a href=\"#none\"><img src=\"./resources/images/symbol/spot01.png\" onClick=\"siteMovePoint('" + layerCode + "','" + result.features[i].attributes.JIJUM_CODE + "' , 'start' );\" alt=\"시작점\"/></a></td> " +
									"                <td><a href=\"#none\"><img src=\"./resources/images/symbol/spot03.png\" onClick=\"siteMovePoint('" + layerCode + "','" + result.features[i].attributes.JIJUM_CODE + "' , 'end' );\" alt=\"끝점\"/></a></td> " +
									"                <td><a href=\"#none\"><img src=\"img/table/Btn_Search.png\" alt=\"자세히\"/></a></td> " +
									"            </tr> " +
									"        </tbody> " +
									"    </table> "

								// html: 		/*"<input type=\"hidden\" value=\"\">&nbsp;&nbsp; <a href=\"#\" onClick=\"alert('dd')\">지점명 :"+result.features[i].attributes.JIJUM_NM+"</a> " +*/
								// 	"<table class=\"dj_result\" border=\"0\" >										" +
								// 	"<tr>                                 " +
								// 	" <th rowspan=\"2\"><img style=\"cursor:pointer;\" src=\"./resources/images/symbol/spot01.png\" alt=\"시작위치\" height =\"41\" width = \"21\"  onClick=\"siteMovePoint('" + layerCode + "','" + result.features[i].attributes.JIJUM_CODE + "' , 'start' );\"/></th> " +
								// 	" <th rowspan=\"2\"><img style=\"cursor:pointer;\" src=\"./resources/images/symbol/spot03.png\" alt=\"끝위치\" height =\"41\" width = \"21\" onClick=\"siteMovePoint('" + layerCode + "','" + result.features[i].attributes.JIJUM_CODE + "' , 'end');\" /></th> " +
								// 	" <td><a href=\"#\" onClick=\"siteMovePoint('" + result.features[i].attributes.LAYER_CODE + "','" + result.features[i].attributes.JIJUM_CODE + "' , 'addrLink');\" ><span>" + result.features[i].attributes.JIJUM_NM + "</span></a></td>                     " +
								// 	"</tr>                                " +
								// 	"<tr>                                 " +
								// 	" <td> <a href=\"#\" onClick=\"siteMovePoint('" + result.features[i].attributes.LAYER_CODE + "','" + result.features[i].attributes.JIJUM_CODE + "', 'addrLink');\" >" + result.features[i].attributes.ADDR + "</a></td> " +
								// 	"</tr>                                " +
								// 	"</table>                             "

							});

							layerCnt++;
						}
					}
				}

				//listCtl.doLayout();
				//listCtl_Total.doLayout();

				var layerCount = [];
				layerCount = saveCnt.split("_");

				for (Cnt = 0; Cnt < listCtl.items.items.length; Cnt++) {

					listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("Count", layerCount[Cnt + 2]));
					if (Cnt + 1 == listCtl.items.items.length) {
						listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("undefined", "1"));
					}

					if (Cnt + 1 == listCtl.items.items.length) {
						listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("undefined", "1"));
					}
				}

				//검색후 가장 처음값으로 이동
				//siteMovePoint(result.features[0].attributes.LAYER_CODE, result.features[0].attributes.JIJUM_CODE, 'addrLink');

			});

			// 좌측 패널 스크롤 생성
			//setWestBodyScroll();
		});


	}
});

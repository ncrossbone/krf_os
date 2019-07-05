Ext.define('krf_new.store.east.SiteChartPanel', {
	extend: 'Ext.data.Store',
	fields: [
		'PT_NO',
		'PT_NM',// xtype: 'datecolumn',   format:'Y-m-d'
		'WMCYMD',
		// { name: 'PREDICT_DT', xtype: 'datecolumn',   format:'Y-m-d' },
		'ITEM_NAME',
		{ name: 'ITEM_VALUE', type: 'float' },
		'ITEM_VALUE_1' //정량한계 미만처리를 위한 copy 컬럼
	],
	remoteSort: true,
	arrMax: [],
	parentId: '',
	siteCD: '',
	yFieldName: '',

	listeners: {
		load: function (store) {

			var cfgBtn = $('#btnShowSearchWindow');
			var saveBtn = $('#btnImageDown');
			var dateWin = Ext.getCmp('datePanel1');

			cfgBtn.hide();
			saveBtn.hide();

			if (dateWin) {
				dateWin.hide();
			}

			var defaultChart = $KRF_APP.chartFlag;

			var f_Chart = Ext.getCmp("f_Chart");
			var d_Chart = $KRF_APP.chartFlag_D;
			if (d_Chart != undefined) {
				var org_D_firstID = d_Chart.substring(0, 1);
			}

			var f_parentId = "";

			if (store.parentId == "F") {
				if (f_Chart == undefined || f_Chart.lastValue == "방류유량") {
					f_parentId = "F_1";
				} else if (f_Chart.lastValue == "1") {
					f_parentId = "F_1";
				} else if (f_Chart.lastValue == "2") {
					f_parentId = "F_2";
				} else if (f_Chart.lastValue == "3") {
					f_parentId = "F_3";
				} else if (f_Chart.lastValue == "4") {
					f_parentId = "F_4";
				}
			} else if (store.parentId == "D") {
				store.parentId = d_Chart;
			}

			var selectYear = Ext.getCmp("selectYear");
			var selectMonth = Ext.getCmp("selectMonth");
			var selectYear2 = Ext.getCmp("selectYear2");
			var selectMonth2 = Ext.getCmp("selectMonth2");

			var search_F = Ext.getCmp("");

			var selectItem = Ext.getCmp("selectItem");

			var maxDate = "";
			if (defaultChart == "1") {
				selectItem = store.yFieldName;

				selectYear = "";
				selectYear2 = "";
				selectMonth = "";
				selectMonth2 = "";
			} else {
				//퇴적물 분기
				if (store.parentId == "C") {
					var cStartChartYear = Ext.getCmp("cStartChartYear").lastValue;
					var cStartChartYearDetail = Ext.getCmp("cStartChartYearDetail").lastValue;

					var cEndChartYear = Ext.getCmp("cEndChartYear").lastValue;
					var cEndChartYearDetail = Ext.getCmp("cEndChartYearDetail").lastValue;

					selectYear = cStartChartYear;
					selectYear2 = cEndChartYear;

					selectMonth = cStartChartYearDetail;
					selectMonth2 = cEndChartYearDetail;
				} else if (store.parentId == "H" && defaultChart == "0") {
					maxDate = Ext.getCmp("hSelectYear").lastValue + Ext.getCmp("hSelectMonth").lastValue + Ext.getCmp("hSelectDay").lastValue;

					//selectItem.lastValue
					var siteChartCtl = Ext.getCmp("siteCharttest");  //차트 ID
					siteChartCtl.series[1]._yField = selectItem.lastValue + "_1";
					siteChartCtl.series[2]._yField = selectItem.lastValue + "_2";
					siteChartCtl.series[3]._yField = selectItem.lastValue + "_3";
					siteChartCtl.series[4]._yField = selectItem.lastValue + "_4";

				} else if (store.parentId == 'M') {
					var m_SelectYear = Ext.getCmp('m_SelectYear');
					var m_SelectMonth = Ext.getCmp('m_SelectMonth');
					var m_SelectDay = Ext.getCmp('m_SelectDay');

					var m_EndYear = Ext.getCmp("m_EndYear");
					var m_EndMonth = Ext.getCmp("m_EndMonth");
					var m_EndDay = Ext.getCmp("m_EndDay");

					selectYear = m_SelectYear.lastValue;
					selectYear2 = m_EndYear.lastValue;
					selectMonth = m_SelectMonth.lastValue + m_SelectDay.value;
					selectMonth2 = m_EndMonth.lastValue + m_EndDay.lastValue;
				} else if (store.parentId == 'L') {
					var l_SelectYear = Ext.getCmp('l_SelectYear');
					var l_SelectMonth = Ext.getCmp('l_SelectMonth');

					var l_EndYear = Ext.getCmp("l_EndYear");
					var l_EndMonth = Ext.getCmp("l_EndMonth");

					selectYear = l_SelectYear.lastValue;
					selectYear2 = l_EndYear.lastValue;
					selectMonth = l_SelectMonth.lastValue;
					selectMonth2 = l_EndMonth.lastValue;
				} else if (store.parentId == 'Q') {
					var q_SelectYear = Ext.getCmp('q_SelectYear');
					var q_SelectMonth = Ext.getCmp('q_SelectMonth');

					var q_EndYear = Ext.getCmp("q_EndYear");
					var q_EndMonth = Ext.getCmp("q_EndMonth");

					selectYear = q_SelectYear.lastValue;
					selectYear2 = q_EndYear.lastValue;
					selectMonth = q_SelectMonth.lastValue;
					selectMonth2 = q_EndMonth.lastValue;
				} else if (store.parentId == 'Z') {

					var z_SelectYear = Ext.getCmp('z_SelectYear_chart');
					var z_SelectMonth = Ext.getCmp('z_SelectMonth_chart');

					var z_EndYear = Ext.getCmp("z_EndYear_chart");
					var z_EndMonth = Ext.getCmp("z_EndMonth_chart");

					selectYear = z_SelectYear.lastValue;
					selectYear2 = z_EndYear.lastValue;
					selectMonth = z_SelectMonth.lastValue;
					selectMonth2 = z_EndMonth.lastValue;

				} else if (store.parentId == 'K') {
					var k_SelectYear = Ext.getCmp('k_SelectYear_chart');
					var k_SelectMonth = Ext.getCmp('k_SelectMonth_chart');

					var k_EndYear = Ext.getCmp("k_EndYear_chart");
					var k_EndMonth = Ext.getCmp("k_EndMonth_chart");

					selectYear = k_SelectYear.lastValue;
					selectYear2 = k_EndYear.lastValue;
					selectMonth = k_SelectMonth.lastValue;
					selectMonth2 = k_EndMonth.lastValue;
				} else if (store.parentId == 'D007') {

					selectYear = Ext.getCmp("d007_SelectYear").lastValue;
					selectMonth = Ext.getCmp('d007_SelectMonth').lastValue + Ext.getCmp('d007_SelectDay').lastValue;

					selectYear2 = Ext.getCmp('d007_EndYear').lastValue;
					selectMonth2 = Ext.getCmp('d007_EndMonth').lastValue + Ext.getCmp('d007_EndDay').lastValue;
				} else {
					selectYear = selectYear.lastValue;
					selectYear2 = selectYear2.lastValue;
					selectMonth = selectMonth.value;
					selectMonth2 = selectMonth2.value;
				}

				selectItem = selectItem.lastValue;

				if (selectYear > selectYear2) {
					alert("년도선택이 잘못되었습니다");
					return;
				}
				if (selectYear == selectYear2) {
					if (selectMonth > selectMonth2) {
						alert("월선택이 잘못되었습니다.");
						return;
					}
				}
			}

			var recordId = "";
			if (store.siteCD != undefined && store.siteCD != "") {
				recordId = store.siteCD;
			}

			var siteId = "";
			if (store.siteId != undefined && store.siteId != "") {
				siteId = store.siteId;
			}

			if (store.parentId == "A" || store.parentId == "B" || store.parentId == "C" || store.parentId == "I" || store.parentId == "L" || store.parentId == "K") {
				if (store.parentId == "A") {
					requestUrl = _API['GetRWMDT_2018_' + store.parentId];
				} else if (store.parentId == "B") {
					requestUrl = _API['GetRWMDT_2018_' + store.parentId];
				} else if (store.parentId == 'C') {
					requestUrl = _API['GetRWMDT_2018_' + store.parentId];
				} else if (store.parentId == "L") {
					requestUrl = _API['GetRWMDT_2018_' + store.parentId];
				} else if (store.parentId == "K") {
					requestUrl = _API['GetRWMDT_2018_' + store.parentId];
				} else if (store.parentId == 'I') {
					requestUrl = _API['GetRWMDT_2018_' + store.parentId];
				} else {
					requestUrl = _API['GetRWMDT_' + store.parentId]; //"./resources/jsp/GetRWMDT_" + store.parentId + ".jsp";
				}
				//requestUrl = _API['GetRWMDT_' + store.parentId]; //"./resources/jsp/GetRWMDT_" + store.parentId + ".jsp";
			} else if (store.parentId == "F") {

				if (f_parentId == 'F_1' || f_parentId == 'F_3') {
					requestUrl = _API['GetRWMDT_2018_' + f_parentId];
				} else {
					requestUrl = _API['GetRWMDT_' + f_parentId];
				}

			} else if (org_D_firstID == "D") {
				requestUrl = _API['GetRWMDT_2018_' + store.parentId];
			} else if (store.parentId == "H") {
				requestUrl = _API['GetRWMDT_' + store.parentId]; //"./resources/jsp/GetRWMDT_" + store.parentId + ".jsp";
			} else if (store.parentId == 'M') {
				requestUrl = _API['GetRWMDT_' + store.parentId];
			} else if (store.parentId == 'Z') {
				requestUrl = _API['GetRWMDT_' + store.orgParentId.substr(0, 4)];
				recordId = recordId.split('_')[1];
			} else if (store.parentId == 'Q') {
				requestUrl = _API['GetRWMDT_' + store.parentId];
			}

			if (store.parentId == "H" && defaultChart == "1") {

				Ext.Ajax.request({
					url: _API.GetRWMDT_HDate,    // To Which url you wanna POST.
					params: {
						recordId: recordId
					},
					async: false, // 비동기 = async: true, 동기 = async: false
					success: function (response, opts) {
						if ('error' == response.responseText) {
							Ext.Msg.alert("알림", "차트정보 조회중 예외가 발생했습니다.");
							Ext.getCmp("siteCharttest").unmask();
							Ext.getCmp("siteCharttest").mask("차트정보를 조회하지 못했습니다.", "noData");
							return;
						}
						// JSON Object로 변경
						var jsonData = Ext.util.JSON.decode(response.responseText);


						//var afterVal = dateSplit.split(".");
						var Hdate = jsonData.maxdata[0].DE.split("-");
						maxDate = Hdate[0] + Hdate[1] + Hdate[2];

						_chartDateInfo = [];
						_chartDateInfo.push(Hdate);
						if (jsonData.data.length > 0) {
							// 차트 컨트롤에 max 데이터 셋팅
							//SetChartMaxData(store);
							// 로딩바 숨김
							Ext.getCmp("siteCharttest").unmask();

						} else {
							Ext.getCmp("siteCharttest").addCls("dj-mask-noneimg");
							Ext.getCmp("siteCharttest").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						}

						cfgBtn.show();
						saveBtn.show();

					},
					failure: function (form, action) {
						// 로딩바 숨김
						Ext.getCmp("siteCharttest").unmask();
						alert("오류가 발생하였습니다.");
					}
				});

			}
			if (store.parentId == "H") {
				recordId = recordId.replace("Reach", "RCH");
				// 로딩바 표시

				Ext.getCmp("siteCharttest").removeCls("dj-mask-noneimg");
				Ext.getCmp("siteCharttest").addCls("dj-mask-withimg");
				Ext.getCmp("siteCharttest").mask("loading", "loading...");
				Ext.Ajax.request({
					url: requestUrl,    // To Which url you wanna POST.
					params: {
						recordId: recordId
						, defaultChart: defaultChart
						, selectItem: selectItem
						, hMaxDate: maxDate
					},
					async: true, // 비동기 = async: true, 동기 = async: false
					success: function (response, opts) {
						if ('error' == response.responseText) {
							Ext.Msg.alert("알림", "차트정보 조회중 예외가 발생했습니다.");
							Ext.getCmp("siteCharttest").unmask();
							Ext.getCmp("siteCharttest").mask("차트정보를 조회하지 못했습니다.", "noData");
							return;
						}
						// JSON Object로 변경
						var jsonData = Ext.util.JSON.decode(response.responseText);


						if (jsonData == -1) {
							Ext.getCmp("siteCharttest").addCls("dj-mask-noneimg");
							Ext.getCmp("siteCharttest").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						} else {
							Ext.getCmp("siteCharttest").unmask();
							store.loadData(jsonData.data);

							//수질측정 2번째
							var VAL_2 = [];
							for (max = 0; max < jsonData.data.length; max++) {
								VAL_2.push(jsonData.data[max][selectItem + "_2"]);
							}
							//수질측정 3번째
							var VAL_3 = [];
							for (max = 0; max < jsonData.data.length; max++) {
								VAL_3.push(jsonData.data[max][selectItem + "_3"]);
							}
							//수질측정 4번째
							var VAL_4 = [];
							for (max = 0; max < jsonData.data.length; max++) {
								VAL_4.push(jsonData.data[max][selectItem + "_4"]);
							}

							var maxValue2 = VAL_2.slice(0).sort(function (a, b) { a < b })[0];
							var maxValue3 = VAL_3.slice(0).sort(function (a, b) { a < b })[0];
							var maxValue4 = VAL_4.slice(0).sort(function (a, b) { a < b })[0];
							//세 측정값을 비교하여 가장 큰값의 /2 를 더한 값이 max 값
							var maxData = [maxValue2, maxValue3, maxValue4].slice(0).sort(function (a, b) { a < b })[0]
								+ [maxValue2, maxValue3, maxValue4].slice(0).sort(function (a, b) { a < b })[0];

							// 차트 컨트롤에 max 데이터 셋팅
							console.info(VAL_2.slice(0).sort(function (a, b) { a < b })[0]);

							// 차트 컨트롤에 max 데이터 셋팅
							SetChartMaxData(maxData);

						}

						cfgBtn.show();
						saveBtn.show();
					},
					failure: function (form, action) {
						// 로딩바 숨김
						Ext.getCmp("siteCharttest").unmask();
						alert("오류가 발생하였습니다.");
					}
				});
			} else {
				// 로딩바 표시

				Ext.getCmp("siteCharttest").removeCls("dj-mask-noneimg");
				Ext.getCmp("siteCharttest").addCls("dj-mask-withimg");
				Ext.getCmp("siteCharttest").mask("loading", "loading...");
				Ext.Ajax.request({
					url: requestUrl,    // To Which url you wanna POST.
					params: {
						recordId: recordId
						, siteId: siteId
						, recordYear: selectYear
						, recordYear2: selectYear2
						, recordMonth: selectMonth
						, recordMonth2: selectMonth2
						, defaultChart: defaultChart
						, selectItem: selectItem
						, hMaxDate: maxDate
					},
					async: true, // 비동기 = async: true, 동기 = async: false
					success: function (response, opts) {
						if ('error' == response.responseText) {
							Ext.Msg.alert("알림", "차트정보 조회중 예외가 발생했습니다.");
							Ext.getCmp("siteCharttest").unmask();
							Ext.getCmp("siteCharttest").mask("차트정보를 조회하지 못했습니다.", "noData");
							return;
						}
						// JSON Object로 변경
						var jsonData = Ext.util.JSON.decode(response.responseText);
						/*
						* 차트 가장 마지막 날짜 전역변수 설정 (설정창 날짜 바인딩을 위한 배열)
						* ITEMS_NAME = 항목값
						* WMCYMD  = 날짜 ( ex) 2013.12.23 )
						* F 환경기초시설 구분은 미확
						*/

						if (!jsonData.data) {
							Ext.getCmp("siteCharttest").addCls("dj-mask-noneimg");
							Ext.getCmp("siteCharttest").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
							return;
						}

						_chartDateInfo = [];
						_chartDateInfo.push(jsonData.data[0]);
						_chartDateInfo.push(jsonData.data[jsonData.data.length - 1]);
						if (store.parentId == "F") {
							if (_chartDateInfo[0].f_gubun) {
								_chartDateInfo[0].f_gubun = f_parentId;
							}
						}
						if (store.parentId == "A") {
							for (var ndReplace = 0; ndReplace < jsonData.data.length; ndReplace++) {
								var itemValue = "ITEM_VALUE";
								if (jsonData.data[ndReplace].ITEM_VALUE == 999999999) {
									jsonData.data[ndReplace].ITEM_VALUE = 0;
									jsonData.data[ndReplace].ITEM_VALUE_1 = "정량한계미만 ";
								}
							};
						}
						store.loadData(jsonData.data);
						store.arrMax = jsonData.maxdata;

						if (jsonData.data.length > 0) {
							// 차트 컨트롤에 max 데이터 셋팅
							SetChartMaxData(store);
							// 로딩바 숨김
							Ext.getCmp("siteCharttest").unmask();

						} else {
							Ext.getCmp("siteCharttest").addCls("dj-mask-noneimg");
							Ext.getCmp("siteCharttest").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						}

						cfgBtn.show();
						saveBtn.show();

					},
					failure: function (form, action) {
						// 로딩바 숨김
						Ext.getCmp("siteCharttest").unmask();
						alert("오류가 발생하였습니다.");
					}
				});
			}




		}
	}
});
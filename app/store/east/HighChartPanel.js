Ext.define('krf_new.store.east.HighChartPanel', {
	extend: 'Ext.data.Store',
	remoteSort: true,

	listeners: {
		load: function (store) {

			Ext.getCmp('highChartContiner').mask('loading...','loading...');
			
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
				} else if(store.parentId == "H" && defaultChart == "0"){
					maxDate = Ext.getCmp("hSelectYear").lastValue+Ext.getCmp("hSelectMonth").lastValue+Ext.getCmp("hSelectDay").lastValue;

					//selectItem.lastValue
					var siteChartCtl = Ext.getCmp("highChartPanel");  //차트 ID
					siteChartCtl.series[1]._yField = selectItem.lastValue+"_1";
					siteChartCtl.series[2]._yField = selectItem.lastValue+"_2";
					siteChartCtl.series[3]._yField = selectItem.lastValue+"_3";
					siteChartCtl.series[4]._yField = selectItem.lastValue+"_4";
					
				}else {
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
			if (store.siteCD != undefined && store.siteCD != ""){
				recordId = store.siteCD;
				
				
			}
				
			if (store.parentId == "A" || store.parentId == "B" || store.parentId == "C" || store.parentId == "I") {
				requestUrl = _API['GetRWMDT_' + store.parentId]; //"./resources/jsp/GetRWMDT_" + store.parentId + ".jsp";
			} else if (store.parentId == "F") {
				requestUrl = _API['GetRWMDT_' + f_parentId]; //"./resources/jsp/GetRWMDT_" + f_parentId + ".jsp";
			} else if (org_D_firstID == "D") {
				requestUrl = _API['GetRWMDT_' + store.parentId]; //"./resources/jsp/GetRWMDT_" + store.parentId + ".jsp";
			} else if(store.parentId == "H"){
				requestUrl = _API['GetRWMDT_' + store.parentId]; //"./resources/jsp/GetRWMDT_" + store.parentId + ".jsp";
			}
			
			if(store.parentId == "H" && defaultChart == "1"){

				Ext.getCmp('highChartContiner').mask('loading...','loading...');

				Ext.Ajax.request({
					url: _API.GetRWMDT_HDate,    // To Which url you wanna POST.
					params: {
						recordId: recordId
					},
					async: false, // 비동기 = async: true, 동기 = async: false
					success: function (response, opts) {
						if ('error' == response.responseText) {
							Ext.Msg.alert("알림", "차트정보 조회중 예외가 발생했습니다.");
							Ext.getCmp("highChartContiner").unmask();
							Ext.getCmp("highChartContiner").mask("차트정보를 조회하지 못했습니다.", "noData");
							return;
						}
						// JSON Object로 변경
						var jsonData = Ext.util.JSON.decode(response.responseText);
						
						
						//var afterVal = dateSplit.split(".");
						var Hdate = jsonData.maxdata[0].DE.split("-");
						maxDate = Hdate[0]+ Hdate[1]+ Hdate[2];
						
						_chartDateInfo = [];
						_chartDateInfo.push(Hdate);
						if (jsonData.data.length > 0) {
							// 차트 컨트롤에 max 데이터 셋팅
							//SetChartMaxData(store);
							// 로딩바 숨김
							Ext.getCmp("highChartContiner").unmask();
	
						} else {
							Ext.getCmp("highChartContiner").addCls("dj-mask-noneimg");
							Ext.getCmp("highChartContiner").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						}
	
						cfgBtn.show();
						saveBtn.show();
	
					},
					failure: function (form, action) {
						// 로딩바 숨김
						Ext.getCmp("highChartContiner").unmask();
						alert("오류가 발생하였습니다.");
					}
				});




			}


			// 보 highChart 변수 저장 ( 새로 차트가 생성될때, parent가 달라졌을때 )
			if($KRF_APP.highChart.saveParentId != store.parentId){
				$KRF_APP.highChart.ulIdArr = []; // 지점 id 비우기
				$KRF_APP.highChart.seriesArr = []; // highchart 데이터  비우기

				$KRF_APP.highChart.ulIdArr.push(recordId);  //지점 id 추가
				$KRF_APP.highChart.param.url = requestUrl; // ajax query url 
				$KRF_APP.highChart.param.selectItem = selectItem; //  검색 조건 저장
				$KRF_APP.highChart.saveParentId = store.parentId; // parentId 저장
				$KRF_APP.highChart.removeLabel = true; // 라벨 새로 그리기
			}


			if(store.parentId == "H"){
				recordId = recordId.replace("Reach","RCH");
					// 로딩바 표시
				
				Ext.getCmp("highChartContiner").removeCls("dj-mask-noneimg");
				Ext.getCmp("highChartContiner").addCls("dj-mask-withimg");
				Ext.getCmp("highChartContiner").mask("loading", "loading...");
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
							Ext.getCmp("highChartContiner").unmask();
							Ext.getCmp("highChartContiner").mask("차트정보를 조회하지 못했습니다.", "noData");
							return;
						}
						// JSON Object로 변경
						var jsonData = Ext.util.JSON.decode(response.responseText);
						
						
						if (jsonData == -1) {
							// Ext.getCmp("highChartContiner").addCls("dj-mask-noneimg");
							// Ext.getCmp("highChartContiner").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						} else {
							Ext.getCmp("highChartContiner").unmask();
							store.loadData(jsonData.data);

							//수질측정 2번째
							var VAL_2= [];
							for(max = 0 ; max  < jsonData.data.length; max ++){
									VAL_2.push(jsonData.data[max][selectItem+"_2"]);
							}
							//수질측정 3번째
							var VAL_3= [];
							for(max = 0 ; max  < jsonData.data.length; max ++){
									VAL_3.push(jsonData.data[max][selectItem+"_3"]);
							}
							//수질측정 4번째
							var VAL_4= [];
							for(max = 0 ; max  < jsonData.data.length; max ++){
									VAL_4.push(jsonData.data[max][selectItem+"_4"]);
							}
							
							var maxValue2 = VAL_2.slice(0).sort(function(a,b){a<b})[0];
							var maxValue3 = VAL_3.slice(0).sort(function(a,b){a<b})[0];
							var maxValue4 = VAL_4.slice(0).sort(function(a,b){a<b})[0];
							//세 측정값을 비교하여 가장 큰값의 /2 를 더한 값이 max 값
							var maxData = [maxValue2,maxValue3,maxValue4].slice(0).sort(function(a,b){a<b})[0] 
										+ [maxValue2,maxValue3,maxValue4].slice(0).sort(function(a,b){a<b})[0];
							
							// 차트 컨트롤에 max 데이터 셋팅
							console.info(VAL_2.slice(0).sort(function(a,b){a<b})[0]);
							
							// 차트 컨트롤에 max 데이터 셋팅
							//SetChartMaxData(maxData);

						}
						
						

						cfgBtn.show();
						saveBtn.show();

					},
					failure: function (form, action) {
						// 로딩바 숨김
						Ext.getCmp("highChartContiner").unmask();
						alert("오류가 발생하였습니다.");
					}
				});
			}else{
					// 로딩바 표시
				
				// Ext.getCmp("highChartContiner").removeCls("dj-mask-noneimg");
				// Ext.getCmp("highChartContiner").addCls("dj-mask-withimg");
				// Ext.getCmp("highChartContiner").mask("loading", "loading...");
				Ext.Ajax.request({
					url: requestUrl,    // To Which url you wanna POST.
					params: {
						recordId: recordId
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
							Ext.getCmp("highChartContiner").unmask();
							Ext.getCmp("highChartContiner").mask("차트정보를 조회하지 못했습니다.", "noData");
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
						_chartDateInfo = [];
						_chartDateInfo.push(jsonData.data[0]);
						_chartDateInfo.push(jsonData.data[jsonData.data.length - 1]);
						if (store.parentId == "F") {
							_chartDateInfo[0].f_gubun = f_parentId;
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

						if(jsonData.data.length > 0){
							$KRF_APP.highChart.param.maxDate = jsonData.data[jsonData.data.length - 1];
							$KRF_APP.highChart.param.minDate = jsonData.data[0];
						}
						// 보 차트
						$KRF_APP.fireEvent($KRF_EVENT.CREATE_HIGH_CHART
										, {"data":jsonData.data,"ulIdArr":$KRF_APP.highChart.ulIdArr,"ulNameArr":$KRF_APP.highChart.ulNameArr
										,"removeLabel":$KRF_APP.highChart.removeLabel ,"parentId":$KRF_APP.highChart.parentId});
										
						if (jsonData.data.length > 0) {
							// 차트 컨트롤에 max 데이터 셋팅
							//SetChartMaxData(store);
							// 로딩바 숨김
							Ext.getCmp("highChartContiner").unmask();

						} else {
							// Ext.getCmp("highChartContiner").addCls("dj-mask-noneimg");
							// Ext.getCmp("highChartContiner").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						}

						cfgBtn.show();
						saveBtn.show();

					},
					failure: function (form, action) {
						// 로딩바 숨김
						Ext.getCmp("highChartContiner").unmask();
						alert("오류가 발생하였습니다.");
					}
				});
			}

			

			
		}
	}
});
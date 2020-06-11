Ext.define('krf_new.store.south.SearchResultGrid_B001', {
	extend: 'Ext.data.Store',
	fields: [
		'RIVER_ID',
		'SITE_NAME',
		'MSR_DATE',
		'F02',
		'F03',
		'F04',
		'F05',
		'F06',
		'F07',
		'F08',
		'F09',
		'F10',
		'F11',
		'F12',
		'F13',
		'F14',
		'F15',
		'F16',
		'F17',
		'F18',
		'F19',
		'F20',
		'F21',
		'F22',
		'F23',
		'F24',
		'F25',
		'F26',
		'F27',
		'F28',
		'F29',
		'F30',
		'F31',
		'F32',
		'F33',
		'F34',
		'F35',
		'F36',
		'F37',
		'F38',
		'F39',
		'F40',
		'F41',
		'F42',
		'F43',
		'F44',
		'F45',
		'F46',
		'F47',
		'F48',
		'F49',
		'F50',
		'F51',
		'F52',
		'F53',
		'F54',
		'F55',
		'F56',
		'F57',
		'F58',
		'F59',
		'F60',
		'F61',
		'F62',
		'F63',
		'F64',
		'F65',
		'F66',
		'F67',
		'F68',
		'F69',
		'F70',
		'F71',
		'F72',
		'F73',
		'F74',
		'F75',
		'F76',
		'F77',
		'F78',
		'F79',
		'F80',
		'F81',
		'F82',
		'F83',
		'F84',
		'F85',
		'F86',
		'F87',
		'F88',
		'F89',
		'F90',
		'F91',
		'F92',
		'F93',
		'F94',
		'F95',
		'F96',
		'F97',
		'F98',
		'F99',
		'F100',
		'F101',
		'F102',
		'F103',
		'F104',
		'F105',
		'F106',
		'F107',
		'F108',
		'F109'],
	siteId: '',
	autoLoad: true,
	buffered: true,
	pageSize: 100,
	remoteSort: true,
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	isFirst: true,
	listeners: {
		load: function (store) {
			var me = this;
			var firstSearch = $KRF_APP.btnFlag;

			var startYear = startMonth = endYear = endMonth = "";
			startYear = Ext.getCmp("startYear_B").value;
			startMonth = Ext.getCmp("startMonth_B").value;
			var startDay = Ext.getCmp("startDay_B").value;
			var startTime = Ext.getCmp("startTime_B").value;
			
			
			
			endYear = Ext.getCmp("endYear_B").value;
			endMonth = Ext.getCmp("endMonth_B").value;
			var endDay = Ext.getCmp("endDay_B").value;
			var endTime = Ext.getCmp("endTime_B").value;


			var cmbStartYear = Ext.getCmp("startYear_B");
			var cmbStartMonth = Ext.getCmp("startMonth_B");
			var cmbStartDay = Ext.getCmp("startDay_B");
			var cmbStartTime = Ext.getCmp("startTime_B");

			var cmbEndYear = Ext.getCmp("endYear_B");
			var cmbEndMonth = Ext.getCmp("endMonth_B");
			var cmbEndDay = Ext.getCmp("endDay_B");
			var cmbEndTime = Ext.getCmp("endTime_B");

			
			
			
			var startFull = startYear + startMonth + startDay + startTime;
			var endFull = endYear + endMonth + endDay + endTime;
			//			var winCtl = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.RESULT.id);

			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();

			//20203031  확정 자료만 보여주기
			//var con = Ext.getCmp("select_B001").value;
			var con = '02';
			var url = "";
			var start = "";
			var end = "";


			//20200331 확정데이터만 보여주기로 
			url = _API.GetSearchResultData_B001_fix; //'./resources/jsp/GetSearchResultData_B001_fix.jsp';

			/*if (con == "01") {
				url = _API.GetSearchResultData_B001;  //'./resources/jsp/GetSearchResultData_B001.jsp';
			} else {
				url = _API.GetSearchResultData_B001_fix; //'./resources/jsp/GetSearchResultData_B001_fix.jsp';
			}*/

			// 로딩중 메세지
			if (me.gridCtl != null) {
				me.gridCtl.removeCls("dj-mask-noneimg");
				me.gridCtl.addCls("dj-mask-withimg");
				me.gridCtl.mask("loading", "loading...");
			}

			if (firstSearch == "noDate") {
				Ext.Ajax.request({
					url: url,
					params: { firstSearch: firstSearch, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth, siteIdsChar: store.siteIds, con: con, startFull: startFull, endFull: endFull },
					async: false, // 비동기 = async: true, 동기 = async: false
					success: function (response, opts) {
						var jsonData = Ext.util.JSON.decode(response.responseText);
						if (jsonData.data.length > 0) {
							if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
								var endDate = jsonData.data[0].WMCYMD;

								//$KRF_APP.global.CommFn.changeDate.changeYear()

								/* 최근날짜 date format으로 변환한뒤 공통 날짜 구하는 function 사용 */
								var dtE = new Date(endDate.substring(0, 4), parseInt(endDate.substring(4, 6)-1), parseInt(endDate.substring(6, 8)));


									//자동수질측정지점 -1달
									var endDates = $KRF_APP.global.CommFn.changeDate.changeMonth(dtE,0);
									var startDates = $KRF_APP.global.CommFn.changeDate.changeMonth(dtE,-1);

									var eYear, eMonth, eDate;
									var sYear, sMonth, sDate;
									
									eYear = endDates.year;
									eMonth = endDates.month;
									eDate = endDates.day;
									endFull = eYear + eMonth + eDate + '235959';

									sYear = startDates.year;
									sMonth = startDates.month;
									sDate = startDates.day;
									startFull = sYear + sMonth + sDate + '010000';

									cmbEndYear.setValue(eYear);
									cmbEndMonth.setValue(eMonth);
									cmbEndDay.setValue(eDate);
									cmbEndTime.setValue("24");

									cmbStartYear.setValue(sYear);
									cmbStartMonth.setValue(sMonth);
									cmbStartDay.setValue(sDate);
									cmbStartTime.setValue("01");
								
							}

						} else {
							if (me.gridCtl != null) {

								me.gridCtl.addCls("dj-mask-noneimg");
								me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
							}
						}
					},
					failure: function (form, action) {
						if (me.gridCtl != null) {
							me.gridCtl.addCls("dj-mask-noneimg");k
							me.gridCtl.mask("오류가 발생하였습니다.");
						}
					}
				});
			}

			firstSearch = "date";
			Ext.Ajax.request({
				url: url,
				params: { firstSearch: firstSearch, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth, siteIdsChar: store.siteIds, con: con, startFull: startFull, endFull: endFull },
				async: true, // 비동기 = async: true, 동기 = async: false
				success: function (response, opts) {
					var jsonData = Ext.util.JSON.decode(response.responseText);
					if (jsonData.data.length > 0) {
						if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
							store.setData(jsonData.data);
							store.startYear = cmbStartYear.value;
							store.startMonth = cmbStartMonth.value;
							store.startDay = cmbStartDay.value;
							store.startTime = cmbStartTime.value;
							store.endYear = cmbEndYear.value;
							store.endMonth = cmbEndMonth.value;
							store.endDay = cmbEndDay.value;
							store.endTime = cmbEndTime.value;
							// 로딩바 숨김
							if (me.gridCtl != null) {
								me.gridCtl.unmask();
							}
						} else {
							if (me.gridCtl != null) {
								me.gridCtl.addCls("dj-mask-noneimg");
								me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
							}
						}
					} else {
						if (me.gridCtl != null) {
							me.gridCtl.addCls("dj-mask-noneimg");
							me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						}
					}
				},
				failure: function (form, action) {
					if (me.gridCtl != null) {
						me.gridCtl.addCls("dj-mask-noneimg");
						me.gridCtl.mask("오류가 발생하였습니다.");
					}
				}
			});
		}
	},
	addZero: function (n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
});
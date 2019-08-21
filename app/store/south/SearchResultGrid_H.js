Ext.define('krf_new.store.south.SearchResultGrid_H', {
	extend: 'Ext.data.Store',
	fields: ['SPOT_CODE', 'DE', 'PREDICT_DT', 'BOD', 'CHLA', 'DOC', 'FLUX', 'WTRTP', 'NH3', 'NO3', 'OP4'],

	siteId: '',
	autoLoad: true,
	pageSize: 100,
	siteIds: "",
	parentIds: [],
	gridCtl: null,

	listeners: {
		load: function (store) {

			var me = this;
			var requestUrl = "";
			requestUrl = _API.GetSearchResultData_H;
			var firstSearch = $KRF_APP.btnFlag;

			var startYear = startMonth = endYear = endMonth = startDay = endDay = "";

			var sYearCtl = Ext.getCmp("startYear_H");
			if (sYearCtl != undefined)
				startYear = Ext.getCmp("startYear_H").value;
			var sMonthCtl = Ext.getCmp("startMonth_H");
			if (sMonthCtl != undefined)
				startMonth = Ext.getCmp("startMonth_H").value;
			var eYearCtl = Ext.getCmp("endYear_H");
			if (eYearCtl != undefined)
				endYear = Ext.getCmp("endYear_H").value;
			var eMonthCtl = Ext.getCmp("endMonth_H");
			if (eMonthCtl != undefined)
				endMonth = Ext.getCmp("endMonth_H").value;
			var startDayCmb = Ext.getCmp('startDay_H');
			if (startDayCmb != undefined)
				startDay = startDayCmb.value;
			var endDayCmb = Ext.getCmp('endDay_H');
			if (endDayCmb != undefined)
				endDay = endDayCmb.value;

			// 로딩바 표시
			var winCtl = Ext.getCmp("searchResultWindow");
			//			var winCtl = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.RESULT.id);
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			// 로딩중 메세지
			if (me.gridCtl != null) {

				me.gridCtl.removeCls("dj-mask-noneimg");
				me.gridCtl.addCls("dj-mask-withimg");
				me.gridCtl.mask("loading", "loading...");
			}

			if (firstSearch == "noDate") {
				var paramObj = {
					startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
					, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch
				}

				Ext.Ajax.request({
					url: requestUrl,
					params: paramObj,
					async: false, // 비동기 = async: true, 동기 = async: false
					success: function (response, opts) {
						var jsonData = Ext.util.JSON.decode(response.responseText);
						if (jsonData.data.length > 0) {
							if (!jsonData.data[0].msg) {
								var dateSplit = jsonData.data[0].DE;
								if (dateSplit == null) {
									me.gridCtl.addCls("dj-mask-noneimg");
									me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
									return;
								}


								var splitArr = dateSplit.split('-');
								var dateObj = new Date(splitArr[0], splitArr[1], splitArr[2]);

								dateObj.setFullYear(splitArr[0], splitArr[1] - 1, splitArr[2] - 1);

								startYear = dateObj.getFullYear();
								startMonth = dateObj.getMonth() + 1;
								startDay = dateObj.getDate();

								if (startMonth < 10) {
									startMonth = "0" + startMonth;
								}

								if (startDay < 10) {
									startDay = "0" + startDay;
								}

								endYear = splitArr[0];
								endMonth = splitArr[1];
								endDay = splitArr[2];
							}
						}
					},
					failure: function (form, action) {

					}
				});

				firstSearch = "date";
				Ext.getCmp("startYear_H").setValue(startYear);
				Ext.getCmp("startMonth_H").setValue(startMonth);
				Ext.getCmp("startDay_H").setValue(startDay);
				Ext.getCmp("endYear_H").setValue(endYear);
				Ext.getCmp("endMonth_H").setValue(endMonth);
				Ext.getCmp("endDay_H").setValue(endDay);
				startDayCmb.setValue(startDay);
				endDayCmb.setValue(endDay);
			}

			Ext.Ajax.request({
				url: requestUrl, //'./resources/jsp/GetSearchResultData.jsp',
				params: {
					WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
					, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
					, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch, startDay: startDay, endDay: endDay
				},
				async: true, // 비동기 = async: true, 동기 = async: false
				success: function (response, opts) {
					store.startYear = startYear;
					store.startMonth = startMonth;
					store.endYear = endYear;
					store.endMonth = endMonth;
					store.startDay = startDay;
					store.endDay = endDay;
					var jsonData = Ext.util.JSON.decode(response.responseText);
					if (jsonData.data.length > 0) {
						if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
							store.setData(jsonData.data);
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
	}
});
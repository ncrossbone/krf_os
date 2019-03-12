Ext.define('krf_new.store.south.SearchResultGrid_E', {
	extend: 'Ext.data.Store',
	fields: [
		'PT_NO',
		{ name: 'PT_NM', type: 'string' }
	],

	siteId: '',
	autoLoad: true,
	pageSize: 100,
	siteIds: "",
	parentIds: [],
	gridCtl: null,

	listeners: {
		load: function (store) {
			//console.info(store);
			var me = this;

			var firstSearch = $KRF_APP.btnFlag;
			
			var requestUrl =  "";
			
			//store.combo;
			if(store.combo == null){
				store.combo = 1;
			}

			if(store.parentIds[0].parentId == undefined){
				requestUrl = _API.GetSearchResultData_E + store.parentIds;
			}else{
				requestUrl = _API.GetSearchResultData_E + store.parentIds[0].parentId;
			}

			
			
			var startYear = startMonth = endYear = endMonth = "";
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartBan").value;
			
			if (startMonth == "상" || startMonth == "1") {
				startMonth = 1;
			} else {
				startMonth = 2;
			}
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndBan").value;

			if (endMonth == "상" || endMonth == "1") {
				endMonth = 1;
			} else {
				endMonth = 2;
			}

			// 로딩바 표시
			var winCtl = Ext.getCmp("searchResultWindow");
			//			var winCtl = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.RESULT.id);
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();

			// 로딩중 메세지
			if (me.gridCtl != null) {
				console.info(me.gridCtl);
				me.gridCtl.removeCls("dj-mask-noneimg");
				me.gridCtl.addCls("dj-mask-withimg");
				me.gridCtl.mask("loading", "loading...");
			}
			//console.info(requestUrl);
			//console.info(firstSearch);
			if (firstSearch == "noDate") {
				Ext.Ajax.request({
					url: requestUrl,
					params: {
						siteIds: store.siteIds, firstSearch: firstSearch, comboValue: store.combo
					},
					async: false, // 비동기 = async: true, 동기 = async: false
					success: function (response, opts) {
						var jsonData = Ext.util.JSON.decode(response.responseText);
						//console.info(jsonData);
						if (jsonData.data.length > 0) {
							if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
								var dateSplit = jsonData.data[0].WMCYMD;
								if (dateSplit == null) {
									me.gridCtl.addCls("dj-mask-noneimg");
									me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
									return;
								}

								// 콤마로 들어오는 경우가 간혹가다 있음.. 데이터상 문제
								if(dateSplit.replace(',','.')){
									dateSplit = dateSplit.replace(',','.');
								}

								var afterVal = dateSplit.split(".");
								startYear = afterVal[0];
								if (afterVal[1] == "1" || afterVal[1] == "01") {
									startMonth = "2";
									startYear = startYear - 1;
								} else {
									startMonth = afterVal[1] - 1;
								}
								endYear = afterVal[0];
								endMonth = afterVal[1];
							}
						}
					},
					failure: function (form, action) {

					}
				});

				//Tab Combo value 설정
				firstSearch = "date";
				Ext.getCmp("cmbStartYear").setValue(startYear);
				Ext.getCmp("cmbStartBan").setValue(startMonth);
				Ext.getCmp("cmbEndYear").setValue(endYear);
				Ext.getCmp("cmbEndBan").setValue(endMonth);
				Ext.getCmp("sstgCombo").setValue(store.combo);
			}

			Ext.Ajax.request({
				url: requestUrl,
				params: {
					WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
					, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
					, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch, comboValue: store.combo
				},
				async: true, // 비동기 = async: true, 동기 = async: false
				success: function (response, opts) {
					
					store.startYear = startYear;
					store.endYear = endYear;
					if (startMonth == 1) {
						store.startMonth = "상";
					} else {
						store.startMonth = "하";
					}
					if (endMonth == 1) {
						store.endMonth = "상";
					} else {
						store.endMonth = "하";
					}
					var jsonData = Ext.util.JSON.decode(response.responseText);
					//console.info(jsonData);
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
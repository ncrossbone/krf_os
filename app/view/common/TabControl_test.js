Ext.define('krf_new.view.common.TabControl_test', {

	extend: 'Ext.panel.Panel',


	requires: ['krf_new.view.common.TabControlController'],

	xtype: 'common-tabcontrol',

	controller: 'tabControlController',

	id: 'tabControl',

	gridId: null,
	header: false,

	items: [{
		xtype: 'container',
		id: "tabCondition",
		//title: 'test',
		layout: {
			type: 'hbox'
		},
		height: 30,
		items: [{
			xtype: 'container', 
			id: 'resultTab_A',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_B',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_C',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_D',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_E',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_F',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_G',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_H',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_I',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_J',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_K',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				
			}]
		}]
	}, {
		xtype: 'tabpanel',
		id: 'tabpanels',
		//title: 'tab1',
		tabBar: {
			style: 'background:#fff; padding:5px;'
		},
		style: 'background-color: #157fcb;',
		//closable: true,
		cls: 'khLee-tab-active khLee-tab-unselectable khLee-tab',
		listeners: {
			'tabchange': function (tabPanel, tab) {

					
					// 그리드별 조회조건 컨트롤 셋팅
				Ext.getCmp('m_resultTab').setHidden(true);
				$KRF_APP.global.TabFn.searchConditionCtl(tab.down("grid"));

				//미확정자료 콤보박스 분기 - ph
				var b001 = Ext.getCmp("select_B001");
				var startDayTime = Ext.getCmp("startDayTime");
				var endDayTime = Ext.getCmp("endDayTime");

				var cmbStartYear = Ext.getCmp("cmbStartYear");
				var cmbEndYear = Ext.getCmp("cmbEndYear");

				var cmbStartMonth = Ext.getCmp("cmbStartMonth");
				var cmbEndMonth = Ext.getCmp("cmbEndMonth");

				var cmbStartBan = Ext.getCmp("cmbStartBan");
				var cmbEndBan = Ext.getCmp("cmbEndBan");


				var tabStore = tab.items.items[0].items.items[0].items.items[0].store;

				if (tab.id == "grid_B001_container" || tab.idCheck == "B001") {
					b001.setHidden(false);
					startDayTime.setHidden(false);
					endDayTime.setHidden(false);

					cmbStartYear.setValue(tabStore.startYear);
					cmbStartMonth.setValue(tabStore.startMonth);
					Ext.getCmp("startDay").setValue(tabStore.startDay);
					Ext.getCmp("startTime").setValue(tabStore.startTime);

					cmbEndYear.setValue(tabStore.endYear);
					cmbEndMonth.setValue(tabStore.endMonth);
					Ext.getCmp("endDay").setValue(tabStore.endDay);
					Ext.getCmp("endTime").setValue(tabStore.endTime);

				} else {
					var hstartDay = Ext.getCmp('hStartDayPanel');
					var hEndDay = Ext.getCmp('hEndDayPanel');
					if (tab.parentId == "H") {
						hstartDay.setHidden(false);
						hEndDay.setHidden(false);
					} else {
						hstartDay.setHidden(true);
						hEndDay.setHidden(true);
					}
					b001.setHidden(true);
					startDayTime.setHidden(true);
					endDayTime.setHidden(true);
				}

				
				// 검색별 TAB 검색조건 변경 및 날짜 binding
				if (tab.parentId != "F") {
					var hiddenGrid = Ext.getCmp("F_CHANGE");
					var store = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
					if (tab.parentId == "D" || tab.parentId == "B") {
						if (tabStore.data.length == 0) {
							Ext.getCmp("cmbStartYear").setValue("2017");
							Ext.getCmp("cmbStartMonth").setValue("01");
							Ext.getCmp("cmbEndYear").setValue("2017");
							Ext.getCmp("cmbEndMonth").setValue("04");
						} else {
							Ext.getCmp("cmbStartYear").setValue(tabStore.startYear);
							Ext.getCmp("cmbStartMonth").setValue(tabStore.startMonth);
							Ext.getCmp("cmbEndYear").setValue(tabStore.endYear);
							Ext.getCmp("cmbEndMonth").setValue(tabStore.endMonth);
						}
					} else if (tab.parentId == "C") {
						if (tabStore.data.length == 0) {
							Ext.getCmp("cmbStartYear").setValue("2017");
							Ext.getCmp("cmbStartBan").setValue("상");
							Ext.getCmp("cmbEndYear").setValue("2017");
							Ext.getCmp("cmbEndBan").setValue("하");
						} else {
							Ext.getCmp("cmbStartYear").setValue(tabStore.startYear);
							Ext.getCmp("cmbStartBan").setValue(tabStore.startMonth);
							Ext.getCmp("cmbEndYear").setValue(tabStore.endYear);
							Ext.getCmp("cmbEndBan").setValue(tabStore.endMonth);
						}
					} else if (tab.parentId == "E") {
						if (tabStore.data.length == 0) {
							Ext.getCmp("sstgCombo").setValue(1)
							Ext.getCmp("cmbStartYear").setValue("2017");
							Ext.getCmp("cmbStartBan").setValue("상");
							Ext.getCmp("cmbEndYear").setValue("2017");
							Ext.getCmp("cmbEndBan").setValue("하");
						} else {
							Ext.getCmp("sstgCombo").setValue(tabStore.combo);
							Ext.getCmp("cmbStartYear").setValue(tabStore.startYear);
							Ext.getCmp("cmbStartBan").setValue(tabStore.startMonth);
							Ext.getCmp("cmbEndYear").setValue(tabStore.endYear);
							Ext.getCmp("cmbEndBan").setValue(tabStore.endMonth);
						}
					} else if (tab.parentId == "L") {
						if (tabStore.data.length == 0) {
							Ext.getCmp("l_StartYear").setValue("2017");
							Ext.getCmp("l_StartMonth").setValue("10");
							Ext.getCmp("l_EndYear").setValue("2017");
							Ext.getCmp("l_EndMonth").setValue("12");
						} else {
							Ext.getCmp("l_StartYear").setValue(tabStore.startYear);
							Ext.getCmp("l_StartMonth").setValue(tabStore.startMonth);
							Ext.getCmp("l_EndYear").setValue(tabStore.endYear);
							Ext.getCmp("l_EndMonth").setValue(tabStore.endMonth);
						}
					} else {
						if (tabStore.data.length == 0) {
							Ext.getCmp("cmbStartYear").setValue("2017");
							Ext.getCmp("cmbStartMonth").setValue("01");
							Ext.getCmp("cmbEndYear").setValue("2017");
							Ext.getCmp("cmbEndMonth").setValue("04");
						} else {
							Ext.getCmp("cmbStartYear").setValue(tabStore.startYear);
							Ext.getCmp("cmbStartMonth").setValue(tabStore.startMonth);
							Ext.getCmp("cmbEndYear").setValue(tabStore.endYear);
							Ext.getCmp("cmbEndMonth").setValue(tabStore.endMonth);
						}
					}

					hiddenGrid.setHidden(true);
				} else {
					var hiddenGrid = Ext.getCmp("F_CHANGE");

					var store = ['2012', '2013'];

					var cmbStartYear = Ext.getCmp("cmbStartYear");
					var cmbEndYear = Ext.getCmp("cmbEndYear");

					cmbStartYear.setStore(store);
					cmbEndYear.setStore(store);
					if (tabStore.data.length == 0) {
						Ext.getCmp("cmbStartYear").setValue("2013");
						Ext.getCmp("cmbStartMonth").setValue("01");
						Ext.getCmp("cmbEndYear").setValue("2013");
						Ext.getCmp("cmbEndMonth").setValue("12");
					} else {
						Ext.getCmp("cmbStartYear").setValue(tabStore.startYear);
						Ext.getCmp("cmbStartMonth").setValue(tabStore.startMonth);
						Ext.getCmp("cmbEndYear").setValue(tabStore.endYear);
						Ext.getCmp("cmbEndMonth").setValue(tabStore.endMonth);
						Ext.getCmp("F_CHANGE").setRawValue(tabStore.gubunNm);
					}

					hiddenGrid.setHidden(false);
				}

				var resultTab = Ext.getCmp("resultTab"); 		 //일반 검색pollResultTab
				var pollSearchTab = Ext.getCmp("pollSearchTab"); //부하량 (년도/검색)
				var pollResultTab = Ext.getCmp("pollResultTab"); //부하량 집수구역별 검색조건

				var pollutionSearchTab = Ext.getCmp("pollutionSearchTab"); //방유량 (년도/검색)
				var pollutionResultTab = Ext.getCmp("pollutionResultTab"); //방유량 집수구역별 검색조건

				//부하량 or 일반검색시 tab change
				if (tab.id == "searchResultPollLoad_container") {
					resultTab.setHidden(true);		//일반 검색pollResultTab
					pollSearchTab.setHidden(false);
					pollResultTab.setHidden(false);	//부하량 검색조건

					pollutionSearchTab.setHidden(true);
					pollutionResultTab.setHidden(true);	//방유량 검색조건

				} else if (tab.id == "searchResultpollution_01_container"
					|| tab.id == "searchResultpollution_02_container"
					|| tab.id == "searchResultpollution_03_container"
					|| tab.id == "searchResultpollution_04_container"
					|| tab.id == "searchResultpollution_05_container"
					|| tab.id == "searchResultpollution_06_container"
					|| tab.id == "searchResultpollution_07_container") {
					Ext.getCmp("tabCondition").show();

					//일반 검색
					resultTab.setHidden(true);

					//부하량 검색조건
					pollSearchTab.setHidden(true);
					pollResultTab.setHidden(true);

					//오염원 검색조건
					pollutionSearchTab.setHidden(false);
					pollutionResultTab.setHidden(false);

				} else {

					if (tab.id == "searchResultReach_container" || tab.parentId == "J") {
						Ext.getCmp("resultTab").hide();
						Ext.getCmp("tabCondition").hide();
					} else {
						Ext.getCmp("resultTab").show();
						Ext.getCmp("tabCondition").show();
					}

					var sstgCombo = Ext.getCmp("sstgCombo");

					var comboConfig = {
						'E': { 'startLabel': { text: '반기', isView: true }, 'endLabel': { text: '반기', isView: true }, 'cmbStartMonth': { isView: false }, 'cmbEndMonth': { isView: false }, 'cmbStartBan': { isView: true }, 'cmbEndBan': { isView: true }, 'sstgCombo': { isView: true }, 'sstgDetailViewBtn': { isView: true } },
						'C': { 'startLabel': { text: '반기', isView: true }, 'endLabel': { text: '반기', isView: true }, 'cmbStartMonth': { isView: false }, 'cmbEndMonth': { isView: false }, 'cmbStartBan': { isView: true }, 'cmbEndBan': { isView: true }, 'sstgCombo': { isView: false }, 'sstgDetailViewBtn': { isView: false } },
						'ELSE': { 'startLabel': { text: '월', isView: true }, 'endLabel': { text: '월', isView: true }, 'cmbStartMonth': { isView: true }, 'cmbEndMonth': { isView: true }, 'cmbStartBan': { isView: false }, 'cmbEndBan': { isView: false }, 'sstgCombo': { isView: false }, 'sstgDetailViewBtn': { isView: false } }
					};

					var config = comboConfig[tab.parentId] ? comboConfig[tab.parentId] : comboConfig['ELSE'];

					for (key in config) {
						if (config[key].text) {
							Ext.getCmp(key).setText(config[key].text);
						}

						Ext.getCmp(key).setHidden(!config[key].isView);
					}

					if (tab.parentId == "E") {
						if (tab.realParentId[0].parentId != undefined) {
							var store = $KRF_APP.global.CommFn.getSstgComboInfo(tab.realParentId[0].parentId);
							sstgCombo.setStore(store);
						}

					}

					//resultTab.setHidden(false);		//일반 검색pollResultTab

					pollSearchTab.setHidden(true);	//방유량 (년도/검색)
					pollResultTab.setHidden(true);	//방유량 검색조건

					//오염원 검색조건
					pollutionSearchTab.setHidden(true);
					pollutionResultTab.setHidden(true);
				}

				var storevalue = Ext.getCmp(tab.id);
				if (storevalue != undefined) {
					var pollutiongrdCtl = storevalue.items.items[0]; // 그리드 컨테이너
					pollutiongrdCtl = pollutiongrdCtl.items.items[0]; // 그리드 컨트롤

					var pollutionSelect = Ext.getCmp("pollutionSelect");

					if (pollutiongrdCtl.store.selectValue == undefined || pollutiongrdCtl.store.selectValue == "") {
						pollutionSelect.setValue("11");
					} else {
						pollutionSelect.setValue(pollutiongrdCtl.store.selectValue);
					}

					var pollutionYear = Ext.getCmp("pollutionYear");
					if (pollutiongrdCtl.store.year == undefined || pollutiongrdCtl.store.year == "") {
						pollutionYear.setValue("2015");
					} else {
						pollutionYear.setValue(pollutiongrdCtl.store.year);
					}
				}



				if (tab.parentId == 'M' || tab.parentId == 'L') {
					Ext.getCmp('resultTab').setHidden(true);
					if(tab.parentId == 'M'){
						Ext.getCmp('l_resultTab').setHidden(true);
						Ext.getCmp('m_resultTab').setHidden(false);
					}else if(tab.parentId == 'L'){
						Ext.getCmp('l_resultTab').setHidden(false);
						Ext.getCmp('m_resultTab').setHidden(true);
					}
					
				}else{
					Ext.getCmp('resultTab').setHidden(false);
					Ext.getCmp('l_resultTab').setHidden(true);
					Ext.getCmp('m_resultTab').setHidden(true);
				}
				

				
			}
		}
	}, {
		xtype: 'image',
		width: 59,
		height: 24,
		style: 'top: 5px; z-index: 2; right: 10px; position:absolute; cursor:pointer;',
		src: './resources/images/button/btn_exl.gif', // 엑셀 다운
		listeners: {
			el: {
				click: function () {

					// 로딩바 띄우기
					var winCtl = Ext.getCmp("searchResultWindow");
					//				var winCtl = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.RESULT.id);
					winCtl.mask("loading", "loading...");

					var tabCtl = Ext.getCmp("searchResultTab");
					tabCtl = tabCtl.items.items[1];
					var activeTab = tabCtl.getActiveTab();
					var gridContainer = activeTab.items.items[0];
					var grid = gridContainer.down('gridpanel');
					//				console.info(gridContainer);
					//				console.info(grid);
					//				if(!grid.download){
					//					grid.download = 'sleep';
					//				}

					var colArr = grid.getColumnManager().getColumns();

					var tabpanels = Ext.getCmp("tabpanels");

					var ClNodeName = tabpanels.activeTab.id;
					var ClNode = tabpanels.activeTab.parentId;
					var ClTitle = tabpanels.activeTab.title;
					ClTitle = ClTitle.split('(');

					if (tabpanels.activeTab.id == "searchResultPollLoad_container") {
						var value = Ext.getCmp("pollLoadSelect").value;

						if (value == "11") {
							colArr.splice(3, 4);
						} else if (value == "22") {
							colArr.splice(3, 3);
						} else if (value == "33") {
							colArr.splice(4, 2);
						} else {
							colArr = colArr;
						}

						ClNodeName = ClNodeName.split('_');
						ClNodeName = ClNodeName[0];

					} else {
						if (ClNodeName.split('_')[0] == "searchResultpollution") {
							ClNodeName = ClNodeName.split('_');
							ClNodeName = ClNodeName[0]
						} else {
							ClNodeName = ClNodeName.split('_');
							ClNodeName = ClNodeName[1];
						}
					}

					//엑셀다운 클릭 session
					//setActionInfo(ClNode, "", ClTitle[0], ClNodeName, "엑셀다운");
					
					//엑셀다운 클릭 session
					//var logLayerCode = parentId[0] != '' ? parentId[0] : parentId;
					//'인트라넷/보' , '타입' , '레이어코드' , '지점아이디', '계정'
					setActionInfo('W', 'E', ClNode, ClNodeName, $KRF_APP.loginInfo.userId);

					var hItem = grid.getHeaderContainer().config.items;
					var gItem = [];
					for (var i = 0; i < hItem.length; i++) {
						var item = hItem[i];
						if (item.columns) {
							gItem.push(item);
						}
					}

					var headName = [];
					var header = [];
					var datas = [];

					var dataArr = grid.getView().store.data.items
					if (!dataArr) {
						dataArr = store.data.map[1].value;

					}
					console.info(dataArr);
					for (var i = 0; i < dataArr.length; i++) {


						// khLee 수정 값 변경
						var strData = JSON.stringify(dataArr[i].data);
						//console.info(Object.values(dataArr[i].data));
						//고려 해봐야함    " : " 포함
						//if (strData == "888888888" || strData == "999999999") {
						if (strData.indexOf("\:888888888")) {
							strData = strData.replace(/888888888/gi, "\"\"");
						}

						if (strData.indexOf(':999999999')) {
							strData = strData.replace(/:999999999/gi, "\:\"정량한계미만\"");
						}


						//}
						var convertData = JSON.parse(strData);
						//datas.push(dataArr[i].data);
						datas.push(convertData);
					}

					var removeMem = []
					if (datas.length > 0) {
						var data = datas[0];
						for (var mem in data) {
							if (data[mem] instanceof Array) {
								removeMem.push(mem);
							}
						}

						// khLee parentId (레이어코드) 제외
						removeMem.push("parentId");
						//console.info(colArr);
						for (var i = 0; i < colArr.length; i++) {
							if (colArr[i].dataIndex != "") {
								var add = true;
								for (var k = 0; k < removeMem.length; k++) {
									if (removeMem[k] == colArr[i].dataIndex) {
										add = false;
										break;
									}

								}

								if (add) {
									var preText = '';
									for (var k = 0; k < gItem.length; k++) {
										var gCols = gItem[k];
										for (var j = 0; j < gCols.columns.length; j++) {
											var gc = gCols.columns[j];
											if (gc.dataIndex == colArr[i].dataIndex) {
												preText = gCols.text;
												break;
											}
										}
									}
									headName.push(preText + colArr[i].text);
									header.push(colArr[i].dataIndex);
								}
							}
						}
						//(kg/일)
						for (var i = 0; i < headName.length; i++) {
							if (headName[i].indexOf("(kg/일)") > -1)
								headName[i] = headName[i].replace("(kg/일)", "") + " (kg/일)";
						}
					} else {
						for (var i = 0; i < colArr.length; i++) {
							if (colArr[i].dataIndex != "") {
								var preText = '';
								for (var k = 0; k < gItem.length; k++) {
									var gCols = gItem[k];
									for (var j = 0; j < gCols.columns.length; j++) {
										var gc = gCols.columns[j];
										if (gc.dataIndex == colArr[i].dataIndex) {
											preText = gCols.text;
											break;
										}
									}
								}
								headName.push(preText + colArr[i].text);
								header.push(colArr[i].dataIndex);
							}
						}
					}

					//if(grid.download=='sleep'){
					this.status = 'download';
					//"./resources/jsp/excelDown.jsp"
					/*$.post(_API.excelDown, {headName:JSON.stringify(headName), header:JSON.stringify(header), datas:JSON.stringify(datas)}, function(data){
						//grid.download = 'download';
						$('#__fileDownloadIframe__').remove();
						$('body').append('<iframe src='+data.url+' id="__fileDownloadIframe__" name="__fileDownloadIframe__" width="0" height="0" style="display:none;"/>');
						
						// 로딩바 숨김
						winCtl.unmask();
							},"json").error(function(){
								//grid.download = 'download';
							});*/
					var catLayerNm = $KRF_APP.global.CommFn.catLayerNmMap[ClNode];
					catLayerNm = catLayerNm == null ? "" : catLayerNm + "_";
					$KRF_APP.global.CommFn.excelDown(catLayerNm + ClTitle[0], headName, header, datas);
					winCtl.unmask();
					//				}else{
					//					alert("다운로드중입니다.");
					//				}

				}
			}
		}
	}]

});
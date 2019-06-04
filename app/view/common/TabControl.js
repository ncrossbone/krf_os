Ext.define('krf_new.view.common.TabControl', {

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
			id: 'resultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: "combo",
				id: "select_B001",
				store: Ext.create('Ext.data.Store', {
					fields: ['label', 'value'],
					data: [['미확정자료 보기', '01'], ['확정자료 보기', '02']]
				}),
				displayField: 'label',
				valueField: 'value',
				width: 150,
				editable: false,
				hidden: true,
				value: "01"
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbStartYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbStartMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'combo',
				id: 'cmbStartBan',
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: '1', name: '상' }
						, { id: '2', name: '하' }]
				}),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				id: 'startLabel',
				text: '월'
			}, {
				xtype: "panel",
				id: "startDayTime",
				border: false,
				hidden: true,
				layout: {
					type: "hbox",
					align: 'middle'
				},
				items: [{
					xtype: 'combo',
					id: "startDay",
					store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
					editable: false,
					value: "30",
					width: 50
				}, {
					xtype: "label",
					text: "일"
				}, {
					xtype: 'combo',
					id: "startTime",
					store: $KRF_APP.global.CommFn.bindComboHour("Asc", ""),
					editable: false,
					width: 50
				}, {
					xtype: "label",
					text: "시"
				}]
			}, {
				xtype: "panel",
				id: "hStartDayPanel",
				style: 'margin-left: 10px;',
				border: false,
				hidden: true,
				layout: {
					type: "hbox",
					align: 'middle'
				},
				items: [{
					xtype: 'combo',
					id: "hStartDay",
					store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
					editable: false,
					value: "30",
					width: 50
				}, {
					xtype: "label",
					text: "일"
				}]
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbEndYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbEndMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'combo',
				id: 'cmbEndBan',
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: '1', name: '상' }
						, { id: '2', name: '하' }]
				}),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				id: 'endLabel',
				text: '월'
			}, {
				xtype: "panel",
				border: false,
				hidden: true,
				id: "endDayTime",
				layout: {
					type: "hbox",
					align: "center"
				},
				items: [{
					xtype: 'combo',
					id: "endDay",
					store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
					editable: false,
					value: "30",
					width: 50
				}, {
					xtype: "label",
					text: "일"
				}, {
					xtype: 'combo',
					id: "endTime",
					store: $KRF_APP.global.CommFn.bindComboHour("Asc", ""),
					editable: false,
					value: "23",
					width: 50
				}, {
					xtype: "label",
					text: "시"
				}]
			}, {
				xtype: "panel",
				border: false,
				hidden: true,
				style: 'margin-left: 10px;',
				id: "hEndDayPanel",
				layout: {
					type: "hbox",
					align: "center"
				},
				items: [{
					xtype: 'combo',
					id: "hEndDay",
					store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
					editable: false,
					value: "30",
					width: 50
				}, {
					xtype: "label",
					text: "일"
				}]
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'sstgCombo',
				valueField: 'id',
				displayField: 'name',
				listeners: {
					select: function () {

						$KRF_APP.btnFlag = "noDate";
						var tabCtl = Ext.getCmp("searchResultTab");
						tabCtl = tabCtl.items.items[1];
						var activeTab = tabCtl.getActiveTab();

						// 검색조건 셋팅 (필수!!)
						$KRF_APP.global.TabFn.searchConditionSet(activeTab.down("grid"));

						var gridContainer = activeTab.items.items[0];
						var gridCtl = gridContainer.items.items[0];
						if (gridCtl.parentIds[0].parentId == undefined) {
							var parentId = gridCtl.parentIds
						} else {
							var parentId = gridCtl.parentIds[0].parentId
						}

						var gridId = activeTab.id.replace("_container", ""); // _container는 common.ShowSearchResult 에서 붙이는걸로...
						var title = activeTab.title.split('(');

						//setActionInfo(parentId[0], parentId, title[0], "", "검색결과");
						var logLayerCode = parentId[0] != '' ? parentId[0] : parentId;
						//'인트라넷/보' , '타입' , '레이어코드' , '지점아이디', '계정'
						setActionInfo('W', 'R', logLayerCode, title[0], $KRF_APP.loginInfo.userId);


						ShowSearchResult(gridCtl.siteIds, parentId, "", gridId, "", undefined, false);
					}
				}
			}, {
				xtype: 'button',
				text: '이력보기',
				id: 'sstgDetailViewBtn',
				listeners: {
					el: {
						click: function () {
							$KRF_APP.global.SstgGridFn.sstgDetailInit();
						}
					}
				}
			}, {
				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function () {

							var fName = Ext.getCmp("F_CHANGE");
							var tabCtl = Ext.getCmp("searchResultTab");
							tabCtl = tabCtl.items.items[1];
							var activeTab = tabCtl.getActiveTab();

							// 검색조건 셋팅 (필수!!)
							$KRF_APP.global.TabFn.searchConditionSet(activeTab.down("grid"));

							var gridContainer = activeTab.items.items[0];
							var gridCtl = gridContainer.items.items[0];

							if (gridCtl.parentIds[0].parentId == undefined) {
								var parentId = gridCtl.parentIds
							} else {
								var parentId = gridCtl.parentIds[0].parentId
							}

							var gridId = activeTab.id.replace("_container", ""); // _container는 common.ShowSearchResult 에서 붙이는걸로...

							$KRF_APP.btnFlag = "date";

							var title = activeTab.title.split('(');

							//setActionInfo(parentId[0], parentId, title[0], "", "검색결과");

							var logLayerCode = parentId[0] != '' ? parentId[0] : parentId;
							//'인트라넷/보' , '타입' , '레이어코드' , '지점아이디', '계정'
							setActionInfo('W', 'R', logLayerCode, title[0], $KRF_APP.loginInfo.userId);
							ShowSearchResult(gridCtl.siteIds, parentId, "", gridId, fName.value, undefined, false);
						}
					}
				}
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'F_CHANGE',
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: '1', name: '방류유량' }
						, { id: '2', name: '직접이송량' }
						, { id: '3', name: '총유입량' }
						, { id: '4', name: '관거이송량' }]
				}),
				//store: ['', '관거이송량','방류유량','직접이송량','총유입량'],
				value: '방류유량',
				width: 100,
				height: 19,
				hidden: true,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					change: function () {

						$KRF_APP.btnFlag = "noDate";

						var fName = Ext.getCmp("F_CHANGE");
						var tabCtl = Ext.getCmp("searchResultTab");
						tabCtl = tabCtl.items.items[1];
						var activeTab = tabCtl.getActiveTab();
						var gridContainer = activeTab.items.items[0];
						var gridCtl = gridContainer.items.items[0];
						if (gridCtl.parentIds[0].parentId == undefined) {
							var parentId = gridCtl.parentIds
						} else {
							var parentId = gridCtl.parentIds[0].parentId
						}

						var gridId = activeTab.id.replace("_container", ""); // _container는 common.ShowSearchResult 에서 붙이는걸로...

						ShowSearchResult(gridCtl.siteIds, parentId, "", gridId, fName.value);
					}
				}


			}]
		}, {
			xtype: 'container',
			id: 'm_resultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'm_StartYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'm_StartMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'combo',
				id: "m_StartDay",
				store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
				editable: false,
				width: 50
			}, {
				xtype: "label",
				text: "일 부터"
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'm_EndYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'm_EndMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'combo',
				id: "m_EndDay",
				store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
				editable: false,
				width: 50
			}, {
				xtype: "label",
				text: "일 까지"
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function () {
							$KRF_APP.global.TabFn.goSearch();
						}
					}
				}
			}]
		}, {
			xtype: 'container',
			id: 'l_resultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'l_StartYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'l_StartMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: "label",
				text: " ~ "
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'l_EndYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'l_EndMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: "label",
				text: "일"
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function () {
							$KRF_APP.global.TabFn.goSearch();
						}
					}
				}
			}]
		}, {
			xtype: 'container',
			id: 'q_resultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'q_StartYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'q_StartMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: "label",
				text: " ~ "
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'q_EndYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'q_EndMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function () {
							$KRF_APP.global.TabFn.goSearch();
						}
					}
				}
			}]
		}, {
			xtype: 'container',
			id: 'z_resultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'z_StartYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'z_StartMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: "label",
				text: " ~ "
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'z_EndYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'z_EndMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function () {
							$KRF_APP.global.TabFn.goSearch();
						}
					}
				}
			}, {
				id: 'bunInfoBtn',
				xtype: 'button',
				style: 'margin-left:5px; box-sizing:border-box; background: #263352; color: #fff; font-size: 15px; font-family:\'notokr-regular\'; text-align: center; padding: 3px 0; border-radius:3px; border:none;',
				text: '분석정보'
			}, {
				xtype: 'button',
				style: 'margin-left:5px; box-sizing:border-box; background: #263352; color: #fff; font-size: 15px; font-family:\'notokr-regular\'; text-align: center; padding: 3px 0; border-radius:3px; border:none;',
				id: 'danInfoBtn',
				text: '단면정보'
			}, {
				xtype: 'button',
				style: 'margin-left:5px; box-sizing:border-box; background: #263352; color: #fff; font-size: 15px; font-family:\'notokr-regular\'; text-align: center; padding: 3px 0; border-radius:3px; border:none;',
				id: 'joInfoBtn',
				text: '조사정보'
			}]
		}, {
			xtype: 'container',
			width: 10
		}, { //방유량 검색 조건 / 집수구역
			xtype: 'container',
			id: 'pollResultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			//flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollLoadSelect',
				valueField: 'id',
				displayField: 'name',
				//id: 'cmbStartYear',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: '11', name: '총괄표' }
						, { id: '22', name: '표준유역단위 보기' }
						, { id: '33', name: '집수구역단위 보기' }
						, { id: '44', name: '집수구역단위 상세보기' }]
				}),
				value: '11',
				width: 170,
				height: 25
			}]
		}, {
			xtype: 'container',
			width: 10
		}, {
			//방유량  (년도/검색)버튼
			xtype: 'container',
			id: 'pollSearchTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollYear',
				store: ['2013', '2012', '2011', '2010'],
				value: '2013',
				width: 80,
				height: 25
			}, {
				xtype: 'container',
				width: 10
			}, {

				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function () {
							//pdj
							var pollLoadSelect = Ext.getCmp("pollLoadSelect");
							PollLoadSearchResult(pollLoadSelect.lastValue);

							//setActionInfo("pollLoad", "pollLoad", "부하량", "", "검색결과");

							//'인트라넷/보' , '타입' , '레이어코드' , '지점아이디', '계정'
							setActionInfo('W', 'R', 'pollLoad', 'pollLoad', $KRF_APP.loginInfo.userId);

							//PollLoadSearchResult();
						}
					}
				}

			}]
		},


		//오염원  (년도/검색)버튼
		{
			xtype: 'container',
			id: 'pollutionResultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			//flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollutionSelect',
				valueField: 'id',
				displayField: 'name',
				//id: 'cmbStartYear',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: '11', name: '총괄표' }
						, { id: '22', name: '표준유역단위 보기' }
						, { id: '33', name: '집수구역단위 보기' }
						, { id: '44', name: '집수구역단위 상세보기' }]
				}),
				value: '11',
				width: 170,
				height: 25
			}]
		}, {
			xtype: 'container',
			width: 10
		}, {
			xtype: 'container',
			id: 'pollutionSearchTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollutionYear',
				store: ['2015', '2014', '2013', '2012', '2011'],
				value: '2015',
				width: 80,
				height: 25
			}, {
				xtype: 'container',
				width: 10
			}, {

				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function () {



							var tabCtl = Ext.getCmp("searchResultTab");
							tabCtl = tabCtl.items.items[1];
							var activeTab = tabCtl.getActiveTab();

							var pollutionYear = Ext.getCmp("pollutionYear").value;
							//pdj
							var pollutionSelect = Ext.getCmp("pollutionSelect");

							//setActionInfo("pollution", "pollution", "오염원", "", "검색결과");

							setActionInfo('W', 'R', 'pollution', 'pollution', $KRF_APP.loginInfo.userId);

							PollutionSearchResult(pollutionSelect.lastValue, activeTab.recordId, activeTab.title, activeTab.storeNm, pollutionYear);
						}
					}
				}

			}]




		},/*{
			xtype: 'image',
			width: 48,
			height: 14,
			src: './resources/images/button/btn01.gif' // 라벨
		}, {
			xtype: 'container',
			width: 10
		}, {
			xtype: 'combo',
			store: ['항목선택', 'BOD', 'DO', 'COD', 'T-N', 'T-P', '수온'],
			value: '항목선택',
			listeners: {
				change: function(combo, newVal, oldVal){
					// 피처 레이어 생성/갱신
					//KRF_DEV.getApplication().fireEvent('Reach_TestOnOff', "DynamicLayerAdmin_ReachTest", newVal, 1);
					KRF_DEV.getApplication().fireEvent('selectMapDisplayType',  newVal, 1);
				}
			},
			width: 100,
			height: 25
		},*/ {
			xtype: 'container',
			width: 120
		}, {
			xtype: 'container',
			width: 10
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

				if (tab.parentId == 'M' || tab.parentId == 'L' || tab.parentId == 'Q' || tab.parentId == 'Z') {
					Ext.getCmp('resultTab').setHidden(true);
					if (tab.parentId == 'M') {
						Ext.getCmp('l_resultTab').setHidden(true);
						Ext.getCmp('m_resultTab').setHidden(false);
						Ext.getCmp('q_resultTab').setHidden(true);
						Ext.getCmp('z_resultTab').setHidden(true);
					} else if (tab.parentId == 'L') {
						Ext.getCmp('l_resultTab').setHidden(false);
						Ext.getCmp('m_resultTab').setHidden(true);
						Ext.getCmp('q_resultTab').setHidden(true);
						Ext.getCmp('z_resultTab').setHidden(true);
					} else if (tab.parentId == 'Q') {
						Ext.getCmp('l_resultTab').setHidden(true);
						Ext.getCmp('m_resultTab').setHidden(true);
						Ext.getCmp('q_resultTab').setHidden(false);
						Ext.getCmp('z_resultTab').setHidden(true);
					} else if (tab.parentId == 'Z') {
						Ext.getCmp('l_resultTab').setHidden(true);
						Ext.getCmp('m_resultTab').setHidden(true);
						Ext.getCmp('q_resultTab').setHidden(true);
						Ext.getCmp('z_resultTab').setHidden(false);

						var showConfing = {
							'Z001': ['bunInfoBtn', 'joInfoBtn'], //어류
							'Z002': ['bunInfoBtn', 'danInfoBtn', 'joInfoBtn'], //수변식생
							'Z003': ['bunInfoBtn', 'joInfoBtn'], //저서형
							'Z004': ['joInfoBtn'], //수질
							'Z005': ['bunInfoBtn', 'joInfoBtn'], //동물
							'Z006': ['bunInfoBtn', 'joInfoBtn'] //식물
						};

						var btnArr = ['bunInfoBtn', 'danInfoBtn', 'joInfoBtn'];

						for (var i = 0; i < btnArr.length; i++) {
							showConfing[tab.realParentId].indexOf(btnArr[i]) > -1 ? Ext.getCmp(btnArr[i]).setHidden(false) : Ext.getCmp(btnArr[i]).setHidden(true);
						}
					}
				} else {
					Ext.getCmp('resultTab').setHidden(false);
					Ext.getCmp('l_resultTab').setHidden(true);
					Ext.getCmp('m_resultTab').setHidden(true);
					Ext.getCmp('q_resultTab').setHidden(true);
					Ext.getCmp('z_resultTab').setHidden(true);
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
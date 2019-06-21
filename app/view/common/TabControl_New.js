Ext.define('krf_new.view.common.TabControl_New', {

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
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_A',
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
				id: 'startMonth_A',
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
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'endYear_A',
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
				id: 'endMonth_A',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 15
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
		},{
			xtype: 'container', 
			id: 'resultTab_B',
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_B',
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
				id: 'startMonth_B',
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
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'endYear_B',
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
				id: 'endMonth_B',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 15
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
		},{
			xtype: 'container', 
			id: 'resultTab_C',
			hidden: true,
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
			},{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_C',
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
				id: 'startBan_C',
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
				text: '반기'
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
				id: 'endYear_C',
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
				id: 'endBan_C',
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
				text: '반기'
			}, {
				xtype: 'container',
				width: 15
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
		},{
			xtype: 'container', 
			id: 'resultTab_D',
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_D',
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
				id: 'startMonth_D',
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
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'endYear_D',
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
				id: 'endMonth_D',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 15
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
		},{
			xtype: 'container', 
			id: 'resultTab_E',
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_E',
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
				id: 'startBan_E',
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
				text: '반기'
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
				id: 'endYear_E', 
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
				id: 'endBan_E',
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
				text: '반기'
			}, {
				xtype: 'container',
				width: 15
			},{
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
		},{
			xtype: 'container', 
			id: 'resultTab_F',
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_F',
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
				id: 'startMonth_F',
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
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'endYear_F',
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
				id: 'endMonth_F',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			},{
				xtype: 'container',
				width: 15
			},{
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
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					change: function () {

						console.info('change');

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


			}, {
				xtype: 'container',
				width: 15
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
		},{
			xtype: 'container', 
			id: 'resultTab_G',
			hidden: true,
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
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_H',
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
				id: 'startMonth_H',
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
				xtype: 'combo',
				id: "startDay_H",
				store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
				editable: false,
				width: 50
			}, {
				xtype: "label",
				text: "일"
			}, {
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'endYear_H',
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
				id: 'endMonth_H',
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
				xtype: 'combo',
				id: "endDay_H",
				store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
				editable: false,
				width: 50
			}, {
				xtype: "label",
				text: "일"
			}, {
				xtype: 'container',
				width: 15
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
		},{
			xtype: 'container', 
			id: 'resultTab_I',
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_I',
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
				id: 'startMonth_I',
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
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'endYear_I',
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
				id: 'endMonth_I',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 15
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
			id: 'resultTab_M',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_M',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'startMonth_M',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'combo',
				id: "startDay_M",
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
				id: 'endYear_M',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'endMonth_M',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'combo',
				id: "endDay_M",
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
			id: 'resultTab_L',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_L',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'startMonth_L',
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
				id: 'endYear_L',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'endMonth_L',
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
			id: 'resultTab_K',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_K',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'startMonth_K',
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
				id: 'endYear_K',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'endMonth_K',
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
			id: 'resultTab_Q',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			},{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_Q',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'startMonth_Q',
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
				id: 'endYear_Q',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'endMonth_Q',
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
			id: 'resultTab_Z',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			},{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'startYear_Z',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'startMonth_Z',
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
				id: 'endYear_Z',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'combo',
				id: 'endMonth_Z',
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
				text: '분석정보',
				listeners: {
					el: {
						click: function () {
							$KRF_APP.global.CommFn.setDataForZ(this.id);
						}
					}
				}
			}, {
				xtype: 'button',
				style: 'margin-left:5px; box-sizing:border-box; background: #263352; color: #fff; font-size: 15px; font-family:\'notokr-regular\'; text-align: center; padding: 3px 0; border-radius:3px; border:none;',
				id: 'danInfoBtn',
				text: '단면정보',
				listeners: {
					el: {
						click: function () {
							$KRF_APP.global.CommFn.setDataForZ(this.id);
						}
					}
				}
			}, {
				xtype: 'button',
				style: 'margin-left:5px; box-sizing:border-box; background: #263352; color: #fff; font-size: 15px; font-family:\'notokr-regular\'; text-align: center; padding: 3px 0; border-radius:3px; border:none;',
				id: 'joInfoBtn',
				text: '조사정보',
				listeners: {
					el: {
						click: function () {
							$KRF_APP.global.CommFn.setDataForZ(this.id);
						}
					}
				}
			}]
		},{
			xtype: 'container', 
			id: 'resultTab_PollLoad', //부하량
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			},{
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
		},{
			xtype: 'container', 
			id: 'resultTab_Pollution',//오염원
			hidden: true,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'label',
				text: '기간'
			},{
				xtype: 'combo',
				id: 'pollutionSelect',
				valueField: 'id',
				displayField: 'name',
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
			},{
				xtype: 'container',
				width: 10
			},{
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
				
				console.info(tabPanel);
				console.info(tab);
				console.info(tab.initialConfig.parentId);

				var nodeId = "";

				if(tab.initialConfig.id == "searchResultPollLoad_container"){//부하량
					nodeId = "PollLoad";//부하량
				}else if(tab.initialConfig.id == "searchResultpollution_01_container"//오염원
						||tab.initialConfig.id == "searchResultpollution_02_container"
						||tab.initialConfig.id == "searchResultpollution_03_container"
						||tab.initialConfig.id == "searchResultpollution_04_container"
						||tab.initialConfig.id == "searchResultpollution_05_container"
						||tab.initialConfig.id == "searchResultpollution_06_container"
						||tab.initialConfig.id == "searchResultpollution_07_container"){

					nodeId = "Pollution";//오염원

				}else if(tab.initialConfig.parentId != undefined){
					nodeId = tab.initialConfig.parentId.substring(0,1);
				};

				



				Ext.getCmp('tabCondition').items.items.map(function(tabList){
					if(nodeId){
						if(tabList.id == 'resultTab_'+nodeId){
							tabList.setHidden(false);//탭 visible

							
							//수생태 combo 처리
							var sstgCombo = Ext.getCmp("sstgCombo");
							if (nodeId == "E") {
								if (tab.realParentId[0].parentId != undefined) {
									var store = $KRF_APP.global.CommFn.getSstgComboInfo(tab.realParentId[0].parentId);
									sstgCombo.setStore(store);
								}

							}


						}else{
							tabList.setHidden(true);
						}
					}else{
						tabList.setHidden(true);
					}
				});

				
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
					//console.info(dataArr);
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
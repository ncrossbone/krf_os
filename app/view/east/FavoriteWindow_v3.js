Ext.define('krf_new.view.east.FavoriteWindow_v3', {
	extend: 'Ext.window.Window',

	xtype: 'east-favoritewindow',

	cls: 'subWindow-x-form-item-label-default',

	header: { cls: 'subWindow-x-form-item-label-default' },

	id: 'Favorite',

	title: '즐겨찾기',

	//	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//bodyStyle: 'border: 0px;',

	layout: {
		type: 'fit'
	},

	coreMap: null,
	gridStore: null,
	favoriteInfo: null,
	constrain: true,
	resizable: false,
	width: 400,
	height: 305,
	x: 390,
	y: Ext.getBody().getViewSize().height - 305,
	onEsc: false,
	
	listeners: {
		close: function () {
			var currCtl = Ext.getCmp("btnFavorites");
			if (currCtl.btnOnOff == "on") {
				SetBtnOnOff(currCtl.id);
			}
		},
		afterrender: function () {

			//self.favoriteInfo = [];
			//localStorage['_waterFavoriteInfo_'] = [];
			var me = this;
			Date.prototype.yyyymmdd = function () {
				var yyyy = this.getFullYear().toString();
				var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
				var dd = this.getDate().toString();
				return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
			};
			this.coreMap = GetCoreMap();
			this.gridStore = this.down('gridpanel').getStore();

			this.getBookmark();
			// if (localStorage['_waterFavoriteInfo_']) {
			// 	this.favoriteInfo = JSON.parse(localStorage['_waterFavoriteInfo_']);

			// 	for (var i = 0; i < this.favoriteInfo.length; i++) {
			// 		var obj = this.favoriteInfo[i];
			// 		delete obj.id;
			// 	}
			// 	//console.info(this.favoriteInfo);
			// 	this.gridStore.loadData(this.favoriteInfo);
			// } else {
			// 	localStorage['_waterFavoriteInfo_'] = JSON.stringify([]);
			// 	//localStorage['_waterFavoriteInfo_'] = [];
			// 	this.favoriteInfo = JSON.parse(localStorage['_waterFavoriteInfo_']);
			// 	//this.favoriteInfo = localStorage['_waterFavoriteInfo_'];
			// }
			// require(["dojox/uuid/generateRandomUuid"], function () { });
		}
	},

	cloneGraphicArr: function (arr) {
		var cArr = [];
		for (var i = 0; i < arr.length; i++) {
			cArr.push(JSON.stringify(arr[i]));
			//console.info(arr[i]);
			//cArr.push(arr[i]);
			//console.info(cArr);
		}
		return cArr;
	},

	callAjax: function (url, param) {
		param.userId = 'testid';
		return $.ajax({
			url: _API.Bookmark + url,
			data: param,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			type: 'post'
		});
	},

	getBookmark: function () {
		var me = this;
		var def = new $.Deferred;

		this.callAjax('getBookmark', {}).done(function (obj) {
			def.resolve();
			me.writeBookmark(obj);
		}).fail(function () {
			alert('즐겨찾기 로드 실패');
			def.reject();
		});

		return def.promise();
	},

	writeBookmark: function (obj) {
		var me = this;
		var jsonObj = JSON.parse(obj).data;
		if (jsonObj.length > 0) {
			var arr = [];
			for (var i = 0; i < jsonObj.length; i++) {
				if (jsonObj[i].RM) {
					var rm = JSON.parse(jsonObj[i].RM);
					rm.sn = jsonObj[i].SN;
					arr.push(rm);
				}
			}
			me.gridStore.loadData(arr);
		} else {
			me.gridStore.loadData([]);
		}
	},

	/* 이미지 버튼 on 가져오기 */
	getImgBtnOnId: function () {
		var imgBtnGrpArr = ['west-button', 'searchAreaButton', 'reachToolbar'];
		var imgBtnArr = [];

		for (var i = 0; i < imgBtnGrpArr.length; i++) {
			var imgBtnGrp = Ext.getCmp(imgBtnGrpArr[i]);
			if (imgBtnGrp) {
				var imgBtn = imgBtnGrp.query('image');

				for (var j = 0; j < imgBtn.length; j++) {
					var btnOnOff = imgBtn[j].btnOnOff;
					if (btnOnOff) {
						var btnId = imgBtn[j].id;
						if (btnId != 'btnMenu07' && btnId != 'btnMenu06' && btnId != 'btnMenu05' &&
							btnId != 'btnMenu04' && btnId != 'btnMenu09' && btnId != 'btnMenu03' && btnId != 'btnMenu02') {
							if (btnOnOff == 'on') {
								imgBtnArr.push(btnId);
							}
						}
					}
				}
			}

		}
		return imgBtnArr;
	},

	items: [{
		xtype: 'form',
		cls: 'khLee-x-form',
		height: 100,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [
			{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				height: 20
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				items: [{
					id: 'favor-text',
					layerId: '54',
					xtype: 'textfield',
					fieldLabel: '&nbsp;<img src="./resources/images/button/blit_st_01.png" /> <b>저장명:</b> ',
					//labelWidth: 60,
					labelAlign: 'right',
					labelPad: 10,
					//width: 200,
					editable: true

				}, {
					xtype: 'container',
					width: 10
				}, {
					xtype: 'button',
					text: '저장',
					style: '    background: #405166; border-color: #405166 !important;',
					listeners: {
						click: function () {
							var saveName = Ext.getCmp('favor-text').lastValue;

							if (saveName == '') {
								return alert('저장명을 입력하세요.');
							}

							var krf = $KRF_APP;

							var favorObj = {};

							var date = new Date();

							var favorWin = Ext.getCmp('Favorite');

							/* 검색 콤보박스 */
							var cmbCfg = ['cmbWater1', 'cmbWater2', 'cmbWater3', 'cmbArea1', 'cmbArea2', 'cmbArea3']
							var cmbArr = [];

							for (var i = 0; i < cmbCfg.length; i++) {
								var cmb = Ext.getCmp(cmbCfg[i]);
								if (cmb.disabled == false && cmb.lastValue != null) {
									var childCom = Ext.getCmp(cmb.tarCmbId);
									var childValue = null;
									if (childCom) {
										childValue = childCom.lastValue;
									}
									cmbArr.push({ id: cmb.id, value: cmb.lastValue, childValue: childValue });
								}
							}

							/* 윈도우 on/off */
							var winCfg = ['siteListWindow', 'searchResultWindow', 'windowSiteNChart'];
							var winArr = [];

							for (var i = 0; i < winCfg.length; i++) {
								var win = Ext.getCmp(winCfg[i]);
								if (win != undefined) {
									winArr.push({ winId: winCfg[i], hidden: win.hidden });
								}
							}

							favorObj.cmb = cmbArr;
							favorObj.win = winArr;
							favorObj.date = date.yyyymmdd();
							favorObj.name = saveName;
							favorObj.imgBtnOnId = favorWin.getImgBtnOnId();
							favorObj.result = $KRF_APP.global.CommFn.getBookmarkInfo();

							favorObj.geoInfo = {
								extent: krf.coreMap.map.extent.toJson(),
								level: krf.coreMap.map.getLevel()
							};

							var jsonStr = JSON.stringify(favorObj);

							favorWin.callAjax('putBookmark', { param: jsonStr }).done(function () {
								favorWin.getBookmark();
							}).fail(function () {
								alert('저장을 실패했습니다.');
							});

							//							Ext.getCmp(id).fireEvent('select',Ext.getCmp(id),value);

							//기존 즐겨찾기
							/*var saveName = Ext.getCmp('favor-text').lastValue;
							if (saveName != '') {
								var krf = $KRF_APP;

								var favorWindow = Ext.getCmp('Favorite');

								var extent = krf.coreMap.map.extent;
								var level = krf.coreMap.map.getLevel();
								var date = new Date();

								var reachLineGArr = [];
								if ($KRF_APP.coreMap._krad.lineGrpLayer) {
									var reachLineGraphicArr = $KRF_APP.coreMap._krad.lineGrpLayer.graphics;
									for (var i = 0; i < reachLineGraphicArr.length; i++) {
										reachLineGArr.push(JSON.stringify(reachLineGraphicArr[i].toJson()));
									}
								}

								var reachAreaGArr = [];
								if ($KRF_APP.coreMap._krad.areaGrpLayer) {
									var reachAreaGraphicArr = $KRF_APP.coreMap._krad.areaGrpLayer.graphics;
									for (var i = 0; i < reachAreaGraphicArr.length; i++) {
										reachAreaGArr.push(JSON.stringify(reachAreaGraphicArr[i].toJson()));
									}
								}

								var pointGArr = [];
								if ($KRF_APP.coreMap._krad.tmpGrpLayer) {
									var pointGraphicArr = $KRF_APP.coreMap._krad.tmpGrpLayer.graphics;
									for (var i = 0; i < pointGraphicArr.length; i++) {
										pointGArr.push(JSON.stringify(pointGraphicArr[i].toJson()));
									}
								}

								var symbolGArr = [];
								if ($KRF_APP.coreMap._krad.symGrpLayer) {
									var symbolGraphicArr = $KRF_APP.coreMap._krad.symGrpLayer.graphics;
									for (var i = 0; i < symbolGraphicArr.length; i++) {
										symbolGArr.push(JSON.stringify(symbolGraphicArr[i].toJson()));
									}
								}

								var downLineGArr = [];
								if ($KRF_APP.coreMap._krad.downGrpLayer) {
									var downGraphicArr = $KRF_APP.coreMap._krad.downGrpLayer.graphics;
									for (var i = 0; i < downGraphicArr.length; i++) {
										downLineGArr.push(JSON.stringify(downGraphicArr[i].toJson()));
									}
								}

								var yyyymmdd = date.yyyymmdd();
								var saveObj = {
									UID: dojo.dojox.uuid.generateRandomUuid(), NAME: saveName, DATE: yyyymmdd, EXTENT: extent.toJson(), LEVEL: level,
									reachLineGArr: reachLineGArr,
									reachAreaGArr: reachAreaGArr,
									pointGArr: pointGArr,
									symbolGArr: symbolGArr,
									downLineGArr: downLineGArr
								};
								
								favorWindow.favoriteInfo.push(saveObj);
								localStorage['_waterFavoriteInfo_'] = JSON.stringify(favorWindow.favoriteInfo);*/

							//favorWindow.gridStore.loadData(favorWindow.favoriteInfo);
							/*} else {
								alert('저장명을 입력하세요.');
							}*/
						}
					}
				}]
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				height: 20
			},

			{
				xtype: 'gridpanel',
				id: 'bookmark-grid',
				flex: 1,
				autoScroll: true,
				store: Ext.create('Ext.data.Store', {
					fields: ['name', 'date']
				}),
				columns: [
					{
						xtype: 'gridcolumn',
						dataIndex: 'name',
						text: '저장명',
						flex: 1
					},
					{
						xtype: 'gridcolumn',
						dataIndex: 'date',
						text: '저장일'
					}
				],
				dockedItems: [{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{
							xtype: 'tbfill'
						}, {
							xtype: 'button',
							text: '삭제',
							listeners: {
								click: function () {
									var bookmarkGrid = Ext.getCmp('bookmark-grid');

									if (bookmarkGrid == null || bookmarkGrid.selection == null) {
										return;
									}
									var favorWin = Ext.getCmp('Favorite');

									favorWin.callAjax('deleteBookmark', { sn: bookmarkGrid.selection.getData().sn }).done(function () {
										favorWin.getBookmark();
									}).fail(function () {
										alert('즐겨찾기 삭제 실패');
									});

								}
							}
						}, {
							xtype: 'button',
							text: '불러오기',
							listeners: {
								click: function () {

									var bookmarkGrid = Ext.getCmp('bookmark-grid');

									if (bookmarkGrid == null || bookmarkGrid.selection == null) {
										return;
									}
									var selectData = bookmarkGrid.selection.data;
									var krf = $KRF_APP;

									krf.coreMap.map.setExtent(new esri.geometry.Extent(selectData.geoInfo.extent), true).then(function () {
										krf.coreMap.map.setLevel(selectData.geoInfo.level);

										if (selectData.cmb.length > 0) {
											for (var i = 0; i < selectData.cmb.length; i++) {
												var comInstance = Ext.getCmp(selectData.cmb[i].id);
												var comStore = comInstance.getStore();
												comStore.selectedValue = selectData.cmb[i].value;
												var comboDatas = comStore.getData();

												if (comboDatas && comboDatas.length > 0) {
													comInstance.setValue(selectData.cmb[i].value);
												}
												
												comInstance.fireEvent('select', comInstance, selectData.cmb[i].value);
											}
										}

										if (selectData.result.spotList) {
											krf.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, {
												searchText: selectData.result.spotList.searchText,
												searchType: null,
												isBookmark: true,
												bookmarkData: selectData.result.spotList
											});
										}

										if (selectData.result.siteNChart) {
											var siteNChartData = selectData.result.siteNChart;
											ShowWindowSiteNChart(siteNChartData.tabIdx, siteNChartData.title, siteNChartData.test, siteNChartData.parentId, siteNChartData.chartFlag);
											if (selectData.result.siteMovePoint) {
												var siteMovePointData = selectData.result.siteMovePoint;
												siteMovePoint(siteMovePointData.parentNodeId, siteMovePointData.nodeId, siteMovePointData.clickValue);
											}
										}

										if (selectData.result.showSearchResultReach) {
											var showSearchResultReachData = selectData.result.showSearchResultReach;
											ShowSearchResultReach(showSearchResultReachData.catIds);
										}

										if (selectData.result.searchResult) {
											if (selectData.result.searchResult.length > 0) {
												var searchResultData = selectData.result.searchResult;

												for (var i = 0; i < searchResultData.length; i++) {
													ShowSearchResult(searchResultData[i].siteIds, searchResultData[i].parentIds, searchResultData[i].titleText, searchResultData[i].gridId, searchResultData[i].test, searchResultData[i].tooltipCk, searchResultData[i].isFirst);
												}

											}
										}
										var imgBtnObj = selectData.imgBtnOnId;

										for (var i = 0; i < imgBtnObj.length; i++) {
											var imgBtn = Ext.getCmp(imgBtnObj[i]);

											if (imgBtn.btnOnOff) {
												if (imgBtn.btnOnOff == 'off') {
													$('#' + imgBtnObj[i]).trigger('click');
												}
											}

										}

									});
									//var self = this.up('window');
									//var grid = self.down('gridpanel');
									//									var extentJson = grid.selection.data.EXTENT;
									//									var extent = new esri.geometry.Extent(extentJson);
									//									var level = grid.selection.data.LEVEL;
									//									self.coreMap.extentMove(extent, level);
									//if (grid == null || grid.selection == null) {
									//return;
									//}
									//self.coreMap.favoriteExe(grid.selection.data);
								}
							}
						}
					]
				}]
			}
		]
	}]
});
Ext.define('krf_new.view.east.FavoriteWindow_v3', {
	extend: 'Ext.window.Window',

	xtype: 'east-favoritewindow',

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
	width: 400,
	height: 305,
	x: 390,
	y: Ext.getBody().getViewSize().height - 305,

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

			Date.prototype.yyyymmdd = function () {
				var yyyy = this.getFullYear().toString();
				var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
				var dd = this.getDate().toString();
				return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
			};
			this.coreMap = GetCoreMap();
			this.gridStore = this.down('gridpanel').getStore();

			if (localStorage['_waterFavoriteInfo_']) {
				this.favoriteInfo = JSON.parse(localStorage['_waterFavoriteInfo_']);

				for (var i = 0; i < this.favoriteInfo.length; i++) {
					var obj = this.favoriteInfo[i];
					delete obj.id;
				}
				//console.info(this.favoriteInfo);
				this.gridStore.loadData(this.favoriteInfo);
			} else {
				localStorage['_waterFavoriteInfo_'] = JSON.stringify([]);
				//localStorage['_waterFavoriteInfo_'] = [];
				this.favoriteInfo = JSON.parse(localStorage['_waterFavoriteInfo_']);
				//this.favoriteInfo = localStorage['_waterFavoriteInfo_'];
			}
			require(["dojox/uuid/generateRandomUuid"], function () { });
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

	callAjax: function (jsonStr) {
		return $.ajax({
			url: _API + '',
			param: jsonStr,
			type: 'post',
			contentType: 'application/json'
		});
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

							var cmbCfg = ['cmbWater1', 'cmbWater2', 'cmbWater3', 'cmbArea1', 'cmbArea2', 'cmbArea3']
							var cmbArr = [];

							for (var i = 0; i < cmbCfg.length; i++) {
								var cmb = Ext.getCmp(cmbCfg[i]);
								if (cmb.disabled == false && cmb.lastValue != null) {
									cmbArr.push({ id: cmb.id, value: cmb.lastValue });
								}
							}

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
							favroObj.result = $KRF_APP.global.CommFn.getBookmarkInfo();

							favorObj.geoInfo = {
								extent: krf.coreMap.map.extent,
								level: krf.coreMap.map.getLevel()
							};

							favorWin.favoriteInfo.push(favorObj);
							var jsonStr = JSON.stringify(favorObj);
							//localStorage['_waterFavoriteInfo_'] = jsonStr;
							favorWin.callAjax(jsonStr).done(function () {
								favorWin.gridStore.loadData(favorWin.favoriteInfo);
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
				flex: 1,
				autoScroll: true,
				store: Ext.create('Ext.data.Store', {
					fields: ['UID', 'NAME', 'DATE', 'EXTENT', 'LEVEL']
				}),
				columns: [
					{
						xtype: 'gridcolumn',
						dataIndex: 'NAME',
						text: '저장명',
						flex: 1
					},
					{
						xtype: 'gridcolumn',
						dataIndex: 'DATE',
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
									var self = this.up('window');
									var grid = self.down('gridpanel');
									var uid = grid.selection.data.UID;
									var gridData = [];
									for (var i = 0; i < self.favoriteInfo.length; i++) {
										if (self.favoriteInfo[i].UID != uid) {
											gridData.push(self.favoriteInfo[i])
										}
									}
									self.favoriteInfo = gridData;
									localStorage['_waterFavoriteInfo_'] = JSON.stringify(self.favoriteInfo);
									//localStorage['_waterFavoriteInfo_'] = self.favoriteInfo;
									self.gridStore.loadData(self.favoriteInfo);
								}
							}
						}, {
							xtype: 'button',
							text: '불러오기',
							listeners: {
								click: function () {
									var self = this.up('window');
									var grid = self.down('gridpanel');
									//									var extentJson = grid.selection.data.EXTENT;
									//									var extent = new esri.geometry.Extent(extentJson);
									//									var level = grid.selection.data.LEVEL;
									//									self.coreMap.extentMove(extent, level);
									if (grid == null || grid.selection == null) {
										return;
									}
									self.coreMap.favoriteExe(grid.selection.data);
								}
							}
						}
					]
				}]
			}
		]
	}]
});
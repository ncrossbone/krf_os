Ext.define('krf_new.view.search.SearchArea_WaterController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_WaterController',

	control: {
		'#cmbWater1': {
			afterrender: 'onCombo1Render',
			select: 'onAreaChange'
		},
		'#cmbWater2': {
			select: 'onAreaChange'
		},
		'#cmbWater3': {
			select: 'onAreaChange'
		},
		'#cmbWater4': {
			afterrender: 'onComboBoRender'
		},
		'#btnWater1': {
			click: 'onAreaSearch'
		},
		'#btnWater2': {
			click: 'onAreaSearch'
		},
		'#btnWater3': {
			click: 'onAreaSearch'
		},
		'#btnWaterSelect': {
			click: 'onWaterSelect'
		},
		'#btnWaterReset': {
			click: 'onWaterReset'
		}
	},

	// 시도 랜더링 후
	onCombo1Render: function (combo) {
		this.setComboData(combo.id, "");

	},

	// 보 랜더링
	onComboBoRender: function(combo, record, parentId, comboValue){
		this.setComboData(combo.id, parentId, comboValue);
	},

	// 콤보 체인지
	onAreaChange: function (combo, record, parentId, comboValue) {

		var lnkBtn = Ext.getCmp(combo.lnkBtnId);
		if(combo.lnkBtnId == "btnWater1"){// 대권역 선택시 보 change
			this.boComboChange(record.data.id);
		}

		if (lnkBtn) {
			lnkBtn.setDisabled(false);
		}

		if (combo.tarCmbId == null || combo.tarCmbId == '') {
			return;
		}

		if (record && record.data) {
			this.setComboData(combo.tarCmbId, record.data.id);
		} else {
			this.setComboData(combo.tarCmbId, parentId, comboValue);
		}
	},

	// 대권역 선택시 보 comboBox change
	boComboChange: function(value){ //  value ==  대권역 코드
		var boCombo = Ext.getCmp('cmbWater4');

		

		var storeData = [];

		for(var a = 0 ; a <  $KRF_APP.boObj.length ; a++){
			if($KRF_APP.boObj[a].wSys == value){
				for(var i  = 0 ; i < $KRF_APP.BO_STORE.length ; i ++){
					if($KRF_APP.boObj[a].ptNo == $KRF_APP.BO_STORE[i].id){
						storeData.push($KRF_APP.BO_STORE[i]);
					}
				}		
			}
		}

		boCombo.getStore().setData(storeData);

	},

	setComboData: function (comboId, id, comboValue) {
		var combo = Ext.getCmp(comboId);
		var store = combo.getStore();

		store.layerId = combo.layerId; // 타겟 콤보 레이어 아이디
		store.parentId = id;

		store.customOnLoaded = function () {
			combo.reset();
			combo.setDisabled(false);
			if (comboValue) {
				combo.setValue(comboValue);
				var lnkBtn = Ext.getCmp(combo.lnkBtnId);
				lnkBtn.setDisabled(false);
			}
		};

		store.load();

		var subCombo = combo;

		while (true) {

			// linked button disabled
			var lnkBtn = Ext.getCmp(subCombo.lnkBtnId);
			lnkBtn.setDisabled(true);

			// 하위 콤보 없으면 빠져나가기
			if (subCombo.tarCmbId == undefined
				|| subCombo.tarCmbId == "")
				break;

			// 하위 콤보 disabled
			subCombo = Ext.getCmp(subCombo.tarCmbId);
			subCombo.reset();
			subCombo.setDisabled(true);
		}
	},

	onAreaSearch: function (button, eOpts, c) {
		var combo = Ext.getCmp(button.lnkCmbId);
		var searchLayerId = combo.layerId;
		var searchText = combo.getValue();

		var idColumn, nameColumn, whereStr;

		//		var centerCtl = Ext.getCmp("center_container");
		if (searchLayerId == $KRF_DEFINE.areaWSLayerId) {
			idColumn = "WS_CD";
			//			centerCtl.setTitle('&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> ' + combo.rawValue);
		}
		if (searchLayerId == $KRF_DEFINE.areaAMLayerId) {
			idColumn = "MW_CODE";

			var wsCtl = Ext.getCmp("cmbWater1");
			//			centerCtl.setTitle('&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> ' + wsCtl.rawValue + " > " + combo.rawValue);
		}
		if (searchLayerId == $KRF_DEFINE.areaASLayerId) {
			idColumn = "SW_CODE";

			var wsCtl = Ext.getCmp("cmbWater1");
			var msCtl = Ext.getCmp("cmbWater2");
		}
		$KRF_APP.fireEvent($KRF_EVENT.AREA_SELECT, {
			idField: idColumn,
			idValue: searchText,
			layerId: searchLayerId
		});
	},

	onAreaSearch2: function (a, b) {
		//console.info(a);
	},

	onWaterSelect: function (button, eOpts, bookmark) {

		if($KRF_APP.BOMODE){
			//var treeResach = Ext.getCmp("boListTree");
			var treeResach = Ext.getCmp("siteListTree");
			//$KRF_APP.fireEvent($KRF_EVENT.SHOW_BO_LIST_WINDOW);
			if (treeResach != undefined) {

				var boCd = Ext.getCmp("cmbWater4").getValue();
				if(boCd != null){
					// var store = treeResach.getStore();
					// store.boCd = boCd;
					// store.searchType = 'boSearch';
					// store.load();
					// treeResach.getView().refresh();


					$KRF_APP.fireEvent($KRF_EVENT.BO_DYNAMIC_LAYER_ON_OFF, {boCd : boCd});
					$KRF_APP.fireEvent($KRF_EVENT.SHOW_BO_LIST_WINDOW, {boCd : boCd});
					//$KRF_APP.fireEvent($KRF_EVENT.BO_CENTER_MOVE, {boCd : boCd});
					
				}else{
					this.onWaterSelectAction(button, eOpts, bookmark);
				}
			}
		}else{
			this.onWaterSelectAction(button, eOpts, bookmark);
		}
		
	},

	onWaterSelectAction: function(button, eOpts, bookmark){
		var btnCtl = null;

		var btn1 = Ext.getCmp("btnWater1");
		if (btn1.disabled == false) {
			btnCtl = btn1;
		}

		var btn2 = Ext.getCmp("btnWater2");
		if (btn2.disabled == false) {
			btnCtl = btn2;
		}

		var btn3 = Ext.getCmp("btnWater3");
		if (btn3.disabled == false) {
			btnCtl = btn3;
		}

		if (btnCtl != null) {
			this.onAreaSearch(btnCtl, null, null);

			// 대역권 선택창 레이어 정보
			var buttonInfo = Ext.getCmp("cmbWater1");

			// 중역권
			var buttonInfo2 = Ext.getCmp("cmbWater2");

			// 소역권
			var buttonInfo3 = Ext.getCmp("cmbWater3");

			if (btnCtl.lnkCmbId == "cmbWater1") {
				alert("중권역을 선택하여 주세요");
				return;
			}

			if (buttonInfo.rawValue != "") {

				var treeResach = Ext.getCmp("siteListTree");
				if (treeResach != undefined) {
					var store = treeResach.getStore();
					store.buttonInfo = buttonInfo.lastValue;
					store.buttonInfo2 = buttonInfo2.lastValue;
					store.buttonInfo3 = buttonInfo3.lastValue;
					//console.info(store);
					store.load();
					treeResach.getView().refresh();


				}
			}
			// 지점목록 창 띄우기
			//			Ext.ShowSiteListWindow("waterSearch");

			$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, {
				searchText: 'waterSearch',
				searchType: null,
				isBookmark: false
			});
		}
	},

	onWaterReset: function (button, eOpts) {
		ResetButtonClick();
	}
});

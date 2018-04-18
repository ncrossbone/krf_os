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

	// 콤보 체인지
	onAreaChange: function (combo, record, parentId, comboValue) {

		var lnkBtn = Ext.getCmp(combo.lnkBtnId);
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

		
		if (searchLayerId == $KRF_DEFINE.areaWSLayerId) {
			idColumn = "WS_CD";
		}
		if (searchLayerId == $KRF_DEFINE.areaAMLayerId) {
			idColumn = "MW_CODE";

			var wsCtl = Ext.getCmp("cmbWater1");
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

		// if(ChkSearchCondition("수계찾기")){
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

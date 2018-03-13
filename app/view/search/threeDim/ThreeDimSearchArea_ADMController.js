Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_ADMController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.threeDimSearchArea_ADMController',

	control: {
		'#cmbThreeDimArea1': {
			afterrender: 'onCombo1Render',
			select: 'onAreaChange'
		},
		'#cmbThreeDimArea2': {
			select: 'onAreaChange'
		},
		'#cmbThreeDimArea3': {
			select: 'onAreaChange'
		},
		'#btnThreeDimSearch1': {
			click: 'onAreaSearch'
		},
		'#btnThreeDimSearch2': {
			click: 'onAreaSearch'
		},
		'#btnThreeDimSearch3': {
			click: 'onAreaSearch'
		},
		'#btnThreeDimADMSelect': {
			click: 'onADMSelect'
		},
		'#btnThreeDimADMReset': {
			click: 'onADMReset'
		}
	},

	// 시도 랜더링 후
	onCombo1Render: function (combo) {

		this.setComboData(combo.id, "");

	},

	// 콤보 체인지
	onAreaChange: function (combo, record, eOpts) {

		if (combo.tarCmbId != undefined && combo.tarCmbId != "") {
			this.setComboData(combo.tarCmbId, record.data.id);
		}

		this.setCtlDisable(combo.id);

	},

	// 콤보 Data load
	setComboData: function (comboId, admCD) {

		var combo = Ext.getCmp(comboId);
		var store = combo.getStore();

		store.layerId = combo.layerId; // 타겟 콤보 레이어 아이디
		store.parentADMCD = admCD;

		store.load(); // 데이터 로드
		combo.reset();

	},

	// 콤보 및 버튼 Disable설정
	setCtlDisable: function (comboId) {

		var combo = Ext.getCmp(comboId);
		var tarCombo = Ext.getCmp(combo.tarCmbId);

		if (tarCombo != undefined)
			tarCombo.setValue("");

		combo.setDisabled(false);

		// linked button disabled
		var lnkBtn = Ext.getCmp(combo.lnkBtnId);

		if (combo.getValue() == null || combo.getValue() == "") {
			lnkBtn.setDisabled(true);
			if (tarCombo != undefined)
				tarCombo.setDisabled(true);
		}
		else {
			lnkBtn.setDisabled(false);
			if (tarCombo != undefined)
				tarCombo.setDisabled(false);
		}

		while (true) {

			if (tarCombo == undefined)
				break;

			lnkBtn = Ext.getCmp(tarCombo.lnkBtnId);
			lnkBtn.setDisabled(true);

			// 하위 콤보 없으면 빠져나가기
			if (tarCombo.tarCmbId == undefined || tarCombo.tarCmbId == "")
				break;

			// 하위 콤보 disabled
			tarCombo = Ext.getCmp(tarCombo.tarCmbId);
			tarCombo.setValue("");
			tarCombo.setDisabled(true);

		}

	},

	// 지도 이동
	onAreaSearch: function (button, eOpts) {
		var combo = Ext.getCmp(button.lnkCmbId);
		var searchLayerId = combo.layerId;
		var searchText = combo.getValue();
		
		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + searchLayerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 4019 };

		query.where = "ADM_CD = '" + searchText + "'";

		query.outFields = ["*"];
		queryTask.execute(query, function (results) {
			Ext.each(results.features, function (obj, index) {
				var centerCoord = esri.geometry.Polygon(obj.geometry).getExtent().getCenter();
				$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, {
					type:'move',
					coord: centerCoord
				});
			});
		});

		dojo.connect(queryTask, "onError", function (err) {
			//console.info(err);
			alert("오류가 발생하였습니다.")
		});
		/*
		var centerCtl = Ext.getCmp("center_container");

		if (combo.id == "cmbThreeDimArea1") {
			centerCtl.setTitle('&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> ' + combo.rawValue);
		}

		if (combo.id == "cmbThreeDimArea2") {
			var wsCtl = Ext.getCmp("cmbThreeDimArea1");
			centerCtl.setTitle('&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> ' + wsCtl.rawValue + " > " + combo.rawValue);
		}
		if (combo.id == "cmbThreeDimArea3") {
			var wsCtl = Ext.getCmp("cmbThreeDimArea1");
			var msCtl = Ext.getCmp("cmbThreeDimArea2");
			centerCtl.setTitle('&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> ' + wsCtl.rawValue + " > " + msCtl.rawValue + " > " + combo.rawValue);
		}

		*/
	},

	// 선택 버튼
	onADMSelect: function (button, eOpts) {

		var btnCtl = null;

		var btn1 = Ext.getCmp("btnSearch1");
		if (btn1.disabled == false) {
			btnCtl = btn1;
		}

		var btn2 = Ext.getCmp("btnSearch2");
		if (btn2.disabled == false) {
			btnCtl = btn2;
		}

		var btn3 = Ext.getCmp("btnSearch3");
		if (btn3.disabled == false) {
			btnCtl = btn3;
		}

		var amdBtn1 = Ext.getCmp("cmbArea1");
		var amdBtn2 = Ext.getCmp("cmbArea2");
		var amdBtn3 = Ext.getCmp("cmbArea3");

		if (btnCtl != null) {
			this.onAreaSearch(btnCtl, null, null);

			if (btnCtl.lnkCmbId == "cmbArea1") {
				alert("시군구를 선택하여 주세요");
				return;
			}

			var treeResach = Ext.getCmp("siteListTree");
			if (treeResach != undefined) {
				var store = treeResach.getStore();
				store.amdBtn1 = amdBtn1.lastValue;
				store.amdBtn2 = amdBtn2.lastValue;
				store.amdBtn3 = amdBtn3.lastValue;
				store.load();
				treeResach.getView().refresh();
			}

			// 좌측 정보창 버튼 On/Off
			var currCtl = Ext.getCmp("btnSiteListWindow");
			if (currCtl.btnOnOff == "off") {
				SetBtnOnOff("btnSiteListWindow");
			}

			$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, { searchText: 'admSearch' });

			// Ext.ShowSiteListWindow("admSearch"); // 지점목록 창 띄우기
		}
	},

	// 초기화 버튼
	onADMReset: function (button, eOpts) {
		ResetButtonClick();

	}

});

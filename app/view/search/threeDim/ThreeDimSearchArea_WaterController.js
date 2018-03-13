Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_WaterController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.threeDimSearchArea_WaterController',

	control: {
		'#cmbThreeDimWater1': {
			afterrender: 'onCombo1Render',
			select: 'onAreaChange'
		},
		'#cmbThreeDimWater2': {
			select: 'onAreaChange'
		},
		'#cmbThreeDimWater3': {
			select: 'onAreaChange'
		},
		'#btnThreeDimWater1': {
			click: 'onAreaSearch'
		},
		'#btnThreeDimWater2': {
			click: 'onAreaSearch'
		},
		'#btnThreeDimWater3': {
			click: 'onAreaSearch'
		},
		'#btnThreeDimWaterSelect': {
			click: 'onWaterSelect'
		},
		'#btnThreeDimWaterReset': {
			click: 'onWaterReset'
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
		var lnkBtn = Ext.getCmp(combo.lnkBtnId);
		lnkBtn.setDisabled(false);
	},

	setComboData: function (comboId, id) {
		var combo = Ext.getCmp(comboId);
		var store = combo.getStore();

		store.layerId = combo.layerId; // 타겟 콤보 레이어 아이디
		store.parentId = id;

		store.load(); // 데이터 로드
		combo.reset();
		combo.setDisabled(false);

		while (true) {
			// linked button disabled
			var lnkBtn = Ext.getCmp(combo.lnkBtnId);
			lnkBtn.setDisabled(true);

			// 하위 콤보 없으면 빠져나가기
			if (combo.tarCmbId == undefined || combo.tarCmbId == "") {
				break;
			}
			// 하위 콤보 disabled
			combo = Ext.getCmp(combo.tarCmbId);
			combo.reset();
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
		}
		if (searchLayerId == $KRF_DEFINE.areaASLayerId) {
			idColumn = "SW_CODE";
		}

		var info = {
			idField: idColumn,
			idValue: searchText,
			layerId: searchLayerId
		};

		var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + info.layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = { "wkid": 4019 };

		var idField = "";
		var idValue = "";

		// 행정구역 검색은 info.admCd로 검색
		if (info.idField == undefined || info.idField == "") {
			idField = "ADM_CD";
		}
		else {
			idField = info.idField;
		}

		if (info.idValue == undefined || info.idValue == "") {
			if (info.admCd != undefined && info.admCd != "")
				idValue = info.admCd;
		}
		else {
			idValue = info.idValue;
		}

		query.where = idField + " = '" + idValue + "'";

		query.outFields = ["OBJECTID"];
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

	},
	onWaterSelect: function (button, eOpts) {
		var btnCtl = null;
		var btn1 = Ext.getCmp("btnThreeDimWater1");
		if (btn1.disabled == false) {
			btnCtl = btn1;
		}

		var btn2 = Ext.getCmp("btnThreeDimWater2");
		if (btn2.disabled == false) {
			btnCtl = btn2;
		}

		var btn3 = Ext.getCmp("btnThreeDimWater3");
		if (btn3.disabled == false) {
			btnCtl = btn3;
		}

		if (btnCtl != null) {
			this.onAreaSearch(btnCtl, null, null);

			// 대역권 선택창 레이어 정보
			var buttonInfo = Ext.getCmp("cmbThreeDimWater1");

			// 중역권
			var buttonInfo2 = Ext.getCmp("cmbThreeDimWater2");

			// 소역권
			var buttonInfo3 = Ext.getCmp("cmbThreeDimWater3");

			if (btnCtl.lnkCmbId == "cmbThreeDimWater1") {
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
		}
	},

	onWaterReset: function (button, eOpts) {
		ResetButtonClick();
	}
});

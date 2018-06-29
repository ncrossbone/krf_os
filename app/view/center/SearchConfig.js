/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.SearchConfig', {
	/* 데이터셋 설정 창 */
	extend: 'Ext.panel.Panel',

	xtype: 'win-searchConfig',

	id: 'searchConfig',

	style: 'border: 5px solid #043264; border-radius: 5px;',

	width: 185,
	height: 120,

	header: false,

	resizable: false,

	hidden: true,

	layout: {
		type: 'vbox'
	},
	listeners: {
		show: function (w) {
			w.el.slideIn();
		}
	},
	items: [{
		xtype: 'container',
		style: "padding-left: 10px; padding-top: 6px; font: normal 11px 돋움; letter-spacing: -1px; line-height: 19px;",
		layout: {
			type: 'vbox'
		},
		width: "100%",
		height: 70,
		items: [{
			xtype: 'checkbox',
			boxLabel: '상류',
			checked: false,
			width: 50,
			handler: function (obj, checked) {
				if (checked == true) {
					// 중권역 체크박스 활성
					this.up("container").query("#chkMWDraw")[0].enable();
					this.up("container").query("#chkMWDraw")[0].setValue(true);
					// 댐/보 체크박스 활성
					this.up("container").query("#chkDaemBoDraw")[0].enable();
				}
				else {
					// 중권역 체크박스 비활성
					this.up("container").query("#chkMWDraw")[0].disable();
					this.up("container").query("#chkMWDraw")[0].setValue(false);
					// 댐/보 체크박스 비활성
					this.up("container").query("#chkDaemBoDraw")[0].disable();
					this.up("container").query("#chkDaemBoDraw")[0].setValue(false);
				}

				// 로컬 스토리지 셋팅
				this.up("win-searchConfig").setLocalStorage();
			},
			inputValue: 'isUpDraw'
		}, {
			xtype: "container",
			layout: {
				type: "hbox"
			},
			width: "100%",
			style: "padding-left: 20px;",
			height: 35,
			items: [{
				xtype: "label",
				text: "└"
			}, {
				xtype: 'checkbox',
				itemId: "chkMWDraw",
				id: "chkMWDraw",
				style: "padding-left:10px;",
				boxLabel: '중권역',
				checked: false,
				disabled: true,
				width: 65,
				handler: function (obj, checked) {
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isMWDraw'
			}, {
				xtype: 'checkbox',
				itemId: "chkDaemBoDraw",
				id: "chkDaemBoDraw",
				style: "padding-left:10px;",
				boxLabel: '댐/보',
				checked: false,
				disabled: true,
				width: 80,
				handler: function (obj, checked) {
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isDaemBoDraw'
			}]
		}]
	}, {
		xtype: 'container',
		style: "font: normal 11px 돋움; letter-spacing: -1px; line-height: 19px; padding-left: 10px; padding-top: 6px; border-top: 1px dotted #595959;",
		layout: {
			type: 'hbox'
		},
		width: "100%",
		height: 35,
		items: [{
			xtype: 'checkbox',
			boxLabel: '본류',
			checked: true,
			width: 50,
			handler: function (obj, checked) {
				if (checked == false) {
					obj.setValue(true);
				}
			},
			inputValue: 'isBonDraw'
		}, {
			xtype: 'checkbox',
			boxLabel: '지류',
			checked: true,
			width: 50,
			handler: function (obj, checked) {
				// 로컬 스토리지 셋팅
				this.up("win-searchConfig").setLocalStorage();
			},
			inputValue: 'isJiDraw'
		}
			, {
			xtype: 'checkbox',
			boxLabel: '소하천',
			checked: false,
			width: 70,
			handler: function (obj, checked) {
				// 로컬 스토리지 셋팅
				this.up("win-searchConfig").setLocalStorage();

				this.up("win-searchConfig").onClickSRiver(checked);
				
				//$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId("SRIVER");

			},
			inputValue: 'isSRiver'
		}
		]
	}],

	initComponent: function () {

		this.callParent();

		// 체크박스 셋팅
		this.setCheckBox();
	},
	// 체크박스 셋팅
	setCheckBox: function () {
		// 로컬 스토리지
		var searchConfigInfo = localStorage['_searchConfigInfo_'];
		// 체크박스 컨트롤 배열
		var chkCtls = this.query("checkbox");
		if (chkCtls != undefined && chkCtls != null) {
			
			// 로컬 스토리지 존재하지 않으면
			if(searchConfigInfo == undefined || searchConfigInfo == "undefined"){
				this.setLocalStorage();
			}else{ // 존재하면
				
				var searchConfigInfoJson = JSON.parse(searchConfigInfo);
				// 체크박스 셋팅
				for (var i = 0; i < chkCtls.length; i++) {
					if (i == chkCtls.length - 1) {// 예외 ) 소하천인 경우 로컬스토리지에 저장되기 때문에 init storage를 비활성으로 초기 세팅
						searchConfigInfoJson[chkCtls[i].inputValue] = false;
						chkCtls[i].setValue(false);
					} else {
						if (chkCtls[i].inputValue != undefined && chkCtls[i].inputValue != null) {
							chkCtls[i].setValue(searchConfigInfoJson[chkCtls[i].inputValue]);
						}
					}
				}
			}
		}

		//init 세팅이 끝나고 storage 다시 만들어준다
		localStorage['_searchConfigInfo_'] = JSON.stringify(searchConfigInfoJson);
	},

	//소하천 dynamic 켜기
	onClickSRiver: function (onOff) {

		var coreMap = Ext.getCmp("_mapDiv_");
		var DynamicLayerSRiver = coreMap.map.getLayer("DynamicLayerSRiver");
		var subMapWindow = Ext.getCmp("subMapWindow");
		DynamicLayerSRiver.setVisibleLayers([-1]);

		if (onOff) {
			DynamicLayerSRiver.setVisibleLayers([0, 1]);
			
			subMapWindow.show();
			$KRF_APP.coreMap._krad.miniLineGrpLayer.setVisibility(true);

			var subDynamicLayerSRiver = $KRF_APP.subMap.map.getLayer("DynamicLayerSRiver");
			subDynamicLayerSRiver.setVisibleLayers([0, 1]);
			SetBtnOnOff("btnMenu010", "on");

			$KRF_APP.coreMap.subMapOnOffSetExtent();
		} else {
			DynamicLayerSRiver.setVisibleLayers([-1]);

			var subDynamicLayerSRiver = $KRF_APP.subMap.map.getLayer("DynamicLayerSRiver");
			subDynamicLayerSRiver.setVisibleLayers([-1]);
			
			subMapWindow.hide();
			$KRF_APP.coreMap._krad.miniLineGrpLayer.setVisibility(false);

			SetBtnOnOff("btnMenu010", "off");
		}
	},

	// 로컬 스토리지 셋팅
	setLocalStorage: function () {
		var chkCtls = this.query("checkbox");
		var jsonObj = {};
		for (var i = 0; i < chkCtls.length; i++) {
			if (chkCtls[i].inputValue != undefined && chkCtls[i].inputValue != null) {
				jsonObj[chkCtls[i].inputValue] = chkCtls[i].checked;
			}
		}
		localStorage['_searchConfigInfo_'] = JSON.stringify(jsonObj);
	},
	getLocalStorage: function () {
		// 로컬 스토리지
		var searchConfigInfo = localStorage['_searchConfigInfo_'];

		var searchConfigInfoJson = null;
		if (searchConfigInfo != "undefined") {
			searchConfigInfoJson = JSON.parse(searchConfigInfo);
		} else {
			// 로컬 스토리지 셋팅
			this.setLocalStorage();
			searchConfigInfoJson = JSON.parse(localStorage['_searchConfigInfo_']);
		}
		return searchConfigInfoJson;
	}
});
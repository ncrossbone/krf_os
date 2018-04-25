Ext.define('krf_new.view.search.Layer01Controller', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.layer01Controller',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged'
		}
	},

	onCheckChanged: function (node, checked, btnId) {
		//SRIVER_DYNAMIC_LAYER_ON_OFF
		var me = this;
		me.node = node;
		me.checked = checked;
		this.setLinkBtn(btnId, (btnId ? !checked : checked));

		if (!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		} else {
			if (checked == false) {
				var parentNode = node.parentNode;
				if (parentNode != undefined) {
					parentNode.set('checked', false);
				}
			}
			//소하천의경우 layer01 json 에서 아이디를 다르게 해줌 / 맵서비스가 다르기때문에 on/off 핸들러를 다르게 씀
			if (node.id.substring(0, 1) == "S") {
				$KRF_APP.fireEvent($KRF_EVENT.SRIVER_DYNAMIC_LAYER_ON_OFF, this.getView().getChecked());
			} else if (node.id.substring(0, 1) == "P") {
				$KRF_APP.fireEvent($KRF_EVENT.PULL_WATER_DYNAMIC_LAYER_ON_OFF, this.getView().getChecked());
			} else if (node.id.substring(0, 1) == 'D') {
				$KRF_APP.fireEvent($KRF_EVENT.DROUGHT_DYNAMIC_LAYER_ON_OFF, this.getView().getChecked());
			} else {
				$KRF_APP.fireEvent($KRF_EVENT.DYNAMIC_LAYER_ON_OFF, this.getView().getChecked());
			}
		}

		// if (btnId == undefined || btnId == null) {
		// 레이어 연결 버튼 셋팅 (버튼클릭 시 btnId넘겨주자.)


	},

	checkAllChildren: function (node, checked) {
		var me = this;
		var children = node.childNodes;
		Ext.each(children, function (child, index, eObjs) {
			child.set('checked', checked);
			if (index == children.length - 1) {

				// 1 dep 선택시 소하천일경우 ( 소하천의 경우 다른 케이스로 서비스가 달라서 나눔)
				if (child.data.parentId == 'S') {
					$KRF_APP.fireEvent('sRiverdynamicLayerOnOff', me.getView().getChecked());
				} else if (child.data.parentId == 'P0') {
					$KRF_APP.fireEvent('pullWaterdynamicLayerOnOff', me.getView().getChecked());
				} else if (child.data.parentId == 'D0') {
					$KRF_APP.fireEvent('droughtDynamicLayerOnOff', me.getView().getChecked());
				} else {
					$KRF_APP.fireEvent('dynamicLayerOnOff', me.getView().getChecked());
				}

			}
		});
	},

	// 레이어 연결된 버튼 셋팅 (버튼클릭 시 btnId넘겨주자.)
	setLinkBtn: function (btnId, checked) {
		var me = this;
		var btnCtl = null;

		if (me.node.data.layerBtnId != undefined) {
			if (typeof (me.node.data.layerBtnId) == "object") {
				if (me.node.data.layerBtnId.length != undefined) {
					for (var i = 0; i < me.node.data.layerBtnId.length; i++) {
						// 버튼 On/Off
						btnCtl = SetBtnOnOff(me.node.data.layerBtnId[i], checked ? 'off' : 'on');
					}
				}
			} else if (typeof (me.node.data.layerBtnId) == "string") {
				// 버튼 On/Off
				btnCtl = SetBtnOnOff(me.node.data.layerBtnId, checked ? 'off' : 'on');
			}
		}
	}
});

Ext.define('krf_new.view.search.threeDim.ThreeDimLayer01Controller', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.threeDimLayer01Controller',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged',
			render: 'onRender'
		}
	},
	onRender: function () {
	},

	onCheckChanged: function (node, checked, btnId) {
		var me = this;
		me.node = node;
		me.checked = checked;

		if (btnId == undefined || btnId == null) {
		}

		if (!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		} else {
			if (checked == false) {
			}
			var message = { type: 'layerOnOff', layers: [] };
			message.layers.push({ layerNm: node.data.text, wmsId: node.data.wmsId, checked: checked });

			$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, message);
		}
	},

	checkAllChildren: function (node, checked) {
		var me = this;
		var children = node.childNodes;
		var message = { type: 'layerOnOff', layers: [] };

		Ext.each(children, function (child, index, eObjs) {
			child.set('checked', checked);
			message.layers.push({ layerNm: child.data.text, wmsId: child.data.wmsId, checked: checked });

			if (index == children.length - 1) {
				$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, message);
			}
		});
	},

	// 레이어 연결된 버튼 셋팅 (버튼클릭 시 btnId넘겨주자.)
	setLinkBtn: function (btnId) {
		var me = this;
		var btnCtl = null;

		if (me.node.data.layerBtnId != undefined) {
			if (typeof (me.node.data.layerBtnId) == "object") {
				if (me.node.data.layerBtnId.length != undefined) {
					for (var i = 0; i < me.node.data.layerBtnId.length; i++) {
						// 버튼 On/Off
						btnCtl = SetBtnOnOff(me.node.data.layerBtnId[i]);
					}
				}
			} else if (typeof (me.node.data.layerBtnId) == "string") {
				// 버튼 On/Off
				btnCtl = SetBtnOnOff(me.node.data.layerBtnId);
			}
		}
	}
});

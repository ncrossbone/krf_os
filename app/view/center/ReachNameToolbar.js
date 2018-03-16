/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.ReachNameToolbar', {
	/*리치 이름 제어용 툴바*/

	extend: 'Ext.panel.Panel',

	xtype: 'center-reachnametoolbar',

	id: 'reachNameToolbar',

	header: false,

	shadow: false,

	resizable: false,

	border: false,

	bodyStyle: 'background:#043264 !important; padding:5px; border-radius:5px;',
	/* 사이즈 지정 */
	//itemWidth: 69,

	//cls: 'dj_toolbarNm dj_spottextfield2',
	height: 38,

	width: 188,

	layout: 'hbox',

	initComponent: function () {
		var a = Ext.create('Ext.window.Window');


		this.items = [{
			xtype: 'textfield',
			width: 70,
			editable: false,
			style: 'border: 2px solid #ff7200; margin-right:5px;'
		}, {
			xtype: 'textfield',
			width: 70,
			editable: false,
			style: 'border: 2px solid #25af38; margin-right:5px;'
		}, {
			xtype: 'button',
			cls: 'krf-os-reachname-close',
			id: "reach_close",
			width: 28,
			border: false,
			disabled: true,
			listeners: {
				el: {
					click: function () {
						Ext.getCmp("reach_close").setDisabled(true);
						SetBtnOnOff($KRF_APP.coreMap._krad.btnId, "off");
						initKradEvt();
						ResetButtonClick();
					}
				}
			}
		}]

		// {
		// 	xtype: "image",
		// 	id: "reach_close",
		// 	src: "./resources/images/button/btn_close2.png",
		// 	listeners: {
		// 		el: {
		// 			click: function () {
		// 				SetBtnOnOff($KRF_APP.coreMap._krad.btnId, "off");
		// 				initKradEvt();
		// 				ResetButtonClick();
		// 				Ext.getCmp("reach_close").setVisible(false);
		// 			}
		// 		}
		// 	}
		// }

		this.callParent();
	}
});
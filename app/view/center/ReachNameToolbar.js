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

	border:false,

	bodyStyle:'background:#043264 !important;',
	/* 사이즈 지정 */
	//itemWidth: 69,
	
	//cls: 'dj_toolbarNm dj_spottextfield2',
	height:40,
	
	width: 150,

	layout:'hbox',

	initComponent: function () {
		var a = Ext.create('Ext.window.Window');


		this.items = [{
			xtype: 'textfield',
			width: 50,
			style:'border: 2px solid #f5bf32;'
		}, {
			xtype: 'textfield',
			width: 50,
			style:'border: 2px solid #3eaf0e;'
		// }, {
		// 	xtype: "image",
		// 	id: "reach_close",
		// 	hidden: true,
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
		}];
		this.callParent();
	}
});
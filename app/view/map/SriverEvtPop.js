Ext.define("krf_new.view.map.SriverEvtPop", {

	extend: 'Ext.window.Window',

	xtype: 'map-sriverEvtPop',
	id: 'sriverEvtPop',

	plain: true, // 요게 있어야 background: transparent 먹음..
	style: "background-image: url(./resources/images/button/option_bg2_1.png); background-size: 78px 52px; border:0px; height: 54px !important;",
	header: {
		height: 1,
		style: "background-color: transparent; border: none;"
	},
	closable: false,
	resizable: false,
	items:[{
		xtype:'container',
		items:[{
			xtype: "image", // 리치(Reach)
			id: "btnSriverReach",
			src:"./resources/images/button/btn_option_1_off.gif",
			style:"padding-left:4px; margin-top:2px; padding-right:4px; cursor: pointer;",
			width: "100%",
			height: 21,
			listeners:{
				el:{
					click:function(){
						$KRF_APP.coreMap._krad.setRchIdsWithEvent();
						$KRF_APP.coreMap._krad.closePopup();
					}
				}
			}
		},{
			xtype: "image", // 점(Point)
			id: "btnKradPoint",
			src:"./resources/images/button/btn_option_1_off_1.gif",
			style:"padding-left:4px; padding-top: 0px; padding-right:4px; cursor: pointer;",
			width: "100%",
			height: 21,
			listeners:{
				el:{
					click:function(){
						$KRF_APP.coreMap._krad.setSRchIdsWithEvent();
						$KRF_APP.coreMap._krad.closePopup();
					}
				}
			}
		}]
	}],
	
	initComponent: function(){
		
		var me = this;
		
		// me.reachBtnObj = {
		// 	xtype: "image", // 리치(Reach)
		// 	id: "btnReach",
		// 	src:"./resources/images/button/btn_option_1_off.gif",
		// 	style:"padding-left:4px; margin-top:2px; padding-right:4px; cursor: pointer;",
		// 	width: "100%",
		// 	height: 21
		// };

		
		//  me.pointBtnObj = {
		// 	xtype: "image", // 점(Point)
		// 	id: "btnKradPoint",
		// 	src:"./resources/images/button/btn_option_2_off.gif",
		// 	style:"padding-left:4px; padding-top: 0px; padding-right:4px;",
		// 	width: "100%",
		// 	height: 21
		// };
		
		me.callParent();

		
	}
});
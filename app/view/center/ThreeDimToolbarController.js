Ext.define('krf_new.view.center.ThreeDimToolbarController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.3dToolbar',

	onClickButtonTemp: function (obj, el, evt) {
		var currCtl = SetBtnOnOff(el.id);
	},
	onClickKRF: function (obj, el, evt) {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'getCenter' });
	},
	onClick3DDefaultMap: function (obj, el, evt) {
		var btnObj = Ext.getCmp(el.id);
		if(btnObj.btnOnOff == 'on'){
			return;
		}
		var currCtl = SetBtnOnOff(el.id);
		Ext.getCmp('legendDEM').hide();
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'defaultMap' });
	},
	onClickDEM: function (obj, el, evt) {
		var btnObj = Ext.getCmp(el.id);
		if(btnObj.btnOnOff == 'on'){
			return;
		}
		var currCtl = SetBtnOnOff(el.id);
		Ext.getCmp('legendDEM').show();
		$KRF_APP.fireEvent($KRF_EVENT.THREE_DIM_SET_LEGEND_LOCATION);
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'demMap' });
	},
	onClickAutoMoveMap: function (obj, el, evt) {
		
		var currCtl = SetBtnOnOff(el.id);
		var threeDimCoordinateWindow = Ext.getCmp("threeDimCoordinateWindow");
		if(currCtl.btnOnOff == 'on'){
			if (!threeDimCoordinateWindow) {
				var centerContainer = Ext.getCmp('threeDim_center_container');
				var winX = centerContainer.getWidth() - 335;
				threeDimCoordinateWindow = Ext.create('krf_new.view.east.ThreeDimCoordinateWindow', { x: winX, y: $KRF_DEFINE.mapToolbarHeight  });
				centerContainer.add(threeDimCoordinateWindow);
			}
			threeDimCoordinateWindow.show();
			var btnMeasuredWindow = Ext.getCmp('btnMeasuredWindow');
			if(btnMeasuredWindow.btnOnOff == 'on'){
				Ext.getCmp('threeDimMeasured-win').setY( $KRF_DEFINE.mapToolbarHeight+400);
			}
		}else{
			$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setGrab' });
			threeDimCoordinateWindow.hide();
		}
		
	},
	onClickTerrainCross: function (obj, el, evt) {
		
		var currCtl = SetBtnOnOff(el.id);
		var threeDimTerrainCrossWindow = Ext.getCmp("threeDimTerrainCrossWindow");
		if(currCtl.btnOnOff == 'on'){
			if (!threeDimTerrainCrossWindow) {
				var centerContainer = Ext.getCmp('threeDim_center_container');
				var winX = centerContainer.getWidth() - 600;
				threeDimTerrainCrossWindow = Ext.create('krf_new.view.east.ThreeDimTerrainCrossWindow', { x: winX, y: $KRF_DEFINE.mapToolbarHeight  });
				centerContainer.add(threeDimTerrainCrossWindow);
			}
			threeDimTerrainCrossWindow.show();
			var btnMeasuredWindow = Ext.getCmp('btnMeasuredWindow');
			if(btnMeasuredWindow.btnOnOff == 'on'){
				Ext.getCmp('threeDimMeasured-win').setY( $KRF_DEFINE.mapToolbarHeight+500);
			}
		}else{
			$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setGrab' });
			threeDimTerrainCrossWindow.hide();
		}
	},
	
	onClickSave: function () {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'save' });
	},
	onClickReachLayer: function (obj, el, evt) {
		var currCtl = SetBtnOnOff(el.id);
		var checked = currCtl.btnOnOff == 'on' ? true : false;
		var message = { type: 'layerOnOff', layers: [] };
		message.layers.push({ layerNm: currCtl.text, wmsId: currCtl.layerId, checked: checked });
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, message);
	}
});

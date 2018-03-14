Ext.define('krf_new.view.center.ThreeDimToolbarController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.3dToolbar',

	onClickButtonTemp: function (obj, el, evt) {

		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);

	},
	onClickKRF: function (obj, el, evt) {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'getCenter' });
	},
	onClick3DDefaultMap: function(obj, el, evt) {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'defaultMap' });
	},
	onClickDEM: function (obj, el, evt) {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'demMap' });
	},
	onClickAutoMoveMap: function (obj, el, evt) {
		var currCtl = SetBtnOnOff(el.id);
		var threeDimCoordinateWindow = Ext.getCmp("threeDimCoordinateWindow");
		if (!threeDimCoordinateWindow) {
			var centerContainer = Ext.getCmp('threeDim_center_container');
			var winX = centerContainer.getWidth() - 350;
			var winY = 98;
			threeDimCoordinateWindow = Ext.create('krf_new.view.east.ThreeDimCoordinateWindow', { x: winX, y: winY });
			centerContainer.add(threeDimCoordinateWindow);
		}
		threeDimCoordinateWindow.show();

		// currCtl.btnOnOff == "off" ? windowSiteNChart.hide() : windowSiteNChart.show();
	},
	onClickSave: function(){
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'save' });
	}
});

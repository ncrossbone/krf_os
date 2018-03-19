Ext.define('krf_new.view.east.ThreeDimCoordinateController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.autoMoveToolbar',

	onClickGrab: function (obj, el, evt) {
		var id = el.id;
		if (Ext.getCmp(id).btnOnOff == 'on') {
			return;
		}
		var currCtl = SetBtnOnOff(id);
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setGrab' });
		this.btnToggle(id);
	},
	onClickInput: function (obj, el, evt) {
		var id = el.id;
		if (Ext.getCmp(id).btnOnOff == 'on') {
			return;
		}
		var currCtl = SetBtnOnOff(id);
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setInputLine' });
		this.btnToggle(id);
	},
	onClickStart: function (obj, el, evt) {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'startAutoMove' });
	},
	onClickStop: function (obj, el, evt) {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'stopAutoMove' });
	},
	onClickPause: function (obj, el, evt) {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'pauseAutoMove' });
	},
	onClickClear: function (obj, el, evt) {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'clearInputLine' });
		$KRF_APP.fireEvent($KRF_EVENT.ADD_AUTO_MOVE_CLEAR, {});
	},
	btnToggle: function (id) {
		var threeDimCoordinateWindow = Ext.getCmp('threeDimCoordinateWindow');
		if (threeDimCoordinateWindow) {
			var btnObj = threeDimCoordinateWindow.query('image');
			for (var i = 0; i < btnObj.length; i++) {
				if (btnObj[i].toggleGrp) {
					if (id == btnObj[i].toggleGrp) {
						Ext.getCmp(btnObj[i].id).show();
					} else {
						Ext.getCmp(btnObj[i].id).hide();
					}
				}
			}
		}
	}

});

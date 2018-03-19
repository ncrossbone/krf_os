Ext.define('krf_new.view.east.ThreeDimCoordinateController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.autoMoveToolbar',

	onClickGrab: function (obj, el, evt) {

		if (Ext.getCmp(el.id).btnOnOff == 'on') {
			return;
		}
		var currCtl = SetBtnOnOff(el.id);
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setGrab' });
		this.btnToggle(el.id);
	},
	onClickInput: function (obj, el, evt) {
		if (Ext.getCmp(el.id).btnOnOff == 'on') {
			return;
		}
		var currCtl = SetBtnOnOff(el.id);
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setInputLine' });
		this.btnToggle(el.id);
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

		var threeDimMoveBtn = Ext.getCmp('threeDimMoveBtn');
		var threeDimStopBtn = Ext.getCmp('threeDimStopBtn');
		var threeDimAddBtn = Ext.getCmp('threeDimAddBtn');
		var threeDimDeleteBtn = Ext.getCmp('threeDimDeleteBtn');

		if (id == 'threeDimPathBtn') {
			threeDimMoveBtn.show();
			threeDimStopBtn.show();
			threeDimAddBtn.hide();
			threeDimDeleteBtn.hide();
		} else {
			threeDimMoveBtn.hide();
			threeDimStopBtn.hide();
			threeDimAddBtn.show();
			threeDimDeleteBtn.show();
		}

	}

});

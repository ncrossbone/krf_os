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
		Ext.getCmp('threeDimCoordToolbarGapContainer').setWidth(40);
	},
	onClickInput: function (obj, el, evt) {
		var id = el.id;
		if (Ext.getCmp(id).btnOnOff == 'on') {
			return;
		}
		var currCtl = SetBtnOnOff(id);
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setInputLine' });
		this.btnToggle(id);
		Ext.getCmp('threeDimCoordToolbarGapContainer').setWidth(80);
	},
	onClickStart: function (obj, el, evt) {
		var startBtn = Ext.getCmp(el.id);
		if(startBtn.playMode == 0){
			$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'startAutoMove' });
			startBtn.playMode = 1;
			startBtn.setSrc(startBtn.btnOnImg);
		}else if(startBtn.playMode == 1){
			$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'pauseAutoMove' });
			startBtn.playMode = 0;
			startBtn.setSrc(startBtn.btnOffImg);
		}
	},
	onClickStop: function (obj, el, evt) {
		
		var startBtn = Ext.getCmp('threeDimMoveBtn');
		if(startBtn.playMode != 0){
			startBtn.setSrc(startBtn.btnOffImg);
			startBtn.playMode = 0;
		}
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

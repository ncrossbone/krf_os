Ext.define('krf_new.view.east.ThreeDimTerrainCrossController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.terrainCrossToolbar',

	onClickGrab: function (obj, el, evt) {
		var id = el.id;
		if (Ext.getCmp(id).btnOnOff == 'on') {
			return;
		}
		var currCtl = SetBtnOnOff(id);
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setGrab' });
	},
	onClickInput: function (obj, el, evt) {
		var id = el.id;
		if (Ext.getCmp(id).btnOnOff == 'on') {
			return;
		}
		var currCtl = SetBtnOnOff(id);
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setTCross' });
	}
});

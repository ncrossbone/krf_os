Ext.define('krf_new.view.east.ThreeDimCoordinateController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.autoMoveToolbar',

	onClickGrab: function () {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, {type:'setGrab'});
	},
	onClickInput: function () {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, {type:'setInputLine'});
	},
	onClickStart: function () {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, {type:'startAutoMove'});
	},
	onClickStop: function () {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, {type:'stopAutoMove'});
	},
	onClickPause: function () {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, {type:'pauseAutoMove'});
	},
	onClickClear: function () {
		$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, {type:'clearInputLine'});
		$KRF_APP.fireEvent($KRF_EVENT.ADD_AUTO_MOVE_CLEAR,{});
	}
});

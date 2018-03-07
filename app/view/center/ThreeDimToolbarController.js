Ext.define('krf_new.view.center.ThreeDimToolbarController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.3dToolbar',

	onClickButtonTemp: function (obj, el, evt) {

		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);

	},
	onClickKRF: function () {
		var threeDModule = $KRF_APP.getDesktopModule($KRF_WINS.THREEDIM.MAIN.id);

		threeDModule.sendMessage({type:'getCenter'});
	}
});

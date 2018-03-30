Ext.define('krf_new.view.admin.AdminConfigGISController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.adminConfigGISController',

	imgMouseOver: function (evt, el) {
		var me = Ext.getCmp(el.id);
		me.setSrc(me.mouseOverSrc);
	},

	imgMouseOut: function (evt, el) {
		var me = Ext.getCmp(el.id);
		me.setSrc(me.mouseOutSrc);
	},

	imgOnClick: function (evt, el) {
		var btnIns = Ext.getCmp(el.id);

		var arcUrl = $KRF_DEFINE.arcServiceUrl + '/manager/';
		if (btnIns.btnFlag == 1) {
			arcUrl = $KRF_DEFINE.arcServiceUrl + '/rest/services/';
		} else if(btnIns.btnFlag == 2) {
			arcUrl = $KRF_DEFINE.arcServiceUrl + '/admin/';
		}

		window.open(arcUrl, '_blank', 'width=1000,height=640');
	}
});
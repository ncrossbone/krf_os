Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_NameController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.threeDimSearchArea_NameController',

	control: {
		'#btnSearchText': {
			click: 'onTextSearch'
		},
		'#textSearchText': {
			specialkey: function (f, e) {
				if (e.getKey() == e.ENTER) {
					this.onTextSearch();
				}
			}
		}
	},
	onTextSearch: function (button, eOpts) {
		var btnCtl = null;
		var btn = Ext.getCmp("btnSearchText");

		var treeResach = Ext.getCmp("siteListTree");

		if (treeResach != undefined) {
			var store = treeResach.getStore();
			store.nameInfo = btn.rawValue;
			store.load();
			treeResach.getView().refresh();
		} else {

			if (btn.disable == false) {
				btnCtl = btn;
			}
			var currCtl = Ext.getCmp("btnSiteListWindow");
			if (currCtl.btnOnOff == "off") {
				SetBtnOnOff("btnSiteListWindow");
			}
		}
		$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW, { searchText: 'nameSearch' });
		// Ext.ShowSiteListWindow("nameSearch"); // 지점목록 창 띄우기
	}
});

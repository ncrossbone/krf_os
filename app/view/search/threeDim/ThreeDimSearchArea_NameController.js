Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_NameController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.threeDimSearchArea_NameController',

	control: {
		'#btnThreeDimSearchText': {
			click: 'onTextSearch'
		},
		'#textThreeDimSearchText': {
			specialkey: function (f, e) {
				if (e.getKey() == e.ENTER) {
					this.onTextSearch();
				}
			}
		}
	},
	onTextSearch: function (button, eOpts) {
		var btn = Ext.getCmp("btnThreeDimSearchText");

		var treeResach = Ext.getCmp("threeDimSiteListTree");
		var store = Ext.create('krf_new.store.east.ThreeDimSiteListWindow', {
			async: true
		});

		store.load();

		if (treeResach != undefined) {
			treeResach.setStore(store);
			treeResach.getView().refresh();
		} else {
			Ext.getCmp("threeDimSiteListTree").setStore(store);
		}
	}
});

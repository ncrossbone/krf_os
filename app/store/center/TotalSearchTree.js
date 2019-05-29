Ext.define('krf_new.store.center.TotalSearchTree', {
    extend: 'Ext.data.TreeStore',
    remoteSort: true,
    listeners: {

        load: function (store) {
            
            Ext.Ajax.request({
				url: './resources/data/treeTest.json',
				dataType: "text/plain",
				method: 'POST',
				async: true,
				success: function (response, opts) {

					var jsonData = Ext.util.JSON.decode(response.responseText);
					store.setRootNode(jsonData);
					store.setRootVisible(false);

				}
			});
        }
    }
});

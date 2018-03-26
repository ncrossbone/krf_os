Ext.define('krf_new.store.west.ThreeDimLayer01Store', {

	extend: 'Ext.data.TreeStore',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'resources/data/west/Layer01Data.json',
		reader: {
			type: 'json'
		}
	},

	constructor: function () {
		this.callParent();
	},

	listeners: {
		load: function (store, nodes, successful) {
			if (successful) {
				var records = store.getData();

				for (var i = 0; i < records.items.length; i++) {
					if (records.items[i].data.text == '하천망도' || 
						records.items[i].data.text == '집수구역' || 
						records.items[i].data.text == '리치라인' || 
						records.items[i].data.text == '리치노드' || 
						records.items[i].data.text == '리치흐름' || 
						records.items[i].data.text.indexOf('소하천') > -1) {
						records.items.splice(i, 1);
						i--;
						continue;
					}
					if(!records.items[i].data.leaf){
						records.items[i].data.checked = null;
					}else{
						records.items[i].data.checked = false;
						if(records.items[i].data.text.indexOf('<') > -1){
							records.items[i].data.text = records.items[i].data.text.substring(0, records.items[i].data.text.indexOf('<'));
						}
					}
				}
				store.setData(records);
				var layerTree = Ext.getCmp('threeDimLayer01');
				layerTree.setStore(store);
			}
		}
	}
});

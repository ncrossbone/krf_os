Ext.define('krf_new.view.admin.LayerSetLayer01Controller', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.layerSetLayer01Controller',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged',
			render: 'onRender'
		}
	},
	onRender: function () {
	},

	onCheckChanged: function (node, checked, btnId) {
		var me = this;

		if(node.get('disabled') ){
			node.set('checked', true);
			return ;
		}

		if (!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		}else{
			if(checked){
				node.parentNode.set('checked', true)
			}else{
				if(node.parentNode.childNodes){
					var childChecked = false;
					for(var i=0; i<node.parentNode.childNodes.length; i++){
						if(node.parentNode.childNodes[i].get('checked')){
							childChecked = true;
						}
					}
					if(!childChecked){
						node.parentNode.set('checked', false);
					}
				}
			}

		}
	},

	checkAllChildren: function (node, checked) {
		var me = this;
		var children = node.childNodes;

		Ext.each(children, function (child, index, eObjs) {
			child.set('checked', checked);
		});
	}
});

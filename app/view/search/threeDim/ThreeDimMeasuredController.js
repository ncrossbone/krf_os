Ext.define('krf_new.view.search.threeDim.ThreeDimMeasuredController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.threeDimMeasuredController',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged'
		}
	},

	onCheckChanged: function (node, checked, btnId) {
		var me = this;
		me.node = node;
		me.checked = checked;

		var nodes = node.parentNode.childNodes;

		if (checked) {
			for (var i = 0; i < nodes.length; i++) {
				nodes[i].set('checked', false);
			}
		}

		node.set('checked', checked)
	}
});

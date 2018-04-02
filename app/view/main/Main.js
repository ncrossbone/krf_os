Ext.define('krf_new.view.main.Main', {

	extend: 'Ext.container.Container',

	xtype: 'app-main',

	requires:  [
		'krf_new.view.center.Center',
		'krf_new.view.search.ButtonPanel'
	],

	layout: {
		type: "fit"
	},

	items: [{
		id: 'map-win',
		header: {
			cls: 'krf-os-parentwin-header'
		},
		iconCls: 'krf-os-win-title-krf-icon',
		shadow: false,
		animCollapse: false,
		layout: 'border',
		constrain: true,
		constrainHeader: false,
		onEsc: false,
		tools: [],
		listeners: {
			resize: function (win, width, height) {
				
				// var width = window.outerWidth;
				// var height = window.outerHeight;
				var mapC = Ext.getCmp('_mapDiv_');
				mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
				mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);
				mapC = Ext.getCmp('center_container');
				mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
				mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);
				mapC = Ext.getCmp('cont_container');
				mapC.setWidth(width - $KRF_DEFINE.westToolbarWidth);
				mapC.setHeight(height - $KRF_DEFINE.windowHeaderHeight);

				// $KRF_APP.fireEvent($KRF_EVENT.RESIZE_TOOL_ITEMS);
				// this.up('container').setSubWindowLocation();
			},
			render: function () {
			},
			afterrender: function () {
			},
			show: function () {
			}
		},
		items: [{ xtype: 'west-buttonpanel', region: 'west', collapsible: false },
		{
			xtype: 'container',
			id: 'cont_container',
			layout: {
				type: 'absolute'
			},
			region: 'center',
			height: '100%',
			items: [{ xtype: 'app-default-center', id: 'center_container', x: 0, y: 0 }]
		}]
	}],

	initComponent: function () {
		this.callParent();
		
	}
});
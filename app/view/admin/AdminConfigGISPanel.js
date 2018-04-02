Ext.define('krf_new.view.admin.AdminConfigGISPanel', {

	extend: 'Ext.panel.Panel',

	requires: ['krf_new.view.admin.AdminConfigGISController'],

	collapsible: false,
	// controller: 'center',

	cls: 'khLee-x-header',
	xtype: 'adminCongig-GIS',

	layout: {
		type: 'fit'
	},

	bodyStyle: 'padding:10px;',

	items: [{
		xtype: 'panel',
		width: '100%',
		height: '100%',
		controller: 'adminConfigGISController',
		style: 'border-top:2px solid #000 !important; border:1px solid #c2c2c2; background:#ffffff;',
		autoScroll: true,
		layout: {
			type: 'hbox',
			pack: 'center',
			align: 'middle'
		},
		items: [{
			xtype: 'panel',
			width: 300,
			height: 250,
			layout: {
				type: 'vbox',
				pack: 'center',
				align: 'middle'
			},
			style: 'border-right:1px solid dadhed #e5e5e5;',
			items: [{
				xtype: 'image',
				width: 211,
				height: 130,
				id: 'btnArcManager',
				btnFlag: 0,
				style: 'cursor:pointer',
				src: './resources/images/button/admin/s1.gif',
				listeners: {
					el: {
						click: 'imgOnClick'
					}
				}
			}, {
				xtype: 'image',
				width: 134,
				id: 'btnArcManager2',
				btnFlag: 0,
				style: 'cursor:pointer; padding-top:20px;',
				src: './resources/images/button/admin/s1_btn.png',
				listeners: {
					el: {
						click: 'imgOnClick'
					}
				}
			}]
		}, {
			xtype: 'image',
			width: 1,
			height: 300,
			src: './resources/images/button/admin/s_linebg.gif'
		},{
			xtype: 'panel',
			width: 300,
			height: 250,
			layout: {
				type: 'vbox',
				pack: 'center',
				align: 'middle'
			},
			items: [{
				xtype: 'image',
				width: 211,
				height: 130,
				id: 'btnArcService',
				btnFlag: 1,
				style: 'cursor:pointer',
				src: './resources/images/button/admin/s2.gif',
				listeners: {
					el: {
						click: 'imgOnClick'
					}
				}
			}, {
				xtype: 'image',
				width: 134,
				id: 'btnArcService2',
				btnFlag: 0,
				style: 'cursor:pointer; padding-top:20px;',
				src: './resources/images/button/admin/s2_btn.png',
				listeners: {
					el: {
						click: 'imgOnClick'
					}
				}
			}]
		}, {
			xtype: 'image',
			width: 1,
			height: 300,
			src: './resources/images/button/admin/s_linebg.gif'
		}, {
			xtype: 'panel',
			width: 300,
			height: 250,
			layout: {
				type: 'vbox',
				pack: 'center',
				align: 'middle'
			},
			items: [{
				xtype: 'image',
				width: 211,
				height: 130,
				id: 'btnArcAdmin',
				btnFlag: 2,
				style: 'cursor:pointer',
				src: './resources/images/button/admin/s3.gif',
				listeners: {
					el: {
						click: 'imgOnClick'
					}
				}
			}, {
				xtype: 'image',
				width: 134,
				id: 'btnArcAdmin2',
				btnFlag: 0,
				style: 'cursor:pointer; padding-top:20px;',
				src: './resources/images/button/admin/s3_btn.png',
				listeners: {
					el: {
						click: 'imgOnClick'
					}
				}
			}]
		}]
	}
	],
	initComponent: function () {
		this.callParent();
	}
});
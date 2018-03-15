/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.AdminConfigWindow', {
	extend: 'Ext.ux.desktop.Module',

	requires: [
	],

	id: 'admin-win',

	init: function () {
		this.launcher = {
			text: '설정',
			iconCls: 'krf-os-startmenu-admin-icon'
		};
	},

	createWindow: function (config) {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('admin-win');
		var cfg = Ext.applyIf(config || {}, {
			id: 'admin-win',
			//			            title:'현황판',
			width: 740,
			height: 480,
			//			            iconCls: 'icon-grid',
			animCollapse: false,
			constrainHeader: true,
			layout: 'fit',
			header: {
				titlePosition: 2,
				items: [{
					xtype: 'image',
					//title: '차트정보',
					id: 'tabChart',
					src: './resources/images/tab/tap_01_ov.gif',
					onImg: './resources/images/tab/tap_01_ov.gif',
					offImg: './resources/images/tab/tap_01_off.gif',
					style: 'cursor:pointer; border:0px !important;',
					width: 95,
					height: 28,
					listeners: {
						el: {
							click: function (obj, el, evt) {
								ChangeTabIndex(0);
							}
						}
					}
				}, {
					xtype: 'image',
					id: 'tabSite',
					//title: '지점정보',
					src: './resources/images/tab/tap_02_off.gif',
					onImg: './resources/images/tab/tap_02_ov.gif',
					offImg: './resources/images/tab/tap_02_off.gif',
					style: 'cursor:pointer; border:0px !important;',
					width: 95,
					height: 28,
					listeners: {
						el: {
							click: function (obj, el, evt) {
								ChangeTabIndex(1);
							}
						}
					}
				}]
			},
			items: [{
				xtype: 'container',
				id: 'infoContents',
				layout: {
					type: 'card'
				},
				items: [{
					xtype: 'component',
					itemId: 'gis-iframe',
					autoScroll: true,
					autoEl: {
						tag: 'iframe',
						style: 'height: 100%; width: 100%;',
						src: 'http://112.217.167.123:40002/arcgis/'
					}
				}, {
					xtype: 'component',
					itemId: 'system-iframe',
					autoScroll: true,
					autoEl: {
						tag: 'iframe',
						style: 'height: 100%; width: 100%;',
						src: 'http://112.217.167.123:40002/arcgis/'
					}
				}]
			}]
		});
		if (!win) {
			win = desktop.createWindow(cfg);
		}
		return win;
	}
});


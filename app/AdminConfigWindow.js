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
			text: '<span class="krf-os-startmenu-text">설정</span>',
			iconCls: 'krf-os-startmenu-admin-icon'
		};
	},

	createWindow: function (config) {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('admin-win');
		var cfg = Ext.applyIf(config || {}, {
			id: 'admin-win',
			width: 740,
			height: 480,
			animCollapse: false,
			constrainHeader: true,
			layout: 'fit',
			header: {
				titlePosition: 2,
				cls: 'krf-os-parentwin-header',
				items: [{
					xtype: 'image',
					id: 'tabChart',
					src: './resources/images/tab/tap_01_ov.gif',
					onImg: './resources/images/tab/tap_01_ov.gif',
					offImg: './resources/images/tab/tap_01_off.gif',
					style: 'cursor:pointer; border:0px !important;',
					width: 95,
					height: 28
				}]
			},
			items: [{
				xtype: 'container',
				id: 'infoContents',
				layout: {
					type: 'card'
				},
				items: [{
					xtype: 'panel', layout: { type: 'absolute' }, items: [
						{
							xtype: 'component',
							itemId: 'arcgis-iframe',
							id: 'arcgisIframe',
							autoScroll: true,
							autoEl: {
								tag: 'iframe',
								style: 'height: 100%; width: 100%;',
								id: 'arcgisIframe',
								src : 'http://211.114.21.35:8080/arcgis/'
							}
						}
					]
				}]
			}]
		});
		if (!win) {
			win = desktop.createWindow(cfg);
		}
		return win;
	}
});


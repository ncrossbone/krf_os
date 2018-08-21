/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.AdminConfigWindow', {
	extend: 'Ext.ux.desktop.Module',

	requires: [
			'krf_new.view.admin.LayerChoosePanel',
			'krf_new.view.admin.AdminConfigGISPanel',
			'krf_new.view.admin.AdminConfigDRONEPanel'
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
			header: {
				cls: 'krf-os-parentwin-header'
			},
			width: 740,
			height: 480,
			iconCls: 'krf-os-win-title-admin-icon',
			shadow: false,
			animCollapse: false,
			layout: 'border',
			constrain: true,
			constrainHeader: false,
			items: [{
				xtype: 'tabpanel', region: 'center',
				header: false,
				id: 'adminConfigTabPanel',
				tabBar: {
					style: 'background:#fff;'
				},
				layout:'absolute',
				style: 'background-color: #157fcb;',
				cls: 'khLee-tab-active khLee-tab-unselectable khLee-tab',
				items: [{ xtype: 'adminConfig-Center', title:'주제도'},
						{ xtype: 'adminCongig-GIS', title:'GIS 서버'},
						{ xtype: 'adminConfig-DRONE', title:'항공영상'}
				/*{
					id: 'arcgisTab',
					title: 'GIS 서버',
					tabConfig: {
						listeners: {
							click: function () {

								window.open('http://112.217.167.123:40002/arcgis/manager/', '_blank', 'width=1000,height=640');

								Ext.defer(function () {
									var adminConfigTabPanel = Ext.getCmp('adminConfigTabPanel');
									adminConfigTabPanel.setActiveTab(0);
								}, 100);
							}
						}
					}
				}*/
				]
			}]
		});
		if (!win) {
			win = desktop.createWindow(cfg);
		}
		return win;
	}
});



/*{
					id: 'layerConfigTab',
					title: '주제도',
					items: [{
						xtype: 'panel', layout: { type: 'fit' }, width: 600, height: 385, items: [Ext.create('Ext.Img', {
							src: './resources/images/ready.gif',
							width: 600,
							height: 385
						})]
					}],
					tabConfig: {
						listeners: {
							click: function () {
							}
						}
					}
				}
				*/
/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.report.ReportSelectPanel', {
	extend: 'Ext.panel.Panel',
	requires: [],
	xtype: 'select-report',

	layout: {
		type: 'vbox'
	},

	items: [ {
		xtype: 'button', text:'레포트 선택', listeners: {
			click: function () {
				var reportMain = Ext.getCmp('reportMainContents');
				reportMain.setActiveItem(1);
			}
		}
	}],
	initComponent: function () {
		this.callParent();
	}
});
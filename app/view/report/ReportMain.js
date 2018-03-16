/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.report.ReportMain', {
	extend: 'Ext.panel.Panel',
	requires: [
		'krf_new.view.report.ReportSelectPanel',
		'krf_new.view.report.ReportConditionPanel'
	],
	xtype: 'app-report-main',

	id:'report-main-panel',
	header: false,

	layout: {
		type: 'border'
	},

	items: [{
		xtype: 'container',
		id: 'reportMainContents',
		activeItem: 0,
		region: 'center',
		layout: {
			type: 'card'
		},
		items: [{
			xtype: 'select-report'
		}, {
			xtype: 'select-report-condition'
		}]
	}],
	initComponent: function () {
		this.callParent();
	}
});
/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.report.ReportConditionView', {
	extend: 'Ext.view.View',
	requires: [],
	id: 'reportConditionView',
	xtype: 'select-report-condition-view',

	cls: 'patient-view',
	tpl: '<tpl for=".">' +
		'<div class="patient-source x-unselectable"><table><tbody>' +
		'<tr><td class="patient-name"><img draggable="false" src="./resources/images/rpt/{id}.png"/></td></tr>' +
		'</tbody></table></div>' +
		'</tpl>',
	itemSelector: 'div.patient-source',
	overItemCls: 'patient-over',
	selectedItemClass: 'patient-selected',
	singleSelect: true,
	listeners: {
		render: function (v) {
			v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

				getDragData: function (e) {
					var sourceEl = e.getTarget(v.itemSelector, 10), d;
					if (sourceEl) {
						d = sourceEl.cloneNode(true);
						d.id = Ext.id();
						return (v.dragData = {
							sourceEl: sourceEl,
							repairXY: Ext.fly(sourceEl).getXY(),
							ddel: d,
							srcData: v.getRecord(sourceEl).data
						});
					}
				},

				getRepairXY: function () {
					return this.dragData.repairXY;
				}
			});
		}
	}
});
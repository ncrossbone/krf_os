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
		'<tr><td class="patient-name">{name}</td></tr>' +
		'</tbody></table></div>' +
		'</tpl>',
	itemSelector: 'div.patient-source',
	overItemCls: 'patient-over',
	selectedItemClass: 'patient-selected',
	singleSelect: true,
	listeners: {
		render: function (v) {
			//debugger;
			var patients = [];
			var storeObj = null;

			if (v.id == 'reportCondition1') {
				storeObj = { value: '2016', id: '2016' };
			} else {
				storeObj = {};
			}

			patients.push(storeObj);
			debugger;
			// 동적 스토어 
			var patientStore = Ext.create('Ext.data.Store', {
				model: Ext.create('Ext.data.Model', {
					idProperty: 'insuranceCode',
					fields: ['value', 'id']
				}),
				data: patients
			});
			this.setStore(patientStore);

			return;
			v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

				//      On receipt of a mousedown event, see if it is within a draggable element.
				//      Return a drag data object if so. The data object can contain arbitrary application
				//      data, but it should also contain a DOM element in the ddel property to provide
				//      a proxy to drag.
				getDragData: function (e) {
					console.log(arguments)
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

				//      Provide coordinates for the proxy to slide back to on failed drag.
				//      This is the original XY coordinates of the draggable element.
				getRepairXY: function () {
					return this.dragData.repairXY;
				}
			});
		}
	}
});
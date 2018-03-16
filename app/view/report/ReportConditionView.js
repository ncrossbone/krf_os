/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.report.ReportConditionView', {
	extend: 'Ext.view.View',
	requires: [],
	id:'reportConditionView',
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
			console.log(this.conditionType);
			var patients = [{
				insuranceCode: '11111',
				name: 'Fred Bloggs',
				address: 'Main Street',
				telephone: '555 1234 123'
			}, {
				insuranceCode: '22222',
				name: 'Fred Bansod',
				address: 'Van Ness',
				telephone: '666 666 666'
			}, {
				insuranceCode: '33333',
				name: 'Fred Mercury',
				address: 'Over The Rainbow',
				telephone: '555 321 0987'
			}, {
				insuranceCode: '44444',
				name: 'Fred Forsyth',
				address: 'Blimp Street',
				telephone: '555 111 2222'
			}, {
				insuranceCode: '55555',
				name: 'Fred Douglass',
				address: 'Talbot County, Maryland',
				telephone: 'N/A'
			}];

			// 동적 스토어 
			var patientStore = Ext.create('Ext.data.Store', {
				model: Ext.create('Ext.data.Model',{
					idProperty: 'insuranceCode',
					fields: ['name', 'address', 'telephone']
				}),
				data: patients
			});
			this.setStore(patientStore);

			v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {
		
		//      On receipt of a mousedown event, see if it is within a draggable element.
		//      Return a drag data object if so. The data object can contain arbitrary application
		//      data, but it should also contain a DOM element in the ddel property to provide
		//      a proxy to drag.
				getDragData: function(e) {
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
				getRepairXY: function() {
					return this.dragData.repairXY;
				}
			});
		}
	}
});
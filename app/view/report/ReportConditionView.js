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
		'<tr><td class="patient-name">{value}</td></tr>' +
		'</tbody></table></div>' +
		'</tpl>',
	itemSelector: 'div.patient-source',
	overItemCls: 'patient-over',
	selectedItemClass: 'patient-selected',
	singleSelect: true,
	listeners: {
		render: function (v) {
			// console.log(v);
			// return;
			// var patients = [];
			// var storeObj = null;

			// if (v.id == 'reportCondition1') {
			// 	patients.push({ value: '2016', id: '2016' }, { value: '2017', id: '2017' }, { value: '2018', id: '2018' });
			// } else if (v.id == 'reportCondition3') {
			// 	patients.push({ value: '전체', id: 'key0' }, { value: '대권역', id: 'key1' }, { value: '본류', id: 'key2' }, { value: '지류', id: 'key3' }, { value: '기타하천', id: 'key4' });
			// } else if (v.id == 'reportCondition4') {
			// 	patients.push({ value: '전체', id: 'flag1' }, { value: '부착돌말', id: 'flag2' }, { value: '저서동물', id: 'flag3' }, { value: '어류', id: 'flag4' }, { value: '서식수변환경', id: 'flag5' }, { value: '수변식생', id: 'flag6' });
			// }

			// // 동적 스토어 
			// var patientStore = Ext.create('Ext.data.Store', {
			// 	model: Ext.create('Ext.data.Model', {
			// 		idProperty: 'id',
			// 		fields: ['value', 'id']
			// 	}),
			// 	data: patients
			// });
			// this.setStore(patientStore);
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
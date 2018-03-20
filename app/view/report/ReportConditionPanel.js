/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.report.ReportConditionPanel', {
	extend: 'Ext.panel.Panel',
	requires: ['krf_new.view.report.ReportConditionView'],
	id: 'reportConditionPanel',
	xtype: 'select-report-condition',

	layout: {
		type: 'border'
	},

	items: [{
		xtype: 'panel', region: 'north', header: false, layout: { type: 'hbox' }, items: [{
			xtype: 'panel',
			title: '조건1',
			id: 'reportConditionPanel1',
			items: [{ xtype: 'select-report-condition-view', id: 'reportCondition1', conditionType: 'date' }]
		}, {
			xtype: 'panel',
			title: '조건2',
			id: 'reportConditionPanel2',
			items: [{ xtype: 'select-report-condition-view', id: 'reportCondition2', conditionType: 'flagValue' }]
		}, {
			xtype: 'panel',
			title: '조건3',
			id: 'reportConditionPanel3',
			items: [{ xtype: 'select-report-condition-view', id: 'reportCondition3', conditionType: 'flagValue' }]
		}, {
			xtype: 'panel',
			title: '조건4',
			id: 'reportConditionPanel4',
			items: [{ xtype: 'select-report-condition-view', id: 'reportCondition4', conditionType: 'flagValue' }]
		}]
	}, {
		xtype: 'panel', region: 'center', title: '조건', id: 'conditiondroppanel', cls: 'conditiondroppanel', layout: { type: 'absolute' },

		tbar: [
			{
				xtype: 'button',
				text: '레포트',
				listeners: {
					click:function(){
						var reportWin = Ext.getCmp('report-win');

						var offsetX = reportWin.getX();
						var offsetY = reportWin.getY();

						var conditionDropPanel = Ext.getCmp('conditiondroppanel');
						
						var keyOffsetX = 0;
						for(var key in conditionDropPanel.conditions){

							for(var i=0; i<conditionDropPanel.conditions[key].length; i++){
								var conditionWin = Ext.getCmp(key+(i+1)+'');
								conditionWin.animate({
									duration: 700,
									 to: {
										 x: offsetX+keyOffsetX,
										 y: conditionDropPanel.conditionWindowOffsetTop+offsetY+((i+1)*40)
									 }
								 });
							}
							keyOffsetX = keyOffsetX+ 160;
						}
					}
				}
			}
		],
		listeners: {
			render: function (v) {
				console.log('드랍', arguments);

				v.dropZone = Ext.create('Ext.dd.DropZone', v.el, {

					//      If the mouse is over a target node, return that node. This is
					//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
					getTargetFromEvent: function (e) {
						// console.log('getTargetFromEvent', arguments);
						return e.getTarget('.conditiondroppanel');
					},

					//      On entry into a target node, highlight that node.
					onNodeEnter: function (target, dd, e, data) {
						// console.log('onNodeEnter', arguments);
						// Ext.fly(target).addCls('hospital-target-hover');
					},

					//      On exit from a target node, unhighlight that node.
					onNodeOut: function (target, dd, e, data) {
						//console.log('onNodeOut', arguments);

						// Ext.fly(target).removeCls('hospital-target-hover');
					},

					//      While over a target node, return the default drop allowed class which
					//      places a "tick" icon into the drag proxy.
					onNodeOver: function (target, dd, e, data) {
						// 여기서 조건을 넣을수 있는지 체크해서 가능하면 proto.dropAllowed, 불가능은 proto.dropNotAllowed 리턴

						var proto = Ext.dd.DropZone.prototype;

						return proto.dropAllowed;

						// var hospital = getHospitalFromTarget(target),
						// 	name = data.patientData.name,
						// 	proto = Ext.dd.DropZone.prototype;

						// return allowPatientallowPatient(hospital, name) ? proto.dropAllowed : proto.dropNotAllowed;
					},

					//      On node drop, we can interrogate the target node to find the underlying
					//      application object that is the real target of the dragged data.
					//      In this case, it is a Record in the GridPanel's Store.
					//      We can use the data set up by the DragZone's getDragData method to read
					//      any data we decided to attach.
					onNodeDrop: function (target, dd, e, data) {
						console.log('onNodeDrop', arguments);
						var conditionDropPanel = Ext.getCmp('conditiondroppanel');

						if (!conditionDropPanel.conditions) {
							conditionDropPanel.conditions = {};
						}
						if (!conditionDropPanel.conditions[dd.id]) {
							conditionDropPanel.conditions[dd.id] = [];
						}
						conditionDropPanel.conditions[dd.id].push(data.srcData);
						conditionDropPanel.conditionWindowOffsetTop = target.offsetTop+40;

						var windowIdx = conditionDropPanel.conditions[dd.id].length;

						var reportWin = Ext.getCmp('report-win');

						var targetX = e.clientX - reportWin.getX();
						var targetY = e.clientY - (reportWin.getY() + target.offsetTop+50);

						var conditionWindow = Ext.create('Ext.window.Window', {
							renderTo :'conditiondroppanel',
							title: data.srcData.name,
							id: dd.id + windowIdx,
							conditionId: dd.id,
							conditionIndex: windowIdx,
							animCollapse: false,
							collapsible: false,
							maximizable: false,
							minimizable: false,
							resizable: false,
							constrain: true,
							constrainHeader: false,
							closable: true,
							x: targetX,
							y: targetY,
							width: 150,
							height: 35,
							listeners: {
								render: function () {
									this.collapse();
								}, close: function (win) {
									var conditionDropPanel = Ext.getCmp('conditiondroppanel');
									if(conditionDropPanel.conditions[win.conditionId]){
										conditionDropPanel.conditions[win.conditionId].splice(win.conditionIndex,1);
									}
								}
							}
						});

						// conditionDropPanel.add(conditionWindow);

						conditionWindow.show();

						return true;

						// var rowBody = Ext.fly(target).findParent('.x-grid-rowbody-tr', null, false),
						// 	mainRow = rowBody.previousSibling,
						// 	hospital = gridView.getRecord(mainRow),
						// 	patients = hospital.get('patients'),
						// 	name = data.patientData.name;

						// if (allowPatient(hospital, name)) {
						// 	if (!patients) {
						// 		patients = [];
						// 		hospital.set('patients', patients);
						// 	}
						// 	patients.push(name);
						// 	Ext.fly(rowBody).down('.x-grid-rowbody').update(patients.join(', '));
						// 	Ext.Msg.alert('Drop gesture', 'Dropped patient ' + name +
						// 		' on hospital ' + hospital.get('name'));

						// 	return true;
						// }
						// return false;
					}
				});
			}
		}
	}],
	initComponent: function () {
		this.callParent();
	}
});
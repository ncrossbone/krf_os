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
		xtype: 'panel',
		region: 'north',
		header: false,
		layout: { type: 'hbox' },
		items: [{
			xtype: 'panel',
			title: '조사 년도',
			id: 'reportConditionPanel1',
			width: 200,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition1',
				conditionType: 'id'
			}]
		}, {
			xtype: 'panel',
			title: '조사 년도',
			id: 'reportConditionPanel2',
			width: 200,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition2',
				conditionType: 'id'
			}]
		}, {
			xtype: 'panel',
			title: '상세 범위',
			id: 'reportConditionPanel3',
			width: 200,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition3',
				conditionType: 'id'
			}]
		}, {
			xtype: 'panel',
			title: '항목 선택',
			id: 'reportConditionPanel4',
			width: 200,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition4',
				conditionType: 'id'
			}]
		}]
	}, {
		xtype: 'panel',
		region: 'center',
		title: '조건',
		id: 'conditiondroppanel',
		cls: 'conditiondroppanel',
		layout: { type: 'absolute' },
		dragWin: [],
		tbar: [{
			xtype: 'button',
			text: '레포트',
			listeners: {
				click: function () {
					var reportWin = Ext.getCmp('report-win');

					var offsetX = reportWin.getX();
					var offsetY = reportWin.getY();

					var conditionDropPanel = Ext.getCmp('conditiondroppanel');

					var keyOffsetX = 0;
					for (var key in conditionDropPanel.conditions) {

						for (var i = 0; i < conditionDropPanel.conditions[key].length; i++) {
							var conditionWin = Ext.getCmp(key + (i + 1) + '');
							conditionWin.animate({
								duration: 700,
								to: {
									x: offsetX + keyOffsetX + 100,
									y: conditionDropPanel.conditionWindowOffsetTop + offsetY + ((i + 1) * 40)
								}
							});
						}
					}
				}
			}
		}, {
			xtype: 'button',
			text: '뒤로가기',
			listeners: {
				click: function () {
					var reportMain = Ext.getCmp('reportMainContents');
					reportMain.setActiveItem(0);
				}
			}
		}, {
			xtype: 'button',
			text: '리포트 보기',
			listeners: {
				click: function () {
					var conditionDropPanel = Ext.getCmp('conditiondroppanel');
					var rptMain = Ext.getCmp('reportMainContents');
					var rptConfig = { 'rptCase1': '1', 'rptCase2_1': '2-1', 'rptCase2_2': '2-2', 'rptCase3': '3' };

					if (conditionDropPanel) {
						var conditions = conditionDropPanel.conditions;
						if (conditions) {
							if (rptConfig[rptMain.reportType] == '2-1') {
								window.open('./ClipReport4/krfOsReport.jsp?type=' + rptConfig[rptMain.reportType] + '&year=2016', '', 'width=1000,height=1000,status=no,toolbar=no,scrollbars=no');
							} else {
								alert('case : ' + rptConfig[rptMain.reportType] + '미생성 리포트');
							}

						}
					}
				}
			}
		}],
		listeners: {
			render: function (v) {
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

						var conditionDropPanel = Ext.getCmp('conditiondroppanel');
						if (!conditionDropPanel.conditions) {
							conditionDropPanel.conditions = {};
						}

						if (!conditionDropPanel.conditions[dd.id]) {
							conditionDropPanel.conditions[dd.id] = [];
							conditionDropPanel.conditions[dd.id].push(data.srcData);
						} else {
							
							if (dd.id == 'reportCondition1' || dd.id == 'reportCondition2') {
								Ext.getCmp(conditionDropPanel.conditions[dd.id][0].id).close();
								conditionDropPanel.conditions[dd.id][0] = data.srcData;
							} else if (dd.id == 'reportCondition3' || dd.id == 'reportCondition4') {
								var winObj = conditionDropPanel.conditions[dd.id];
								var dataId = data.srcData.id;
								if (dataId == 'cmb1' || dataId == 'scope1') {
									if (winObj.length > 0) {
										for (var i = 0; i < winObj.length; i++) {
											Ext.getCmp(winObj[i].id).close();
										}
										winObj = [];
									} else {
										winObj.push(data.srcData);
									}
								} else {
									winObj.push(data.srcData);
								}

							}
						}


						conditionDropPanel.conditionWindowOffsetTop = target.offsetTop + 40;

						var windowIdx = conditionDropPanel.conditions[dd.id].length;

						var reportWin = Ext.getCmp('report-win');

						var targetX = e.clientX - reportWin.getX();
						var targetY = e.clientY - (reportWin.getY() + target.offsetTop + 50);

						var conditionWindow = Ext.create('Ext.window.Window', {
							renderTo: 'conditiondroppanel',
							title: data.srcData.value,
							id: data.srcData.id,
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

								},
								close: function (win) {
									var conditionDropPanel = Ext.getCmp('conditiondroppanel');
									if (conditionDropPanel.conditions[win.conditionId]) {
										conditionDropPanel.conditions[win.conditionId].splice(win.conditionIndex, 1);
									}
								}
							}
						});

						conditionWindow.show();

						return true;
					}
				});
			}
		}
	}],
	initComponent: function () {
		this.callParent();
	}
});
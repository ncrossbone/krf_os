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

	id: 'report-main-panel',
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
		initReportCondition: function (reportType) {
			var rptCfg = {
				'rptCase1': { comboCfg: ['전체', '부착돌말류', '어류', '수변식생'] },
				'rptCase2_1': { comboCfg: ['전체', '부착돌말류', '저서동물', '어류', '서식수변환경', '수변식생'] },
				'rptCase2_2': { comboCfg: ['전체', '수질', '부착돌말류', '저서동물', '어류', '서식수변환경', '수변식생'] },
				'rptCase3': { comboCfg: ['전체', '부착돌말류', '저서동물', '어류', '서식수변환경', '수변식생'] }
			};

			var rptCondition4 = Ext.getCmp('reportCondition4');

			var comboCfg = rptCfg[reportType].comboCfg;

			var comboArr = [];

			for (var i = 0; i < comboCfg.length; i++) {
				comboArr.push({ id: 'cmb' + i, value: comboCfg[i] });
			}

			var patientStore = Ext.create('Ext.data.Store', {
				model: Ext.create('Ext.data.Model', {
					idProperty: 'id',
					fields: ['value', 'id']
				}),
				data: comboArr
			});

			rptCondition4.setStore(patientStore);

			this.addDragEvent();

		},
		addDragEvent: function () {
			var storeArr = ['reportCondition1', 'reportCondition2', 'reportCondition3', 'reportCondition4'];
			for (var i = 0; i < storeArr.length; i++) {
				var v = Ext.getCmp(storeArr[i]);
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
		},
		items: [{
			xtype: 'select-report'
		}, {
			xtype: 'select-report-condition',
			listeners: {
				activate: function () {
					var rptMain = Ext.getCmp('reportMainContents');
					var reportType = rptMain.reportType;

					rptMain.initReportCondition(reportType);
				}
			}
		}],

	}],
	initComponent: function () {
		this.callParent();
	}
});
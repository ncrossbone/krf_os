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
				'rptCase1': { comboCfg: ['부착돌말류', '어류', '수변식생'], hideCmb: ['reportConditionPanel2', 'reportConditionPanel3'] },
				'rptCase2_1': { comboCfg: ['부착돌말류', '저서동물', '어류', '서식수변환경', '수변식생'], hideCmb: ['reportConditionPanel2'] },
				'rptCase2_2': { comboCfg: ['수질', '부착돌말류', '저서동물', '어류', '서식수변환경', '수변식생'], hideCmb: [] },
				'rptCase3': { comboCfg: ['부착돌말류', '저서동물', '어류', '서식수변환경', '수변식생'], hideCmb: ['reportConditionPanel2'] }
			};

			var comboCfg = rptCfg[reportType].comboCfg;

			var comboArr = [];

			for (var i = 0; i < comboCfg.length; i++) {
				comboArr.push({ id: 'cmb' + (i + 1), value: comboCfg[i] });
			}

			var paramObj = {};

			var startYearArr = [{ id: 'start1', value: '2016' }, { id: 'start2', value: '2017' }, { id: 'start3', value: '2018' }];
			var endYearArr = [{ id: 'end1', value: '2016' }, { id: 'end2', value: '2017' }, { id: 'end3', value: '2018' }];
			var scopeArr = [{ id: 'scope1', value: '대권역' }, { id: 'scope2', value: '본류' }, { id: 'scope3', value: '지류' }, { id: 'scope4', value: '기타하천' }];

			paramObj['reportCondition1'] = startYearArr;
			paramObj['reportCondition2'] = endYearArr;
			paramObj['reportCondition3'] = scopeArr;
			paramObj['reportCondition4'] = comboArr;

			this.setRptStore(paramObj);
			this.hideCondition(rptCfg[reportType]);
		},
		closeDragWin: function () {
			var conditiondroppanel = Ext.getCmp('conditiondroppanel');
			if (conditiondroppanel) {
				var con = conditiondroppanel.conditions;

				if (con) {
					for (var key in con) {
						for (var i = con[key].length - 1; i >= 0; i--) {
							var conObj = con[key][i];
							var conditionWin = Ext.getCmp(conObj.id);
							conditionWin.close();
						}
					}
				}
			}
		},
		hideCondition: function (obj) {
			var hideCon = obj.hideCmb;
			for (var i = 0; i < hideCon.length; i++) {
				Ext.getCmp(hideCon[i]).hide();
			}
		},
		setRptStore: function (paramObj) {
			var storeArr = ['reportCondition1', 'reportCondition2', 'reportCondition3', 'reportCondition4'];
			for (var i = 0; i < storeArr.length; i++) {

				Ext.getCmp('reportConditionPanel' + (i + 1)).show();

				var rptStore = Ext.getCmp(storeArr[i]);

				var patientStore = Ext.create('Ext.data.Store', {
					model: Ext.create('Ext.data.Model', {
						idProperty: 'id',
						fields: ['value', 'id']
					}),
					data: paramObj[storeArr[i]]
				});

				rptStore.setStore(patientStore);
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
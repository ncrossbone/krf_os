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
			/*
				부착돌말류 : tdi
				어류 : fai
				수변식생 : rvi
				저서동물 : bmi 
				서식수변환경 : hri
				수질 : wq

				comboCfg배열 순서 = 리포트 표출 순서
			*/
			
			var rptCfg = {
				'rptCase1': { comboCfg: ['tdi', 'fai', 'rvi'], hideCmb: ['reportConditionPanel2', 'reportConditionPanel3'] },
				'rptCase2_1': { comboCfg: ['tdi', 'bmi', 'fai', 'hri', 'rvi'], hideCmb: ['reportConditionPanel2'] },
				'rptCase2_2': { comboCfg: ['wq', 'tdi', 'bmi', 'fai', 'hri', 'rvi'], hideCmb: [] },
				'rptCase3': { comboCfg: ['tdi', 'bmi', 'fai', 'hri', 'rvi'], hideCmb: ['reportConditionPanel2'] }
			};

			var comboCfg = rptCfg[reportType].comboCfg;

			var comboArr = [];

			for (var i = 0; i < comboCfg.length; i++) {
				comboArr.push({ id: comboCfg[i], value: comboCfg[i], idx: (i + 1) });
			}

			var paramObj = {};

			var startYearArr = [{ id: '2013', value: '2013', idx: 1 }, { id: '2014', value: '2014', idx: 2 }, { id: '2015', value: '2015', idx: 3 }, { id: '2016', value: '2016', idx: 4 }, { id: '2017', value: '2017', idx: 5 }];
			var endYearArr = [{ id: '2013e', value: '2013', idx: 1 }, { id: '2014e', value: '2014', idx: 2 }, { id: '2015e', value: '2015', idx: 3 }, { id: '2016e', value: '2016', idx: 4 }, { id: '2017e', value: '2017', idx: 5 }];
			var scopeArr = [{ id: 'scope1', value: '대권역', idx: 1 }, { id: 'scope2', value: '본류', idx: 2 }, { id: 'scope3', value: '지류', idx: 3 }, { id: 'scope4', value: '기타하천', idx: 4 }];

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
						fields: ['value', 'id', 'idx']
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
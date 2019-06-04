Ext.define('krf_new.view.east.ChartPanelDate', {

	extend: 'Ext.window.Window',
	xtype: 'east-chartpaneldate',

	id: 'datePanel1',
	width: 205,
	height: 200,
	header: true,
	constrain: true,
	title: '기간설정',
	controller: 'chartPanelDateController',
	cls: 'subWindow-x-form-item-label-default',
	header: { cls: 'subWindow-x-form-item-label-default' },
	onEsc: false,
	//x: x,
	//    cls: 'khLee-window-panel-header khLee-x-window-default ',
	initComponent: function () {
		this.callParent();
		var itemCtl = Ext.getCmp("selectItem");

		var f_Chart = Ext.getCmp("f_Chart");
		var f_ChartText = Ext.getCmp("f_ChartText");
		var selectYear = Ext.getCmp("selectYear");
		var selectYear2 = Ext.getCmp("selectYear2");

		var startChartDate = Ext.getCmp("startChartDate");
		var endChartDate = Ext.getCmp("endChartDate");

		//퇴적물 콤보 박스
		var cStartChartDate = Ext.getCmp("cStartChartDate");
		var cEndChartDate = Ext.getCmp("cEndChartDate");

		var hChartDate = Ext.getCmp("hChartDate");

		var m_ChartDate = Ext.getCmp("m_ChartDate");
		var l_ChartDate = Ext.getCmp("l_ChartDate");

		var q_ChartDate = Ext.getCmp("q_ChartDate");
		var k_ChartDate = Ext.getCmp("k_ChartDate");
		var z_ChartDate = Ext.getCmp("z_ChartDate");

		var parentChk = $KRF_APP.parentFlag;
		var chartFlag_D = $KRF_APP.chartFlag_D;

		startChartDate.hidden = false;
		endChartDate.hidden = false;

		//퇴적물 콤보 박스 히든
		cStartChartDate.hidden = true;
		cEndChartDate.hidden = true;

		m_ChartDate.hidden = true;
		l_ChartDate.hidden = true;
		q_ChartDate.hidden = true;
		z_ChartDate.hidden = true;

		var parentChk = $KRF_APP.parentFlag;
		var chartFlag_D = $KRF_APP.chartFlag_D;

		var datePanel1 = Ext.getCmp('datePanel1');
		var me = this;
		if (datePanel1) {
			datePanel1.setHeight(200);
		} else {
			me.height = 200;
		}


		if (parentChk == "F") {
			//console.info(parentChk);
			f_Chart.hidden = false;
			f_ChartText.hidden = false;
			hChartDate.hidden = true;

			var year = ['', '2012', '2013'];
			selectYear.setStore(year);
			selectYear.setValue('2012');
			selectYear2.setStore(year);
			selectYear2.setValue('2013');
		} else if (parentChk == "C") {

			f_Chart.hidden = true;
			f_ChartText.hidden = true;
			startChartDate.hidden = true;
			endChartDate.hidden = true;

			cStartChartDate.hidden = false;
			cEndChartDate.hidden = false;

			hChartDate.hidden = true;

		} else if (parentChk == "H") {

			f_Chart.hidden = true;
			f_ChartText.hidden = true;
			startChartDate.hidden = true;
			endChartDate.hidden = true;

			cStartChartDate.hidden = true;
			cEndChartDate.hidden = true;

			hChartDate.hidden = false;
		} else if (parentChk == 'M') {
			f_Chart.hidden = true;
			f_ChartText.hidden = true;
			startChartDate.hidden = true;
			endChartDate.hidden = true;

			cStartChartDate.hidden = true;
			cEndChartDate.hidden = true;

			hChartDate.hidden = true;

			m_ChartDate.hidden = false;

			if (datePanel1) {
				datePanel1.setHeight(250);
			} else {
				me.height = 250;
			}
		} else if (parentChk == 'L') {
			f_Chart.hidden = true;
			f_ChartText.hidden = true;
			startChartDate.hidden = true;
			endChartDate.hidden = true;

			cStartChartDate.hidden = true;
			cEndChartDate.hidden = true;

			hChartDate.hidden = true;

			m_ChartDate.hidden = true;
			k_ChartDate.hidden = true;
			z_ChartDate.hidden = true;
			q_ChartDate.hidden = true;

			l_ChartDate.hidden = false;
			


			if (datePanel1) {
				datePanel1.setHeight(250);
			} else {
				me.height = 250;
			}

		} else if (parentChk == 'Q') {
			f_Chart.hidden = true;
			f_ChartText.hidden = true;
			startChartDate.hidden = true;
			endChartDate.hidden = true;

			cStartChartDate.hidden = true;
			cEndChartDate.hidden = true;
			k_ChartDate.hidden = true;
			z_ChartDate.hidden = true;

			hChartDate.hidden = true;
			q_ChartDate.hidden = false;

		} else if (parentChk == 'Z') {
			f_Chart.hidden = true;
			f_ChartText.hidden = true;
			startChartDate.hidden = true;
			endChartDate.hidden = true;

			cStartChartDate.hidden = true;
			cEndChartDate.hidden = true;

			hChartDate.hidden = true;
			q_ChartDate.hidden = true;
			k_ChartDate.hidden = true;

			z_ChartDate.hidden = false;
		} else if (parentChk == 'Z') {
			f_Chart.hidden = true;
			f_ChartText.hidden = true;
			startChartDate.hidden = true;
			endChartDate.hidden = true;

			cStartChartDate.hidden = true;
			cEndChartDate.hidden = true;

			hChartDate.hidden = true;
			q_ChartDate.hidden = true;
			z_ChartDate.hidden = true;

			k_ChartDate.hidden = false;
		} else {
			//console.info(parentChk);
			f_Chart.hidden = true;
			f_ChartText.hidden = true;
			hChartDate.hidden = true;
			var year = ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
			selectYear.setStore(year);
			selectYear2.setStore(year);
		}

		//console.info(parentChk);
		//console.info(chartFlag_D);
		if (parentChk == "A") {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'ITEM_BOD', name: 'BOD' }
					, { id: 'ITEM_DOC', name: 'DO' }
					, { id: 'ITEM_COD', name: 'COD' }
					, { id: 'ITEM_TN', name: 'T-N' }
					, { id: 'ITEM_TP', name: 'T-P' }
					, { id: 'ITEM_TEMP', name: '수온' }
					, { id: 'ITEM_PH', name: 'pH' }
					, { id: 'ITEM_SS', name: 'SS' }
					, { id: 'ITEM_CLOA', name: '클로로필a' }]
			})
			itemCtl.setValue("ITEM_BOD");
		} else if (parentChk == "B") {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'ITEM_BOD', name: 'BOD' }
					, { id: 'ITEM_COD', name: 'COD' }
					, { id: 'ITEM_DOC', name: 'DO' }
					, { id: 'ITEM_TN', name: 'T-N' }
					, { id: 'ITEM_TP', name: 'T-P' }
					, { id: 'ITEM_FLW', name: '적산유량(평균)' }
					, { id: 'ITEM_PH', name: 'pH' }
					, { id: 'ITEM_SS', name: 'SS' }
					, { id: 'ITEM_TOC', name: '총유기탄소' }]
			})
			itemCtl.setValue("ITEM_BOD");
		} else if (parentChk == "C") {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'ITEM_COD', name: 'COD' }
					, { id: 'ITEM_TN', name: 'TN' }
					, { id: 'ITEM_TP', name: 'TP' }
					, { id: 'ITEM_SRP', name: 'SRP' }
					, { id: 'ITEM_PB', name: 'PB' }
					, { id: 'ITEM_ZN', name: 'ZN' }
					, { id: 'ITEM_CU', name: 'CU' }
					, { id: 'ITEM_CR', name: 'CR' }
					, { id: 'ITEM_NI', name: 'NI' }
					, { id: 'ITEM_AS', name: 'AS' }
					, { id: 'ITEM_CD', name: 'CD' }
					, { id: 'ITEM_HG', name: 'HG' }
					, { id: 'ITEM_AL', name: 'AL' }
					, { id: 'ITEM_LI', name: 'LI' }]
			})
			itemCtl.setValue("ITEM_COD");
		} else if (parentChk == "D") {
			if (chartFlag_D == "D001") {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'WL', name: '수위(cm)' }]
				})
				itemCtl.setValue("WL");
			} else if (chartFlag_D == "D002") {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'RF', name: '우량자료(mm)' }]
				})
				itemCtl.setValue("RF");
			} else if (chartFlag_D == "D003") {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'FW', name: '유량(CMS)' }]
				})
				itemCtl.setValue("FW");
			} else if (chartFlag_D == "D004") {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'SWL', name: '저수위(cm)' },
					{ id: 'INF', name: '유입량(cms)' },
					{ id: 'OTF', name: '방류량(cms)' },
					{ id: 'SFW', name: '저수량(만㎥)' },
					{ id: 'ECPC', name: '공용량(백만㎥)' }]
				})
				itemCtl.setValue("SWL");
			} else if (chartFlag_D == "D005") {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'WD', name: '풍향(m/s)' },
					{ id: 'WS', name: '풍속(m/s)' },
					{ id: 'TA', name: '기온(℃)' },
					{ id: 'HM', name: '습도' },
					{ id: 'PA', name: '현지기압' },
					{ id: 'PS', name: '해면기압' },
					{ id: 'RNYN', name: '강수감지' },
					{ id: 'RN1HR', name: '강수량(mm)' },
					{ id: 'RNDAY', name: '누적강수량(mm)' }]
				})
				itemCtl.setValue("WD");
			} else if (chartFlag_D == "D006") {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'RND', name: '강수량자료(mm)' },
					{ id: 'TA', name: '기온(℃)' },
					{ id: 'SIDAY', name: '일사(MJ/m2)' }]
				})
				itemCtl.setValue("RND");
			} else if (chartFlag_D == "D007") {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'SWL', name: '보 상류수위' },
					{ id: 'OWL', name: '보 하류수위' },
					{ id: 'SFW', name: '저수량' },
					{ id: 'ECPC', name: '공용량' },
					{ id: 'INF', name: '유입량' },
					{ id: 'TOTOTF', name: '총 방류량' },
					{ id: 'EGOTF', name: '발전 방류량' },
					{ id: 'GTOTF', name: '가동보 방류량' },
					{ id: 'CBOTF', name: '고정보 방류량' },
					{ id: 'FWOTF', name: '어도 방류량' },
					{ id: 'ETCOTF', name: '기타 방류량' }]
				})
				itemCtl.setValue("SWL");
			}
		} else if (parentChk == "F") {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'AMT_PHYS', name: '방류량_물리적' }
					, { id: 'AMT_BIO', name: '방류량_생물학적' }
					, { id: 'AMT_HIGHTEC', name: '방류량_고도' }
					, { id: 'ITEM_BOD', name: 'BOD' }
					, { id: 'ITEM_COD', name: 'COD' }
					, { id: 'ITEM_SS', name: 'SS' }
					, { id: 'ITEM_TN', name: 'TN' }
					, { id: 'ITEM_TP', name: 'TP' }
					, { id: 'ITEM_COLI', name: '대장균군수' }]
			})
			itemCtl.setValue("AMT_PHYS");
		} else if (parentChk == "I") {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'ITEM_TEMP', name: '수온' }
					, { id: 'ITEM_AVERAGE_CLOA', name: 'Chl-a' }
					, { id: 'ITEM_SURFACE_BLUE_GREEN_ALGAE', name: '유해남조류' }]
			})
			itemCtl.setValue("ITEM_TEMP");
		} else if (parentChk == "H") {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'BOD', name: 'BOD' }
					, { id: 'CHLA', name: 'CHLA' }
					, { id: 'DOC', name: 'DOC' }
					, { id: 'FLUX', name: 'FLUX' }
					, { id: 'WTRTP', name: 'WTRTP' }
					, { id: 'NH3', name: 'NH3' }
					, { id: 'NO3', name: 'NO3' }
					, { id: 'OP4', name: 'OP4' }]
			})
			itemCtl.setValue("BOD");
		} else if (parentChk == 'M') {
			if ($KRF_APP.layerCode == 'M001') {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'WTRTP_VALUE', name: '수온' }
						, { id: 'PH_VALUE', name: '수소이온농도' }
						, { id: 'EC_VALUE', name: '전기전도도' }
						, { id: 'DOC_VALUE', name: '용존산소' }
						, { id: 'TUR_VALUE', name: '탁도' }]
				})
				itemCtl.setValue('WTRTP_VALUE');
			} else if ($KRF_APP.layerCode == 'M002') {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'BOD_VALUE', name: '생물학적산소요구량' }
						, { id: 'TOC_VALUE', name: '총유기탄소' }
						, { id: 'SS_VALUE', name: '부유물질' }
						, { id: 'TP_VALUE', name: '총인' }
						, { id: 'TN_VALUE', name: '총질소' }]
				})

				itemCtl.setValue('BOD_VALUE');
			}
		} else if (parentChk == 'K') {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'FUEL_USGQTY', name: '연료_사용량' }
					, { id: 'MTRAL_USGQTY', name: '원료_사용량' }
					, { id: 'DNSTY', name: '농도' }
					, { id: 'DWEQTY', name: '방류량' }
					, { id: 'PRMISN_EXHST_STDR', name: '허가_배출_기준' }]
			})
			itemCtl.setValue('BOD');
		} else if (parentChk == 'Z') {
			if ($KRF_APP.layerCode.substr(0, 4) == 'Z001') {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'INDVD_CO', name: '개체 수' }]
				})
				itemCtl.setValue('INDVD_CO');
			} else if ($KRF_APP.layerCode.substr(0, 4) == 'Z006') {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'CELL_CO', name: '세포_수' }]
				})
				itemCtl.setValue('CELL_CO');
			} else if ($KRF_APP.layerCode.substr(0, 4) == 'Z005') {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'INDVD_CO', name: '개체 수' }]
				})
				itemCtl.setValue('INDVD_CO');
			} else if ($KRF_APP.layerCode.substr(0, 4) == 'Z002') {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'LVB_QY', name: '생물_량' }]
				})
				itemCtl.setValue('LVB_QY');
			} else if ($KRF_APP.layerCode.substr(0, 4) == 'Z003') {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 'INDVD_CO', name: '개체 수' }]
				})
				itemCtl.setValue('INDVD_CO');
			} else if ($KRF_APP.layerCode.substr(0, 4) == 'Z004') {
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [
						{ id: 'WTRTP', name: '수온' },
						{ id: 'PH', name: '수소이온농도' },
						{ id: 'DOCB', name: '용존성유기탄소' },
						{ id: 'EC', name: '전기전도도' },
						{ id: 'TUR', name: '탁도' },
						{ id: 'SD', name: '염도' },
						{ id: 'CHLA', name: '클로로필A' },
						{ id: 'SS', name: '부유물질' },
						{ id: 'TP', name: '총인' },
						{ id: 'DTP', name: '용존총인' },
						{ id: 'PO4P', name: '인산염인' },
						{ id: 'TN', name: '총질소' },
						{ id: 'DTN', name: '용존총질소' },
						{ id: 'NO3N', name: '질산성질소' },
						{ id: 'BOD', name: '생물학적산소요구량' },
						{ id: 'COD', name: '화학적산소요구량' },
						{ id: 'POC', name: 'POC' },
						{ id: 'DOC', name: '용존산소' },
						{ id: 'TOC', name: '총유기탄소' },
						{ id: 'TCOLI_CO', name: '총대장균군_수' },
						{ id: 'FCOLI_CO', name: '분원선대장균군_수' },
						{ id: 'UV254', name: '자외선흡광도' },
						{ id: 'NH3N', name: 'NH3N' }]
				})
				itemCtl.setValue('WTRTP');
			}
		} else if (parentChk == 'L') {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'BOD', name: '생물학적산소요구량' }
					, { id: 'COD', name: '화학적산소요구량' }
					, { id: 'TOC', name: '총유기탄소' }
					, { id: 'TN', name: '총질소' }
					, { id: 'TP', name: '총인' }
					, { id: 'SS', name: '부유물질' }
					, { id: 'SEAWEED', name: '조류' }
					, { id: 'BEMA', name: '저서성대형무척추동물' }
					, { id: 'FISHES', name: '어류' }]
			})
			itemCtl.setValue('BOD');
		} else if (parentChk == 'Q') {
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: 'INFLT_QY', name: '유입수' }
					, { id: 'BOD_VALUE', name: '생물학적산소요구량' }
					, { id: 'COD_VALUE', name: '화학적산소요구량' }
					, { id: 'SS_VALUE', name: '부유물질' }
					, { id: 'TN_VALUE', name: '총질소' }
					, { id: 'TP_VALUE', name: '총인' }
					, { id: 'COC_VALUE', name: '총대장균군수' }]
			})
			itemCtl.setValue('INFLT_QY');
		}

		itemCtl.bindStore(store);

		if (_chartDateInfo != null && _chartDateInfo.length != 0) {

			if (parentChk != "C" && parentChk != "H" && parentChk != 'M' && parentChk != 'L' && parentChk != 'Q' && parentChk != 'Z'&& parentChk != 'K') {
				var startChartDate = _chartDateInfo[0].WMCYMD.split('.');
				var endChartDate = _chartDateInfo[1].WMCYMD.split('.');

				var startYear, startMonth, endYear, endMonth;

				startYear = startChartDate[0];
				startMonth = startChartDate[1];
				endYear = endChartDate[0];
				endMonth = endChartDate[1];

				var selectYear = Ext.getCmp("selectYear");
				var selectMonth = Ext.getCmp("selectMonth");
				var selectYear2 = Ext.getCmp("selectYear2");
				var selectMonth2 = Ext.getCmp("selectMonth2");

				selectYear.setValue(startYear);
				selectMonth.setValue(startMonth);
				selectYear2.setValue(endYear);
				selectMonth2.setValue(endMonth);


			} else if (parentChk == "H") {

				var hSelectYear = Ext.getCmp("hSelectYear");
				var hSelectMonth = Ext.getCmp("hSelectMonth");
				var hSelectDay = Ext.getCmp("hSelectDay");
				hSelectYear.setValue(_chartDateInfo[0][0]);
				hSelectMonth.setValue(_chartDateInfo[0][1]);
				hSelectDay.setValue(_chartDateInfo[0][2]);

			} else if (parentChk == 'M') {

				var m_SelectYear = Ext.getCmp("m_SelectYear");
				var m_SelectMonth = Ext.getCmp("m_SelectMonth");
				var m_SelectDay = Ext.getCmp("m_SelectDay");

				var m_EndYear = Ext.getCmp("m_EndYear");
				var m_EndMonth = Ext.getCmp("m_EndMonth");
				var m_EndDay = Ext.getCmp("m_EndDay");

				var dateNameObj = {
					'M001': 'MESURE_DT',
					'M002': 'MESURE_DE'
				};

				m_SelectYear.setValue(_chartDateInfo[0][dateNameObj[$KRF_APP.layerCode]].substr(0, 4));
				m_SelectMonth.setValue(_chartDateInfo[0][dateNameObj[$KRF_APP.layerCode]].substr(4, 2));
				m_SelectDay.setValue(_chartDateInfo[0][dateNameObj[$KRF_APP.layerCode]].substr(6, 2));

				m_EndYear.setValue(_chartDateInfo[0][dateNameObj[$KRF_APP.layerCode]].substr(0, 4));
				m_EndMonth.setValue(_chartDateInfo[0][dateNameObj[$KRF_APP.layerCode]].substr(4, 2));
				m_EndDay.setValue(_chartDateInfo[0][dateNameObj[$KRF_APP.layerCode]].substr(6, 2));

			} else if (parentChk == 'Z') {

				var z_SelectYear = Ext.getCmp("z_SelectYear_chart");
				var z_SelectMonth = Ext.getCmp("z_SelectMonth_chart");

				var z_EndYear = Ext.getCmp("z_EndYear_chart");
				var z_EndMonth = Ext.getCmp("z_EndMonth_chart");

				z_SelectYear.setValue(_chartDateInfo[0].WMCYMD.split('.')[0]);
				z_SelectMonth.setValue(_chartDateInfo[0].WMCYMD.split('.')[1] < 10 ? '0' + _chartDateInfo[0].WMCYMD.split('.')[1] : _chartDateInfo[0].WMCYMD.split('.')[1]);

				z_EndYear.setValue(_chartDateInfo[0].WMCYMD.split('.')[0]);
				z_EndMonth.setValue(_chartDateInfo[0].WMCYMD.split('.')[1] < 10 ? '0' + _chartDateInfo[0].WMCYMD.split('.')[1] : _chartDateInfo[0].WMCYMD.split('.')[1]);

			} else if (parentChk == 'L') {

				var l_SelectYear = Ext.getCmp("l_SelectYear");
				var l_SelectMonth = Ext.getCmp("l_SelectMonth");

				var l_EndYear = Ext.getCmp("l_EndYear");
				var l_EndMonth = Ext.getCmp("l_EndMonth");

				var startChartDate = _chartDateInfo[0].WMCYMD.split('.');
				var endChartDate = _chartDateInfo[1].WMCYMD.split('.');

				var startYear, startMonth, endYear, endMonth;

				startYear = startChartDate[0];
				startMonth = startChartDate[1];
				endYear = endChartDate[0];
				endMonth = endChartDate[1];

				l_SelectYear.setValue(startYear);
				l_SelectMonth.setValue(startMonth);
				l_EndYear.setValue(endYear);
				l_EndMonth.setValue(endMonth);


			} else if (parentChk == 'Q') {
				var q_SelectYear = Ext.getCmp("q_SelectYear");
				var q_SelectMonth = Ext.getCmp("q_SelectMonth");

				var q_EndYear = Ext.getCmp("q_EndYear");
				var q_EndMonth = Ext.getCmp("q_EndMonth");

				q_SelectYear.setValue(_chartDateInfo[0].MESURE_DT.substr(0, 4));
				q_SelectMonth.setValue(_chartDateInfo[0].MESURE_DT.substr(4, 2));

				q_EndYear.setValue(_chartDateInfo[0].MESURE_DT.substr(0, 4));
				q_EndMonth.setValue(_chartDateInfo[0].MESURE_DT.substr(4, 2));
			} else if (parentChk == 'K') {
				var k_SelectYear = Ext.getCmp("k_SelectYear");
				var k_SelectMonth = Ext.getCmp("k_SelectMonth");

				var k_EndYear = Ext.getCmp("k_EndYear");
				var k_EndMonth = Ext.getCmp("k_EndMonth");

				k_SelectYear.setValue(_chartDateInfo[0].MESURE_DT.substr(0, 4));
				k_SelectMonth.setValue(_chartDateInfo[0].MESURE_DT.substr(4, 2));

				k_EndYear.setValue(_chartDateInfo[0].MESURE_DT.substr(0, 4));
				k_EndMonth.setValue(_chartDateInfo[0].MESURE_DT.substr(4, 2));
			} else {
				var startChartDate = _chartDateInfo[0].WMCYMD.split(' ');
				var endChartDate = _chartDateInfo[1].WMCYMD.split(' ');

				var startYear, startMonth, endYear, endMonth;


				startYear = startChartDate[0];

				if (startChartDate[1] == "상반기") {
					startMonth = 1;
				} else {
					startMonth = 2;
				}


				endYear = endChartDate[0];

				if (endChartDate[1] == "상반기") {
					endMonth = 1;
				} else {
					endMonth = 2;
				}
				//endMonth = endChartDate[1];

				var cStartChartYear = Ext.getCmp("cStartChartYear");
				var cStartChartYearDetail = Ext.getCmp("cStartChartYearDetail");
				var cEndChartYear = Ext.getCmp("cEndChartYear");
				var cEndChartYearDetail = Ext.getCmp("cEndChartYearDetail");

				//testy = ['2010','2011'];
				//cStartChartYear.setStore(testy);
				cStartChartYear.setValue(startYear);
				cStartChartYearDetail.setValue(startMonth);
				cEndChartYear.setValue(endYear);
				cEndChartYearDetail.setValue(endMonth);
				//var nowDate = KRF_DEV.global.CommFn.nowDate.getYear();
				//var minDate = 2013;

				//var cnt = -1;

				/*for(var i = minDate; i <= nowDate; i++){
				    
					dateArr.push({id:i + "1",name:i + "상반기"});
					dateArr.push({id:i + "2",name:i + "하반기"});
				    
					cnt++;
				}*/

				/*var store = Ext.create('Ext.data.Store',{
					fields: ['id', 'name'],
					data:dateArr
				});*/

				//cStartChartDate.bindStore(store);
				//cStartChartDate.setValue(dateArr[cnt * 2 - 2].id);

				//cEndChartDate.bindStore(store);
				//cEndChartDate.setValue(dateArr[cnt * 2 + 1].id);
			}

			if (_chartDateInfo[0].f_gubun != undefined) {
				var gubun = _chartDateInfo[0].f_gubun.substring(2, 3);
				Ext.getCmp("f_Chart").setValue(gubun);
			} else {
				itemCtl.setValue(_chartDateInfo[0].ITEM_NAME);
			}
		}
		//    	this.on("beforeclose", function chartDateWinClose(){
		//    	});
	},
	items: [{
		xtype: 'container',
		//y: 15,
		y: 5,
		x: 5,
		layout: {
			type: 'vbox',
			align: 'left'
			//pack: 'middle'
		},
		items: [{
			xtype: 'container',
			id: "startChartDate",
			layout: {
				type: 'hbox',
				align: 'left',
				pack: 'left'
			},
			items: [{
				xtype: 'combo',
				id: 'selectYear',
				//..fieldLabel: '<b>년</b> ',
				store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
				value: '2014',
				//labelWidth: 30,
				//labelAlign: 'right',
				width: 65,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'selectMonth',
				//fieldLabel: '<b>월</b> ',
				store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				value: '10',
				//labelWidth: 20,
				//labelAlign: 'right',
				width: 55,
				height: 25
			}, {
				xtype: 'label',
				text: '월 부터'
			}]
		}, {
			xtype: 'container',
			height: 5
		}, {
			items: [{
				xtype: 'container',
				id: "endChartDate",
				layout: {
					type: 'hbox',
					align: 'left',
					pack: 'left'
				},
				items: [{
					xtype: 'combo',
					id: 'selectYear2',
					//fieldLabel: '<b>년</b> ',
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
					value: '2015',
					//labelWidth: 30,
					//labelAlign: 'right',
					width: 65,
					height: 25
				}, {
					xtype: 'label',
					text: '년'
				}, {
					xtype: 'container',
					width: 10

				}, {
					xtype: 'combo',
					id: 'selectMonth2',
					//fieldLabel: '<b>월</b> ',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					value: '10',
					//labelWidth: 20,
					//labelAlign: 'right',
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월 까지'
				}]
			}]
		}, {
			items: [{
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'middle',
					pack: 'middle'
				},
				items: [{
					xtype: 'combo',
					id: 'f_Chart',
					//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{ id: '1', name: '방류유량' }
							, { id: '2', name: '직접이송량' }
							, { id: '3', name: '총유입량' }
							, { id: '4', name: '관거이송량' }]
					}),
					value: '방류유량',
					width: 135,
					height: 25
				}, {
					xtype: 'container',
					width: 10

				}, {
					xtype: 'label',
					id: 'f_ChartText',
					text: '항목'
				}]
			}]
		}, {
			xtype: "container",
			id: "cStartChartDate",
			layout: {
				type: "hbox"
			},
			items: [{
				xtype: "combo",
				width: 90,
				height: 25,
				store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
				//id:"cStartChartDate",
				id: "cStartChartYear",
				editable: false
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 5
			}, {
				xtype: "combo",
				width: 60,
				height: 25,
				id: "cStartChartYearDetail",
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 1, name: "상" }, { id: 2, name: "하" }]
				}),
				editable: false
			}, {
				xtype: 'label',
				text: '반기'
			}]
		}, {
			xtype: 'container',
			height: 5
		}, {
			xtype: "container",
			id: "cEndChartDate",
			layout: {
				type: "hbox"
			},
			items: [{
				xtype: "combo",
				width: 90,
				height: 25,
				store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
				id: "cEndChartYear",
				//id:"cStartChartDate",
				editable: false
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 5
			}, {
				xtype: "combo",
				width: 60,
				height: 25,
				id: "cEndChartYearDetail",
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: 1, name: "상" }, { id: 2, name: "하" }]
				}),
				//id:"cStartChartDate",
				editable: false
			}, {
				xtype: 'label',
				text: '반기'
			}]
		}, {
			xtype: 'container',
			height: 5
		}, {
			xtype: "container",
			id: "hChartDate",
			layout: {
				type: "vbox"
			},
			items: [{
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
					value: '2018',
					id: "hSelectYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: 'combo',
					id: 'hSelectMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					value: '03',
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월'
				}, {
					xtype: 'container',
					width: 5
				}, {
					xtype: 'combo',
					id: 'hSelectDay',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
						'15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
					value: '31',
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '일'
				}]
			}]
		}, {
			xtype: "container",
			id: "m_ChartDate",
			layout: {
				type: "vbox"
			},
			items: [{
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "m_SelectYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: 'combo',
					id: 'm_SelectMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월'
				}, {
					xtype: 'container',
					width: 5
				}, {
					xtype: 'combo',
					id: 'm_SelectDay',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
						'15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '일 부터'
				}]
			}, {
				xtype: 'container',
				height: 5
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "m_EndYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: 'combo',
					id: 'm_EndMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월'
				}, {
					xtype: 'container',
					width: 5
				}, {
					xtype: 'combo',
					id: 'm_EndDay',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
						'15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '일 까지'
				}]
			}]
		}, {
			xtype: "container",
			id: "l_ChartDate",
			layout: {
				type: "vbox"
			},
			items: [{
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "l_SelectYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: 'combo',
					id: 'l_SelectMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월'
				}, {
					xtype: 'container',
					width: 5
				}]
			}, {
				xtype: 'container',
				height: 5
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "l_EndYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: 'combo',
					id: 'l_EndMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월'
				}]
			}]
		}, {
			xtype: "container",
			id: "z_ChartDate",
			layout: {
				type: "vbox"
			},
			items: [{
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "z_SelectYear_chart",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}, {
					xtype: 'combo',
					id: 'z_SelectMonth_chart',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월 부터'
				}]
			}, {
				xtype: 'container',
				height: 5
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "z_EndYear_chart",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}, {
					xtype: 'combo',
					id: 'z_EndMonth_chart',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월 부터'
				}]
			}]
		}, {
			xtype: "container",
			id: "q_ChartDate",
			layout: {
				type: "vbox"
			},
			items: [{
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "q_SelectYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}, {
					xtype: 'combo',
					id: 'q_SelectMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월 부터'
				}]
			}, {
				xtype: 'container',
				height: 5
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "q_EndYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}, {
					xtype: 'combo',
					id: 'q_EndMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월 까지'
				}]
			}]
		}, {
			xtype: "container",
			id: "k_ChartDate",
			layout: {
				type: "vbox"
			},
			items: [{
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "k_SelectYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}, {
					xtype: 'combo',
					id: 'k_SelectMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월 부터'
				}]
			}, {
				xtype: 'container',
				height: 5
			}, {
				xtype: 'container',
				layout: 'hbox',
				style: 'margin-bottom:5px;',
				items: [{
					xtype: "combo",
					width: 80,
					height: 25,
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
					id: "k_EndYear",
					editable: false,
				}, {
					xtype: 'label',
					text: '년'
				}, {
					xtype: 'combo',
					id: 'k_EndMonth',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					width: 55,
					height: 25
				}, {
					xtype: 'label',
					text: '월 까지'
				}]
			}]
		}, {
			items: [{
				xtype: 'container',
				style: 'margin-bottom:5px;',
				layout: {
					type: 'hbox',
					align: 'middle',
					pack: 'middle'
				},
				items: [{
					xtype: 'combo',
					id: 'selectItem',
					//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{ id: 'ITEM_BOD', name: 'BOD' }
							, { id: 'ITEM_DOC', name: 'DO' }
							, { id: 'ITEM_COD', name: 'COD' }
							, { id: 'ITEM_TN', name: 'T-N' }
							, { id: 'ITEM_TP', name: 'T-P' }
							, { id: 'ITEM_TEMP', name: '수온' }
							, { id: 'ITEM_PH', name: 'pH' }
							, { id: 'ITEM_SS', name: 'SS' }
							, { id: 'ITEM_CLOA', name: '클로로필a' }]
					}),
					value: '',
					width: 135,
					height: 25

				}, {
					xtype: 'container',
					width: 10

				}, {
					xtype: 'label',
					text: '항목'
				}]
			}]
		}, {
			xtype: 'container',
			height: 5
		}, {
			items: [{
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'middle',
					pack: 'middle'
				},
				items: [{
					xtype: 'container',
					width: 80
				}, {
					xtype: 'image',
					//xtype: 'button',
					id: 'btnSearch',
					listeners: {
						el: {
							click: 'onSearchChartData'
						}
					},
					width: 34,
					height: 19,
					src: './resources/images/button/icon_seah.gif'
				}]
			}]
		}]
	}]
});
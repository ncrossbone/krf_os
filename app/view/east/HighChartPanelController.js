/**
* North Controller
*/
Ext.define('krf_new.view.east.HighChartPanelController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.highChartPanelController',
	id: 'highChartPanelController',


	colorArr : ['#d3144c','#02568e','#f7941d','#10a700','#92278f'],
	itemArry : {
		'A': [{text:'BOD',code:'ITEM_BOD'},{text:'COD',code:'ITEM_COD'},{text:'T-N',code:'ITEM_TN'},{text:'T-P',code:'ITEM_TP'},{text:'DO',code:'ITEM_DOC'}]
		,'B': [{ code: 'ITEM_BOD', text: 'BOD' }
			, { code: 'ITEM_COD', text: 'COD' }
			, { code: 'ITEM_DOC', text: 'DO' }
			, { code: 'ITEM_TN', text: 'T-N' }
			, { code: 'ITEM_TP', text: 'T-P' }
			, { code: 'ITEM_FLW', text: '적산유량(평균)' }
			, { code: 'ITEM_PH', text: 'pH' }
			, { code: 'ITEM_SS', text: 'SS' }
			, { code: 'ITEM_TOC', text: '총유기탄소' }]
		,'C':[{ code: 'ITEM_COD', text: 'COD' }
			, { code: 'ITEM_TN', text: 'TN' }
			, { code: 'ITEM_TP', text: 'TP' }
			, { code: 'ITEM_SRP', text: 'SRP' }
			, { code: 'ITEM_PB', text: 'PB' }
			, { code: 'ITEM_ZN', text: 'ZN' }
			, { code: 'ITEM_CU', text: 'CU' }
			, { code: 'ITEM_CR', text: 'CR' }
			, { code: 'ITEM_NI', text: 'NI' }
			, { code: 'ITEM_AS', text: 'AS' }
			, { code: 'ITEM_CD', text: 'CD' }
			, { code: 'ITEM_HG', text: 'HG' }
			, { code: 'ITEM_AL', text: 'AL' }
			, { code: 'ITEM_LI', text: 'LI' }]
		
		,'D001':[{ code: 'WL', text: '수위(cm)' }]
		,'D002':[{ code: 'RF', text: '우량자료(mm)' }]
		,'D003':[{ code: 'FW', text: '유량(CMS)' }]
		,'D004':[{ code: 'SWL', text: '저수위(cm)' },
				{ code: 'INF', text: '유입량(cms)' },
				{ code: 'OTF', text: '방류량(cms)' },
				{ code: 'SFW', text: '저수량(만㎥)' },
				{ code: 'ECPC', text: '공용량(백만㎥)' }]
		,'D005':[{ code: 'WD', text: '풍향(m/s)' },
				{ code: 'WS', text: '풍속(m/s)' },
				{ code: 'TA', text: '기온(℃)' },
				{ code: 'HM', text: '습도' },
				{ code: 'PA', text: '현지기압' },
				{ code: 'PS', text: '해면기압' },
				{ code: 'RNYN', text: '강수감지' },
				{ code: 'RN1HR', text: '강수량(mm)' },
				{ code: 'RNDAY', text: '누적강수량(mm)' }]
		,'D006':[{ code: 'RND', text: '강수량자료(mm)' },
				{ code: 'TA', text: '기온(℃)' },
				{ code: 'SIDAY', text: '일사(MJ/m2)' }]
		,'D007':[{ code: 'SWL', text: '보 상류수위' },
				{ code: 'OWL', text: '보 하류수위' },
				{ code: 'SFW', text: '저수량' },
				{ code: 'ECPC', text: '공용량' },
				{ code: 'INF', text: '유입량' },
				{ code: 'TOTOTF', text: '총 방류량' },
				{ code: 'EGOTF', text: '발전 방류량' },
				{ code: 'GTOTF', text: '가동보 방류량' },
				{ code: 'CBOTF', text: '고정보 방류량' },
				{ code: 'FWOTF', text: '어도 방류량' },
				{ code: 'ETCOTF', text: '기타 방류량' }]
		,'E':[{ code: 'SWL', text: '보 상류수위' },
				{ code: 'OWL', text: '보 하류수위' },
				{ code: 'SFW', text: '저수량' },
				{ code: 'ECPC', text: '공용량' },
				{ code: 'INF', text: '유입량' },
				{ code: 'TOTOTF', text: '총 방류량' },
				{ code: 'EGOTF', text: '발전 방류량' },
				{ code: 'GTOTF', text: '가동보 방류량' }, 
				{ code: 'CBOTF', text: '고정보 방류량' },
				{ code: 'FWOTF', text: '어도 방류량' },
				{ code: 'ETCOTF', text: '기타 방류량' }]
		,'F':[{code: '1' , text:'방류유량'}
			,{code: '2' , text:'직접이송량'}
			,{code: '3' , text:'총유입량'}
			,{code: '4' , text:'관거이송량'}]
		,'F_1':[{ code: 'AMT_PHYS', text: '방류량_물리적' }
			, { code: 'AMT_BIO', text: '방류량_생물학적' }
			, { code: 'AMT_HIGHTEC', text: '방류량_고도' }
			, { code: 'ITEM_BOD', text: 'BOD' }
			, { code: 'ITEM_COD', text: 'COD' }
			, { code: 'ITEM_SS', text: 'SS' }
			, { code: 'ITEM_TN', text: 'TN' }
			, { code: 'ITEM_TP', text: 'TP' }
			, { code: 'ITEM_COLI', text: '대장균군수' }]
		,'F_2':[{ code: 'ITEM_AMT', text: '유량' }
			, { code: 'ITEM_BOD', text: 'BOD' }
			, { code: 'ITEM_COD', text: 'COD' }
			, { code: 'ITEM_SS', text: 'SS' }
			, { code: 'ITEM_TN', text: 'TN' }
			, { code: 'ITEM_TP', text: 'TP' }
			, { code: 'ITEM_COLI', text: '대장균군수' }]
		,'F_3':[{ code: 'ITEM_AMT', text: '유량' }
			, { code: 'ITEM_BOD', text: 'BOD' }
			, { code: 'ITEM_COD', text: 'COD' }
			, { code: 'ITEM_SS', text: 'SS' }
			, { code: 'ITEM_TN', text: 'TN' }
			, { code: 'ITEM_TP', text: 'TP' }
			, { code: 'ITEM_COLI', text: '대장균군수' }]
		,'F_4':[{ code: 'ITEM_AMT', text: '유량' }
			, { code: 'ITEM_BOD', text: 'BOD' }
			, { code: 'ITEM_COD', text: 'COD' }
			, { code: 'ITEM_SS', text: 'SS' }
			, { code: 'ITEM_TN', text: 'TN' }
			, { code: 'ITEM_TP', text: 'TP' }
			, { code: 'ITEM_COLI', text: '대장균군수' }
			, { code: 'ITEM_BYPASS_AMT', text: '미처리배제유량' }]
		,'I':[{ code: 'ITEM_TEMP', text: '수온' }
			, { code: 'ITEM_AVERAGE_CLOA', text: 'Chl-a' }
			, { code: 'ITEM_SURFACE_BLUE_GREEN_ALGAE', text: '유해남조류' }]
		
	},

	selectVisibleObj : {'A':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'B':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'C':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'D001':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'D002':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'D003':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'D004':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'D005':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'D006':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'D007':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'E':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'F':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'G':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'H':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'I':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					   ,'J':['startYearHigh','startMonthHigh','endYearHigh','endMonthHigh']
					},

	selectBoxArr : ['startYearHigh'
					,'startMonthHigh'
					,'startDayHigh'
					,'startCFlagHigh'
					,'endYearHigh'
					,'endMonthHigh'
					,'startGFlagHigh'
					,'endCFlagHigh'
					,'endGFlagHigh'
					,'endDayHigh'
					,'endHFlagHigh'
					,'startHFlagHigh'],

	unitValueObj : {
		ITEM_BOD:'(㎎/L)',
		BOD:'(㎎/L)',
		ITEM_COD:'(㎎/L)',
		COD:'(㎎/L)',
		ITEM_TOC:'(㎎/L)',
		TOC:'(㎎/L)',
		ITEM_TN:'(㎎/L)',
		TN:'(㎎/L)',
		ITEM_TP:'(㎎/L)',
		TP:'(㎎/L)',
		ITEM_DOC:'(㎎/L)',
		DOC:'(㎎/L)',
		DO:'(㎎/L)',
		ITEM_TEMP:'(℃)',
		ITEM_SURFACE_BLUE_GREEN_ALGAE:'(cells/mL)',
		ITEM_AVERAGE_CLOA:'(㎎/㎥)',
		ITEM_CLOA:'(㎎/㎥)',
		SFW:'(만㎥)',
		SWL:'(cm)',
		INF:'(만㎥)',
		OWL:'(cm)',
		OTF:'(㎥/sec)',
		ITEM_EC:'(μS/cm)',
		WTRTP:'(℃)',
		EC:'(μS/cm)',
		ATAL_TDI_HEALTH_GRAD:'(등급)',
		BEMA_BMI_HEALTH_GRAD:'(등급)',
		FISH_FAI_HEALTH_GRAD:'(등급)',
		INHA_HRI_HEALTH_GRAD:'(등급)',
		VTN_RVI_HEALTH_GRAD:'(등급)',
		AVRG_SPFLD:'(m/s)',
		DYRG_FLUX:'(㎥/sec)',
	},
	
	
	constructor: function () {
		
		var me = this;

		$KRF_APP.addListener($KRF_EVENT.CREATE_HIGH_CHART, me.createHighChart, me); // HIGHCHART CONTROL
		$KRF_APP.addListener($KRF_EVENT.CREATE_HIGH_CHART_DATE, me.createHighChartDate, me); // HIGHCHART CONTROL
		me.createHighChart();
		$KRF_APP.addListener($KRF_EVENT.HIGH_CHART_CONTROL, me.highChartControl, me); // HIGHCHART CONTROL
		$KRF_APP.addListener($KRF_EVENT.SET_HIGH_CHART_DATE, me.setHighChartDate, me); // HIGHCHART CONTROL

	},

	//하이차트 combo BOX 이벤트 change
	setHighChartEvent: function(){

		$('#startYearHigh, #startMonthHigh, #endYearHigh, #endMonthHigh, #startGFlagHigh, #endGFlagHigh, #startDayHigh, #endDayHigh').off('change').on('change',function(){
			var flag = $KRF_APP.highChart.saveParentId;
			
			if(parseInt($('#startYearHigh').val() +''+ $('#startMonthHigh').val()) > parseInt($('#endYearHigh').val() +''+ $('#endMonthHigh').val())){
				$(this).val($(this).data('previous'));
				return alert('시작날짜가 큽니다.');
			}
			$(this).data('previous',$(this).val());
			
			//전역변수 날짜값 바꾸기
			$KRF_APP.highChart.param[$(this).attr('id')] = $(this).val();
			
			$KRF_APP.global.CommFn.getHighChartData();
		});
		
		$('#startYearHigh, #startMonthHigh, #endYearHigh, #endMonthHigh, #startGFlagHigh, #endGFlagHigh, #startDayHigh, #endDayHigh').off('focus').on('focus', function () {
			$(this).data('previous',$(this).val());
		});

		

	},


	createHighChartDate: function(datas){
		var me  = this;

		var data = datas.data;
		for(var j = 0; j < data.length; j++){
			if($KRF_APP.highChart.dateArr.indexOf(data[j].WMCYMD) == -1){
				$KRF_APP.highChart.dateArr.push(data[j].WMCYMD);
			}
		}
		$KRF_APP.highChart.dateArr.sort();

	},

	createHighChart: function(datas){

		var me  = this;

		if(!datas > 0){
			return;
		}
		var data = datas.data;
		var ulIdArr = datas.ulIdArr;
		var ulNameArr = datas.ulNameArr;

		// $KRF_APP.highChart.dateArr = [];
		// $KRF_APP.highChart.chartObj = {};
		
		//parent 값이 바뀌면서 초기 세팅 // 환경기초시설 예외 처리
		if($KRF_APP.highChart.saveParentId == "F"){
			if($KRF_APP.highChart.removeLabel){
				// 환경기초시설 초기 chartItemInsert 함수에서 fFlag 값을 설정함 
				// 환경기초시설은 selectbox가 이중구조여서 버튼 재생성이 필요하나 날짜는 combobox는 남겨야 하므로
				if($KRF_APP.highChart.fFlag == ""){ 
					$KRF_APP.fireEvent($KRF_EVENT.SET_HIGH_CHART_DATE,null);
				}
				me.chartItemInsert($KRF_APP.highChart.saveParentId);
				me.setHighChartEvent();
				me.createHighChartDate(datas);
			}
		}else{
			if(datas.removeLabel){
				me.chartItemInsert($KRF_APP.highChart.saveParentId);
				$KRF_APP.fireEvent($KRF_EVENT.SET_HIGH_CHART_DATE,null);
				me.setHighChartEvent();
				me.createHighChartDate(datas);
			}
		}
		
		



		for(var j = 0; j < data.length ; j++){
			// if($KRF_APP.highChart.dateArr.indexOf(data[j].WMCYMD) == -1){
			// 	$KRF_APP.highChart.dateArr.push(data[j].WMCYMD);
			// }
			if(!$KRF_APP.highChart.chartObj[data[j].PT_NO]){
				$KRF_APP.highChart.chartObj[data[j].PT_NO] = {data:{PT_NM:data[j].PT_NM}};
				$KRF_APP.highChart.chartObj[data[j].PT_NO].data[data[j].WMCYMD] = parseFloat(data[j].ITEM_VALUE);
			}else{
				$KRF_APP.highChart.chartObj[data[j].PT_NO].data[data[j].WMCYMD] = parseFloat(data[j].ITEM_VALUE);
			}
		}
		
		for(var i = 0; i < $KRF_APP.highChart.ulIdArr.length; i++){

			if($KRF_APP.highChart.ulIdArr[i] == ulIdArr){
				var datas = [];
				var sname = '';
				
				//기존 차트 범례 새로생성
				$('#chartUl').append('<li style="width:100px;" value="'+$KRF_APP.highChart.ulIdArr[i]+'" onClick="$KRF_APP.global.CommFn.removeHighChartData(\'' + $KRF_APP.highChart.ulIdArr[i] + '\' , \'' + $KRF_APP.highChart.ulNameArr[i] + '\')"> <div class="gcwrap"><span class="gc g_c'+parseInt(i+1)+'"></span></div><span class="z_name">'+ $KRF_APP.highChart.ulNameArr[i] +'</span></li>');

				for(var j=0; j<$KRF_APP.highChart.dateArr.length; j++){
					if($KRF_APP.highChart.chartObj[$KRF_APP.highChart.ulIdArr[i]]){
						var itemVal = null;
						if($KRF_APP.highChart.chartObj[$KRF_APP.highChart.ulIdArr[i]].data[$KRF_APP.highChart.dateArr[j]]){
							switch ($KRF_APP.highChart.chartObj[$KRF_APP.highChart.ulIdArr[i]].data[$KRF_APP.highChart.dateArr[j]]) {
							case 888888888:
								itemVal = 0.00000002;
								break;
							case 999999999:
								itemVal = 0.00000001;
								break;	
							default:
								itemVal = $KRF_APP.highChart.chartObj[$KRF_APP.highChart.ulIdArr[i]].data[$KRF_APP.highChart.dateArr[j]];
								break;
							}
						}
						datas.push(itemVal);	
					}else{
						datas.push(null);
					}
					sname = $KRF_APP.highChart.ulNameArr[i];
				}
				$KRF_APP.highChart.seriesArr.push({
					color: me.colorArr[i],
					dashStyle: 'shortdot',
					data:datas,
					name:sname,
					connectNulls:true
				});
			}

			
		}

		var tooltip = {
				formatter: function() {
					var xValue = this.x;
					var yValue = this.y;
					
					if(yValue==2e-8){
						yValue='분석중';
					}else if(yValue==1e-8){
						yValue='정량한계미만';
					}
					
					if(xValue.length > 10){
						xValue = Highcharts.dateFormat('%Y.%m.%d %H시', new Date(xValue.split('.')[0] + '.' + xValue.split('.')[1] + '.' + xValue.split('.')[2] + ' ' + xValue.split('.')[3] + ':00'));
					}else if(xValue.length < 6){
						var hObj = {
								5:'A',
								4:'B',
								3:'C',
								2:'D',
								1:'E',
						};
						xValue = xValue.substr(0,4) +'년 ' + xValue.substr(4,1)+'회차';
						yValue = hObj[yValue];
					}
					
					var unitValue = '';
					if(me.unitValueObj[$('#highChartSelectItem').find('.active').parent().attr('id')]){
						unitValue = me.unitValueObj[$('#highChartSelectItem').find('.active').parent().attr('id')];
					}
					
					return  '<b>' + xValue +'</b><br/>' +
					'<b>' + this.series.name + '</b>' + ' : ' + yValue + ' ' + unitValue;
				}
		};


		var yAxis = {};
		
		if($('#dataSelect').val()=='H'){
			yAxis = {
					title:'',
					max:5,
					min:0,
					categories:[0,1,2,3,4,5],
					labels:{
						formatter:function(){
							var value = this.value;
							var hObj = {
									5:'A',
									4:'B',
									3:'C',
									2:'D',
									1:'E',
							};

							$('#dataSelect').val()=='H'?value=hObj[value]:value;
							return value;
						}
					}
			}
		}else{
			yAxis = {title:''}
		}

		var chartOption = {
			tooltip:tooltip,
			title:false,
			legend:false,
			credits:false,
			exporting:false,
			chart:{
				height: 210,
				width:500
			},
			lang: {
				noData: "측정자료가 없습니다."
			},
			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					marker: {
						enabled: true
					}
				}
			},
			xAxis:{
				categories: $KRF_APP.highChart.dateArr,
				labels:{
					formatter:function(){
						var value = this.value;
						$('#dataSelect').val()=='H'?value=value.substr(0,4) + ' ' + value.substr(4,2) + '회차':value;
						return value;
					}
				}
			},
			yAxis:yAxis,
			series: $KRF_APP.highChart.seriesArr,
			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom'
						}
					}
				}]
			}
		};

		Highcharts.chart('krfHighChartDiv', chartOption);

		Ext.getCmp('highChartContiner').unmask();

	},

	highChartControl: function(){
		
	},

	chartItemInsert: function(parentId){
		var me = this;

		$('#highChartSelectItem li').remove();

		//$KRF_APP.highChart.fFlag
		var html = '';
		
		if($KRF_APP.highChart.fFlag == ""){
			$KRF_APP.highChart.fFlag = "1";
		}


		var reParentId = parentId;

		if(parentId == "F"){
			reParentId = parentId+'_'+$KRF_APP.highChart.fFlag;
		}

		// 환경기초시설일경우
		if($KRF_APP.highChart.saveParentId == "F"){
			for(var i  = 0 ; i < me.itemArry[parentId].length ; i++){
				html += '<li style="float:left; text-align:center; cursor:pointer;" id="' + me.itemArry[parentId][i].code + '">';
				me.itemArry[parentId][i].code==$KRF_APP.highChart.fFlag?html += '<a class="active" ':html+='<a ';
				html+= ' id="button_'+me.itemArry[parentId][i].code+'" onClick="$KRF_APP.global.CommFn.setFHighChart(\'' + me.itemArry[parentId][i].code + '\')">' + me.itemArry[parentId][i].text + '</a>';
				html += '</li>';
			}
		}

		for(var i  = 0 ; i < me.itemArry[reParentId].length ; i++){
			html += '<li style="float:left; text-align:center; cursor:pointer;" id="' + me.itemArry[reParentId][i].code + '">';
			me.itemArry[reParentId][i].code==$KRF_APP.highChart.param.selectItem?html += '<a class="active" ':html+='<a ';
			html+= ' id="button_'+me.itemArry[reParentId][i].code+'" onClick="$KRF_APP.global.CommFn.getHighChartData(\'' + me.itemArry[reParentId][i].code + '\')">' + me.itemArry[reParentId][i].text + '</a>';
			html += '</li>';
		}


		$('#highChartSelectItem').html(html);

	},

	//$('#dataSelect').val()
	setHighChartDate: function(data){

		data = $KRF_APP.highChart.param.maxDate;


		for(var i = 0; i<this.selectBoxArr.length; i++){
			if(this.selectVisibleObj[$KRF_APP.highChart.saveParentId].indexOf(this.selectBoxArr[i])>-1){
				$('#'+this.selectBoxArr[i]).show();
			}else{
				$('#'+this.selectBoxArr[i]).hide(); 
			}
		}


		var dateStr = '';
		var lastDateStr = '';
		var preDate = '';

		var optionStartYear = '';
		var optionEndYear = '';
		
		var optionPreMonth = '';
		var optionNowMonth = '';
		
		if($KRF_APP.highChart.saveParentId == 'H'){
			dateStr=$KRF_APP.highChart.param.maxDate.WMYR
			var optionNowHFlag = '';
			var optionPreHFlag = '';
			for(var i = 1; i <= 2; i++){
				i==$KRF_APP.highChart.param.maxDate.TME?optionNowHFlag += '<option selected value="'+i+'">'+i+'회차</option>':optionNowHFlag += '<option value="'+i+'">'+i+'회차</option>';
				i==1?optionPreHFlag += '<option selected value="'+i+'">'+i+'회차</option>':optionPreHFlag += '<option value="'+i+'">'+i+'회차</option>';
			}
			$('#startHFlagHigh').html(optionPreHFlag);
			$('#endHFlagHigh').html(optionNowHFlag);
			
		}else if($KRF_APP.highChart.saveParentId == 'C'){
				dateStr=$KRF_APP.highChart.param.maxDate.WMYR;
				lastDateStr=$KRF_APP.highChart.param.minDate.WMYR;

				var nowDate = new Date(dateStr);
				var lastDate = new Date(lastDateStr);
				var optionNowCFlag = '';
				var optionPreCFlag = '';

				for(var i = nowDate.getFullYear(); i >= parseInt($KRF_APP.highChart.param.minDate.WMYR)-5 ; i--){
					i==nowDate.getFullYear()?optionEndYear += '<option selected value="'+i+'">'+i+'년</option>':optionEndYear += '<option value="'+i+'">'+i+'년</option>';
				}
	
				for(var i = lastDate.getFullYear(); i >= parseInt($KRF_APP.highChart.param.minDate.WMYR)-3 ; i--){
					i==parseInt($KRF_APP.highChart.param.minDate.WMYR)?optionStartYear += '<option selected value="'+i+'">'+i+'년</option>':optionStartYear += '<option value="'+i+'">'+i+'년</option>';
				}

				for(var i = 1; i <= 2; i++){
					i==$KRF_APP.highChart.param.maxDate.TME?optionNowHFlag += '<option selected value="'+i+'">'+(i==1?'상':'하')+'반기</option>':optionNowCFlag += '<option value="'+i+'">'+(i==1?'상':'하')+'반기</option>';
					i==1?optionPreCFlag += '<option selected value="'+i+'">'+(i==1?'상':'하')+'반기</option>':optionPreCFlag += '<option value="'+i+'">'+(i==1?'상':'하')+'반기</option>';
				}


				////////////////
				$('#startYearHigh').html(optionStartYear);
				$KRF_APP.highChart.param.startYearHigh = $('#startYearHigh').focus().val();

				$('#startMonthHigh').html(optionPreCFlag);
				$KRF_APP.highChart.param.startMonthHigh = $('#startMonthHigh').focus().val();

				////////////////
				$('#endYearHigh').html(optionEndYear);
				$KRF_APP.highChart.param.endYearHigh = $('#endYearHigh').focus().val();

				$('#endMonthHigh').html(optionNowCFlag);
				$KRF_APP.highChart.param.endMonthHigh = $('#endMonthHigh').focus().val();
				

		}else{
			if($KRF_APP.highChart.param.maxDate.WMYR == undefined && $KRF_APP.highChart.param.maxDate.WMOD == undefined){
				
				$KRF_APP.highChart.param.maxDate.WMYR = $KRF_APP.highChart.param.maxDate.WMCYMD.split('.')[0];
				$KRF_APP.highChart.param.maxDate.WMOD = $KRF_APP.highChart.param.maxDate.WMCYMD.split('.')[1];

				$KRF_APP.highChart.param.minDate.WMYR = $KRF_APP.highChart.param.minDate.WMCYMD.split('.')[0];
				$KRF_APP.highChart.param.minDate.WMOD = $KRF_APP.highChart.param.minDate.WMCYMD.split('.')[1];

			}

			dateStr=$KRF_APP.highChart.param.maxDate.WMYR + '-' + $KRF_APP.highChart.param.maxDate.WMOD;
			lastDateStr = $KRF_APP.highChart.param.minDate.WMYR + '-' + $KRF_APP.highChart.param.minDate.WMOD;

			
			var nowDate = new Date(dateStr);
			var lastDate = new Date(lastDateStr);
			
			for(var i = nowDate.getFullYear(); i >= parseInt($KRF_APP.highChart.param.minDate.WMYR)-5 ; i--){
				i==nowDate.getFullYear()?optionEndYear += '<option selected value="'+i+'">'+i+'년</option>':optionEndYear += '<option value="'+i+'">'+i+'년</option>';
			}

			for(var i = lastDate.getFullYear(); i >= parseInt($KRF_APP.highChart.param.minDate.WMYR)-3 ; i--){
				i==parseInt($KRF_APP.highChart.param.minDate.WMYR)?optionStartYear += '<option selected value="'+i+'">'+i+'년</option>':optionStartYear += '<option value="'+i+'">'+i+'년</option>';
			}
			
			for(var i = 1; i < 13; i++){
				var numStr = i<10?'0'+i:i;
				var preMonth = $KRF_APP.highChart.saveParentId=='D'?preMonth=(nowDate.getMonth()+1):preMonth=1;
				(i==(parseInt($KRF_APP.highChart.param.minDate.WMOD)))?optionPreMonth += '<option selected value="'+numStr+'">'+i+'월</option>':optionPreMonth += '<option value="'+numStr+'">'+i+'월</option>';
				(i==(nowDate.getMonth()+1))?optionNowMonth += '<option selected value="'+numStr+'">'+i+'월</option>':optionNowMonth += '<option value="'+numStr+'">'+i+'월</option>';
			}
			
			
			$('#startYearHigh').html(optionStartYear);
			$KRF_APP.highChart.param.startYearHigh = $('#startYearHigh').focus().val();

			$('#startMonthHigh').html(optionPreMonth);
			$KRF_APP.highChart.param.startMonthHigh = $('#startMonthHigh').focus().val();

			$('#endYearHigh').html(optionEndYear);
			$KRF_APP.highChart.param.endYearHigh = $('#endYearHigh').focus().val();

			$('#endMonthHigh').html(optionNowMonth);
			$KRF_APP.highChart.param.endMonthHigh = $('#endMonthHigh').focus().val();
			
		}
		
		


		$KRF_APP.highChart.param.defaultChart = "0";

		
		// 차트 라벨 설정
		var labelText = "";
		if($KRF_APP.highChart.ulNameArr.length > 0){
			for(var j = 0 ; j < $KRF_APP.highChart.ulNameArr.length ; j++){
				if(j = $KRF_APP.highChart.ulNameArr.length-1){
					labelText += $KRF_APP.highChart.ulNameArr[j];
				}else{
					labelText += $KRF_APP.highChart.ulNameArr[j]+", ";
				}
			}
		}
		
		//지점명칭 붙이기

		


		
		$('#siteNameLabel').text('자료 : '+$KRF_APP.highChart.parentName.split('(')[0]);
		
	}


});
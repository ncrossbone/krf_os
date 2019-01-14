/** 전역 변수 클래스 (공통함수)
 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */
Ext.define("krf_new.global.CommFn", {
	singleton: true, // 요게 있어야 set, get 메서드 사용가능..
	isIE: null,
	config: {
		globalTest: 0 // 테스트용 변수
	},
	catLayerNmMap: {
		"A": "수질측정지점",
		"B": "수질자동측정지점",
		"C": "퇴적물조사지점",
		"D": "기타측정지점",
		"E": "수생태계",
		"F": "환경기초시설",
		"G": "방사선측정지점",
		"I": "조류모니터링"
	},
	/* 연도 콤보 바인딩 현재 날짜 기준
	 * preYear : 시작년도
	 * sort : 정렬방법("Asc", "Desc")
	 * allMsg : 전체선택 메세지 */
	bindComboYear: function (preYear, sort, allMsg) {

		var nowDate = new Date();
		var edYear = nowDate.getFullYear();
		var retVal = [];

		if (allMsg != undefined) {

			retVal.push(allMsg);
		}

		if (sort == "Asc") {

			for (var i = preYear; i <= edYear; i++) {

				retVal.push(i);
			}
		} else if (sort == "Desc") {

			for (var i = edYear; i >= preYear; i--) {

				retVal.push(i);
			}
		}

		return retVal;
	},
	/* 월 콤보 바인딩 현재 날짜 기준
	 * sort : 정렬방법("Asc", "Desc")
	 * allMsg : 전체선택 메세지 */
	bindComboMonth: function (sort, allMsg) {

		var retVal = [];

		if (allMsg != undefined) {

			retVal.push(allMsg);
		}

		if (sort == "Asc") {

			for (var i = 0; i < 12; i++) {

				var strI = String(i + 1);

				if (strI.length == 1) {

					strI = "0" + strI;
				}

				retVal.push(strI);
			}
		} else if (sort == "Desc") {

			for (var i = 12; i > 0; i--) {

				var strI = String(i);

				if (strI.length == 1) {

					strI = "0" + strI;
				}

				retVal.push(strI);
			}
		}

		return retVal;
	},
	/* 일 콤보 바인딩 현재 날짜 기준
	 * sort : 정렬방법("Asc", "Desc")
	 * allMsg : 전체선택 메세지 */
	bindComboDay: function (sort, allMsg) {

		var nowDate = new Date();
		// 다음달 첫날
		var firstDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1);
		// 다음달 첫날 - 하루 = 이번달 마지막 날
		var lastDate = new Date(firstDate - 1);
		// 이번달 일 수
		var days = lastDate.getDate();
		var retVal = [];

		if (allMsg != undefined) {

			retVal.push(allMsg);
		}

		if (sort == "Asc") {

			for (var i = 0; i < days; i++) {

				var strI = String(i + 1);

				if (strI.length == 1) {

					strI = "0" + strI;
				}

				retVal.push(strI);
			}
		} else if (sort == "Desc") {

			for (var i = days; i > 0; i--) {

				var strI = String(i);

				if (strI.length == 1) {

					strI = "0" + strI;
				}

				retVal.push(strI);
			}
		}

		return retVal;
	},
	/* 시간 콤보 바인딩
	 * sort : 정렬방법("Asc", "Desc")
	 * allMsg : 전체선택 메세지 */
	bindComboHour: function (sort, allMsg) {

		var retVal = [];

		if (allMsg != undefined) {

			retVal.push(allMsg);
		}

		if (sort == "Asc") {

			for (var i = 0; i < 24; i++) {

				var strI = String(i);

				if (strI == 1) {

					strI = "0" + strI;
				}

				retVal.push(strI);
			}
		} else if (sort == "Desc") {

			for (var i = 23; i >= 0; i--) {

				var strI = String(i);

				if (strI.length == 1) {

					strI = "0" + strI;
				}

				retVal.push(strI);
			}
		}

		return retVal;
	},
	/* 현재날짜 관련 */
	nowDate: {
		/* 현재년도 가져오기 */
		getYear: function () {

			var nowDate = new Date();
			return nowDate.getFullYear();
		},
		/* 현재월 가져오기 */
		getMonth: function () {

			var nowDate = new Date();

			var strMonth = String(nowDate.getMonth() + 1);

			return strMonth.length == 1 ? "0" + strMonth : strMonth;
		},
		/* 현재일자 가져오기 */
		getDay: function () {

			var nowDate = new Date();

			var strDay = String(nowDate.getDate());

			return strDay.length == 1 ? "0" + strDay : strDay;
		},
		/* 현재시간 가져오기 */
		getHour: function () {

			var nowDate = new Date();

			var strHour = String(nowDate.getHours());
			return strHour.length == 1 ? "0" + strHour : strHour;
		},
		/* 월 더하기 빼기
		 * return year, month, day... */
		addMonth: function (addVal) {

			var nowDate = new Date();
			nowDate.setMonth(nowDate.getMonth() + addVal);

			var year = nowDate.getFullYear();
			var month = String(nowDate.getMonth() + 1).length == 1 ? "0" + String(nowDate.getMonth() + 1) : String(nowDate.getMonth() + 1);
			var day = String(nowDate.getDate()).length == 1 ? "0" + String(nowDate.getDate()) : String(nowDate.getDate());
			var hour = String(nowDate.getHours()).length == 1 ? "0" + String(nowDate.getHours()) : String(nowDate.getHours());

			return { year: year, month: month, day: day, hour: hour };
		}
	},
    /**
     * 엑셀파일 다운로드
     */
	excelDown: function (fileNm, headName, header, datas) {
		if (fileNm == null) {
			fileNm = "검색결과";
		}
		var xhr = new XMLHttpRequest();
		xhr.open('POST', _API.excelDown, true);
		xhr.responseType = 'blob';
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onload = function (e) {
			if (this.status == 200) {
				var blob = new Blob([this.response], { type: 'application/vnd.ms-excel' });
				var downloadUrl = URL.createObjectURL(blob);
				var a = document.createElement("a");
				a.href = downloadUrl;
				a.download = fileNm + ".xls";
				document.body.appendChild(a);
				a.click();
			} else {
				alert('엑셀다운로드 실패')
			}
		};
		xhr.send(JSON.stringify({ "headName": JSON.stringify(headName), "header": JSON.stringify(header), "datas": JSON.stringify(datas) }));
	},
	lpad: function (src, fix, width) {
		if (src == null || fix == null) {
			return src;
		}
		src = src + '';
		return src.length >= width ? src : new Array(width - src.length + 1).join(fix) + src;
	},
	rpad: function (src, fix, width) {
		if (src == null || fix == null) {
			return src;
		}
		src = src + '';
		return src.length >= width ? src : src + new Array(width - src.length + 1).join(fix);
	},
	dateFormatter: function (src, chartFlag) {
		if (src == null) {
			return '';
		}
		if (!chartFlag) {
			src = src.substr(1);
		}
		var des = '';

		for (var i = 0; i < src.length; i++) {
			var n = src.charAt(i);
			if (i == 4 || i == 6) {
				des += '.';
			}
			if (i == 8) {
				des += ' ';
			}
			if (i == 10 || i == 12) {
				des += ':';
			}
			des += n;
		}
		return des;
	},
	isIEFunc: function () {
		var agent = navigator.userAgent.toLowerCase();
		if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') > -1) || (agent.indexOf("msie") > -1)) {
			this.isIE = true;
		} else {
			this.isIE = false;
		}
	},
	getInitMode: function () {
		if (window.location.href.indexOf('#').indexOf(-1) > 0) {

		}

		return;
	},
	getLoginUserInfo: function () {
		var loginUserInfo = window.sessionStorage.getItem('krfLoginUser');

		if (loginUserInfo != null) {
			try {
				return JSON.parse(loginUserInfo);
			} catch (e) {
				console.log(e);
			}
		}
		return this.getParamLoginInfo();
	},
	getLoginUserId: function () {
		var loginUserInfo = this.getLoginUserInfo();
		if (loginUserInfo != null) {
			return loginUserInfo.userId;
		}
		return;
	},
	getParamLoginInfo: function () {
		var getParam = location.href.split('param=')[1];

		if (getParam != null) {
			var decodeUriObj = decodeURIComponent(getParam);
			window.sessionStorage.setItem('krfLoginUser', decodeUriObj);
			try {
				return JSON.parse(decodeUriObj);
			} catch (e) {
				console.log(e);
			}
		}
		return;
	},

	bookmarkInfo: {},
	bookSearchResult: [],

	setBookmarkInfo: function (flag, param) {
		var me = this;
		if (flag == 'searchResult') {

			var preIdx = me.bookSearchResult.map(function (e) {
				return e.gridId;
			}).indexOf(param.gridId);

			if (preIdx > -1) {
				me.bookSearchResult[preIdx] = param;
			} else {
				me.bookSearchResult.push(param);
			}

			me.bookmarkInfo[flag] = me.bookSearchResult;
		} else {
			me.bookmarkInfo[flag] = param;
		}
	},

	getBookmarkInfo: function () {
		return this.bookmarkInfo;
	},

	getSstgComboInfo: function(storeName){
		// 하천 
		// -하천
		// EsstgHcAtalSe : 부착돌말류-
		// EsstgHcBemaSe : 저서성대형무척추-
		// EsstgHcFishSe : 어류-
		// EsstgHcInhaSe : 서식 및 수변환경
		// EsstgHcQltwtrSe : 수질
		// EsstgHcVtnSe : 수변식생

		// -하구
		// EsstgHgAtalSe : 부착돌말류-
		// EsstgHgBemaSe : 저서성대형무척추-
		// EsstgHgFishSe : 어류-
		// EsstgHgVtnSe : 식생

		var store = null;
		if(storeName == 'EsstgHcAtalSe' || storeName == 'EsstgHcBemaSe' || storeName == 'EsstgHcFishSe' // 하천 부착돌말류,저서성대형무척추,어류
		|| storeName == 'EsstgHgAtalSe'|| storeName == 'EsstgHgBemaSe'|| storeName == 'EsstgHgFishSe'){	// 하구 부착돌말류,저서성대형무척추,어류
			store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: '1', name: '조사자료' }
					,{ id: '2', name: '출현생물종' }]
			});
		}else if(storeName == 'EsstgHcVtnSe'){
			store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: '1', name: '조사자료'}
					,{ id: '2', name: '출현식생'}
					,{ id: '3', name: '식생 면적'}
					,{ id: '4', name: '구간'}
					,{ id: '5', name: '구간별 정보'}
					,{ id: '6', name: '우점도'}]
			});
		}else{
			store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: '1', name: '조사자료' }]
			});
		}
		 


		return store;
	},

	initParamBo: function(){

	},

	//환경기초시설 검색 재설정
	setFHighChart : function(fFlag){
		
		// 환경기초시설 flag 변경
		$KRF_APP.highChart.fFlag = fFlag;

		// 라벨 새로그리기
		$KRF_APP.highChart.removeLabel = true;
		
		// ajax requestUrl 변경
		$KRF_APP.highChart.param.url = _API['GetRWMDT_F_'+$KRF_APP.highChart.fFlag];
		$KRF_APP.highChart.dateArr = [];
		$KRF_APP.highChart.chartObj = [];
		
		//재검색
		$KRF_APP.global.CommFn.getHighChartData($KRF_APP.highChart.param.selectItem);

	},


	//  bolistwinodw button function 가져옴
	chartInfoConrtoller: function(grid, rowIndex, colIndex, actionItem, node, record, row, activeTab){
		
		var test = record.data.text;
		var chkText = record.id;
		var parentId = record.data.parentId;

		var parentIdName = parentId.substring(0,1);
		if(parentIdName.substring(0,1) == 'D'){
			parentIdName = parentId;
		}

		//새로 차트 생성할때 , 다른 parent일때 
		if(parentIdName != $KRF_APP.highChart.saveParentId){
			// high차트 전여변수 초기화
			$KRF_APP.global.CommFn.resetHighChart();

			//parent node text 저장
			$KRF_APP.highChart.parentName = record.parentNode.data.text;

			//보명칭
			var boName = Ext.getCmp('boListTree').getStore().data.items[0].data.text.split('(')[0];

			//전역변수에 저장 ( 지점명 )
			$KRF_APP.highChart.ulNameArr.push(boName+':'+test);

			// 기존 차트 store 변형으로 초기 데이터 및 전역변수 설정
			ShowWindowSiteNHighChart(activeTab, chkText, test, parentId, undefined); 
		}else{

			var insertChart = true;
			if($KRF_APP.highChart.ulIdArr.length < 5){ // 차트 갯수 확인
				// 지점id가 지점 전역변수에 있는지 없는지(중복체크) 확인
				for(var a = 0 ; a < $KRF_APP.highChart.ulIdArr.length; a++){
					if($KRF_APP.highChart.ulIdArr[a] == chkText){
						insertChart = false;
					}
				}
				
				// 전역변수에 같은 지점이 없을시 chart add
				if(insertChart){
					//보명칭
					var boName = Ext.getCmp('boListTree').getStore().data.items[0].data.text.split('(')[0];
					$KRF_APP.highChart.ulNameArr.push(boName+':'+test); //전역변수에 저장 ( 지점명 )
					$KRF_APP.highChart.ulIdArr.push(chkText); //전역변수에 저장 ( 지점 id )
					$KRF_APP.highChart.removeLabel = false; // 같은 parent에 추가 검색
					$KRF_APP.global.CommFn.getHighChartData(); // ajax chart data 검색
					ChangeBoTabIndex(activeTab);
				}
			}else{
				alert("차트는 최대 5개까지 추가하실수 있습니다.");
			}
			
			
		}

	},


	// high차트 변수 reset
	resetHighChart: function(){

		//라벨 지우기
		$('#chartUl li').remove();

		// 하이차트 전역변수 reset
		$KRF_APP.highChart = {saveParentId: '' //그룹코드
		, ulIdArr:[] //지점코드
		, ulNameArr:[] //지점명칭
		, seriesArr:[] // 하이차트 데이터
		, removeLabel:false //
		, dateArr: [] // 차트 날짜
		, chartObj:{} // 
		, fFlag : '' // 환경기초시설 구분
		, parentName: '' // 상위 그룹 이름
		, param:{'url':'', 'startYearHigh':'', 'endYearHigh':'' , 'startMonthHigh': '', 'endMonthHigh':'' 
				, 'selectItem':'', 'maxDate':'', 'minDate':'', 'defaultChart':'1'}};
	},

	// high차트 배열에 요소 삭제
	removeByValue: function(array, value){
		return array.filter(function(elem, _index){
			return value != elem;
		});
	},

	// high차트 삭제
	removeHighChartData: function(recordId , recordName){

		// 차트가 마지막 하나 남았을때는 remove 안되게
		if($KRF_APP.highChart.ulIdArr.length == 1){
			return;
		}
		//배열 요소 삭제
		$KRF_APP.highChart.ulIdArr = this.removeByValue($KRF_APP.highChart.ulIdArr, recordId);
		$KRF_APP.highChart.ulNameArr = this.removeByValue($KRF_APP.highChart.ulNameArr, recordName);

		$KRF_APP.highChart.dateArr = [];
		$KRF_APP.highChart.chartObj = [];

		//차트 새로 그리기
		this.getHighChartData();
		
	},

	// high차트 검색
	getHighChartData: function (selectItem){

		

		Ext.getCmp('highChartContiner').mask('loading','loading');

		//항목버튼에서 넘어온 값을 전역변수에 설정
		if(selectItem != undefined){
			$KRF_APP.highChart.param.selectItem = selectItem;
			$('#highChartSelectItem').find('a').removeClass('active');
			$('#button_'+selectItem).addClass('active');
		}
		
		

		var highChartDatas = [];
		var ajaxArry = [];
		$KRF_APP.highChart.seriesArr = [];
		
		for(var a = 0 ; a < $KRF_APP.highChart.ulIdArr.length ; a++){
			ajaxArry.push(this.getHighchartAjax($KRF_APP.highChart.ulIdArr[a],$KRF_APP.highChart.param.selectItem));
		}
		

		var	defList = new dojo.DeferredList(ajaxArry);
		defList.then(function(){
			try{
				for(var j=0; j<arguments[0].length; j++){
					 var jsonData = Ext.util.JSON.decode(arguments[0][j][1].responseText);
					 highChartDatas.push(jsonData);
				}

				//라벨 삭제
				$('#chartUl li').remove();
				var noDate = [];

				//arguments 에 저정된 값을 chart에 뿌리기
				for(var a = 0 ;a < highChartDatas.length; a++){
					$KRF_APP.fireEvent($KRF_EVENT.CREATE_HIGH_CHART_DATE ,{"data":highChartDatas[a].data});
				}

				for(var k = 0 ; k < highChartDatas.length; k++){
					 $KRF_APP.fireEvent($KRF_EVENT.CREATE_HIGH_CHART
					 , {"data":highChartDatas[k].data,"ulIdArr":$KRF_APP.highChart.ulIdArr[k],"ulNameArr":$KRF_APP.highChart.ulNameArr[k],'number':k});	

					 // 데이터가 없는 경우 배열에일단 push
					 if(highChartDatas[k].data.length == 0 ){
						noDate.push({"ulIdArr":$KRF_APP.highChart.ulIdArr[k],"ulNameArr":$KRF_APP.highChart.ulNameArr[k]});
					 }

					 // 데이터없는 지점이 있으면 삭제
					 if(noDate.length > 0){
						for(var i = 0 ; i < noDate.length ; i++){
							this.removeHighChartData(noDate[i].ulIdArr , noDate[i].ulNameArr);
						}
					 }

				}
				
				// 차트에 데이터가 없을시
				if($KRF_APP.highChart.chartObj.length == 0){
					Ext.getCmp("highChartContiner").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요. <br> *메세지 삭제 (클릭).", "noData")
					// 로딩바 클릭 삭제
					$('.x-mask-msg.noData').on('click',function(){
						Ext.getCmp("highChartContiner").unmask();
					});
				}

				

			}catch(e){
				console.log(e);
			}	
		});

	},

	//chart ajax defferd사용  ,  변수는 전역변수 사용
	getHighchartAjax: function(recordId, selectItem){
		
		return Ext.Ajax.request({
			url: $KRF_APP.highChart.param.url,    // To Which url you wanna POST.
			params: {
				recordId: recordId
				, recordYear: $KRF_APP.highChart.param.startYearHigh
				, recordYear2: $KRF_APP.highChart.param.endYearHigh
				, recordMonth: $KRF_APP.highChart.param.startMonthHigh
				, recordMonth2: $KRF_APP.highChart.param.endMonthHigh
				, defaultChart: $KRF_APP.highChart.param.defaultChart
				, selectItem: selectItem
				, hMaxDate: $KRF_APP.highChart.param.maxDate
			},
			failure: function (form, action) {
				// 로딩바 숨김
				Ext.getCmp("bositeCharttest").unmask();
				alert("오류가 발생하였습니다.");
			}
		});
	},

	//  경관, 보고서 combobox 세팅 (동일한 combobox 사용)
	fileTabComboBindDate : function(store){

		var comboId =  ['fileStartYear','fileStartMonth','fileEndYear','fileEndMonth','fileTextField'];
		var storeComboId =  ['minData','minData','maxData','maxData','fileTextField'];
		for(var a = 0 ; a < comboId.length; a++){
			if(store[storeComboId[a]] != undefined){
				Ext.getCmp([comboId[a]]).setValue(store[storeComboId[a]][comboId[a]])
			}
		}

	},

	//경관 data call
	getViewDataAjax: function(spotCode,fileGubun){
		
		return Ext.Ajax.request({
			url: _API.domain + '/krf/searchResult/searchResult_View',
			params: {
				spotCode: spotCode
				,fileGubun:fileGubun
			},
			failure: function (form, action) {
				// 로딩바 숨김
				Ext.getCmp("siteCharttest").unmask();
				alert("오류가 발생하였습니다.");
			}
		});
	},	

	//경관 window
	createViewWindow: function(data,type){

		$KRF_APP.fireEvent($KRF_EVENT.SHOWVIEWDATAWINDOW);
		var imageHtml = '';

		var display = 'display:block;';

		var viewImage = '<div class="row">';
		var img1 = '' ;
		var img2 = '';
		
		for(var i = 0 ; i < data.length ; i++){
			if(i != 0){
				display = 'display:none;';
			}
			
			viewImage += '<div class="imageColumn">';
			viewImage += '<img src="'
			+'http://112.218.1.243:25555/weis_board/cms/landscape/'+type+'?spotCode='+data[i].SPOT_CODE
			+'&brrerCode='+data[i].BRRER_CODE
			+'&potogrfDe='+data[i].POTOGRF_DE
			+'&fileId='+data[i].FILE_ID
			+'&fileSn='+data[i].FILE_SN
			+ '" width="250px" height="150px" style="'+display+'" onclick="$KRF_APP.global.CommFn.openModal();$KRF_APP.global.CommFn.currentSlide('+(i+1)+')" class="imageView imageHover-shadow imageCursor">';
			viewImage += '</div>';


			img1+= '<div class="imageMySlides">';
			img1+= '<div class="imageNumbertext">'+(i+1)+ '/'+(data.length)+ '</div>';
			img1+= '<img src="'
			+'http://112.218.1.243:25555/weis_board/cms/landscape/'+type+'?spotCode='+data[i].SPOT_CODE
			+'&brrerCode='+data[i].BRRER_CODE
			+'&potogrfDe='+data[i].POTOGRF_DE
			+'&fileId='+data[i].FILE_ID
			+'&fileSn='+data[i].FILE_SN
			+ '" style="width:100%">';
			img1+= '</div>';

			img2+='<div class="imageColumn">';
			img2+='<img class="imageDemo imageCursor" src="'
			+'http://112.218.1.243:25555/weis_board/cms/landscape/'+type+'?spotCode='+data[i].SPOT_CODE
			+'&brrerCode='+data[i].BRRER_CODE
			+'&potogrfDe='+data[i].POTOGRF_DE
			+'&fileId='+data[i].FILE_ID
			+'&fileSn='+data[i].FILE_SN
			+ '" style="width:100%" alt="'+data[i].FILE_REAL_NM+'" onclick="$KRF_APP.global.CommFn.currentSlide('+(i+1)+')">';
			img2+='</div>';
		}
		viewImage += '</div>';

		var headerImage = '<div id="imageMyModal" class="imageModal"> <span class="imageClose imageCursor" onclick="$KRF_APP.global.CommFn.closeModal()">&times;</span> <div class="imageModal-content">';
		headerImage += img1 + ' <a class="imagePrev" onclick="$KRF_APP.global.CommFn.plusSlides(-1)">&#10094;</a>'
		headerImage += '<a class="imageNext" onclick="$KRF_APP.global.CommFn.plusSlides(1)">&#10095;</a><div class="imageCaption-container"><p id="imageCaption"></p></div>' + img2;
		headerImage += '</div></div>';
		var viewDataWindow = Ext.getCmp('viewDataWindow');

		$('#imageFull').html(headerImage);
		$('#imageFull').show();
		var html = '<table style="margin-bottom:10px; width:270px;" class="metaDataTbl01">' 
						+'<tr>' 
						+'<td colspan="2" style="font-weight: bold; text-align: center; background: rgb(239, 244, 249);">'+data[0].OBSNM+'</td>' 
						+'</tr>' 
						+'<tr>' 
						+'<td colspan="2"> '
						+ viewImage
						+ '</td>'
						+'</tr>' 
						+'<tr>' 
						+'<td style="font-weight: bold; background: rgb(239, 244, 249);">수계</td>' 
						+'<td>' + data[0].WRSSM_NM + '</td>' 
						+'</tr>' 
						+'<tr>' 
						+'<td style="font-weight: bold; background: rgb(239, 244, 249);">보구간</td>'
						+'<td>'+data[0].SPOT_NM+'</td>'  
						+'</tr>' 
						+'<tr>' 
						+'<td style="font-weight: bold; background: rgb(239, 244, 249);">촬영일시</td>' 
						+'<td>'+data[0].POTOGRF_DE+'</td>' 
						+'</tr>' 
					+'</table>';
		viewDataWindow.setHtml(html);

		slideIndex = 1;
		$KRF_APP.global.CommFn.showSlides(slideIndex);
		//var gallery = new Viewer($(viewDataWindow.body.dom).find('#boImages')[0]);

	},

	//보고서 다운로드
	fileDownloadButton: function(downType){

		var window = Ext.create('krf_new.view.map.innorixWindow');
					window.show();

					var control;
					var _currentDay = "";

					// 현제날짜
					var d = new Date();
					var strDate = "-"+d.toISOString().substring(0, 10);
					

					var dtaCode = "";
					var filePath = "";
					var fileNm = "";
					var fileSize = "";
					var dtaCodeNm = "";
					var downTab ="downTab";

					control = innorix.create({
						el: '#fileControl',
						uploadUrl: './innorix/upload.jsp',
						installUrl: './innorix/install/install.html',
						agent: 'true',
						resumeType: 'relay',
						custom: {"product":"webpages","subproduct":"codegenerator"},
						transferMode: 'download',
						width: 550,
						height: 200,
						showGraph: 'true',
						transferDownloadPolicy: 'continue',
						isHighSpeed: 'true',
						reliableTransfer: 'true',
						folderIntact: 'true',
						onDblClickRows: 'true',
						loadTransfer: 'true'
					});


					control.on('loadComplete', function (p) { 
						console.log('loadComplete: event fire ');
					});
					control.on('downloadComplete', function (p) { 
						console.log('downloadComplete: event fire ');
				
					});
					control.on('onDblClickRows', function (p) { control.downloadAndOpenFile(p); });

					var store = null; 
					//파일 visible
					if(Ext.getCmp('filetabpanels').isVisible()){
						store = Ext.getCmp(Ext.getCmp('filetabpanels').activeTab.id).items.items[0].items.items[0].getStore()
					}else if(Ext.getCmp('viewtabpanels').isVisible()){
						store = Ext.getCmp(Ext.getCmp('viewtabpanels').activeTab.id).items.items[0].items.items[0].getStore()
					}

					


					//store가 있을경우 down 실행
					if(store.data.items.length > 0){

						var dataObj = [];

						// 폴더 명칭
						_currentDay = store.data.items[0].data.OBSNM + strDate;
						//store.data.items[i].data.
						for(var i = 0 ; i < store.data.items.length; i++){
							
							var src = store.data.items[i].data.FILE_COURS.replace('C:/water/test/',
							'http://water.nier.go.kr/innorix/download.jsp?fileName=/usr/local/tomcat/webapps/monitor/')+'/'+store.data.items[i].data.FILE_VIRTL_NM + '.' + store.data.items[i].data.FILE_REAL_NM.split('.')[1];
							/*var src = store.data.items[i].data.FILE_COURS +'/'+store.data.items[i].data.FILE_VIRTL_NM + '.' + store.data.items[0].data.FILE_REAL_NM.split('.')[1];*/
							
							if(downType == "select"){
								if(store.data.items[i].checked != undefined){
									if(store.data.items[i].checked == true){
										dataObj.push({'downloadUrl':src,
										'fileSize':store.data.items[i].data.FILE_SIZE,
										'folder':store.data.items[i].data.DTA_NM,
										'printFileName':store.data.items[i].data.FILE_REAL_NM})
									}
								}
							}else{
								dataObj.push({'downloadUrl':src,
										  'fileSize':store.data.items[i].data.FILE_SIZE,
										  'folder':store.data.items[i].data.DTA_NM,
										  'printFileName':store.data.items[i].data.FILE_REAL_NM})
							}
						}

						//control.removeAllFiles();
						control.presetDownloadFiles( dataObj );
		
						setTimeout(function() {
							
							var fileinfo = control.getAllFiles(); //다운로드 리스트 파일정보 획득
							if(fileinfo.length == 0){
								alert("다운로드받을 파일이 존재하지 않습니다");
								return;
							}

							var UUID = _currentDay; //상위 폴더 값 입력 
							for(var i = 0; i < fileinfo.length; i++){
								var fileName = fileinfo[i].folder; // 파일명 추출 // "test.zip"
								fileinfo[i].rootName = UUID + "/" + fileName; //rootName을 파일별 확장자로 수정 
							}	
							control.download();

						}, 1500);
					}

	},

	openModal : function() {
		document.getElementById('imageMyModal').style.display = "block";
	},
	  
	closeModal : function() {
		document.getElementById('imageMyModal').style.display = "none";
	},

	slideIndex : 1,

	plusSlides : function(n){
		$KRF_APP.global.CommFn.showSlides(slideIndex += n);
	},
    currentSlide : function(n){
		$KRF_APP.global.CommFn.showSlides(slideIndex = n);
	},
	showSlides : function(n){
		var i;
		var slides = document.getElementsByClassName("imageMySlides");
		var dots = document.getElementsByClassName("imageDemo");
		var captionText = document.getElementById("imageCaption");

		if (n > slides.length) {slideIndex = 1}
		if (n < 1) {slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[slideIndex-1].style.display = "block";
		dots[slideIndex-1].className += " active";
		captionText.innerHTML = dots[slideIndex-1].alt;
	}
});

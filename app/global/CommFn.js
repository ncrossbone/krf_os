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
	totalSearchExcelData: null,
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

				// var blob = new Blob([this.response], { type: 'application/vnd.ms-excel' });
				// var downloadUrl = URL.createObjectURL(blob);
				// var a = document.createElement("a");
				// a.href = downloadUrl;
				// a.download = fileNm + ".xls";
				// document.body.appendChild(a);
				// a.click();

				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var sysdate = "";

				if (month < 10) {
					month = "0" + month;
				}

				if (day < 10) {
					day = "0" + day;
				}

				sysdate = year + month + day;


				var blob = new Blob([this.response], { type: 'application/vnd.ms-excel' });
				var fNm = fileNm + '_' + sysdate + '.xls';

				if (window.navigator && window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveOrOpenBlob(blob, fNm);
				}

				var downloadUrl = URL.createObjectURL(blob);
				var a = document.createElement("a");
				a.href = downloadUrl;
				$(a).attr('download', fNm);
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
	getLoginUserInfo: function (sessionId) {
		if (!sessionId || sessionId == 'null') { // sessionId가 없을때 그냥 return 시킨다
			return null;
		}
		return Ext.Ajax.request({
			//url: _API.getUserLayerInfo,
			url: _API.loginSession,
			//url: 'http://localhost:8080/krf/config/loginSession',
			dataType: "text/plain",
			method: 'POST',
			async: true,
			params: { userId: sessionId },
			success: function (response, opts) {
				var decodeData = Ext.util.JSON.decode(response.responseText);
			}
		});


		/*var loginUserInfo = window.sessionStorage.getItem('krfLoginUser');

		if (loginUserInfo != null) {
			try {
				return JSON.parse(loginUserInfo);
			} catch (e) {
				console.log(e);
			}
		}
		return this.getParamLoginInfo();*/
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

	getSstgComboInfo: function (storeName) {
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
		if (storeName == 'EsstgHcAtalSe' || storeName == 'EsstgHcBemaSe' || storeName == 'EsstgHcFishSe' // 하천 부착돌말류,저서성대형무척추,어류
			|| storeName == 'EsstgHgAtalSe' || storeName == 'EsstgHgBemaSe' || storeName == 'EsstgHgFishSe') {	// 하구 부착돌말류,저서성대형무척추,어류
			store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: '1', name: '조사자료' }
					, { id: '2', name: '출현생물종' }]
			});
		} else if (storeName == 'EsstgHcVtnSe') {
			store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: '1', name: '조사자료' }
					, { id: '2', name: '출현식생' }
					, { id: '3', name: '식생 면적' }
					, { id: '4', name: '구간' }
					// ,{ id: '5', name: '구간별 정보'}
					// ,{ id: '6', name: '우점도'}
				]
			});
		} else {
			store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{ id: '1', name: '조사자료' }]
			});
		}



		return store;
	},

	cloneObj: function (obj) {
		if (obj === null || typeof (obj) !== 'object')
			return obj;

		var copy = obj.constructor();

		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				copy[attr] = obj[attr];
			}
		}

		return copy;
	},

	setDataForZ: function (btnId) {
		var tabCtl = Ext.getCmp("searchResultTab");
		tabCtl = tabCtl.items.items[1];
		var activeTab = tabCtl.getActiveTab();
		var preGrid = activeTab.child().child();
		var preStore = preGrid.getStore();

		var colConfigObj = {
			'Z006_joInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 깊이', dataIndex: 'MESURE_DP', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '검사 기간 시작 일', dataIndex: 'CHCK_PD_BEGIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '검사 기간 종료 일', dataIndex: 'CHCK_PD_END_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 기관 명', dataIndex: 'EXAMIN_INSTT_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사자 명', dataIndex: 'EXMNR_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z004_joInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '한강호소 코드', dataIndex: 'HRLK_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '년', dataIndex: 'YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '월', dataIndex: 'MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '반기', dataIndex: 'TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '검사 일자', dataIndex: 'CHCK_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '검사 시작 일자', dataIndex: 'CHCK_BEGIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '검사 종료 일자', dataIndex: 'CHCK_END_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사자 명', dataIndex: 'EXMNR_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사기관 명', dataIndex: 'EXINST_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z005_joInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 깊이', dataIndex: 'MESURE_DP', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '검사 기간 시작 일', dataIndex: 'CHCK_PD_BEGIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '검사 기간 종료 일', dataIndex: 'CHCK_PD_END_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 기관 명', dataIndex: 'EXAMIN_INSTT_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사자 명', dataIndex: 'EXMNR_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z002_joInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사_일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '구간_일련번호', dataIndex: 'SCTN_SN', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '수심', dataIndex: 'DPWT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '식생_높이', dataIndex: 'VTN_HG', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '구간_시작_값', dataIndex: 'SCTN_BEGIN_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '구간_종료_값', dataIndex: 'SCTN_END_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사자_명', dataIndex: 'EXMNR_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사_기관_명', dataIndex: 'EXAMIN_INSTT_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z002_danInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '시점_경도_도', dataIndex: 'PNTTM_LO_DEGR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '시점_경도_분', dataIndex: 'PNTTM_LO_MIN', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '시점_경도_초', dataIndex: 'PNTTM_LO_SECND', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '시점_위도_도', dataIndex: 'PNTTM_LA_DEGR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '시점_위도_분', dataIndex: 'PNTTM_LA_MIN', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '시점_위도_초', dataIndex: 'PNTTM_LA_SECND', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종점_경도_도', dataIndex: 'TMNL_LO_DEGR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종점_경도_분', dataIndex: 'TMNL_LO_MIN', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종점_경도_초', dataIndex: 'TMNL_LO_SECND', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종점_위도_도', dataIndex: 'TMNL_LA_DEGR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종점_위도_분', dataIndex: 'TMNL_LA_MIN', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종점_위도_초', dataIndex: 'TMNL_LA_SECND', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '방향', dataIndex: 'DRC', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '호안_부터_거리', dataIndex: 'SCTN_SN', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '구간_일련번호', dataIndex: 'SCTN_BEGIN_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '구간_시작_값', dataIndex: 'SCTN_END_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '구간_종료_값', dataIndex: 'DPWT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '수심', dataIndex: 'HD', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '토성', dataIndex: 'VTN_HG', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '토습', dataIndex: 'SPECIES_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '식생_높이', dataIndex: 'SPECIES_SCNCENM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종_코드', dataIndex: 'SPECIES_KORNM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종_학명', dataIndex: 'CV_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '종_국명', dataIndex: 'CV_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '피도_값', dataIndex: 'CV_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z001_joInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사_시작_일', dataIndex: 'PNTTM_LO_DEGR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사_종료_일', dataIndex: 'PNTTM_LO_MIN', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사자_명', dataIndex: 'PNTTM_LO_SECND', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사_기관_명', dataIndex: 'PNTTM_LA_DEGR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z003_joInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사_도구', dataIndex: 'EXAMIN_UNT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사_깊이', dataIndex: 'EXAMIN_DP', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사_기관_명', dataIndex: 'EXAMIN_INSTT_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사자_명', dataIndex: 'EXMNR_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z006_bunInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 정보', dataIndex: 'ANALS_INFO_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 값', dataIndex: 'ANALS_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z005_bunInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 정보', dataIndex: 'ANALS_INFO_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 값', dataIndex: 'ANALS_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z002_bunInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 정보', dataIndex: 'ANALS_INFO_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 값', dataIndex: 'ANALS_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z003_bunInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 년도', dataIndex: 'EXAMIN_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 월', dataIndex: 'EXAMIN_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 회차', dataIndex: 'EXAMIN_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 정보', dataIndex: 'ANALS_INFO_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 값', dataIndex: 'ANALS_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}],
			'Z001_bunInfoBtn': [{
				text: '호소 명', dataIndex: 'HS_NAME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 코드', dataIndex: 'SITE_CODE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '지점 명', dataIndex: 'SITE_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 년도', dataIndex: 'MESURE_YEAR', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 월', dataIndex: 'MESURE_MT', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '측정 회차', dataIndex: 'MESURE_TME', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '조사 일자', dataIndex: 'EXAMIN_DE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 정보', dataIndex: 'ANALS_INFO_NM', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}, {
				text: '분석 값', dataIndex: 'ANALS_VALUE', width: 100, filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
			}]
		};

		if (!colConfigObj[preStore.parentIds + '_' + btnId]) {
			alert('데이터 정의 필요.');
			return;
		}

		var srw = Ext.getCmp('searchResultWindow_Z');

		if (!srw) {
			srw = Ext.create('krf_new.view.center.SearchResultWindow_Z');
			Ext.getCmp('center_container').add(srw);
		}

		srw.show();

		srw.items.items[0].setColumns(colConfigObj[preStore.parentIds + '_' + btnId]);

		var gridStore = Ext.create('krf_new.store.center.SearchResultWindow_Z', {
			parentIds: preStore.parentIds,
			siteIds: preStore.siteIds,
			startYear: preStore.startYear,
			startMonth: preStore.startMonth,
			endYear: preStore.endYear,
			endMonth: preStore.endMonth,
			btnId: btnId
		});

		srw.items.items[0].setStore(gridStore);
	},

	getSstgSiteInfoData: function (param) {
		var params = {
			id: param.id,
			item: param.item ? param.item : 'none',
			year: param.year ? param.year : 'none',
			tme: param.tme ? param.tme : 'none'
		};

		return Ext.Ajax.request({
			url: _API.GET_SSTG_INFO,
			params: params,
			dataType: 'text/plain',
			method: 'POST'
		});
	},

	popupComboChangeEvent: function (code) {
		var me = this;
		var param = {
			id: code,
			item: '-',
			year: $('#sstgPopupYear').val(),
			tme: $('#sstgPopupTme').val(),
		};

		me.getSstgSiteInfoData(param).then(function (result) {
			me.writePopupTable(Ext.util.JSON.decode(result.responseText).data);
		});
	},

	writePopupTable: function (dataArr) {
		$('#sstgPopupGrade').text('-');
		$('#sstgPopupValue').text('-');
		$('#sstgPopupGrade').css('background', '#fff');

		if (dataArr.length > 0) {
			var gradeArr = ['A', 'B', 'C', 'D', 'E'];
			var colorObj = {
				'A': '#004ba7',
				'B': '#58bc03',
				'C': '#ffd62e',
				'D': '#fc9400',
				'E': '#e11400'
			};

			var txt = (gradeArr.indexOf(dataArr[0].HEALTH_GRAD) > -1) ? dataArr[0].HEALTH_GRAD : '-';

			$('#sstgPopupGrade').text(txt);
			$('#sstgPopupGrade').css('background', colorObj[txt] ? colorObj[txt] : '#fff');
			$('#sstgPopupValue').text(dataArr[0].FAI ? dataArr[0].FAI : '-');

			$('#sstgPopupYear').val(dataArr[0].YEAR);
			$('#sstgPopupTme').val(dataArr[0].TME);
		}
	},

	popupClickEvent: function (btnId, code) {
		var me = this;
		if (btnId == 'sstgPopupNextBtn') {
			$('#basicInfoPopup').hide();
			$('#sstgInfoPopup').show();
			me.getSstgSiteInfoData({ id: code }).then(function (result) {

				me.writePopupTable(Ext.util.JSON.decode(result.responseText).data);
			});
		} else {
			$('#basicInfoPopup').show();
			$('#sstgInfoPopup').hide();
		}
	},

	siteInfoComboChangeEvent: function () {
		var me = this;
		var param = {
			id: Ext.getCmp('siteInfoSstgNm').code,
			item: Ext.getCmp('sstgSiteInfoItem').getValue(),
			year: Ext.getCmp('sstgSiteInfoYear').getValue(),
			tme: Ext.getCmp('sstgSiteInfoTme').getValue(),
		};

		me.getSstgSiteInfoData(param).then(function (result) {
			var decodeData = Ext.util.JSON.decode(result.responseText);

			Ext.getCmp('sstgInfoImage').setSrc('./resources/images/sstg/-.png');
			$('#sstgInfoTxt, #sstgInfoNum').text('');

			if (decodeData.data.length > 0) {
				var gradeArr = ['A', 'B', 'C', 'D', 'E'];
				var imgSrc = (gradeArr.indexOf(decodeData.data[0].HEALTH_GRAD) > -1) ? decodeData.data[0].HEALTH_GRAD : '-';
				Ext.getCmp('sstgInfoImage').setSrc('./resources/images/sstg/' + imgSrc + '.png');

				$('#sstgInfoTxt').html(imgSrc == '-' ? '' : '<b style="color: #f00;">' + imgSrc + '</b>등급');
				$('#sstgInfoNum').html(decodeData.data[0].FAI ? decodeData.data[0].FAI : '');
			}
		});
	},

	siteInfoChangeEventForE: function (id) {
		var me = this;
		var siteInfoForE = Ext.getCmp('siteInfoForE');
		var siteinfotest = Ext.getCmp('siteinfotest');

		var tabChart = Ext.getCmp('tabChart'); // 차트버튼

		// 수생태는 차트가 없음 (생태/멸종 뺴고)
		if ($KRF_APP.layerCode.indexOf('E') == -1) {
			siteInfoForE.setHidden(true);
			siteinfotest.setHidden(false);
			tabChart.setHidden(false);
			return;
		} else {
			siteInfoForE.setHidden(false);
			siteinfotest.setHidden(true);

			// E 수생태는 차트가 없지만 생태/멸종은 차트정보가 있음
			if($KRF_APP.layerCode == "E003" || $KRF_APP.layerCode == "E004"){
				tabChart.setHidden(false);
			}else{
				tabChart.setHidden(true);
				ChangeTabIndex(1); //차트가 안보이면서 tab을 지점정보로 변경
			}
			
			

			if (id) {
				Ext.getCmp('siteInfoSstgNm').code = id;
				me.getSstgSiteInfoData({ id: id }).then(function (result) {
					var decodeData = Ext.util.JSON.decode(result.responseText);

					Ext.getCmp('siteInfoSstgNm').setText('');
					Ext.getCmp('siteInfoSstgWtNm').setText('');
					Ext.getCmp('siteInfoSstgAddr').setText('');
					Ext.getCmp('sstgInfoImage').setSrc('./resources/images/sstg/-.png');
					$('#sstgInfoTxt, #sstgInfoNum').text('');

					if (decodeData.data.length > 0) {

						Ext.getCmp('siteInfoSstgNm').setText(decodeData.data[0].AEMRV_NM);
						Ext.getCmp('siteInfoSstgWtNm').setText(decodeData.data[0].WRSSM_NM);
						Ext.getCmp('siteInfoSstgAddr').setText(decodeData.data[0].ADRES);

						Ext.getCmp('sstgSiteInfoYear').setValue(decodeData.data[0].YEAR);
						Ext.getCmp('sstgSiteInfoTme').setValue(decodeData.data[0].TME);

						var gradeArr = ['A', 'B', 'C', 'D', 'E'];
						var imgSrc = (gradeArr.indexOf(decodeData.data[0].HEALTH_GRAD) > -1) ? decodeData.data[0].HEALTH_GRAD : '-';
						Ext.getCmp('sstgInfoImage').setSrc('./resources/images/sstg/' + imgSrc + '.png');

						$('#sstgInfoTxt').html(imgSrc == '-' ? '' : '<b style="color: #f00;">' + imgSrc + '</b>등급');
						$('#sstgInfoNum').html(decodeData.data[0].FAI ? decodeData.data[0].FAI : '');
					}
				});
			}
		}
	}
});

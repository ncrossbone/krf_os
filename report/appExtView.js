var _mapServiceUrl_Rpt = null; // 리포트 맵 서비스 URL
var _mapServiceUrl_v3_2 = null; // 지점 맵 서비스 URL (면 투명도 셋팅 위함 및 지점 visible 레벨제한 없는거)
var _baseMapUrl_vworld = null; // 배경맵 서비스 URL
var _arcServiceUrl = null;
var _reachServiceUrl_v3_TM = null; //오염원용

var _WS_CD = null; // 대권역 코드
var _WS_NM = null; // 대권역 명
var _MW_CD = null; // 중권역 코드
var _MW_NM = null; // 중권역 명
var _SW_CD = null; // 소권역 코드
var _SW_NM = null; // 소권역 명

var _ADM_SIDO_CD = null; // 시도 코드
var _ADM_SIDO_NM = null; // 시도 명
var _ADM_SIGUNGU_CD = null; // 시군구 코드
var _ADM_SIGUNGU_NM = null; // 시군구 명
var _ADM_DONGRI_CD = null; // 읍면동 코드
var _ADM_DONGRI_NM = null; // 읍면동 명

var _CAT_DID = null; // 집수구역 ID

var level = location.search.split("l=")[1].split("&")[0];
var x = location.search.split("x=")[1].split("&")[0];
var y = location.search.split("y=")[1].split("&")[0];
var print = location.search.split("print=")[1].split("&")[0];


var parentObj = null;

if (print == "Y") {
	parentObj = parent;

} else {
	parentObj = opener;
}

// var store = Ext.create('Ext.data.Store', {
// 	autoLoad: true,

// 	fields: [{
// 		name: 'MapserviceUrl'
// 	}],

// 	proxy: {
// 		type: 'ajax',
// 		url: '../resources/data/AppVariable.json',
// 		reader: {
// 			type: 'json'
// 		}
// 	}
// });

// store.load(function (a, b, c) {

// 	this.each(function (record, cnt, totCnt) {


// 	});
// });
/*
* 박철 추가 API URL 를 JSON으로 관리
*/
// var _API = null;

// var apiStore = Ext.create('Ext.data.Store', {
// 	autoLoad: true,

// 	fields: [{
// 		name: 'apiUrls'
// 	}],
// 	proxy: {
// 		type: 'ajax',
// 		url: '../resources/data/APIUrlsTobe.json',
// 		reader: {
// 			type: 'json'
// 		}
// 	}
// });

// apiStore.load(function (a, b, c) {
// 	_API = a[0].data;

// 	// API URL 앞에 분을 문자열을 넣을 수 있다. http://localhost:8080 ...
// 	a[0].data.init('http://localhost:8071');
// });


Ext.application({

	name: 'Report',

	launch: function () {
		_mapServiceUrl_Rpt_Dim = parentObj.$KRF_DEFINE.mapServiceUrl_Rpt_Dim;
		_mapServiceUrl_Rpt_Site = parentObj.$KRF_DEFINE.mapServiceUrl_Rpt_Site;
		_mapServiceUrl_v3_2 = parentObj.$KRF_DEFINE.reachServiceUrl_v3_2;
		_baseMapUrl_vworld = parentObj.$KRF_DEFINE.baseMapUrl_vworld;
		_arcServiceUrl = parentObj.$KRF_DEFINE.arcServiceUrl;
		_reachServiceUrl_v3_TM = parentObj.$KRF_DEFINE.reachServiceUrl_v3_TM;

		var selWS = parentObj.Ext.getCmp("cmbWater1").lastSelection;
		var selMW = parentObj.Ext.getCmp("cmbWater2").lastSelection;
		var selSW = parentObj.Ext.getCmp("cmbWater3").lastSelection;
		var selSIDO = parentObj.Ext.getCmp("cmbArea1").lastSelection;
		var selSIGUNGU = parentObj.Ext.getCmp("cmbArea2").lastSelection;
		var selDONGRI = parentObj.Ext.getCmp("cmbArea3").lastSelection;

		_CAT_DID = parentObj.Ext.getCmp("_mapDiv_").reachLayerAdmin_v3_New.arrAreaGrp;

		_API = parentObj._API;

		if (selWS != undefined && selWS != null & selWS.length > 0) {
			_WS_CD = selWS[0].data.id;
			_WS_NM = selWS[0].data.name;
		}


		if (selMW != undefined && selMW != null & selMW.length > 0) {
			_MW_CD = selMW[0].data.id;
			_MW_NM = selMW[0].data.name;
		}


		if (selSW != undefined && selSW != null & selSW.length > 0) {
			_SW_CD = selSW[0].data.id;
			_SW_NM = selSW[0].data.name;
		}


		if (selSIDO != undefined && selSIDO != null & selSIDO.length > 0) {
			_ADM_SIDO_CD = selSIDO[0].data.id;
			_ADM_SIDO_NM = selSIDO[0].data.name;
		}


		if (selSIGUNGU != undefined && selSIGUNGU != null & selSIGUNGU.length > 0) {
			_ADM_SIGUNGU_CD = selSIGUNGU[0].data.id;
			_ADM_SIGUNGU_NM = selSIGUNGU[0].data.name;
		}


		if (selDONGRI != undefined && selDONGRI != null & selDONGRI.length > 0) {
			_ADM_DONGRI_CD = selDONGRI[0].data.id;
			_ADM_DONGRI_NM = selDONGRI[0].data.name;
		}

		Ext.create("Report.view.main.rptExtViewMain", {
			renderTo: Ext.getBody()
		});

		$('#pageloaddingDiv').remove();
	}
});


var percentile = {
	rstFeatureSet: [],
	quantile: function (array, percentile) {

		array.sort(function (a, b) {
			return a - b;
		});

		var index = percentile / 100 * (array.length - 1);

		if (Math.floor(index) == index) {

			result = Number(array[index]);
		}
		else {

			var i = Math.floor(index);
			var fraction = index - i;
			result = Number(array[i]) + (Number(array[i + 1]) - Number(array[i])) * fraction;
		}

		return result;
	},
	getPercentileObj: function (arrFeatures, attrPath, range, pos, kind) {

		var me = this;
		me.rstFeatureSet = [];
		var arrPercentiles = [];
		var arrValues = [];
		//console.info(pos);
		var perRange = me.Round(100 / range, 1);

		for (var i = 0; i < range; i++) {

			var percentile = Math.round((i + 1) * perRange);

			if (i == range - 1) {

				percentile = 100;
			}

			arrPercentiles.push(percentile);
		}

		for (var i = 0; i < arrFeatures.length; i++) {
			arrValues.push(arrFeatures[i].attributes[attrPath]);
		}

		var minVal = "0";

		arrPercentiles.forEach(function (elem, index, array) {

			var curMinVal = minVal;
			var curMaxVal = me.Ceiling(me.quantile(arrValues, elem), pos);
			var curRange = index;

			var features = [];

			for (var i = 0; i < arrFeatures.length; i++) {
				var data = eval("arrFeatures[i].attributes." + attrPath);

				if (index == range - 1) {
					curMaxVal = Number(curMaxVal) + 1;
				}

				if (data >= curMinVal && data < curMaxVal) {

					arrFeatures[i].attributes.stVal = curMinVal;
					arrFeatures[i].attributes.edVal = curMaxVal;
					arrFeatures[i].attributes.color = getCatRangeColor(curRange);
					arrFeatures[i].attributes.range = curRange;

					features.push(arrFeatures[i]);
				}

				minVal = curMaxVal;
			}

			var fObj = { minVal: curMinVal, maxVal: curMaxVal, range: curRange, features: features };
			me.rstFeatureSet.push(fObj);
		});

		return this;
	},
	// 지정자리 반올림 (값, 자릿수)
	Round: function (n, pos) {
		var digits = Math.pow(10, pos);

		var sign = 1;
		if (n < 0) {
			sign = -1;
		}

		// 음수이면 양수처리후 반올림 한 후 다시 음수처리
		n = n * sign;
		var num = Math.round(n * digits) / digits;
		num = num * sign;

		return num.toFixed(pos);
	},
	// 지정자리 버림 (값, 자릿수)
	Floor: function (n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.floor(n * digits) / digits;

		return num.toFixed(pos);
	},
	// 지정자리 올림 (값, 자릿수)
	Ceiling: function (n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.ceil(n * digits) / digits;

		return num.toFixed(pos);
	}
}
function getQuantizeObj(featureSet, attrName, range, kind) {

	var quantize = percentile.getPercentileObj(featureSet.features, attrName, range, 0, kind);
	////console.info(quantize);
	/*var quantize = tmQuantizeTest.setScale(featureSet, attrName).setRange(range)
	.setPointCipher(0, "round").setFeatures(featureSet);
	
	return quantize.quantizeObj.rstFeatureSet;*/
	return quantize.rstFeatureSet;
}

// 집수구역별 해당 범위의 원 반지름 가져오기
function getCatRangeRadius(range) {

	var radius = 0;

	switch (range) {

		case 0:
			radius = 500;
			break;
		case 1:
			radius = 1000;
			break;
		case 2:
			radius = 1500;
			break;
		case 3:
			radius = 2000;
			break;
		case 4:
			radius = 3000;
			break;
	}
	return radius / 2;
}


// 집수구역별 해당 범위의 색상 가져오기
function getCatRangeColor(range) {

	var color = "";

	switch (range) {

		case 0:
			color = "#FFFFCC";
			break;
		case 1:
			color = "#FFF4B4";
			break;
		case 2:
			color = "#FFEDA0";
			break;
		case 3:
			color = "#FFE282";
			break;
		case 4:
			color = "#FED976";
			break;
		case 5:
			color = "#FED24C";
			break;
		case 6:
			color = "#FEBE5A";
			break;
		case 7:
			color = "#FEA043";
			break;
		case 8:
			color = "#FD8D3C";
			break;
		case 9:
			color = "#FD6E32";
			break;
		case 10:
			color = "#FC4E2A";
			break;
		case 11:
			color = "#F0322D";
			break;
		case 12:
			color = "#E31A1C";
			break;
		case 13:
			color = "#C80D32";
			break;
		case 14:
			color = "#B10026";
			break;
	}

	return color;
}
// 그래픽 오브젝트에서 센터 포인트 가져오기
function getCenterFromGraphic(graphic) {

	var centerPoint = null;

	switch (graphic.geometry.type) {
		case "point":
			centerPoint = graphic.geometry;
			break;
		case "extent":
			centerPoint = graphic.getCenter();
			break;
		default:
			centerPoint = graphic.geometry.getExtent().getCenter();
	}

	return centerPoint;
}
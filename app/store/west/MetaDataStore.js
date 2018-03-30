Ext.define('krf_new.store.west.MetaDataStore', {

	extend: 'Ext.data.Store',

	fields: ['DATASET_NM'
		, 'SUMRY_DC'
		, 'INSTT_NM'
		, 'CHARGER_NM'
		, 'SPCE_EXPRSN_MTHD'
		, 'PRVATE_OTHBC_SE'
		, 'CNTM_NM'
		, 'UPDT_CYCLE'
		, 'UPDT_DE'
		, 'UPDUSR_NM'
		, 'RM'
		, 'REGISTER_ID'
		, 'REGIST_DT'
		, 'CHANGER_ID'
		, 'CHANGE_DT'
		, 'LYR_GROUP_NM'
		, 'LYR_GROUP_CODE'
		, 'LYR_CODE'
		, 'LYR_NM'],

	remoteSort: true,
	listeners: {
		beforeload: function (store) {
			var cfgArr = store.config.fields;
			var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.metaId); // 레이어 URL
			var query = new esri.tasks.Query();
			query.where = "LYR_CODE = '" + store.layerId + "'";
			query.returnGeometry = false;
			query.outFields = ["*"];
			queryTask.execute(query, function (results) {

				if (results.features.length > 0) {

					var dataObj = results.features[0].attributes;
					var metaDataWindow = Ext.getCmp('metaDataWindow');

					for (var i = 0; i < cfgArr.length; i++) {
						var dataStr = dataObj[cfgArr[i]];
						if (dataStr == null) {
							dataObj[cfgArr[i]] = '';
						} else {
							if (cfgArr[i] == 'PRVATE_OTHBC_SE') {
								dataStr == '1' ? dataObj[cfgArr[i]] = '공개' : dataObj[cfgArr[i]] = '비공개';
							} else if (cfgArr[i] == 'REGIST_DT' || cfgArr[i] == 'UPDT_DE') {
								dataObj[cfgArr[i]] = dataStr.substr(0, 4) + '-' + dataStr.substr(4, 2) + '-' + dataStr.substr(6, 2);
							}
						}
					}

					var html = '<table style="margin-bottom:10px;" class="metaDataTbl01">' +
						'<tr>' +
						'<th>레이어명</th>' +
						'<th>데이터생성 기관명</th>' +
						'<th>공개여부</th>' +
						'<th>갱신주기</th>' +
						'</tr>' +
						'<tr>' +
						'<td>' + dataObj.LYR_NM + '</td>' +
						'<td>' + dataObj.INSTT_NM + '</td>' +
						'<td>' + dataObj.PRVATE_OTHBC_SE + '</td>' +
						'<td>' + dataObj.UPDT_CYCLE + '</td>' +
						'</tr>' +
						'</table>';

					metaDataWindow.setHtml(html);

					var tblWidth = $('.metaDataTbl01').width();

					var html2 = '<table class="metaDataTbl02" width=' + tblWidth + '>' +
						'<tr>' +
						'<th>공간 표현방식</th>' +
						'<td>' + dataObj.SPCE_EXPRSN_MTHD + '</td>' +
						'</tr>' +
						'<tr>' +
						'<th>좌표계</th>' +
						'<td>' + dataObj.CNTM_NM + '</td>' +
						'</tr>' +
						'<tr>' +
						'<th>최종등록일시</th>' +
						'<td>' + dataObj.REGIST_DT + '</td>' +
						'</tr>' +
						'<tr>' +
						'<th>최종갱신일</th>' +
						'<td>' + dataObj.UPDT_DE + '</td>' +
						'</tr>' +
						'<tr>' +
						'<th>분류</th>' +
						'<td>' + dataObj.LYR_GROUP_NM + '</td>' +
						'</tr>' +
						'<tr>' +
						'<th>비고</th>' +
						'<td>' + dataObj.RM + '</td>' +
						'</tr>' +
						'</table>';
					metaDataWindow.setHtml(metaDataWindow.html + html2);
				}
			});
		}
	}
});

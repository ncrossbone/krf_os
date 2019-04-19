Ext.define('krf_new.store.east.PollLoadResult_Catdid', {
	extend: 'Ext.data.Store',
	fields: [
		'YYYY'
		, 'WS_NM'
		, 'MB_NM'
		, 'SW_NAME'
		, 'CAT_DID'
		, 'GRN_BOD_S'
		, 'GNR_TN_S'
		, 'GNR_TP_S'
		, 'OUT_BOD_S'
		, 'OUT_TN_S'
		, 'OUT_TP_S'
	],

	remoteSort: true,
	async: false,
	listeners: {
		load: function (store) {

			Ext.Ajax.request({
				url: _API.PollLoadSelect, //'./resources/jsp/pollution/PollutionSelect_01_Catdid.jsp',
				params: {
					catDid: store.catDid,
					year: store.year
				},
				async: false, // 비동기 = async: true, 동기 = async: false
				success: function (response, opts) {

					var jsonData = Ext.util.JSON.decode(response.responseText);

					if (jsonData.data.length != 0) {
						store.setData(jsonData.data);
					} else {
						return;
					}

				},
				failure: function (form, action) {
					alert("오류가 발생하였습니다.");
				}
			});
		}
	}
});
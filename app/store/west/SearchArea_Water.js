Ext.define('krf_new.store.west.SearchArea_Water', {

	extend: 'Ext.data.Store',

	fields: ['id', 'name'],

	remoteSort: true,

	selectedValue : null,
	listeners: {
		beforeload: function (store) {
			var idColumn, nameColumn, whereStr, pId;
			idColumn = "";

			var url = $KRF_DEFINE.reachServiceUrl_v3 + "/" + store.layerId;
			var query = new esri.tasks.Query();

			if (store.layerId == $KRF_DEFINE.areaWSLayerId) {
				idColumn = "WS_CD";
				nameColumn = "대권역";
				whereStr = "1=1";

				query.orderByFields = ['WS_CD ASC'];
			}
			if (store.layerId == $KRF_DEFINE.areaAMLayerId) {
				idColumn = "MW_CODE";
				nameColumn = "MW_NAME";
				whereStr = "WS_CD = '" + store.parentId + "'";
			}
			if (store.layerId == $KRF_DEFINE.areaASLayerId) {
				idColumn = "SW_CODE";
				nameColumn = "SW_NAME";
				whereStr = "MBSNCD = '" + store.parentId + "'";
			}

			if (store.layerId == $KRF_DEFINE.areaBOLayerId) {
				idColumn = "PT_NO";
				nameColumn = "PT_NM";
				whereStr = "1=1";
				url = $KRF_DEFINE.boServiceUrl + "/" + store.layerId
			}

			if (idColumn == undefined || nameColumn == undefined || whereStr == undefined) {
				return;
			}

			

			var queryTask = new esri.tasks.QueryTask(url); // 레이어 URL
			
			query.returnGeometry = false;
			query.where = whereStr;
			query.outFields = [idColumn, nameColumn];

			queryTask.execute(query, function (results) {
				var data = results.features;
				if (store.layerId != $KRF_DEFINE.areaWSLayerId) {
					data.sort(function (a, b) {
						var aVal = a.attributes[nameColumn];
						var bVal = b.attributes[nameColumn];
						if (aVal > bVal) {
							return 1;
						} else if (aVal < bVal) {
							return -1;
						} else {
							return 0;
						}
					});
				}
				var receiveData = [];

				Ext.each(data, function (media, index) {

					var idVal = media.attributes[idColumn];
					var nameVal = media.attributes[nameColumn];
					receiveData.push({
						id: idVal,
						name: nameVal
					});

					

					if (data.length == index + 1) {
						store.setData(receiveData);
						store.customOnLoaded();

						if(store.layerId == 0){
							$KRF_APP.BO_STORE = receiveData;
						}

					}
				});
			});
		}
	}
});

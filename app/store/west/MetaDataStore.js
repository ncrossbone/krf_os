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
			console.info(store);
			
			var queryTask = new esri.tasks.QueryTask("http://112.217.167.123:40002/arcgis/rest/services/reach_V3/MapServer/94"); // 레이어 URL
			var query = new esri.tasks.Query();
			query.where = "LYR_CODE = '" + store.layerId + "'";
			query.returnGeometry = false;
			query.outFields = ["*"];
			console.info(query);
			queryTask.execute(query, function (results) {
				console.info(results);
				if(results.features.length > 0){
					//console.info(results.features[0].attributes);
					var data = {"data":[results.features[0].attributes]};
					//console.info(data);
					//console.info([results.features[0].attributes]);
					 store.setData([results.features[0].attributes]);
					// console.info(store);

					// var metaData1 = Ext.getCmp('metaData1');
					// console.info(metaData1);
					// metaData1.setStore(store);
					// console.info(metaData1.store);

				}
			});
		}
	}
});
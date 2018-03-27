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
			
			var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.metaId); // 레이어 URL
			var query = new esri.tasks.Query();
			query.where = "LYR_CODE = '" + store.layerId + "'";
			query.returnGeometry = false;
			query.outFields = ["*"];
			queryTask.execute(query, function (results) {
				if(results.features.length > 0){
					for(var i = 0 ; i < store.config.fields.length ; i++){
						var  value = Ext.getCmp([store.config.fields[i]]);
						if(value != undefined){
							value.update(results.features[0].attributes[store.config.fields[i]]);
						}
					}
				}
			});
		}
	}
});

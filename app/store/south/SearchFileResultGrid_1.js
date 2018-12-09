Ext.define('krf_new.store.south.SearchFileResultGrid_1', {
	extend: 'Ext.data.Store',
	fields: [
		'OBSNM',
		'DATA_CODE',
		'DTA_NM',
		'DOC_SJ',
		'YYYY',
		'MM',
		'DOC_PBLICTE_DE',
		'DOC_PBLICTE_INSTT_NM'
	],

	autoLoad: true,
	pageSize: 100,
	gridCtl: null,

	listeners: {
		load: function (store) {

			var me = this;
			
			var comboList = {'StartYear':'','StartMonth':'','EndYear':'','EndMonth':''};
			var comboId =  ['fileStartYear','fileStartMonth','fileEndYear','fileEndMonth'];
			if(!store.firstSearch){
				for(var i = 0 ; i < comboId.length; i ++){
					comboList[comboId[i].split('file')[1]] = Ext.getCmp(comboId[i]).getValue()
				}
			}
			


			Ext.Ajax.request({
				url: 'http://localhost:8082/krf/searchResult/searchResult_File', 
				params: {
					boCode : store.boCode
					,startYear : comboList.StartYear
					,startMonth : comboList.StartMonth
					,endYear : comboList.EndYear
					,endMonth : comboList.EndMonth
				},
				async: true, // 비동기 = async: true, 동기 = async: false
				success: function (response, opts) {
					var jsonData = Ext.util.JSON.decode(response.responseText);
					if (jsonData.data.length > 0) {
						if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {


							
							for(var i = 0 ; i < jsonData.data.length; i++){
								if(i == 0){
									store.maxData = {'fileEndYear' : jsonData.data[i].YYYY , 'fileEndMonth' : jsonData.data[i].MM}
								}else if(i == jsonData.data.length-1){
									store.minData = {'fileStartYear' : jsonData.data[i].YYYY , 'fileStartMonth' : jsonData.data[i].MM}
								}
								
							}

							store.setData(jsonData.data);

							$KRF_APP.global.CommFn.fileTabComboBindDate(store)
							// var comboId =  ['fileStartYear','fileStartMonth','fileEndYear','fileEndMonth'];
							// var storeComboId =  ['maxData','maxData','minData','minData'];
							// for(var a = 0 ; a < comboId.length; a++){
							// 	Ext.getCmp([comboId[a]]).setValue(store[storeComboId[a]][comboId[a]])
							// }
							
							// 로딩바 숨김
							if (me.gridCtl != null) {
								me.gridCtl.unmask();
							}
						} else {
							if (me.gridCtl != null) {
								me.gridCtl.addCls("dj-mask-noneimg");
								me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
							}
						}
					} else {
						if (me.gridCtl != null) {
							me.gridCtl.addCls("dj-mask-noneimg");
							me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
						}
					}
				},
				failure: function (form, action) {
					if (me.gridCtl != null) {
						me.gridCtl.addCls("dj-mask-noneimg");
						me.gridCtl.mask("오류가 발생하였습니다.");
					}
				}
			});
		}
	}
});
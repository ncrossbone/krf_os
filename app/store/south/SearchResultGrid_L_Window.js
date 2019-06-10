Ext.define('krf_new.store.south.SearchResultGrid_L_Window', {
    extend: 'Ext.data.Store',

    siteId: '',
    autoLoad: true,
    pageSize: 100,
    siteIds: "",
    parentIds: [],
    gridCtl: null,

    listeners: {
        load: function (store) {

            
            Ext.Ajax.request({
                url: _API.searchResult_L2018_Window,
                params: {
                    siteId: store.siteId
                },
                async: true, // 비동기 = async: true, 동기 = async: false
                success: function (response, opts) {
                    var jsonData = Ext.util.JSON.decode(response.responseText);
                    if (jsonData.data.length > 0) {
                        if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {


                            var colMapping = ['LCLAS_NM','BSNS_NM','STEP_CODE','BSNS_YEAR','RSRCH_INSTT_NM','TOT_RSRCH_CT','RSRCH_PURPS_CN','RSRCH_RESULT_CN','TOT_RSRCH_CT'];


                            colMapping.map(function(obj){
                                if(jsonData.data[0][obj]){
                                    console.info("#result_l_"+obj);
                                    $("#result_l_"+obj).text(jsonData.data[0][obj]);
                                }
                            });




                            store.setData(jsonData.data);
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
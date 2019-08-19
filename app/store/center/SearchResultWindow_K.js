Ext.define('krf_new.store.center.SearchResultWindow_K', {
    extend: 'Ext.data.Store',

    siteId: '',
    autoLoad: true,
    pageSize: 100,
    siteIds: "",
    parentIds: [],
    gridCtl: null,

    listeners: {
        load: function (store) {

            var me = this;

            if (me.gridCtl != null) {
                me.gridCtl.removeCls("dj-mask-noneimg");
                me.gridCtl.addCls("dj-mask-withimg");
                me.gridCtl.mask("loading", "loading...");
            }


            for(var i = 1 ; i < 4; i++){

                Ext.Ajax.request({
                    url: _API.GetSearchResultDataWindow_K + '_' + i,
                    params: {
                        siteIds: store.siteIds
                    },
                    async: true, // 비동기 = async: true, 동기 = async: false
                    success: function (response, opts) {
                        var jsonData = Ext.util.JSON.decode(response.responseText);
                        if (jsonData.data.length > 0) {
                            if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
                                store.setData(jsonData.data);



                                var grid = Ext.getCmp('searchResultWindow_K_'+i);
                                if(grid != undefined){
                                    grid.setStore(store);
                                }


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
    }
});
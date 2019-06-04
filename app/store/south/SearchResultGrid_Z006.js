Ext.define('krf_new.store.south.SearchResultGrid_Z006', {
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

            var firstSearch = $KRF_APP.btnFlag;

            var startYear, startMonth = '';

            var sYearCtl = Ext.getCmp('z_StartYear');
            if (sYearCtl != undefined) {
                startYear = Ext.getCmp('z_StartYear').value;
            }

            var sMonthCtl = Ext.getCmp('z_StartMonth');
            if (sMonthCtl != undefined) {
                startMonth = Ext.getCmp('z_StartMonth').value;
            }

            var endYear, endMonth = '';

            var eYearCtl = Ext.getCmp('z_EndYear');
            if (sYearCtl != undefined) {
                endYear = Ext.getCmp('z_EndYear').value;
            }

            var eMonthCtl = Ext.getCmp('z_EndMonth');
            if (sMonthCtl != undefined) {
                endMonth = Ext.getCmp('z_EndMonth').value;
            }

            // 로딩바 표시
            var winCtl = Ext.getCmp("searchResultWindow");

            var tabContainer = winCtl.items.items[0];

            // 로딩중 메세지
            if (me.gridCtl != null) {
                me.gridCtl.removeCls("dj-mask-noneimg");
                me.gridCtl.addCls("dj-mask-withimg");
                me.gridCtl.mask("loading", "loading...");
            }

            if (firstSearch == "noDate") {
                Ext.Ajax.request({
                    url: _API.GetSearchResultData_Z006,
                    params: {
                        WS_CD: WS_CD,
                        AM_CD: AM_CD,
                        AS_CD: AS_CD,
                        startYear: startYear,
                        startMonth: startMonth,
                        endYear: endYear,
                        endMonth: endMonth,
                        ADM_CD: ADM_CD,
                        siteIds: store.siteIds,
                        firstSearch: firstSearch
                    },
                    async: false, // 비동기 = async: true, 동기 = async: false
                    success: function (response, opts) {
                        var jsonData = Ext.util.JSON.decode(response.responseText);
                        if (jsonData.data.length > 0) {
                            if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
                                var dateSplit = jsonData.data[0].WMCYMD;
                                if (dateSplit == null) {
                                    me.gridCtl.addCls("dj-mask-noneimg");
                                    me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
                                    return;
                                }
                                var afterVal = dateSplit.split(".");

                                startYear = afterVal[0];
                                startMonth = afterVal[1];

                                endYear = afterVal[0];
                                endMonth = afterVal[1];
                            }
                        }
                    },
                    failure: function (form, action) { }
                });

                firstSearch = 'date';
                sYearCtl.setValue(startYear);
                sMonthCtl.setValue(startMonth);

                eYearCtl.setValue(endYear);
                eMonthCtl.setValue(endMonth);
            }

            Ext.Ajax.request({
                url: _API.GetSearchResultData_Z006,
                params: {
                    WS_CD: WS_CD,
                    AM_CD: AM_CD,
                    AS_CD: AS_CD,
                    startYear: sYearCtl.value,
                    startMonth: sMonthCtl.value,
                    endYear: eYearCtl.value,
                    endMonth: eMonthCtl.value,
                    ADM_CD: ADM_CD,
                    siteIds: store.siteIds,
                    firstSearch: firstSearch
                },
                async: true, // 비동기 = async: true, 동기 = async: false
                success: function (response, opts) {
                    store.startYear = startYear;
                    store.startMonth = startMonth;
                    store.endYear = endYear;
                    store.endMonth = endMonth;
                    var jsonData = Ext.util.JSON.decode(response.responseText);
                    if (jsonData.data.length > 0) {
                        if (jsonData.data[0].msg == undefined || jsonData.data[0].msg == "") {
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
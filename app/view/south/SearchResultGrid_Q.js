Ext.define('krf_new.view.south.SearchResultGrid_Q', {

    extend: 'Ext.container.Container',

    xtype: 'south-grid-searchresult',

    id: 'searchResultContainer_Q',
    height: '100%',
    width: '100%',

    gridId: null,

    initComponent: function () {
        this.items = [{
            xtype: 'container',
            id: 'grid-container_' + this.gridId,
            width: '100%',
            height: '100%',
            items: [{
                xtype: 'grid',
                layerId: "Q",
                plugins: ['bufferedrenderer', 'gridfilters'],
                cls: 'khLee-x-column-header-text',
                siteIds: "",
                parentIds: [],
                header: {
                    height: 5
                },
                title: '검색결과',
                siteId: '',
                beforeRender: function () {
                    var me = this;
                    var parentCtl = this.findParentByType("window");

                    me.setWidth(parentCtl.getWidth() - 10);
                    me.setHeight(parentCtl.getHeight() - 110);

                    parentCtl.on("resize", function () {
                        ////console.info(parentCtl);
                        me.setWidth(parentCtl.getWidth() - 10);
                        me.setHeight(parentCtl.getHeight() - 110);
                    });

                },

                columns: [{
                    text: '일자',
                    dataIndex: 'MESURE_DE',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '유입수량',
                    dataIndex: 'INFLT_QY',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '유입수질 (mg/L), 개/mL',
                    columns: [{
                        text: 'BOD',
                        dataIndex: 'DC_BOD_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: 'COD',
                        dataIndex: 'DC_COD_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: 'SS',
                        dataIndex: 'DC_SS_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: 'T-N',
                        dataIndex: 'DC_TN_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: 'T-P',
                        dataIndex: 'DC_TP_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: '총대장균군수',
                        dataIndex: 'DC_COC_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }]
                }, {
                    text: '방류수질 (mg/L), 개/mL',
                    columns: [{
                        text: 'BOD',
                        dataIndex: 'IN_BOD_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: 'COD',
                        dataIndex: 'IN_COD_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: 'SS',
                        dataIndex: 'IN_SS_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: 'T-N',
                        dataIndex: 'IN_TN_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: 'T-P',
                        dataIndex: 'IN_TP_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }, {
                        text: '총대장균군수',
                        dataIndex: 'IN_COC_VALUE',
                        width: 100,
                        filter: { type: 'numeric' }
                    }]
                }]
            }]
        }];
        this.callParent();
        // 검색조건 컨트롤 초기화

        $KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
    }
});
Ext.define('krf_new.view.south.SearchResultGrid_Z004', {

    extend: 'Ext.container.Container',

    xtype: 'south-grid-searchresult',

    id: 'searchResultContainer_Z004',
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
                layerId: "Z004",
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
                    text: '호소명',
                    dataIndex: 'HS_NAME',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '조사지점코드',
                    dataIndex: 'HRLK_CODE',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '조사지점명',
                    dataIndex: 'SITE_NM',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '조사연도',
                    dataIndex: 'YEAR',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '조사월',
                    dataIndex: 'MT',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '반기',
                    dataIndex: 'TME',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '수심(m)',
                    dataIndex: 'MESURE_DP',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'W.T(℃)',
                    dataIndex: 'WTRTP',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'pH',
                    dataIndex: 'PH',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'DO(mg/L)',
                    dataIndex: 'DOCB',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'EC',
                    dataIndex: 'EC',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'Tur.(NTU)',
                    dataIndex: 'TUR',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'SD(m)',
                    dataIndex: 'SD',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'Chl.a(mg/㎥)',
                    dataIndex: 'CHLA',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'SS(mg/L)',
                    dataIndex: 'SS',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'TP(mg/L)',
                    dataIndex: 'TP',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'DTP(mg/L)',
                    dataIndex: 'DTP',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'PO4-P(mg/L)',
                    dataIndex: 'PO4P',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'TN(mg/L)',
                    dataIndex: 'TN',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'DTN(mg/L)',
                    dataIndex: 'DTN',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'NO3-N(mg/L)',
                    dataIndex: 'NO3N',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'BOD(mg/L)',
                    dataIndex: 'BOD',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'COD(mg/L)',
                    dataIndex: 'COD',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'POC(mg/L)',
                    dataIndex: 'POC',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'DOC(mg/L)',
                    dataIndex: 'DOC',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'TOC(mg/L)',
                    dataIndex: 'TOC',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '총대장균군수(CFU/100ml)',
                    dataIndex: 'TCOLI_CO',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '분원성대장균군수(CFU/100ml)',
                    dataIndex: 'FCOLI_CO',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: 'UV254',
                    dataIndex: 'UV254',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }]
            }]
        }];
        this.callParent();
        // 검색조건 컨트롤 초기화

        $KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
    }
});
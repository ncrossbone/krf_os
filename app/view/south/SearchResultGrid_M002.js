Ext.define('krf_new.view.south.SearchResultGrid_M002', {

    extend: 'Ext.container.Container',

    xtype: 'south-grid-searchresult',

    id: 'searchResultContainer_M002',
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
                layerId: "M",
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
                    text: '지점명',
                    dataIndex: 'NPMN_NM',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '년도',
                    dataIndex: 'MESURE_DE',
                    width: 200,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '차수',
                    dataIndex: 'ODR',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '번호',
                    dataIndex: 'NO',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '생물학적산소요구량',
                    dataIndex: 'BOD_VALUE',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '부유물질',
                    dataIndex: 'TOC_VALUE',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '총인',
                    dataIndex: 'SS_VALUE',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '총질소',
                    dataIndex: 'TP_VALUE',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }

                }, {
                    text: '탁도(NTU)',
                    dataIndex: 'TN_VALUE',
                    width: 110,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }]
            }]
        }];
        this.callParent();
        // 검색조건 컨트롤 초기화

        $KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
    }
});
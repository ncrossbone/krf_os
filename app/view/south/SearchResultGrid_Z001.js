Ext.define('krf_new.view.south.SearchResultGrid_Z001', {

    extend: 'Ext.container.Container',

    xtype: 'south-grid-searchresult',

    id: 'searchResultContainer_Z001',
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
                layerId: "Z001",
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
                    dataIndex: 'SITE_CODE',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '조사지점명',
                    dataIndex: 'SITE_NM',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '조사연도',
                    dataIndex: 'MESURE_YEAR',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '조사월',
                    dataIndex: 'MESURE_MT',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '조사회차',
                    dataIndex: 'MESURE_TME',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '학명',
                    dataIndex: 'SPECIES_SCNCENM',
                    width: 100,
                    filter: { type: 'string', itemDefaults: { emptyText: 'Search for...' } }
                }, {
                    text: '국명',
                    dataIndex: 'SPECIES_KORNM',
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
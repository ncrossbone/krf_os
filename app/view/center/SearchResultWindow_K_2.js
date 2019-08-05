Ext.define('krf_new.view.center.SearchResultWindow_K_2', {
    extend: 'Ext.window.Window',

    xtype: 'center-searchResultWindow_K_2',

    id: 'searchResultWindow_K_2',

    title: '방지시설',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    width: 800,
    height: 600,

    closable: true,
    constrain: true,
    minimizable: true,
    onEsc: false,

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'container',
        items:[{
            xtype: 'tabpanel',
            id: 'tabpanels_K_2',
            //title: 'tab1',
            tabBar: {
                style: 'background:#fff; padding:5px;'
            },
            style: 'background-color: #157fcb;',
            //closable: true,
            cls: 'khLee-tab-active khLee-tab-unselectable khLee-tab',
            items:[{
                title: '방지시설 운영 현황',
                autoResize: true,
                items:[{
                    xtype:'container',
                    items:[{
                        xtype: 'grid',
                        id: 'searchResultWindow_K_2_4',
                        storeCode: '2_4',
                        plugins: ['bufferedrenderer', 'gridfilters'],
                        cls: 'khLee-x-column-header-text',
                        header: {
                            height: 5
                        },
                        title: '검색결과',
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
                        columns: $KRF_APP.global.CommFn.getKInfoGrid(4)
                    }]
                }]
            },{
                title: '배출시설 정보',
                autoResize: true,
                items:[{
                    xtype:'container',
                    items:[{
                        xtype: 'grid',
                        id: 'searchResultWindow_K_2_5',
                        storeCode: '2_5',
                        plugins: ['bufferedrenderer', 'gridfilters'],
                        cls: 'khLee-x-column-header-text',
                        header: {
                            height: 5
                        },
                        title: '검색결과',
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
                        columns: $KRF_APP.global.CommFn.getKInfoGrid(5)
                    }]
                }]
            },{
                title: '배출시설 오염물질 정보',
                autoResize: true,
                items:[{
                    xtype:'container',
                    items:[{
                        xtype: 'grid',
                        id: 'searchResultWindow_K_2_6',
                        storeCode: '2_6',
                        plugins: ['bufferedrenderer', 'gridfilters'],
                        cls: 'khLee-x-column-header-text',
                        header: {
                            height: 5
                        },
                        title: '검색결과',
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
                        columns: $KRF_APP.global.CommFn.getKInfoGrid(6)
                    }]
                }]
            }],
            listeners: {
                'tabchange': function (tabPanel, tab) {

                    // store 및 그리드 임의 변수코드
                    var storeCode = tab.items.items[0].items.items[0].storeCode;

                    var gridContainer = Ext.getCmp('searchResultWindow_K_'+storeCode);

                    $KRF_APP.global.CommFn.setStoreDataK(gridContainer,storeCode);//grid container , gubunCode

                }
            }
        }]
    }],

    initComponent: function () {
        this.callParent();
    }
});
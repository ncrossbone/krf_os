Ext.define('krf_new.view.center.SearchResultWindow_K', {
    extend: 'Ext.window.Window',

    xtype: 'center-searchResultWindow_K',

    id: 'searchResultWindow_K',

    title: '배출시설',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    width: 800,
    height: 600,

    closable: true,
    constrain: true,
    minimizable: true,
    onEsc: false,
    autoScroll: true,


    items:[{
        xtype: 'container',
        layout: 'vbox',
        items:[{
            xtype: 'container',
            layout : 'hbox',
            items: [{
                xtype: 'label',
                text: '방류구 : '
            },{
                xtype: 'combo',
                id: 'searchResultWindow_K_Combo',
                valueField: 'id',
                displayField: 'name',
                listeners:{
                    change: function(a,b,c){
                        console.info(a)
                        console.info(b)
                        console.info(c)
                        //Ext.getCmp('siteListTree').getStore().data.items
                    }
                }
            }]
        },{
            xtype: 'grid',
            id: 'searchResultWindow_K_1',
            storeCode: '1',
            plugins: ['bufferedrenderer', 'gridfilters'],
            cls: 'khLee-x-column-header-text',
            header: {
                height: 5
            },
            title: '검색결과',
            beforeRender: function () {

                var me = this;
                var parentCtl = this.findParentByType("window");

                // me.setWidth(parentCtl.getWidth() - 10);
                // me.setHeight(parentCtl.getHeight() - 110);

                parentCtl.on("resize", function () {
                    ////console.info(parentCtl);
                    me.setWidth(parentCtl.getWidth() - 10);
                    me.setHeight(parentCtl.getHeight() - 110);
                });

            },
            columns: $KRF_APP.global.CommFn.getKInfoGrid(1)
        },{
            xtype: 'grid',
            id: 'searchResultWindow_K_2',
            storeCode: '2',
            plugins: ['bufferedrenderer', 'gridfilters'],
            cls: 'khLee-x-column-header-text',
            header: {
                height: 5
            },
            title: '검색결과',
            beforeRender: function () {

                var me = this;
                var parentCtl = this.findParentByType("window");

                // me.setWidth(parentCtl.getWidth() - 10);
                // me.setHeight(parentCtl.getHeight() - 110);

                parentCtl.on("resize", function () {
                    ////console.info(parentCtl);
                    me.setWidth(parentCtl.getWidth() - 10);
                    me.setHeight(parentCtl.getHeight() - 110);
                });

            },
            columns: $KRF_APP.global.CommFn.getKInfoGrid(2)
        },{
            xtype: 'grid',
            id: 'searchResultWindow_K_3',
            storeCode: '3',
            plugins: ['bufferedrenderer', 'gridfilters'],
            cls: 'khLee-x-column-header-text',
            header: {
                height: 5
            },
            title: '검색결과',
            beforeRender: function () {

                var me = this;
                var parentCtl = this.findParentByType("window");

                // me.setWidth(parentCtl.getWidth() - 10);
                // me.setHeight(parentCtl.getHeight() - 110);

                parentCtl.on("resize", function () {
                    ////console.info(parentCtl);
                    me.setWidth(parentCtl.getWidth() - 10);
                    me.setHeight(parentCtl.getHeight() - 110);
                });

            },
            columns: $KRF_APP.global.CommFn.getKInfoGrid(3)
        }]
    }],

    initComponent: function () {
        this.callParent();
    }
});
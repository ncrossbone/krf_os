Ext.define('krf_new.view.center.SearchResultWindow_K_Info', {
    extend: 'Ext.window.Window',

    xtype: 'center-searchResultWindow_K_Info',

    id: 'searchResultWindow_K_Info',

    title: '오염물질정보',

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
        xtype: 'grid',
        id: 'searchResultWindow_K_Info_Grid',
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

        }
    }],

    initComponent: function () {
        this.callParent();
    }
});
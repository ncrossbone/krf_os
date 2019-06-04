Ext.define('krf_new.view.center.SearchResultWindow_Z', {
    extend: 'Ext.window.Window',

    xtype: 'center-searchResultWindow_Z',

    id: 'searchResultWindow_Z',

    title: '검색결과',

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
                me.setWidth(parentCtl.getWidth() - 10);
                me.setHeight(parentCtl.getHeight() - 110);
            });

        }
    }],

    initComponent: function () {
        this.callParent();
    }
});
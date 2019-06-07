Ext.define('krf_new.view.center.TotalSearchDetailLoadingWindow', {
    extend: 'Ext.window.Window',

    xtype: 'center-totalSearchDetailLoadingWindow',

    id: 'totalSearchDetailLoadingWindow',

    title: '통합검색 진행중..',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    //width: 800,
    //height: 600,
    width: 1500,
    height: 600,

    x: 0,
    y: 770,

    closable: true,
    constrain: true,
    minimizable: true,
    onEsc: false,

    items: [{
            xtype:'label',
            id: 'totalSearchDetailLoading',
            value:'가나다라마바사'
    }],
    listeners: {
        // 'minimize': function (window, opts) {
        //     if (!window.collapsed) {
        //         window.collapse();
        //     } else {
        //         window.expand();
        //     }

        // }
    },
    initComponent: function () {
        this.callParent();
    }
});
Ext.define('krf_new.view.map.SedimentLegendWindow', {
    extend: 'Ext.window.Window',

    xtype: 'map-sedimentlegendwindow',

    id: 'sedimentLegendWindow',

    title: '범례',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    width: 300,
    height: 150,

    x: 0,
    y: 770,

    closable: true,
    constrain: true,
    minimizable: true,
    onEsc: false,

    layout: {
        type: 'absolute'
    },

    items: [],
    listeners: {
        "minimize": function (window, opts) {
            if (!window.collapsed) {
                window.collapse();
            } else {
                window.expand();
            }

        }
    },
    initComponent: function () {
        this.callParent();
    }
});
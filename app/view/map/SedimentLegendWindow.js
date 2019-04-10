Ext.define('krf_new.view.map.SedimentLegendWindow', {
    extend: 'Ext.window.Window',

    xtype: 'map-sedimentlegendwindow',

    id: 'sedimentLegendWindow',

    title: '범례',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    width: 285,
    height: 105,

    x: 0,
    y: 819,

    closable: true,
    constrain: true,
    minimizable: true,
    onEsc: false,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'image',
        src: './resources/images/sediment/legend.jpg'
    }],
    listeners: {
        'minimize': function (window, opts) {
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
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.ThreeDimensionsWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
    ],

    id: 'threeDim-win',

    init: function () {
        this.launcher = {
            text: 'Three Dim Window',
            iconCls: 'icon-grid'
        };
    },

    createWindow: function (config) {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('threeDim-win');
        var cfg = Ext.applyIf(config || {}, {
            id: 'threeDim-win',
            title: '3D',
            width: 740,
            height: 480,
            iconCls: 'icon-grid',
            animCollapse: false,
            constrainHeader: true,
            layout: 'fit',
            items: [{
                xtype: 'component',
                itemId: 'threeDim-iframe',
                autoScroll: true,
                autoEl: {
                    tag: 'iframe',
                    style: 'height: 100%; width: 100%;',
                    src: 'http://localhost:8081/Map.html'
                }
            }]
        });
        if (!win) {
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});


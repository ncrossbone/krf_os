/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.ReportWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'krf_new.view.report.ReportMain'
    ],

    id: 'report-win',

    init: function () {
        this.launcher = {
            text: '<span class="krf-os-startmenu-text">레포트</span>',
            iconCls: 'krf-os-startmenu-report-icon'
        };
    },

    createWindow: function (config) {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('report-win');
        var cfg = Ext.applyIf(config || {}, {
            id: 'report-win',
            header: {
                cls: 'krf-os-parentwin-header'
            },
            iconCls: 'krf-os-win-title-report-icon',
            width: 690,
            height: 850,
            minWidth: 690,
            animCollapse: false,
            constrainHeader: true,
            layout: 'fit',
            items: [{ xtype: 'app-report-main' }],
            onEsc:false,
            listeners: {
                resize: function () {

                }
            }
        });
        if (!win) {
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});
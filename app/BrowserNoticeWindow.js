/*!
* Ext JS Library
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

Ext.define('Desktop.BrowserNoticeWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
    ],

    id: 'browserNoticeWindow',

    init: function () {
    },

    createWindow: function (config) {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('browserNoticeWindow');
        var cfg = Ext.applyIf(config || {}, {
            id: 'browserNoticeWindow',
            title: '알림',
            width: 886,
            height: 658,
            alwaysOnTop: true,
            animCollapse: false,
            constrainHeader: true,
            maximizable: false,
            minimizable: false,
            id: "chromePop",
            layout: 'fit',
            title: '알림',
            style: 'border: 0px; margin: 0 0 0 0',
            items: [{
                xtype: 'image',
                src: './resources/images/chrome_pop.jpg'
            }],
            html: '<span style="position: absolute; width: 605px; left: 140px; height: 130px; top: 185px; cursor: pointer;" onclick="Ext.getCmp(\'chromePop\').chromeDown()"></span>',
            chromeDown: function () {
                var url = './resources/file/standalone.zip';
                window.location.assign(url);
            }
        });
        if (!win) {
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});

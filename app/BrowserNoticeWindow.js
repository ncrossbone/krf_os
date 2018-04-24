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
            width: 460,
            height: 370,
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
                xtype: 'panel',
                header: false,
                items: [{
                    html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
                        + '<html xmlns="http://www.w3.org/1999/xhtml">'
                        + '<head>'
                        + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
                        + '<title>Untitled Document</title>'
                        + '<style>'
                        + 'html, body,'
                        + 'div, span,'
                        + 'dl, dt, dd, ul, ol, li,'
                        + 'h1, h2, h3, h4, h5, h6,'
                        + 'blockquote, p, address, pre, cite,'
                        + 'form, fieldset, input, textarea, select,'
                        + 'table, th, td {'
                        + 'margin:0;'
                        + 'padding:0;'
                        + '},'
                        + 'background-color:#D9E5FF;'
                        + '</style>'
                        + '</head>'
                        + '<body>'
                        + '<div><img src="./resources/images/chrome_pop_2.jpg" usemap="#Map" border="0" />'
                        + '<map name="Map" id="Map">'
                        // + '<area shape="rect" coords="431,0,460,29" onclick=\"chromePopClose();\" title="닫기" />'
                        + '</map>'
                        + '</div>'
                        + '</body>'
                        + '</html>'
                }]
            }]
        });
        if (!win) {
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});

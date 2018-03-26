/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.LoginWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
    ],

    id: 'login-win',

    init: function () {

    },

    receiveMessage: function (message) {
        try {
            if (!message.data.type) {
                var loginUserInfo = JSON.parse(message.data);
                window.sessionStorage.setItem('krfLoginUser', message.data);
                var loginModule = $KRF_APP.getDesktopModule('login-win');

                window.removeEventListener('message', loginModule.receiveMessage);

                var loginWindow = $KRF_APP.getDesktopWindow('login-win');
                if (loginWindow) {
                    loginWindow.close();
                }

                $KRF_APP.completedLogin(loginUserInfo);
                // $KRF_APP.showWindowByMode();
            }
        } catch (e) {
            console.log(e);
        }
    },
    createWindow: function () {

        window.addEventListener("message", this.receiveMessage, false);

        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('login-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'login-win',
                header: { style: 'krf-os-parentwin-header' },
                title: '로그인',
                width: 800,
                height: 600,
                iconCls: 'login',
                animCollapse: false,
                border: false,
                modal: true,
                maximizable: false,
                minimizable: false,
                closable: false,
                layout: 'fit',
                draggable: false,
                items: [{
                    xtype: 'component',
                    itemId: 'login-iframe',
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%;',
                        //내부망 url 변경
                        src: $KRF_DEFINE.waterLoginUrl + 'callType=gis&url=' + window.location.origin
                    }
                }]
            });
        }
        return win;
    }
});

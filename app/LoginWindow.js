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
        window.addEventListener("message", this.receiveMessage, false);
    },

    receiveMessage: function(message){
        try{
            var loginUserInfo = JSON.parse(message.data);
        }catch(e){
            console.log(e);
        }
        
        window.sessionStorage.setItem('krfLoginUser', message.data);
        var loginModule = $KRF_APP.getDesktopModule('login-win');

        window.removeEventListener('message', loginModule.receiveMessage );

        var loginWindow = $KRF_APP.getDesktopWindow('login-win');
        if(loginWindow){
            loginWindow.close();
        }

        $KRF_APP.showWindowByMode();

    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('login-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'login-win',
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
                autoScroll: false,
                draggable:false,
                onEsc:function(){
                    return;
                },
                items: [{
                    xtype: 'component',
                    itemId: 'login-iframe',
                    autoScroll: false,
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%;',
                        //내부망 url 변경
                        src: 'http://192.168.0.233:8081/jsp/login/login.jsp?callType=gis&url='+window.location.origin
                    }
                }]
            });
        }
        return win;
    }
});

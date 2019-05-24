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
        this.launcher = {
			text: '<span class="krf-os-startmenu-text">로그인</span>',
			iconCls: 'krf-os-startmenu-admin-icon'
		};
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
                
                style: 'height: 100%; width: 100%; border: 1px solid #dadada; padding: 40px',
                iconCls: 'login',
                animCollapse: false,
                border: false,
                modal: true,
                maximizable: false,
                minimizable: false,
                closable: false,
                layout: 'hbox',
                 //draggable: false,
                /*items: [{
                    xtype: 'component',
                    itemId: 'login-iframe',
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%;',
                        //내부망 url 변경
                        src: $KRF_DEFINE.waterLoginUrl + 'callType=gis&url=' + window.location.origin 
                    }
                }]*/
                items:[{
                    xtype:'container',
                    items:[{
                        xtype:'image',
                        height: 169,
                        width: 166,
                        src: './resources/images/login/login_bg.png'
                    }]
                },{
                    xtype:'container',
                    layout: 'vbox',
                    //style:'padding-left: 10px',
                    width: 370,
                    items:[{
                        xtype:'image',
                        height: 62,
                        width: 205,
                        style: 'padding-bottom: 20px;',
                        src: './resources/images/login/logo.png'
                    },{
                        xtype: 'textfield',
                        style:'width: 370px; box-sizing: border-box; padding: 10px 15px; border-radius: 2px; border: 1px solid #dadada; color: #a3a3a3; padding-bottom: 20px;',
                        id:'userId'
                    },{
                        xtype: 'textfield',
                        inputType:'password',
                        style:'width: 370px; box-sizing: border-box; padding: 10px 15px; border-radius: 2px; border: 1px solid #dadada; color: #a3a3a3; padding-bottom: 20px;',
                        id:'userPass'
                    },{
                        xtype: 'button',
                        id: 'loginButton',
                        style:'width: 370px; padding: 18px; background: #263352; color: #ffffff; font-size: 13px; text-align: center;',
                        text: '로그인',
                        listeners:{
                            click: function(evt){
                                var id = null;
                                var pass = null;
                                id = Ext.getCmp('userId').getValue();
                                pass = Ext.getCmp('userPass').getValue();

                                if(id){
                                    if(pass){
                                        Ext.Ajax.request({
                                            //url: _API.getUserLayerInfo,
                                            url: "http://localhost/krf/config/login",
                                            dataType: "text/plain",
                                            method: 'POST',
                                            async: true,
                                            params: {
                                                userId: id,
                                                userPass: pass
                                            },
                                            //params: { userId: loginInfo.userId },
                                            success: function (response, opts) {
                                                var decodeData = Ext.util.JSON.decode(response.responseText);
                                                if(decodeData.data.length >= 1){
                                                    $KRF_APP.loginInfo = decodeData.data[0];
                                                    $KRF_APP.completedLogin($KRF_APP.loginInfo);
                                                    Ext.getCmp('login-win').close();
                                                }
                                            }
                                        });
                                    }else{
                                        alert("패스워드를 입력하세요")
                                    }
                                }else{
                                    alert("아이디를 입력하세요")
                                }
                            }
                        }
                    }]
                }],

            });
        }
        return win;
    }
});

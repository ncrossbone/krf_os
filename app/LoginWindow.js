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
                //header: { style: 'krf-os-parentwin-header' },
                header: false,

                style: 'border: 5px solid #043264 !important; border-radius: 0;',
                bodyStyle: 'padding:30px;',
                iconCls: 'login',
                animCollapse: false,
                border: false,
                modal: true,
                maximizable: false,
                minimizable: false,
                closable: false,
                layout: 'vbox',
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
                items: [{
                    xtype: 'container',
                    layout: 'vbox',
                    style: 'border:1px solid #d7d7d7; padding:45px 145px 20px 145px;',
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [{
                            xtype: 'image',
                            width: 218,
                            height: 53,
                            src: './resources/images/login/krf_logo.png'
                        }, {
                            xtype: 'image',
                            width: 114,
                            height: 93,
                            src: './resources/images/login/login_bg.png'
                        }]
                    }, {
                        xtype: 'textfield',
                        style: 'padding:10px 15px; border:1px solid #dadada; border-radius:3px; color:#232323; width:370px; box-sizing:border-box; font-family:\'notokr-regular\'; font-size:14px;',
                        id: 'userId'
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        style: 'padding:10px 15px; border:1px solid #dadada; border-radius:3px; color:#232323; width:370px; box-sizing:border-box; font-family:\'notokr-regular\'; font-size:14px;',
                        id: 'userPass'
                    }, {
                        xtype: 'button',
                        id: 'loginButton',
                        style: 'width: 370px; box-sizing:border-box; background: #263352; color: #fff; font-size: 15px; font-family:\'notokr-regular\'; display:block; text-align: center; padding: 15px 0; margin-top:20px; border-radius:3px;',
                        text: '로그인',
                        listeners: {
                            click: function (evt) {
                                var id = null;
                                var pass = null;
                                id = Ext.getCmp('userId').getValue();
                                pass = Ext.getCmp('userPass').getValue();

                                if (id) {
                                    if (pass) {
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
                                                if (decodeData.data.length >= 1) {
                                                    $KRF_APP.loginInfo = decodeData.data[0];
                                                    $KRF_APP.completedLogin($KRF_APP.loginInfo);
                                                    Ext.getCmp('login-win').close();
                                                }
                                            }
                                        });
                                    } else {
                                        alert("패스워드를 입력하세요")
                                    }
                                } else {
                                    alert("아이디를 입력하세요")
                                }
                            }
                        }
                    }]
                }, {
                    xtype: 'container',
                    layout: 'vbox',
                    style: 'background:#f5f5f5; padding:20px; text-align:center;',
                    width: 663,
                    items: [{
                        xtype: 'label',
                        text: '물환경지리정보서비스는 물환경정보시스템 인트라넷 계정정보와 동일하게 로그인 가능합니다.',
                        style: 'background:url(\'./resources/images/login/blit.png\') no-repeat left center; padding-left:10px; letter-spacing:-1px; font-size:14px; font-family:\'notokr-regular\'; color:#323232'
                    }, {
                        xtype: 'label',
                        text: '계정이 없는 분은 물환경정보시스템 인트라넷 회원가입을 통해 이용 할 수 있습니다.',
                        style: 'background:url(\'./resources/images/login/blit.png\') no-repeat left center; padding-left:10px; letter-spacing:-1px; font-size:14px; font-family:\'notokr-regular\'; color:#323232'
                    }, {
                        xtype: 'container',
                        height: 10
                    }, {
                        xtype: 'label',
                        text: '인트라넷',
                        style: 'background:url(\'./resources/images/login/blankbg.png\') no-repeat right 20px center #657380; padding:8px 38px 8px 20px; letter-spacing:-1px; font-size:14px; font-family:\'notokr-regular\'; color:#fff; display:inline-block; margin-left: 260px; cursor:pointer;',
                        listeners: {
                            render: function (c) {
                                c.getEl().on('click', function () {
                                    window.location.href = $KRF_DEFINE.intraNetUrl;
                                })
                            }
                        }
                    }]
                }],

            });
        }
        return win;
    }
});

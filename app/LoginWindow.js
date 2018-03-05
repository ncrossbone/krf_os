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

    id:'login-win',

    init : function(){
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('login-win');
        if(!win){
            win = desktop.createWindow({
                id: 'login-win',
                title:'로그인',
                width:600,
                height:400,
                iconCls: 'login',
                animCollapse:false,
                border: false,
                modal: true,

                layout: 'fit',
                items: [
                ]
            });
        }
        return win;
    }
});

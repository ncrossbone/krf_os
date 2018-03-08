/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.ReportWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
    ],

    id:'report-win',

    init : function(){
        this.launcher = {
            text: '레포트',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(config){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('report-win');
        var cfg = Ext.applyIf(config || {}, {
			            id: 'report-win',
			            title:'레포트',
			            width:740,
			            height:480,
			            iconCls: 'icon-grid',
			            animCollapse:false,
			            constrainHeader:true,
			            layout: 'fit',
			            items:[ {
			                xtype: 'component',
			                itemId: 'status-iframe',
			                autoScroll: true,
			                autoEl: {
			                    tag: 'iframe',
			                    style: 'height: 100%; width: 100%;',
			                    src: 'http://112.217.167.123:48090/egov/main/site/dashboardInfo'
			                }
			            }]
			        });
        if(!win){
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});


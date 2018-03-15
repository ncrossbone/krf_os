/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('krf_new.Desktop.App', {
    extend: 'Ext.ux.desktop.App',

    name: 'krf_new',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'Desktop.StatusBoardWindow',
        'Desktop.MapWindow',
        'Desktop.AdminConfigWindow',
        'Desktop.LoginWindow',
        'Desktop.ThreeDimensionsWindow',
        'Desktop.ReportWindow',
        'Desktop.BrowserNoticeWindow'

        //        'Desktop.SiteListWindow',
        //        'Desktop.SearchWindow',
        //        'Desktop.ResultWindow',
        //        'Desktop.SiteInfoChartWindow'

    ],

    init: function () {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
        $KRF_APP.fireEvent($KRF_EVENT.DESK_TOP_LOADED, this);
    },

    getModules: function () {
        return [
            new Desktop.MapWindow(),
            new Desktop.StatusBoardWindow(),
            new Desktop.ReportWindow(),
            new Desktop.ThreeDimensionsWindow(),
            new Desktop.AdminConfigWindow(),
            new Desktop.LoginWindow(),
            new Desktop.BrowserNoticeWindow()
            //            new Desktop.SearchWindow(),
            //            new Desktop.SiteListWindow(),
            //            new Desktop.ResultWindow(),
            //            new Desktop.SiteInfoChartWindow()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //            cls: 'ux-desktop-black',

            contextMenuItems: [
                // { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: 'KRF', text: 'KRF', iconCls: 'krf-os-krf-icon', module: $KRF_APP.KRF_MODE },
                    { name: 'Staus', text: '현황판', iconCls: 'krf-os-status-icon', module: $KRF_APP.STATUS_MODE },
                    { name: 'Report', text: '레포트', iconCls: 'krf-os-report-icon', module: $KRF_APP.REPORT_MODE },
                    { name: 'threeDim', text: '3D지도', iconCls: 'krf-os-threedim-icon', module: $KRF_APP.THREEDIM_MODE },
                    { name: 'Admin', text: '관리', iconCls: 'krf-os-admin-icon', module: $KRF_APP.ADMIN_MODE }
                ]
            }),

            wallpaper: 'resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false,
            dock: 'left'
        });
    },

    // config for the start menu
    getStartConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            iconCls: 'user',
            id:'krf-os-startmenu',
            height: 350,
            width:300,
            header:false,
            itemCls:'krf-os-startmenu-item',
            bodyCls:'gradient',
            //            toolConfig: {
            //                width: 100,
            //                items: [
            //                    {
            //                        text:'Settings',
            //                        iconCls:'settings',
            //                        handler: me.onSettings,
            //                        scope: me
            //                    },
            //                    '-',
            //                    {
            //                        text:'Logout',
            //                        iconCls:'logout',
            //                        handler: me.onLogout,
            //                        scope: me
            //                    }
            //                ]
            //            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                // { name: 'KRF 모드', iconCls: 'accordion', module: $KRF_APP.KRF_MODE },
                // { name: '현황판', iconCls: 'icon-grid', module: $KRF_APP.REPORT_MODE }
            ],
            trayItems: [
                //                { xtype: 'trayclock', flex: 1 }
                {
                    xtype: 'image',
                    id: 'btnWallpaper',
                    groupId: 'btnWallpaper',
                    title: '바탕화면보기',
                    width: 80,
                    height: 35,
                    listeners: { el: { click: function () {
                        $KRF_APP.fireEvent($KRF_EVENT.MINIMIZE_WINDOWS);
                    } } },
                    src: './resources/images/button/wallpaper.png'
                }
            ]
        });
    },

    onSettings: function () {
        var dlg = new Desktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});

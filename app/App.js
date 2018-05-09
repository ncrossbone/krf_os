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
        'Desktop.MapWindow',
        'Desktop.StatusBoardWindow',
        'Desktop.ReportWindow',
        'Desktop.ThreeDimensionsWindow',
        'Desktop.AdminConfigWindow',
        'Desktop.LoginWindow'

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
            new Desktop.LoginWindow()
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

            contextMenuItems: [],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    // { name: 'KRF', text: '물환경<br/>지리정보', iconCls: 'krf-os-krf-icon', module: $KRF_APP.KRF_MODE },
                    // { name: 'Staus', text: '현황판', iconCls: 'krf-os-status-icon',  module: $KRF_APP.STATUS_MODE },
                    // { name: 'Report', text: '레포트', iconCls: 'krf-os-report-icon', module: $KRF_APP.REPORT_MODE },
                    // { name: 'threeDim', text: '3D지도', iconCls: 'krf-os-threedim-icon', module: $KRF_APP.THREEDIM_MODE },
                    // { name: 'Admin', text: '관리', iconCls: 'krf-os-admin-icon', style:'display:none', module: $KRF_APP.ADMIN_MODE }
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
            id: 'krf-os-startmenu',
            height: 350,
            width: 300,
            header: false,
            itemCls: 'krf-os-startmenu-item',
            bodyCls: 'gradient'
        });
    },

    createWindow: function (module) {
        if (module) {
            $KRF_APP.fireEvent($KRF_EVENT.CREATE_WINDOW, module);
        }
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
                    style: 'cursor:pointer;',
                    listeners: {
                        el: {
                            click: function () {
                                $KRF_APP.fireEvent($KRF_EVENT.MINIMIZE_WINDOWS);
                            }
                        }
                    },
                    src: './resources/images/button/wallpaper.png'
                }
            ]
        });
    }
});

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

    id: 'report-win',

    init: function () {
        this.launcher = {
            text: '<span class="krf-os-startmenu-text">레포트</span>',
            iconCls: 'krf-os-startmenu-report-icon'
        };
    },

    createWindow: function (config) {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('report-win');
        var cfg = Ext.applyIf(config || {}, {
            id: 'report-win',
            header: {
                cls: 'krf-os-parentwin-header'
            },
            iconCls: 'krf-os-win-title-report-icon',
            width: 740,
            height: 480,
            animCollapse: false,
            constrainHeader: true,
            layout: 'fit',
            items: [{
                xtype: 'panel',
                layout: 'vbox',
                items: [{
                    xtype: 'grid',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'movecol'],
                        proxy: {
                            type: 'memory',
                            reader: 'array'
                        }
                    }),
                    columns: [{
                        header: '레포트명',
                        dataIndex: 'name',
                        flex: true
                    }, {
                        header: '선택',
                        dataIndex: 'movecol',
                        flex: true,
                        tdCls: 'myDraggable'
                    }],
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            dragText: '드래그해주세요.',
                            dragZone: {
                                onBeforeDrag: function (data, e) {
                                    draggedCell = Ext.get(e.target.parentNode);
                                    if (draggedCell.hasCls('myDraggable')) {
                                    } else {
                                        return false;
                                    }
                                }
                            }
                        }
                    },
                    height: 200,
                    width: 400
                }, {
                    xtype: 'grid',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'movecol'],
                        data: [
                            ["Case1", "1"],
                            ["Case2", "2"],
                            ["Case3", "3"],
                            ["Case4", "4"]
                        ],
                        proxy: {
                            type: 'memory',
                            reader: 'array'
                        }
                    }),
                    columns: [{
                        header: '레포트명',
                        dataIndex: 'name',
                        flex: true
                    }, {
                        header: '선택',
                        dataIndex: 'movecol',
                        flex: true,
                        tdCls: 'myDraggable'
                    }],
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            dragText: '드래그해주세요.',
                            dragZone: {
                                onBeforeDrag: function (data, e) {
                                    draggedCell = Ext.get(e.target.parentNode);
                                    if (draggedCell.hasCls('myDraggable')) {
                                    } else {
                                        return false;
                                    }
                                }
                            }
                        }
                    },
                    height: 200,
                    width: 400
                }]
            }]
        });
        if (!win) {
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});


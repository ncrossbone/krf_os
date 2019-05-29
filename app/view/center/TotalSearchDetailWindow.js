Ext.define('krf_new.view.center.TotalSearchDetailWindow', {
    extend: 'Ext.window.Window',

    xtype: 'center-totalSearchDetailWindow',

    id: 'totalSearchDetailWindow',

    title: '이력정보 검색',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    //width: 800,
    //height: 600,
    width: 1500,
    height: 600,

    x: 0,
    y: 770,

    closable: true,
    constrain: true,
    minimizable: true,
    onEsc: false,

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'treepanel',
        id: 'totalSearchTree',
        rootVisible: false,
        columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: '지점',
            width: 220,
            sortable: true,
            dataIndex: 'text',
            locked: true,
            renderer: function (val, dom, d) {

                var colorConfig = {
                    'A': '#ddd9c3',
                    'B': '#daeef3',
                    'C': '#c6d9f0',
                    'D': '#eaf1dd'
                };

                var color = '';

                var id = colorConfig[d.data.parentId] ? d.data.parentId : d.data.id;
                for (key in colorConfig) {
                    if (id.indexOf(key) > -1) {
                        color = colorConfig[key];
                    }
                }

                dom.style = 'background:' + color + ' !important;';
                return val;
            },
            listeners: {
                click: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
                    if (node.record.data.leaf == true) {
                        if (node.record.data.id != undefined) {
                            // 집수구역, 지점 이동, 리치정보 하이라이트
                            var me = this.up("window");

                            me.moveCommon(record);
                        }
                    }
                }
            }
        }, {
            text: '년도',
            width: 60,
            dataIndex: 'catDId',
            align: 'center',
            renderer: function (val, dom, d) {

                var colorConfig = {
                    'A': '#ddd9c3',
                    'B': '#daeef3',
                    'C': '#c6d9f0',
                    'D': '#eaf1dd'
                };

                var color = '';

                var id = colorConfig[d.data.parentId] ? d.data.parentId : d.data.id;
                for (key in colorConfig) {
                    if (id.indexOf(key) > -1) {
                        color = colorConfig[key];
                    }
                }

                dom.style = 'background:' + color + ' !important;';
                return val;
            },
        }, {
            text: '월',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            align: 'center',
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        }, {
            text: '회차',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            align: 'center',
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        }, {
            text: '주소',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            align: 'center',
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        }, {
            text: '수심',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            align: 'center',
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        }, {
            text: '',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            align: 'center',
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        }]
    }],
    listeners: {
        // 'minimize': function (window, opts) {
        //     if (!window.collapsed) {
        //         window.collapse();
        //     } else {
        //         window.expand();
        //     }

        // }
    },
    initComponent: function () {
        this.callParent();
    }
});
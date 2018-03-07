/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimSearchWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'krf_new.view.search.threeDim.ThreeDimWest'
    ],
    xtype: 'threeDim-search-win',

    id: 'threeDimSearch-win',

    title: '위치이동',
    x: 0,
    y: 0,
    width: 340,
    height: 480,
    iconCls: 'icon-grid',
    animCollapse: false,
    layout: 'fit',
    maximizable: false,
    minimizable: true,
    constrain: true,
    constrainHeader: false,
    closable: false,
    listeners: {
        'minimize': function (window, opts) {
            window.collapse();
            window.setWidth(150);
        },
        'resize': function (window, width, height) {
            // 레이어 트리 패널 높이 조절 (스크롤)
            var treeCtl = Ext.getCmp('westThreeDimLayer01').items.items[0];
            if (treeCtl == undefined)
                return;

            treeCtl.setHeight(height - 50);
        }
    },
    tools: [{
        type: 'restore',
        handler: function (evt, toolEl, owner, tool) {
            var window = owner.up('window');
            window.setWidth(300);
            window.expand('', false);
            //            window.center();
        }
    }],
    items: [
        { xtype: 'app-threeDim-west' }
    ]
});
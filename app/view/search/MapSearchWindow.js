/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.search.MapSearchWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'krf_new.view.search.West'
    ],
    xtype: 'map-search-win',

    id: 'search-win',

    title: '위치검색',
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
            //            window.setX(0);
            //            window.setY(0);
            //            window.alignTo(Ext.getBody(), 'bl-bl')
        },
        'resize': function (window, width, height) {
            // 레이어 트리 패널 높이 조절 (스크롤)
            var treeCtl = Ext.getCmp('westLayer01').items.items[0];
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
        { xtype: 'app-default-west' }
    ]
});
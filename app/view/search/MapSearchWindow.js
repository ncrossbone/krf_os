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
    // iconCls: 'icon-grid',
    animCollapse: false,
    collapsible: true,
    layout: 'fit',
    maximizable: false,
    minimizable: false,
    resizable: false,
    constrain: true,
    constrainHeader: false,
    closable: false,
    onEsc: false,
    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',
    listeners: {
        'minimize': function (window, opts) {
            window.collapse();
        },
        'resize': function (window, width, height) {
            // 레이어 트리 패널 높이 조절 (스크롤)
            var treeCtl = Ext.getCmp('westLayer01').items.items[0];
            if (treeCtl == undefined)
                return;

            treeCtl.setHeight(height - 90);
        }
    },
    tools: [/*{
        type: 'restore',
        handler: function (evt, toolEl, owner, tool) {
            var window = owner.up('window');
            window.expand('', false);
            //            window.center();
        }
    }*/],
    items: [
        { xtype: 'app-default-west' }
    ]
});
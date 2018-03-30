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
    header:{cls :'subWindow-x-form-item-label-default'},
    cls: 'subWindow-x-form-item-label-default',
    listeners: {
        'minimize': function (window, opts) {
            if (!window.isMinimaiz) {
                window.collapse();
                var dp = $('.ux-wallpaper');
                window.beforeY = window.getY();
                window.beforeX = window.getX();
                window.isMinimaiz = true;
                window.setY(dp.height() - 35);
                window.setX(98);
            }
        },
        'resize': function (window, width, height) {
            // 레이어 트리 패널 높이 조절 (스크롤)
            var treeCtl = Ext.getCmp('westThreeDimLayer01').items.items[0];
            if (treeCtl == undefined)
                return;

            treeCtl.setHeight(height - 75);
        }
    },
    tools: [
        /*{
        type: 'restore',
        handler: function (evt, toolEl, owner, tool) {
            var window = owner.up('window');
            if (window.isMinimaiz) {
                window.expand('', false);
                window.setY(window.beforeY);
                window.setX(window.beforeX);
                window.isMinimaiz = false;
            }
        }
    }*/],
    items: [
        { xtype: 'app-threeDim-west' }
    ]
});
/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.admin.LayerSetWindow', {
    extend: 'Ext.window.Window',
    requires: [
      'krf_new.view.admin.LayerSetPanel'
    ],
    xtype: 'layer-set-win',

    id: 'layer-set-win',

    title: '주제도',
    width: 340,
    height: 480,
    animCollapse: false,
    collapsible: false,
    layout: 'fit',
    maximizable: false,
    minimizable: false,
    resizable: false,
    constrain: true,
    constrainHeader: false,
    closable: true,
    modal: true,
    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',
    listeners: {
        'resize': function (window, width, height) {
            // // 레이어 트리 패널 높이 조절 (스크롤)
            var treeCtl = Ext.getCmp('layerSetLayer01').items.items[0];
            if (treeCtl == undefined)
                return;

            treeCtl.setHeight(height - 100);
        }
    },
    items: [{xtype:'layer-set-panel'}
    ]
});
/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimMeasuredWindow', {
    extend: 'Ext.window.Window',
    requires: ['krf_new.view.search.threeDim.ThreeDimMeasuredController'],
    xtype: 'threeDim-measured-win',

    id: 'threeDimMeasured-win',

    title: '수질정보',
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
    closable: true,
    header: { cls: 'subWindow-x-form-item-label-default' },
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

            treeCtl.setHeight(height - 50);
        },
        'close': function () {
            var btnMeasured = Ext.getCmp('btnMeasuredWindow');
            btnMeasured.btnOnOff = 'off';
            btnMeasured.setSrc(btnMeasured.btnOffImg);
        }
    },
    tools: [],
    items: [{
        xtype: 'container',
        id: 'threeDimMeasuredContents',
        layout: {
            type: 'border'
        },
        items: [{
            xtype: 'container',
            region: 'north',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                width: 10
            }, {
                id: 'cmbThreeDimMeasured',
                xtype: 'combo',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: ' <b>기준값/b> ',
                labelWidth: 60,
                labelAlign: 'right',
                labelPad: 10,
                width: 225,
                store: Ext.create('krf_new.store.west.SearchArea_ADM'),
                editable: false,
                displayField: 'name',
                valueField: 'id'
            }, {
                xtype: 'container',
                width: 10
            }, {
                id: 'btnThreeDimMeasured',
                xtype: 'button',
                lnkCmbId: 'cmbThreeDimMeasured',
                disabled: false,
                cls: 'khLee-x-button-move'
            }]
        }, {
            xtype: 'treepanel',
            scroll: false,
            region: 'center',
            cls: 'khLee-x-tab-header',
            viewConfig: {
                style: { overflow: 'auto', overflowX: 'hidden' }
            },
            store: Ext.create('krf_new.store.west.ThreeDimMeasuredStore'),
            controller: 'threeDimMeasuredController',
            id: 'threeDimMeasuredLayer',
            rootVisible: false,
            useArrows: true,
            border: 0,
            bufferedRenderer: false
        }]
    }]
});
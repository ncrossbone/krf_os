Ext.define('krf_new.view.center.SstgDetailExtendWindow', {
    extend: 'Ext.window.Window',

    xtype: 'map-sstgdetailextendwindow',

    id: 'sstgDetailExtendWindow',

    title: '이력정보 검색',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    width: 800,
    height: 600,

    x: 0,
    y: 770,

    closable: true,
    constrain: true,
    minimizable: true,
    onEsc: false,

    layout: {
        type: 'vbox'
    },

    items: [{
        xtype: 'panel',
        layout: {
            type: 'vbox'
        },
        height: 130,
        items: [{
            xtype: 'container',
            height: 25
        }, {
            xtype: 'combo',
            id: 'sstgDetailExtendCombo',
            cls: 'khLee-x-form-item-label-default',
            fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>이력구분</b> ',
            labelWidth: 100,
            labelAlign: 'right',
            labelPad: 10,
            width: 310,
            paramId: '1',
            valueField: 'id',
            displayField: 'name',
            editable: false,
            listeners: {
                select: function (obj) {
                    if (!obj.getValue()) {
                        return;
                    }

                    $KRF_APP.global.SstgGridFn.setExtendCombo(obj.getValue());
                }
            }
        }, {
            xtype: 'panel',
            id: 'sstgDetailBasicArea',
            style: 'margin-top:10px;',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'combo',
                id: 'sstgDetailExtendCombo2',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>조사분야</b> ',
                labelWidth: 100,
                labelAlign: 'right',
                labelPad: 10,
                width: 225,
                paramId: '2',
                valueField: 'id',
                displayField: 'name',
                editable: false
            }, {
                xtype: 'container',
                width: 10
            }, {
                xtype: 'combo',
                id: 'sstgDetailExtendCombo3',
                width: 125,
                paramId: '3',
                valueField: 'id',
                displayField: 'name',
                editable: false
            }, {
                xtype: 'combo',
                id: 'sstgDetailExtendCombo4',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>기간</b> ',
                labelWidth: 100,
                labelAlign: 'right',
                labelPad: 10,
                width: 225,
                paramId: '3',
                valueField: 'id',
                displayField: 'name',
                editable: false
            }, {
                xtype: 'container',
                width: 10
            }, {
                xtype: 'label',
                style: 'margin-top: 3px;',
                text: '~'
            }, {
                xtype: 'container',
                width: 10
            }, {
                xtype: 'combo',
                id: 'sstgDetailExtendCombo5',
                paramId: '3',
                width: 125,
                valueField: 'id',
                displayField: 'name',
                editable: false
            }]
        }, {
            xtype: 'panel',
            id: 'sstgDetailArea2',
            style: 'margin-top:10px;',

            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'combo',
                id: 'sstgDetailExtendCombo6',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>수질영향권역</b> ',
                labelWidth: 127,
                labelAlign: 'right',
                labelPad: 10,
                width: 252,
                paramId: '2',
                valueField: 'id',
                displayField: 'name',
                editable: false
            }, {
                xtype: 'container',
                width: 10
            }, {
                xtype: 'combo',
                id: 'sstgDetailExtendCombo7',
                width: 125,
                paramId: '3',
                valueField: 'id',
                displayField: 'name',
                editable: false
            }, {
                xtype: 'textfield',
                id: 'sstgDetailExtendCombo8',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>지점명</b> ',
                labelWidth: 73,
                labelAlign: 'right',
                labelPad: 10,
                width: 250,
                paramId: '3',
            }]
        }, {
            xtype: 'panel',
            id: 'sstgDetailArea3',
            style: 'margin-top:10px;',

            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'combo',
                id: 'sstgDetailExtendCombo10',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>항목</b> ',
                labelWidth: 75,
                labelAlign: 'right',
                labelPad: 10,
                width: 300,
                paramId: '2',
                valueField: 'id',
                displayField: 'name',
                editable: false
            }, {
                xtype: 'container',
                width: 88
            }, {
                xtype: 'textfield',
                id: 'sstgDetailExtendCombo12',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>종명</b> ',
                labelWidth: 73,
                labelAlign: 'right',
                labelPad: 10,
                width: 250,
                paramId: '3',
            }]
        }]
    }, {
        xtype: 'button',
        style: 'margin-left: 365px;',
        text: '검색',
        listeners: {
            el: {
                click: function () {
                    alert();
                }
            }
        }
    }, {
        xtype: 'container',
        height: 10
    }, {
        xtype: 'container',
        width: '100%',
        height: '100%',
        items: [{
            xtype: 'grid',
            plugins: ['bufferedrenderer', 'gridfilters'],
            cls: 'khLee-x-column-header-text',
            height: 370,
            header: false,
            columns: $KRF_APP.global.SstgGridFn.getSstgDetailExtendColumn(),
        }]
    }],
    listeners: {
        'minimize': function (window, opts) {
            if (!window.collapsed) {
                window.collapse();
            } else {
                window.expand();
            }

        }
    },
    initComponent: function () {
        this.callParent();
    }
});
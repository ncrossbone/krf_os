Ext.define('krf_new.view.east.SedimentSeachWindow', {
    extend: 'Ext.window.Window',

    xtype: 'east-sedimentSeachWindow',
    id: 'sedimentSeachWindow',
    title: '퇴적물 등급 지도 보기 설정',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    closable: true,
    constrain: true,
    minimizable: true,
    onEsc: false,

    width: 300,
    height: 200,

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    items: [{
        xtype: 'form',
        cls: 'khLee-x-form',
        style: 'padding:10px;',

        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'container',
            height: 7
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'combo',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>년도</b> ',
                labelWidth: 60,
                labelAlign: 'right',
                labelPad: 10,
                width: 225,
                editable: false,
                displayField: 'name',
                valueField: 'id'
            }]
        }, {
            xtype: 'container',
            height: 7
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'combo',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>반기</b> ',
                labelWidth: 60,
                labelAlign: 'right',
                labelPad: 10,
                width: 225,
                editable: false,
                displayField: 'name',
                valueField: 'id'
            }, {
                xtype: 'container',
                width: 10
            }]
        }, {
            xtype: 'container',
            height: 7
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'combo',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>항목</b> ',
                labelWidth: 60,
                labelAlign: 'right',
                labelPad: 10,
                width: 225,
                editable: false,
                displayField: 'name',
                valueField: 'id'
            }, {
                xtype: 'container',
                width: 10
            }]
        }, {
            xtype: 'container',
            height: 7
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'end',
                pack: 'middle'
            },
            items: [{
                xtype: 'button',
                id: 'sedimentSearch',
                cls: 'khLee-x-button-select'
            }]
        }, {
            xtype: 'container',
            height: 7
        }]
    }],

    listeners: {
        "minimize": function (window, opts) {
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
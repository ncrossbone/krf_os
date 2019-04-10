Ext.define('krf_new.view.center.SstgDetailWindow', {
    extend: 'Ext.window.Window',

    xtype: 'map-sstgdetailwindow',

    id: 'sstgDetailWindow',

    title: '이력정보 검색',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    width: 360,
    height: 130,

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
        xtype: 'container',
        height: 25
    },{
        xtype: 'combo',
        id: 'sstgDetailCombo',
        cls: 'khLee-x-form-item-label-default',
        fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>이력구분</b> ',
        labelWidth: 100,
        labelAlign: 'right',
        labelPad: 10,
        width: 310,
        valueField: 'id',
        displayField: 'name',
        editable:false,
        listeners: {
            select: function (obj) {
                if(!obj.getValue()){
                    return;
                }

                $KRF_APP.global.SstgGridFn.sstgDetailExtendInit(obj.getValue());
            }
        }
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
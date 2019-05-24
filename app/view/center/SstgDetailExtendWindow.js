Ext.define('krf_new.view.center.SstgDetailExtendWindow', {
    extend: 'Ext.window.Window',

    xtype: 'map-sstgdetailextendwindow',

    id: 'sstgDetailExtendWindow',

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

                }
            }
        }
    }, {
        xtype: 'button',
        text: '컬럼 더하기 테스트',
        listeners: {
            el: {
                click: function () {
                    var originGrid = Ext.getCmp('sstgDetailExtendGrid');
                    var config = originGrid.getColumns();
                    var originData = originGrid.getStore().getData().items;

                    var addedColumnArr = [];
                    var addedDataArr = [];

                    for (var i = 0; i < originData.length; i++) {
                        originData[i].data.FLAG = parseInt(Math.random() * 10);
                        addedDataArr.push(originData[i].data);
                    }

                    for (var i = 0; i < config.length; i++) {
                        addedColumnArr.push(config[i].initialConfig);
                    }

                    var addedColumn = {};
                    addedColumn.text = '건강성등급';
                    addedColumn.width = 100;
                    addedColumn.dataIndex = 'FLAG';

                    addedColumnArr.push(addedColumn);

                    originGrid.setColumns(addedColumnArr);

                    var store = Ext.create('Ext.data.Store');
                    store.setData(addedDataArr);

                    originGrid.setStore(store);

                }
            }
        }
    }, {
        xtype: 'button',
        text: '엑셀다운',
        listeners: {
            el: {
                click: function () {
                    $KRF_APP.global.SstgGridFn.excelDown();
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
            id: 'sstgDetailExtendGrid',
            // columns: $KRF_APP.global.SstgGridFn.getSstgDetailExtendColumn(),
            columns: [{
                text: '자료구분',
                dataIndex: 'flag',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '지점',
                dataIndex: 'spot',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '일자',
                dataIndex: 'date',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '회차',
                dataIndex: 'cnt',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '주소',
                dataIndex: 'addr',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '수심(m)',
                dataIndex: 'wl',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '수온(C)',
                dataIndex: 'wc',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: 'DO',
                dataIndex: 'do',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: 'BOD',
                dataIndex: 'bod',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: 'COD',
                dataIndex: 'cod',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: 'SS',
                dataIndex: 'ss',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: 'TN',
                dataIndex: 'tn',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: 'TP',
                dataIndex: 'tp',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: 'TOC',
                dataIndex: 'toc',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '지수',
                dataIndex: 'ji',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '건강성등급',
                dataIndex: 'gg',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '오염단계',
                dataIndex: 'pl',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '총방류량',
                dataIndex: 'cntb',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '수위',
                dataIndex: 'wlu',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '강수량',
                dataIndex: 'rain',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }, {
                text: '유량',
                dataIndex: 'flow',
                width: 80,
                renderer: function (val, dom, data) {
                    $KRF_APP.global.SstgGridFn.setColor(dom, data.data);
                    return val;
                }
            }],
            store: Ext.create('Ext.data.Store', {
                data: [{ 'code': 'A', 'flag': '수질', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'A', 'flag': '수질', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'A', 'flag': '수질', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'A', 'flag': '수질', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'A', 'flag': '수질', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'B', 'flag': '생물', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'B', 'flag': '생물', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'B', 'flag': '생물', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'C', 'flag': '퇴적물', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'C', 'flag': '퇴적물', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' },
                { 'code': 'C', 'flag': '퇴적물', 'spot': '경안천1', 'date': '20190514', 'cnt': '1회차', 'addr': '경기도', 'wl': '1', 'wc': '1', 'do': '1', 'bod': '1', 'cod': '1', 'ss': '1', 'tn': '1', 'tp': '1', 'toc': '1', 'ji': '1', 'gg': '1', 'pl': '1', 'cntb': '1', 'wlu': '1', 'rain': '1', 'flow': '1' }]
                // data: [{
                //     'YEAR': '2019', 'TME': '<div style="background: gray; padding: 0px 10px; width: 45px; font-size: 11px; color: white; cursor: pointer; margin-left: 8px;">적용</div>'
                // }, {
                //     'YEAR': '2018', 'TME': '<div style="background: gray; padding: 0px 10px; width: 45px; font-size: 11px; color: white; cursor: pointer; margin-left: 8px;">적용</div>'
                // }]
            })
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
Ext.define('krf_new.view.east.DetailSearchWindow', {
    extend: 'Ext.window.Window',

    require: ([
        'Ext.form.Panel',
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector',
        'Ext.tip.QuickTipManager',
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager',
        'Ext.field.DatePicker',
        'Ext.ux.MonthPickerPlugin',
        'Ext.picker.Month'
    ]),

    xtype: 'east-detailSearchWindow',
    id: 'detailSearchWindow',
    title: '상세검색',

    bodyStyle: 'padding:10px;',

    closable: true,
    constrain: true,
    minimizable: false,
    onEsc: false,
    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    layout: {
        type: 'vbox'
    },
    items: [{
        xtype: 'label',
        style: 'background:url("./resources/images/totalSearch/tit_blit1.png") no-repeat left center; padding-left:12px; font-weight:bold; font-size:12px; font-family:"dotum";',
        text: '검색 반경'
    }, {
        xtype: 'container',
        height: 5
    }, {
        xtype: 'container',
        layout: {
            type: 'vbox'
        },
        style: 'padding:10px; background:#fafafa; border: 1px solid #dddddd;',
        items: [{
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'textfield',
                id: 'detailRadiusValue',
                maskRe: /[0-9.]/,
                fieldLabel: '<label style="background:url(\'./resources/images/totalSearch/tit_blit2.png\') no-repeat left center; padding-left:12px; font-weight:bold; font-size:12px; font-family:\'dotum\'">반경 설정</label>',
                width: 150,
                labelWidth: 80
            }, {
                xtype: 'label',
                style: 'font-size:12px; font-family:"dotum"; margin-top: 5px; margin-left: 3px;',
                text: 'km'
            }]
        }, {
            xtype: 'container',
            height: 10
        }, {
            xtype: 'label',
            text: '범위 설정',
            style: 'background:url("./resources/images/totalSearch/tit_blit2.png") no-repeat left center; padding-left:12px; font-weight:bold; font-size:12px; font-family:"dotum";',
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'fieldcontainer',
                itemId: 'rangeSetting',
                id: 'rangeSetting',
                defaultType: 'checkboxfield',
                listeners: {
                    customEvent: function (checkboxToExclude, me) {
                        // listen to the custom event
                        var checkboxes = me.query('checkboxfield');
                        for (var i = 0; i < checkboxes.length; i++) {
                            var checkbox = checkboxes[i];
                            if (checkbox != checkboxToExclude)
                                checkbox.setValue(0);
                        }

                    }
                },
                layout: {
                    type: 'hbox'
                },
                items: [{
                    boxLabel: '<label style="font-size:12px; font-family:\'dotum\';">전체</label>',
                    name: 'rangeAll',
                    inputValue: 'all',
                    id: 'rangeCheckbox1',
                    checked: true,
                    listeners: {
                        change: function (cmp, newVal) {
                            if (newVal) {
                                // fire the custom event
                                var parent = Ext.ComponentQuery.query('#rangeSetting')[0];
                                parent.fireEvent('customEvent', cmp, parent)
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    boxLabel: '<label style="font-size:12px; font-family:\'dotum\';">동일 중권역</label>',
                    name: 'range2',
                    inputValue: 'MB_ID',
                    id: 'rangeCheckbox2',
                    listeners: {
                        change: function (cmp, newVal) {
                            if (newVal) {
                                var parent = Ext.ComponentQuery.query('#rangeSetting')[0];
                                parent.fireEvent('customEvent', cmp, parent)
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    boxLabel: '<label style="font-size:12px; font-family:\'dotum\';">동일 표준유역</label>',
                    name: 'range3',
                    inputValue: 'SB_ID',
                    id: 'rangeCheckbox3',
                    listeners: {
                        change: function (cmp, newVal) {
                            if (newVal) {
                                var parent = Ext.ComponentQuery.query('#rangeSetting')[0];
                                parent.fireEvent('customEvent', cmp, parent)
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    boxLabel: '<label style="font-size:12px; font-family:\'dotum\';">동일 집수구역</label>',
                    name: 'range4',
                    inputValue: 'CAT_ID',
                    id: 'rangeCheckbox4',
                    listeners: {
                        change: function (cmp, newVal) {
                            if (newVal) {
                                var parent = Ext.ComponentQuery.query('#rangeSetting')[0];
                                parent.fireEvent('customEvent', cmp, parent)
                            }
                        }
                    }
                }
                ]
            }]
        }, {
            xtype: 'container',
            height: 10
        }, {
            xtype: 'label',
            text: '상 하류 설정',
            style: 'background:url("./resources/images/totalSearch/tit_blit2.png") no-repeat left center; padding-left:12px; font-weight:bold; font-size:12px; font-family:"dotum";',
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'fieldcontainer',
                itemId: 'udRiverSetting',
                id: 'udRiverSetting',
                defaultType: 'checkboxfield',
                listeners: {
                    customEvent: function (checkboxToExclude, me) {
                        // listen to the custom event
                        var checkboxes = me.query('checkboxfield');
                        for (var i = 0; i < checkboxes.length; i++) {
                            var checkbox = checkboxes[i];
                            if (checkbox != checkboxToExclude)
                                checkbox.setValue(0);
                        }

                    }
                },
                layout: {
                    type: 'hbox'
                },
                items: [{
                    boxLabel: '<label style="font-size:12px; font-family:\'dotum\';">전체</label>',
                    name: 'udRiverAll',
                    inputValue: 'all',
                    id: 'udRivercheckbox1',
                    checked: true,
                    listeners: {
                        change: function (cmp, newVal) {
                            if (newVal) {
                                // fire the custom event
                                var parent = Ext.ComponentQuery.query('#udRiverSetting')[0];
                                parent.fireEvent('customEvent', cmp, parent)
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    boxLabel: '<label style="font-size:12px; font-family:\'dotum\';">상류</label>',
                    name: 'udRiver2',
                    inputValue: 'up',
                    id: 'udRiverCheckbox2',
                    listeners: {
                        change: function (cmp, newVal) {
                            if (newVal) {
                                var parent = Ext.ComponentQuery.query('#udRiverSetting')[0];
                                parent.fireEvent('customEvent', cmp, parent)
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    boxLabel: '<label style="font-size:12px; font-family:\'dotum\';">하류</label>',
                    name: 'unRiver3',
                    inputValue: 'down',
                    id: 'udRivercheckbox3',
                    listeners: {
                        change: function (cmp, newVal) {
                            if (newVal) {
                                var parent = Ext.ComponentQuery.query('#udRiverSetting')[0];
                                parent.fireEvent('customEvent', cmp, parent)
                            }
                        }
                    }
                }
                ]
            }]
        }]
    }, {
        xtype: 'container',
        height: 5
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox'
        },
        width: 371,
        style: 'padding:10px; background:#fafafa; border: 1px solid #dddddd;',
        items: [{
            xtype: 'label',
            text: '기간',
            style: 'margin-top: 5px; background:url("./resources/images/totalSearch/tit_blit2.png") no-repeat left center; padding-left:12px; font-weight:bold; font-size:12px; font-family:"dotum";'
        }, {
            xtype: 'container',
            width: 10
        }, {
            xtype: 'combo',
            id: 'detail_startYear',
            //value: '2018',
            store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
            width: 65,
            height: 25
        }, {
            xtype: 'label',
            text: '년',
            style: 'font-size:12px; font-family:"dotum"; margin-top: 5px;'
        }, {
            xtype: 'combo',
            id: 'detail_startMonth',
            //value: '03',
            store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
            width: 50,
            height: 25
        }, {
            xtype: 'label',
            text: '월',
            style: 'font-size:12px; font-family:"dotum"; margin-top: 5px;'
        }, {
            xtype: 'container',
            width: 5
        }, {
            xtype: 'label',
            text: '~',
            style: 'font-size:12px; font-family:"dotum"; margin-top: 5px;',
        }, {
            xtype: 'container',
            width: 5
        }, {
            xtype: 'combo',
            id: 'detail_endYear',
            //value: '2019',
            store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
            width: 65,
            height: 25
        }, {
            xtype: 'label',
            text: '년',
            style: 'font-size:12px; font-family:"dotum"; margin-top: 5px;'
        }, {
            xtype: 'combo',
            id: 'detail_endMonth',
            //value: '01',
            store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
            width: 50,
            height: 25
        }, {
            xtype: 'label',
            text: '월',
            style: 'font-size:12px; font-family:"dotum"; margin-top: 5px;'
        }]
    }, {
        xtype: 'container',
        height: 5
    }, {
        xtype: 'label',
        text: '상세 설정',
        style: 'padding:5px 0; text-align:center; background:#4c4c4c; color:#fff; font-size:12px; font-family:"dotum"; font-weight:bold; cursor:pointer;',
        width: 371,
        listeners: {
            render: function (c) {
                var cssObj = {
                    'background': 'url("./resources/images/totalSearch/#num#")', 'border': 'none', 'background-size': '100%'
                };

                var config = {
                    'Move to Top': '2.gif',
                    'Move Up': '1.gif',
                    'Add to Selected': '5.gif',
                    'Remove from Selected': '6.gif',
                    'Move Down': '3.gif',
                    'Move to Bottom': '4.gif'
                };

                for (key in config) {
                    cssObj.background = cssObj.background.replace('#num#', config[key]);
                    $('a[aria-label="' + key + '"]').css(cssObj);
                    cssObj.background = cssObj.background.replace(config[key], '#num#');
                }

                c.getEl().on('click', function () {
                    var referenceList = Ext.getCmp('referenceList');
                    var referenceListTitle = Ext.getCmp('referenceListTitle');
                    referenceList.hidden == true ? referenceList.setHidden(false) : referenceList.setHidden(true);
                    referenceListTitle.hidden == true ? referenceListTitle.setHidden(false) : referenceListTitle.setHidden(true);
                }, c);
            }
        }
    }, {
        xtype: 'container',
        height: 10
    }, {
        xtype: 'label',
        style: 'background:url("./resources/images/totalSearch/tit_blit1.png") no-repeat left center; padding-left:12px; font-weight:bold; font-size:12px; font-family:"dotum";',
        text: '참조정보 선택',
        id: 'referenceListTitle'
    }, {
        xtype: 'container',
        height: 5
    }, {
        xtype: 'container',
        id: 'referenceList',
        layout: {
            xtype: 'vbox'
        },
        items: [{
            xtype: 'container',
            layout: 'fit',
            items: [{
                xtype: 'itemselector',
                name: 'itemselector',
                id: 'itemselector',
                width: 370,
                height: 200,
                anchor: '100%',
                //fieldLabel: '참조정보 선택',
                store: Ext.create('Ext.data.Store', {
                    fields: ['value', 'text'],
                    data: [],
                    stype: 'json'
                }),
                displayField: 'text',
                valueField: 'value',
                //value: ['3', '4', '6'],
                allowBlank: false,
                msgTarget: 'side',
                fromTitle: false,
                toTitle: false
            }]
        }, {
            xtype: 'container',
            height: 10
        }]
    }, {
        xtype: 'label',
        text: '검색',
        style: 'padding:7px 17px; text-align:center; background:#003873; color:#fff; font-size:12px; font-family:"dotum"; font-weight:bold; cursor:pointer; margin-left: 155px;',
        listeners: {
            render: function (c) {
                c.getEl().on('click', function () {

                    /*var totalSearchDetailWindow = Ext.getCmp('totalSearchDetailWindow');

                    if (!totalSearchDetailWindow) {
                        totalSearchDetailWindow = Ext.create('krf_new.view.center.TotalSearchDetailWindow');
                        Ext.getCmp('center_container').add(totalSearchDetailWindow);
                    }

                    totalSearchDetailWindow.show();

                    var store = Ext.create('krf_new.store.center.TotalSearchTree');
                    store.load();

                    Ext.getCmp('totalSearchTree').setStore(store);
                    return;*/
                    var meter = Number(Ext.getCmp('detailRadiusValue').value);
                    var detailSearchStartDate = Ext.getCmp('detail_startYear').value + Ext.getCmp('detail_startMonth').value;
                    var detailSearchEndDate = Ext.getCmp('detail_endYear').value + Ext.getCmp('detail_endMonth').value;

                    detailSearchClick(meter, detailSearchStartDate, detailSearchEndDate);

                    /*if(popSiteInfo.point){ // 선택된 지점이 있는지 
                        if(meter > 0){ // 반경이 있는지
                            if(detailSearchStartDate && detailSearchEndDate){ // 기간이 있는지
    
                                var dateCompare = detailDateCompare(detailSearchStartDate, detailSearchEndDate);
                                if(dateCompare){
                                    $KRF_APP.coreMap._krad.radiusDrawEvent(popSiteInfo.point,meter);   
                                }else{
                                    alert('종료일자가 시작일자보다 커야 합니다.')
                                }
                            }else{
                                alert("기간을 선택해 주세요");
                            }
                        }else{
                            alert("반경값을 설정하세요.")
                        }
                    }else{
                        alert("지점상세 창이 없습니다.")
                    }*/

                })
            }
        }
    }]
});
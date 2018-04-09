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
    width: 275,
    height: 300,
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
            style: 'background: #f8f8f8; padding: 10px; border-bottom: 1px solid #d8d8d8;',
            layout: {
                type: 'hbox'
            },
            items: [{
                id: 'cmbThreeDimMeasured',
                xtype: 'combo',
                cls: 'khLee-x-form-item-label-default',
                fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>기준값</b> ',
                labelWidth: 60,
                labelAlign: 'right',
                labelPad: 10,
                width: 185,
                queryMode: 'local',
                store: Ext.create('krf_new.store.east.ThreeDimMeasuredStore'),
                editable: false,
                displayField: 'name',
                valueField: 'id',
                listeners: {
                    afterrender: function () {
                        this.setValue('bod');
                    }
                }
            }, {
                xtype: 'container',
                width: 10
            }, {
                id: 'btnThreeDimMeasured',
                xtype: 'button',
                lnkCmbId: 'cmbThreeDimMeasured',
                disabled: false,
                cls: 'khLee-x-button-search',
                listeners: {
                    click: function () {
                        var selectLayer = Ext.getCmp('threeDimMeasuredLayer');
                        var selectMeasure = Ext.getCmp('cmbThreeDimMeasured');
                        
                        var selVal = selectMeasure.getValue();
                        var selTitle = selectMeasure.getSelectedRecord().data.name;

                        var selLayer = selectLayer.getChecked();

                        if (!selLayer || selLayer.length <= 0) {
                            alert('주제도를 선택하세요.');
                            return;
                        }
                        var layer = selLayer[0].data;

                        var measuredDef = Ext.Ajax.request({
                            url: _API.searchMeasuredValue + '?type=' + layer.measureCode,
                            method: 'GET',
                            async: true
                        });

                        var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + layer.id); // 레이어 URL
                        var query = new esri.tasks.Query();
                        query.returnGeometry = true;
                        query.where = '1=1';
                        query.outFields = [layer.siteIdCol, layer.siteNmCol];
                        // query.outSpatialReference = { "wkid": 4019 };

                        var threeDimMeasuredLayer = Ext.getCmp("threeDimMeasuredLayer");

                       threeDimMeasuredLayer.removeCls("dj-mask-noneimg");
                       threeDimMeasuredLayer.addCls("dj-mask-withimg");
                       threeDimMeasuredLayer.mask("loading", "loading...");


                        var featureDef = queryTask.execute(query);
                        new dojo.DeferredList([featureDef, measuredDef]).then(function (result) {
                            threeDimMeasuredLayer.unmask();

                            if (result.length == 2) {
                                if (result[0][0] && result[1][0]) {

                                    if ('error' == result[1][1].responseText) {
                                        alert("오류가 발생하였습니다. 관리자에게 문의하세요.");
                                        return;
                                    }

                                   // alert('3D 지도 위에 수질정보 측정값을 표시합니다. 잠시만 기다려 주세요.');

                                    var parameterTo3d = { layerType: layer.measureCode, valueField: selTitle, features: [] };

                                    var geoInfo = result[0][1];
                                    var valInfo = Ext.util.JSON.decode(result[1][1].responseText).data;

                                    for (var i = 0; i < geoInfo.features.length; i++) {
                                        for (var j = 0; j < valInfo.length; j++) {
                                            if (valInfo[j].ptNo == geoInfo.features[i].attributes[layer.siteIdCol]) {
                                                parameterTo3d.features.push({ title: geoInfo.features[i].attributes[layer.siteNmCol], value: valInfo[j][selVal], x: geoInfo.features[i].geometry.x, y: geoInfo.features[i].geometry.y });
                                                valInfo.splice(j, 1);
                                                break;
                                            }
                                        }
                                    }
                                    $KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, ({ type: 'measured', value: parameterTo3d }));

                                    var layerObj = Ext.getCmp("threeDimLayer01");

                                    for (var i = 0; i < layerObj.store.data.items.length; i++) {

                                        if (layerObj.store.data.items[i].data.wmsId == layer.wmsId) {
                                            nodeObj = layerObj.store.data.items[i];
                                            nodeObj.set('checked', false);
                                        }
                                    }
                                } else {
                                    alert('조회중 오류가 발생했습니다.');
                                    return;
                                }
                            }
                        });
                    }
                }
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
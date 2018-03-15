/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.ThreeDimensionsWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'krf_new.view.search.threeDim.ThreeDimButtonPanel',
        'krf_new.view.center.ThreeDimCenter'
    ],

    id: 'threeDim-win',
    once: true,

    init: function () {

        this.launcher = {
            text: '3D 지도',
            iconCls: 'krf_icon'
        };

        window.addEventListener("message", this.receiveMessage, false);

        $KRF_APP.addListener($KRF_EVENT.THREEDIM_SEND_MESSAGE, this.sendMessage, this);

        $KRF_APP.addListener($KRF_EVENT.THREE_DIM_RESIZE_TOOL_ITEMS, this.resizeToolItems, this);
    },

    receiveMessage: function (param) {
        console.log(param);
        var me = $KRF_APP.getDesktopModule('threeDim-win');

        if (param.data) {
            switch (param.data.type) {
                case 'init':
                    $KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, ({ type: 'move', coord: me.initCoord }));
                    break;
                case 'getCenter':
                    $KRF_APP.fireEvent($KRF_EVENT.MODE_CHANGED, { mode: $KRF_APP.KRF_MODE, coord: param.data.coord });
                    break;
                case 'addCoord':
                    $KRF_APP.fireEvent($KRF_EVENT.ADD_AUTO_MOVE_COORDINATE, param.data.coord);
                    break;

            }
        }
    },

    sendMessage: function (message) {
        var threeDimIframe = $('#krf3diframe')[0];
        if (threeDimIframe && threeDimIframe.contentWindow) {
            try {
                threeDimIframe.contentWindow.postMessage(message, 'http://192.168.0.231:8081');
            } catch (e) {
                console.log(e)
            }
        }
    },
    resizeToolItems: function(){
		var threeDimToolbar = Ext.getCmp('threeDimToolbar');
		if(!threeDimToolbar){
			return;
		}
		var toolbarItmes =  threeDimToolbar.items.items;
		
		var gabWidth = Ext.getCmp('threeDim_center_container').getWidth();

		for(var i=0; i<toolbarItmes.length; i++){
			if(!toolbarItmes[i].hidden){
				gabWidth = gabWidth-threeDimToolbar.itemWidth;
			}
		}
		if(gabWidth <0){
			gabWidth = 0;
		}
		var gabCon = Ext.getCmp('threeDimgabToolbarContainer');
		gabCon.setWidth(gabWidth+40);
	},
    createWindow: function (config) {
        var me = this;

        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('threeDim-win');

        this.initCoord = config.coord;

        var cfg = Ext.applyIf(config || {}, {
            id: 'threeDim-win',
            title: '3D',
            width: 740,
            height: 480,
            iconCls: 'krf_icon',
            animCollapse: false,
            constrainHeader: true,
            layout: 'border',
            listeners: {
                move: function (theWin, xP, yP, theOp) {

                },
                resize: function (win, width, height) {

                    var mapC = Ext.getCmp('krf3diframe');
                    if (mapC) {
                        mapC.setWidth(width - 80);
                        mapC.setHeight(height - 37);
                    }
                    mapC = Ext.getCmp('threedDim_cont_container');
                    mapC.setWidth(width - 80);
                    mapC.setHeight(height - 37);
                    mapC = Ext.getCmp('threeDim_center_container');
                    mapC.setWidth(width - 80);
                    mapC.setHeight(height - 37);
                    if (me.once) {
                        return;
                    }
                    me.sendMessage({ type: 'resize', width: width, height: height });

                    $KRF_APP.fireEvent($KRF_EVENT.THREE_DIM_RESIZE_TOOL_ITEMS);
                },
                render: function () {
                    var contContainer = Ext.getCmp("threedDim_cont_container");

                    var threeDimToolbar = Ext.create('krf_new.view.center.ThreeDimToolbar', {
                        id: 'threeDimToolbar',
                        cls: 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target',
                        style: 'z-index: 30000; position: absolute; padding: 0px 0 0px 0px !important;'
                    });
                    contContainer.add(threeDimToolbar);
                },
                afterrender: function () {
                },
                show: function () {
                    if (me.once) {
                        $('#krf3diframe').prop('src', 'http://192.168.0.231:8081/KRF3D.html');
                        var centerContainer = Ext.getCmp("threeDim_center_container");
                        var threeDimSearchWindow = Ext.create('krf_new.view.search.threeDim.ThreeDimSearchWindow', { y: 61 });
                        centerContainer.add(threeDimSearchWindow);

                        threeDimSearchWindow.show();

                        $KRF_APP.fireEvent($KRF_EVENT.THREE_DIM_RESIZE_TOOL_ITEMS);
                        me.once = false;
                    } else {
                        $KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, ({ type: 'move', coord: me.initCoord }));
                    }
                },
                beforeclose: function () {
                    me.once = true;
                }
            },
            items:
                [{ xtype: 'threeDim-west-buttonpanel', region: 'west', collapsible: false },
                {
                    xtype: 'container',
                    id: 'threedDim_cont_container',
                    layout: {
                        type: 'absolute'
                    },
                    region: 'center',
                    height: '100%',
                    items: [{ xtype: 'app-threeDim-center', id: 'threeDim_center_container', x: 0, y: 0 }]
                }
                ]
        });
        if (!win) {
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});


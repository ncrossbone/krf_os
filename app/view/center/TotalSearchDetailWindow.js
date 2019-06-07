Ext.define('krf_new.view.center.TotalSearchDetailWindow', {
    extend: 'Ext.window.Window',

    xtype: 'center-totalSearchDetailWindow',

    id: 'totalSearchDetailWindow',

    title: '이력정보 검색',

    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',

    //width: 800,
    //height: 600,
    width: 1700,
    height: 700,

    x: 0,
    y: 770,

    closable: true,
    constrain: true,
    minimizable: true,
    maximizable: true,
    onEsc: false,

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'treepanel',
        id: 'totalSearchTree',
        rootVisible: false,
        columns: [
            {
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: '지점',
            width: 220,
            sortable: true,
            dataIndex: 'text',
            locked: true,
            renderer: function (val, dom, d) {

                detailSearchTreeColor(dom, d);

                return val;
            },
            listeners: {
                click: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
                    if (node.record.data.leaf == true) {
                        if (node.record.data.id != undefined) {
                            // 집수구역, 지점 이동, 리치정보 하이라이트
                            var me = this.up("window");

                            me.moveCommon(record);
                        }
                    }
                }
            }
        }
        ,{
            text: '일자',
            width: 95,
            align: 'center',
            dataIndex: 'DE',
            renderer: function (val, dom, d) {
				var retVal = "";
				if (val != undefined && val != 'undefined'){
                    retVal = val;
                }    

                
                detailSearchTreeColor(dom, d);
                

				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '회차',
            width: 95,
            align: 'center',
            dataIndex: '',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '수심(m)',
            width: 95,
            align: 'center',
            dataIndex: 'MESURE_DP',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined'){
                    retVal = val;
                }
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '수온(℃)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1060',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: 'DO(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1054',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: 'pH',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1039',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '전기전도도(µS/㎝)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1050',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: 'BOD(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1052',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: 'COD(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1049',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: 'ss(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1053',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: 'TN(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1055',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: 'TP(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1056',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: 'TOC(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1073',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '질산성질소(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1013',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '암모니아성 질소(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1012',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '용존총질소(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1066',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '용존총인(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1067',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '인산염인(㎎/L)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1065',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '지수',
            width: 95,
            align: 'center',
            dataIndex: 'IDEX',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '건강성등급',
            width: 95,
            align: 'center',
            dataIndex: 'GRAD',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '완전연소가능량(%)',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1160',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '오염단계',
            width: 95,
            align: 'center',
            dataIndex: 'IEM_1155',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '총유입량(㎥/일)',
            width: 95,
            align: 'center',
            dataIndex: 'TOT_INFLOW_QY',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '총 방류량(㎥/일)',
            width: 95,
            align: 'center',
            dataIndex: 'TOT_DWEQTY',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '수위(cm)',
            width: 95,
            align: 'center',
            dataIndex: 'WLV',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '강수량(mm)',
            width: 95,
            align: 'center',
            dataIndex: 'RAINFL',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '유량(㎥/sec)',
            width: 95,
            align: 'center',
            dataIndex: 'FLUX',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        },{
            text: '평균유속(m/s)',
            width: 95,
            align: 'center',
            dataIndex: 'AVRG_SPFLD',
            renderer: function (val, dom, d) {
                detailSearchTreeColor(dom, d);
				var retVal = "";
				if (val != undefined && val != 'undefined')
					retVal = val;
				return retVal;
			},
            handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
            },
            // Only leaf level tasks may be edited
            isDisabled: function (view, rowIdx, colIdx, item, record) {

            }
        }]
    }],
    listeners: {
        // 'minimize': function (window, opts) {
        //     if (!window.collapsed) {
        //         window.collapse();
        //     } else {
        //         window.expand();
        //     }

        // }
    },
    initComponent: function () {
        this.callParent();
    }
});
Ext.define('krf_new.view.east.TestTreeWindow', {
	extend: 'Ext.window.Window',

	xtype: 'east-testtreewindow',
	id: 'testTreeWindow',
	title: '지점 목록',
 
	//	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',

	layout: {
		type: 'fit'
	},
	width: 520,
	height: 305,

	preX: null,
	preY: null,
	preWidth: null,
	preHeight: null,

	closable: true,
	constrain: true,
	minimizable: true,
	onEsc: false,
	header: { cls: 'subWindow-x-form-item-label-default' },
	cls: 'subWindow-x-form-item-label-default',

	items: [{
		xtype: 'treepanel',
		id: 'testListTree',
		rootVisible: false,
		//cls: 'khLee-x-grid-cell',
		columns: [{
			xtype: 'treecolumn', //this is so we know which column will show the tree
			text: '지점',
			width: 220,
			sortable: true,
			dataIndex: 'text',
			locked: true,
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
		}, {
			text: '년도',
			width: 60,
			dataIndex:'catDId',
			align: 'center'
		}, {
			text: '월',
			width: 60,
			menuDisabled: true,
			xtype: 'actioncolumn',
			align: 'center',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
			},
			// Only leaf level tasks may be edited
			isDisabled: function (view, rowIdx, colIdx, item, record) {

			}
		}, {
			text: '회차',
			width: 60,
			menuDisabled: true,
			xtype: 'actioncolumn',
			align: 'center',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
			},
			// Only leaf level tasks may be edited
			isDisabled: function (view, rowIdx, colIdx, item, record) {

			}
		}, {
			text: '주소',
			width: 60,
			menuDisabled: true,
			xtype: 'actioncolumn',
			align: 'center',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
			},
			// Only leaf level tasks may be edited
			isDisabled: function (view, rowIdx, colIdx, item, record) {

			}
		}, {
			text: '수심',
			width: 60,
			menuDisabled: true,
			xtype: 'actioncolumn',
			align: 'center',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
			},
			// Only leaf level tasks may be edited
			isDisabled: function (view, rowIdx, colIdx, item, record) {

			}
		}, {
			text: '',
			width: 60,
			menuDisabled: true,
			xtype: 'actioncolumn',
			align: 'center',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
			},
			// Only leaf level tasks may be edited
			isDisabled: function (view, rowIdx, colIdx, item, record) {

			}
		}]
	}],

	siteIds: '',
	parentIds: [],
	catIds: '',

	// 사이트 아이디 셋팅 (record : tree node, isInit : siteIds 변수 초기화 여부)
	setSiteIds: function (record, isInit) {

		var me = this;
		if (isInit == true) {
			me.parentIds = [];
			me.siteIds = "";
		}

		var childRecords = record.childNodes;

		if (childRecords != undefined && childRecords.length > 0) {
			for (var i = 0; i < childRecords.length; i++) {
				me.setSiteIds(childRecords[i], false);
			}
		} else {
			if (me.siteIds != "") {
				me.siteIds += ", ";
			}

			// E : 생물측정망의 경우 지점 id가 동일한것이 있기 때문에 어떤 검색인지 인자를 하나 더 붙임 ( 그리드아이디만들때 쓰임 , 아이디가 중복되면 그리드 오류발생)
			if (record.parentNode.data.id.substring(0, 1) == "E") {
				me.parentIds.push({ parentId: record.parentNode.data.id, siteId: record.data.eSiteId });
				me.siteIds += "'" + record.data.eSiteId + "'";
			} else {
				me.parentIds.push({ parentId: record.parentNode.data.id, siteId: record.data.id });
				me.siteIds += "'" + record.data.id + "'";
			}


		}
	},

	setCatIds: function (record, isInit) {
		var me = this;
		var childRecords = undefined;

		if (isInit == true) {
			me.catIds = "";
			var treeCtl = Ext.getCmp("siteListTree");
			var rootNode = treeCtl.store.root;
			childRecords = rootNode.childNodes;
		} else {
			childRecords = record.childNodes;
		}

		if (childRecords != undefined && childRecords.length > 0) {
			for (var i = 0; i < childRecords.length; i++) {
				me.setCatIds(childRecords[i], false);
			}
		} else {
			if (me.catIds != "") {
				me.catIds += ", ";
			}
			me.catIds += "'" + record.data.catDId + "'";
		}
	},

	listeners: {
		close: function () {
			var currCtl = Ext.getCmp("btnTestTreeWindow");
			if (currCtl.btnOnOff == "on") {
				SetBtnOnOff(currCtl.id);
			}
		},
		"minimize": function (window, opts) {
			if (!window.collapsed) {
				var centerContainer = Ext.getCmp('center_container');

				window.preX = window.getX();
				window.preY = window.getY();
				window.preWidth = window.getWidth();
				window.preHeight = window.getHeight();


				window.collapse();
				window.setWidth(150);
				window.alignTo(centerContainer, 'bl-bl');
			} else {
				window.setX(window.preX);
				window.setY(window.preY);
				window.setWidth(window.preWidth);
				window.setHeight(window.preHeight);

				window.expand();
			}

		}
	},
	//    tools: [{
	//        type: 'restore',
	//        handler: function (evt, toolEl, owner, tool) {
	//            var window = owner.up('window');
	//            window.setWidth(300);
	//            window.expand('', false);
	//        }
	//    }],
	initComponent: function () {

		var me = this;
		this.on("beforeclose", function windSitreNChartClose() {
			var windowSiteNChart = Ext.getCmp("windowSiteNChart");
			if (windowSiteNChart != undefined) {
				windowSiteNChart.hide();
			}

			//160704 pdj x = hide
			var currCtl = SetBtnOnOff("btnTestTreeWindow");
			me.hide();

			return false;
		});
		this.callParent();

	},

	moveCommon: function (record) {
		var me = this;
		// 집수구역 이동
		var nodeId = record.data.catDId;
		siteMovePoint("Cat", nodeId);

		// 지점이동
		if(record.data.parentId.substring(0,1) == "J"){
			nodeId = record.data.id.split("_")[1];	
		}else{
			nodeId = record.data.id;	
		}
		 
		var parentNodeId = record.data.parentId;
		siteMovePoint(parentNodeId, nodeId);

		// 리치정보 띄우기
		me.setCatIds(record, true);
		ShowSearchResultReach(me.catIds);
		//alert(record.data.catDId);
		Ext.defer(function () {
			ReachSelectedFocus(record.data.catDId);
		}, 1000, this);
	}
});
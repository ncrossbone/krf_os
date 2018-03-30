Ext.define('krf_new.view.east.SiteListWindow', {
	extend: 'Ext.window.Window',

	xtype: 'east-sitelistindow',
	id: 'siteListWindow',
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
		id: 'siteListTree',
		rootVisible: false,
		cls: 'khLee-x-grid-cell',
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
			text: '정보',
			width: 60,
			menuDisabled: true,
			xtype: 'actioncolumn',
			tooltip: '지점정보',
			align: 'center',
			icon: './resources/images/button/icon_branch.gif',
			iconCls: ' khLee-x-default-btn', // 앞에 한칸 띄워야 함!!
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
				var test = record.data.text;
				var chkText = record.id;
				var parentId = record.data.parentId;

				ShowWindowSiteNChart(1, chkText, test, parentId, record.data.chartBtnDisabled);
				// 집수구역, 지점 이동, 리치정보 하이라이트
				var me = this.up("window");
				me.moveCommon(record);
			},
			// Only leaf level tasks may be edited
			isDisabled: function (view, rowIdx, colIdx, item, record) {
				if (record.data.infoBtnDisabled != undefined) {
					return record.data.infoBtnDisabled;
				} else {
					return !record.data.leaf;
				}
			}
		}, {
			text: '차트',
			width: 60,
			menuDisabled: true,
			tooltip: '차트정보',
			xtype: 'actioncolumn',
			align: 'center',
			icon: './resources/images/button/icon_chart.gif',
			iconCls: ' khLee-x-default-btn',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
				var test = record.data.text;
				var chkText = record.id;
				var parentId = record.data.parentId;

				ShowWindowSiteNChart(0, chkText, test, parentId);

				var clickText = record.raw.text;
				var clickId = record.raw.id;
				var clickData = clickText.split('(');
				var clickParentId = record.raw.parentId;

				setActionInfo(clickParentId[0], clickParentId, clickData[0], clickId, "차트검색");

				// 집수구역, 지점 이동, 리치정보 하이라이트
				var me = this.up("window");
				me.moveCommon(record);
			},
			isDisabled: function (view, rowIdx, colIdx, item, record) {

				if (record.data.chartBtnDisabled != undefined) {

					return record.data.chartBtnDisabled;
				}
				else {
					return !record.data.leaf;
				}
			}
		}, {
        	xtype: 'actioncolumn',
            text: '리포트',
            width: 60,
            menuDisabled: true,
            tooltip: '리포트',
            align: 'center',
            dataIndex: 'id',
            icon: "./resources/images/button/icon_report.gif",
            iconCls: ' khLee-x-default-btn',
            isDisabled: function(view, rowIdx, colIdx, item, record) {
            	
            	if(record.data.id == "A"){
            		return false;
            	}
            	else{
            		return true;
            	}
            },
            handler: function(grid, rowIndex, colIndex, actionItem, node, record, row) {
            	
            	var me = this.up("window");
            	
            	var childRecord = record.childNodes;
        		
        		for(var i = 0; i < childRecord.length; i++){
        			
        			var isInit = true;
        			if(i != 0){
        				isInit = false;
        			}
        			me.setSiteIds(childRecord[i], isInit);
        		}
            	
            	var coreMap = GetCoreMap();
				var center = coreMap.map.extent.getCenter();
				var level = coreMap.map.getLevel();
				var width = coreMap.getWidth();
				var height = coreMap.getHeight();
				//console.info(width);
				//console.info(height);
				//console.info(coreMap.map.extent.getCenter());
				//console.info(coreMap.map.getLevel());
				
				var rptwindow = Ext.getCmp("rptinitwindow");
								
				if(rptwindow==undefined){
					var rpt = Ext.create("krf_new.view.center.RptInitWindow");
					rpt.show(); 
				}
				
				//var url = "./report/rptExtView.html?l=" + level + "&x=" + center.x + "&y=" + center.y +
				//"&w=" + width + "&h=" + height;
				//window.open(url, "리포트 설정", //"width=1350,height=900,menubar=no,status=no,toolbar=no,location=no,resizable=no,fullscreen=no,scrollbars=no");
				
				/*width : 팝업창 가로길이
				height : 팝업창 세로길이
				toolbar=no : 단축도구창(툴바) 표시안함
				menubar=no : 메뉴창(메뉴바) 표시안함
				location=no : 주소창 표시안함
				scrollbars=no : 스크롤바 표시안함
				status=no : 아래 상태바창 표시안함
				resizable=no : 창변형 하지않음
				fullscreen=no : 전체화면 하지않음
				channelmode=yes : F11 키 기능이랑 같음
				left=0 : 왼쪽에 창을 고정(ex. left=30 이런식으로 조절)
				top=0 : 위쪽에 창을 고정(ex. top=100 이런식으로 조절)*/
            }
        }, {
			text: '검색',
			width: 50,
			xtype: 'actioncolumn',
			tooltip: '검색결과',
			align: 'center',
			icon: './resources/images/button/icon_seah.gif',
			iconCls: ' khLee-x-serch-btn', // 앞에 한칸 띄워야 함!!
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
				//Ext.ShowSearchResult("grid-tab-2", "하천수");
				$KRF_APP.btnFlag = "noDate";
				var treeCtl = Ext.getCmp("siteListTree");
				var siteIds = "";
				var parentId = "";
				//var gridId = "grid_" + record.data.id;
				// 집수구역, 지점 이동, 리치정보 하이라이트
				var me = this.up("window");
				me.moveCommon(record);
				//PollLoadSearchResult
				if (record.id.length == 1) {

					var childRecord = record.childNodes;

					for (var i = 0; i < childRecord.length; i++) {
						var gridId = "grid_" + childRecord[i].data.id;
						me.setSiteIds(childRecord[i], true);
					

						// 버튼 On/Off
						currCtl = Ext.getCmp("btnSearchResult");
						if (currCtl.btnOnOff == "off") {
							SetBtnOnOff("btnSearchResult");
						}

						var pNm = me.parentIds[0].parentId;

						pNm = pNm.substring(0, 1);

						// 검색결과창 띄우기
						ShowSearchResult(me.siteIds, me.parentIds, childRecord[i].data.text, gridId, "");

						//}
					}
				} else {
					
					var gridId = null;
					if(record.data.eSiteId != undefined){
						gridId = "grid_" + record.data.eSiteId;
					}else{
						gridId = "grid_" + record.data.id;
					}
					me.setSiteIds(record, true);
					//if(ChkSearchCondition("지점코드찾기", siteIds, parentId, record.data.text, gridId)){
					// 버튼 On/Off
					currCtl = Ext.getCmp("btnSearchResult");
					if (currCtl.btnOnOff == "off") {
						SetBtnOnOff("btnSearchResult");
					}

					var pNm = me.parentIds[0].parentId;

					pNm = pNm.substring(0, 1);
					// 검색결과창 띄우기
					
					ShowSearchResult(me.siteIds, me.parentIds, record.data.text, gridId, "");

					var coreMap = GetCoreMap();
					var year = "2013";
					//검색결과 "검색"시 부하량 표출
					if (record.id == "pollLoad") {
						PollLoadSearchResult("");
					} else if (record.id == "pollution_01"
						|| record.id == "pollution_02"
						|| record.id == "pollution_03"
						|| record.id == "pollution_04"
						|| record.id == "pollution_05"
						|| record.id == "pollution_06"
						|| record.id == "pollution_07") {

						PollutionSearchResult("", record.id, record.data.title, record.data.storeNm, year);
					} else if (record.id == "pollution") {

						for (var i = 0; i < record.childNodes.length; i++) {
							PollutionSearchResult("", record.childNodes[i].data.id
								, record.childNodes[i].data.title
								, record.childNodes[i].data.storeNm, year);
						}
					}
				}

				//session DATA
				if (record.id == "pollution_01"
					|| record.id == "pollution_02"
					|| record.id == "pollution_03"
					|| record.id == "pollution_04"
					|| record.id == "pollution_05"
					|| record.id == "pollution_06"
					|| record.id == "pollution_07") {

					var clickId = record.raw.id;
					var clickParentId = record.raw.parentId;

					setActionInfo(clickParentId, "오염원", clickId, "", "검색결과");
				} else {
					var clickText = record.raw.text;
					var clickId = record.raw.id;
					var clickData = clickText.split('(');
					var clickParentId = record.raw.parentId;

					setActionInfo(clickParentId[0], clickParentId, clickData[0], clickId, "검색결과");
				}
			},
			isDisabled: function (view, rowIdx, colIdx, item, record) {

				if (record.data.srchBtnDisabled != undefined) {
					return record.data.srchBtnDisabled;
				}
			}
		}, {
			text: '관련리치',
			width: 105,
			//xtype: 'templatecolumn',
			tooltip: '관련리치',
			dataIndex: 'catDId',
			renderer: function (val) {
				var retVal = "";
				if (val != undefined)
					retVal = val;
				return '<a href="#">' + retVal + '</a>';
			},
			align: 'center',/*
            hidden: true*/
			listeners: {
				click: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
					if (record.data.leaf == true) {
						if (record.data.id != undefined) {

							currCtl = Ext.getCmp("btnSearchResult");
							if (currCtl.btnOnOff == "off") {
								SetBtnOnOff("btnSearchResult");
							}
							// 집수구역, 지점 이동, 리치정보 하이라이트
							var me = this.up("window");
							me.moveCommon(record);
						}
					}
				}
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
			if(record.parentNode.data.id.substring(0,1) == "E"){ 
				me.parentIds.push({ parentId: record.parentNode.data.id, siteId: record.data.eSiteId });
				me.siteIds += "'" + record.data.eSiteId + "'";
			}else{
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
			var currCtl = Ext.getCmp("btnSiteListWindow");
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
			var currCtl = SetBtnOnOff("btnSiteListWindow");
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
		nodeId = record.data.id;
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
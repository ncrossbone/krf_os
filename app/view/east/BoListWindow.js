Ext.define('krf_new.view.east.BoListWindow', {
	extend: 'Ext.window.Window',

	xtype: 'east-bolistindow',
	id: 'boListWindow',
	title: '보 지점 목록',

	//	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',

	layout: {
		type: 'fit'
	},
	width: 650,
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
		id: 'boListTree',
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

				
				
				//새로 차트 생성할때 , 다른 parent일때 
				if(parentId.substring(0,1) != $KRF_APP.highChart.saveParentId){
					// high차트 전여변수 초기화
					$KRF_APP.global.CommFn.resetHighChart();

					//parent node text 저장
					$KRF_APP.highChart.parentName = record.parentNode.data.text;

					//전역변수에 저장 ( 지점명 )
					$KRF_APP.highChart.ulNameArr.push(test);

					ShowWindowSiteNHighChart(0, chkText, test, parentId, undefined); // 기존 차트 store 변형으로 초기 데이터 및 전역변수 설정
				}else{

					var insertChart = true;
					if($KRF_APP.highChart.ulIdArr.length < 5){ // 차트 갯수 확인
						// 지점id가 지점 전역변수에 있는지 없는지(중복체크) 확인
						for(var a = 0 ; a < $KRF_APP.highChart.ulIdArr.length; a++){
							if($KRF_APP.highChart.ulIdArr[a] == chkText){
								insertChart = false;
							}
						}
						
						// 전역변수에 같은 지점이 없을시 chart add
						if(insertChart){
							$KRF_APP.highChart.ulNameArr.push(test); //전역변수에 저장 ( 지점명 )
							$KRF_APP.highChart.ulIdArr.push(chkText); //전역변수에 저장 ( 지점 id )
							$KRF_APP.highChart.removeLabel = false; // 같은 parent에 추가 검색
							$KRF_APP.global.CommFn.getHighChartData(); // ajax chart data 검색
						}
					}else{
						alert("차트는 최대 5개까지 추가하실수 있습니다.");
					}
					
					
				}

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
			text: '그래프',
			width: 60,
			menuDisabled: true,
			tooltip: '그래프 정보',
			xtype: 'actioncolumn',
			align: 'center',
			icon: './resources/images/button/icon_chart.gif',
			iconCls: ' khLee-x-default-btn',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
				var test = record.data.text;
				var chkText = record.id;
				var parentId = record.data.parentId;

				//parent node text 저장
				$KRF_APP.highChart.parentName = record.parentNode.data.text;
				//새로 차트 생성할때 , 다른 parent일때 
				if(parentId.substring(0,1) != $KRF_APP.highChart.saveParentId){
					// high차트 전여변수 초기화
					$KRF_APP.global.CommFn.resetHighChart();

					//parent node text 저장
					$KRF_APP.highChart.parentName = record.parentNode.data.text;
					
					//전역변수에 저장 ( 지점명 )
					$KRF_APP.highChart.ulNameArr.push(test);
					ShowWindowSiteNHighChart(0, chkText, test, parentId, undefined); // 기존 차트 store 변형으로 초기 데이터 및 전역변수 설정
				}else{

					var insertChart = true;
					if($KRF_APP.highChart.ulIdArr.length < 5){ // 차트 갯수 확인
						// 지점id가 지점 전역변수에 있는지 없는지(중복체크) 확인
						for(var a = 0 ; a < $KRF_APP.highChart.ulIdArr.length; a++){
							if($KRF_APP.highChart.ulIdArr[a] == chkText){
								insertChart = false;
							}
						}
						
						// 전역변수에 같은 지점이 없을시 chart add
						if(insertChart){
							$KRF_APP.highChart.ulNameArr.push(test); //전역변수에 저장 ( 지점명 )
							$KRF_APP.highChart.ulIdArr.push(chkText); //전역변수에 저장 ( 지점 id )
							$KRF_APP.highChart.removeLabel = false; // 같은 parent에 추가 검색
							$KRF_APP.global.CommFn.getHighChartData(); // ajax chart data 검색
						}
					}else{
						alert("차트는 최대 5개까지 추가하실수 있습니다.");
					}
					
					
				}
				

				var clickText = record.raw.text;
				var clickId = record.raw.id;
				var clickData = clickText.split('(');
				var clickParentId = record.raw.parentId;

				setActionInfo(clickParentId[0], clickParentId, clickData[0], clickId, "하이차트검색");

				// 집수구역, 지점 이동, 리치정보 하이라이트
				var me = this.up("window");
				me.moveCommon(record);
			},
			isDisabled: function (view, rowIdx, colIdx, item, record) {

				if (record.data.chartBtnDisabled != undefined) {
					return record.data.chartBtnDisabled;
				}
			}
		}, {
			xtype: 'actioncolumn',
			text: '보고서',
			width: 60,
			menuDisabled: true,
			tooltip: '보고서',
			align: 'center',
			dataIndex: 'id',
			icon: "./resources/images/button/icon_report.gif",
			iconCls: ' khLee-x-default-btn',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {

				var boCode = record.id;
				var boName = record.data.text;

				if(boName && boCode){
					boName = record.data.text.split('(')[0];
					boCode = record.id.split('BO_')[1];
					ShowFileSearchResult(boCode,boName);
				}
				
			},
			isDisabled: function (view, rowIdx, colIdx, item, record) {

				if (record.data.rptBtnDisabled != undefined) {
					return record.data.rptBtnDisabled;
				}
			}
		}, {
			xtype: 'actioncolumn',
			text: '경관',
			width: 60,
			menuDisabled: true,
			tooltip: '경관',
			align: 'center',
			dataIndex: 'id',
			icon: "./resources/images/button/icon_report.gif",
			iconCls: ' khLee-x-default-btn',
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
				
				var boCode = record.id;
				var boName = record.data.text;

				if(boName && boCode){
					boName = record.data.text.split('(')[0];
					boCode = record.id.split('BO_')[1];
					ShowFileSearchResult(boCode,boName);
				}
				
			},
			isDisabled: function (view, rowIdx, colIdx, item, record) {

				if (record.data.scensBtnDisabled != undefined) {
					return record.data.scensBtnDisabled;
				}
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
				var treeCtl = Ext.getCmp("boListTree");
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
					if (record.data.eSiteId != undefined) {
						gridId = "grid_" + record.data.eSiteId;
					} else {
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
			var treeCtl = Ext.getCmp("boListTree");
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
			var currCtl = Ext.getCmp("btnboListWindow");
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

	initComponent: function () {

		var me = this;
		this.on("beforeclose", function windSitreNChartClose() {
			var windowSiteNChart = Ext.getCmp("windowSiteNChart");
			if (windowSiteNChart != undefined) {
				windowSiteNChart.hide();
			}

			//160704 pdj x = hide
			var currCtl = SetBtnOnOff("btnboListWindow");
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
/*!
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.MapWindow', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
    	'krf_new.view.center.Center',
    	'krf_new.view.search.ButtonPanel'
    ],

    subWindowIds:['popSiteInfo','reachNameToolbar','subMapWindow', 'siteListWindow', 'searchResultWindow'
    	,'chlLegend','phyLegend','droneToolbar','droneDetailExp','reachCountSToolbar','reachCountEToolbar'],
	id:'map-win',
	once: true,
	initCoord: null,

    init : function(){
        this.launcher = {
            text: 'KRF',
            iconCls:'icon-grid'
        };
        
        // 리치 툴바 on/off
        $KRF_APP.addListener($KRF_EVENT.SHOW_REACH_TOOLBAR, this.showReachToolbar, this);
        $KRF_APP.addListener($KRF_EVENT.HIDE_REACH_TOOLBAR, this.hideReachToolbar, this);
		
		$KRF_APP.addListener($KRF_EVENT.SHOW_MAP_TOOLBAR, this.showMapToolbar, this);
		

        // drone 툴바 on/off
        $KRF_APP.addListener($KRF_EVENT.SHOW_DRONE_TOOLBAR, this.showDroneToolbar, this);
        $KRF_APP.addListener($KRF_EVENT.HIDE_DRONE_TOOLBAR, this.hideDroneToolbar, this);
        
        // Map 툴팁 위치 조정
        $KRF_APP.addListener($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION, setTooltipXY, this);

        // 지점 목록 window
        $KRF_APP.addListener($KRF_EVENT.SHOW_SITE_LIST_WINDOW, this.showSiteListWindow, this);
        $KRF_APP.addListener($KRF_EVENT.HIDE_SITE_LIST_WINDOW, this.hideSiteListWindow, this);
        
        $KRF_APP.addListener($KRF_EVENT.WEST_TAB_CHANGE, this.westTabChange, this);
    },

    createWindow : function(config){
        var me = this;
        
    	var desktop = this.app.getDesktop();
        var win = desktop.getWindow('map-win');
        var cfg = Ext.applyIf(config || {}, {
            id: 'map-win',
            title:'KRF',
            width:840,
            height:680,
            iconCls: 'icon-grid',
            animCollapse:false,
            layout: 'border',
            constrain: true,
    		constrainHeader:false,
    		tools:[],
    		listeners: {
    		    move: function(theWin,xP,yP,theOp) {
    		    	$KRF_APP.fireEvent($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION);
    		    	me.setSubWindowLocation(xP, yP);
    		    },
    		    resize: function(win, width, height){
    		    	var mapC = Ext.getCmp('_mapDiv_');
            		mapC.setWidth(width-80);
            		mapC.setHeight(height-37);
            		mapC = Ext.getCmp('center_container');
            		mapC.setWidth(width-80);
            		mapC.setHeight(height-37);
            		mapC = Ext.getCmp('cont_container');
            		mapC.setWidth(width-80);
            		mapC.setHeight(height-37);
            		me.setSubWindowLocation();
    		    },
    		    render: function(){
    		    },
    		    afterrender: function(){
    		    },
    		    show: function(){
					if(me.once){
						$KRF_APP.coreMap.mapRendered();
						me.once = false;
					}else{
						if(me.initCoord){
							$KRF_APP.fireEvent($KRF_EVENT.CENTERAT, me.initCoord);
						}
					}
    		    },
    		    'beforeclose': function(){
					me.once = true;
    		    }
    		},
            items: [ {xtype:'west-buttonpanel', region:'west', collapsible:false},
            	     {xtype: 'container',
	            		id: 'cont_container',
	            		layout: {
	            			type: 'absolute'
	            		},
	            		region:'center',
	            		height: '100%',
	            		items: [{xtype:'app-default-center', id: 'center_container', x:0, y:0}]
	            	}]
        });
        
        if(!win){
            win = desktop.createWindow(cfg);
        }
        return win;
	},

    setSubWindowLocation :function(){
    	var rNameToolbar = Ext.getCmp("reachNameToolbar");
		var rToolbar = Ext.getCmp("reachToolbar");
		
		if(rToolbar != null && !rToolbar.hidden){
			var popCtl = Ext.getCmp("searchConfig");
			var popHeader = Ext.getCmp("searchConfigHeader");

			rNameToolbar.hide();
			Ext.defer(function(){
				rNameToolbar.setX(rToolbar.getX()+(100));
				rNameToolbar.setY(rToolbar.getY()+(73));
				rNameToolbar.show();
				
				if(popCtl != null && !popCtl.isHidden()){
					popCtl.setX(rToolbar.getX());
					popHeader.setX(rToolbar.getX());
					popCtl.setY(rToolbar.getY()+103);
					popHeader.setY(rToolbar.getY()+73);
				}
			}, 1);
		}
		
		var chlLegend = Ext.getCmp("chlLegend"); // 범례 이미지 컨트롤
		var phyLegend = Ext.getCmp("phyLegend"); // 범례 이미지 컨트롤
		
		var mapWin = $KRF_APP.getDesktopWindow('map-win');
		var mapWinX = mapWin.getX();
		var mapWinY = mapWin.getY();
		var mapWinWidth = mapWin.getWidth();
		var mapWinHeight = mapWin.getHeight();
		
		var legendX = (mapWinWidth+mapWinX)-244;
		var legendY = (mapWinHeight+mapWinY)-61;
		Ext.defer(function(){
			if(chlLegend != null && !chlLegend.isHidden()){
				chlLegend.show();
				chlLegend.setX(legendX);
				chlLegend.setY(legendY);
			}
			if(phyLegend != null && !phyLegend.isHidden()){
				phyLegend.show();
				phyLegend.setX(legendX);
				phyLegend.setY(legendY);
			}	
		}, 1);
	},
	showMapToolbar: function(){
		var rToolbar = Ext.getCmp("reachToolbar");
		var cContainer = Ext.getCmp("cont_container");
		
		if (rToolbar == undefined) {
			rToolbar = Ext.create('krf_new.view.center.ReachToolbar',{
								id : 'reachToolbar',
								cls : 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target',
								style:'z-index: 30000; position: absolute; padding: 0px 0 0px 0px !important;'
							});
			cContainer.add(rToolbar);
		}
		rToolbar.show();
	},
	
    showReachToolbar: function() {
    	var rNameToolbar = Ext.getCmp("reachNameToolbar");
		var rToolbar = Ext.getCmp("reachToolbar");
		var sConfig = Ext.getCmp("searchConfig");
		var cContainer = Ext.getCmp("cont_container");
		
		/*if (rToolbar == undefined) {
			rToolbar = Ext.create('krf_new.view.center.ReachToolbar',{
								id : 'reachToolbar',
								cls : 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target',
								style:'z-index: 30000; position: absolute; padding: 0px 0 0px 0px !important;'
							});
			cContainer.add(rToolbar);
		}
		rToolbar.show();
		*/

		if(rNameToolbar == undefined){
			rNameToolbar = Ext.create('krf_new.view.center.ReachNameToolbar', { });
			cContainer.add(rNameToolbar);
		}
		
		rNameToolbar.show();
		
		rNameToolbar.setX(rToolbar.getX()+(100));
		rNameToolbar.setY(rToolbar.getY()+(73));
		
		if(sConfig == undefined){
			sConfig = Ext.create("krf_new.view.center.SearchConfig");
			cContainer.add(sConfig);
		}
		for(var i=1; i<10; i++){
			Ext.getCmp('btnMenu0'+i).setVisible(true);
		}
	},
	hideReachToolbar: function() {
		var cContainer = Ext.getCmp("center_container");
		var rToolbar = Ext.getCmp("reachToolbar");
		var rNameToolbar = Ext.getCmp("reachNameToolbar");
		var sConfig = Ext.getCmp("searchConfig");
		var kConfig = Ext.getCmp("kradSchConf");
		
		var droneToolbar = Ext.getCmp("droneToolbar");
		
		if(droneToolbar.getY()==115){
			droneToolbar.setY(droneToolbar.getY() - 105);
		}
		
		for(var i=1; i<10; i++){
			Ext.getCmp('btnMenu0'+i).setVisible(false);
		}
		
//		cContainer.remove(rToolbar, false);
		// if(rToolbar != undefined && rToolbar != null){
		// 	rToolbar.hide();
		// }
		if(rNameToolbar != undefined && rNameToolbar != null)
			rNameToolbar.close();
		if(sConfig != undefined && sConfig != null)
			sConfig.close();
		if(kConfig != undefined && kConfig != null)
			kConfig.hide();
	},
	showDroneToolbar: function() {
		var droneToolbar = Ext.getCmp("droneToolbar");
		var droneDetailExp = Ext.getCmp("droneDetailExp");
		
		if(droneToolbar != null){
			droneToolbar.show();
		}
		if(droneDetailExp != null){
			rNamdroneDetailExpeToolbar.show();
		}
	},
	hideDroneToolbar: function() {
		var cContainer = Ext.getCmp("center_container");
		var rToolbar = Ext.getCmp("reachToolbar");
		var rNameToolbar = Ext.getCmp("reachNameToolbar");
		var sConfig = Ext.getCmp("searchConfig");
		var kConfig = Ext.getCmp("kradSchConf");
		
		var droneToolbar = Ext.getCmp("droneToolbar");
		if(droneToolbar.getY()==202){
			droneToolbar.setY(droneToolbar.getY() - 105);
		}
		
		cContainer.remove(rToolbar, false);
		if(rNameToolbar != undefined && rNameToolbar != null)
			rNameToolbar.close();
		if(sConfig != undefined && sConfig != null)
			sConfig.close();
		if(kConfig != undefined && kConfig != null)
			kConfig.hide();
			
	},
	searchNodeId: function(btn){
		
		var layerObj = Ext.getCmp("layer01");
		var nodeObj = "";
		var lyrId = "";
		
		switch (btn) {
		case "btnReachLayer": lyrId = "RCH_DID"; break;
		case "btnAreaLayer": lyrId = "CAT_DID"; break;
		case "btnFlowLayer": lyrId = "RCH_FLW"; break;
		default: break;
		}
		
		for(var i = 0; i<layerObj.store.data.items.length; i++){
			if(layerObj.store.data.items[i].data.siteIdCol==lyrId){
				nodeObj = layerObj.store.data.items[i];
			}
		}
		
		var isChecked = nodeObj.get('checked');
		
		nodeObj.set('checked', !isChecked);
		layerObj.fireEvent('checkchange',nodeObj, !isChecked);
		
		this.northLink(nodeObj);
		
	},
	northLink: function(node){
		if(node.data.siteIdCol!=undefined){
			if(node.data.siteIdCol=="RCH_DID"){
				SetBtnOnOff("btnReachLayer");
			}else if(node.data.siteIdCol=="CAT_DID"){
				SetBtnOnOff("btnAreaLayer");
			}else if(node.data.siteIdCol=="RCH_FLW"){
				SetBtnOnOff("btnFlowLayer");
			}
		}
	},
	release: function(){
		var me = this;
		
		for(var i=0; i<me.subWindowIds.length; i++){
			var targetWindow = Ext.getCmp(me.subWindowIds[i]);
			if(targetWindow != null){
				targetWindow.close();
			}
		}
	},
	// 지점 목록 창 띄우기
	showSiteListWindow: function(param) {
		if(param == null || param.searchText == null){
			return;
		}
		// 검샋시 다른 더튼값 초기화
		var cmbArea1 = Ext.getCmp("cmbArea1");
		var cmbArea2 = Ext.getCmp("cmbArea2");
		var cmbArea3 = Ext.getCmp("cmbArea3");
		var cmbWater1 = Ext.getCmp("cmbWater1");
		var cmbWater2 = Ext.getCmp("cmbWater2");
		var cmbWater3 = Ext.getCmp("cmbWater3");
		var txtSearch = Ext.getCmp("textSearchText");
		
		var textSearchText_Start = Ext.getCmp("textSearchText_Start");
		var textSearchText_End = Ext.getCmp("textSearchText_End");

		if (param.searchText == 'waterSearch') {// 수계검색시 행정구역 초기화
			cmbArea1.setValue("");
			cmbArea2.setValue("");
			cmbArea3.setValue("");
			txtSearch.setValue("");

			textSearchText_Start.setValue("");
			textSearchText_End.setValue("");
		} else if (param.searchText == 'admSearch') {// 행정구역검색시 수계
			// 초기화
			cmbWater1.setValue("");
			cmbWater2.setValue("");
			cmbWater3.setValue("");
			txtSearch.setValue("");
			textSearchText_Start.setValue("");
			textSearchText_End.setValue("");
		} else if (param.searchText == "nameSearch") {// 명칭찾기시 수계 행정구역
			// 초기화
			cmbArea1.setValue("");
			cmbArea2.setValue("");
			cmbArea3.setValue("");
			cmbWater1.setValue("");
			cmbWater2.setValue("");
			cmbWater3.setValue("");
			textSearchText_Start.setValue("");
			textSearchText_End.setValue("");
		} else if(param.searchText == "SEnameSearch"){
			cmbArea1.setValue("");
			cmbArea2.setValue("");
			cmbArea3.setValue("");
			cmbWater1.setValue("");
			cmbWater2.setValue("");
			cmbWater3.setValue("");
			txtSearch.setValue("");
		} else {
		}
		
//		var desktop = this.getDesktop();
//		
//		var siteListModule = this.getDesktopModule($KRF_WINS.KRF.SITE_LIST.id);
//		
//		var siteListWindow = siteListModule.createWindow({x:desktop.getWidth()-400,y:0, width:400});
//		siteListWindow = siteListWindow.show();
//		
//		this.modeWindows.krf.push(siteListWindow);
		
		var siteListWindow = Ext.getCmp("siteListWindow");
		if (siteListWindow == undefined){
			siteListWindow = Ext.create('krf_new.view.east.SiteListWindow',{x:Ext.getCmp('center_container').getWidth() - 520, y:0});
			Ext.getCmp('center_container').add(siteListWindow);
		}	
    	
    	siteListWindow.show();
    	
		var store = null;
		var treeCtl = Ext.getCmp("siteListTree");
		
		if(param.searchType == "krad"){
			store = Ext.create('krf_new.store.east.KradListWindow');
		} else{
			store = Ext.create('krf_new.store.east.SiteListWindow',{
				async:true
			});
		}
		
		if(param.searchText == "paramSearch"){
			store.paramType = searchType;
		}
		store.searchType = param.searchText;
		store.load();
		treeCtl.setStore(store);

		// 좌측 정보창 버튼 on
		SetBtnOnOff("btnSiteListWindow", "on");
	},
	hideSiteListWindow: function(currCtl) {
		var listWinCtl = Ext.getCmp("siteListWindow");
		if (listWinCtl != undefined){
			listWinCtl.close();
		}
		listWinCtl = Ext.getCmp("siteListWindow_reach");
		if (listWinCtl != undefined){
			listWinCtl.close();
		}
		// 좌측 정보창 버튼 off
		SetBtnOnOff("btnSiteListWindow", "off");
	},
	westTabChange: function(btnOnOff) {
		var tabIdx = 1;
		var titleNm = '위치검색';
		if(btnOnOff == 'on'){
			tabIdx = 0;
			titleNm = '주제도 선택';
		}
		
		var westContents = Ext.getCmp("westContents");
		westContents.setActiveItem(tabIdx);
		Ext.getCmp('search-win').setTitle(titleNm);
	}
});


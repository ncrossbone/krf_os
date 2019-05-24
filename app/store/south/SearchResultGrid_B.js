Ext.define('krf_new.store.south.SearchResultGrid_B', {
	extend: 'Ext.data.Store',
	fields: [
		'WS_NM',
        'AM_NM',
        'AS_NM',
        'PT_NO',
        'PT_NM',
        'WAST_NO',
        'FACT_KIND_NAME',
        'FACT_CAPACITY',
        'WMCYMD',
        {name: 'CURR_BOD', type: 'number'},
        'CHART_BOD',
        {name: 'CURR_COD', type: 'number'},
        'CHART_COD',
        
        {name: 'CURR_SS', type: 'number'},
        'CHART_SS',
        
        {name: 'CURR_TN', type: 'number'},
        'CHART_TN',
        
        {name: 'CURR_TP', type: 'number'},
        'CHART_TP',
        
        {name: 'CURR_PH', type: 'number'},
        'CHART_PH',
        
        {name: 'CURR_FLW', type: 'number'},
        'CHART_FLW',
        
        {name: 'CURR_TOC', type: 'number'},
        'CHART_TOC',
        
        'DO_NM',
        'CTY_NM',
        'DONG_NM',
        'RI_NM'
	],
	siteId: '',
	autoLoad: true,
	buffered: true,
	pageSize: 100,
	remoteSort: true,
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	isFirst: true,
	listeners: {
		load: function (store) {
			
			
			var me = this;
			
			var firstSearch =  $KRF_APP.btnFlag;
			
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			
			var jsonData = "";
			var arrData = [];
			
			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			
			// 로딩중 메세지
			if(me.gridCtl != null){
				
				me.gridCtl.removeCls("dj-mask-noneimg");
				me.gridCtl.addCls("dj-mask-withimg");
				me.gridCtl.mask("loading", "loading...");
			}
			
			if(firstSearch == "noDate"){
				
				Ext.Ajax.request({
					//url: _API.GetSearchResultData_B, //'./resources/jsp/GetSearchResultData_B.jsp',
					url: 'http://localhost/krf/searchResult/searchResult_B2018', //'./resources/jsp/GetSearchResultData_B.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
	        		async: false, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			//console.info("dlfja");
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	
	        			if(jsonData.data.length > 0){
	        				
		        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
		        				
		        				
		        				var dateSplit = jsonData.data[0].WMCYMD;
		        				if(dateSplit == null){
		        					me.gridCtl.addCls("dj-mask-noneimg");
		        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
		        					return;
		        				}
		        				
		        				var afterVal = [];
	        					afterVal.push(dateSplit.substring(0,4));
	        					afterVal.push(dateSplit.substring(4,6));
		        				
                                var dtS = new Date(dateSplit.substring(0, 4), dateSplit.substring(4, 6));
                                    dtS.setMonth(dtS.getMonth() - 1);

								startYear = dtS.toISOString().substring(0, 4);
								startMonth = dtS.toISOString().substring(5, 7);
	
		        				endYear = afterVal[0];
		        				endMonth = afterVal[1];
		        				
		        			}
	        			}
	        		}
	        			
	        	});
			
				
			firstSearch = "date";
			Ext.getCmp("cmbStartYear").setValue(startYear); 
			Ext.getCmp("cmbStartMonth").setValue(startMonth);
			Ext.getCmp("cmbEndYear").setValue(endYear);
			Ext.getCmp("cmbEndMonth").setValue(endMonth);
			
			
			}
		
			
			Ext.Ajax.request({
				//url: _API.GetSearchResultData_B, //'./resources/jsp/GetSearchResultData_B.jsp',
				url: 'http://localhost/krf/searchResult/searchResult_B2018', //'./resources/jsp/GetSearchResultData_B.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			//console.info("dlfja");
        			store.startYear = startYear;
        			store.startMonth = startMonth;
        			store.endYear = endYear;
        			store.endMonth = endMonth;
        			jsonData = Ext.util.JSON.decode( response.responseText );

        			if(jsonData.data.length > 0){
        				
	        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
	        				
	        				store.setData(jsonData.data);
		        			
	        				// 로딩바 숨김
	        				if(me.gridCtl != null){
	        					
	        					me.gridCtl.unmask();
	        				}
	        			}
	        			else{
	        				
	        				if(me.gridCtl != null){
	        					
	        					me.gridCtl.addCls("dj-mask-noneimg");
	        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
	        				}
	        			}
        			}
        			else{
        				
        				if(me.gridCtl != null){
        					
        					me.gridCtl.addCls("dj-mask-noneimg");
        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
        				}
        			}
        		},
        		failure: function(form, action) {
        			
        			if(me.gridCtl != null){
    					
    					me.gridCtl.addCls("dj-mask-noneimg");
    					me.gridCtl.mask("오류가 발생하였습니다.");
    				}
        		}
        	});
		}
	},
	addZero: function (n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
});
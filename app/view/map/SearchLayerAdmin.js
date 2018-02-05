Ext.define('krf_new.view.map.SearchLayerAdmin', {
	map:null, 
	toolbar:null,
	selectLayerInfo:{},
	geometry:null,
	sourceGraphicLayer:null,
	targetGraphicLayer:null,
	highlightGraphicLayer:null,
	layer1Url: null,
	area1Arr:[],
	timerId:null,
	spSearchBool:true,
	layers:[],
	smpLineSymbol:null,
	simpleFillSymbol:null,
	geometryService:null,
	buffRadus:null,
	
	layerDisplayFiledInfo:{},
	layerBranchFiledInfo:{},
	layerChartFiledInfo:{},
	
	constructor: function(map, geometryService) {
		var me = this;
		me.map = map;
		me.geometryService = geometryService;
		
		me.layer1Url = $KRF_DEFINE.reachServiceUrl_v3; // 레이어 URL
		
		me.smpLineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0,0,255,0.8]), 2);
		me.simpleFillSymbol= new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, me.smpLineSymbol, new dojo.Color([0,0,255,0.1]));
		
		me.sourceGraphicLayer = new esri.layers.GraphicsLayer();
		me.sourceGraphicLayer.id="sourceGraphic";
		me.map.addLayer(me.sourceGraphicLayer);
		dojo.connect(me.sourceGraphicLayer, "onClick", function(event){
        	if(event.graphic.img && event.graphic.img =='btn_close' && event.graphic.geometry.uuid){
        		me.sourceGraphicLayer.clear();
        		me.spSearch();
        	}
		});
		
		me.targetGraphicLayer = new esri.layers.GraphicsLayer();
		me.targetGraphicLayer.id="targetGraphic";
		me.map.addLayer(me.targetGraphicLayer);
		dojo.connect(me.targetGraphicLayer, "onClick", function(event){
			var attributes = event.graphic.attributes;
			var properties = [];
			for(var mem in attributes){
				properties.push({id:mem, name:mem, value:attributes[mem]});
			}
		});
		
		me.highlightGraphicLayer = new esri.layers.GraphicsLayer();
		me.highlightGraphicLayer.id="highlightGraphic";
		me.map.addLayer(me.highlightGraphicLayer);
		
		me.getLayerDisplayFiledInfo();
		me.getLayerBranchFiledInfo();
		me.getLayerChartFiledInfo();
		
		$KRF_APP.addListener($KRF_EVENT.AREA_SELECT, me.areaSelectHandler, me); 
    },
    searchBtnClickfHandler:function(btnInfo){
    	var me = this;
    	me.sourceGraphicLayer.clear();
		me.targetGraphicLayer.clear();
		me.highlightGraphicLayer.clear();
    	if(btnInfo.state){
    		me.toolbar.activate(esri.toolbars.Draw[btnInfo.drawType]);
    		me.map.setMapCursor("default");
    		me.map.isPan = false;
    		if(btnInfo.radus){
    			me.buffRadus = btnInfo.radus;
    		}
    	}else{
    		me.toolbar.deactivate();
    		me.map.isPan = true;
    	}
    },
    
    searchLayerOnOfffHandler:function(selectInfo){
    	var me = this;
    	me.layers = [];
    	if(selectInfo.length==0){
    		me.targetGraphicLayer.clear();
    		me.highlightGraphicLayer.clear();
    		return;
    	}
    	Ext.each(selectInfo, function(selectObj, index) {
    		if(selectObj.data.layerId && !isNaN(selectObj.data.layerId)){
    			me.layers.push(selectObj);
    		}
    		if(selectInfo.length==index+1){
    			me.spSearch();
    		}
		});
    },
    
    leftTabChangeHandler: function(tabXtype){
    	var me = this;
    	if(tabXtype=='app-west-tab2'){
    		me.sourceGraphicLayer.setVisibility(true);
    		me.targetGraphicLayer.setVisibility(true);
    		me.highlightGraphicLayer.setVisibility(true);
    	}else{
    		me.sourceGraphicLayer.setVisibility(false);
    		me.targetGraphicLayer.setVisibility(false);
    		me.highlightGraphicLayer.setVisibility(false);
    	}
    },
    
    showCnt: 0,
    tmrObj: null,
    
    areaSelectHandler: function(info){
    	var me = this;
    	me.sourceGraphicLayer.clear();
		me.targetGraphicLayer.clear();
		me.highlightGraphicLayer.clear();
		var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/" + info.layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		
		var idField = "";
		var idValue = "";
		
		// 행정구역 검색은 info.admCd로 검색
		if(info.idField == undefined || info.idField == ""){
			idField = "ADM_CD";
		}
		else{
			idField = info.idField;
		}
		
		if(info.idValue == undefined || info.idValue == ""){
			if(info.admCd != undefined && info.admCd != "")
				idValue = info.admCd;
		}
		else{
			idValue = info.idValue;
		}
		
		query.where = idField + " = '" + idValue + "'";
		
		query.outFields = ["*"];
		queryTask.execute(query,  function(results){
			Ext.each(results.features, function(obj, index) {
				obj.setSymbol(me.simpleFillSymbol);
	    		me.sourceGraphicLayer.add(obj);
	    		var extent = esri.geometry.Polygon(obj.geometry).getExtent();
	    		
	    		me.showCnt = 0; // 타이머 카운트 초기화
	    		if(me.tmrObj != null){
	    			// 타이머 중지
	    			clearInterval(me.tmrObj);
	    		}
	    		
	    		//setExtentWithOffset(extent, me);
	    		me.map.setExtent(extent, true);
	    		// 센터 이동
				//centerAtWithOffset(extent.getCenter().x, extent.getCenter().y, extent.spatialReference);
				
	    		me.geometry = obj.geometry;
	    		me.spSearch();
	    		
	    		// 타이머 돌리기 1초
	    		me.tmrObj = setInterval(chkCnt = function(){
	    			
	    			me.showCnt += 1;
	    			// 5초 뒤 그래픽 삭제
	    			if(me.showCnt > 5){
	    				me.sourceGraphicLayer.clear();
	    				me.targetGraphicLayer.clear();
	    				me.highlightGraphicLayer.clear();
	    				// 타이머 중지
	    				clearInterval(me.tmrObj);
	    			}
	    		}, 1000);
			});
		});
		
		dojo.connect(queryTask, "onError", function(err) {
			//console.info(err);
			alert("오류가 발생하였습니다.")
		});
    },
    
    getLayerDisplayFiledInfo:function(callback, scope){
		var me = this;
		var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/17");
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		query.where = "1=1";
		query.outFields = ["*"];
		//KRF_DEV.loading.execute();
		queryTask.execute(query,  function(results){
			var attr = results.features;
			Ext.each(results.features, function(obj, index) {
				var attr = obj.attributes
				if(!me.layerDisplayFiledInfo[attr.ServiceID]){
					me.layerDisplayFiledInfo[attr.ServiceID] = [];
					me.layerDisplayFiledInfo[attr.ServiceID].push({fnm:"OBJECTID", fid:"OBJECTID", flag:false})
				}
				me.layerDisplayFiledInfo[attr.ServiceID].push({fnm:attr.Grid_NM, fid:attr.Column_NM});
			});
			//SGIS.loading.finish();
		});
		dojo.connect(queryTask, "onError", function(err) {
			//SGIS.loading.finish();
		});
	},
	
	getLayerBranchFiledInfo:function(callback, scope){
		var me = this;
		var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/17");
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		query.where = "1=1";
		query.outFields = ["*"];
		//SGIS.loading.execute();
		queryTask.execute(query,  function(results){
			var attr = results.features;
			Ext.each(results.features, function(obj, index) {
				var attr = obj.attributes
				if(!me.layerBranchFiledInfo[attr.ServiceID]){
					me.layerBranchFiledInfo[attr.ServiceID] = [];
					me.layerBranchFiledInfo[attr.ServiceID].push({fnm:"OBJECTID", fid:"OBJECTID", flag:false})
				}
				me.layerBranchFiledInfo[attr.ServiceID].push({fnm:attr.Grid_NM, fid:attr.Column_NM});
			});
			//SGIS.loading.finish();
		});
		dojo.connect(queryTask, "onError", function(err) {
			//SGIS.loading.finish();
		});
	},
	
	getLayerChartFiledInfo:function(callback, scope){
		var me = this;
		var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/17");
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		query.where = "1=1";
		query.outFields = ["*"];
		//SGIS.loading.execute();
		queryTask.execute(query,  function(results){
			var attr = results.features;
			Ext.each(results.features, function(obj, index) {
				var attr = obj.attributes
				if(!me.layerChartFiledInfo[attr.ServiceID]){
					me.layerChartFiledInfo[attr.ServiceID] = [];
					me.layerChartFiledInfo[attr.ServiceID].push({fnm:"OBJECTID", fid:"OBJECTID", flag:false})
				}
				me.layerChartFiledInfo[attr.ServiceID].push({fnm:attr.Grid_NM, fid:attr.Column_NM});
			});
			//SGIS.loading.finish();
		});
		dojo.connect(queryTask, "onError", function(err) {
			//SGIS.loading.finish();
		});
	},
	
	bufferDisplayAndXY:function(){
		var me = this;
		var params = new esri.tasks.ProjectParameters();
	    params.geometries = [me.geometry];
	    params.outSR = new esri.SpatialReference({wkid: 4326});
	    me.geometryService.project(params, function(result) { 
	    	if(result.length>0){
	    		$('#searchDivNew_x').val(result[0].x);
	    		$('#searchDivNew_y').val(result[0].y);
	    	}
		});
	    
	    var params = new esri.tasks.BufferParameters();
	    params.geometries  = [ me.geometry ];
	    params.distances = [ me.buffRadus*1000 ];
	    params.outSpatialReference = new esri.SpatialReference({wkid:102100});
	    params.bufferSpatialReference = new esri.SpatialReference({wkid:102080});
	    
	    params.unit = esri.tasks.GeometryService.UNIT_METER;
	    me.geometryService.buffer(params, function(result){
	    	if(result.length>0){
	    		me.geometry = result[0];
	    		
	    	
	    		var graphic = new esri.Graphic(me.geometry, me.simpleFillSymbol);
	            me.sourceGraphicLayer.clear();
	            me.sourceGraphicLayer.add(graphic);
	            
	            var symbol = new esri.symbol.PictureMarkerSymbol(Sgis.app.meUrl + 'resources/images/btn_close.png' , 16, 16);
	            var finalRing = me.geometry.rings[0][me.geometry.rings[0].length-1];
	            var point = new esri.geometry.Point(finalRing[0], finalRing[1], new esri.SpatialReference({"wkid":102100}));
	    		point.uuid = dojo.dojox.uuid.generateRandomUuid();
	    		var graphic = new esri.Graphic(point, symbol);
	    		graphic.img = 'btn_close'; 
	    		me.sourceGraphicLayer.add(graphic);
	            
	            //Sgis.getApplication().fireEvent('drawComplte', null);
	            me.spSearch();
	            
	    	}
	  	},function(){
	  		//Sgis.getApplication().fireEvent('drawComplte', null)
	  	});
	},
    
    spSearch:function(filterObject){
    	
		var me = this;
		//SGIS.loading.execute();
		me.targetGraphicLayer.clear();
		me.highlightGraphicLayer.clear();
		
		if(me.sourceGraphicLayer.graphics.length==0 || !me.geometry || me.layers.length==0){
			//SGIS.loading.finish();
			//alert("dd");
			return;
		}
		
		var exeComplteCnt = 0;
		var receiveComplteCnt = 0;
		var complteData = [];
		Ext.each(me.layers, function(layerInfo, index) {
			
			if(layerInfo){
				var layer = layerInfo.data
				var filterBool = false;
				if(filterObject && filterObject.layerId==layer.layerId){
					filterBool = true;
				}
				var resultData = {};
				resultData.title = layer.text;
				var datas = [];
				resultData.field = me.layerDisplayFiledInfo[layer.layerId];
				
				resultData.filter = layer.filter;
				resultData.filterCallback = me.spSearch;
				resultData.filterCallbackScope = me;
				
				resultData.layerId = layer.layerId;
				resultData.text = layer.text;
				resultData.datas = datas;
				resultData.clickCallback = me.highlightGraphic;
				resultData.clickCallbackScope = me;
				
				var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/" + layer.layerId);
				var query = new esri.tasks.Query();
				query.returnGeometry = true;
				query.outSpatialReference = {"wkid":102100};
				query.geometry = me.geometry;
				if(filterBool){
					query.where = filterObject.where;
				}
				query.outFields = ["*"];
				queryTask.execute(query,  function(results){
					receiveComplteCnt ++;
					if(receiveComplteCnt == me.layers.length){
					}
					if(results.features.length==0){
						exeComplteCnt++;
						if(resultData.field && resultData.field.length>0){
							complteData.push(resultData);
						}
						if(exeComplteCnt==me.layers.length){
						}
					}
					else
					{
						Ext.each(results.features, function(obj, index) {
							var pictureMarkerSymbol;
							if(layer=='5'){
								pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(Sgis.app.meUrl + '/' + layer.iconInfo , 12, 12);
							}else{
								pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(Sgis.app.meUrl + '/' + layer.iconInfo , 16, 16);
							}
							obj.setSymbol(pictureMarkerSymbol);
				    		me.targetGraphicLayer.add(obj);
				    		datas.push(obj.attributes);
				    		obj.attributes._layerName_ = layer.text;
				    		obj.attributes._layerId_ = layer.layerId;
				    		if(results.features.length==index+1){
				    			exeComplteCnt++;
				    			if(resultData.field && resultData.field.length>0){
									complteData.push(resultData);
								}
								if(exeComplteCnt==me.layers.length){
									//Sgis.getApplication().fireEvent('searchComplete', complteData);
								}
				    		}
						});
					}
					
				});
				dojo.connect(queryTask, "onError", function(err) {
					alert("spSearch : " + err);
				});
			}
		});
	},
	
	dataGridSelectHandler:function(layerId, record){
		var me = this;
		me.highlightGraphicLayer.clear();
		var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.where = "OBJECTID=" + record.data.OBJECTID;
		query.outFields = ["*"];
		queryTask.execute(query,  function(results){
			var feature = results.features[0];
			feature.geometry.spatialReference = new esri.SpatialReference({wkid:102100});
			me.symbolHighlight(feature);
			me.map.centerAt(esri.geometry.Point(feature.geometry));
		});
		dojo.connect(queryTask, "onError", function(err) {
			alert(err);
		});
	},
	
	symbolHighlight: function(feature){
		var me = this;
		me.highlightGraphicLayer.show();
		var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(Sgis.app.meUrl + 'resources/images/layerIcon/pin_24x24.png' , 24, 24);
		pictureMarkerSymbol.setOffset(0, 12);
		feature.setSymbol(pictureMarkerSymbol);
		me.highlightGraphicLayer.add(feature);
		
		var i=0;
		var timerId = window.setInterval(function(){
			if(i%2==0){
				me.highlightGraphicLayer.hide();
			}else{
				me.highlightGraphicLayer.show();
			}
			if(i>16){
				me.highlightGraphicLayer.hide();
				window.clearInterval(timerId);
			}
			i++;
		}, 300);
	},
	
	areaAutoDisplayCheck:function(){
		var me = this;
		
		var xmin = 999999999;
		var ymin = 999999999;
		var xmax = -999999999;
		var ymax = -999999999;
		
		for(var k=0; k<me.sourceGraphicLayer.graphics.length; k++){
			var feature = me.sourceGraphicLayer.graphics[k];
			if(!feature.geometry){
				continue;
			}
			feature.geometry.spatialReference = new esri.SpatialReference({"wkid":102100});
			var extent = esri.geometry.Polygon(feature.geometry).getExtent();
			if(extent && extent.xmin){
				if(extent.xmin<xmin){
					xmin = extent.xmin;
				}
				if(extent.ymin<ymin){
					ymin = extent.ymin;
				}
				if(extent.xmax>xmax){
					xmax = extent.xmax;
				}
				if(extent.ymax>ymax){
					ymax = extent.ymax;
				}
			}
		}
		
		if(xmin!=999999999){
			var currExtent = me.map.extent;
			if((xmin < currExtent.xmin && xmax>currExtent.xmax) || (ymin < currExtent.ymin && ymax>currExtent.ymax)){
				$.each(me.sourceGraphicLayer.graphics, function(index, graphic) {
					graphic.setSymbol(me.noneSimpleFillSymbol);
				});
			}else{
				alert(me.simpleFillSymbol);
				$.each(me.sourceGraphicLayer.graphics, function(index, graphic) {
					graphic.setSymbol(me.simpleFillSymbol);
				});
			}
		}
	}
});
/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_Name_SiteList', {

	extend: 'Ext.panel.Panel',

	xtype: 'west-threeDimSearchArea_Name_SiteList',

	//controller: 'threeDimSearchArea_NameController',

	header: { cls: 'sub-panel-x-header', title: '<span class="sub-panel-header-text">지점 목록</span>' },
	autoScroll: true,

	id: 'threeDimSiteListTreePanel',
	cls: 'khLee-x-searcharea-water',

	height: 320,

	layout: 'fit',

	items: [{
		xtype: 'treepanel',
		id: 'threeDimSiteListTree',
		rootVisible: false,
		cls: 'khLee-x-grid-cell',
		height: 320,
		columns: [{
			xtype: 'treecolumn', //this is so we know which column will show the tree
			text: '지점',
			width: 270,
			sortable: true,
			autoScroll: false,
			dataIndex: 'text',
			listeners: {
				click: function (grid, rowIndex, colIndex, actionItem, node, record, row) {
					if (node.record.data.leaf == true) {
						if (node.record.data.id != undefined) {
							var nodeId = record.data.id;
							var parentNodeId = record.data.parentId;
							var layerId = "";

							/* 레이어 정보 가져오기 */
							var layer01Info = Ext.getCmp('threeDimSiteListTreePanel').getLayerInfo("layerCode", parentNodeId, null, null);

							if (layer01Info.length > 0) {
								layerId = layer01Info[0].id;
							}

							var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + layerId);
							var query = new esri.tasks.Query();
							query.returnGeometry = true;
							query.outSpatialReference = { "wkid": 4019 };
							query.outFields = ["OBJECTID"];

							/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 */
							var layer01Info = Ext.getCmp('threeDimSiteListTreePanel').getLayerInfo("id", layerId, null, null);

							if (layer01Info != undefined && layer01Info != null && layer01Info.length > 0) {
								query.where = layer01Info[0].siteIdCol + " = '" + nodeId + "'";
							} else {
								console.info(layerId + "에 해당하는 siteIdCol(이)가 없습니다. Layer01Data.json 확인 요함.")
							}

							if (query.where == undefined) {
								console.info("쿼리 조건이 설정되지 않았습니다.");
								return;
							}
							/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 끝 */
							queryTask.execute(query, function (results) {
								// 지점 포인트 정보
								
								if(results.features.length > 0){
									var point = new esri.geometry.Point(results.features[0].geometry.x, results.features[0].geometry.y, results.features[0].geometry.spatialReference);
									
									$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, {
										type:'move',
										coord: point
									});
								}
							});
						}
					}
				}
			}
		}, {
			text: '이동',
			width: 0,
			menuDisabled: true,
			xtype: 'actioncolumn',
			tooltip: '이동',
			align: 'center',
			icon: './resources/images/button/icon_branch.gif',
			iconCls: ' khLee-x-default-btn', // 앞에 한칸 띄워야 함!!
			handler: function (grid, rowIndex, colIndex, actionItem, node, record, row) {

			},
			// Only leaf level tasks may be edited
			isDisabled: function (view, rowIdx, colIdx, item, record) {

			}
		}]
	}],

	getLayerInfo: function (attrName, attrValue, childNodes, layer01Infos) {

			if (childNodes == undefined || childNodes == null) {
		
				childNodes = Ext.getCmp("threeDimLayer01").store.data.items;
			}
		
			if (layer01Infos == undefined || layer01Infos == null) {
		
				layer01Infos = [];
			}
		
			
			for (var i = 0; i < childNodes.length; i++) {
		
				var data = childNodes[i].data;
				if (data[attrName] == attrValue) {
		
					var infoIdx = layer01Infos.indexOf(data);
		
					if (infoIdx == -1) {
		
						layer01Infos.push(data);
					}
				}
		
				var tmpChilds = childNodes[i].childNodes;
		
				if (tmpChilds != undefined && tmpChilds.length > 0) {
		
					var childLayerInfo = getLayer01Info(attrName, attrValue, tmpChilds, layer01Infos);
					if(childLayerInfo.length > 0){
						if(layer01Infos.indexOf(childLayerInfo[0]) == -1){
							layer01Infos.push(childLayerInfo[0]);
						}
					}
				}
			}
		
			return layer01Infos;
	}
});
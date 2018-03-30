Ext.define('krf_new.view.admin.LayerSetPanel', {

	extend: 'Ext.panel.Panel',

	xtype: 'layer-set-panel',

	id: 'layerSetPanel', // view.west.WestTabLayerController에서 사용

	requires: [
		'krf_new.view.admin.LayerSetLayer01Controller',
		'Ext.slider.*'
	],

	title: 'KRF 레이어',
	header: false,

	tabBar: {
		border: false
	},

	width: '100%',
	height: '100%',

	defaults: {
		textAlign: 'center',
		bodyPadding: 5
	},
	layout: 'border',

	items: [{
		xtype: 'container',
		region: 'north',
		style: 'background: #f8f8f8; padding: 10px;',
		layout: {
			type: 'hbox'
		},
		items: [{
			xtype: 'textfield',
			id: 'layerSetNameField',
			fieldLabel: '<b>명칭 </b> ',
			labelPad: 5,
			labelWidth:50,
			width: 200,
			editable: true

		}, {
			xtype: 'container',
			width: 10
		}, {
			xtype: 'button',
			text: '저장',
			style: 'background: #405166; border-color: #405166 !important;',
			listeners: {
				click: function () {
					var treePanel = Ext.getCmp('layerSetLayer01');
					var checkList = treePanel.getChecked();
					var checkLayerIds = [];

					for (var i = 0; i < checkList.length; i++) {
						checkLayerIds.push(checkList[i].data.id);
					}
					var layerSetNameField = Ext.getCmp('layerSetNameField');
					var layerSetName = Ext.String.trim(layerSetNameField.getValue());

					if (layerSetName == '') {
						alert('명칭을 입력하세요.');
						return;
					}

					var requestUrl = _API.putLayerSet;

					var requestParam = {layerSetName: layerSetName, layerSetIds: JSON.stringify(checkLayerIds), userId:$KRF_APP.loginInfo.userId};

					var layerSetWindow = Ext.getCmp('layer-set-win');


					if (layerSetWindow.openType == 'edit') {
						requestUrl = _API.updateLayerSet;
						requestParam.layerSetId = layerSetWindow.layerSetInfo.layerSetId;
					}

					Ext.Ajax.request({
						url: requestUrl,
						dataType: "text/html",
						method: 'POST',
						params:requestParam,
						async: true, // 비동기 = async: true, 동기 = async: false
						success: function (response, opts) {
							if (response.responseText == 'error') {
								alert('주제도 저장 중 예외가 발생했습니다.');
								return;
							}
							var result = Ext.util.JSON.decode(response.responseText);
							if (result.result == '1') {
								alert('저장되었습니다.');

								$KRF_APP.fireEvent($KRF_EVENT.RELOAD_LAYER_SET);
								
								var layerSetWindow = Ext.getCmp('layer-set-win');
								if(layerSetWindow.openType == 'edit'){
									if(layerSetName != layerSetWindow.layerSetInfo.layerSetName){
										$KRF_APP.fireEvent($KRF_EVENT.RELOAD_USER_LIST);
									}
								}
								if (layerSetWindow) {
									layerSetWindow.close();
								}
							}
						},
						failure: function (form, action) {
							alert("오류가 발생하였습니다.");
						}
					});
				}
			}
		}, {
			xtype: 'container',
			width: 5
		}, {
			xtype: 'button',
			text: '삭제',
			id:'btnLayerSetDel',
			hidden: true,
			style: 'background: #405166; border-color: #405166 !important;',
			listeners: {
				click: function () {
					

					var layerSetWindow = Ext.getCmp('layer-set-win');

					if (layerSetWindow.openType == 'new') {
						return;
					}
					if(confirm('삭제하시겠습니까?')){
						Ext.Ajax.request({
							url: _API.delLayerSet,
							dataType: "text/html",
							method: 'POST',
							params:{layerSetId: layerSetWindow.layerSetInfo.layerSetId},
							async: true, // 비동기 = async: true, 동기 = async: false
							success: function (response, opts) {
								if (response.responseText == 'error') {
									alert('주제도 삭제 중 예외가 발생했습니다.');
									return;
								}
								var result = Ext.util.JSON.decode(response.responseText);
								if (result.result == '1') {
	
									alert('삭제되었습니다.');
	
									$KRF_APP.fireEvent($KRF_EVENT.RELOAD_LAYER_SET);
									$KRF_APP.fireEvent($KRF_EVENT.RELOAD_USER_LIST);
									
									var layerSetWindow = Ext.getCmp('layer-set-win');
									
									if (layerSetWindow) {
										layerSetWindow.close();
									}
								}
							},
							failure: function (form, action) {
								alert("오류가 발생하였습니다.");
							}
						});
					}
				}
			}
		}]
	}, {
		xtype: 'treepanel',
		scroll: true,
		region: 'north',
		cls: 'khLee-x-tab-header',
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		controller: 'layerSetLayer01Controller',
		id: 'layerSetLayer01',
		store: Ext.create('krf_new.view.admin.LayerSetLayer01Store'),
		rootVisible: false,
		useArrows: true,
		border: 0,
		bufferedRenderer: false,
		listeners: {
			afterrender: function () {
				Ext.Ajax.request({
					url: 'resources/data/west/Layer01Data.json',
					success: function (response, opts) {
						var layers = Ext.util.JSON.decode(response.responseText);

						for (var i = 0; i < layers.length; i++) {
							if (layers[i].text == '하천망도' ||
								layers[i].text == '소하천') {
								layers[i].checked = true;
								layers[i].disabled = true;
							} else {
								layers[i].checked = false;
							}


							if (layers[i].children) {
								for (var j = 0; j < layers[i].children.length; j++) {
									layers[i].children[j].checked = false;
									if (layers[i].text == '하천망도' ||
										layers[i].text == '리치흐름' ||
										layers[i].text == '리치노드' ||
										layers[i].text == '리치라인' ||
										layers[i].text == '집수구역' ||
										layers[i].text.indexOf('소하천') > -1) {
										layers[i].children[j].checked = true;
										layers[i].children[j].disabled = true;
									}
									if (layers[i].children[j].text.indexOf('<') > -1) {
										layers[i].children[j].text = layers[i].children[j].text.substring(0, layers[i].children[j].text.indexOf('<'));
									}
								}
							}
						}

						var layerSetWindow = Ext.getCmp('layer-set-win');

						if (layerSetWindow.openType == 'new') {
							Ext.getCmp('layerSetLayer01').setRootNode({ text: 'root', expanded: true, leaf: false, children: layers });

						} else {
							var layerSetNameField = Ext.getCmp('layerSetNameField');
							if (layerSetNameField) {
								layerSetNameField.setValue(layerSetWindow.layerSetInfo.layerSetName);
							}
							var checkLayers = JSON.parse(layerSetWindow.layerSetInfo.layerSetIds);
							for (var z = 0; z < checkLayers.length; z++) {
								var checkFlag = false;
								for (var i = 0; i < layers.length; i++) {
									if (layers[i].id == checkLayers[z]) {
										layers[i].checked = true;
										break;
									}
									if (layers[i].children) {
										for (var j = 0; j < layers[i].children.length; j++) {
											if (layers[i].children[j].id == checkLayers[z]) {
												layers[i].children[j].checked = true;
												checkFlag = true;
												break;
											}
										}
										if (checkFlag) {
											break;
										}
									}
								}
							}
							Ext.getCmp('layerSetLayer01').setRootNode({ text: 'root', expanded: true, leaf: false, children: layers });

							Ext.getCmp('btnLayerSetDel').show();
						}
					}
				});
			}
		}
	}]
});


Ext.define('krf_new.view.search.threeDim.ThreeDimLayer01', {

	extend: 'Ext.panel.Panel',

	xtype: 'threeDim-west-Layer01',

	id: 'westThreeDimLayer01', // view.west.WestTabLayerController에서 사용

	requires: [
		'krf_new.view.search.threeDim.ThreeDimLayer01Controller',
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

	items: [{
		//		title: '주제도 선택',
		xtype: 'treepanel',
		scroll: false,
		cls: 'khLee-x-tab-header',
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store: Ext.create('krf_new.store.west.ThreeDimLayer01Store'),
		controller: 'threeDimLayer01Controller',
		id: 'threeDimLayer01', // view.map.DynamicLayerAdmin의 layer.id와 일치시키자..
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
						//var userLayerSet = [];
						var userLayerSet = layers;

						
						for (var j = 0; j < userLayerSet.length; j++) {
							if (userLayerSet[j].children) {
								var chuldrenLayer = [];
								for (var z = 0; z < userLayerSet[j].children.length; z++) {
									var childArr = userLayerSet[j].children[z];
									if (childArr.isMetaData) {
										childArr.text = childArr.text + '<a onclick="metaDataView(\'' + childArr.layerCode + '\')" class="metaDataBtn"> <img src="./resources/images/button/meta.png" /> </a>';
									} else {
										if (childArr.metaDataId) {
											childArr.text = childArr.text + '<a onclick="metaDataView(\'' + childArr.metaDataId + '\')" class="metaDataBtn"> <img src="./resources/images/button/meta.png" /> </a>';
										}
									}
									
									//$KRF_APP.USER_LAYERS.layerSetIds.splice(i,1);
									// 권한별 레이어에서 쓰는지 안쓰는지 확인 2019-04-16
									var yn = false;
									
									for(var a = 0 ; a < $KRF_APP.LAYER_SETTING.length; a++){
										if($KRF_APP.LAYER_SETTING[a].LYR_CODE == childArr.layerCode){
											
											if($KRF_APP.LAYER_SETTING[a].LYR_USE_AT == "Y"){
												yn = true;
												break;
											}
										}
									}
									
									//임시 레이어 코드가 없는것들은 일단 보여주기 2019-04-25
									if(childArr.layerCode == ""){
										yn = true;
									}

									if(yn){
										chuldrenLayer.push(childArr);
										// chuldrenLayer.push(userLayerSet[j].children.splice(z, 1)[0]);
										// z--;
										// //i--;
										// break;
									}

								}

								userLayerSet[j].children = chuldrenLayer;
							}
						}

						// var layers = Ext.util.JSON.decode(response.responseText);

						// var userLayerSet = [];

						// if ($KRF_APP.USER_LAYERS) {
						// 	for (var j = 0; j < layers.length; j++) {
						// 		for (var i = 0; i < $KRF_APP.USER_LAYERS.layerSetIds.length; i++) {
						// 			if (layers[j].id == $KRF_APP.USER_LAYERS.layerSetIds[i]) {
						// 				//$KRF_APP.USER_LAYERS.layerSetIds.splice(i,1);
						// 				userLayerSet.push(layers.splice(j, 1)[0]);
						// 				j--;
						// 				//i--;
						// 				break;
						// 			}
						// 		}
						// 	}
						// 	for (var j = 0; j < userLayerSet.length; j++) {
						// 		if (userLayerSet[j].children) {
						// 			var chuldrenLayer = [];

						// 			for (var z = 0; z < userLayerSet[j].children.length; z++) {
						// 				for (var i = 0; i < $KRF_APP.USER_LAYERS.layerSetIds.length; i++) {
						// 					if (userLayerSet[j].children[z].id == $KRF_APP.USER_LAYERS.layerSetIds[i]) {
						// 						//$KRF_APP.USER_LAYERS.layerSetIds.splice(i,1);
						// 						chuldrenLayer.push(userLayerSet[j].children.splice(z, 1)[0]);
						// 						z--;
						// 						//i--;
						// 						break;
						// 					}
						// 				}
						// 			}
						// 			userLayerSet[j].children = chuldrenLayer;
						// 		}
						// 	}
						// } else {
						// 	userLayerSet = layers;
						// }

						for (var i = 0; i < userLayerSet.length; i++) {
							userLayerSet[i].checked = false;
							if (userLayerSet[i].text == '하천망도' /*||
						userLayerSet[i].text == '소하천'*/) {
								userLayerSet.splice(i, 1);
								i--;
								continue;
							}
							if (userLayerSet[i].children) {
								for (var j = 0; j < userLayerSet[i].children.length; j++) {
									userLayerSet[i].children[j].checked = false;

									if (userLayerSet[i].children[j].text.indexOf('<') > -1) {
										userLayerSet[i].children[j].text = userLayerSet[i].children[j].text.substring(0, userLayerSet[i].children[j].text.indexOf('<'));
									}
								}
							}
						}

						//임시 2019-11-24 pdj
						var visibleThreeDimLayer = ['0','S']; //수질측정지점,소하천
						var threeDimLayerList = [];
						userLayerSet.map(function(threeObj){
							for(var b = 0 ; b < visibleThreeDimLayer.length; b++){
								if(threeObj.id == visibleThreeDimLayer[b]){
									threeDimLayerList.push(threeObj);
								}
							}
							
						});
						
						//Ext.getCmp('threeDimLayer01').setRootNode({ text: 'root', expanded: true, leaf: false, children: userLayerSet });
						Ext.getCmp('threeDimLayer01').setRootNode({ text: 'root', expanded: true, leaf: false, children: threeDimLayerList });

						$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'layerOffAll' });
					}
				});
			}
		}
	}]
});


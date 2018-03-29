Ext.define('krf_new.view.search.Layer01', {

	extend: 'Ext.panel.Panel',

	xtype: 'west-Layer01',

	id: 'westLayer01', // view.west.WestTabLayerController에서 사용

	requires: [
		'krf_new.view.search.Layer01Controller',
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
		store: Ext.create('krf_new.store.west.Layer01Store'),
		controller: 'layer01Controller',
		id: 'layer01', // view.map.DynamicLayerAdmin의 layer.id와 일치시키자..
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
						var userLayerSet = [];

						if ($KRF_APP.USER_LAYERS) {
							for (var j = 0; j < layers.length; j++) {
								for (var i = 0; i < $KRF_APP.USER_LAYERS.layerSetIds.length; i++) {
									if (layers[j].id == $KRF_APP.USER_LAYERS.layerSetIds[i]) {
										//$KRF_APP.USER_LAYERS.layerSetIds.splice(i,1);
										userLayerSet.push(layers.splice(j, 1)[0]);
										j--;
										//i--;
										break;
									}
								}
							}
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
										for (var i = 0; i < $KRF_APP.USER_LAYERS.layerSetIds.length; i++) {
											if (childArr.id == $KRF_APP.USER_LAYERS.layerSetIds[i]) {
												//$KRF_APP.USER_LAYERS.layerSetIds.splice(i,1);
												chuldrenLayer.push(userLayerSet[j].children.splice(z, 1)[0]);
												z--;
												//i--;
												break;
											}
										}
									}

									userLayerSet[j].children = chuldrenLayer;
								}
							}
						} else {
							userLayerSet = layers;
						}

						var layerTreePanel = Ext.getCmp('layer01');
						layerTreePanel.setRootNode({ text: 'root', expanded: true, leaf: false, children: userLayerSet });

						$KRF_APP.fireEvent($KRF_EVENT.DYNAMIC_LAYER_ON_OFF, layerTreePanel.getView().getChecked());
					}
				});
			},

		}
	}]
});


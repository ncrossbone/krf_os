Ext.define('Report.view.map.siteDynamicLayerAdmin', {

	map: null,
	siteDynamicLayer: null,

	constructor: function (map) {

		var me = this;
		me.map = map;

		/* 지점 레이어 */
		var layerArr = [1, 2, 3, 4, 5, 6, 7, 26, 28, 20];
		var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(parentObj.$KRF_DEFINE.reachServiceUrl_v3, { showAttribution: true });
		dynamicLayer.setVisibleLayers(layerArr);
		map.addLayer(dynamicLayer);
	}
});
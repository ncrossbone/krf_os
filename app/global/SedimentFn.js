Ext.define('krf_new.global.SedimentFn', {
	singleton: true,
	dataObj: null,
	dom: null,
	me: null,

	graphicsLayer: null,

	init: function (d) {
		me = this;
		dom = d;

		if (dom.src.indexOf('_off') > -1) {
			me.setData();

			var sedimentSeachWindow = Ext.getCmp("sedimentSeachWindow");
			if (!sedimentSeachWindow) {
				sedimentSeachWindow = Ext.create('krf_new.view.east.SedimentSeachWindow', { x: Ext.getCmp('center_container').getWidth() - 300, y: $KRF_DEFINE.mapToolbarHeight + Ext.getCmp('siteListWindow').getHeight()});
				Ext.getCmp('center_container').add(sedimentSeachWindow);
			}

			sedimentSeachWindow.show();

		} else {
			me.removeFeature();
			me.setbuttonOnOff('off');
		}
	},

	setData: function () {
		me.setbuttonOnOff('on');
		var data = me.getData();
		var feature = me.dataObj;
		var resultArr = [];

		for (key in feature) {

			feature[key].flag = parseInt(Math.random() * 10 / 3);
			resultArr.push(feature[key]);
			// for (var j = 0; j < data.length; j++) {
			// 	if (data[j].code == feature[i].JIJUM_CODE) {
			// 		feature[i].flag = data[j].flag;

			// 	}
			// }
		}

		me.writeLayer(resultArr);
	},
	writeLayer: function (data) {
		if (me.graphicsLayer) {
			me.graphicsLayer.clear();
		}

		require(['esri/graphic',
			'esri/layers/GraphicsLayer',
			'esri/symbols/PictureMarkerSymbol',
			'esri/geometry/Point',
			'esri/SpatialReference',
			'esri/graphicsUtils'], function (Graphic, GraphicsLayer, PictureMarkerSymbol, Point, SpatialReference, graphicsUtils) {
				me.graphicsLayer = new GraphicsLayer();

				for (var i = 0; i < data.length; i++) {

					var symbol = new PictureMarkerSymbol({
						'angle': 0,
						'yoffset': 0,
						'type': 'esriPMS',
						'url': './resources/images/symbol/btn_e' + (data[i].flag + 1) + '.png',
						'contentType': 'image/png',
						'width': 48,
						'height': 30
					});

					var point = new Point([data[i].TM_X, data[i].TM_Y], new SpatialReference({ wkid: 4326 }));

					var graphic = new Graphic(point, symbol, data[i]);
					me.graphicsLayer.add(graphic);
				}

				GetCoreMap().map.addLayer(me.graphicsLayer);

				var extent = graphicsUtils.graphicsExtent(me.graphicsLayer.graphics);

				GetCoreMap().map.setExtent(extent);
			});
	},

	getData: function () {
		return [{ code: '2010R30', flag: '1' }];
	},

	removeFeature: function () {
		if (me.graphicsLayer) {
			me.graphicsLayer.clear();
		}
	},

	setbuttonOnOff: function (flag) {
		dom.src = './resources/images/button/tmPollLoad_' + flag + '.png';
	},

	setDataArr: function (attr) {
		var m = this;
		if (!m.dataObj) {
			m.dataObj = {}
			m.dataObj[attr.JIJUM_CODE] = attr;
		} else {
			if (!m.dataObj[attr.JIJUM_CODE]) {
				m.dataObj[attr.JIJUM_CODE] = attr;
			}
		}
	},

	initArr: function () {
		this.dataObj = null;
		this.removeFeature();
	}

});
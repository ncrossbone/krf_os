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

			var sedimentSeachWindow = Ext.getCmp('sedimentSeachWindow');
			if (!sedimentSeachWindow) {
				sedimentSeachWindow = Ext.create('krf_new.view.east.SedimentSeachWindow', { x: Ext.getCmp('center_container').getWidth() - 300, y: $KRF_DEFINE.mapToolbarHeight + Ext.getCmp('siteListWindow').getHeight() });
				Ext.getCmp('center_container').add(sedimentSeachWindow);
			}

			sedimentSeachWindow.show();

			var sedimentLegendWindow = Ext.getCmp('sedimentLegendWindow');
			if (!sedimentLegendWindow) {
				sedimentLegendWindow = Ext.create('krf_new.view.map.SedimentLegendWindow');
				Ext.getCmp('center_container').add(sedimentLegendWindow);
			}

			sedimentLegendWindow.show();

			me.setCombo();
			me.setbuttonOnOff('on');
		} else {
			me.removeFeature();
			me.setbuttonOnOff('off');
		}
	},

	setCombo: function () {
		var p = '';
		for (key in me.dataObj) {
			p += '\'' + key + '\',';
		}

		p = p.substring(0, p.length - 1);

		Ext.Ajax.request({
			url: _API.GetSearchResultData_C,
			dataType: 'text/plain',
			method: 'POST',
			async: true,
			params: { firstSearch: 'noDate', siteIds: p },
			success: function (response) {
				var data = JSON.parse(response.responseText).data;
				var wmyr = parseInt(data[0].WMYR.split('.')[0]);
				var date = new Date();
				var dataArr = [];

				for (var i = (wmyr - 5); i <= date.getFullYear(); i++) {
					dataArr.push({ id: i, name: i + '년' });
				}

				me.bindStore('sedimentYear', dataArr, data[0].WMYR.split('.')[0]);
				me.bindStore('sedimentHalf', [{ id: '1', name: '상반기' }, { id: '2', name: '하반기' }], data[0].WMYR.split('.')[1]);
				me.bindStore('sedimentItem', [{ id: 'ITEM_TOC', name: 'TOC' }, { id: 'ITEM_TN', name: 'T-N' }], 'ITEM_TOC');

				me.getData();
			}
		});
	},

	bindStore: function (cmpId, dataArr, defaultValue) {
		var getCmp = Ext.getCmp(cmpId);
		var store = Ext.create('Ext.data.Store', {
			data: dataArr
		});

		getCmp.bindStore(store);
		getCmp.setValue(defaultValue);
	},

	writeFeature: function (data) {
		var feature = me.dataObj;
		var resultArr = [];

		for (key in feature) {
			for (var i = 0; i < data.length; i++) {
				if (key == data[i].PT_NO) {
					feature[key].flag = parseInt(data[i].ITEM) + 1;
					resultArr.push(feature[key]);
				}
			}
		}
		me.writeLayer(resultArr);
	},

	writeLayer: function (data) {
		if (me.graphicsLayer) {
			me.graphicsLayer.clear();
		}

		if (data.length == 0) {
			return;
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
						'url': './resources/images/sediment/' + data[i].flag + '.png',
						'contentType': 'image/png',
						'width': 39,
						'height': 39
					});

					var point = new Point([data[i].TM_X, data[i].TM_Y], new SpatialReference({ wkid: 4326 }));

					var graphic = new Graphic(point, symbol, data[i]);
					me.graphicsLayer.add(graphic);
				}

				var map = GetCoreMap().map;
				map.addLayer(me.graphicsLayer);

				var extent = graphicsUtils.graphicsExtent(me.graphicsLayer.graphics);

				map.setExtent(extent).then(function () {
					var limitLvl = map.getLevel();
					if (me.graphicsLayer.graphics.length > 1) {
						map.setLevel(limitLvl - 1);
					}
				});
			});
	},
	getData: function () {
		var str = '';
		for (key in me.dataObj) {
			str += '\'' + key + '\',';
		}

		var paramObj = {
			siteIds: str.substring(0, (str.length - 1)),
			year: Ext.getCmp('sedimentYear').getValue() + Ext.getCmp('sedimentHalf').getValue(),
			item: Ext.getCmp('sedimentItem').getValue()
		};

		Ext.Ajax.request({
			url: 'http://localhost:8080/krf/searchResult/getSedimentItemValue',
			dataType: 'text/plain',
			method: 'POST',
			params: paramObj,
			async: true,
			success: function (response) {
				var data = JSON.parse(response.responseText).data;
				me.writeFeature(data);
			},
			failure: function () {
				alert('하드코딩 RestAPI입니다. URL 수정후 작업하세요. sedimentFn.js');
			}
		});
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
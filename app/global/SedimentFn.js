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

			me.sedimentSeachWindow = sedimentSeachWindow;
			me.sedimentLegendWindow = sedimentLegendWindow;

		} else {
			me.removeFeature();
			me.setbuttonOnOff('off');

			me.sedimentSeachWindow.hide();
			me.sedimentLegendWindow.hide();
		}
	},

	setCombo: function () {
		var p = '';
		for (key in me.dataObj) {
			p += '\'' + key + '\',';
		}

		p = p.substring(0, p.length - 1);

		Ext.Ajax.request({
			url: _API.searchResult_C2018,
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
				me.bindStore('sedimentHalf', [{ id: 'H01', name: '상반기' }, { id: 'H02', name: '하반기' }], 'H0' + data[0].WMYR.split('.')[1]);

				var itemArr = [
					{ id: '1084', name: '완전연소가능량 등급' },
					{ id: '1085', name: '총질소 등급' },
					{ id: '1146', name: '총인 등급' },
					{ id: '1149', name: '구리 등급' },
					{ id: '1147', name: '납 등급' },
					{ id: '1151', name: '니켈 등급' },
					{ id: '1152', name: '비소 등급' },
					{ id: '1154', name: '수은 등급' },
					{ id: '1148', name: '아연 등급' },
					{ id: '1153', name: '카드뮴 등급' },
					{ id: '1150', name: '크로뮴 등급' }
				];

				me.bindStore('sedimentItem', itemArr, '1084');

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
		var config = { 'Ⅰ': '1', 'Ⅱ': '2', 'Ⅲ': '3', 'Ⅳ': '4', 'Ⅳ등급 이내': '1' };

		for (key in feature) {
			for (var i = 0; i < data.length; i++) {
				if (key == data[i].PT_NO) {

					var str = config[data[i].ITEM] ? config[data[i].ITEM] : '1';
					feature[key].flag = parseInt(str);
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
			url: _API.getSedimentItemValue,
			dataType: 'text/plain',
			method: 'POST',
			params: paramObj,
			async: true,
			success: function (response) {
				var data = JSON.parse(response.responseText).data;
				me.writeFeature(data);
			},
			failure: function () { }
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
Ext.define('krf_new.view.east.ThreeDimCoordinateWindow', {
	extend: 'Ext.window.Window',

	requires: ['krf_new.view.east.ThreeDimCoordinateController'],

	xtype: 'east-threedimcoordinatewindow',

	id: 'threeDimCoordinateWindow',

	title: '좌표 정보',

	layout: {
		type: 'fit'
	},

	tbar: {
		controller: 'autoMoveToolbar',

		plugins: 'boxreorderer',

		items: [{
			iconCls: null,
			text: '일반',
			handler: 'onClickGrab'
		}, {
			iconCls: null,
			text: '점찍기',
			handler: 'onClickInput'
		}, {
			iconCls: null,
			text: 'Play',
			handler: 'onClickStart'
		},{
			iconCls: null,
			text: 'Pause',
			handler: 'onClickPause'
		}, {
			iconCls: null,
			text: 'Stop',
			handler: 'onClickStop'
		}, {
			iconCls: null,
			text: 'Clear',
			handler: 'onClickClear'
		}]
	},
	// cls: 'khLee-window-panel-header khLee-x-window-default ',

	width: 450,
	height: 300,

	items: [{
		xtype: 'grid',
		id: 'coordinategrid',
		plugins: 'gridfilters',
		cls: 'khLee-x-column-header-text',
		height: 215,
		store: Ext.create('krf_new.store.east.ThreeDimCoordinateWindow'),
		header: {
			height: 5
		},
		filter: {
			value: 1,    // 0 is false, 1 is true
			active: true // turn on the filter
		},
		title: '검색결과',
		header: false,
		columns: [{
			text: '순서',
			dataIndex: 'index',
			menuDisabled: true,
			//width: 150
			width: "20%"
		}, {
			text: '경도',
			dataIndex: 'x',
			menuDisabled: true,
			//width: 240
			width: "40%"
		}, {
			text: '위도',
			dataIndex: 'y',
			menuDisabled: true,
			//width: 240
			width: "40%"
		}]
	}],
	initComponent: function () {
		this.callParent();
		$KRF_APP.addListener($KRF_EVENT.ADD_AUTO_MOVE_COORDINATE, this.addAutoMoveCoordinate);
		$KRF_APP.addListener($KRF_EVENT.ADD_AUTO_MOVE_CLEAR, this.addAutoMoveClear);
	},
	addAutoMoveCoordinate: function (coord) {
		if (!coord) {
			return;
		}
		var coordGrid = Ext.getCmp('coordinategrid');
		if (coordGrid) {
			var coordGridStore = coordGrid.getStore();
			coord.index = coordGridStore.getData().length + 1;
			coordGridStore.add(coord);
		}
	},
	addAutoMoveClear: function () {
		var coordGrid = Ext.getCmp('coordinategrid');
		if (coordGrid) {
			var coordGridStore = coordGrid.getStore();
			coordGridStore.setData([]);
		}
	}
});
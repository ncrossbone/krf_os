Ext.define('krf_new.view.east.ThreeDimCoordinateWindow', {
	extend: 'Ext.window.Window',

	requires: ['krf_new.view.east.ThreeDimCoordinateController'],

	xtype: 'east-threedimcoordinatewindow',

	id: 'threeDimCoordinateWindow',

	title: '좌표 정보',
	header: { cls: 'subWindow-x-form-item-label-default' },
	cls: 'subWindow-x-form-item-label-default',
	layout: {
		type: 'vbox'
	},

	// tbar: {
	// 	controller: 'autoMoveToolbar',

	// 	plugins: 'boxreorderer',

	// 	items: [{
	// 		iconCls: null,
	// 		text: '일반',
	// 		handler: 'onClickGrab'
	// 	}, {
	// 		iconCls: null,
	// 		text: '점찍기',
	// 		handler: 'onClickInput'
	// 	}, {
	// 		iconCls: null,
	// 		text: 'Play',
	// 		handler: 'onClickStart'
	// 	}, {
	// 		iconCls: null,
	// 		text: 'Pause',
	// 		handler: 'onClickPause'
	// 	}, {
	// 		iconCls: null,
	// 		text: 'Stop',
	// 		handler: 'onClickStop'
	// 	}, {
	// 		iconCls: null,
	// 		text: 'Clear',
	// 		handler: 'onClickClear'
	// 	}]
	// },
	// cls: 'khLee-window-panel-header khLee-x-window-default ',

	width: 350,
	height: 300,

	items: [{
		xtype: 'container',
		style: 'padding:10px;',
		controller: 'autoMoveToolbar',
		items: [{
			/* 경로탐색 */
			xtype: 'image',
			btnOnOff: 'on',
			id:'threeDimPathBtn',
			style: 'cursor:pointer;',
			groupId: 'threeDimBtnGrp01',
			height: 33,
			width: 73,
			listeners: { el: { click: 'onClickGrab' } },
			btnOnImg: './resources/images/button/b1_on.png',
			btnOffImg: './resources/images/button/b1_off.png',
			src: './resources/images/button/b1_on.png'
		}, {
			/* 점찍기 */
			xtype: 'image',
			btnOnOff: 'off',
			id:'threeDimPointBtn',
			style: 'cursor:pointer;',
			groupId: 'threeDimBtnGrp01',
			height: 33,
			width: 73,
			listeners: { el: { click: 'onClickInput' } },
			btnOnImg: './resources/images/button/b2_on.png',
			btnOffImg: './resources/images/button/b2_off.png',
			src: './resources/images/button/b2_off.png'
		}, {
			/* 이동 */
			xtype: 'image',
			btnOnOff: 'off',
			id:'threeDimMoveBtn',
			toggleGrp:'threeDimPathBtn',
			style: 'cursor:pointer; margin:6px 0px 6px 10px;',
			height: 21,
			width: 51,
			listeners: { el: { click: 'onClickStart' } },
			btnOnImg: './resources/images/button/b1_btn2.png',
			btnOffImg: './resources/images/button/b1_btn1.png',
			src: './resources/images/button/b1_btn1.png'
		}, {
			/* 정지 */
			xtype: 'image',
			btnOnOff: 'off',
			id:'threeDimStopBtn',
			toggleGrp:'threeDimPathBtn',
			style: 'cursor:pointer; margin: 6px 0px;',
			height: 21,
			width: 51,
			listeners: { el: { click: 'onClickStop' } },
			src: './resources/images/button/b1_btn3.png'
		}, {
			/* 지점추가 */
			xtype: 'image',
			btnOnOff: 'off',
			id:'threeDimAddBtn',
			toggleGrp:'threeDimPointBtn',
			style: 'cursor:pointer; margin: 6px 0px 6px 10px;',
			height: 21,
			width: 73,
			listeners: { el: { click: 'onClickStop' } },
			src: './resources/images/button/b2_btn1.png',
			hidden: true
		}, {
			/* 지점삭제 */
			xtype: 'image',
			btnOnOff: 'off',
			id:'threeDimDeleteBtn',
			toggleGrp:'threeDimPointBtn',
			style: 'cursor:pointer; margin: 6px 0px;',
			height: 21,
			width: 72,
			listeners: { el: { click: 'onClickClear' } },
			src: './resources/images/button/b2_btn2.png',
			hidden: true
		}]
	}, {
		xtype: 'container',
		layout: 'fit',
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
				text: '연번',
				dataIndex: 'index',
				menuDisabled: true,
				width: 80
				//width: "20%"
			}, {
				text: '경도',
				dataIndex: 'x',
				menuDisabled: true,
				width: 120
				//width: "40%"
			}, {
				text: '위도',
				dataIndex: 'y',
				menuDisabled: true,
				width: 120
				//width: "40%"
			}]
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
Ext.define('krf_new.view.east.ThreeDimTerrainCrossWindow', {
	extend: 'Ext.window.Window',

	requires: ['krf_new.view.east.ThreeDimTerrainCrossController'],

	xtype: 'east-threeDimTerrainCrossWindow',

	id: 'threeDimTerrainCrossWindow',

	title: '경사도',
	header: { cls: 'subWindow-x-form-item-label-default' },
	cls: 'subWindow-x-form-item-label-default',
	layout: {
		type: 'vbox'
	},
	width: 600,
	height: 500,
	resizable: false,
	listeners: {
		'close': function () {
			var btnTerrainCross = Ext.getCmp('btnTerrainCross');
			btnTerrainCross.btnOnOff = 'off';
			btnTerrainCross.setSrc(btnTerrainCross.btnOffImg);
			$KRF_APP.fireEvent($KRF_EVENT.THREEDIM_SEND_MESSAGE, { type: 'setGrab' , init:true});
		}, resize: function (win, width, height) {

		}
	},
	items: [{
		xtype: 'container',
		style: 'padding:10px;',
		controller: 'terrainCrossToolbar',
		layout: 'hbox',
		items: [{
			xtype: 'image',
			btnOnOff: 'on',
			id: 'threeDimTCrossGrabBtn',
			style: 'cursor:pointer;',
			groupId: 'threeDimBtnTCross',
			height: 33,
			width: 73,
			listeners: { el: { click: 'onClickGrab' } },
			btnOnImg: './resources/images/button/k1_on.png',
			btnOffImg: './resources/images/button/k1_off.png',
			src: './resources/images/button/k1_on.png'
		}, {
			xtype: 'image',
			btnOnOff: 'off',
			id: 'threeDimTCrossBtn',
			style: 'cursor:pointer;',
			groupId: 'threeDimBtnTCross',
			height: 33,
			width: 73,
			listeners: { el: { click: 'onClickInput' } },
			btnOnImg: './resources/images/button/k2_on.png',
			btnOffImg: './resources/images/button/k2_off.png',
			src: './resources/images/button/k2_off.png'
		}]
	}, {
		xtype: 'component',
		itemId: 'threeDim-iframe',
		id: 'terrainCrossframe',
		height: 462,
		width: 590,
		autoScroll: true,
		autoEl: {
			tag: 'iframe',
			style: 'height:462px; width: 590px;',
			id: 'terrainCrossframe',
			src: $KRF_DEFINE.threeDimServerURL + '/TempChart.html'
		}
	}],
	initComponent: function () {
		this.callParent();

		$KRF_APP.addListener($KRF_EVENT.SET_TERRAINCROSS_CHART, this.setTerrainCrossChart, this);
	},
	setTerrainCrossChart: function (value) {
		// var tcgBtn = Ext.getCmp('threeDimTCrossGrabBtn');
		
		SetBtnOnOff('threeDimTCrossGrabBtn');

		$('#terrainCrossframe').prop('src', $KRF_DEFINE.threeDimServerURL + '/AltitudeChart.html?linePointAltList=' + value);
	}
});
/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.ThreeDimToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	requires: [
		'krf_new.view.center.ThreeDimToolbarController'
	],
	xtype: 'center-3dToolbar',

	title: '3D toolbar',

	id: 'threeDimToolbar',

	/* 사이즈 지정 */
	itemWidth: 70,
	itemHeight: 59,

	height: 60,
	style: 'padding: 0px;',

	controller: '3dToolbar',

	onClickListener: {
		el: {
			click: 'onClickButton'
		}
	},

	layout: {
		type: 'hbox',
		align: 'middle',
		pack: 'left'
	},

	y: 0,

	initComponent: function () {

		this.items = [{
			xtype: 'image',
			id: 'btnThreeDimMenu10',
			groupId: 'group1',
			title: 'KRF',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickKRF' } },
			style: 'cursor:pointer;',
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu21.png',
			btnOffImg: './resources/images/button/reach_menu21.png',
			src: './resources/images/button/reach_menu21.png'
		},{
			xtype: 'image',
			id: 'btn3DDefaultMap',
			title: '일반',
			groupId : 'mapHandle',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClick3DDefaultMap' } },
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/reach_menu01_on.png',
			btnOffImg: './resources/images/button/reach_menu01.png',
			src: './resources/images/button/reach_menu01_on.png'
		},{
			xtype: 'image',
			id: 'btnDEMMap',
			title: 'DEM',
			groupId : 'mapHandle',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickDEM' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu22_on.png',
			btnOffImg: './resources/images/button/reach_menu22.png',
			src: './resources/images/button/reach_menu22.png'
		},{
			xtype: 'image',
			id: 'btnAutoMoveMap',
			title: '경로탐색',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickAutoMoveMap' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu23_on.png',
			btnOffImg: './resources/images/button/reach_menu23.png',
			src: './resources/images/button/reach_menu23.png'
		}, {
			xtype: 'container',
			id: 'threeDimgabToolbarContainer',
			width: 10
		}, {
			xtype: 'image',
			id: 'btnThreeDimReachLayer',
			layerId: '40',
			title: '리치노드',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {el: {click: 'onClickReachLayer'	}},
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/reach_menu20_on.png',
			btnOffImg: './resources/images/button/reach_menu20.png',
			src: './resources/images/button/reach_menu20_on.png'
		}, {
			xtype: 'image',
			id: 'btnThreeDimAreaLayer',
			layerId: '38',
			title: '집수구역',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {el: {click: 'onClickReachLayer'	}},
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu12_on.png',
			btnOffImg: './resources/images/button/reach_menu12.png',
			src: './resources/images/button/reach_menu12.png'
		}, {
			xtype: 'image',
			id: 'btnThreeDimReachLineLayer',
			layerId: '39',
			title: '리치라인',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {el: {click: 'onClickReachLayer'	}},
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/reach_menu13_on.png',
			btnOffImg: './resources/images/button/reach_menu13.png',
			src: './resources/images/button/reach_menu13_on.png'
		}, {
			xtype: 'image',
			id: 'btnThreeDimSaveLayer',
			groupId: 'grpArea',
			title: '저장',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickSave' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu16.png',
			btnOffImg: './resources/images/button/reach_menu16.png',
			src: './resources/images/button/reach_menu16.png'
		}];
		this.callParent();
	}
});
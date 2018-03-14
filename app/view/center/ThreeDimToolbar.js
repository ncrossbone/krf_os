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
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu08_on.png',
			btnOffImg: './resources/images/button/reach_menu08.png',
			src: './resources/images/button/reach_menu08.png'
		}, {
			xtype: 'button',
			id: 'btn3DDefaultMap',
			btnOnOff: 'off',
			text: 'DEM',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClick3DDefaultMap' } }
		}, {
			xtype: 'button',
			id: 'btnDEMMap',
			btnOnOff: 'off',
			text: 'DEM',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickDEM' } }
		}, {
			xtype: 'button',
			id: 'btnAutoMoveMap',
			btnOnOff: 'off',
			text: '경로탐색',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickAutoMoveMap' } }
		},{
			xtype: 'image',
			id: 'btnThreeDimReachLayer',
			layerId: '54',
			groupId: 'grpReach',
			title: '리치노드',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {
				el: {
					click: function (obj, el, evt) {
						
					}
				}
			},
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/reach_menu13_on.png',
			btnOffImg: './resources/images/button/reach_menu13.png',
			src: './resources/images/button/reach_menu13_on.png'
		}, {
			xtype: 'image',
			id: 'btnThreeDimAreaLayer',
			groupId: 'grpArea',
			layerId: '56',
			title: '집수구역',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {
				el: {
					click: function (obj, el, evt) {
						
					}
				}
			},
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu12_on.png',
			btnOffImg: './resources/images/button/reach_menu12.png',
			src: './resources/images/button/reach_menu12.png'
		},{
			xtype: 'image',
			id: 'btnThreeDimReachLayer',
			layerId: '55',
			groupId: 'grpReach',
			title: '리치라인',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {
				el: {
					click: function (obj, el, evt) {
						
					}
				}
			},
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
			btnOnImg: './resources/images/button/reach_menu12_on.png',
			btnOffImg: './resources/images/button/reach_menu12.png',
			src: './resources/images/button/reach_menu12.png'
		}];
		this.callParent();
	}
});
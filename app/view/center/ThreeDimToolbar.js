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
	itemWidth: 102,
	itemHeight: 74,

	height: 74,
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
			id: 'btnDEMMap',
			btnOnOff: 'on',
			text: 'DEM',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickDEM' } }
		}, {
			xtype: 'button',
			id: 'btnAutoMoveMap',
			btnOnOff: 'on',
			text: '경로탐색',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickAutoMoveMap' } }
		}];
		this.callParent();
	}
});
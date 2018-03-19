/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimButtonPanel', {
	extend: 'Ext.toolbar.Toolbar',
	requires: [
		'krf_new.view.search.threeDim.ThreeDimButtonPanelController',
		'krf_new.view.search.threeDim.ThreeDimMeasuredWindow'
	],

	xtype: 'threeDim-west-buttonpanel',

	title: '화면제어판',

	/* 사이즈 지정 */
	itemWidth: 90,
	width: 90,

	/* 사이즈 지정 끝 */

	border: 0,

	cls: 'x-toolbar-default-west-khLee',

	controller: 'threeDimButtonpanel',

	onClickListener: {
		el: {
			click: 'onClickButton'
		}
	},

	layout: {
		type: 'vbox',
		align: 'center'
	},

	initComponent: function () {

		this.items = [{
			xtype: 'image',
			id: 'btnSearchAreaThreeDim',
			groupId: 'group1',
			title: '위치검색',//위치검색
			style: 'left: 0px !important;',
			width: this.itemWidth,
			height: 69,
			//listeners: this.onClickListener,
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/left_menu01_on.png',
			btnOffImg: './resources/images/button/left_menu01_on.png',
			//src: './resources/images/button/left_menu01_on.png'
			src: './resources/images/button/left_menu01_on.png'
		}, {
			xtype: 'image',
			id: 'btnLayerThreeDim',
			groupId: 'group1',//onClickLayer
			title: '주제도선택',
			style: 'left: 0px !important;',
			width: this.itemWidth,
			height: 44,
			//listeners: this.onClickListener,
			listeners: { el: { click: 'onClickLayer' } },
			//listeners: { el: { click: 'onClickLayer' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/left_menu02_on.png',
			btnOffImg: './resources/images/button/left_menu02.png',
			src: './resources/images/button/left_menu02.png'
		},{
			xtype: 'image',
			id: 'btnMeasuredWindow',
			groupId: 'group2',
			isOnOff: 'off',
			title: '측정값',
			style: 'left: 0px !important;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickMeasuredValue' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/left_menu09_on.png',
			btnOffImg: './resources/images/button/left_menu09.png',
			src: './resources/images/button/left_menu09.png'
		}];

		this.callParent();
	}
});
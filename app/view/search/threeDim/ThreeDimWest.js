/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimWest', {
	extend: 'Ext.panel.Panel',
	requires: [
		'krf_new.view.search.threeDim.ThreeDimSearchArea',
		'krf_new.view.search.threeDim.ThreeDimLayer01'
	],
	xtype: 'app-threeDim-west',

	initWidth: 300,
	width: 300,
	//    collapsible: true,
	//    split: true,
	//    splitterResize:false,
	header: false,
	//    placeholder: new Object(undefined), // 패널 닫혔을때 제목 없애기..

	//    cls: 'khLee-x-body khLee-x-spliter-collapse',

	layout: {
		type: 'border'
	},

	items: [{
		xtype: 'container',
		id: 'threeDimWestContents',
		activeItem: 1,
		region: 'center',
		layout: {
			type: 'card'
		},
		items: [{
			xtype: 'threeDim-west-Layer01'
		}, {
			xtype: 'threeDim-west-searchArea'
		}]
	}],

	preWidth: 300,

	listeners: {
		resize: {
			fn: function (el) {
			}
		},
		collapse: {
			fn: function (el) {
			}
		},
		expand: {
			fn: function (el) {
			}
		}
	},

	initComponent: function () {
		this.callParent();
	}
});
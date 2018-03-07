/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea', {

	extend: 'Ext.panel.Panel',

	xtype: 'threeDim-west-searchArea',
	requires: [
		'krf_new.view.search.threeDim.ThreeDimSearchArea_Button'
	],
	//	title: '위치 검색',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'container',
		layout: {
			type: 'fit',
			align: 'center'
		},
		items: [{
			xtype: 'west-threeDimSearchArea_Button'
		}]
	}, {
		xtype: 'container',
		id: 'searchThreeDimAreaContents',
		layout: {
			type: 'card'
		},
		items: [{
			xtype: 'west-threeDimSearchArea_Water'
		}, {
			xtype: 'west-threeDimSearchArea_ADM'
		}
			, {
			xtype: 'west-threeDimSearchArea_Name'
		}
			, {
			xtype: 'container',
			items: [{
				xtype: 'west-threeDimSearchArea_Name_Rich'
			}, {
				xtype: 'west-threeDimSearchArea-list_Total'
			}, {
				xtype: 'west-threeDimSearchArea-list'
			}]
		}]
	}],

	listeners: {

		resize: function () {
		}
	}
});
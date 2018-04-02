/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.search.West', {
	extend: 'Ext.panel.Panel',
	requires: [
		'krf_new.view.search.SearchArea',
		'krf_new.view.search.Layer01'
	],
	xtype: 'app-default-west',

	initWidth: 300,
	width: 300,

	//    title: '화면 제어판',
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
		id: 'westContents',
		activeItem: 1,
		region: 'center',
		layout: {
			type: 'card'
		},
		items: [{
			xtype: 'west-Layer01',
			region: 'center'
		},
		{
			xtype: 'west-searchArea'

		}]
	}],
	preWidth: 300,

	listeners: {
	},

	initComponent: function () {
		this.callParent();
		//$KRF_APP.addListener($KRF_EVENT.LAYER_SET_COMBO_SET_VALUE, this.layerComboSetValue, this);
	},
	layerComboSetValue: function (param) {
		//Ext.getCmp('cmbLayerList').setSelection(parseInt(param.layerSetId));
	}
});
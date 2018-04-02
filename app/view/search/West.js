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
			xtype: 'panel', layout: 'border', items: [{
				xtype: 'container',
				region: 'north',
				style: 'background: #f8f8f8; padding: 5px; border-bottom: 1px solid #d8d8d8;',
				height: 35,
				items: [{
					id: 'cmbLayerList',
					xtype: 'combo',
					cls: 'khLee-x-form-item-label-default',
					fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit"  /> <b>주제도</b> ',
					labelWidth: 60,
					labelAlign: 'right',
					labelPad: 10,
					width: 225,
					editable: false,
					store: Ext.create('krf_new.store.west.LayerSetStore', { autoLoad: true }),
					displayField: 'layerSetName',
					valueField: 'layerSetId',
					listeners: {
						afterrender: function () {
							this.setSelection(parseInt($KRF_APP.USER_LAYERS.layerSetId));
							$('#cmbLayerList-inputEl').val($KRF_APP.USER_LAYERS.layerSetName);
						},
						change: function (combo, newValue, oldValue, eOpts) {
							var selectedRecord = combo.getSelectedRecord();
							if (selectedRecord) {

								layerSetInfo = selectedRecord.data;

								if ($KRF_APP.USER_LAYERS.layerSetId != layerSetInfo.layerSetId) {
									$KRF_APP.USER_LAYERS = layerSetInfo;
									if (typeof (layerSetInfo.layerSetIds) == 'string') {
										$KRF_APP.USER_LAYERS.layerSetIds = JSON.parse(layerSetInfo.layerSetIds);
									}

									Ext.getCmp('layer01').fireEvent('afterrender');

									var threeDimLayer = Ext.getCmp('threeDimLayer01');
									if (threeDimLayer) {
										threeDimLayer.fireEvent('afterrender');
										$('#cmbThreeDimLayerList-inputEl').val($KRF_APP.USER_LAYERS.layerSetName);
									}
								}
							}
						}
					}
				}]
			}, {
				xtype: 'west-Layer01',
				region: 'center'
			}]
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
		$KRF_APP.addListener($KRF_EVENT.LAYER_SET_COMBO_SET_VALUE, this.layerComboSetValue, this);
	},
	layerComboSetValue: function (param) {
		Ext.getCmp('cmbLayerList').setSelection(parseInt(param.layerSetId));
	}
});
/*
 * 수계로 찾기 검색 페이지
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_Water', {

	extend: 'Ext.panel.Panel',

	xtype: 'west-threeDimSearchArea_Water',

	controller: 'threeDimSearchArea_WaterController',

	title: '수계로 찾기',

	autoScroll: true,

	cls: 'khLee-x-searcharea-water',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'form',
		cls: 'khLee-x-form',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				id: 'cmbThreeDimWater1',
				layerId: '62',
				xtype: 'combo',
				tarCmbId: 'cmbThreeDimWater2',
				lnkBtnId: 'btnThreeDimWater1',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>대권역</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
				editable: false,
				store: Ext.create('krf_new.store.west.ThreeDimSearchArea_Water'),
				displayField: 'name',
				valueField: 'id'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnThreeDimWater1',
				lnkCmbId: 'cmbThreeDimWater1',
				disabled: true,
				cls: 'khLee-x-button-move'
			}]
		}, {
			xtype: 'container',
			height: 7
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				id: 'cmbThreeDimWater2',
				layerId: '63',
				xtype: 'combo',
				tarCmbId: 'cmbThreeDimWater3',
				lnkBtnId: 'btnThreeDimWater2',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>중권역</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
				editable: false,
				store: Ext.create('krf_new.store.west.ThreeDimSearchArea_Water'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnThreeDimWater2',
				lnkCmbId: 'cmbThreeDimWater2',
				cls: 'khLee-x-button-move'
			}]
		}, {
			xtype: 'container',
			height: 7
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				id: 'cmbThreeDimWater3',
				layerId: '64',
				xtype: 'combo',
				tarCmbId: '',
				lnkBtnId: 'btnThreeDimWater3',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>소권역</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
				editable: false,
				store: Ext.create('krf_new.store.west.ThreeDimSearchArea_Water'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnThreeDimWater3',
				lnkCmbId: 'cmbThreeDimWater3',
				cls: 'khLee-x-button-move'
			}]
		}, {
			xtype: 'container',
			height: 17
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'end',
				pack: 'middle'
			},
			items: [{
				xtype: 'button',
				id: 'btnThreeDimWaterReset',
				cls: 'khLee-x-button-reset'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnThreeDimWaterSelect',
				cls: 'khLee-x-button-select'
			}]
		}, {
			xtype: 'container',
			height: 7
		}]
	}]
});
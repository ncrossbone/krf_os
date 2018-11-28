/*
 * 수계로 찾기 검색 페이지
 */
Ext.define('krf_new.view.search.SearchArea_Water', {

	extend: 'Ext.panel.Panel',

	xtype: 'west-searchArea_Water',

	controller: 'searchArea_WaterController',

	autoScroll: true,

	cls: 'khLee-x-searcharea-water',

	header: { cls: 'sub-panel-x-header', title: '<span class="sub-panel-header-text">수계로 찾기</span>' },

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
				id: 'cmbWater1',
				layerId: $KRF_DEFINE.areaWSLayerId,
				xtype: 'combo',
				tarCmbId: 'cmbWater2',
				lnkBtnId: 'btnWater1',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>대권역</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 225,
				editable: false,
				store: Ext.create('krf_new.store.west.SearchArea_Water'),
				displayField: 'name',
				valueField: 'id'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnWater1',
				lnkCmbId: 'cmbWater1',
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
				id: 'cmbWater2',
				layerId: $KRF_DEFINE.areaAMLayerId,
				xtype: 'combo',
				tarCmbId: 'cmbWater3',
				lnkBtnId: 'btnWater2',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>중권역</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 225,
				editable: false,
				store: Ext.create('krf_new.store.west.SearchArea_Water'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnWater2',
				lnkCmbId: 'cmbWater2',
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
				id: 'cmbWater3',
				layerId: $KRF_DEFINE.areaASLayerId,
				xtype: 'combo',
				tarCmbId: '',
				lnkBtnId: 'btnWater3',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>소권역</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 225,
				editable: false,
				store: Ext.create('krf_new.store.west.SearchArea_Water'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnWater3',
				lnkCmbId: 'cmbWater3',
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
				id: 'cmbWater4',
				layerId: $KRF_DEFINE.areaBOLayerId,
				xtype: 'combo',
				lnkBtnId: 'btnWater4',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>보</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 225,
				editable: false,
				store: Ext.create('krf_new.store.west.SearchArea_Water'),
				displayField: 'name',
				valueField: 'id',
				disabled: false
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnWater4',
				lnkCmbId: 'cmbWater4',
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
				id: 'btnWaterReset',
				cls: 'khLee-x-button-reset'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnWaterSelect',
				cls: 'khLee-x-button-select'
			}]
		}]
	}]
});
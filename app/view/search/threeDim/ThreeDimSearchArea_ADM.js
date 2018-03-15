/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_ADM', {

	extend: 'Ext.panel.Panel',

	xtype: 'west-threeDimSearchArea_ADM',

	controller: 'threeDimSearchArea_ADMController',

	header: { cls: 'sub-panel-x-header', title: '<span class="sub-panel-header-text">행정구역으로 찾기</span>' },

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
				id: 'cmbThreeDimArea1',
				layerId: $KRF_DEFINE.admSidoLayerId,
				xtype: 'combo',
				tarCmbId: 'cmbThreeDimArea2',
				lnkBtnId: 'btnThreeDimSearch1',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>시　도</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 225,
				store: Ext.create('krf_new.store.west.SearchArea_ADM'),
				editable: false,
				displayField: 'name',
				valueField: 'id'
			}, {
				xtype: 'container',
				width: 10
			}, {
				id: 'btnThreeDimSearch1',
				xtype: 'button',
				lnkCmbId: 'cmbThreeDimArea1',
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
				id: 'cmbThreeDimArea2',
				layerId: $KRF_DEFINE.admSigunguLayerId,
				xtype: 'combo',
				tarCmbId: 'cmbThreeDimArea3',
				lnkBtnId: 'btnThreeDimSearch2',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>시군구</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 225,
				store: Ext.create('krf_new.store.west.SearchArea_ADM'),
				editable: false,
				displayField: 'name',
				valueField: 'id',
				disabled: true
			}, {
				xtype: 'container',
				width: 10
			}, {
				id: 'btnThreeDimSearch2',
				xtype: 'button',
				lnkCmbId: 'cmbThreeDimArea2',
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
				id: 'cmbThreeDimArea3',
				layerId: $KRF_DEFINE.admDongLayerId,
				xtype: 'combo',
				tarCmbId: '',
				lnkBtnId: 'btnThreeDimSearch3',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit" /> <b>읍면동</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 225,
				store: Ext.create('krf_new.store.west.SearchArea_ADM'),
				editable: false,
				displayField: 'name',
				valueField: 'id',
				disabled: true
			}, {
				xtype: 'container',
				width: 10
			}, {
				id: 'btnThreeDimSearch3',
				xtype: 'button',
				lnkCmbId: 'cmbThreeDimArea3',
				disabled: true,
				cls: 'khLee-x-button-move'
			}]
		}/*, {
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
				id: 'btnThreeDimADMReset',
				cls: 'khLee-x-button-reset'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnThreeDimADMSelect',
				cls: 'khLee-x-button-select'
			}]
		}*/]
	}]
});
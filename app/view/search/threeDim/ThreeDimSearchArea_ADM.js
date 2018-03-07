/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_ADM', {

	extend: 'Ext.panel.Panel',

	xtype: 'west-threeDimSearchArea_ADM',

	controller: 'threeDimSearchArea_ADMController',

	title: '행정구역으로 찾기',

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
				xtype: 'combo',
				tarCmbId: 'cmbThreeDimArea2',
				lnkBtnId: 'btnThreeDimSearch1',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>시　도</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
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
				xtype: 'combo',
				tarCmbId: 'cmbThreeDimArea3',
				lnkBtnId: 'btnThreeDimSearch2',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>시군구</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
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
				xtype: 'combo',
				tarCmbId: '',
				lnkBtnId: 'btnThreeDimSearch3',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>읍면동</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
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
		}]
	}]
});
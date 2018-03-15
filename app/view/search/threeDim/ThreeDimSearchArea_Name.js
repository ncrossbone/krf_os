/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_Name', {

	extend: 'Ext.panel.Panel',

	xtype: 'west-threeDimSearchArea_Name',

	controller: 'threeDimSearchArea_NameController',

	header: { cls: 'sub-panel-x-header', title: '<span class="sub-panel-header-text">명칭으로 찾기</span>' },

	autoScroll: true,

	cls: 'khLee-x-searcharea-water',

	layout: {
		type: 'vbox',
		align: 'middle'
	},

	items: [{
		xtype: 'container',
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
					id: 'nameThreeDimSearch',
					xtype: 'label',
					cls: 'khLee-x-label-default',
					html: '<img src="./resources/images/button/blit_st_01.png" /> <b>명　칭</b> : ',
					width: 70
				}, {
					id: 'textThreeDimSearchText',
					xtype: 'textfield',
					displayField: 'name',
					valueField: 'id',
					width: 120
				}, {
					xtype: 'container',
					width: 10
				}, {
					id: 'btnThreeDimSearchText',
					xtype: 'button',
					lnkCmbId: 'nameThreeDimSearch',
					cls: 'khLee-x-button-search'
				}]
			}]
		}]
	}]
});
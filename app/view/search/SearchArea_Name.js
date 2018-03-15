/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.SearchArea_Name', {

	extend: 'Ext.panel.Panel',

	xtype: 'west-searchArea_Name',

	controller: 'searchArea_NameController',

	autoScroll: true,

	cls: 'khLee-x-searcharea-water',

	header: { cls: 'sub-panel-x-header', title: '<span class="sub-panel-header-text">명칭으로 찾기</span>' },

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
					id: 'textSearchText',
					xtype: 'textfield',
					displayField: 'name',
					valueField: 'id',
					fieldLabel: '<img src="./resources/images/button/blit.gif" class="cmbBlit"  /> <b>명  칭</b> ',
					labelWidth: 60,
					labelAlign: 'right',
					labelPad: 10,
					width: 220
				}, {
					xtype: 'container',
					width: 10
				}, {
					id: 'btnSearchText',
					xtype: 'button',
					lnkCmbId: 'nameSearch',
					cls: 'khLee-x-button-search'
				}]
			}]
		}]
	}]
});
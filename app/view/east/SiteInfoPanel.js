Ext.define('krf_new.view.east.SiteInfoPanel', {
	extend: 'Ext.panel.Panel',

	xtype: 'east-siteinfopanel',

	id: 'siteInfoPanel',

	title: '지점 정보',
	header: false,

	layout: {
		type: 'fit'
	},

	//bodyStyle: 'background-color: white;',
	cls: 'khLee-window-panel-header khLee-x-window-default ',

	width: 450,
	height: 300,

	items: [{
		xtype: 'grid',
		id: 'siteinfotest',
		plugins: 'gridfilters',
		cls: 'khLee-x-column-header-text',
		height: 215,
		header: {
			height: 5
		},
		filter: {
			value: 1,    // 0 is false, 1 is true
			active: true // turn on the filter
		},
		title: '검색결과',
		header: false,

		//store: 'KRF_DEV.store.east.SiteInfoPanel',
		//store: Ext.create('KRF_DEV.store.east.SiteInfoPanel'),
		columns: [{
			text: '구분',
			dataIndex: 'column',
			menuDisabled: true,
			//width: 150
			width: "40%"
		}, {
			text: '내용',
			dataIndex: 'cont',
			menuDisabled: true,
			//width: 240
			width: "60%"
		}]
	}, {
		xtype: 'panel',
		id: 'siteInfoForE',
		hidden: true,
		layout: 'hbox',
		style: 'padding: 30px 10px 10px;',
		items: [{
			xtype: 'container',
			layout: 'vbox',
			items: [{
				xtype: 'container',
				layout: 'hbox',
				items: [{
					xtype: 'label',
					style: 'font-weight: bold; margin-top: 3px;',
					text: '생물분류군:'
				}, {
					xtype: 'container',
					width: 20
				}, {
					xtype: 'combo',
					width: 70,
					editable: false,
					valueField: 'id',
					displayField: 'name',
					value: 'fish',
					id: 'sstgSiteInfoItem',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{ id: 'fish', name: '어류' }
						]
					})
				}]
			}, {
				xtype: 'container',
				height: 10
			}, {
				xtype: 'container',
				layout: 'hbox',
				items: [{
					xtype: 'label',
					style: 'font-weight: bold; margin-top: 3px; margin-left: 13px;',
					text: '조사년도:'
				}, {
					xtype: 'container',
					width: 20
				}, {
					xtype: 'combo',
					width: 80,
					valueField: 'id',
					displayField: 'name',
					editable: false,
					value: '2017',
					id: 'sstgSiteInfoYear',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{ id: '2015', name: '2015년' }
							, { id: '2016', name: '2016년' }
							, { id: '2017', name: '2017년' }
							, { id: '2018', name: '2018년' }
							, { id: '2019', name: '2019년' }
						]
					}),
					listeners: {
						change: function () {
							$KRF_APP.global.CommFn.siteInfoComboChangeEvent();
						}
					}
				}, {
					xtype: 'container',
					width: 5
				}, {
					xtype: 'combo',
					width: 80,
					editable: false,
					valueField: 'id',
					displayField: 'name',
					value: '1',
					id: 'sstgSiteInfoTme',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{ id: '1', name: '1회차' }
							, { id: '2', name: '2회차' }
						]
					}),
					listeners: {
						change: function () {
							$KRF_APP.global.CommFn.siteInfoComboChangeEvent();
						}
					}
				}]
			}, {
				xtype: 'container',
				height: 15
			}, {
				xtype: 'container',
				layout: 'hbox',
				items: [{
					xtype: 'label',
					style: 'font-weight: bold; margin-left: 28px;',
					text: '지점명:'
				}, {
					xtype: 'container',
					width: 20
				}, {
					xtype: 'label',
					id: 'siteInfoSstgNm',
					code: ''
				}]
			}, {
				xtype: 'container',
				height: 20
			}, {
				xtype: 'container',
				layout: 'hbox',
				items: [{
					xtype: 'label',
					style: 'font-weight: bold; margin-left: 28px;',
					text: '수계명:'
				}, {
					xtype: 'container',
					width: 20
				}, {
					xtype: 'label',
					id: 'siteInfoSstgWtNm'
				}]
			}, {
				xtype: 'container',
				height: 20
			}, {
				xtype: 'container',
				layout: 'hbox',
				items: [{
					xtype: 'label',
					style: 'font-weight: bold; margin-left: 42px;',
					text: '주소:'
				}, {
					xtype: 'container',
					width: 20
				}, {
					xtype: 'label',
					id: 'siteInfoSstgAddr'
				}]
			}]
		}, {
			xtype: 'image',
			id: 'sstgInfoImage',
			src: './resources/images/sstg/-.png',

		}],
		html: '<div style="right: 95px; position: absolute; top: 75px; font-size: 11px; width: 30px; text-align: center;">' +
			'<a id="sstgInfoTxt"></a>' +
			'<a id="sstgInfoNum"></a>' +
			'</div>'
	}],
	listeners: {
		activate: function () {
			$KRF_APP.global.CommFn.siteInfoChangeEventForE();
		}
	},
	initComponent: function () {
		this.callParent();

	}

});
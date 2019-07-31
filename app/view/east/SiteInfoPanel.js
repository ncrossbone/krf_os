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
		layout: 'vbox',
		style: 'padding:10px;',
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
				style: 'font-weight: bold; margin-top: 3px;',
				text: '조사년도:'
			}, {
				xtype: 'container',
				width: 20
			}, {
				xtype: 'combo',
				width: 80,
				valueField: 'id',
				displayField: 'name',
				value: '2016',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: '2016', name: '2016년' }
						, { id: '2017', name: '2017년' }
						, { id: '2018', name: '2018년' }
						, { id: '2019', name: '2019년' }
					]
				})
			}, {
				xtype: 'container',
				width: 5
			}, {
				xtype: 'combo',
				width: 80,
				valueField: 'id',
				displayField: 'name',
				value: '1',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{ id: '1', name: '1회차' }
						, { id: '2', name: '2회차' }
					]
				})
			}]
		}, {
			xtype: 'container',
			height: 15
		}, {
			xtype: 'container',
			layout: 'hbox',
			items: [{
				xtype: 'label',
				style: 'font-weight: bold',
				text: '지점명:'
			}, {
				xtype: 'container',
				width: 20
			}, {
				xtype: 'label',
				text: 'test'
			}]
		}, {
			xtype: 'container',
			height: 15
		}, {
			xtype: 'container',
			layout: 'hbox',
			items: [{
				xtype: 'label',
				style: 'font-weight: bold',
				text: '수계명:'
			}, {
				xtype: 'container',
				width: 20
			}, {
				xtype: 'label',
				text: 'test'
			}]
		}, {
			xtype: 'container',
			height: 13
		}, {
			xtype: 'container',
			layout: 'hbox',
			items: [{
				xtype: 'label',
				style: 'font-weight: bold',
				text: '주소:'
			}, {
				xtype: 'container',
				width: 20
			}, {
				xtype: 'label',
				text: 'test'
			}]
		}]
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
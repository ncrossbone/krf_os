Ext.define('krf_new.view.common.FileTabControl', {

	extend: 'Ext.panel.Panel',


	requires: ['krf_new.view.common.FileTabControlController'],

	xtype: 'common-filetabcontrol',

	controller: 'FileTabControlController', 

	id: 'fileTabControl',

	gridId: null,
	header: false,

	items: [{
		xtype: 'container',
		id: "fileTabCondition",
		//title: 'test',
		layout: {
			type: 'hbox',
			align: 'middle',
			pack: 'end'
		},
		height: 35,
		items: [{
			xtype: 'container',
			id: 'resultFileTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
				},
				flex: 1,
				height: 30,
				items: [ {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'fileStartYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'fileStartMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'fileEndYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'fileEndMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'textareafield',
				id: 'fileTextField',
				width: 300,
				height: 25
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function () {
							var boCode = "";
							var searchType = "";
							//Ext.getCmp("filetabpanels").isVisible()
							if(Ext.getCmp("filetabpanels").isVisible()){
								boCode = Ext.getCmp(Ext.getCmp("filetabpanels").activeTab.id).gridId;
								searchType = 1;
							}else if(Ext.getCmp("viewtabpanels").isVisible()){
								boCode = Ext.getCmp(Ext.getCmp("viewtabpanels").activeTab.id).gridId;
								searchType = 2;
							}
							//var fileTextField = Ext.getCmp("fileTextField").value;

							ShowFileSearchResult(boCode,'',searchType);
							
						}
					}
				}
			}]
		}]
	},{
		xtype: 'tabpanel',
		id: 'filetabpanels',
		//title: 'tab1',
		tabBar: {
			style: 'background:#fff; padding:5px;'
		},
		style: 'background-color: #157fcb;',
		//closable: true,
		cls: 'khLee-tab-active khLee-tab-unselectable khLee-tab',
		listeners: {
			'tabchange': function (tabPanel, tab) {
				$KRF_APP.global.CommFn.fileTabComboBindDate(tab.items.items[0].items.items[0].getStore());
			}
		}
	},{
		xtype: 'tabpanel',
		id: 'viewtabpanels',
		hidden : true,
		//title: 'tab1',
		tabBar: {
			style: 'background:#fff; padding:5px;'
		},
		style: 'background-color: #157fcb;',
		//closable: true,
		cls: 'khLee-tab-active khLee-tab-unselectable khLee-tab',
		listeners: {
			'tabchange': function (tabPanel, tab) {
				$KRF_APP.global.CommFn.fileTabComboBindDate(tab.items.items[0].items.items[0].getStore());
			}
		}
	}, {
		xtype: 'button',
		id: 'buttonSelect',
		text : '선택 다운로드',
		width: 107,
		height: 26,
		style: 'top: 5px; z-index: 2; right: 127px; position:absolute; cursor:pointer; padding: 4px 10px; background: #347ada; border: 1px solid #1459b9; color: #fff; font-weight: bold; letter-spacing: -1px; font-size: 11px; font-family: Dotum;',
		listeners: {
			el: {
				click: function () {
					
					$KRF_APP.global.CommFn.fileDownloadButton('select');
					
				}
			}
		}
	}, {
		xtype: 'button',
		text: '전체 다운로드',
		id: 'buttonSelectAll',
		width: 107,
		height: 26,
		style: 'top: 5px; z-index: 2; right: 10px; position:absolute; cursor:pointer; padding: 4px 10px; background: #34afda; border: 1px solid #148db9; color: #fff; font-weight: bold; letter-spacing: -1px; font-size: 11px; font-family: Dotum;',
		listeners: {
			el: {
				click: function () {
					
					$KRF_APP.global.CommFn.fileDownloadButton('all');
					
				}
			}
		}
	}]
});
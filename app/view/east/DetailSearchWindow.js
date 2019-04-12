Ext.define('krf_new.view.east.DetailSearchWindow', {
	extend: 'Ext.window.Window',

	require: ([
		'Ext.form.Panel',
		'Ext.ux.form.MultiSelect',
		'Ext.ux.form.ItemSelector', 
		'Ext.tip.QuickTipManager',
		'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager',
        'Ext.field.DatePicker',
        'Ext.ux.MonthPickerPlugin'
	]),

	xtype: 'east-detailSearchWindow',
	id: 'detailSearchWindow',
	title: '상세검색',
	
	width: 520,
	height: 805,

	closable: true,
	constrain: true,
	minimizable: true,
	onEsc: false,
	header: { cls: 'subWindow-x-form-item-label-default' },
	cls: 'subWindow-x-form-item-label-default',
	
	layout: {
		type: 'vbox'
	},
	items: [{
		xtype:'label',
		text:'검색 반경'
	},{
		xtype: "container",
		layout: {
			type: "hbox"
		},
		items:[{
			xtype: 'textfield',
			fieldLabel: '<b>반경 설정</b> ',
		},{
			xtype:'label',
			text:'m'
		}]
	},{
		xtype:'label',
		text:'범위 설정',
	},{
		xtype:'container',
		layout: {
			typeP: 'hbox'
		},
		items:[{
            xtype: 'fieldcontainer',
            fieldLabel: '범위설정',
            itemId : 'rangeSetting',
            id: 'rangeSetting',
            defaultType: 'checkboxfield',
            listeners : {
                customEvent  : function(checkboxToExclude, me){
                    // listen to the custom event
                    var checkboxes = me.query('checkboxfield');
                    for(var i = 0; i<checkboxes.length;i++){
                        var checkbox = checkboxes[i];
                        if(checkbox != checkboxToExclude)
                            checkbox.setValue(0);
                    }
                    
                }
			},
			layout: {
				type: 'hbox'
			},
            items: [{
                    boxLabel  : '전체',
                    name      : 'rangeAll',
                    inputValue: 'all',
                    id        : 'rangeCheckbox1',
                    checked   : true,
                    listeners : {
                        change : function(cmp, newVal){
                            if(newVal){
                                // fire the custom event
                                var parent = Ext.ComponentQuery.query('#rangeSetting')[0];
                                parent.fireEvent('customEvent',cmp, parent )
                            }
                        }
                    }
                }, {
                    boxLabel  : '동일 중권역',
                    name      : 'range2',
                    inputValue: 'MB_ID',
                    id        : 'rangeCheckbox2',
                    listeners : {
                        change : function(cmp, newVal){
                            if(newVal){
                                var parent = Ext.ComponentQuery.query('#rangeSetting')[0];
                                parent.fireEvent('customEvent',cmp, parent )
                            }
                        }
                    }
                }, {
                    boxLabel  : '동일 표준유역',
                    name      : 'range3',
                    inputValue: 'SB_ID',
                    id        : 'rangeCheckbox3',
                    listeners : {
                        change : function(cmp, newVal){
                            if(newVal){
                                var parent = Ext.ComponentQuery.query('#rangeSetting')[0];
                                parent.fireEvent('customEvent',cmp, parent )
                            }
                        }
                    }
                }, {
                    boxLabel  : '동일 집수구역',
                    name      : 'range4',
                    inputValue: 'CAT_ID',
                    id        : 'rangeCheckbox4',
                    listeners : {
                        change : function(cmp, newVal){
                            if(newVal){
                                var parent = Ext.ComponentQuery.query('#rangeSetting')[0];
                                parent.fireEvent('customEvent',cmp, parent )
                            }
                        }
                    }
                }
            ]
        }]
	},{
		xtype:'container',
		layout: {
			type: 'hbox'
		},
		items:[{
            xtype: 'fieldcontainer',
            fieldLabel: '상 하류 설정',
            itemId : 'udRiverSetting',
            id: 'udRiverSetting',
            defaultType: 'checkboxfield',
            listeners : {
                customEvent  : function(checkboxToExclude, me){
                    // listen to the custom event
                    var checkboxes = me.query('checkboxfield');
                    for(var i = 0; i<checkboxes.length;i++){
                        var checkbox = checkboxes[i];
                        if(checkbox != checkboxToExclude)
                            checkbox.setValue(0);
                    }
                    
                }
			},
			layout: {
				type: 'hbox'
			},
            items: [{
                    boxLabel  : '전체',
                    name      : 'udRiverAll',
                    inputValue: 'all',
                    id        : 'udRivercheckbox1',
                    checked   : true,
                    listeners : {
                        change : function(cmp, newVal){
                            if(newVal){
                                // fire the custom event
                                var parent = Ext.ComponentQuery.query('#udRiverSetting')[0];
                                parent.fireEvent('customEvent',cmp, parent )
                            }
                        }
                    }
                }, {
                    boxLabel  : '상류',
                    name      : 'udRiver2',
                    inputValue: 'up',
                    id        : 'udRiverCheckbox2',
                    listeners : {
                        change : function(cmp, newVal){
                            if(newVal){
                                var parent = Ext.ComponentQuery.query('#udRiverSetting')[0];
                                parent.fireEvent('customEvent',cmp, parent )
                            }
                        }
                    }
                }, {
                    boxLabel  : '하류',
                    name      : 'unRiver3',
                    inputValue: 'down',
                    id        : 'udRivercheckbox3',
                    listeners : {
                        change : function(cmp, newVal){
                            if(newVal){
                                var parent = Ext.ComponentQuery.query('#udRiverSetting')[0];
                                parent.fireEvent('customEvent',cmp, parent )
                            }
                        }
                    }
                }
            ]
        }]
	},{
		xtype:'container',
		layout:{
			type:'hbox'
		},
		items:[{
			xtype:'label',
			text:'기간'
		},{
            xtype: 'monthpicker',
            label: 'Birthday',
            id: 'startDatepicker'
        },{
			xtype:'label',
			text:'~'
		}]
	},{
		xtype:'button',
		text:'상세 설정'
	},{
		xtype:'label',
		text:'참조정보 선택'
	},{
		xtype:'container',
		layout:{
			xtype:'hbox'
		},
		items:[{
            xtype: 'itemselector',
            name: 'itemselector',
            id: 'itemselector',
            anchor: '100%',
            fieldLabel: '참조정보 선택',
            imagePath: '../ux/images/',
            store: Ext.create('Ext.data.Store', {
				fields: ['value', 'text'],
				data: [],
				stype: 'json'
			}),
            displayField: 'text',
            valueField: 'value',
            value: ['3', '4', '6'],
            allowBlank: false,
            msgTarget: 'side',
            fromTitle: '목록',
            toTitle: '선택'
        }]
	},{
		xtype:'button',
        text:'적용',
        listeners:{
            click:function(){
                var popSiteInfo = Ext.getCmp('popSiteInfo');
                console.info(popSiteInfo)
                if(popSiteInfo.point){
                    $KRF_APP.coreMap._krad.radiusDrawEvent(popSiteInfo.point);
                }
                
            }
        }
	}]
});
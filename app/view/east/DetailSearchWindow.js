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
        'Ext.ux.MonthPickerPlugin',
        'Ext.picker.Month'
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
            id:'detailRadiusValue',
            maskRe: /[0-9.]/,
			fieldLabel: '<b>반경 설정</b> ',
		},{
			xtype:'label',
			text:'Km'
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
            xtype:'textfield',
            id: 'detailSearchStartDate',
            readOnly: true,
            handleMouseEvents: true,
            listeners:{
                click:function(){
                    
                },
                'render': function(cmp) { 
                    this.getEl().on('click', function(){
                        detailDateSearchWindow('detailSearchStartDate');
                        //Ext.getCmp("monthpickerId").setHidden(false);                
                    }); 
                }
            }
        },{
            xtype:'label',
		    text:'~'
        },{
            xtype:'textfield',
            id: 'detailSearchEndDate',
            readOnly: true,
            handleMouseEvents: true,
            listeners:{
                click:function(){
                    
                },
                'render': function(cmp) { 
                    this.getEl().on('click', function(){
                        detailDateSearchWindow('detailSearchEndDate');
                        //Ext.getCmp("monthpickerId").setHidden(false);                
                    }); 
                }
            }
        }]
	},{
		xtype:'button',
        text:'참조정보 선택',
        listeners:{
            click: function(){
                //referenceList
                var referenceList = Ext.getCmp('referenceList');
                // 참조정보 선택창이 true이면 false / false 이면 true
                referenceList.hidden == true ? referenceList.setHidden(false) : referenceList.setHidden(true);

            }
        }
	},{
        xtype:'container',
        id:'referenceList',
		layout:{
			xtype:'vbox'
		},
		items:[{
            xtype:'container',
            layout:'fit',
            items:[{
                xtype: 'itemselector',
                name: 'itemselector',
                id: 'itemselector',
                width: 450,
                anchor: '100%',
                //fieldLabel: '참조정보 선택',
                store: Ext.create('Ext.data.Store', {
                    fields: ['value', 'text'],
                    data: [],
                    stype: 'json'
                }),
                displayField: 'text',
                valueField: 'value',
                //value: ['3', '4', '6'],
                allowBlank: false,
                msgTarget: 'side',
                fromTitle: '목록',
                toTitle: '선택'
            }]
        }]
	},{
		xtype:'button',
        text:'적용',
        listeners:{
            click:function(){
                
                var meter = Number(Ext.getCmp('detailRadiusValue').value);
                var detailSearchStartDate = Ext.getCmp('detailSearchStartDate').value;
                var detailSearchEndDate = Ext.getCmp('detailSearchEndDate').value;

                detailSearchClick(meter, detailSearchStartDate, detailSearchEndDate);

                /*if(popSiteInfo.point){ // 선택된 지점이 있는지 
                    if(meter > 0){ // 반경이 있는지
                        if(detailSearchStartDate && detailSearchEndDate){ // 기간이 있는지

                            var dateCompare = detailDateCompare(detailSearchStartDate, detailSearchEndDate);
                            if(dateCompare){
                                $KRF_APP.coreMap._krad.radiusDrawEvent(popSiteInfo.point,meter);   
                            }else{
                                alert('종료일자가 시작일자보다 커야 합니다.')
                            }
                        }else{
                            alert("기간을 선택해 주세요");
                        }
                    }else{
                        alert("반경값을 설정하세요.")
                    }
                }else{
                    alert("지점상세 창이 없습니다.")
                }*/

            }
        }
	}]
});
Ext.define('krf_new.view.center.AdminConfigDRONEPanel', { 

	extend: 'Ext.window.Window',
	
	id:'AdminConfigDRONEPanel',
	title: '항공영상 수정',
	header: true,
	items:[{
		xtype: 'panel',			
		controller: 'AdminConfigDRONEController',
		autoScroll: true,
		items:[{
			xtype: 'container',
			width:1200,
			height: 800,
			items:[{
				xtype: 'grid',
				id: 'droneLayer',
				plugins: ['cellediting'],
				store: Ext.create('Ext.data.Store', {
					fields: [],
					data: $KRF_APP.DRONELAYERS.data
				}),
				columns: [{
					text: '수계',
					dataIndex:'RIVER',
					width: 110,
					editor: { xtype: 'textfield'}
				},{
					text: '수계 한글',
					dataIndex:'RIVER',
					width: 110,
					renderer: function (value) {
						var korRiver = "";
						if(value == "R02"){
							korRiver = "낙동강";
						}else if(value == "R01_1"){
							korRiver = "북한강";
						}else if(value == "R01_2"){
							korRiver = "한강하류";
						}else if(value == "R04"){
							korRiver = "금강";
						}else if(value == "R05"){
							korRiver = "영산강";
						}
						return korRiver;
					},
				}, {
					text: '항공 영상 ID',
					dataIndex:'DRONELAYERID',
					width: 110,
					editor: { xtype: 'textfield' }
				}, {
					text: '항공 영상 날짜',
					dataIndex:'DRONEDATE',
					width: 110,
					editor: { xtype: 'textfield' }
				}, {
					text: '항공 영상 주차',
					dataIndex:'MEASUREDATE',
					width: 110,
					editor: { xtype: 'textfield' }
				}, {
					text: '클로로필 ID',
					dataIndex:'CHLALAYERID',
					width: 110,
					editor: { xtype: 'textfield' }
				}, {
					text: '클로로필 날짜',
					dataIndex:'CHLADATE',
					width: 110,
					editor: { xtype: 'textfield' }
				}, {
					text: '피코시아닌 ID',
					dataIndex:'PHYLAYERID',
					width: 110,
					editor: { xtype: 'textfield' }
				}, {
					text: '피코시아닌 날짜',
					dataIndex:'PHYDATE',
					width: 110,
					editor: { xtype: 'textfield' }
				}, {
					text: 'ETC',
					dataIndex:'ETC',
					width: 50,
					editor: { xtype: 'textfield' }
				}, {
					text: '삭제',
					align: 'center',
					dataIndex: '',
					renderer: function(val){
						return "<a href='#'>삭제</a>";
					},
					listeners: {
						click: function(a, rowIdx, colIdx, d, e, record,f){
							var store = Ext.getCmp('droneLayer').getStore();
							var selection = this.getView().getSelectionModel().getSelection();                               
							if (selection.length > 0) {
								for (var i = 0; i < selection.length; i++) {                                       
									store.remove(selection[i]);
									store.sync();                                      
								}
							}
						}
					}
				}]
			},{
				xtype:'button',
				text:'추가',
				width: 100,
				listeners: {
					click: function(){
						var store = Ext.getCmp('droneLayer').getStore();
						store.add({});
					}
				}
			},{
				xtype:'button',
				text:'저장',
				width: 100,
				listeners: {
					el : {
						click : 'saveClick'
					}
				}
			},{
				xtype:'button',
				text:'갱신',
				width: 100,
				listeners: {
					el : {
						click : 'refreshClick'
					}
				}
			}]
		}]

	}],
	initComponent: function () {
		
		this.callParent();
	}
});
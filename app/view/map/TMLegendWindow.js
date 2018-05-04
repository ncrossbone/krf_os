Ext.define('krf_new.view.map.TMLegendWindow', {
	extend: 'Ext.window.Window',

	xtype: 'tmlegendwindow',
	id: 'tmLegendWindow',
	title: '범례',
	constrain: true,
	cls: 'subWindow-x-form-item-label-default',
	//cls: 'khLee-window-panel-header khLee-x-window-default ',
	//bodyStyle: 'border: 0px;',
	//	closable:false,
	//	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//    style:"border:solid 10px #E6E6E6;",
	layout: {
		type: 'fit'
	},
	header: {
		cls: 'subWindow-x-form-item-label-default',
		items: [
			//        	{
			//	            xtype:'image',
			//	            src:'./resources/images/button/btn_close.png',
			//	            style:'padding-right:13px !important; cursor:pointer;',
			//	            listeners:{
			//	                el:{
			//	                    click:function(){
			//	                        Ext.getCmp("tmLegendWindow").hide();
			//	                    }
			//	                }
			//	            }
			//	        }
		]
	},
	width: 230,
	height: 290,


	items: [{
		xtype: "panel",
		border: false,
		id: "tmLegendPanel",
		html: '<div id="tmLegend" style="padding-top: 20px;"></div>'
	}]
});
/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.RadiusToolbar', {
	extend: 'Ext.panel.Panel',
    
    xtype: 'center-radiustoolbar',

    title: '반경 툴바',
    
    id: 'radiusToolbar',
    
    header: false,

	shadow: false,

	resizable: false,

	border: false,

	bodyStyle: 'background:#043264 !important; padding:5px; border-radius:5px;',

	height: 38,

	width: 92,
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'left'
    },
    
    
    initComponent: function(){
    
    	this.items = [{
			xtype: 'textfield',
    		id: 'radiusText',
			width: 35,
			style: 'border-bottom: 2px solid #ff7200; border-top: 2px solid #ff7200; border-left: 2px solid #ff7200; border-right: none;'

    	},{
			xtype: 'textfield',
			value: '(Km)',
			width: 45,
			style: 'border-bottom: 2px solid #ff7200; border-top: 2px solid #ff7200; border-right: 2px solid #ff7200;  border-left: none;'

    	}];
	    
	    this.callParent();
	}
});
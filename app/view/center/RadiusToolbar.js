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
			width: 80,
			style: 'border: 2px solid #ff7200;'

    	}];
	    
	    this.callParent();
	}
});
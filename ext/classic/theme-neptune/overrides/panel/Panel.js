Ext.define('Ext.theme.neptune.panel.Panel', {
    override: 'Ext.panel.Panel',
    
    border: false,
    bodyBorder: false,

    initBorderProps: Ext.emptyFn,

    initBodyBorder: function() {
        if (this.bodyBorder !== true) {
            this.callParent();
        }
    }
});

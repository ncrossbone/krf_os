Ext.define('Ext.theme.neptune.Component', {
    override: 'Ext.Component',

    initComponent: function() {
        this.callParent();

        if (this.dock && this.border === undefined) {
            this.border = false;
        }
    },

    privates: {
        initStyles: function () {
            var me = this,
                hasOwnBorder = me.hasOwnProperty('border'),
                border = me.border;

            if (me.dock) {
                me.border = null;
            }
            me.callParent(arguments);

            if (hasOwnBorder) {
                me.border = border;
            } else {
                delete me.border;
            }
        }
    }
}, function() {
    Ext.namespace('Ext.theme.is').Neptune = true;
    Ext.theme.name = 'Neptune';
});

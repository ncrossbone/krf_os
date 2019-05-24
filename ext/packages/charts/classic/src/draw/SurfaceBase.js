Ext.define('Ext.draw.SurfaceBase', {
    extend: 'Ext.Widget',

    getOwnerBody: function() {
        return this.ownerCt.body;
    }

});

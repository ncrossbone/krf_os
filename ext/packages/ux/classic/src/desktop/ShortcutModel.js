
Ext.define('Ext.ux.desktop.ShortcutModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'name',
        convert: Ext.String.createVarName
    }, {
        name: 'iconCls'
    }, {
        name: 'module'
    }, {
        name: 'text'
    }, {
        name: 'style'
    }]
});

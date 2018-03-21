Ext.define('krf_new.view.report.ReportSelectPanelController', {

    extend: 'Ext.app.ViewController',

    alias: 'controller.reportSelectController',

    imgMouseOver: function (evt, el) {
        var me = Ext.getCmp(el.id);
        me.setSrc(me.mouseOverSrc);
    },

    imgMouseOut: function (evt, el) {
        var me = Ext.getCmp(el.id);
        me.setSrc(me.mouseOutSrc);
    },

    imgOnClick: function (evt, el) {

        var reportMain = Ext.getCmp('reportMainContents');
        reportMain.reportType = el.id;
        reportMain.setActiveItem(1);
    }
});

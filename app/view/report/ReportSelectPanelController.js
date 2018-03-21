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
        var reportId = el.id;
        var reportMain = Ext.getCmp('reportMainContents');
	    reportMain.setActiveItem(1);
    }

});

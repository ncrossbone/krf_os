Ext.define('krf_new.view.common.BrowserNotice', {
    extend: 'Ext.window.Window',
    title: '알림',
    width: 886,
    height: 658,
    alwaysOnTop: true,
    animCollapse: false,
    constrain: true,
    maximizable: false,
    minimizable: false,
    id: 'browserNoticeWindow',
    layout: 'fit',
    title: '알림',
    style: 'border: 0px; margin: 0 0 0 0',
    items: [{
        xtype: 'image',
        src: './resources/images/chrome_pop.jpg'
    }],
    html: '<span style="position: absolute; width: 605px; left: 140px; height: 130px; top: 185px; cursor: pointer;" onclick="Ext.getCmp(\'browserNoticeWindow\').chromeDown()"></span>',
    chromeDown: function () {
        var url = './resources/file/standalone.zip';
        window.location.assign(url);
    }
});
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
    html: '<span style="position: absolute; width: 605px; left: 140px; height: 130px; top: 185px; cursor: pointer;" onclick="Ext.getCmp(\'browserNoticeWindow\').chromeDown()"></span> <span style="position: absolute; width: 31px; left: 849px; height: 31px; top: 6px; cursor: pointer;" onclick="Ext.getCmp(\'browserNoticeWindow\').closePopup()"></span>',
    chromeDown: function () {
        var url = './resources/file/standalone.zip';
        window.location.assign(url);
    },
    
    closePopup: function (winName,expiredays) {
        this.setCookieAt00( "browserNoticeWindow", "done", "7"); 
    },

    
    setCookieAt00:function ( Name, value, expiredays ) { 
        var todayDate = new Date(); 
        todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000); 
        if ( todayDate > new Date() ) { 
            expiredays = expiredays - 1; 
        }

        todayDate.setDate( todayDate.getDate() + expiredays ); 
        document.cookie = Name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" ;

        var noticeWin = Ext.getCmp('browserNoticeWindow');
        noticeWin.hide();


    }
});
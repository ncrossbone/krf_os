Ext.define('krf_new.view.search.threeDim.ThreeDimButtonPanelController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.threeDimButtonpanel',

	endBtnOnOff: 'off',

	// 주제도 선택
	onClickLayer: function (obj, el, evt) {
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		var tabIdx = 1;
		var titleNm = '위치검색';
		if (currCtl.btnOnOff == 'on') {
			tabIdx = 0;
			titleNm = '주제도 선택';
		}

		var westContents = Ext.getCmp("threeDimWestContents");
		westContents.setActiveItem(tabIdx);
		Ext.getCmp('threeDimSearch-win').setTitle(titleNm);
	},
	// 길따라가기
	onClickMeasuredValue: function (obj, el, evt) {
		var currCtl = SetBtnOnOff(el.id);
		
		var threeDimMeasuredWindow = Ext.getCmp("threeDimMeasured-win");

		if(currCtl.btnOnOff == 'on'){
			
			if (!threeDimMeasuredWindow) {
				var centerContainer = Ext.getCmp('threeDim_center_container');
				var winX = centerContainer.getWidth() - 350;
				var winY = 61;
				threeDimMeasuredWindow = Ext.create('krf_new.view.search.threeDim.ThreeDimMeasuredWindow', { x: winX, y: winY });
				centerContainer.add(threeDimMeasuredWindow);
			}
			threeDimMeasuredWindow.show();
		}else{
			if(threeDimMeasuredWindow){
				threeDimMeasuredWindow.hide();
			}
		}
	}
});

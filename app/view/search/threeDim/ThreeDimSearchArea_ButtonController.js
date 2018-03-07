Ext.define('krf_new.view.search.threeDim.ThreeDimSearchArea_ButtonController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.threeDimSearchArea_ButtonController',

	onClickButton: function (evtArgs, el) {
		var currCtl = Ext.getCmp(el.id);

		// 이미지 셋팅
		var currCtl = SetBtnOnOff(el.id, "on");

		var westContents = Ext.getCmp("searchThreeDimAreaContents");

		// 수계로 찾기
		if (el.id == "btnThreeDimWaterSearch") {
			westContents.setActiveItem(0);
		}

		// 행정구역으로 찾기
		if (el.id == "btnThreeDimADMSearch") {
			westContents.setActiveItem(1);
		}

		// 명칭으로 찾기
		if (el.id == "btnThreeDimNameSearch") {
			var btnNomal = Ext.getCmp("btnThreeDimModeNomal");
			if (btnNomal.btnOnOff == "on")
				westContents.setActiveItem(2);

			var btnReach = Ext.getCmp("btnThreeDimModeReach");
			if (btnReach.btnOnOff == "on")
				westContents.setActiveItem(3);
		}
	}
});

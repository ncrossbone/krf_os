Ext.define('krf_new.view.admin.AdminConfigDRONEController', {

	extend: 'Ext.app.ViewController',

	alias: 'controller.AdminConfigDRONEController',



	saveClick: function(){

		var store = Ext.getCmp('droneLayerAdd').getStore();
		var datar = new Array();
        var jsonDataEncode = "";
		var records = store.getRange();
        for (var i = 0; i < records.length; i++) {
			this.saveDroneLayer(records[i].data);
		}

		this.refreshClick();

	},

	updateClick: function () {


		var store = Ext.getCmp('droneLayer').getStore();
		var records = store.getRange();

		var changeDroneDatas = [];
		records.map(function(droneObj){
			if(droneObj.checked){
				changeDroneDatas.push(droneObj)
			}
		});

		if(changeDroneDatas.length > 0){
			for (var i = 0; i < changeDroneDatas.length; i++) {
				this.updateDroneLayer(changeDroneDatas[i].data);
			}
			                                                     
			alert('수정을 완료 하였습니다.');
			this.refreshClick();
		}

	},

	refreshClick : function(){
		
		Ext.Ajax.request({
			url: _API.getDroneLayer,
			dataType: "text/plain",
			method: 'POST',
			async: false,
			success: function (response, opts) {
				var droneLyaer = Ext.util.JSON.decode(response.responseText);
				if (droneLyaer.data.length > 0) {
					$KRF_APP.DRONELAYERS = droneLyaer;
					var store = Ext.create('Ext.data.Store', {
						autoLoad  : true,
						data: $KRF_APP.DRONELAYERS.data
					});
					
					alert("갱신 되었습니다.");
					Ext.getCmp('droneLayer').setStore(store);

				}
			}
		});

		
	},

	testClick : function(){
		var jsonStr = JSON.stringify($KRF_APP.DRONELAYERS);
		Ext.Ajax.request({
			url: _API.testDroneLayer,
			dataType: "application/json",
			method: 'POST',
			async: false,
			data : JSON.stringify($KRF_APP.DRONELAYERS),
			success: function (response, opts) {
				console.info(response)
			}
		});
	},

	deleteDroneLayer_test : function(){

		var me = this;

		var store = Ext.getCmp('droneLayer').getStore();
		var selection = Ext.getCmp('droneLayer').getView().getSelectionModel().getSelection();                               
		if (selection.length > 0) {
			for (var i = 0; i < selection.length; i++) {

				var answer = window.confirm(selection[0].data.RIVER+"_"+selection[0].data.DRONEDATE+"영상을 삭제 하시겠습니까?")
				if (answer) {
					Ext.Ajax.request({
						url: _API.deleteDroneLayer,
						dataType: "text/plain",
						method: 'POST',
						async: true,
						params: {
							etc : selection[0].data.ETC
						},
						success: function (response, opts) {
							store.remove(selection[i]);
							store.sync();     		
						}
	
					});

					me.refreshClick();

				}else {
					return;
				}                                
			}
		}
	},

	deleteDroneLayer: function(){
		

		var store = Ext.getCmp('droneLayer').getStore();
		var selection = Ext.getCmp('droneLayer').getView().getColumnManager().getColumns()[0].getView().getSelectionModel().getSelection();
		if (selection.length > 0) {
			for (var i = 0; i < selection.length; i++) {

				var answer = window.confirm(selection[0].data.RIVER+"_"+selection[0].data.DRONEDATE+"영상을 삭제 하시겠습니까?")
				if (answer) {
					Ext.Ajax.request({
						url: _API.deleteDroneLayer,
						dataType: "text/plain",
						method: 'POST',
						async: true,
						params: {
							etc : selection[0].data.ETC
						},
						success: function (response, opts) {
							store.remove(selection[i]);
							store.sync();     		
						}
	
					});

					me.refreshClick();

				}else {
					return;
				}                                
			}
		}

		
	},

	

	settingDroneLayer : function(){
		var store = Ext.getCmp('droneLayer').getStore();
		var datar = new Array();
        var jsonDataEncode = "";
		var records = store.getRange();
        for (var i = 0; i < records.length; i++) {
			this.saveDroneLayer(records[i].data);
		}
		
	},

	updateDroneLayer : function(data){
		Ext.Ajax.request({
			url: _API.updateDroneLayer,
			dataType: "text/html",
			method: 'POST',
			async: false,
			params: {
				river : data.RIVER,
				droneLayerId: data.DRONELAYERID,
				droneDate : data.DRONEDATE,
				measureDate : data.MEASUREDATE,
				chlaLayerId : data.CHLALAYERID,
				chlaDate : data.CHLADATE,
				phyLayerId : data.PHYLAYERID,
				phyDate : data.PHYDATE,
				blueLayerId : data.BLUELAYERID,
				blueDate : data.BLUEDATE,
				etc : data.ETC
			}
		});
	},

	saveDroneLayer : function(data){
		Ext.Ajax.request({
			url: _API.insertDroneLayer,
			dataType: "text/html",
			method: 'POST',
			async: false,
			params: {
				river : data.RIVER,
				droneLayerId: data.DRONELAYERID,
				droneDate : data.DRONEDATE,
				measureDate : data.MEASUREDATE,
				chlaLayerId : data.CHLALAYERID,
				chlaDate : data.CHLADATE,
				phyLayerId : data.PHYLAYERID,
				phyDate : data.PHYDATE,
				blueLayerId : data.BLUELAYERID,
				blueDate : data.BLUEDATE,
				etc : data.DRONELAYERID
			}
		});
	},
	
	selectDroneLayer : function(){
		Ext.Ajax.request({
			url: _API.getDroneLayer,
			dataType: "text/plain",
			method: 'POST',
			async: false,
			success: function (response, opts) {
				var droneLyaer = Ext.util.JSON.decode(response.responseText);
				if (droneLyaer.data.length > 0) {
					$KRF_APP.DRONELAYERS = droneLyaer;
				}
			}
		});
	}
});
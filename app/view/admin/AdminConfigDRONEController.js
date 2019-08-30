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

		console.info(changeDroneDatas);

		if(changeDroneDatas.length > 0){
			for (var i = 0; i < changeDroneDatas.length; i++) {
				this.updateDroneLayer(changeDroneDatas[i].data);
			}
		}

	},

	refreshClick : function(){
		
		Ext.Ajax.request({
			url: _API.getDroneLayer,
			dataType: "text/plain",
			method: 'POST',
			async: true,
			success: function (response, opts) {
				var droneLyaer = Ext.util.JSON.decode(response.responseText);
				if (droneLyaer.data.length > 0) {
					$KRF_APP.DRONELAYERS = droneLyaer;
					var store = Ext.create('Ext.data.Store', {
						autoLoad  : true,
						data: $KRF_APP.DRONELAYERS.data
					});
					
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
			async: true,
			data : JSON.stringify($KRF_APP.DRONELAYERS),
			success: function (response, opts) {
				console.info(response)
			}
		});
	},

	deleteDroneLayer : function(){
		//return;
		var me = this;
		Ext.Ajax.request({
			url: _API.deleteDroneLayer,
			dataType: "text/plain",
			method: 'POST',
			async: true,
			params: {
				etc : data.ETC
			},
			success: function (response, opts) {
				
			}
		});
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
			async: true,
			params: {
				river : data.RIVER,
				droneLayerId: data.DRONELAYERID,
				droneDate : data.DRONEDATE,
				measureDate : data.MEASUREDATE,
				chlaLayerId : data.CHLALAYERID,
				chlaDate : data.CHLADATE,
				phyLayerId : data.PHYLAYERID,
				phyDate : data.PHYDATE,
				etc : data.ETC
			}
		});
	},

	saveDroneLayer : function(data){
		Ext.Ajax.request({
			url: _API.insertDroneLayer,
			dataType: "text/html",
			method: 'POST',
			async: true,
			params: {
				river : data.RIVER,
				droneLayerId: data.DRONELAYERID,
				droneDate : data.DRONEDATE,
				measureDate : data.MEASUREDATE,
				chlaLayerId : data.CHLALAYERID,
				chlaDate : data.CHLADATE,
				phyLayerId : data.PHYLAYERID,
				phyDate : data.PHYDATE,
				etc : data.DRONELAYERID
			}
		});
	},
	
	selectDroneLayer : function(){
		Ext.Ajax.request({
			url: _API.getDroneLayer,
			dataType: "text/plain",
			method: 'POST',
			async: true,
			success: function (response, opts) {
				var droneLyaer = Ext.util.JSON.decode(response.responseText);
				if (droneLyaer.data.length > 0) {
					$KRF_APP.DRONELAYERS = droneLyaer;
				}
			}
		});
	}
});
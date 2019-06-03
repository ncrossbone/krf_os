Ext.define('krf_new.store.center.TotalSearchTree', {
    extend: 'Ext.data.TreeStore',
    remoteSort: true,
    listeners: {

        load: function (store) {

			var jsonData = store.data;
			console.info(store.data);
			//itemselector
			//detailSeachSetParam
			//detailSeachSetParam

			var containsObject = function(obj, list) {
				var x;
				for (x in list) {
					if (list.hasOwnProperty(x) && list[x] === obj) {
						return true;
					}
				}
			
				return false;
			}
			

			var layerList = Ext.getCmp('itemselector').getValue();

			var paramList = {'A':[],'B':[],'C':[],'D':[],'E':[],'F':[],'G':[],'H':[]};
			var siteIds = [];

			if(layerList.length > 0){
				for(var i = 0 ; i < layerList.length; i++){

					var object = jsonData.map;

					for (var key in object) {

						object[key].data.children.map(function(childObj){

							childObj.children.map(function(obj){
								if(paramList[childObj.parentId] != undefined){
									paramList[childObj.parentId].push(childObj.parentId+'_'+obj.id);
									siteIds.push(childObj.parentId+'_'+obj.id);
								}
							})
						})
					}
				}
			}
			
			//중복제거
			for (var key in paramList) {

				paramList[key] = paramList[key].reduce(function(a,b){
					if (a.indexOf(b) < 0 ) a.push(b);
					return a;
				},[]);

			}


			siteIds = siteIds.reduce(function(a,b){
				if (a.indexOf(b) < 0 ) a.push(b);
				return a;
			},[]);

			console.info(paramList);
			console.info(siteIds);


			// var uniq = paramList.reduce(function(a,b){
			// 	if (a.indexOf(b) < 0 ) a.push(b);
			// 	return a;
			// },[]);
			
			//console.log(uniq, paramList) // [ 'Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Carl' ]
			
			

            
            Ext.Ajax.request({
				url: './resources/data/treeTest.json',
				dataType: "text/plain",
				method: 'POST',
				async: true,
				success: function (response, opts) {

					var jsonData = Ext.util.JSON.decode(response.responseText);
					store.setRootNode(jsonData);
					store.setRootVisible(false);

				}
			});
        }
    }
});

Ext.define('Report.store.east.treeRptPollutionStore', {

    extend: 'Ext.data.TreeStore',

    searchType: '',
    remoteSort: false,

    listeners: {

        load: function (store) {
            
            var pollObj = parentObj.$KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution;

            if (!pollObj) {
                return;
            }

            var treeObj = { id: '0', siteName: '오염원', cls: 'khLee-x-tree-node-text-bold', checked: null, expanded: true, children: [] };

            for (var i = 0; i < pollObj.length; i++) {
                var pollArr = pollObj[i][1][0];
                var firstDepth = { id: pollObj[i][0], siteName: pollObj[i][0], cls: 'khLee-x-tree-node-text-bold', checked: false, expanded: false, leaf:true};
                treeObj.children.push(firstDepth);
                // for (var j = 0; j < pollArr.length; j++) {
                //     var secondDepth = { id: pollArr[j].data.CAT_DID, siteName: pollArr[j].data.CAT_DID, siteAddr: pollArr[j].data.CAT_DID, cls: 'khLee-x-tree-node-text-bold', checked: false, expanded: true };
                //     treeObj.children[i].children.push(secondDepth);
                // }
            }
            
            store.setRootNode(treeObj);
        }
    },
});

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
                if (pollObj[i][1][0] == null || pollObj[i][1][0].length <= 0) {
                    continue;
                }
                var firstDepth = { id: pollObj[i][0], imgFlag: '미생성', siteName: pollObj[i][2] + '( ' + pollObj[i][1][0].length + ' )', cls: 'khLee-x-tree-node-text-bold', checked: false, expanded: false, leaf: true, iconCls: 'layerNoneImg', reachData: pollObj[i][1][0] };
                treeObj.children.push(firstDepth);
            }

            store.setRootNode(treeObj);
        }
    },
});

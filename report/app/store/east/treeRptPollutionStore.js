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
            var pollutionNmCfg = {
                '01': '생활계',
                '02': '축산계',
                '03': '산업계',
                '04': '토지계',
                '05': '양식계',
                '06': '매립계',
                '07': '기타수질오염원'
            };

            var treeObj = { id: '0', siteName: '오염원', cls: 'khLee-x-tree-node-text-bold', checked: null, expanded: true, children: [] };


            for (var i = 0; i < pollObj.length; i++) {
                var pollArr = pollObj[i][1][0];
                var firstDepth = { id: pollObj[i][0], siteName: pollutionNmCfg[pollObj[i][0]], cls: 'khLee-x-tree-node-text-bold', checked: false, expanded: false, leaf: true, iconCls: 'layerNoneImg', reachData: pollObj[i][1][0] };
                treeObj.children.push(firstDepth);
            }

            store.setRootNode(treeObj);
        }
    },
});

Ext.define('krf_new.view.admin.UserGridPanel', {

	extend: 'Ext.grid.Panel',

	requires: ['krf_new.view.admin.UserGridStore'],
	xtype: 'userGridPanel',

	id: 'userGridPanel',
	header: false,

	title: '<img src="./resources/images/button/blit.gif" class="cmbBlit"  /> <b style="color:#000000">사용자 (*주제도를 끌어다 넣으세요.)</b>',
	// header: {
	// 	style: 'background:#c8dffe;'
	// },
	bodyStyle: 'background:url(./resources/images/rpt/r_bg.gif);',
	region: 'center',
	margin: '0 5 5 0',
	sortableColumns: false,
	plugins: ['bufferedrenderer', 'gridfilters'],
	columns: [{
		dataIndex: 'layerSetName',
		header: '주제도',
		width: 200,
		filter: { type: 'string'}
	}, {
		dataIndex: 'userId',
		header: '사용자ID',
		width: 150,
		filter: { type: 'string'}
	}, {
		dataIndex: 'userNm',
		header: '사용자명',
		width: 150,
		filter: { type: 'string'}
	}, {
		dataIndex: 'orgName',
		header: '소속',
		width: 170,
		filter: { type: 'string'}
	}, {
		dataIndex: 'levelNm',
		header: '권한',
		width: 250,
		filter: { type: 'string'}
	}],
	viewConfig: {
		listeners: {
		}
	},
	store: Ext.create('krf_new.view.admin.UserGridStore'),
	listeners:{
		render: function(){
			this.getStore().load();
		}
	}
});
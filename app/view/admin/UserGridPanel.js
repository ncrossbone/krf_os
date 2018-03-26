Ext.define('krf_new.view.admin.UserGridPanel', {

	extend: 'Ext.grid.Panel',

	requires: [],
	xtype:'userGridPanel',

	id:'userGridPanel',
	title: '사용자',
	region: 'center',
	margin: '0 5 5 0',
	sortableColumns: false,
	columns: [{
		dataIndex: 'userId',
		header: '사용자ID',
		width: 200
	}, {
		dataIndex: 'UserNm',
		header: '사용자명',
		width: 200
	}, {
		dataIndex: 'orgName',
		header: '소속',
		width: 200
	}, {
		dataIndex: 'levelNm',
		header: '권한',
		width: 200
	}, {
		dataIndex: 'layerSetId',
		header: '주제도',
		width: 200
	}],
	features: [{
		ftype: 'rowbody',
		getAdditionalData: function (data) {
			var patients = data.patients,
				html;
			if (patients) {
				html = patients.join(', ');
			} else {
				html = 'Drop patients here';
			}
			return {
				rowBody: html,
				rowBodyCls: 'hospital-target'
			};
		}
	}],
	viewConfig: {
		listeners: {
			// render: initializeHospitalDropZone
		}
	},
	store: Ext.create('Ext.data.Store', {
        data: [{
			userId: 'test1',
			UserNm: '테스트 1',
			orgName: '과학원 1',
			levelNm: '관리자 1',
			layerSetId: '기본'
		}, {
			userId: 'test2',
			UserNm: '테스트 2',
			orgName: '과학원 2',
			levelNm: '관리자 2',
			layerSetId: '기본'
		}, {
			userId: 'test3',
			UserNm: '테스트 3',
			orgName: '과학원 3',
			levelNm: '관리자 3',
			layerSetId: '기본'
		}, {
			userId: 'test4',
			UserNm: '테스트 4',
			orgName: '과학원 4',
			levelNm: '관리자 4',
			layerSetId: '기본'
		}, {
			userId: 'test5',
			UserNm: '테스트 5',
			orgName: '과학원 5',
			levelNm: '관리자 5',
			layerSetId: '기본'
		}]
    })
});
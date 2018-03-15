Ext.define('krf_new.view.search.MetaDataWindow', {
	
	extend: 'Ext.window.Window',
	
	xtype: 'search-metaDataWindow',
	
	id: 'metaDataWindow',
	
	title: '메타데이타',
	width: 900,
	height: 200,

	items:[{
	
		xtype:'container',
		border:false,
		layout:{
			type:'table',
			columns:4
		},
		items:[{
			html: '레이어명'
		},{
			html: '데이터생성 기관명'
		},{
			html: '공개여부'
		},{
			html: '갱신주기'
		},{
			id:'LYR_CODE'
		},{
			id:'INSTT_NM'
		},{
			id:'PRVATE_OTHBC_SE'
		},{
			id:'UPDT_CYCLE'
		}]

	},{
		xtype:'container',
		border:false,
		layout:{
			type: 'table',
			border:false,
			columns:2
		},
		items:[{
			html:'공간 표현 방식'
		},{
			id:'SPCE_EXPRSN_MTHD'
		},{
			html:'좌표계'
		},{
			id:'CNTM_NM'
		},{
			html:'최초등록일시'
		},{
			id:'REGIST_DT'
		},{
			html:'최종갱신일'
		},{
			id:'UPDT_DE'
		},{
			html:'분류'
		},{
			id:'LYR_GROUP_NM'
		},{
			html:'비고'
		},{
			id:'RM'
		}]
	}]
});
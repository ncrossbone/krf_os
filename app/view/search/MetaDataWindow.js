Ext.define('krf_new.view.search.MetaDataWindow', {
	
	extend: 'Ext.window.Window',
	
	xtype: 'search-metaDataWindow',
	
	id: 'metaDataWindow',
	
	title: '메타데이타',

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
			html: 'b',
			id:'LYR_CODE'
		},{
			html: '데이터생성 기관명'
		},{
			html: 'd',
			id:'INSTT_NM'
		},{
			html: '공개여부'
		},{
			html: 'f',
			id:'PRVATE_OTHBC_SE'
		},{
			html: '갱신주기'
		},{
			html: 'h',
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
			html:'2',
			id:'SPCE_EXPRSN_MTHD'
		},{
			html:'좌표계'
		},{
			html:'4',
			id:'CNTM_NM'
		},{
			html:'최초등록일시'
		},{
			html:'6',
			id:'REGIST_DT'
		},{
			html:'최종갱신일'
		},{
			html:'8',
			id:'UPDT_DE'
		},{
			html:'분류'
		},{
			html:'10',
			id:'LYR_GROUP_NM'
		},{
			html:'비고'
		},{
			html:'12',
			id:'RM'
		}]
	}]
});
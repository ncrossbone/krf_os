Ext.define('krf_new.view.search.MetaDataWindow', {
	
	extend: 'Ext.window.Window',
	
	xtype: 'search-metaDataWindow',
	
	id: 'metaDataWindow',
	
	title: '메타데이타',
	width: 420,
	height: 400,

	items:[{
		xtype:'container',
		height:5
	},{
	
		xtype:'container',
		layout:{
			type:'table',
			border: false,
			columns:4

		},
		items:[{
			width: 90,
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html: '레이어명'
		},{
			width: 150,
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html: '데이터생성 기관명'
		},{
			width: 90,
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html: '공개여부'
		},{
			width: 90,
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:none !important; border-bottom:1px solid #cccccc',
			html: '갱신주기'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'LYR_CODE'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'INSTT_NM'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'PRVATE_OTHBC_SE'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:none!important ; border-bottom:1px solid #cccccc',
			id:'UPDT_CYCLE'
		}]

	},{
		xtype:'container',
		height: 15
	},{
		xtype:'container',
		border:true,
		layout:{
			type: 'table',
			border:false,
			columns:2
		},
		items:[{
			width: 90,
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html:'공간 표현 방식'
		},{
			width: 332,
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'SPCE_EXPRSN_MTHD'
		},{
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html:'좌표계'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'CNTM_NM'
		},{
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html:'최초등록일시'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'REGIST_DT'
		},{
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html:'최종갱신일'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'UPDT_DE'
		},{
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html:'분류'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'LYR_GROUP_NM'
		},{
			bodyStyle:'background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc; border-bottom:1px solid #cccccc',
			html:'비고'
		},{
			bodyStyle:'background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc;; border-bottom:1px solid #cccccc',
			id:'RM'
		}]
	}]
});
Ext.define('krf_new.view.search.MetaDataWindow', {
	
	extend: 'Ext.window.Window',
	
	xtype: 'search-metaDataWindow',
	
	id: 'metaDataWindow',
	
	title: '메타데이타',
	width: 440,
	height: 390,
	header:{cls :'subWindow-x-form-item-label-default'},
	cls: 'metaWindow-x-form-item-label-default',
	items:[{
	
		xtype:'container',
		
		layout:{
			type:'table',
			cls:'aaaaa',
			border: false,
			columns:4

		},
		items:[{
			width: 110,
			bodyStyle:' font-weight: bold; background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important; border-top: 2px solid #2f4054 !important; ',
			html: '레이어명'
		},{
			width: 150,
			bodyStyle:' font-weight: bold;background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important; border-top: 2px solid #2f4054 !important; ',
			html: '데이터생성 기관명'
		},{
			width: 80,
			bodyStyle:' font-weight: bold;background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important; border-top: 2px solid #2f4054 !important; ',
			html: '공개여부'
		},{
			width: 80,
			bodyStyle:' font-weight: bold;background:#f8f8f8; padding:10px; text-align:left; border-right:none ; border-bottom:1px solid #cccccc !important; border-top: 2px solid #2f4054 !important; ',
			html: '갱신주기'
		},{
			bodyStyle:' font-weight: bold;background:#ffffff; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important;',
			id:'LYR_CODE'
		},{
			bodyStyle:' font-weight: bold;background:#ffffff; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important;',
			id:'INSTT_NM'
		},{
			bodyStyle:' font-weight: bold; background:#ffffff; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important;',
			id:'PRVATE_OTHBC_SE'
		},{
			bodyStyle:' font-weight: bold;background:#ffffff; padding:10px; text-align:left; border-right:none!important ; border-bottom:1px solid #cccccc !important;',
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
			width: 110,
			bodyStyle:' font-weight: bold;background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important; border-top: 2px solid #2f4054 !important; ',
			html:'공간 표현 방식'
		},{
			width: 310,
			bodyStyle:' font-weight: bold;background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc !important; border-bottom:1px solid #cccccc !important; border-top: 2px solid #2f4054 !important; ',
			id:'SPCE_EXPRSN_MTHD'
		},{
			bodyStyle:' font-weight: bold; background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important;',
			html:'좌표계'
		},{
			bodyStyle:' font-weight: bold; background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc !important; border-bottom:1px solid #cccccc !important;',
			id:'CNTM_NM'
		},{
			bodyStyle:' font-weight: bold; background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important;',
			html:'최초등록일시'
		},{
			bodyStyle:' font-weight: bold; background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc !important; border-bottom:1px solid #cccccc !important;',
			id:'REGIST_DT'
		},{
			bodyStyle:' font-weight: bold; background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important;',
			html:'최종갱신일'
		},{
			bodyStyle:' font-weight: bold; background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc !important; border-bottom:1px solid #cccccc !important',
			id:'UPDT_DE'
		},{
			bodyStyle:' font-weight: bold; background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important;',
			html:'분류'
		},{
			bodyStyle:'font-weight: bold; background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc !important; border-bottom:1px solid #cccccc !important;',
			id:'LYR_GROUP_NM'
		},{
			bodyStyle:' font-weight: bold; background:#f8f8f8; padding:10px; text-align:left; border-right:1px solid #cccccc !important; border-bottom:1px solid #cccccc !important;',
			html:'비고'
		},{
			bodyStyle:' font-weight: bold; background:#ffffff; padding:10px; text-align:left; border-right:1px dolid $cccccc !important; border-bottom:1px solid #cccccc !important',
			id:'RM'
		}]
	}]
});
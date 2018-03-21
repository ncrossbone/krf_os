/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.report.ReportSelectPanel', {
	extend: 'Ext.panel.Panel',
	requires: [],
	xtype: 'select-report',
	requires: ['krf_new.view.report.ReportSelectPanelController'],
	layout: {
		type: 'vbox'
	},

	bodyStyle: 'padding:10px;',
	items: [{
		xtype: 'label',
		style: 'font-weight:bold; margin-bottom:10px;',
		text: '업무 유형에 맞는 리포트 형태를 선택합니다.'
	}, {
		xtype: 'panel',
		width: '100%',
		height: '100%',
		controller: 'reportSelectController',
		style: 'padding-bottom:17px; border-top:2px solid #2f4054;',
		autoScroll: true,
		layout: 'vbox',
		items: [{
			xtype: 'panel',
			style: 'border-bottom:1px solid #d1d7e3;',
			width: '100%',
			height: 173,
			layout: 'hbox',
			items: [{
				xtype: 'panel',
				width: 155,
				height: '100%',
				style: 'padding:10px; background: #f3f4f8; border-right:1px solid #d1d7e3;',
				items: [{
					xtype: 'image',
					width: 135,
					height: 152,
					id: 'rptCase1',
					style: 'cursor:pointer',
					src: './resources/images/rpt/report_off.png',
					mouseOverSrc: './resources/images/rpt/report_ov.png',
					mouseOutSrc: './resources/images/rpt/report_off.png',
					listeners: {
						el: {
							mouseover: 'imgMouseOver',
							mouseout: 'imgMouseOut',
							click: 'imgOnClick'
						}
					}
				}]
			}, {
				xtype: 'panel',
				width: '70%',
				height: '100%',
				html: '<ul class="report">' +
					'<li>' +
					'<span class="tit">제목</span>' +
					'<span class="name cont">전체 수계의 대권역별 출현종수 및 개채수</span>' +
					'</li>' +
					'<li>' +
					'<span class="tit">내용</span>' +
					'<span class="cont">전체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수</span>' +
					'</li>' +
					'</ul>'
			}]
		}, {
			xtype: 'panel',
			style: 'border-bottom:1px solid #d1d7e3;',
			width: '100%',
			height: 173,
			layout: 'hbox',
			items: [{
				xtype: 'panel',
				width: 155,
				height: '100%',
				style: 'padding:10px; background: #f3f4f8; border-right:1px solid #d1d7e3;',
				items: [{
					xtype: 'image',
					width: 135,
					height: 152,
					id: 'rptCase2_1',
					style: 'cursor:pointer',
					src: './resources/images/rpt/report_off.png',
					mouseOverSrc: './resources/images/rpt/report_ov.png',
					mouseOutSrc: './resources/images/rpt/report_off.png',
					listeners: {
						el: {
							mouseover: 'imgMouseOver',
							mouseout: 'imgMouseOut',
							click: 'imgOnClick'
						}
					}
				}]
			}, {
				xtype: 'panel',
				width: '70%',
				height: '100%',
				html: '<ul class="report">' +
					'<li>' +
					'<span class="tit">제목</span>' +
					'<span class="name cont">전체 수계의 대권역별 출현종수 및 개채수</span>' +
					'</li>' +
					'<li>' +
					'<span class="tit">내용</span>' +
					'<span class="cont">전체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수</span>' +
					'</li>' +
					'</ul>'
			}]
		}, {
			xtype: 'panel',
			style: 'border-bottom:1px solid #d1d7e3;',
			width: '100%',
			height: 173,
			layout: 'hbox',
			items: [{
				xtype: 'panel',
				width: 155,
				height: '100%',
				style: 'padding:10px; background: #f3f4f8; border-right:1px solid #d1d7e3;',
				items: [{
					xtype: 'image',
					width: 135,
					height: 152,
					id: 'rptCase2_2',
					style: 'cursor:pointer',
					src: './resources/images/rpt/report_off.png',
					mouseOverSrc: './resources/images/rpt/report_ov.png',
					mouseOutSrc: './resources/images/rpt/report_off.png',
					listeners: {
						el: {
							mouseover: 'imgMouseOver',
							mouseout: 'imgMouseOut',
							click: 'imgOnClick'
						}
					}
				}]
			}, {
				xtype: 'panel',
				width: '70%',
				height: '100%',
				html: '<ul class="report">' +
					'<li>' +
					'<span class="tit">제목</span>' +
					'<span class="name cont">전체 수계의 대권역별 출현종수 및 개채수</span>' +
					'</li>' +
					'<li>' +
					'<span class="tit">내용</span>' +
					'<span class="cont">전체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수체 수계의 대권역별 출현종수 및 개채수</span>' +
					'</li>' +
					'</ul>'
			}]
		}]
	}],
	initComponent: function () {
		this.callParent();
	}
});
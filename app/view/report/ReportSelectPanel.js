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
			height: 205,
			layout: 'hbox',
			items: [{
				xtype: 'panel',
				width: 155,
				height: '100%',
				style: 'padding:10px; background: #f3f4f8; border-right:1px solid #d1d7e3;',
				items: [{
					xtype: 'image',
					width: 133,
					height: 186,
					id: 'rptCase1',
					style: 'cursor:pointer',
					src: './resources/images/rpt/case1.png',
					mouseOverSrc: './resources/images/rpt/case1_on.png',
					mouseOutSrc: './resources/images/rpt/case1.png',
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
					'<span class="name cont">출현종수 및 세포밀도</span>' +
					'</li>' +
					'<li>' +
					'<span class="tit">내용</span>' +
					'<span class="cont">전국 대권역별 해당 년도별 출현종수 및 세포밀도에 대한 정보를 표형식의 리포트로 출력합니다. 이 리포트를 선택하면 설정창에서 사용자가 원하는 년도와 개체종(부착돌말, 어류, 수변식생)을 추가해야 합니다. 출력되는 표에는 조사구간의 갯수와 출현 종의 총종수, 평균, 최대, 최소 값과 세포밀도의 평균, 최대, 최소 값을 같이 표현됩니다.</span>' +
					'</li>' +
					'</ul>'
			}]
		}, {
			xtype: 'panel',
			style: 'border-bottom:1px solid #d1d7e3;',
			width: '100%',
			height: 205,
			layout: 'hbox',
			items: [{
				xtype: 'panel',
				width: 155,
				height: '100%',
				style: 'padding:10px; background: #f3f4f8; border-right:1px solid #d1d7e3;',
				items: [{
					xtype: 'image',
					width: 133,
					height: 186,
					id: 'rptCase2_1',
					style: 'cursor:pointer',
					src: './resources/images/rpt/case2-1.png',
					mouseOverSrc: './resources/images/rpt/case2-1_on.png',
					mouseOutSrc: './resources/images/rpt/case2-1.png',
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
					'<span class="name cont">값 및 등급 분포</span>' +
					'</li>' +
					'<li>' +
					'<span class="tit">내용</span>' +
					'<span class="cont">개체종의 지수(TDI) 및 등급을 해당 년도별, 권역 및 개체종에 대한 정보를 표형식의 리포트로 출력합니다. 이 리포트를 선택하면 설정창에서 사용자가 원하는 년도와 영역의 범위(대권역, 본류, 지류, 기타하천), 개체종(부착돌말, 저서동물, 어류, 서식수변환경, 수변식생)을 추가해야 합니다. 출력되는 표에는 년도, 영역의 범위, 조사구간, TDI(평균, 등급), 등급별 조사구간수의 값을 같이 표현합니다.</span>' +
					'</li>' +
					'</ul>'
			}]
		}, {
			xtype: 'panel',
			style: 'border-bottom:1px solid #d1d7e3;',
			width: '100%',
			height: 205,
			layout: 'hbox',
			items: [{
				xtype: 'panel',
				width: 155,
				height: '100%',
				style: 'padding:10px; background: #f3f4f8; border-right:1px solid #d1d7e3;',
				items: [{
					xtype: 'image',
					width: 133,
					height: 186,
					id: 'rptCase2_2',
					style: 'cursor:pointer',
					src: './resources/images/rpt/case2-2.png',
					mouseOverSrc: './resources/images/rpt/case2-2_on.png',
					mouseOutSrc: './resources/images/rpt/case2-2.png',
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
					'<span class="name cont">년도별 등급 분포</span>' +
					'</li>' +
					'<li>' +
					'<span class="tit">내용</span>' +
					'<span class="cont">개체종의 지수(BOD, BMI, HRI, RVI) 및 등급을 해당 기간별, 권역 및 개체종에 대한 정보를 표형식의 리포트로 출력합니다. 이 리포트를 선택하면 설정창에서 사용자가 원하는 기간(시작년도, 종료년도)와 영역의 범위(대권역, 본류, 지류, 기타하천), 개체종(부착돌말, 저서동물, 어류, 서식수변환경, 수변식생)을 추가해야 합니다. 출력되는 표에는 기간, 영역의 범위, 조사구간, BOD(평균, 등급), BMI(평균, 등급), HRI(평균, 등급), RVI(평균, 등급), 등급별 조사구간수의 값을 같이 표현합니다.</span>' +
					'</li>' +
					'</ul>'
			}]
		}, {
			xtype: 'panel',
			style: 'border-bottom:1px solid #d1d7e3;',
			width: '100%',
			height: 205,
			layout: 'hbox',
			items: [{
				xtype: 'panel',
				width: 155,
				height: '100%',
				style: 'padding:10px; background: #f3f4f8; border-right:1px solid #d1d7e3;',
				items: [{
					xtype: 'image',
					width: 133,
					height: 186,
					id: 'rptCase3',
					style: 'cursor:pointer',
					src: './resources/images/rpt/case3.png',
					mouseOverSrc: './resources/images/rpt/case3_on.png',
					mouseOutSrc: './resources/images/rpt/case3.png',
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
					'<span class="name cont">수생태계 건강성 평가결과</span>' +
					'</li>' +
					'<li>' +
					'<span class="tit">내용</span>' +
					'<span class="cont">수생태계 건강성 평가결과를 해당년도 및 조사구간수, 수질, 부착돌말류, 저서성 대형무척추동물, 어류, 서식 및 수변환경, 수변식생에 대한 정보를 표형식으로 리포트에 출력합니다. 이 리포트를 선택하면 설정창에서 사용자가 원하는 년도와 영역의 범위(대권역, 본류, 지류, 기타하천)을 추가해야 합니다. 출력되는 표에는 년도, 영역의 범위, 조사구간수, BOD(평균, 등급), TDI평균, 등급), BMI(평균, 등급), FAI(평균, 등급), HRI(평균, 등급), RVI(평균, 등급)의 값을 같이 표현합니다.</span>' +
					'</li>' +
					'</ul>'
			}]
		}]
	}],
	initComponent: function () {
		this.callParent();
	}
});
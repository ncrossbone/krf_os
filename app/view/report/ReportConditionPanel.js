/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.report.ReportConditionPanel', {
	extend: 'Ext.panel.Panel',
	requires: ['krf_new.view.report.ReportConditionView'],
	id: 'reportConditionPanel',
	xtype: 'select-report-condition',

	layout: {
		type: 'border'
	},

	items: [{
		xtype: 'panel',
		region: 'north',
		header: false,
		bodyStyle: 'background: url(./resources/images/rpt/r_bg.gif);',
		layout: { type: 'hbox' },
		items: [{
			/* 조사 년도 */
			xtype: 'panel',
			bodyStyle: 'background:transparent;',
			style: 'margin-left:5px; margin-top:5px;',
			header: false,
			id: 'reportConditionPanel0',
			width: 151,
			height: 350,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition0',
				bodyStyle: 'border:none;',
				conditionType: 'id'
			}]
		}, {
			/* 시작 년도 */
			xtype: 'panel',
			bodyStyle: 'background:transparent;',
			style: 'margin-left:5px; margin-top:5px;',
			header: false,
			id: 'reportConditionPanel1',
			width: 151,
			height: 350,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition1',
				bodyStyle: 'border:none;',
				conditionType: 'id'
			}]
		}, {
			/* 끝 년도 */
			xtype: 'panel',
			bodyStyle: 'background:transparent;',
			style: 'margin-left:5px; margin-top:5px;',
			header: false,
			id: 'reportConditionPanel2',
			width: 151,
			height: 350,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition2',
				conditionType: 'id'
			}]
		}, {
			/* 상세 범위 */
			xtype: 'panel',
			bodyStyle: 'background:transparent;',
			style: 'margin-left:5px; margin-top:5px;',
			header: false,
			id: 'reportConditionPanel3',
			width: 151,
			height: 350,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition3',
				conditionType: 'id'
			}]
		}, {
			/* 항목선택 */
			xtype: 'panel',
			bodyStyle: 'background:transparent;',
			style: 'margin-left:5px; margin-top:5px;',
			header: false,
			id: 'reportConditionPanel4',
			width: 151,
			height: 350,
			items: [{
				xtype: 'select-report-condition-view',
				id: 'reportCondition4',
				conditionType: 'id'
			}]
		}]
	}, {
		xtype: 'panel',
		region: 'center',
		title: '<b style="color:#ffffff;">조건 (*조건을 끌어다 놓으세요.)</b>',
		header: {
			style: 'background: #323C46; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) inset; -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) inset; -moz-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) inset; '
		},
		bodyStyle: 'background:url(./resources/images/rpt/aa.gif) no-repeat; background-size:cover;',
		id: 'conditiondroppanel',
		cls: 'conditiondroppanel',
		layout: { type: 'border' },
		dragWin: [],
		setSortObj: function () {

			var con = this.conditions;
			if (con) {
				for (var key in con) {
					con[key].sort(function (a, b) {
						return a.idx < b.idx ? -1 : a.idx > b.idx ? 1 : 0;
					});
				}
				var preObj = con;
				var sortObj = Object.keys(con).sort();
				this.conditions = {};
				for (var i = 0; i < sortObj.length; i++) {
					this.conditions[sortObj[i]] = preObj[sortObj[i]];
				}

			}
		},
		items: [{
			xtype: 'panel',
			id: 'rptBtnGrp',
			bodyStyle: 'background:transparent; padding-right:10px;',
			layout: {
				type: 'hbox',
				pack: 'end'
			},
			region: 'south',
			items: [{
				/* 뒤로가기 */
				xtype: 'image',
				src: './resources/images/rpt/btn_back.gif',
				style: 'cursor: pointer;',
				listeners: {
					el: {
						click: function () {
							var reportMain = Ext.getCmp('reportMainContents');
							var rptViewBtn = Ext.getCmp('rptViewBtn');
							reportMain.setActiveItem(0);
							reportMain.closeDragWin();
							rptViewBtn.hide();
						}
					}
				}

			}, {
				/* 정렬 */
				xtype: 'image',
				src: './resources/images/rpt/btn_range.gif',
				style: 'cursor: pointer; margin-left:10px;',
				listeners: {
					el: {
						click: function () {
							var reportWin = Ext.getCmp('report-win');
							var rptViewBtn = Ext.getCmp('rptViewBtn');

							var offsetX = reportWin.getX();
							var offsetY = reportWin.getY() - 25;

							var keyOffsetX = -145;

							var conditionDropPanel = Ext.getCmp('conditiondroppanel');
							conditionDropPanel.setSortObj();
							for (var key in conditionDropPanel.conditions) {
								if (conditionDropPanel.conditions[key].length > 0) {
									keyOffsetX += 155;
									rptViewBtn.show();
								}

								for (var i = 0; i < conditionDropPanel.conditions[key].length; i++) {
									var conObj = conditionDropPanel.conditions[key][i];

									var conditionWin = Ext.getCmp(conObj.id);
									conditionWin.animate({
										duration: 700,
										to: {
											x: offsetX + keyOffsetX,
											y: conditionDropPanel.conditionWindowOffsetTop + offsetY + ((i + 1) * 60)
										}
									});
								}
							}
						}
					}
				}

			}, {
				/* 리포트 보기 */
				xtype: 'image',
				src: './resources/images/rpt/btn_rpview.gif',
				style: 'cursor: pointer; margin-left:10px;',
				id: 'rptViewBtn',
				hidden: true,
				isYearCheck: function (id, data) {
					if (id == 'reportCondition1' || id == 'reportCondition2') {
						var conditionDropPanel = Ext.getCmp('conditiondroppanel');
						var preConditions = '';

						id == 'reportCondition1' ? preConditions = 'reportCondition2' : preConditions = 'reportCondition1';
						var preObj = conditionDropPanel.conditions[preConditions];
						if (preObj && preObj.length > 0) {
							var startYear = 0;
							var endYear = 0;
							if (id == 'reportCondition1') {
								startYear = parseInt(data.value);
								endYear = parseInt(preObj[0].value);
							} else {
								startYear = parseInt(preObj[0].value);
								endYear = parseInt(data.value);
							}

							if (endYear - startYear >= 0) {
								return true;
							} else {
								alert('시작년도가 완료년도보다 큽니다.');
								return false;
							}
						} else {
							return true;
						}

					} else {
						return true;
					}
				},
				setParam: function (param, reportType) {
					var conditiondroppanel = Ext.getCmp('conditiondroppanel');
					conditiondroppanel.setSortObj();

					var areaStr = 'area';
					var itemStr = 'item';
					var startYear = 'startYear=&';
					var endYear = 'endYear=&';
					var iYear = 'year=';

					var paramStr = '&';

					for (var j = 1; j < 5; j++) {
						paramStr += areaStr + j + '=hide&';
					}

					for (var k = 1; k < 7; k++) {
						paramStr += itemStr + k + '=hide&';
					}

					for (var key in param) {
						var conObj = param[key];

						if (conObj.length > 0) {
							if (key == 'reportCondition1') {
								startYear = 'startYear=' + conObj[0].value + '&';
							} else if (key == 'reportCondition2') {
								endYear = 'endYear=' + conObj[0].value + '&';
							} else if (key == 'reportCondition0') {
								iYear += conObj[0].value;
							} else {
								for (var i = 0; i < conObj.length; i++) {
									if (key == 'reportCondition3') {
										paramStr = paramStr.replace(areaStr + conObj[i].idx + '=hide', areaStr + conObj[i].idx + '=show');
									} else if (key == 'reportCondition4') {
										paramStr = paramStr.replace(itemStr + conObj[i].idx + '=hide', itemStr + conObj[i].idx + '=show');
									}
								}
							}
						}
					}
					return paramStr + startYear + endYear + iYear;
				},
				listeners: {
					el: {
						click: function () {
							var conditionDropPanel = Ext.getCmp('conditiondroppanel');
							var rptMain = Ext.getCmp('reportMainContents');
							var requireCom = rptMain.requireCom;

							var alertStr = {
								'reportCondition0': '조사년도를 선택하세요.',
								'reportCondition1': '시작년도를 선택하세요.',
								'reportCondition2': '완료년도를 선택하세요.',
								'reportCondition3': '상세범위를 선택하세요.',
								'reportCondition4': '항목을 선택하세요.'
							};

							if (conditionDropPanel) {
								var conditions = conditionDropPanel.conditions;
								if (conditions) {
									for (var i = 0; i < requireCom.length; i++) {
										if (conditions[requireCom[i]]) {
											if (conditions[requireCom[i]].length == 0) {
												alert(alertStr[requireCom[i]]);
												return;
											}
										} else {
											alert(alertStr[requireCom[i]]);
											return;
										}
									}

									var param = Ext.getCmp(this.id).setParam(conditions, rptMain.reportType);
									window.open('./ClipReport4/krfOsReport.jsp?type=' + rptMain.reportType + param, '', 'width=1200,height=900,status=no,toolbar=no,scrollbars=no');

								} else {
									alert('선택된 값이 없습니다.');
								}
							}
						}
					}
				}

			}]
		}],
		listeners: {
			render: function (v) {
				v.dropZone = Ext.create('Ext.dd.DropZone', v.el, {

					//      If the mouse is over a target node, return that node. This is
					//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
					getTargetFromEvent: function (e) {
						//console.log('getTargetFromEvent', arguments);
						return e.getTarget('.conditiondroppanel');
					},

					//      On entry into a target node, highlight that node.
					onNodeEnter: function (target, dd, e, data) {
						// console.log('onNodeEnter', arguments);
						// Ext.fly(target).addCls('hospital-target-hover');
					},

					//      On exit from a target node, unhighlight that node.
					onNodeOut: function (target, dd, e, data) {
						//console.log('onNodeOut', arguments);
						//$(dd.proxy.el.dom).html('<div>실패</div>');
						// Ext.fly(target).removeCls('hospital-target-hover');
					},

					//      While over a target node, return the default drop allowed class which
					//      places a "tick" icon into the drag proxy.
					onNodeOver: function (target, dd, e, data) {
						// 여기서 조건을 넣을수 있는지 체크해서 가능하면 proto.dropAllowed, 불가능은 proto.dropNotAllowed 리턴

						var proto = Ext.dd.DropZone.prototype;
						//$(dd.proxy.el.dom).html('<div>성공</div>');
						return proto.dropAllowed;

						// var hospital = getHospitalFromTarget(target),
						// 	name = data.patientData.name,
						// 	proto = Ext.dd.DropZone.prototype;

						// return allowPatientallowPatient(hospital, name) ? proto.dropAllowed : proto.dropNotAllowed;
					},

					//      On node drop, we can interrogate the target node to find the underlying
					//      application object that is the real target of the dragged data.
					//      In this case, it is a Record in the GridPanel's Store.
					//      We can use the data set up by the DragZone's getDragData method to read
					//      any data we decided to attach.
					onNodeDrop: function (target, dd, e, data) {
						var rptViewBtn = Ext.getCmp('rptViewBtn');


						var conditionDropPanel = Ext.getCmp('conditiondroppanel');
						if (!conditionDropPanel.conditions) {
							conditionDropPanel.conditions = {};
						}

						if (conditionDropPanel.conditions[dd.id]) {
							var conArr = conditionDropPanel.conditions[dd.id];
							if (dd.id == 'reportCondition1' || dd.id == 'reportCondition2' || dd.id == 'reportCondition0') {
								var chk = rptViewBtn.isYearCheck(dd.id, data.srcData);

								if (!chk) {
									return;
								}
								if (conArr[0]) {
									Ext.getCmp(conArr[0].id).close();
								}
								rptViewBtn.hide();
								conArr[0] = data.srcData;
							} else {
								var getIdx = conArr.map(function (e) {
									return e.id;
								}).indexOf(data.srcData.id);


								if (getIdx > -1) {
									return;
								} else {
									conditionDropPanel.conditions[dd.id].push(data.srcData);
									rptViewBtn.hide();
								}
							}
						} else {

							var chk = rptViewBtn.isYearCheck(dd.id, data.srcData);

							if (!chk) {
								return;
							}
							conditionDropPanel.conditions[dd.id] = [];
							conditionDropPanel.conditions[dd.id].push(data.srcData);
							rptViewBtn.hide();
						}

						conditionDropPanel.conditionWindowOffsetTop = target.offsetTop + 40;

						var reportWin = Ext.getCmp('report-win');

						var targetX = e.clientX - reportWin.getX();
						var targetY = e.clientY - (reportWin.getY() + target.offsetTop + 50);

						var conditionWindow = Ext.create('Ext.window.Window', {
							renderTo: 'conditiondroppanel',
							header: {
								style: 'border: none;',
								height: 50,
								html: ''
							},
							border: false,
							id: data.srcData.id,
							conditionId: dd.id,
							animCollapse: false,
							collapsible: false,
							maximizable: false,
							minimizable: false,
							resizable: false,
							constrain: true,
							constrainHeader: false,
							shadow: false,
							closable: false,
							x: targetX,
							y: targetY,
							width: 150,
							style: 'border:none !important; background-color: transparent;',
							listeners: {
								render: function () {
									this.collapse();
								},
								afterRender: function () {
									var urlStr = 'url(./resources/images/rpt/' + this.id + 'drop.png) no-repeat';
									this.header.setStyle('background', urlStr);
									this.header.setStyle('background-color', 'transparent');
									var htmlStr = '<div style="position: absolute; top: 7px; right: -4px; width: 25px; height: 24px; cursor: pointer;" onclick=Ext.getCmp("' + this.id + '").close();><div>';
									this.header.setHtml(htmlStr);
								},
								close: function (win) {
									var conditionDropPanel = Ext.getCmp('conditiondroppanel');
									if (conditionDropPanel.conditions[win.conditionId]) {
										var conArr = conditionDropPanel.conditions[win.conditionId];

										var getIdx = conArr.map(function (e) {
											return e.id;
										}).indexOf(win.id);

										conditionDropPanel.conditions[win.conditionId].splice(getIdx, 1);
									}
								},
								drag: function () {
									var rptViewBtn = Ext.getCmp('rptViewBtn');
									rptViewBtn.hide();
								}
							}
						});

						conditionWindow.show();

						return true;
					}
				});
			}
		}
	}, {
		xtype: 'panel',
		region: 'south',
		height: 20,
		bodyStyle: 'background:url(./resources/images/rpt/ab.gif) repeat-x; width:100%;'
	}],
	initComponent: function () {
		this.callParent();
	}
});
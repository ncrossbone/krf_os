/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.ReachToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	requires: [
		'krf_new.view.center.ReachToolbarController'
	],
	xtype: 'center-reachtoolbar',

	title: '리치 제어용 툴바',

	id: 'reachToolbar',

	/* 사이즈 지정 */
	itemWidth: 102,
	itemHeight: 74,

	height: 74,
	style: 'padding: 0px;',

	controller: 'reachToolbar',

	onClickListener: {
		el: {
			click: 'onClickButton'
		}
	},

	layout: {
		type: 'hbox',
		align: 'middle',
		pack: 'left'
	},

	y: 0,

	initComponent: function () {

		this.items = [{
			xtype: 'image',
			id: 'btnMenu01',
			groupId: 'groupSmart',
			title: '데이터셋설정',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickSmart' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu01_on.png',
			btnOffImg: './resources/images/button/reach_menu01.png',
			src: './resources/images/button/reach_menu01.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu04',
			groupId: 'startBtn',
			title: '시작위치',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickStartReach' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu04_on.png',
			btnOffImg: './resources/images/button/reach_menu04.png',
			src: './resources/images/button/reach_menu04.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu05',
			groupId: 'endBtn',
			title: '끝위치',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickEndReach' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu05_on.png',
			btnOffImg: './resources/images/button/reach_menu05.png',
			src: './resources/images/button/reach_menu05.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu02',
			groupId: 'group1',
			title: '리치추가',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickAddReach' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu02_on.png',
			btnOffImg: './resources/images/button/reach_menu02.png',
			src: './resources/images/button/reach_menu02.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu03',
			groupId: 'group1',
			title: '구간제거',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickRemoveReach' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu03_on.png',
			btnOffImg: './resources/images/button/reach_menu03.png',
			src: './resources/images/button/reach_menu03.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu09',
			groupId: 'group1',
			title: '하류제거',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickRemoveReachLine' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu03_on.png',
			btnOffImg: './resources/images/button/reach_menu03.png',
			src: './resources/images/button/reach_menu03.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu06',
			groupId: 'group1',
			title: '드래그선택',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickDrag' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu06_on.png',
			btnOffImg: './resources/images/button/reach_menu06.png',
			src: './resources/images/button/reach_menu06.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu07',
			groupId: 'group1',
			title: '반경선택',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickRadius' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu07_on.png',
			btnOffImg: './resources/images/button/reach_menu07.png',
			src: './resources/images/button/reach_menu07.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu08',
			groupId: 'group1',
			title: '초기화',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: { el: { click: 'onClickReset' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu08_on.png',
			btnOffImg: './resources/images/button/reach_menu08.png',
			src: './resources/images/button/reach_menu08.png',
			hidden: true
		}, {
			xtype: 'button',
			id: 'btn3dMap',
			toggleGroup: 'grpSRiver',
			btnOnOff: 'on',
			text: '3D지도',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClick3D' } }
		}, {
			xtype: 'image',
			//id: 'btnReachLayer',
			layerId: 'baseMap',
			groupId: 'grpBase',
			title: '배경맵',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: {
				el: {
					click: function (obj, el, evt) {
						// 버튼 On/Off
						var currCtl = SetBtnOnOff(el.id);
						if (currCtl.btnOnOff == "on") {
							$KRF_APP.coreMap.baseMap.setVisibility(true);
						} else {
							$KRF_APP.coreMap.baseMap.setVisibility(false);
						}
					}
				}
			},
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/btn_top_05_on.png',
			btnOffImg: './resources/images/button/btn_top_05_off.png',
			src: './resources/images/button/btn_top_05_on.png'
		}, {
			xtype: 'container',
			width: 5
		}, {
			xtype: 'image',
			id: 'btnReachLayer',
			layerId: '55',
			groupId: 'grpReach',
			title: '리치라인',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: {
				el: {
					click: function (obj, el, evt) {
						$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId(el.id);
					}
				}
			},
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/btn_top_01_on.png',
			btnOffImg: './resources/images/button/btn_top_01_off.png',
			src: './resources/images/button/btn_top_01_on.png'
		}, {
			xtype: 'container',
			width: 5
		}, {
			xtype: 'image',
			id: 'btnAreaLayer',
			groupId: 'grpArea',
			title: '집수구역',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: {
				el: {
					click: function (obj, el, evt) {
						$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId(el.id);
					}
				}
			},
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/btn_top_02_on.png',
			btnOffImg: './resources/images/button/btn_top_02_off.png',
			src: './resources/images/button/btn_top_02_off.png'
		}, {
			xtype: 'image',
			id: 'btnFlowLayer',
			groupId: 'grpFlow',
			title: '리치흐름',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			style: 'cursor:pointer;',
			listeners: {
				el: {
					click: function (obj, el, evt) {
						$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId(el.id);
					}
				}
			},
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/btn_top_04_on.png',
			btnOffImg: './resources/images/button/btn_top_04_off.png',
			src: './resources/images/button/btn_top_04_on.png'
		}, {
			xtype: 'container',
			width: 5
		}, {
			xtype: 'image',
			id: 'btnLayerReset',
			groupId: 'grpReset',
			title: '초기화',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: {
				el: {
					click: function (obj, el, evt) {
						ResetButtonClick();
					}
				}
			},
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/btn_top_03_on.png',
			btnOffImg: './resources/images/button/btn_top_03_off.png',
			src: './resources/images/button/btn_top_03_off.png'
		}, {
			xtype: 'container',
			width: 5
		}, {
			xtype: 'button',
			//id: 'btnLayerSRiver',
			id: 'btnMenu10',
			toggleGroup: 'grpSRiver',
			btnOnOff: 'on',
			text: '미니맵',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: {
				el: {
					//click: 'onClickSRiver'
					click: 'onClickMiniMap'
				}
			}
		}, {
			xtype: 'container',
			width: 50
		}, {
			xtype: 'image',
			title: '공지사항', width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {
				el: {
					click: function () {
						var boardCtl = Ext.getCmp("boardNotice");
						if (boardCtl == undefined) {
							boardCtl = Ext.create("Ext.window.Window", {
								id: "boardNotice",
								title: "공지사항",
								width: 670,
								height: 580,
								html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=2"></iframe>',
								cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
								style: "border:solid 10px #E6E6E6;",
								closable: false,
								constrain: true,
								header: {
									items: [{
										xtype: 'image',
										src: './resources/images/button/btn_close.png',
										style: 'padding-right:13px !important; cursor:pointer;',
										listeners: {
											el: {
												click: function () {
													Ext.getCmp("boardNotice").close();
												}
											}
										}
									}]
								}
							});
						}
						Ext.getCmp('center_container').add(boardCtl);
						boardCtl.show();
					}
				}
			},
			src: './resources/images/button/top_btn4_off.png'
		}, {
			xtype: 'image',
			title: 'Q&A',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: {
				el: {
					click: function () {

						var boardCtl = Ext.getCmp("boardQNA");
						if (boardCtl == undefined) {
							boardCtl = Ext.create("Ext.window.Window", {
								id: "boardQNA",
								title: "Q&A",
								width: 660,
								height: 600,
								html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=1"></iframe>'
							});
						}
						Ext.getCmp('center_container').add(boardCtl);
						boardCtl.show();

					}
				}
			},
			src: './resources/images/button/top_btn5_off.png'
		}, {
			xtype: 'image',
			title: '저장',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {
				el: {
					click: function () {
						setActionInfo("", "", "", "", "화면저장");
						$KRF_APP.coreMap.capture();
					}
				}
			},
			src: './resources/images/button/top_btn2_off.png'
		}, {
			xtype: 'image',
			title: '매뉴얼',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: {
				el: {
					click: function () {
						OpenMenualPop();
					}
				}
			},
			src: './resources/images/button/top_btn6_off.png'
		}/*, '->', {
	    	xtype: 'image',
	    	id: 'btnMenuSave',
	    	groupId: 'groupSave',
	    	title: '설정저장',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickSave' } },
	    	btnOnOff: 'off',
	    	src: './resources/images/button/reach_menu_save.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenuOpen',
	    	groupId: 'groupOpen',
	    	title: '설정불러오기',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickOpen' } },
	    	btnOnOff: 'off',
	    	src: './resources/images/button/reach_menu_fileopen.png'
	    }*/];
		//	    
		//	    var popCtl = Ext.create("krf_new.view.center.SearchConfig", {
		//			x: 390,
		//			y: 170
		//		});
		//	    this.up("panel").add(popCtl);
		this.callParent();
	}
});
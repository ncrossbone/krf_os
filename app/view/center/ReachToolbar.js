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
	itemWidth: 70,
	itemHeight: 60,

	height: 60,
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

	getReachModeBtnIdx: function (btnId) {

		var btnObj = this.query('image');

		for (var i = 0; i < btnObj.length; i++) {
			if (btnObj[i].id == btnId) {
				return i;
			}
		}
	},

	showReachModeBtn: function (btnId) {

		var btnObj = this.query('image');

		for (var i = 0; i < btnObj.length; i++) {
			if (btnObj[i].id.indexOf('btnMenu0') > -1) {
				Ext.getCmp(btnObj[i].id).setVisible(true);
			}
		}
	},

	initComponent: function () {

		this.items = [{
			xtype: 'image',
			id: 'btn3DMap',
			groupId: 'group3D',
			title: '3D지도',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClick3D' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu01.png',
			btnOffImg: './resources/images/button/reach_menu01.png',
			src: './resources/images/button/reach_menu01.png'
		}, {
			xtype: 'image',
			id: 'btnMenu010',
			groupId: 'group1',
			title: '미니맵',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickMiniMap' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu02_on.png',
			btnOffImg: './resources/images/button/reach_menu02.png',
			src: './resources/images/button/reach_menu02.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu02',
			groupId: 'group1',
			title: '리치추가',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickAddReach' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu06_on.png',
			btnOffImg: './resources/images/button/reach_menu06.png',
			src: './resources/images/button/reach_menu06.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu03',
			groupId: 'group1',
			title: '리치제거',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickRemoveReach' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu06_on.png',
			btnOffImg: './resources/images/button/reach_menu07.png',
			src: './resources/images/button/reach_menu07.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu09',
			groupId: 'group1',
			title: '하류제거',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickRemoveReachLine' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu09_on.png',
			btnOffImg: './resources/images/button/reach_menu09.png',
			src: './resources/images/button/reach_menu09.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu04',
			groupId: 'startBtn',
			title: '시작위치',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
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
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickEndReach' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu05_on.png',
			btnOffImg: './resources/images/button/reach_menu05.png',
			src: './resources/images/button/reach_menu05.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu06',
			groupId: 'group1',
			title: '드래그선택',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickDrag' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu10_on.png',
			btnOffImg: './resources/images/button/reach_menu10.png',
			src: './resources/images/button/reach_menu10.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu07',
			groupId: 'group1',
			title: '반경선택',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickRadius' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu11_on.png',
			btnOffImg: './resources/images/button/reach_menu11.png',
			src: './resources/images/button/reach_menu11.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu01',
			groupId: 'groupSmart',
			title: '데이터셋설정',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickSmart' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu03_on.png',
			btnOffImg: './resources/images/button/reach_menu03.png',
			src: './resources/images/button/reach_menu03.png',
			hidden: true
		}, {
			xtype: 'image',
			id: 'btnMenu08',
			groupId: 'group1',
			title: '초기화',
			width: this.itemWidth,
			height: this.itemHeight,
			style: 'cursor:pointer;',
			listeners: { el: { click: 'onClickReset' } },
			btnOnOff: 'off',
			btnOnImg: './resources/images/button/reach_menu14.png',
			btnOffImg: './resources/images/button/reach_menu14.png',
			src: './resources/images/button/reach_menu14.png',
			hidden: true
		}, {
		// 	xtype: 'image',
		// 	id: 'aaaa',
		// 	title: '검색',
		// 	width: this.itemWidth,
		// 	height: this.itemHeight,
		// 	style: 'cursor:pointer;',
		// 	listeners: { el: { click: 'test' } },
		// 	btnOnOff: 'off',
		// 	btnOnImg: './resources/images/button/reach_menu14.png',
		// 	btnOffImg: './resources/images/button/reach_menu14.png',
		// 	src: './resources/images/button/reach_menu14.png'
		// }, {
		// 	xtype: 'image',
		// 	id: 'aaaaa',
		// 	title: '데이터',
		// 	width: this.itemWidth,
		// 	height: this.itemHeight,
		// 	style: 'cursor:pointer;',
		// 	listeners: { el: { click: 'test2' } },
		// 	btnOnOff: 'off',
		// 	btnOnImg: './resources/images/button/reach_menu14.png',
		// 	btnOffImg: './resources/images/button/reach_menu14.png',
		// 	src: './resources/images/button/reach_menu14.png'
		// }, {
			xtype: 'container',
			id: 'gapToolbarContainer',
			width: 10
		}, {
			xtype: 'image',
			id: 'btnAreaLayer',
			groupId: 'btnAreaLayer',
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
			btnOnImg: './resources/images/button/reach_menu12_on.png',
			btnOffImg: './resources/images/button/reach_menu12.png',
			src: './resources/images/button/reach_menu12.png'
		}, {
			xtype: 'image',
			id: 'btnReachLayer',
			layerId: '58',
			groupId: 'btnReachLayer',
			title: '리치라인',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {
				el: {
					click: function (obj, el, evt) {
						$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId(el.id);
					}
				}
			},
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/reach_menu13_on.png',
			btnOffImg: './resources/images/button/reach_menu13.png',
			src: './resources/images/button/reach_menu13_on.png'
		}, {
			xtype: 'image',
			id: 'btnReachNodeLayer',
			layerId: '57',
			groupId: 'btnReachNodeLayer',
			title: '리치노드',
			style: 'cursor:pointer;',
			width: this.itemWidth,
			height: this.itemHeight,
			listeners: {
				el: {
					click: function (obj, el, evt) {
						$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId(el.id);
					}
				}
			},
			btnOnOff: 'on',
			btnOnImg: './resources/images/button/reach_menu20_on.png',
			btnOffImg: './resources/images/button/reach_menu20.png',
			src: './resources/images/button/reach_menu20_on.png'
		}, {
			xtype: 'image',
			id: 'btnFlowLayer',
			groupId: 'btnFlowLayer',
			title: '리치흐름',
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
			btnOnImg: './resources/images/button/reach_menu18_on.png',
			btnOffImg: './resources/images/button/reach_menu18.png',
			src: './resources/images/button/reach_menu18_on.png'
		}, {
			xtype: 'image',
			id: 'btnSave',
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
			src: './resources/images/button/reach_menu16.png'
		}, {
			xtype: 'image',
			id: 'btnNotice',
			title: '공지사항',
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
								width: 680,
								height: 580,
								onEsc: false,
								html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=2"></iframe>',
								cls: 'subWindow-x-form-item-label-default',
								header: { cls: 'subWindow-x-form-item-label-default' },
								constrain: true
							});
						}
						Ext.getCmp('center_container').add(boardCtl);
						boardCtl.show();
					}
				}
			},
			src: './resources/images/button/reach_menu15.png'
		}, {
			xtype: 'image',
			id: 'btnQnA',
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
								width: 680,
								height: 600,
								onEsc: false,
								cls: 'subWindow-x-form-item-label-default',
								header: { cls: 'subWindow-x-form-item-label-default' },
								constrain: true,
								html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=1"></iframe>'
							});
						}
						Ext.getCmp('center_container').add(boardCtl);
						boardCtl.show();

					}
				}
			},
			src: './resources/images/button/reach_menu19.png'
		}, {
			xtype: 'image',
			id: 'btnMenual',
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
			src: './resources/images/button/reach_menu17.png'
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
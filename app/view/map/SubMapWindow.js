Ext.define('krf_new.view.map.SubMapWindow', {

	extend: 'Ext.window.Window',

	xtype: 'sub-map-win',

	id: 'subMapWindow',

	header: {
		style: 'background: #043264 !important; border: none;',
		height: 20
	},

	constrain: true,

	shadow: false,

	resizable: false,

	closable: false,

	layout: {
		type: 'fit'
	},

	width: 460,

	height: 330,

	x: 120,

	y: 700,

	listeners: {
		move: function (theWin, xP, yP, theOp) {
		},
		resize: function (win, width, height) {
		},
		render: function () {
		},
		afterrender: function () {
		},
		show: function () {
			$KRF_APP.subMap.mapRendered();
			console.info("?");
			$KRF_APP.fireEvent($KRF_EVENT.INITMINIMAPLINE);
		}
	},
	items: [{
		xtype: "app-map-coreMap",
		id: '_subMapDiv_',
		html:'<div style="cursor:pointer; background: url(./resources/images/button/btn_close2.png); position: absolute; top: 0px; right: 0px; width: 28px; height: 28px; z-index: 1;" onclick=Ext.getCmp("subMapWindow").close()></div>'
	}]
});
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

	onEsc:false,

	layout: {
		type: 'fit'
	},

	width: 460,

	height: 330,

	x: 120,

	y: 700,
	once: true,

	listeners: {
		move: function (theWin, xP, yP, theOp) {
		},
		resize: function (win, width, height) {
		},
		render: function () {
			//$KRF_APP.fireEvent($KRF_EVENT.INITMINIMAPLINE);
			//$KRF_APP.fireEvent($KRF_EVENT.INITMINIMAPLINE);
		},
		afterrender: function () {
		},
		show: function () {
			if(this.once){
				$KRF_APP.subMap.mapRendered();
				this.once = false;
			}
		}
	},
	items: [{
		xtype: "app-map-coreMap",
		id: '_subMapDiv_',
		html:'<div style="cursor:pointer; background: url(./resources/images/button/btn_close2.png); position: absolute; top: 0px; right: 0px; width: 28px; height: 28px; z-index: 1;" onclick="miniMapHide()"></div>'
	}]
});
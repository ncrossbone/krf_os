Ext.define('krf_new.view.map.SubMapWindow', {
	extend: 'Ext.window.Window',
	xtype: 'sub-map-win',
	id: 'subMapWindow',
	cls: 'subWindow-x-form-item-label-default',
	header: true,
	constrain: true,
	shadow: false,
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
	items: [{ xtype: "app-map-coreMap", id: '_subMapDiv_' }]
});
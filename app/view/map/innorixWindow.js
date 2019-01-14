Ext.define('krf_new.view.map.innorixWindow', {

	extend: 'Ext.window.Window',
	xtype: 'map-innorixWindow',

	id: 'innorixWindow',
	width: 555,
	height: 240,
	header: true,
	constrain: true,
	title: '파일다운로드',
	cls: 'subWindow-x-form-item-label-default',
	header: { cls: 'subWindow-x-form-item-label-default' },
	onEsc: false,
	html: ('<div id="fileControl" style="position:absolute; height:100% z-index:999; margin-left:0px;  border:2px solid #676767;">123123123</div><br/>')
});
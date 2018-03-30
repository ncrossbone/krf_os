Ext.define('krf_new.view.admin.LayerListView', {

	extend: 'Ext.view.View',

	requires: [],
	xtype: 'layerListView',

	id: 'layerListView',
	cls: 'patient-view',
	tpl: '<tpl for=".">' +
		'<div class="layer-source x-unselectable" style="background: #F8F8F8; border:solid #0080AE 2px; margin: 10px 10px 5px 10px;border-radius: 3px;">'+
		'<div style="height: 35px;padding-top: 9px; padding-left: 10px; padding-right: 10px;">{layerSetName}</div></div>' +
		'</tpl>',
	itemSelector: 'div.layer-source',
	overItemCls: 'layer-over',
	selectedItemClass: 'layer-selected',
	singleSelect: true,
	scrollable : true,
	listeners: {
		itemclick: function (view, record, item, index, e, eOpts) {
			var layerSetWin = Ext.getCmp("layer-set-win");
			if (layerSetWin) {
				layerSetWin.close();
			}
			layerSetWin = Ext.create('krf_new.view.admin.LayerSetWindow', { x: Ext.getCmp('adminConfigTabPanel').getX() + 100, y: 50, openType: 'edit', layerSetInfo: record.data });
			Ext.getCmp('adminConfigTabPanel').add(layerSetWin);

			layerSetWin.show();
		},
		render: function (v) {
			this.getStore().load();

			v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

				getDragData: function (e) {
					var sourceEl = e.getTarget(v.itemSelector, 10), d;
					if (sourceEl) {
						d = sourceEl.cloneNode(true);
						d.id = Ext.id();
						return (v.dragData = {
							sourceEl: sourceEl,
							repairXY: Ext.fly(sourceEl).getXY(),
							ddel: d,
							srcData: v.getRecord(sourceEl).data
						});
					}
				},

				getRepairXY: function () {
					return this.dragData.repairXY;
				}
			});
		}
	}
});
Ext.define('krf_new.view.admin.LayerChoosePanel', {

	extend: 'Ext.panel.Panel',

	requires: ['krf_new.view.admin.UserGridPanel',
		'krf_new.view.admin.LayerListView'],

	collapsible: false,
	// controller: 'center',

	cls: 'khLee-x-header',
	xtype: 'adminConfig-Center',

	layout: {
		type: 'border'
	},
	items: [{
		xtype: 'panel',
		title: '<b style="color:#ffffff;">주제도세트 설정 (*주제도세트를 끌어다 사용자 목록에 넣으세요.)</b>',
		header: {
			style: 'background: #323C46; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) inset; -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) inset; -moz-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) inset; '
		},

		bodyStyle: 'background:url(./resources/images/rpt/r_bg.gif);',
		width: 200,
		region: 'center',
		layout: { type: 'border' },
		items: [{
			xtype: 'panel',
			bodyStyle: 'background:url(./resources/images/rpt/r_bg.gif);',
			width: 200,
			region: 'west',
			layout: { type: 'border' },
			items: [{
				xtype: 'container',
				region: 'north',
				style: 'background: #4C71C3; padding: 0px; border-bottom: 1px solid #233f95; height:30px;',
				layout:{
					type: 'hbox',
					pack: 'center',
					align: 'middle'
				},
				items: [{
					xtype: 'image',
					id: 'btnAddLayerSet',
					title: '추가',
					style: 'left: 0px !important;',
					width: 200,
					height: 30,
					src: './resources/images/button/admin/layer_btn.gif',
					listeners: {
						el: {
							click: function () {
								var layerSetWin = Ext.getCmp("layer-set-win");
								if (layerSetWin == undefined) {
									layerSetWin = Ext.create('krf_new.view.admin.LayerSetWindow', { x: Ext.getCmp('adminConfigTabPanel').getX() + 100, y: 50, openType: 'new' });
									Ext.getCmp('adminConfigTabPanel').add(layerSetWin);
								}

								layerSetWin.show();
							}
						}
					}
				}]
			}, { xtype: 'layerListView', width: 200, region: 'center', store: Ext.create('krf_new.view.admin.LayerConfigStore') }]
		},
		{ xtype: 'userGridPanel', region: 'center', cls: 'userGridPanelDrop', disableSelection: true }]
	},
	],
	initComponent: function () {
		this.callParent();

		$KRF_APP.addListener($KRF_EVENT.RELOAD_LAYER_SET, this.reloadLayerSet, this);
		$KRF_APP.addListener($KRF_EVENT.RELOAD_USER_LIST, this.reloadUserList, this);


	}, listeners: {
		render: function (v) {
			v.dropZone = Ext.create('Ext.dd.DropZone', v.el, {

				//      If the mouse is over a target node, return that node. This is
				//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
				getTargetFromEvent: function (e) {
					//console.log('getTargetFromEvent', arguments);
					return e.getTarget('.x-grid-item');
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
					var recordIndex = target.getAttribute('data-recordindex');

					var targetRecord = Ext.getCmp('userGridPanel').getView().getRecord(parseInt(recordIndex));

					if (targetRecord.data.layerSetId == data.srcData.layerSetId) {
						return proto.dropNotAllowed;
					}
					return proto.dropAllowed;

					//$(dd.proxy.el.dom).html('<div>성공</div>');


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

					if (e.record.data.layerSetId == data.srcData.layerSetId) {
						return false;
					}

					Ext.Ajax.request({
						url: _API.putLayerSetByUser,
						dataType: "text/html",
						method: 'POST',
						params: {
							layerSetId: data.srcData.layerSetId, userId: e.record.data.userId, regUserId:$KRF_APP.loginInfo.userId
						},
						async: true, // 비동기 = async: true, 동기 = async: false
						success: function (response, opts) {
							if (response.responseText == 'error') {
								return;
							}
							e.record.data.layerSetId = data.srcData.layerSetId;
							e.record.data.layerSetName = data.srcData.layerSetName;

							var userGridView = Ext.getCmp('userGridPanel').getView();
							var targetRow = userGridView.getRow(e.recordIndex);
							targetRow.cells[0].firstChild.innerText = data.srcData.layerSetName;
						},
						failure: function (form, action) {
							alert("오류가 발생하였습니다.");
						}
					});
					return true;
				}
			});
		}
	},
	reloadLayerSet: function () {
		var layerSetView = Ext.getCmp('layerListView');
		layerSetView.getStore().load();
	},
	reloadUserList: function () {
		var layerSetView = Ext.getCmp('userGridPanel');
		layerSetView.getStore().load();
	}
});
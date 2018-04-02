Ext.define('krf_new.view.admin.UserGridStore', {

	extend: 'Ext.data.Store',
	field: ['layerSetName', 'userId', 'userNm', 'orgName', 'levelNm', 'layerSetId'],

	async: false,

	autoLoad: false,

	listeners: {
		load: function (store) {
			Ext.Ajax.request({
				url: _API.getUsers,
				dataType: "text/html",
				method: 'POST',
				async: true, // 비동기 = async: true, 동기 = async: false
				success: function (response, opts) {
					if(response.responseText == 'error'){
						alert('사용자 조회 중 예외가 발생했습니다.');
						return;
					}
					var result = Ext.util.JSON.decode(response.responseText);

					store.setData(result.data);
				},
				failure: function (form, action) {
					alert("오류가 발생하였습니다.");
				}
			});
		}
	}
});
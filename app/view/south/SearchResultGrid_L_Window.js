Ext.define('krf_new.view.south.SearchResultGrid_L_Window', {
    extend: 'Ext.window.Window',

    xtype: 'south-searchResultGrid_L_Window',
    id: 'searchResultGrid_L_Window',
    title: '환경기초조사 정보',

    bodyStyle: 'padding:10px;',

    closable: true,
    constrain: true,
    minimizable: false,
    onEsc: false,
    header: { cls: 'subWindow-x-form-item-label-default' },
    cls: 'subWindow-x-form-item-label-default',
    width: 750,
    layout: {
        type: 'absolute'
    },
    html: "<!doctype html>"+
            "<html lang=\"ko\">"+
            "<head>"+
            "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"+
            "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />"+
            "<title>KRF-TOOLTIP</title>"+
            "<style>"+
            "/*basicset*/"+
            "textarea,th, td,  p {"+
            "	margin: 0px;"+
            "	padding: 0px;"+
            "}"+
            "table{"+
            "	border-collapse: separate;"+
            "	border-spacing:0;"+
            "	} "+
            "caption, th, td { "+
            "	text-align:left; "+
            "	font-weight: normal; "+
            "} "+
            "table.searchResult_L_Window1 { border-top:2px solid #000; width:100%; } "+
            "table.searchResult_L_Window1> caption{ visibility:hidden; width: 0; height: 0; overflow: hidden; } "+
            "table.searchResult_L_Window1> tbody> tr> th { border-bottom: 1px solid #e3e3e3; padding:10px; font-family:'dotum'; font-size:12px; color:#000; letter-spacing:-1px; background:#f0f0f0; text-align:center; font-weight:bold; } "+
            "table.searchResult_L_Window1> tbody> tr> td { border-bottom: 1px solid #e3e3e3; padding:10px; font-family:'dotum'; font-size:12px; color:#2e2e2e; letter-spacing:-1px; } "+
            ".tit { font-size:12px; font-weight:bold; font-family:'dotum'; margin:15px 0 5px 0;} "+
            "</style>  "+
            "</head> "+
            "<body style=\"padding:10px;\"> "+
            "	<table class=\"searchResult_L_Window1\"> "+
            "        <caption>보고서정보</caption> "+
            "        <colgroup> "+
            "        	<col style=\"width:15%\"/> "+
            "        	<col style=\"width:35%\"/> "+
            "        	<col style=\"width:15%\"/> "+
            "        	<col style=\"width:35%\"/> "+
            "        </colgroup> "+
            "        <tbody> "+
            "            <tr> "+
            "                <th>대분류명</th> "+
            "                <td id=\"result_l_LCLAS_NM\">비점오염과가축분뇨정책비중확대</td> "+
            "                <th>사업명</th> "+
            "                <td id=\"result_l_BSNS_NM\"></td> "+
            "            </tr> "+
            "            <tr> "+
            "                <th>단계</th> "+
            "                <td id=\"result_l_STEP_CODE \"></td> "+
            "                <th>사업년도</th> "+
            "                <td id=\"result_l_BSNS_NM \"></td> "+
            "            </tr> "+
            "            <tr> "+
            "                <th>연구기관</th> "+
            "                <td id=\"result_l_RSRCH_INSTT_NM \"></td> "+
            "                <th>총연구비</th> "+
            "                <td id=\"result_l_TOT_RSRCH_CT \"></td> "+
            "            </tr> "+
            "            <tr> "+
            "                <th>연구목적</th> "+
            "                <td id=\"result_l_RSRCH_PURPS_CN \" colspan=\"3\"> "+
            "                	 "+
            "                </td> "+
            "            </tr> "+
            "        </tbody> "+
            "    </table> "+
            "    <p class=\"tit\">주요연구결과</p> "+
            "	<table class=\"searchResult_L_Window1\"> "+
            "        <caption>주요연구결과</caption> "+
            "        <tbody> "+
            "            <tr> "+
            "                <th>연구결과</th> "+
            "            </tr> "+
            "            <tr>     "+ 
            "                <td id=\"result_l_RSRCH_RESULT_CN \"> "+
            "                	 "+
            "                </td> "+
            "            </tr> "+
            "        </tbody> "+
            "    </table> "+
            "</body> "+
            "</html> "
});
<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@page import="java.io.File"%>
<%@page import="com.clipsoft.clipreport.server.service.ReportUtil"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
OOFDocument oof = OOFDocument.newOOF();
    
    String type = request.getParameter("type");

    String year = request.getParameter("year");
    String startYear = request.getParameter("startYear");
    String endYear = request.getParameter("endYear");

    String area1 = request.getParameter("area1");
    String area2 = request.getParameter("area2");
    String area3 = request.getParameter("area3");
    String area4 = request.getParameter("area4");

    String item1 = request.getParameter("item1");
    String item2 = request.getParameter("item2");
    String item3 = request.getParameter("item3");
    String item4 = request.getParameter("item4");
    String item5 = request.getParameter("item5");
    String item6 = request.getParameter("item6");

if("rptCase1".equals(type)){

    oof.addField("YEAR",year);
    oof.addField("ITEM1",item1);
    oof.addField("ITEM2",item2);
    oof.addField("ITEM3",item3);

    OOFFile file = oof.addFile("crf.root", "%root%/crf/webos/1all.crf");

}else if("rptCase2_1".equals(type)){
    
    oof.addField("YEAR",year);
    oof.addField("AREA1",area1);
    oof.addField("AREA2",area2);
    oof.addField("AREA3",area3);
    oof.addField("AREA4",area4);
    oof.addField("ITEM1",item1);
    oof.addField("ITEM2",item2);
    oof.addField("ITEM3",item3);
    oof.addField("ITEM4",item4);
    oof.addField("ITEM5",item5);

    OOFFile file = oof.addFile("crf.root", "%root%/crf/webos/2-1all.crf");

}else if("rptCase2_2".equals(type)){

    oof.addField("STARTYEAR",startYear);
    oof.addField("ENDYEAR",endYear);
    oof.addField("AREA1",area1);
    oof.addField("AREA2",area2);
    oof.addField("AREA3",area3);
    oof.addField("AREA4",area4);
    oof.addField("ITEM1",item1);
    oof.addField("ITEM2",item2);
    oof.addField("ITEM3",item3);
    oof.addField("ITEM4",item4);
    oof.addField("ITEM5",item5);
    oof.addField("ITEM6",item6);

    OOFFile file = oof.addFile("crf.root", "%root%/crf/webos/2-2all.crf");
}else if("rptCase3".equals(type)){

    oof.addField("YEAR",year);
    oof.addField("AREA1",area1);
    oof.addField("AREA2",area2);
    oof.addField("AREA3",area3);
    oof.addField("AREA4",area4);

    OOFFile file = oof.addFile("crf.root", "%root%/crf/webos/3all.crf");
}else{
    return;
}

oof.addConnectionData("*","oracle1");
%><%@include file="Property.jsp"%><%
//세션을 활용하여 리포트키들을 관리하지 않는 옵션
//request.getSession().setAttribute("ClipReport-SessionList-Allow", false);
String resultKey =  ReportUtil.createReport(request, oof, "false", "false", request.getRemoteAddr(), propertyPath);
//oof 문서가 xml 일 경우 (oof.toString())
//String resultKey =  ReportUtil.createReport(request, oof.toString(), "false", "false", "localhost", propertyPath);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Report</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="stylesheet" type="text/css" href="./css/clipreport.css">
<link rel="stylesheet" type="text/css" href="./css/UserConfig.css">
<link rel="stylesheet" type="text/css" href="./css/font.css">
<script type='text/javascript' src='./js/clipreport.js'></script>
<script type='text/javascript' src='./js/jquery-1.11.1.js'></script>
<script type='text/javascript' src='./js/UserConfig.js'></script>
<script type='text/javascript'>
var urlPath = document.location.protocol + "//" + document.location.host;

function imgDelete(){
    return;
}
function imgPathReplace(){
    return;
}

function html2xml(divPath){	
    var reportkey = "<%=resultKey%>";
    var openerUrl = window.opener.location.origin + window.opener.location.pathname;
	var report = createImportJSPReport(openerUrl + "ClipReport4/Clip.jsp", reportkey, document.getElementById(divPath));
    
    report.view();
}
</script>
</head>
<body onload="html2xml('targetDiv1')">
<div id='targetDiv1' style='position:absolute;top:5px;left:5px;right:5px;bottom:5px;'></div>
</body>
</html>

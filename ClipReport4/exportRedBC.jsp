<%@page import="com.clipsoft.clipreport.export.option.PDFOption"%>
<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportPDFForRedBC"%>
<%@ page import="java.util.*,java.io.*,  java.lang.Integer, java.net.*" %>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.BufferedInputStream"%>
<%@page import="com.clipsoft.clipreport.server.service.ResultValue"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportExport"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileOutputStream"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="Property.jsp"%>
<%
OOFDocument oof = OOFDocument.newOOF();
OOFFile file = oof.addFile("crf.root", "%root%/crf/CLIPtoDRM.crf");
//pdf 생성할 때 옵션
PDFOption option = new PDFOption();
//텍스트를 이미지로 표현할지 여부
//option.setTextToImage(true);

//pdf 생성 및 바코드 데이터 생성 호출 메소드입니다.
ResultValue result = ClipReportPDFForRedBC.create(request, propertyPath, oof.toString(), option);
int errorCode = result.getErrorCode();
//errorCode == 0 정상
//errorCode == 1 리포트 서버 인스톨 오류
//errorCode == 2 oof 문서 오류
//errorCode == 3 리포트 엔진 오류
//errorCode == 4 결과물(document) 파일을 찾을 수 없을 때 오류
//errorCode == 5 pdf, dat 생성시 오류

//ResultValue 객체를 이용하여 연동하시면 될 것 같습니다. 

//저장된 파일 삭제 (파일을 사용하시고 아래의 메소드를 호출하시면 파일이 삭제됩니다.)
//ClipReportPDFForRedBC.delete(result);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>연동 TEST</title>
</head>
<body>
<h2>
쉽게 보실 수 있게 html에 출력하였습니다.
</h2><br>
서버에 생성된 pdf 위치 :
 <%=result.getPdfFilePath()%>
 <br>
서버에 생성된 바코드 데이터 위치 :
 <%=result.getDataFilePath()%>
 <br>
 바코드 좌표 left :
 <%=result.getLeft()%>
 <br>
 바코드 좌표 top :
 <%=result.getTop()%>
 <br>
 바코드 좌표 right :
 <%=result.getRight()%>
 <br>
 바코드 좌표 bottom :
 <%=result.getBottom()%>
 <br>
 리포트 Key:
 <%=result.getKey()%>
 <br>
</body>
</html>
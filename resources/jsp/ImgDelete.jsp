<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@page import="java.io.File"%>
<%@ page import = "java.util.*" %>

<%
String resultParam = request.getParameter("resultParam");
String[] paramArr = resultParam.split(",");

for(int i = 0; i < paramArr.length; i++){
	File file = new File(paramArr[i]);
	file.delete();
}
%>

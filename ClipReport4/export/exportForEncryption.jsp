<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.OutputStream"%>
<%@page import="com.clipsoft.clipreport.server.service.ExportInfo"%>
<%@page import="com.clipsoft.clipreport.server.service.ClipReportExport"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
out.clear();
out=pageContext.pushBody();

ExportInfo exportInfo = ClipReportExport.reportToFile(request, response);
int errorCode = exportInfo.getErrorCode();
//errorCode == 0 정상
//errorCode == 1 결과물(document) 파일을 찾을 수 없을 때 오류
//errorCode == 2 pdf, 바코드에 사용할 html 생성시 오류


//저장한 파일 위치
System.out.println(exportInfo.getExportfilePath());
//저장한 파일 확장자
System.out.println(exportInfo.getFileExtension());
String dstFile = exportInfo.getExportfilePath();

//파일 암호화 구간


//클라이언트로 파일 내리기
File downloadFile = new File(dstFile);
FileInputStream inStream = new FileInputStream(downloadFile);
// obtains response's output stream
OutputStream outStream = response.getOutputStream();
      
byte[] buffer = new byte[4096];
int bytesRead = -1;
      
while ((bytesRead = inStream.read(buffer)) != -1) {
    outStream.write(buffer, 0, bytesRead);
}
      
inStream.close();
outStream.close();     

//생성한 파일 삭제
ClipReportExport.deleteToFile(request, exportInfo);
%>
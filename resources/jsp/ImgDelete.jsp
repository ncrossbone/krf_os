<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@page import="java.io.File"%>
<%@ page import = "java.util.*" %>

<%

//�̹��� ���� ����
//2016.10.19 ph
String[] imgPath = {request.getParameter("resultParam"),
				    request.getParameter("svgParam"),
				    request.getParameter("pngParam")};

for(int i=0; i <= imgPath.length - 1; i++){
	File file = new File(imgPath[i]);
	file.delete();
}

//������ ���� �̹��� ����
//2016.10.19 ph
Calendar cal = Calendar.getInstance();
long todayMil = cal.getTimeInMillis();     // ���� �ð�(�и� ������)
long oneDayMil = 24*60*60*1000;            // �� ����

Calendar fileCal = Calendar.getInstance();
Date fileDate = null ;
String[] array;

array = imgPath[0].split("\\\\");
String path = "";

for(int i=0; i <= array.length - 2; i++){
	path += array[i] + "\\";
}

File fileList = new File(path);
File[] list = fileList.listFiles();            // ���� ����Ʈ ��������

for(int j=0 ; j < list.length; j++){

 // ������ ������ �����ð� ��������
 fileDate = new Date(list[j].lastModified());
 // ����ð��� ���� �����ð� �ð��� ���(���� : �и� ������)
 fileCal.setTime(fileDate);
 long diffMil = todayMil - fileCal.getTimeInMillis();
  
 //��¥�� ���
 int diffDay = (int)(diffMil/oneDayMil);

 // 7���� ���� ���� ����
 if(diffDay > 7 && list[j].exists()){
    list[j].delete();
 } 
  
}

%>

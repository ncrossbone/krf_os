<%@page import="java.io.IOException"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.util.StringTokenizer"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.net.HttpURLConnection"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFRow"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFSheet"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFWorkbook"%>
<%@page import="org.apache.poi.xssf.usermodel.XSSFRow"%>
<%@page import="java.util.UUID"%>
<%@page import="org.apache.poi.xssf.usermodel.XSSFSheet"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="com.google.gson.internal.LinkedTreeMap"%>
<%@page import="org.apache.poi.ss.usermodel.Workbook"%>
<%@page import="org.apache.poi.xssf.usermodel.XSSFWorkbook"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.google.gson.Gson"%>



<%
	response.setHeader("Access-Control-Allow-Origin","*");
	response.setHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept");
	try{
		Gson gson = new Gson();
		String fileName = request.getParameter("fileName");
		
		if(fileName==null){
			ArrayList headNameList = gson.fromJson(request.getParameter("headName"), ArrayList.class);
			ArrayList headList = gson.fromJson(request.getParameter("header"), ArrayList.class);
			ArrayList dataList = gson.fromJson(request.getParameter("datas"), ArrayList.class);
			//System.out.println(dataList);
			String url = request.getParameter("url");
			String param = request.getParameter("param");
			if(url!=null && !"".equals(url)){
				StringTokenizer token = new StringTokenizer(url, "?");
				if(token.countTokens()>0){
					token.nextToken();
				}
				url = token.nextToken();
				
				String utfParam = URLEncoder.encode(param, "UTF-8");
				
				URL obj = new URL(url + "?" + utfParam + "&_excel_=1");
				HttpURLConnection con = (HttpURLConnection) obj.openConnection();
				con.setRequestMethod("POST");
				con.setDoOutput(true);
				con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
				int responseCode = con.getResponseCode();
				//System.out.println("Response Code : " + responseCode);
		 
				BufferedReader in = new BufferedReader(
				        new InputStreamReader(con.getInputStream(), "UTF-8"));
				String inputLine;
				StringBuffer buff = new StringBuffer();
		 
				while ((inputLine = in.readLine()) != null) {
					buff.append(inputLine);
				}
				in.close();
				dataList = gson.fromJson(buff.toString(), ArrayList.class);
			}
			
			HSSFWorkbook workbook = new HSSFWorkbook();
			HSSFSheet sheet = workbook.createSheet("검색결과");
			
			HSSFRow hRow = sheet.createRow(0);
			for(int i=0; i<headNameList.size(); i++){
				String headName = (String)headNameList.get(i);
				hRow.createCell(i).setCellValue(headName);
			}
			
			for(int i=0; i<dataList.size(); i++){
				LinkedTreeMap map = (LinkedTreeMap)dataList.get(i);
				HSSFRow row = sheet.createRow(i+1);
				for(int k=0; k<headList.size(); k++){
					String head = (String)headList.get(k);
					if(map.get(head)==null && !(map.get(head) instanceof java.lang.String)){
						row.createCell(k).setCellValue("");
					}else{
						row.createCell(k).setCellValue(map.get(head)+"");
					}
				}
			}
			
			String randomId =  UUID.randomUUID().toString() + ".xls";
			FileOutputStream outFile;
			outFile = new FileOutputStream("c:\\temp\\" + randomId);
			workbook.write(outFile);
			outFile.close();
			
			HashMap hashMap = new HashMap();
			hashMap.put("url", "http://" + request.getServerName()+ ":" + request.getServerPort() + request.getContextPath() + request.getServletPath() + "?fileName=" + randomId);
	 		out.println(gson.toJson(hashMap));
		}else{
			
			////
			File file = new File("c:\\temp\\" + fileName);
			FileInputStream fin = new FileInputStream(file);
			int ifilesize = (int)file.length();
			byte b[] = new byte[ifilesize];
			response.setContentLength(ifilesize);
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition","attachment; filename="+fileName+";");
			ServletOutputStream oout = response.getOutputStream();
			fin.read(b);
			oout.write(b,0,ifilesize);
			oout.flush();
			oout.close();
			fin.close();
			fin = null;
			oout = null;
			Runtime.getRuntime().gc();		
		}
	}catch(Exception e){
		e.printStackTrace();
	}
%>
<%!
	public void fileCopy(String inFileName, String outFileName) {
		try {
			FileInputStream fis = new FileInputStream(inFileName);
			FileOutputStream fos = new FileOutputStream(outFileName);
		   
			int data = 0;
			while((data=fis.read())!=-1) {
				fos.write(data);
			}
			fis.close();
			fos.close();
		   
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
%>
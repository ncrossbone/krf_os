<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	�߿�!!!
	Json ���·� ����ϴ� jsp�������� ��� html ��ҵ� ������� �ʾƾ� �Ѵ�.
	<!DOCTYPE, <html ���
*/
try{
	//String siteCodes = request.getParameter("siteCodes");
	//String measureDate = request.getParameter("measureDate");
	//String layerDate = request.getParameter("layerDate");   recordId
	//recordYear
	
	String recordId = request.getParameter("recordId");
	
	String a = request.getParameter("recordYear");
	String b = request.getParameter("recordYear2"); //defaultCheck
	
	String c = request.getParameter("recordMonth");
	String d = request.getParameter("recordMonth2");
	
	String startDate = a+c;
	String endDate = b+d;
		
	String defaultChart = request.getParameter("defaultChart");
	
	String selectItem = request.getParameter("selectItem");
	
		//����������
	
	sql = "  WITH TMP_TBL AS (																														";
	sql += "     SELECT *                                                                 ";
	sql += "     FROM (                                                                   ";
	sql += "         SELECT RANK() OVER(PARTITION BY WLOBSCD                              ";
	sql += "             ORDER BY WLOBSCD, WMCYMD DESC) AS RN ,/* ���� */                 ";
	sql += "             WLOBSCD AS PT_NO,/* �������ڵ� */                                ";
	sql += "             OBSNM AS PT_NM,/* �����Ҹ� */                                    ";
	sql += "             WMCYMD,/* �������� */                                            ";
	sql += "             'FW' AS ITEM_NAME,                                               ";
	sql += "             FW AS ITEM_VALUE /* ����(CMS) */                                 ";
	sql += "         FROM (                                                               ";
	sql += "             SELECT TO_CHAR(YMDH, 'YYYY.MM.DD') WMCYMD,                       ";
	sql += "               A.WLOBSCD,                                                     ";
	sql += "               OBSNM,                                                         ";
	sql += "               MAX(ADM_CD) ADM_CD,                                            ";
	sql += "               ROUND(AVG(FW)/1, 4) FW                                         ";
	sql += "             FROM FWDY A,                                                     ";
	sql += "               FWOBSIF D                                                      ";
	sql += "             WHERE A.WLOBSCD = D.FWOBSCD                                      ";
	if(defaultChart.equals("0")){
	/* if(defaultChart.equals("1")){
		sql += "               AND SUBSTR(TO_CHAR( A.YMDH , 'YYYYMMDD'), 1, 6) >='201410'     ";
		sql += "               AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'), 1, 6) <='201510'      ";
	}else{
	 */	sql += "               AND SUBSTR(TO_CHAR( A.YMDH , 'YYYYMMDD'), 1, 6) >='"+startDate+"'     ";
		sql += "               AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'), 1, 6) <='"+endDate+"'      ";
	}
	sql += "               AND A.WLOBSCD = '"+recordId+"'                                      ";
	sql += "               AND FW IS NOT NULL       ";       
	sql += "             GROUP BY TO_CHAR(YMDH,                                           ";
	sql += "                   'YYYY.MM.DD'), A.WLOBSCD , OBSNM ) A,                      ";
	sql += "           KESTI_WATER_ALL_MAP B,                                             ";
	sql += "           COM_DISTRICT_RAW C                                                 ";
	sql += "         WHERE A.ADM_CD = B.ADM_CD                                            ";
	sql += "           AND A.ADM_CD = C.ADM_CD )                                          ";
	if(defaultChart.equals("1")){
		sql += "     WHERE RN <= 10                                                           ";
	}
	sql += "     ORDER BY PT_NO, WMCYMD ASC )                                             ";
	sql += " SELECT *                                                                     ";
	sql += " FROM (                                                                       ";
	sql += "     SELECT *                                                                 ";
	sql += "     FROM TMP_TBL                                                             ";
	sql += "     ORDER BY WMCYMD )                                                        ";
	sql += " UNION ALL                                                                    ";
	sql += " SELECT 99999 AS RN,                                                            ";
	sql += "   '',                                                                        ";
	sql += "   '',                                                                        ";
	sql += "   '',                                                                        ";
	sql += "   '',                                                                        ";
	sql += "   MAX(ITEM_VALUE) + MAX(ITEM_VALUE) / 10                                     ";
	sql += " FROM TMP_TBL                                                                 ";                                                                                                                                                 
                             


		
   //out.print(sql);
   //System.out.println(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONArray jsonArrMax = new JSONArray();
	JSONObject jsonRecord = null;
	
	//int cnt = 0;
	while(rs.next()) {
		//cnt++;
		//out.print(cnt);
		jsonRecord = new JSONObject();

  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("ITEM_NAME" 	, rs.getString("ITEM_NAME"));
  		jsonRecord.put("ITEM_VALUE" 	, rs.getString("ITEM_VALUE"));
  		
  		if(rs.getString("RN").equals("99999"))
  			jsonArrMax.add(jsonRecord);
  		else
  			jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("maxdata", jsonArrMax);
	jsonObj.put("data", jsonArr);
   //console.info(jsonObj);
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>
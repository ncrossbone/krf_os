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
	sql="SELECT WMCYM || ' ' || WEEK || '����' AS WMCYMW " +
		  "FROM ( " +
				  "SELECT DISTINCT TO_CHAR(TO_DATE(replace(B.WMCYMD, '.', '')), 'YYYY-MM') AS WMCYM " + 
				       ", CEIL((TO_CHAR(TO_DATE(REPLACE(B.WMCYMD, '.', ''), 'YYYYMMDD'), 'DD') + 7 - TO_CHAR(TO_DATE(REPLACE(B.WMCYMD, '.', ''), 'YYYYMMDD') - 1, 'D')) / 7) AS WEEK " +
				    "from AG_RWMDTI_NEW_DRONE A " +
				       ", AG_RWMDTD_DRONE B " +
				   "where A.PT_NO = B.PT_NO " +
				     "AND A.WMYR  = B.WMYR " +
				     "AND A.WMOD  = B.WMOD " +
				     "AND A.WMWK  = B.WMWK " +
			  ") " +
		"ORDER BY WMCYM || ' ' || WEEK || '����'";
	//out.print(sql);
	stmt = con.createStatement();   
	rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();	 
		
		jsonRecord.put("WMCYMW" 				, rs.getString("WMCYMW")); 
  		
  		jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("data", jsonArr);
   
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
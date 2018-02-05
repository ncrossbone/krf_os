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
	
	Object[] catDid = request.getParameterValues("catDid");
	//out.print(adm3);
	
	
sql = " WITH POLLULANT_LOAD_FOR_CAT_TBL																																																																													";
sql += "   AS (                                                                                                                                                                                   ";
sql += "     SELECT WS_CD, SW_CODE, ADM_CD, NO, WS_NM, AM_NM, SW_NAME, CAT_DID, DO_NM||' '||CTY_NM||' '||DONG_NM||' '||RI_NM AS ADDR, PERCENTAGE, GUBUN                                           ";
sql += "          , GNR_BOD_SUM,GNR_TN_SUM,GNR_TP_SUM,OUT_BOD_SUM,OUT_TN_SUM,OUT_TP_SUM                                                                                                           ";
sql += "       FROM (                                                                                                                                                                             ";
sql += "             SELECT '1' AS NO, '�Ұ�' AS GUBUN, WS_NM, WS_CD, AM_NM, AM_CD, SW_NAME, SW_CODE, DO_NM, CTY_NM, DONG_NM, RI_NM, ADM_CD, CAT_DID, PERCENTAGE                                  ";
sql += "                  , GNR_BOD_SUM, GNR_TN_SUM, GNR_TP_SUM, OUT_BOD_SUM, OUT_TN_SUM, OUT_TP_SUM                                                                                              ";
sql += "               FROM POLLULANT_LOAD_FOR_CAT                                                                                                                                                ";
sql += "             UNION                                                                                                                                                                        ";
sql += "             SELECT '2' AS NO, '��Ȱ��' AS GUBUN, WS_NM, WS_CD, AM_NM, AM_CD, SW_NAME, SW_CODE, DO_NM, CTY_NM, DONG_NM, RI_NM, ADM_CD, CAT_DID, PERCENTAGE                                ";
sql += "                  , GNR_BOD_POP, GNR_TN_POP, GNR_TP_POP, OUT_BOD_POP, OUT_TN_POP, OUT_TP_POP                                                                                              ";
sql += "               FROM POLLULANT_LOAD_FOR_CAT                                                                                                                                                ";
sql += "             UNION                                                                                                                                                                        ";
sql += "             SELECT '3' AS NO, '����' AS GUBUN, WS_NM, WS_CD, AM_NM, AM_CD, SW_NAME, SW_CODE, DO_NM, CTY_NM, DONG_NM, RI_NM, ADM_CD, CAT_DID, PERCENTAGE                                ";
sql += "                  , GNR_BOD_ANI, GNR_TN_ANI, GNR_TP_ANI, OUT_BOD_ANI, OUT_TN_ANI, OUT_TP_ANI                                                                                              ";
sql += "               FROM POLLULANT_LOAD_FOR_CAT                                                                                                                                                ";
sql += "             UNION                                                                                                                                                                        ";
sql += "             SELECT '4' AS NO, '�����' AS GUBUN, WS_NM, WS_CD, AM_NM, AM_CD, SW_NAME, SW_CODE, DO_NM, CTY_NM, DONG_NM, RI_NM, ADM_CD, CAT_DID, PERCENTAGE                                ";
sql += "                  , GNR_BOD_IND, GNR_TN_IND, GNR_TP_IND, OUT_BOD_IND, OUT_TN_IND, OUT_TP_IND                                                                                              ";
sql += "               FROM POLLULANT_LOAD_FOR_CAT                                                                                                                                                ";
sql += "             UNION                                                                                                                                                                        ";
sql += "             SELECT '5' AS NO, '������' AS GUBUN, WS_NM, WS_CD, AM_NM, AM_CD, SW_NAME, SW_CODE, DO_NM, CTY_NM, DONG_NM, RI_NM, ADM_CD, CAT_DID, PERCENTAGE                                ";
sql += "                  , GNR_BOD_LAND, GNR_TN_LAND, GNR_TP_LAND, OUT_BOD_LAND, OUT_TN_LAND, OUT_TP_LAND                                                                                        ";
sql += "               FROM POLLULANT_LOAD_FOR_CAT                                                                                                                                                ";
sql += "             UNION                                                                                                                                                                        ";
sql += "             SELECT '6' AS NO, '��İ�' AS GUBUN, WS_NM, WS_CD, AM_NM, AM_CD, SW_NAME, SW_CODE, DO_NM, CTY_NM, DONG_NM, RI_NM, ADM_CD, CAT_DID, PERCENTAGE                                ";
sql += "                  , GNR_BOD_FISH, GNR_TN_FISH, GNR_TP_FISH, OUT_BOD_FISH, OUT_TN_FISH, OUT_TP_FISH                                                                                        ";
sql += "               FROM POLLULANT_LOAD_FOR_CAT                                                                                                                                                ";
sql += "             UNION                                                                                                                                                                        ";
sql += "             SELECT '7' AS NO, '�Ÿ���' AS GUBUN, WS_NM, WS_CD, AM_NM, AM_CD, SW_NAME, SW_CODE, DO_NM, CTY_NM, DONG_NM, RI_NM, ADM_CD, CAT_DID, PERCENTAGE                                ";
sql += "                  , GNR_BOD_LANDFILL, GNR_TN_LANDFILL, GNR_TP_LANDFILL, OUT_BOD_LANDFILL, OUT_TN_LANDFILL, OUT_TP_LANDFILL                                                                ";
sql += "               FROM POLLULANT_LOAD_FOR_CAT                                                                                                                                                ";
sql += "            )                                                                                                                                                                             ";
if(catDid.length != 0){
	sql += "	  WHERE  CAT_DID IN    (  	";
	for(int i=0;i<catDid.length;i++){
		if(i == catDid.length-1){
			sql += "	'"+catDid[i]+"' )			";
		}else{
			sql += "	'"+catDid[i]+"',			";
		}
		
	}
}
sql += "      ORDER BY WS_CD, SW_CODE, CAT_DID, ADM_CD, NO                                                                                                                                        ";
sql += "     )                                                                                                                                                                                    ";
sql += " SELECT WS_NM, AM_NM, SW_NAME, CAT_DID, ADDR, PERCENTAGE, GUBUN, GNR_BOD_SUM, GNR_TN_SUM, GNR_TP_SUM, OUT_BOD_SUM, OUT_TN_SUM, OUT_TP_SUM                                                 ";
sql += "   FROM (                                                                                                                                                                                 ";
sql += "         SELECT '1' AS NO_1                                                                                                                                                               ";
sql += "              , NO AS NO_2                                                                                                                                                                ";
sql += "              , '' AS WS_CD                                                                                                                                                               ";
sql += "              , '' AS SW_CODE                                                                                                                                                             ";
sql += "              , '' AS ADM_CD                                                                                                                                                              ";
sql += "              , '' AS WS_NM, '' AS AM_NM, '' AS SW_NAME, '' AS CAT_DID, '�Ѱ�' AS ADDR                                                                                                    ";
sql += "              , TO_NUMBER('') AS PERCENTAGE, GUBUN                                                                                                                                        ";
sql += "              , SUM(GNR_BOD_SUM) AS GNR_BOD_SUM                                                                                                                                           ";
sql += "              , SUM(GNR_TN_SUM) AS GNR_TN_SUM                                                                                                                                             ";
sql += "              , SUM(GNR_TP_SUM) AS GNR_TP_SUM                                                                                                                                             ";
sql += "              , SUM(OUT_BOD_SUM) AS OUT_BOD_SUM                                                                                                                                           ";
sql += "              , SUM(OUT_TN_SUM) AS OUT_TN_SUM                                                                                                                                             ";
sql += "              , SUM(OUT_TP_SUM) AS OUT_TP_SUM                                                                                                                                             ";
sql += "           FROM POLLULANT_LOAD_FOR_CAT_TBL                                                                                                                                                ";
sql += "          WHERE 1=1                                                                                                                                                                       ";
sql += "          GROUP BY GUBUN, NO                                                                                                                                                              ";
sql += "         UNION                                                                                                                                                                            ";
sql += "         SELECT '2', A.NO, WS_CD, SW_CODE, ADM_CD, WS_NM, AM_NM, SW_NAME, CAT_DID, ADDR, PERCENTAGE, GUBUN, GNR_BOD_SUM, GNR_TN_SUM, GNR_TP_SUM, OUT_BOD_SUM, OUT_TN_SUM, OUT_TP_SUM      ";
sql += "           FROM POLLULANT_LOAD_FOR_CAT_TBL A                                                                                                                                              ";
sql += "        )                                                                                                                                                                                 ";
sql += "  ORDER BY NO_1, WS_CD, SW_CODE, CAT_DID, ADM_CD, NO_2                                                                                                                                    ";




	
		
   //out.print(sql);
   //System.out.println(sql);
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("WS_NM"	, rs.getString("WS_NM"));
  		jsonRecord.put("AM_NM"	, rs.getString("AM_NM"));
  		jsonRecord.put("SW_NAME"	, rs.getString("SW_NAME"));
  		jsonRecord.put("CAT_DID"	, rs.getString("CAT_DID"));
  		jsonRecord.put("ADDR"	, rs.getString("ADDR"));
  		jsonRecord.put("PERCENTAGE" 	, rs.getString("PERCENTAGE"));
  		jsonRecord.put("GUBUN" 	, rs.getString("GUBUN"));
  		jsonRecord.put("GNR_BOD_SUM" 	, rs.getString("GNR_BOD_SUM"));
  		jsonRecord.put("GNR_TN_SUM" 	, rs.getString("GNR_TN_SUM"));
  		jsonRecord.put("GNR_TP_SUM" 	, rs.getString("GNR_TP_SUM"));
  		jsonRecord.put("OUT_BOD_SUM" 	, rs.getString("OUT_BOD_SUM"));
  		jsonRecord.put("OUT_TN_SUM" 	, rs.getString("OUT_TN_SUM"));
  		jsonRecord.put("OUT_TP_SUM" 	, rs.getString("OUT_TP_SUM"));
  		
  		
  		jsonArr.add(jsonRecord);
  		
	}
	
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
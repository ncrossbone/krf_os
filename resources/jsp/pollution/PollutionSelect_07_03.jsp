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
	String year = request.getParameter("year");
	
	sql = " WITH TBL_PLA_LANDUSE AS (                           " ;
	sql += "    SELECT YYYY /* ����⵵ */                      ";
	sql += "         , WS_NM                                    ";
	sql += "         , MB_NM                                    ";
	sql += "         , SB_NM                                    ";
	sql += "         , CAT_DID                                  ";
	sql += "         , DO_NM||CTY_NM||DONG_NM||RI_NM as addr    ";
	sql += "         , FINAL_PERCENTAGE /* ������ */            ";
	sql += "         , INST_NM /* ���ұ���� */                 ";
	sql += "         , IND_NM /* ���Ҹ� */                      ";
	sql += "         , IND_OWNER /* ��ǥ�� */                   ";
	sql += "         , IND_ID /* ����ڵ�Ϲ�ȣ */              ";
	sql += "         , OT_NM /* ��Ÿ�����������з� */           ";
	sql += "         , EH_NM /* ó����� */                     ";
	sql += "         , WW_AMT /* ��������(��/��) */           ";
	sql += "         , ADM_CD                                   ";
	sql += "         , SB_ID                                    ";
	sql += "      FROM PLA_OPS_TOTAL_FOR_CAT                    ";
	if(catDid.length != 0){
		sql += "        where CAT_DID IN (                                ";
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "    )                                               ";
	sql += "select YYYY /* ����⵵ */                          ";
	sql += "     , WS_NM                                        ";
	sql += "     , MB_NM                                        ";
	sql += "     , SB_NM                                        ";
	sql += "     , CAT_DID                                      ";
	sql += "     , INST_NM /* ���ұ���� */                     ";
	sql += "     , IND_NM /* ���Ҹ� */                          ";
	sql += "     , IND_OWNER /* ��ǥ�� */                       ";
	sql += "     , IND_ID /* ����ڵ�Ϲ�ȣ */                  ";
	sql += "     , OT_NM /* ��Ÿ�����������з� */               ";
	sql += "     , EH_NM /* ó����� */                         ";
	sql += "     , WW_AMT /* ��������(��/��) */               ";
	sql += "  from (                                            ";
	sql += "        SELECT YYYY /* ����⵵ */                  ";
	sql += "             , WS_NM                                ";
	sql += "             , MB_NM                                ";
	sql += "             , SB_NM                                ";
	sql += "             , CAT_DID                              ";
	sql += "             , INST_NM /* ���ұ���� */             ";
	sql += "             , IND_NM /* ���Ҹ� */                  ";
	sql += "             , IND_OWNER /* ��ǥ�� */               ";
	sql += "             , IND_ID /* ����ڵ�Ϲ�ȣ */          ";
	sql += "             , OT_NM /* ��Ÿ�����������з� */       ";
	sql += "             , EH_NM /* ó����� */                 ";
	sql += "             , WW_AMT /* ��������(��/��) */       ";
	sql += "             , ADM_CD                               ";
	sql += "             , SB_ID                                ";
	sql += "          FROM TBL_PLA_LANDUSE                      ";
	sql += "        union                                       ";
	sql += "        SELECT YYYY /* ����⵵ */                  ";
	sql += "             , WS_NM                                ";
	sql += "             , MB_NM                                       						";
	sql += "             , SB_NM                                                   ";
	sql += "             , '�Ұ�' as CAT_DID                                       ";
	sql += "             , '' as INST_NM /* ���ұ���� */                          ";
	sql += "             , '' as IND_NM /* ���Ҹ� */                               ";
	sql += "             , '' as IND_OWNER /* ��ǥ�� */                            ";
	sql += "             , '' as IND_ID /* ����ڵ�Ϲ�ȣ */    ";
	sql += "             , '' as OT_NM /* ��Ÿ�����������з� */ ";
	sql += "             , '' as EH_NM /* ó����� */           ";
	sql += "             , sum(WW_AMT) /* ��������(��/��) */  ";
	sql += "             , '' as ADM_CD                         ";
	sql += "             , SB_ID                                ";
	sql += "          FROM TBL_PLA_LANDUSE	";                      
	sql += "         GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID  					";
	sql += "        union                                                   ";
	sql += "        SELECT '' as YYYY /* ����⵵ */                        ";
	sql += "             , '' as WS_NM                                      ";
	sql += "             , '' as MB_NM                                      ";
	sql += "             , '�Ѱ�' as SB_NM                                  ";
	sql += "             , '' as CAT_DID                                    ";
	sql += "             , '' as INST_NM /* ���ұ���� */                   ";
	sql += "             , '' as IND_NM /* ���Ҹ� */                        ";
	sql += "             , '' as IND_OWNER /* ��ǥ�� */                     ";
	sql += "             , '' as IND_ID /* ����ڵ�Ϲ�ȣ */                ";
	sql += "             , '' as OT_NM /* ��sŸ�����������з� */            ";
	sql += "             , '' as EH_NM /* ó����� */                       ";
	sql += "             , sum(WW_AMT) /* ��������(��/��) */              ";
	sql += "             , '' as ADM_CD                                  ";
	sql += "                     , '' as SB_ID                          								";
	sql += "                  FROM TBL_PLA_LANDUSE                                                    ";
	sql += "               )                                                                          ";
	sql += "         ORDER BY DECODE(SB_NM,'�Ѱ�',1,2), SB_ID, DECODE(CAT_DID,'�Ұ�',1,2), CAT_DID    ";
	
	
	
	
	
    
//System.out.println(sql);
stmt = con.createStatement();
rs = stmt.executeQuery(sql);

	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("YYYY",rs.getString("YYYY"));
		jsonRecord.put("WS_NM",rs.getString("WS_NM"));
		jsonRecord.put("MB_NM",rs.getString("MB_NM"));
		jsonRecord.put("SB_NM",rs.getString("SB_NM"));
		jsonRecord.put("CAT_DID",rs.getString("CAT_DID"));
		jsonRecord.put("INST_NM",rs.getString("INST_NM"));
		jsonRecord.put("IND_NM",rs.getString("IND_NM"));
		jsonRecord.put("IND_OWNER",rs.getString("IND_OWNER"));
		jsonRecord.put("IND_ID",rs.getString("IND_ID"));
		jsonRecord.put("OT_NM",rs.getString("OT_NM"));
		jsonRecord.put("EH_NM",rs.getString("EH_NM"));
		jsonRecord.put("WW_AMT",rs.getString("WW_AMT"));
		
		
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
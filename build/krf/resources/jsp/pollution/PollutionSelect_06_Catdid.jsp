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
	
	sql = "  with tbl_PLA_LANDUSE as (																																				";
	sql += "      select YYYY        /* ����⵵ */                                                           ";
	sql += "           , WS_NM       /* ��ǿ� */                                                             ";
	sql += "           , MB_NM       /* �߱ǿ� */                                                             ";
	sql += "           , SB_NM       /* �ұǿ� */                                                             ";
	sql += "           , CAT_DID     /* �������� */                                                           ";
	sql += "           , DO_NM||CTY_NM||DONG_NM||RI_NM as addr /* �������� */                                 ";
	sql += "           , FACI_NM       /* �Ÿ���� */                                                         ";
	sql += "           , WORK_DT       /* ����� */                                                         ";
	sql += "           , PRODUCT_AMT   /* �߻�����(��/��) */                                                  ";
	sql += "           , DISCHARGE_AMT /* �������(��/��) */                                                  ";
	sql += "           , PRODUCT_BOD   /* �߻��� BOD(��/��) */                                              ";
	sql += "           , PRODUCT_COD   /* �߻��� COD(��/��) */                                              ";
	sql += "           , PRODUCT_TN    /* �߻��� TN(��/��) */                                               ";
	sql += "           , PRODUCT_TP    /* �߻��� TP(��/��) */                                               ";
	sql += "           , DISCHARGE_BOD /* ����� BOD(��/��) */                                              ";
	sql += "           , DISCHARGE_COD /* ����� COD(��/��) */                                              ";
	sql += "           , DISCHARGE_TN  /* ����� TN(��/��) */                                               ";
	sql += "           , DISCHARGE_TP  /* ����� TP(��/��) */                                               ";
	sql += "           , ADM_CD                                                                               ";
	sql += "           , SB_ID                                                                                ";
	sql += "           , FINAL_PERCENTAGE                                                                     ";
	sql += "        from PLA_LANDFILL_LEACH_FOR_CAT                                                           ";
	if(catDid.length != 0){
		sql += "        WHERE CAT_DID IN (                                                           ";
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "      )                                                                                           ";
	sql += "  select YYYY             /* ����⵵ */                                                          ";
	sql += "       , WS_NM            /* ��ǿ� */                                                            ";
	sql += "       , MB_NM            /* �߱ǿ� */                                                            ";
	sql += "       , SB_NM            /* �ұǿ� */                                                            ";
	sql += "       , CAT_DID          /* �������� */                                                          ";
	sql += "       , FACI_NM          /* �Ÿ���� */                                                          ";
	sql += "       , WORK_DT          /* ����� */                                                          ";
	sql += "       , PRODUCT_AMT      /* �߻�����(��/��) */                                                   ";
	sql += "       , DISCHARGE_AMT    /* �������(��/��) */                                                   ";
	sql += "       , PRODUCT_BOD      /* �߻��� BOD(��/��) */                                               ";
	sql += "       , PRODUCT_COD      /* �߻��� COD(��/��) */                                               ";
	sql += "       , PRODUCT_TN       /* �߻��� TN(��/��) */                                                ";
	sql += "       , PRODUCT_TP       /* �߻��� TP(��/��) */                                                ";
	sql += "       , DISCHARGE_BOD    /* ����� BOD(��/��) */                                               ";
	sql += "       , DISCHARGE_COD    /* ����� COD(��/��) */                                               ";
	sql += "       , DISCHARGE_TN     /* ����� TN(��/��) */                                                ";
	sql += "       , DISCHARGE_TP     /* ����� TP(��/��) */                                                ";
	sql += "    from (                                                                                        ";
	sql += "          select YYYY        /* ����⵵ */                                                       ";
	sql += "               , WS_NM       /* ��ǿ� */                                                         ";
	sql += "               , MB_NM       /* �߱ǿ� */                                                         ";
	sql += "               , SB_NM       /* �ұǿ� */                                                         ";
	sql += "               , CAT_DID     /* �������� */                                                       ";
	sql += "               , '' as FACI_NM       /* �Ÿ���� */                                               ";
	sql += "               , '' as WORK_DT       /* ����� */                                               ";
	sql += "               , sum(PRODUCT_AMT) as PRODUCT_AMT  /* �߻�����(��/��) */                           ";
	sql += "               , sum(DISCHARGE_AMT) as DISCHARGE_AMT /* �������(��/��) */                        ";
	sql += "               , sum(PRODUCT_BOD) as PRODUCT_BOD   /* �߻��� BOD(��/��) */                      ";
	sql += "               , sum(PRODUCT_COD) as PRODUCT_COD   /* �߻��� COD(��/��) */                      ";
	sql += "               , sum(PRODUCT_TN)  as PRODUCT_TN   /* �߻��� TN(��/��) */                        ";
	sql += "               , sum(PRODUCT_TP)  as PRODUCT_TP  /* �߻��� TP(��/��) */                         ";
	sql += "               , sum(DISCHARGE_BOD)  as DISCHARGE_BOD/* ����� BOD(��/��) */                    ";
	sql += "               , sum(DISCHARGE_COD)  as DISCHARGE_COD/* ����� COD(��/��) */                    ";
	sql += "               , sum(DISCHARGE_TN)   as DISCHARGE_TN /* ����� TN(��/��) */                     ";
	sql += "               , sum(DISCHARGE_TP)  as DISCHARGE_TP /* ����� TP(��/��) */                      ";
	sql += "               , SB_ID                                                                            ";
	sql += "           from tbl_PLA_LANDUSE                                                                   ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID                                      ";
	sql += "         )                                                                                        ";
	sql += "   ORDER BY DECODE(SB_NM,'�Ѱ�',1,2), SB_ID, DECODE(CAT_DID,'�Ұ�',1,2), CAT_DID                  ";
	
	
	
	

    
//System.out.println(sql);
stmt = con.createStatement();
rs = stmt.executeQuery(sql);

	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("YYYY",rs.getString("YYYY"));
		jsonRecord.put("CAT_DID",rs.getString("CAT_DID"));
		jsonRecord.put("PRODUCT_AMT",rs.getString("PRODUCT_AMT"));
		jsonRecord.put("DISCHARGE_AMT",rs.getString("DISCHARGE_AMT"));
		
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
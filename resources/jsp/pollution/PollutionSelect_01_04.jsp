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
	
	sql = " WITH TBL_PLA_POP_TOTAL AS (																																						";
	sql += "     SELECT YYYY    /*����⵵*/                                                                        ";
	sql += "          , WS_NM   /*��ǿ�*/                                                                          ";
	sql += "          , MB_NM   /*�߱ǿ�*/                                                                          ";
	sql += "          , SB_ID   /*ǥ�������ڵ�*/                                                                    ";
	sql += "          , SB_NM   /*ǥ������*/                                                                        ";
	sql += "          , CAT_DID /*��������*/                                                                        ";
	sql += "          , ADM_CD  /*�������ڵ�*/                                                                      ";
	sql += "          , DO_NM||' '||CTY_NM||' '||DONG_NM||' '||RI_NM AS ADDR /*��������*/                           ";
	sql += "          , FINAL_PERCENTAGE         /*������*/                                                         ";
	sql += "          , AREA_A1                  /*����_�ϼ�ó������*/                                              ";
	sql += "          , AREA_A2                  /*����_�ϼ���ó������*/                                            ";
	sql += "          , AREA_SUM                 /*����_��*/                                                        ";
	sql += "          , REGION                   /*��������_����*/                                                  ";
	sql += "          , REGION_DATE              /*��������_��������*/                                              ";
	sql += "          , U_A1_TP_CODE             /*�ϼ�ó���ü�_�ڵ�*/                                              ";
	sql += "          , U_A1_TP_DATE             /*�ϼ�ó���ü�_��������*/                                          ";
	sql += "          , U_A1_TP_NAME             /*�ϼ�ó���ü�_�ü���*/                                            ";
	sql += "          , U_A3_TP_CODE             /*�д�ó���ü�_�ڵ�*/                                              ";
	sql += "          , U_A3_TP_DATE             /*�д�ó���ü�_��������*/                                          ";
	sql += "          , U_A3_TP_NAME             /*�д�ó���ü�_�ü���*/                                            ";
	sql += "          , POP_SUM                  /*�α� �Ѱ�*/                                                      ";
	sql += "          , UPOP_SUM                 /*�ð�����_�հ�*/                                                  ";
	sql += "          , UPOP_A1_SUM              /*�ð�����_�ϼ�ó������_�Ұ�*/                                     ";
	sql += "          , UPOP_A1_SEPARATE_WT_SUM  /*�ð�����_�ϼ�ó������_�з���_�����ϼ�ó��*/                      ";
	sql += "          , UPOP_A1_SEPARATE_IT_SUM  /*�ð�����_�ϼ�ó������_�з���_�������*/                          ";
	sql += "          , UPOP_A1_COMBINED_WT_SUM  /*�ð�����_�ϼ�ó������_�շ���_�����ϼ�ó��*/                      ";
	sql += "          , UPOP_A1_COMBINED_IT_SUM  /*�ð�����_�ϼ�ó������_�շ���_�������*/                          ";
	sql += "          , UPOP_A2_SUM              /*�ð�����_�ϼ���ó������_�Ұ�*/                                   ";
	sql += "          , UPOP_A2_SANITARY         /*�ð�����_�ϼ���ó������_����*/                                   ";
	sql += "          , UPOP_A2_SEPTIC           /*�ð�����_�ϼ���ó������_��ȭ��*/                                 ";
	sql += "          , UPOP_A2_REMOVAL          /*�ð�����_�ϼ���ó������_���Ž�*/                                 ";
	sql += "          , SPOP_SUM                 /*��ð�����_�հ�*/                                                ";
	sql += "          , SPOP_A1_SUM              /*��ð�����_�ϼ�ó������_�Ұ�*/                                   ";
	sql += "          , SPOP_A1_SEPARATE_WT_SUM  /*��ð�����_�ϼ�ó������_�з���_�����ϼ�ó��*/                    ";
	sql += "          , SPOP_A1_SEPARATE_IT_SUM  /*��ð�����_�ϼ�ó������_�з���_�������*/                        ";
	sql += "          , SPOP_A1_COMBINED_WT_SUM  /*��ð�����_�ϼ�ó������_�շ���_�����ϼ�ó��*/                    ";
	sql += "          , SPOP_A1_COMBINED_IT_SUM  /*��ð�����_�ϼ�ó������_�շ���_�������*/                        ";
	sql += "          , SPOP_A2_SUM              /*��ð�����_�ϼ���ó������_�Ұ�*/                                 ";
	sql += "          , SPOP_A2_SANITARY         /*��ð�����_�ϼ���ó������_����*/                                 ";
	sql += "          , SPOP_A2_SEPTIC           /*��ð�����_�ϼ���ó������_��ȭ��*/                               ";
	sql += "          , SPOP_A2_REMOVAL          /*��ð�����_�ϼ���ó������_��ȭ��*/                               ";
	sql += "       FROM PLA_POP_TOTAL_FOR_CAT                                                                       ";
	if(catDid.length != 0){
		sql += "       WHERE CAT_DID IN (							                       ";
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "     )                                                                                                  ";
	sql += " SELECT YYYY    /*����⵵*/                                                                            ";
	sql += "      , WS_NM   /*��ǿ�*/                                                                              ";
	sql += "      , MB_NM   /*�߱ǿ�*/                                                                              ";
	sql += "      , SB_NM   /*ǥ������*/                                                                            ";
	sql += "      , CAT_DID /*��������*/                                                                            ";
	sql += "      , ADDR    /*��������*/                                                                            ";
	sql += "      , FINAL_PERCENTAGE         /*������*/                                                             ";
	sql += "      , AREA_A1                  /*����_�ϼ�ó������*/                                                  ";
	sql += "      , AREA_A2                  /*����_�ϼ���ó������*/                                                ";
	sql += "      , AREA_SUM                 /*����_��*/                                                            ";
	sql += "      , REGION                   /*��������_����*/                                                      ";
	sql += "      , REGION_DATE              /*��������_��������*/                                                  ";
	sql += "      , U_A1_TP_CODE             /*�ϼ�ó���ü�_�ڵ�*/                                                  ";
	sql += "      , U_A1_TP_DATE             /*�ϼ�ó���ü�_��������*/                                              ";
	sql += "      , U_A1_TP_NAME             /*�ϼ�ó���ü�_�ü���*/                                                ";
	sql += "      , U_A3_TP_CODE             /*�д�ó���ü�_�ڵ�*/                                                  ";
	sql += "      , U_A3_TP_DATE             /*�д�ó���ü�_��������*/                                              ";
	sql += "      , U_A3_TP_NAME             /*�д�ó���ü�_�ü���*/                                                ";
	sql += "      , POP_SUM                  /*�α� �Ѱ�*/                                                          ";
	sql += "      , UPOP_SUM                 /*�ð�����_�հ�*/                                                      ";
	sql += "      , UPOP_A1_SUM              /*�ð�����_�ϼ�ó������_�Ұ�*/                                         ";
	sql += "      , UPOP_A1_SEPARATE_WT_SUM  /*�ð�����_�ϼ�ó������_�з���_�����ϼ�ó��*/                          ";
	sql += "      , UPOP_A1_SEPARATE_IT_SUM  /*�ð�����_�ϼ�ó������_�з���_�������*/                              ";
	sql += "      , UPOP_A1_COMBINED_WT_SUM  /*�ð�����_�ϼ�ó������_�շ���_�����ϼ�ó��*/                          ";
	sql += "      , UPOP_A1_COMBINED_IT_SUM  /*�ð�����_�ϼ�ó������_�շ���_�������*/                              ";
	sql += "      , UPOP_A2_SUM              /*�ð�����_�ϼ���ó������_�Ұ�*/                                       ";
	sql += "      , UPOP_A2_SANITARY         /*�ð�����_�ϼ���ó������_����*/                                       ";
	sql += "      , UPOP_A2_SEPTIC           /*�ð�����_�ϼ���ó������_��ȭ��*/                                     ";
	sql += "      , UPOP_A2_REMOVAL          /*�ð�����_�ϼ���ó������_���Ž�*/                                     ";
	sql += "      , SPOP_SUM                 /*��ð�����_�հ�*/                                                    ";
	sql += "      , SPOP_A1_SUM              /*��ð�����_�ϼ�ó������_�Ұ�*/                                       ";
	sql += "      , SPOP_A1_SEPARATE_WT_SUM  /*��ð�����_�ϼ�ó������_�з���_�����ϼ�ó��*/                        ";
	sql += "      , SPOP_A1_SEPARATE_IT_SUM  /*��ð�����_�ϼ�ó������_�з���_�������*/                            ";
	sql += "      , SPOP_A1_COMBINED_WT_SUM  /*��ð�����_�ϼ�ó������_�շ���_�����ϼ�ó��*/                        ";
	sql += "      , SPOP_A1_COMBINED_IT_SUM  /*��ð�����_�ϼ�ó������_�շ���_�������*/                            ";
	sql += "      , SPOP_A2_SUM              /*��ð�����_�ϼ���ó������_�Ұ�*/                                     ";
	sql += "      , SPOP_A2_SANITARY         /*��ð�����_�ϼ���ó������_����*/                                     ";
	sql += "      , SPOP_A2_SEPTIC           /*��ð�����_�ϼ���ó������_��ȭ��*/                                   ";
	sql += "      , SPOP_A2_REMOVAL          /*��ð�����_�ϼ���ó������_��ȭ��*/                                   ";
	sql += "   FROM (                                                                                               ";
	sql += "         SELECT YYYY                                                                                    ";
	sql += "              , WS_NM                                                                                   ";
	sql += "              , MB_NM                                                                                   ";
	sql += "              , SB_NM                                                                                   ";
	sql += "              , CAT_DID                                                                                 ";
	sql += "              , '�Ұ�' AS ADDR                                                                          ";
	sql += "              , '' AS FINAL_PERCENTAGE                                                                  ";
	sql += "              , '' AS ADM_CD                                                                            ";
	sql += "              , SB_ID                                                                                   ";
	sql += "              , SUM(AREA_A1) AS AREA_A1                                                                 ";
	sql += "              , SUM(AREA_A2) AS AREA_A2                                                                 ";
	sql += "              , SUM(AREA_SUM) AS AREA_SUM                                                               ";
	sql += "              , '' AS REGION                                                                            ";
	sql += "              , '' AS REGION_DATE                                                                       ";
	sql += "              , '' AS U_A1_TP_CODE                                                                      ";
	sql += "              , '' AS U_A1_TP_DATE                                                                      ";
	sql += "              , '' AS U_A1_TP_NAME                                                                      ";
	sql += "              , '' AS U_A3_TP_CODE                                                                      ";
	sql += "              , '' AS U_A3_TP_DATE                                                                      ";
	sql += "              , '' AS U_A3_TP_NAME                                                                      ";
	sql += "              , SUM(POP_SUM) AS POP_SUM                                                                 ";
	sql += "              , SUM(UPOP_SUM) AS UPOP_SUM                                                               ";
	sql += "              , SUM(UPOP_A1_SUM) AS UPOP_A1_SUM                                                         ";
	sql += "              , SUM(UPOP_A1_SEPARATE_WT_SUM) AS UPOP_A1_SEPARATE_WT_SUM                                 ";
	sql += "              , SUM(UPOP_A1_SEPARATE_IT_SUM) AS UPOP_A1_SEPARATE_IT_SUM                                 ";
	sql += "              , SUM(UPOP_A1_COMBINED_WT_SUM) AS UPOP_A1_COMBINED_WT_SUM                                 ";
	sql += "              , SUM(UPOP_A1_COMBINED_IT_SUM) AS UPOP_A1_COMBINED_IT_SUM                                 ";
	sql += "              , SUM(UPOP_A2_SUM) AS UPOP_A2_SUM                                                         ";
	sql += "              , SUM(UPOP_A2_SANITARY) AS UPOP_A2_SANITARY                                               ";
	sql += "              , SUM(UPOP_A2_SEPTIC) AS UPOP_A2_SEPTIC                                                   ";
	sql += "              , SUM(UPOP_A2_REMOVAL) AS UPOP_A2_REMOVAL                                                 ";
	sql += "              , SUM(SPOP_SUM) AS SPOP_SUM                                                               ";
	sql += "              , SUM(SPOP_A1_SUM) AS SPOP_A1_SUM                                                         ";
	sql += "              , SUM(SPOP_A1_SEPARATE_WT_SUM) AS SPOP_A1_SEPARATE_WT_SUM                                 ";
	sql += "              , SUM(SPOP_A1_SEPARATE_IT_SUM) AS SPOP_A1_SEPARATE_IT_SUM                                 ";
	sql += "              , SUM(SPOP_A1_COMBINED_WT_SUM) AS SPOP_A1_COMBINED_WT_SUM                                 ";
	sql += "              , SUM(SPOP_A1_COMBINED_IT_SUM) AS SPOP_A1_COMBINED_IT_SUM                                 ";
	sql += "              , SUM(SPOP_A2_SUM) AS SPOP_A2_SUM                                                         ";
	sql += "              , SUM(SPOP_A2_SANITARY) AS SPOP_A2_SANITARY                                               ";
	sql += "              , SUM(SPOP_A2_SEPTIC) AS SPOP_A2_SEPTIC                                                   ";
	sql += "              , SUM(SPOP_A2_REMOVAL) AS SPOP_A2_REMOVAL                                                 ";
	sql += "           FROM TBL_PLA_POP_TOTAL                                                                       ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID                                            ";
	sql += "         UNION                                                                                          ";
	sql += "         SELECT YYYY    /*����⵵*/                                                                    ";
	sql += "              , WS_NM   /*��ǿ�*/                                                                      ";
	sql += "              , MB_NM   /*�߱ǿ�*/                                                                      ";
	sql += "              , SB_NM   /*ǥ������*/                                                                    ";
	sql += "              , CAT_DID /*��������*/                                                                    ";
	sql += "              , ADDR    /*��������*/                                                                    ";
	sql += "              , FINAL_PERCENTAGE         /*������*/                                                     ";
	sql += "              , ADM_CD                                                                                  ";
	sql += "              , SB_ID                                                                                   ";
	sql += "              , AREA_A1                  /*����_�ϼ�ó������*/                                          ";
	sql += "              , AREA_A2                  /*����_�ϼ���ó������*/                                        ";
	sql += "              , AREA_SUM                 /*����_��*/                                                    ";
	sql += "              , REGION                   /*��������_����*/                                              ";
	sql += "              , REGION_DATE              /*��������_��������*/                                          ";
	sql += "              , U_A1_TP_CODE             /*�ϼ�ó���ü�_�ڵ�*/                                          ";
	sql += "              , U_A1_TP_DATE             /*�ϼ�ó���ü�_��������*/                                      ";
	sql += "              , U_A1_TP_NAME             /*�ϼ�ó���ü�_�ü���*/                                        ";
	sql += "              , U_A3_TP_CODE             /*�д�ó���ü�_�ڵ�*/                                          ";
	sql += "              , U_A3_TP_DATE             /*�д�ó���ü�_��������*/                                      ";
	sql += "              , U_A3_TP_NAME             /*�д�ó���ü�_�ü���*/                                        ";
	sql += "              , POP_SUM                  /*�α� �Ѱ�*/                                                  ";
	sql += "              , UPOP_SUM                 /*�ð�����_�հ�*/                                              ";
	sql += "              , UPOP_A1_SUM              /*�ð�����_�ϼ�ó������_�Ұ�*/                                 ";
	sql += "              , UPOP_A1_SEPARATE_WT_SUM  /*�ð�����_�ϼ�ó������_�з���_�����ϼ�ó��*/                  ";
	sql += "              , UPOP_A1_SEPARATE_IT_SUM  /*�ð�����_�ϼ�ó������_�з���_�������*/                      ";
	sql += "              , UPOP_A1_COMBINED_WT_SUM  /*�ð�����_�ϼ�ó������_�շ���_�����ϼ�ó��*/                  ";
	sql += "              , UPOP_A1_COMBINED_IT_SUM  /*�ð�����_�ϼ�ó������_�շ���_�������*/                      ";
	sql += "              , UPOP_A2_SUM              /*�ð�����_�ϼ���ó������_�Ұ�*/                               ";
	sql += "              , UPOP_A2_SANITARY         /*�ð�����_�ϼ���ó������_����*/                               ";
	sql += "              , UPOP_A2_SEPTIC           /*�ð�����_�ϼ���ó������_��ȭ��*/                             ";
	sql += "              , UPOP_A2_REMOVAL          /*�ð�����_�ϼ���ó������_���Ž�*/                             ";
	sql += "              , SPOP_SUM                 /*��ð�����_�հ�*/                                            ";
	sql += "              , SPOP_A1_SUM              /*��ð�����_�ϼ�ó������_�Ұ�*/                               ";
	sql += "              , SPOP_A1_SEPARATE_WT_SUM  /*��ð�����_�ϼ�ó������_�з���_�����ϼ�ó��*/                ";
	sql += "              , SPOP_A1_SEPARATE_IT_SUM  /*��ð�����_�ϼ�ó������_�з���_�������*/                    ";
	sql += "              , SPOP_A1_COMBINED_WT_SUM  /*��ð�����_�ϼ�ó������_�շ���_�����ϼ�ó��*/                ";
	sql += "              , SPOP_A1_COMBINED_IT_SUM  /*��ð�����_�ϼ�ó������_�շ���_�������*/                    ";
	sql += "              , SPOP_A2_SUM              /*��ð�����_�ϼ���ó������_�Ұ�*/                             ";
	sql += "              , SPOP_A2_SANITARY         /*��ð�����_�ϼ���ó������_����*/                             ";
	sql += "              , SPOP_A2_SEPTIC           /*��ð�����_�ϼ���ó������_��ȭ��*/                           ";
	sql += "              , SPOP_A2_REMOVAL          /*��ð�����_�ϼ���ó������_��ȭ��*/                           ";
	sql += "           FROM TBL_PLA_POP_TOTAL                                                                       ";
	sql += "         UNION                                                                                          ";
	sql += "         SELECT '' AS YYYY                                                                              ";
	sql += "              , '' AS WS_NM                                                                             ";
	sql += "              , '' AS MB_NM                                                                             ";
	sql += "              , '' AS SB_NM                                                                             ";
	sql += "              , '' AS CAT_DID                                                                           ";
	sql += "              , '�Ѱ�' AS ADDR                                                                          ";
	sql += "              , '' AS FINAL_PERCENTAGE                                                                  ";
	sql += "              , '' AS ADM_CD                                                                            ";
	sql += "              , '' AS SB_ID                                                                             ";
	sql += "              , SUM(AREA_A1) AS AREA_A1                                                                 ";
	sql += "              , SUM(AREA_A2) AS AREA_A2                                                                 ";
	sql += "              , SUM(AREA_SUM) AS AREA_SUM                                                               ";
	sql += "              , '' AS REGION                                                                            ";
	sql += "              , '' AS REGION_DATE                                                                       ";
	sql += "              , '' AS U_A1_TP_CODE                                                                      ";
	sql += "              , '' AS U_A1_TP_DATE                                                                      ";
	sql += "              , '' AS U_A1_TP_NAME                                                                      ";
	sql += "              , '' AS U_A3_TP_CODE                                                                      ";
	sql += "              , '' AS U_A3_TP_DATE                                                                      ";
	sql += "              , '' AS U_A3_TP_NAME                                                                      ";
	sql += "              , SUM(POP_SUM) AS POP_SUM                                                                 ";
	sql += "              , SUM(UPOP_SUM) AS UPOP_SUM                                                               ";
	sql += "              , SUM(UPOP_A1_SUM) AS UPOP_A1_SUM                                                         ";
	sql += "              , SUM(UPOP_A1_SEPARATE_WT_SUM) AS UPOP_A1_SEPARATE_WT_SUM                                 ";
	sql += "              , SUM(UPOP_A1_SEPARATE_IT_SUM) AS UPOP_A1_SEPARATE_IT_SUM                                 ";
	sql += "              , SUM(UPOP_A1_COMBINED_WT_SUM) AS UPOP_A1_COMBINED_WT_SUM                                 ";
	sql += "              , SUM(UPOP_A1_COMBINED_IT_SUM) AS UPOP_A1_COMBINED_IT_SUM                                 ";
	sql += "              , SUM(UPOP_A2_SUM) AS UPOP_A2_SUM                                                         ";
	sql += "              , SUM(UPOP_A2_SANITARY) AS UPOP_A2_SANITARY                                               ";
	sql += "              , SUM(UPOP_A2_SEPTIC) AS UPOP_A2_SEPTIC                                                   ";
	sql += "              , SUM(UPOP_A2_REMOVAL) AS UPOP_A2_REMOVAL                                                 ";
	sql += "              , SUM(SPOP_SUM) AS SPOP_SUM                                                               ";
	sql += "              , SUM(SPOP_A1_SUM) AS SPOP_A1_SUM                                                         ";
	sql += "              , SUM(SPOP_A1_SEPARATE_WT_SUM) AS SPOP_A1_SEPARATE_WT_SUM                                 ";
	sql += "              , SUM(SPOP_A1_SEPARATE_IT_SUM) AS SPOP_A1_SEPARATE_IT_SUM                                 ";
	sql += "              , SUM(SPOP_A1_COMBINED_WT_SUM) AS SPOP_A1_COMBINED_WT_SUM                                 ";
	sql += "              , SUM(SPOP_A1_COMBINED_IT_SUM) AS SPOP_A1_COMBINED_IT_SUM                                 ";
	sql += "              , SUM(SPOP_A2_SUM) AS SPOP_A2_SUM                                                         ";
	sql += "              , SUM(SPOP_A2_SANITARY) AS SPOP_A2_SANITARY                                               ";
	sql += "              , SUM(SPOP_A2_SEPTIC) AS SPOP_A2_SEPTIC                                                   ";
	sql += "              , SUM(SPOP_A2_REMOVAL) AS SPOP_A2_REMOVAL                                                 ";
	sql += "           FROM TBL_PLA_POP_TOTAL                                                                       ";
	sql += "        )                                                                                               ";
	sql += "  ORDER BY DECODE(ADDR,'�Ѱ�',1,2), SB_ID, CAT_DID, DECODE(ADDR,'�Ұ�',1,2), ADM_CD                     ";
	
	
	

    
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
		
		jsonRecord.put("ADDR",rs.getString("ADDR"));
		jsonRecord.put("FINAL_PERCENTAGE",rs.getString("FINAL_PERCENTAGE"));
		
		jsonRecord.put("AREA_A1",rs.getString("AREA_A1"));
		jsonRecord.put("AREA_A2",rs.getString("AREA_A2"));
		jsonRecord.put("AREA_SUM",rs.getString("AREA_SUM"));
		jsonRecord.put("REGION",rs.getString("REGION"));
		jsonRecord.put("REGION_DATE",rs.getString("REGION_DATE"));
		jsonRecord.put("U_A1_TP_CODE",rs.getString("U_A1_TP_CODE"));
		jsonRecord.put("U_A1_TP_DATE",rs.getString("U_A1_TP_DATE"));
		jsonRecord.put("U_A1_TP_NAME",rs.getString("U_A1_TP_NAME"));
		jsonRecord.put("U_A3_TP_CODE",rs.getString("U_A3_TP_CODE"));
		jsonRecord.put("U_A3_TP_DATE",rs.getString("U_A3_TP_DATE"));
		jsonRecord.put("U_A3_TP_NAME",rs.getString("U_A3_TP_NAME"));
		jsonRecord.put("POP_SUM",rs.getString("POP_SUM"));
		jsonRecord.put("UPOP_SUM",rs.getString("UPOP_SUM"));
		jsonRecord.put("UPOP_A1_SUM",rs.getString("UPOP_A1_SUM"));
		jsonRecord.put("UPOP_A1_SEPARATE_WT_SUM",rs.getString("UPOP_A1_SEPARATE_WT_SUM"));
		jsonRecord.put("UPOP_A1_SEPARATE_IT_SUM",rs.getString("UPOP_A1_SEPARATE_IT_SUM"));
		jsonRecord.put("UPOP_A1_COMBINED_WT_SUM",rs.getString("UPOP_A1_COMBINED_WT_SUM"));
		jsonRecord.put("UPOP_A1_COMBINED_IT_SUM",rs.getString("UPOP_A1_COMBINED_IT_SUM"));
		jsonRecord.put("UPOP_A2_SUM",rs.getString("UPOP_A2_SUM"));
		jsonRecord.put("UPOP_A2_SANITARY",rs.getString("UPOP_A2_SANITARY"));
		jsonRecord.put("UPOP_A2_SEPTIC",rs.getString("UPOP_A2_SEPTIC"));
		jsonRecord.put("UPOP_A2_REMOVAL",rs.getString("UPOP_A2_REMOVAL"));
		jsonRecord.put("SPOP_SUM",rs.getString("SPOP_SUM"));
		jsonRecord.put("SPOP_A1_SUM",rs.getString("SPOP_A1_SUM"));
		jsonRecord.put("SPOP_A1_SEPARATE_WT_SUM",rs.getString("SPOP_A1_SEPARATE_WT_SUM"));
		jsonRecord.put("SPOP_A1_SEPARATE_IT_SUM",rs.getString("SPOP_A1_SEPARATE_IT_SUM"));
		jsonRecord.put("SPOP_A1_COMBINED_WT_SUM",rs.getString("SPOP_A1_COMBINED_WT_SUM"));
		jsonRecord.put("SPOP_A1_COMBINED_IT_SUM",rs.getString("SPOP_A1_COMBINED_IT_SUM"));
		jsonRecord.put("SPOP_A2_SUM",rs.getString("SPOP_A2_SUM"));
		jsonRecord.put("SPOP_A2_SANITARY",rs.getString("SPOP_A2_SANITARY"));
		jsonRecord.put("SPOP_A2_SEPTIC",rs.getString("SPOP_A2_SEPTIC"));
		jsonRecord.put("SPOP_A2_REMOVAL",rs.getString("SPOP_A2_REMOVAL"));
		
		
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
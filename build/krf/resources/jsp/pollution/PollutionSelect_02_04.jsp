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
	
	sql = " WITH TBL_PLA_ANIMAL_TOTAL AS (                                                                                    ";
	sql += "     SELECT WS_NM                                                                                                  ";
	sql += "          , MB_NM                                                                                                  ";
	sql += "          , SB_NM                                                                                                  ";
	sql += "          , CAT_ID                                                                                                 ";
	sql += "          , CAT_DID                                                                                                ";
	sql += "          , YYYY /* ����⵵ */                                                                                    ";
	sql += "          , DO_NM||CTY_NM||DONG_NM||RI_NM AS ADDR /* �������� */                                                   ";
	sql += "          , FINAL_PERCENTAGE                                                                                       ";
	sql += "          , MANAGER /* ���ָ� */                                                                                   ";
	sql += "          , LIVESTOCK_NM /* ���� */                                                                                ";
	sql += "          , LIVESTOCK_CNT /* �����μ� */                                                                         ";
	sql += "          , LIVESTOCK_AREA /* ������(��) */                                                                    ";
	sql += "          , REGS /* �������� ���� */                                                                               ";
	sql += "          , REGS_DATE /* ���������� */                                                                             ";
	sql += "          , DISCHARGE_FACI_NM /* �����ȯ����ʽü� */                                                             ";
	sql += "          , DISCHARGE_ADM_CD /* ��������������ڵ� */                                                              ";
	sql += "          , DISCHARGE_RIVER_NM /* �������õ�� */                                                                  ";
	sql += "          , INDIV_PURI_METHOD /* �����װ���ó��_ó����� */                                                        ";
	sql += "          , INDIV_PURI_AMT /* �����װ���ó��_ó����(��/��) */                                                    ";
	sql += "          , INDIV_PURI_MONEY /* �����װ���ó��_ó�����(õ��) */                                                 ";
	sql += "          , INDIV_COMPOST_METHOD /* ���ȭ ó������ */                                                             ";
	sql += "          , INDIV_COMPOST_AMT /* ���ȭ ó����(��/��) */                                                         ";
	sql += "          , INDIV_COMPOST_MONEY /* ���ȭ ó�����(õ��) */                                                      ";
	sql += "          , INDIV_LIQUID_METHOD /* �׺�ȭ ó������ */                                                              ";
	sql += "          , INDIV_LIQUID_AMT /* �׺�ȭ ó����(��/��) */                                                          ";
	sql += "          , INDIV_LIQUID_MONEY /* �׺�ȭ ó�����(õ��) */                                                       ";
	sql += "          , ENTRUST_PUB_COLMETHOD /* ����ó�� �������� */                                                          ";
	sql += "          , ENTRUST_PUB_DT /* ����ó�� �������� */                                                                 ";
	sql += "          , ENTRUST_PUB_FACI_NM /* ����ó�� �ü��� */                                                              ";
	sql += "          , ENTRUST_PUB_AMT /* ����ó�� ó����(��/��) */                                                         ";
	sql += "          , ENTRUST_PUB_MONEY /* ����ó�� ó�����(õ��) */                                                      ";
	sql += "          , ENTRUST_REUSE_AMT /* ��Ȱ�� ó����(��/��) */                                                         ";
	sql += "          , ENTRUST_REUSE_MONEY /* ��Ȱ�� ó�����(õ��) */                                                      ";
	sql += "          , ENTRUST_SEA_AMT /* �ؾ���� ó����(��/��) */                                                         ";
	sql += "          , ENTRUST_SEA_MONEY /* �ؾ���� ó�����(õ��) */                                                      ";
	sql += "          , ENTRUST /* ����д�ó������ ó����(��/��) */                                                           ";
	sql += "          , ETC_METHOD /* ��Ÿ ó����� */                                                                         ";
	sql += "          , ETC_AMT /* ��Ÿ ó����(��/��) */                                                                     ";
	sql += "          , ETC_MONEY /* ��Ÿ ó�����(õ��) */                                                                  ";
	sql += "          , ETC /* ��Ÿ */                                                                                         ";
	sql += "          , NO_TRT_AMT /* ��ó����(��/��) */                                                                     ";
	sql += "          , LEX_METHOD /* ������д�ó����� */                                                                    ";
	sql += "          , LEX_METHOD_ETC /* ��Ÿ��д�ó����� */                                                                ";
	sql += "          , SPRAY_LANDUSE /* ���������뵵 */                                                                       ";
	sql += "          , SPRAY_ADM_CD /* �������� �������� */                                                                   ";
	sql += "          , ADM_CD                                                                                                 ";
	sql += "          , SB_ID                                                                                                  ";
	sql += "       FROM PLA_ANIMAL_TOTAL_FOR_CAT                                                                               ";
	if(catDid.length != 0){
		sql += "       WHERE CAT_DID IN (                                            ";
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "     )                                                                                                             ";
	sql += " SELECT YYYY /* ����⵵ */                                                                                        ";
	sql += "      , WS_NM                                                                                                      ";
	sql += "      , MB_NM                                                                                                      ";
	sql += "      , SB_NM                                                                                                      ";
	sql += "      , CAT_DID                                                                                                    ";
	sql += "      , ADDR /* �������� */                                                                                        ";
	sql += "      , FINAL_PERCENTAGE                                                                                           ";
	sql += "      , MANAGER /* ���ָ� */                                                                                       ";
	sql += "      , LIVESTOCK_NM /* ���� */                                                                                    ";
	sql += "      , LIVESTOCK_CNT /* �����μ� */                                                                             ";
	sql += "      , LIVESTOCK_AREA /* ������(��) */                                                                        ";
	sql += "      , REGS /* �������� ���� */                                                                                   ";
	sql += "      , REGS_DATE /* ���������� */                                                                                 ";
	sql += "      , DISCHARGE_FACI_NM /* �����_ȯ����ʽü� */                                                                ";
	sql += "      , DISCHARGE_ADM_CD /* �����_���������ڵ� */                                                                 ";
	sql += "      , DISCHARGE_RIVER_NM /* �����_��õ�� */                                                                     ";
	sql += "      , INDIV_PURI_METHOD /* �����װ���ó��_ó����� */                                                            ";
	sql += "      , INDIV_PURI_AMT /* �����װ���ó��_ó����(��/��) */                                                        ";
	sql += "      , INDIV_PURI_MONEY /* �����װ���ó��_ó�����(õ��) */                                                     ";
	sql += "      , INDIV_COMPOST_METHOD /* ���ȭ ó������ */                                                                 ";
	sql += "      , INDIV_COMPOST_AMT /* ���ȭ ó����(��/��) */                                                             ";
	sql += "      , INDIV_COMPOST_MONEY /* ���ȭ ó�����(õ��) */                                                          ";
	sql += "      , INDIV_LIQUID_METHOD /* �׺�ȭ ó������ */                                                                  ";
	sql += "      , INDIV_LIQUID_AMT /* �׺�ȭ ó����(��/��) */                                                              ";
	sql += "      , INDIV_LIQUID_MONEY /* �׺�ȭ ó�����(õ��) */                                                           ";
	sql += "      , ENTRUST_PUB_COLMETHOD /* ����ó�� �������� */                                                              ";
	sql += "      , ENTRUST_PUB_DT /* ����ó�� �������� */                                                                     ";
	sql += "      , ENTRUST_PUB_FACI_NM /* ����ó�� �ü��� */                                                                  ";
	sql += "      , ENTRUST_PUB_AMT /* ����ó�� ó����(��/��) */                                                             ";
	sql += "      , ENTRUST_PUB_MONEY /* ����ó�� ó�����(õ��) */                                                          ";
	sql += "      , ENTRUST_REUSE_AMT /* ��Ȱ�� ó����(��/��) */                                                             ";
	sql += "      , ENTRUST_REUSE_MONEY /* ��Ȱ�� ó�����(õ��) */                                                          ";
	sql += "      , ENTRUST_SEA_AMT /* �ؾ���� ó����(��/��) */                                                             ";
	sql += "      , ENTRUST_SEA_MONEY /* �ؾ���� ó�����(õ��) */                                                          ";
	sql += "      , ENTRUST /* ����д�ó������ ó����(��/��) */                                                               ";
	sql += "      , ETC_METHOD /* ��Ÿ ó����� */                                                                             ";
	sql += "      , ETC_AMT /* ��Ÿ ó����(��/��) */                                                                         ";
	sql += "      , ETC_MONEY /* ��Ÿ ó�����(õ��) */                                                                      ";
	sql += "      , ETC /* ��Ÿ */                                                                                             ";
	sql += "      , NO_TRT_AMT /* ��ó����(��/��) */                                                                         ";
	sql += "      , LEX_METHOD /* ������д�ó����� */                                                                        ";
	sql += "      , LEX_METHOD_ETC /* ��Ÿ��д�ó����� */                                                                    ";
	sql += "      , SPRAY_LANDUSE /* ���������뵵 */                                                                           ";
	sql += "   FROM (                                                                                                          ";
	sql += "         SELECT YYYY /* ����⵵ */                                                                                ";
	sql += "              , WS_NM                                                                                              ";
	sql += "              , MB_NM                                                                                              ";
	sql += "              , SB_NM                                                                                              ";
	sql += "              , CAT_DID                                                                                            ";
	sql += "              , ADDR /* �������� */                                                                                ";
	sql += "              , FINAL_PERCENTAGE                                                                                   ";
	sql += "              , '' AS MANAGER /* ���ָ� */                                                                         ";
	sql += "              , LIVESTOCK_NM /* ���� */                                                                            ";
	sql += "              , SUM(LIVESTOCK_CNT) AS LIVESTOCK_CNT /* �����μ� */                                               ";
	sql += "              , '' AS LIVESTOCK_AREA /* ������(��) */                                                          ";
	sql += "              , '' AS REGS /* �������� ���� */                                                                     ";
	sql += "              , '' AS REGS_DATE /* ���������� */                                                                   ";
	sql += "              , '' AS DISCHARGE_FACI_NM /* �����_ȯ����ʽü� */                                                  ";
	sql += "              , '' AS DISCHARGE_ADM_CD /* �����_���������ڵ� */                                                   ";
	sql += "              , '' AS DISCHARGE_RIVER_NM /* �����_��õ�� */                                                       ";
	sql += "              , '' AS INDIV_PURI_METHOD /* �����װ���ó��_ó����� */                                              ";
	sql += "              , SUM(INDIV_PURI_AMT) AS INDIV_PURI_AMT /* �����װ���ó��_ó����(��/��) */                         ";
	sql += "              , SUM(INDIV_PURI_MONEY) AS INDIV_PURI_MONEY /* �����װ���ó��_ó�����(õ��) */                    ";
	sql += "              , '' AS INDIV_COMPOST_METHOD /* ���ȭ ó������ */                                                   ";
	sql += "              , SUM(INDIV_COMPOST_AMT) AS INDIV_COMPOST_AMT /* ���ȭ ó����(��/��) */                           ";
	sql += "              , SUM(INDIV_COMPOST_MONEY) AS INDIV_COMPOST_MONEY /* ���ȭ ó�����(õ��) */                      ";
	sql += "              , '' AS INDIV_LIQUID_METHOD /* �׺�ȭ ó������ */                                                    ";
	sql += "              , SUM(INDIV_LIQUID_AMT) AS INDIV_LIQUID_AMT /* �׺�ȭ ó����(��/��) */                             ";
	sql += "              , SUM(INDIV_LIQUID_MONEY) AS INDIV_LIQUID_MONEY /* �׺�ȭ ó�����(õ��) */                        ";
	sql += "              , '' AS ENTRUST_PUB_COLMETHOD /* ����ó�� �������� */                                                ";
	sql += "              , '' AS ENTRUST_PUB_DT /* ����ó�� �������� */                                                       ";
	sql += "              , '' AS ENTRUST_PUB_FACI_NM /* ����ó�� �ü��� */                                                    ";
	sql += "              , SUM(ENTRUST_PUB_AMT) AS ENTRUST_PUB_AMT /* ����ó�� ó����(��/��) */                             ";
	sql += "              , SUM(ENTRUST_PUB_MONEY) AS ENTRUST_PUB_MONEY /* ����ó�� ó�����(õ��) */                        ";
	sql += "              , SUM(ENTRUST_REUSE_AMT) AS ENTRUST_REUSE_AMT /* ��Ȱ�� ó����(��/��) */                           ";
	sql += "              , SUM(ENTRUST_REUSE_MONEY) AS ENTRUST_REUSE_MONEY /* ��Ȱ�� ó�����(õ��) */                      ";
	sql += "              , SUM(ENTRUST_SEA_AMT) AS ENTRUST_SEA_AMT /* �ؾ���� ó����(��/��) */                             ";
	sql += "              , SUM(ENTRUST_SEA_MONEY) AS ENTRUST_SEA_MONEY /* �ؾ���� ó�����(õ��) */                        ";
	sql += "              , SUM(ENTRUST) AS ENTRUST /* ����д�ó������ ó����(��/��) */                                       ";
	sql += "              , '' AS ETC_METHOD /* ��Ÿ ó����� */                                                               ";
	sql += "              , SUM(ETC_AMT) AS ETC_AMT /* ��Ÿ ó����(��/��) */                                                 ";
	sql += "              , SUM(ETC_MONEY) AS ETC_MONEY /* ��Ÿ ó�����(õ��) */                                            ";
	sql += "              , '' AS ETC /* ��Ÿ */                                                                               ";
	sql += "              , SUM(NO_TRT_AMT) AS NO_TRT_AMT /* ��ó����(��/��) */                                              ";
	sql += "              , '' AS LEX_METHOD /* ������д�ó����� */                                                          ";
	sql += "              , '' AS LEX_METHOD_ETC /* ��Ÿ��д�ó����� */                                                      ";
	sql += "              , '' AS SPRAY_LANDUSE /* ���������뵵 */                                                             ";
	sql += "              , '' AS ADM_CD                                                                                       ";
	sql += "              , '' AS SB_ID                                                                                        ";
	sql += "           FROM TBL_PLA_ANIMAL_TOTAL                                                                               ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID, ADDR, ADM_CD, FINAL_PERCENTAGE, LIVESTOCK_NM         ";
	sql += "         UNION                                                                                                     ";
	sql += "         SELECT YYYY /* ����⵵ */                                                                                ";
	sql += "              , WS_NM                                                                                              ";
	sql += "              , MB_NM                                                                                              ";
	sql += "              , SB_NM                                                                                              ";
	sql += "              , CAT_DID                                                                                            ";
	sql += "              , ADDR /* �������� */                                                                                ";
	sql += "              , '' AS FINAL_PERCENTAGE                                                                             ";
	sql += "              , '' AS MANAGER /* ���ָ� */                                                                         ";
	sql += "              , '�Ұ�' AS LIVESTOCK_NM /* ���� */                                                                  ";
	sql += "              , SUM(LIVESTOCK_CNT) AS LIVESTOCK_CNT /* �����μ� */                                               ";
	sql += "              , '' AS LIVESTOCK_AREA /* ������(��) */                                                          ";
	sql += "              , '' AS REGS /* �������� ���� */                                                                     ";
	sql += "              , '' AS REGS_DATE /* ���������� */                                                                   ";
	sql += "              , '' AS DISCHARGE_FACI_NM /* �����_ȯ����ʽü� */                                                  ";
	sql += "              , '' AS DISCHARGE_ADM_CD /* �����_���������ڵ� */                                                   ";
	sql += "              , '' AS DISCHARGE_RIVER_NM /* �����_��õ�� */                                                       ";
	sql += "              , '' AS INDIV_PURI_METHOD /* �����װ���ó��_ó����� */                                              ";
	sql += "              , SUM(INDIV_PURI_AMT) AS INDIV_PURI_AMT /* �����װ���ó��_ó����(��/��) */                         ";
	sql += "              , SUM(INDIV_PURI_MONEY) AS INDIV_PURI_MONEY /* �����װ���ó��_ó�����(õ��) */                    ";
	sql += "              , '' AS INDIV_COMPOST_METHOD /* ���ȭ ó������ */                                                   ";
	sql += "              , SUM(INDIV_COMPOST_AMT) AS INDIV_COMPOST_AMT /* ���ȭ ó����(��/��) */                           ";
	sql += "              , SUM(INDIV_COMPOST_MONEY) AS INDIV_COMPOST_MONEY /* ���ȭ ó�����(õ��) */                      ";
	sql += "              , '' AS INDIV_LIQUID_METHOD /* �׺�ȭ ó������ */                                                    ";
	sql += "              , SUM(INDIV_LIQUID_AMT) AS INDIV_LIQUID_AMT /* �׺�ȭ ó����(��/��) */                             ";
	sql += "              , SUM(INDIV_LIQUID_MONEY) AS INDIV_LIQUID_MONEY /* �׺�ȭ ó�����(õ��) */                        ";
	sql += "              , '' AS ENTRUST_PUB_COLMETHOD /* ����ó�� �������� */                                                ";
	sql += "              , '' AS ENTRUST_PUB_DT /* ����ó�� �������� */                                                       ";
	sql += "              , '' AS ENTRUST_PUB_FACI_NM /* ����ó�� �ü��� */                                                    ";
	sql += "              , SUM(ENTRUST_PUB_AMT) AS ENTRUST_PUB_AMT /* ����ó�� ó����(��/��) */                             ";
	sql += "              , SUM(ENTRUST_PUB_MONEY) AS ENTRUST_PUB_MONEY /* ����ó�� ó�����(õ��) */                        ";
	sql += "              , SUM(ENTRUST_REUSE_AMT) AS ENTRUST_REUSE_AMT /* ��Ȱ�� ó����(��/��) */                           ";
	sql += "              , SUM(ENTRUST_REUSE_MONEY) AS ENTRUST_REUSE_MONEY /* ��Ȱ�� ó�����(õ��) */                      ";
	sql += "              , SUM(ENTRUST_SEA_AMT) AS ENTRUST_SEA_AMT /* �ؾ���� ó����(��/��) */                             ";
	sql += "              , SUM(ENTRUST_SEA_MONEY) AS ENTRUST_SEA_MONEY /* �ؾ���� ó�����(õ��) */                        ";
	sql += "              , SUM(ENTRUST) AS ENTRUST /* ����д�ó������ ó����(��/��) */                                       ";
	sql += "              , '' AS ETC_METHOD /* ��Ÿ ó����� */                                                               ";
	sql += "              , SUM(ETC_AMT) AS ETC_AMT /* ��Ÿ ó����(��/��) */                                                 ";
	sql += "              , SUM(ETC_MONEY) AS ETC_MONEY /* ��Ÿ ó�����(õ��) */                                            ";
	sql += "              , '' AS ETC /* ��Ÿ */                                                                               ";
	sql += "              , SUM(NO_TRT_AMT) AS NO_TRT_AMT /* ��ó����(��/��) */                                              ";
	sql += "              , '' AS LEX_METHOD /* ������д�ó����� */                                                          ";
	sql += "              , '' AS LEX_METHOD_ETC /* ��Ÿ��д�ó����� */                                                      ";
	sql += "              , '' AS SPRAY_LANDUSE /* ���������뵵 */                                                             ";
	sql += "              , '' AS ADM_CD                                                                                       ";
	sql += "              , '' AS SB_ID                                                                                        ";
	sql += "           FROM TBL_PLA_ANIMAL_TOTAL                                                                               ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID, ADDR                                                 ";
	sql += "         UNION                                                                                                     ";
	sql += "         SELECT '' AS YYYY /* ����⵵ */                                                                          ";
	sql += "              , '' AS WS_NM                                                                                        ";
	sql += "              , '' AS MB_NM                                                                                        ";
	sql += "              , '' AS SB_NM                                                                                        ";
	sql += "              , '' AS CAT_DID                                                                                      ";
	sql += "              , '�Ѱ�' AS ADDR /* �������� */                                                                      ";
	sql += "              , '' AS FINAL_PERCENTAGE                                                                             ";
	sql += "              , '' AS MANAGER /* ���ָ� */                                                                         ";
	sql += "              , LIVESTOCK_NM /* ���� */                                                                            ";
	sql += "              , SUM(LIVESTOCK_CNT) AS LIVESTOCK_CNT /* �����μ� */                                               ";
	sql += "              , '' AS LIVESTOCK_AREA /* ������(��) */                                                          ";
	sql += "              , '' AS REGS /* �������� ���� */                                                                     ";
	sql += "              , '' AS REGS_DATE /* ���������� */                                                                   ";
	sql += "              , '' AS DISCHARGE_FACI_NM /* �����_ȯ����ʽü� */                                                  ";
	sql += "              , '' AS DISCHARGE_ADM_CD /* �����_���������ڵ� */                                                   ";
	sql += "              , '' AS DISCHARGE_RIVER_NM /* �����_��õ�� */                                                       ";
	sql += "              , '' AS INDIV_PURI_METHOD /* �����װ���ó��_ó����� */                                              ";
	sql += "              , SUM(INDIV_PURI_AMT) AS INDIV_PURI_AMT /* �����װ���ó��_ó����(��/��) */                         ";
	sql += "              , SUM(INDIV_PURI_MONEY) AS INDIV_PURI_MONEY /* �����װ���ó��_ó�����(õ��) */                    ";
	sql += "              , '' AS INDIV_COMPOST_METHOD /* ���ȭ ó������ */                                                   ";
	sql += "              , SUM(INDIV_COMPOST_AMT) AS INDIV_COMPOST_AMT /* ���ȭ ó����(��/��) */                           ";
	sql += "              , SUM(INDIV_COMPOST_MONEY) AS INDIV_COMPOST_MONEY /* ���ȭ ó�����(õ��) */                      ";
	sql += "             , '' AS INDIV_LIQUID_METHOD /* �׺�ȭ ó������ */                                                    ";
	sql += "             , SUM(INDIV_LIQUID_AMT) AS INDIV_LIQUID_AMT /* �׺�ȭ ó����(��/��) */                             ";
	sql += "             , SUM(INDIV_LIQUID_MONEY) AS INDIV_LIQUID_MONEY /* �׺�ȭ ó�����(õ��) */                        ";
	sql += "             , '' AS ENTRUST_PUB_COLMETHOD /* ����ó�� �������� */                                                ";
	sql += "             , '' AS ENTRUST_PUB_DT /* ����ó�� �������� */                                                       ";
	sql += "             , '' AS ENTRUST_PUB_FACI_NM /* ����ó�� �ü��� */                                                    ";
	sql += "             , SUM(ENTRUST_PUB_AMT) AS ENTRUST_PUB_AMT /* ����ó�� ó����(��/��) */                             ";
	sql += "             , SUM(ENTRUST_PUB_MONEY) AS ENTRUST_PUB_MONEY /* ����ó�� ó�����(õ��) */                        ";
	sql += "             , SUM(ENTRUST_REUSE_AMT) AS ENTRUST_REUSE_AMT /* ��Ȱ�� ó����(��/��) */                           ";
	sql += "             , SUM(ENTRUST_REUSE_MONEY) AS ENTRUST_REUSE_MONEY /* ��Ȱ�� ó�����(õ��) */                      ";
	sql += "             , SUM(ENTRUST_SEA_AMT) AS ENTRUST_SEA_AMT /* �ؾ���� ó����(��/��) */                             ";
	sql += "             , SUM(ENTRUST_SEA_MONEY) AS ENTRUST_SEA_MONEY /* �ؾ���� ó�����(õ��) */                        ";
	sql += "             , SUM(ENTRUST) AS ENTRUST /* ����д�ó������ ó����(��/��) */                                       ";
	sql += "             , '' AS ETC_METHOD /* ��Ÿ ó����� */                                                               ";
	sql += "             , SUM(ETC_AMT) AS ETC_AMT /* ��Ÿ ó����(��/��) */                                                 ";
	sql += "             , SUM(ETC_MONEY) AS ETC_MONEY /* ��Ÿ ó�����(õ��) */                                            ";
	sql += "             , '' AS ETC /* ��Ÿ */                                                                               ";
	sql += "             , SUM(NO_TRT_AMT) AS NO_TRT_AMT /* ��ó����(��/��) */                                              ";
	sql += "             , '' AS LEX_METHOD /* ������д�ó����� */                                                          ";
	sql += "             , '' AS LEX_METHOD_ETC /* ��Ÿ��д�ó����� */                                                      ";
	sql += "             , '' AS SPRAY_LANDUSE /* ���������뵵 */                                                             ";
	sql += "             , '' AS ADM_CD                                                                                       ";
	sql += "             , '' AS SB_ID                                                                                        ";
	sql += "          FROM TBL_PLA_ANIMAL_TOTAL                                                                               ";
	sql += "         GROUP BY LIVESTOCK_NM                                                                                    ";
	sql += "        UNION                                                                                                     ";
	sql += "        SELECT '' AS YYYY /* ����⵵ */                                                                          ";
	sql += "             , '' AS WS_NM                                                                                        ";
	sql += "             , '' AS MB_NM                                                                                        ";
	sql += "             , '' AS SB_NM                                                                                        ";
	sql += "             , '' AS CAT_DID                                                                                      ";
	sql += "             , '�Ѱ�' AS ADDR /* �������� */                                                                      ";
	sql += "             , '' AS FINAL_PERCENTAGE                                                                             ";
	sql += "             , '' AS MANAGER /* ���ָ� */                                                                         ";
	sql += "             , '�Ұ�' AS LIVESTOCK_NM /* ���� */                                                                  ";
	sql += "             , SUM(LIVESTOCK_CNT) AS LIVESTOCK_CNT /* �����μ� */                                               ";
	sql += "             , '' AS LIVESTOCK_AREA /* ������(��) */                                                          ";
	sql += "             , '' AS REGS /* �������� ���� */                                                                     ";
	sql += "             , '' AS REGS_DATE /* ���������� */                                                                   ";
	sql += "             , '' AS DISCHARGE_FACI_NM /* �����_ȯ����ʽü� */                                                  ";
	sql += "             , '' AS DISCHARGE_ADM_CD /* �����_���������ڵ� */                                                   ";
	sql += "             , '' AS DISCHARGE_RIVER_NM /* �����_��õ�� */                                                       ";
	sql += "             , '' AS INDIV_PURI_METHOD /* �����װ���ó��_ó����� */                                              ";
	sql += "             , SUM(INDIV_PURI_AMT) AS INDIV_PURI_AMT /* �����װ���ó��_ó����(��/��) */                         ";
	sql += "             , SUM(INDIV_PURI_MONEY) AS INDIV_PURI_MONEY /* �����װ���ó��_ó�����(õ��) */                    ";
	sql += "             , '' AS INDIV_COMPOST_METHOD /* ���ȭ ó������ */                                                   ";
	sql += "             , SUM(INDIV_COMPOST_AMT) AS INDIV_COMPOST_AMT /* ���ȭ ó����(��/��) */                           ";
	sql += "             , SUM(INDIV_COMPOST_MONEY) AS INDIV_COMPOST_MONEY /* ���ȭ ó�����(õ��) */                      ";
	sql += "             , '' AS INDIV_LIQUID_METHOD /* �׺�ȭ ó������ */                                                    ";
	sql += "             , SUM(INDIV_LIQUID_AMT) AS INDIV_LIQUID_AMT /* �׺�ȭ ó����(��/��) */                             ";
	sql += "             , SUM(INDIV_LIQUID_MONEY) AS INDIV_LIQUID_MONEY /* �׺�ȭ ó�����(õ��) */                        ";
	sql += "             , '' AS ENTRUST_PUB_COLMETHOD /* ����ó�� �������� */                                                ";
	sql += "             , '' AS ENTRUST_PUB_DT /* ����ó�� �������� */                                                       ";
	sql += "             , '' AS ENTRUST_PUB_FACI_NM /* ����ó�� �ü��� */                                                    ";
	sql += "             , SUM(ENTRUST_PUB_AMT) AS ENTRUST_PUB_AMT /* ����ó�� ó����(��/��) */                             ";
	sql += "             , SUM(ENTRUST_PUB_MONEY) AS ENTRUST_PUB_MONEY /* ����ó�� ó�����(õ��) */                        ";
	sql += "             , SUM(ENTRUST_REUSE_AMT) AS ENTRUST_REUSE_AMT /* ��Ȱ�� ó����(��/��) */                           ";
	sql += "             , SUM(ENTRUST_REUSE_MONEY) AS ENTRUST_REUSE_MONEY /* ��Ȱ�� ó�����(õ��) */                      ";
	sql += "             , SUM(ENTRUST_SEA_AMT) AS ENTRUST_SEA_AMT /* �ؾ���� ó����(��/��) */                             ";
	sql += "             , SUM(ENTRUST_SEA_MONEY) AS ENTRUST_SEA_MONEY /* �ؾ���� ó�����(õ��) */                        ";
	sql += "             , SUM(ENTRUST) AS ENTRUST /* ����д�ó������ ó����(��/��) */                                       ";
	sql += "             , '' AS ETC_METHOD /* ��Ÿ ó����� */                                                               ";
	sql += "             , SUM(ETC_AMT) AS ETC_AMT /* ��Ÿ ó����(��/��) */                                                 ";
	sql += "             , SUM(ETC_MONEY) AS ETC_MONEY /* ��Ÿ ó�����(õ��) */                                            ";
	sql += "             , '' AS ETC /* ��Ÿ */                                                                               ";
	sql += "             , SUM(NO_TRT_AMT) AS NO_TRT_AMT /* ��ó����(��/��) */                                              ";
	sql += "             , '' AS LEX_METHOD /* ������д�ó����� */                                                          ";
	sql += "             , '' AS LEX_METHOD_ETC /* ��Ÿ��д�ó����� */                                                      ";
	sql += "             , '' AS SPRAY_LANDUSE /* ���������뵵 */                                                             ";
	sql += "             , '' AS ADM_CD                                                                                       ";
	sql += "             , '' AS SB_ID                                                                                        ";
	sql += "          FROM TBL_PLA_ANIMAL_TOTAL                                                                               ";
	sql += "       )                                                                                                          ";
	sql += " ORDER BY DECODE(ADDR,'�Ѱ�',1,2), SB_ID, CAT_DID, ADDR, DECODE(LIVESTOCK_NM,'�Ұ�',1,2), LIVESTOCK_NM	       		";
	
	
	
	
	

    
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
		jsonRecord.put("MANAGER",rs.getString("MANAGER"));
		jsonRecord.put("LIVESTOCK_NM",rs.getString("LIVESTOCK_NM"));
		jsonRecord.put("LIVESTOCK_CNT",rs.getString("LIVESTOCK_CNT"));
		jsonRecord.put("LIVESTOCK_AREA",rs.getString("LIVESTOCK_AREA"));
		jsonRecord.put("REGS",rs.getString("REGS"));
		jsonRecord.put("REGS_DATE",rs.getString("REGS_DATE"));
		jsonRecord.put("DISCHARGE_FACI_NM",rs.getString("DISCHARGE_FACI_NM"));
		jsonRecord.put("DISCHARGE_ADM_CD",rs.getString("DISCHARGE_ADM_CD"));
		jsonRecord.put("DISCHARGE_RIVER_NM",rs.getString("DISCHARGE_RIVER_NM"));
		jsonRecord.put("INDIV_PURI_METHOD",rs.getString("INDIV_PURI_METHOD"));
		jsonRecord.put("INDIV_PURI_AMT",rs.getString("INDIV_PURI_AMT"));
		jsonRecord.put("INDIV_PURI_MONEY",rs.getString("INDIV_PURI_MONEY"));
		jsonRecord.put("INDIV_COMPOST_METHOD",rs.getString("INDIV_COMPOST_METHOD"));
		jsonRecord.put("INDIV_COMPOST_AMT",rs.getString("INDIV_COMPOST_AMT"));
		jsonRecord.put("INDIV_COMPOST_MONEY",rs.getString("INDIV_COMPOST_MONEY"));
		jsonRecord.put("INDIV_LIQUID_METHOD",rs.getString("INDIV_LIQUID_METHOD"));
		jsonRecord.put("INDIV_LIQUID_AMT",rs.getString("INDIV_LIQUID_AMT"));
		jsonRecord.put("INDIV_LIQUID_MONEY",rs.getString("INDIV_LIQUID_MONEY"));
		jsonRecord.put("ENTRUST_PUB_COLMETHOD",rs.getString("ENTRUST_PUB_COLMETHOD"));
		jsonRecord.put("ENTRUST_PUB_DT",rs.getString("ENTRUST_PUB_DT"));
		jsonRecord.put("ENTRUST_PUB_FACI_NM",rs.getString("ENTRUST_PUB_FACI_NM"));
		jsonRecord.put("ENTRUST_PUB_AMT",rs.getString("ENTRUST_PUB_AMT"));
		jsonRecord.put("ENTRUST_PUB_MONEY",rs.getString("ENTRUST_PUB_MONEY"));
		jsonRecord.put("ENTRUST_REUSE_AMT",rs.getString("ENTRUST_REUSE_AMT"));
		jsonRecord.put("ENTRUST_REUSE_MONEY",rs.getString("ENTRUST_REUSE_MONEY"));
		jsonRecord.put("ENTRUST_SEA_AMT",rs.getString("ENTRUST_SEA_AMT"));
		jsonRecord.put("ENTRUST_SEA_MONEY",rs.getString("ENTRUST_SEA_MONEY"));
		jsonRecord.put("ENTRUST",rs.getString("ENTRUST"));
		jsonRecord.put("ETC_METHOD",rs.getString("ETC_METHOD"));
		jsonRecord.put("ETC_AMT",rs.getString("ETC_AMT"));
		jsonRecord.put("ETC_MONEY",rs.getString("ETC_MONEY"));
		jsonRecord.put("ETC",rs.getString("ETC"));
		jsonRecord.put("NO_TRT_AMT",rs.getString("NO_TRT_AMT"));
		jsonRecord.put("LEX_METHOD",rs.getString("LEX_METHOD"));
		jsonRecord.put("LEX_METHOD_ETC",rs.getString("LEX_METHOD_ETC"));
		jsonRecord.put("SPRAY_LANDUSE",rs.getString("SPRAY_LANDUSE"));
		
		
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
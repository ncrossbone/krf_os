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
	String siteIds = request.getParameter("siteIds");
	
	String startYear = request.getParameter("startYear");
	String startMonth = request.getParameter("startMonth");
	String endYear = request.getParameter("endYear");
	String endMonth = request.getParameter("endMonth");
	
	String startYYYYMM = startYear + startMonth;
	String endYYYYMM = endYear + endMonth;
	String startFull = request.getParameter("startFull");
	String endFull = request.getParameter("endFull");
	
	sql="WITH TBL_TEMP AS (                                                                                                                                                                      \n\r";
	sql+="SELECT RIVER_ID, SITE_NAME, MSR_DATE                                                                                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M02'  THEN M02  ELSE NULL END) AS F02   --����1                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M03'  THEN M03  ELSE NULL END) AS F03   --�����̿³�1                                                                   \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M04'  THEN M04  ELSE NULL END) AS F04   --����������1                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M05'  THEN M05  ELSE NULL END) AS F05   --�������1                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M06'  THEN M06  ELSE NULL END) AS F06   --������ź��1                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M07'  THEN M07  ELSE NULL END) AS F07   --���޽�                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M08'  THEN M08  ELSE NULL END) AS F08   --���� pH                                                                           \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M09'  THEN M09  ELSE NULL END) AS F09   --���� ����                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M10'  THEN M10  ELSE NULL END) AS F10   --���� ��ҷ�                                                                       \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M11'  THEN M11  ELSE NULL END) AS F11   --Ȱ������                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M12'  THEN M12  ELSE NULL END) AS F12   --��ȭ��ƿ��                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M13'  THEN M13  ELSE NULL END) AS F13   --1.1.1-Ʈ��Ŭ�ηο�����                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M14'  THEN M14  ELSE NULL END) AS F14   --����                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M15'  THEN M15  ELSE NULL END) AS F15   --�翰ȭź��                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M16'  THEN M16  ELSE NULL END) AS F16   --Ʈ��Ŭ�ηο�ƿ��                                                                \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M17'  THEN M17  ELSE NULL END) AS F17   --��翣                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M18'  THEN M18  ELSE NULL END) AS F18   --��Ʈ��Ŭ�ηο�ƿ��                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M19'  THEN M19  ELSE NULL END) AS F19   --��ƿ����                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M20'  THEN M20  ELSE NULL END) AS F20   --m,p-���Ϸ�                                                                       \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M21'  THEN M21  ELSE NULL END) AS F21   --o-���Ϸ�                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M22'  THEN M22  ELSE NULL END) AS F22   --[ECD]��ȭ��ƿ��                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M23'  THEN M23  ELSE NULL END) AS F23   --[ECD]1.1.1-Ʈ��Ŭ�ηο�����                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M24'  THEN M24  ELSE NULL END) AS F24   --[ECD]�翰ȭź��                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M25'  THEN M25  ELSE NULL END) AS F25   --[ECD]Ʈ��Ŭ�ηο�ƿ��                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M26'  THEN M26  ELSE NULL END) AS F26   --[ECD]��Ʈ��Ŭ�ηο�ƿ��                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M27'  THEN M27  ELSE NULL END) AS F27   --������                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M28'  THEN M28  ELSE NULL END) AS F28   --����                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M29'  THEN M29  ELSE NULL END) AS F29   --Ŭ�η���-a                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M30'  THEN M30  ELSE NULL END) AS F30   --������                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M31'  THEN M31  ELSE NULL END) AS F31   --���޽�(��)                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M32'  THEN M32  ELSE NULL END) AS F32   --���޽�(��)                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M33'  THEN M33  ELSE NULL END) AS F33   --��������(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M34'  THEN M34  ELSE NULL END) AS F34   --��������(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M35'  THEN M35  ELSE NULL END) AS F35   --�λ꿰��                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M36'  THEN M36  ELSE NULL END) AS F36   --�ϸ�ϾƼ�����                                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M37'  THEN M37  ELSE NULL END) AS F37   --���꼺����                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M38'  THEN M38  ELSE NULL END) AS F38   --����2                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M39'  THEN M39  ELSE NULL END) AS F39   --�����̿³�2                                                                   \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M40'  THEN M40  ELSE NULL END) AS F40   --����������2                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M41'  THEN M41  ELSE NULL END) AS F41   --�������2                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M42'  THEN M42  ELSE NULL END) AS F42   --�ǳ��µ�                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M43'  THEN M43  ELSE NULL END) AS F43   --UPS ����                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M44'  THEN M44  ELSE NULL END) AS F44   --���Թ� ����                                                                       \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M45'  THEN M45  ELSE NULL END) AS F45   --����                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M46'  THEN M46  ELSE NULL END) AS F46   --����                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M47'  THEN M47  ELSE NULL END) AS F47   --ä������(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M48'  THEN M48  ELSE NULL END) AS F48   --ä������(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M49'  THEN M49  ELSE NULL END) AS F49   --������ġ                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M50'  THEN M50  ELSE NULL END) AS F50   --�׿��׽���                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M51'  THEN M51  ELSE NULL END) AS F51   --��Ž��                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M52'  THEN M52  ELSE NULL END) AS F52   --�ǳ�����                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M53'  THEN M53  ELSE NULL END) AS F53   --��������                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M54'  THEN M54  ELSE NULL END) AS F54   --�Ϲ�ä����                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M55'  THEN M55  ELSE NULL END) AS F55   --VOCsä����                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M56'  THEN M56  ELSE NULL END) AS F56   --���Ϸ�                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M57'  THEN M57  ELSE NULL END) AS F57   --��������(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M58'  THEN M58  ELSE NULL END) AS F58   --�����ӵ�(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M59'  THEN M59  ELSE NULL END) AS F59   --��ü��(��)                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M60'  THEN M60  ELSE NULL END) AS F60   --�����ӵ� ��������(��)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M61'  THEN M61  ELSE NULL END) AS F61   --����Ż ����(��)                                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M62'  THEN M62  ELSE NULL END) AS F62   --�÷�µ�(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M63'  THEN M63  ELSE NULL END) AS F63   --��������(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M64'  THEN M64  ELSE NULL END) AS F64   --�����ӵ�(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M65'  THEN M65  ELSE NULL END) AS F65   --��ü��(��)                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M66'  THEN M66  ELSE NULL END) AS F66   --�����ӵ� ��������(��)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M67'  THEN M67  ELSE NULL END) AS F67   --����Ż ����(��)                                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M68'  THEN M68  ELSE NULL END) AS F68   --�÷�µ�(��)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M69'  THEN M69  ELSE NULL END) AS F69   --����3                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M70'  THEN M70  ELSE NULL END) AS F70   --�����̿³�3                                                                   \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M71'  THEN M71  ELSE NULL END) AS F71   --����������3                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M72'  THEN M72  ELSE NULL END) AS F72   --�������3                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M73'  THEN M73  ELSE NULL END) AS F73   --Ź��3                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M74'  THEN M74  ELSE NULL END) AS F74   --ī���                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M75'  THEN M75  ELSE NULL END) AS F75   --��                                                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M76'  THEN M76  ELSE NULL END) AS F76   --����                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M77'  THEN M77  ELSE NULL END) AS F77   --�ƿ�                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M78'  THEN M78  ELSE NULL END) AS F78   --���                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M79'  THEN M79  ELSE NULL END) AS F79   --Ź��1                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M80'  THEN M80  ELSE NULL END) AS F80   --Ź��2                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M81'  THEN M81  ELSE NULL END) AS F81   --������ź��                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M82'  THEN M82  ELSE NULL END) AS F82   --���Ұ�������                                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M83'  THEN M83  ELSE NULL END) AS F83   --��������                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M84'  THEN M84  ELSE NULL END) AS F84   --�̻��� ��������                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M85'  THEN M85  ELSE NULL END) AS F85   --����(A)                                                                            \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M86'  THEN M86  ELSE NULL END) AS F86   --����(B)                                                                            \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M87'  THEN M87  ELSE NULL END) AS F87   --���� ��������                                                                    \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M88'  THEN M88  ELSE NULL END) AS F88   --���� ������(�÷�)                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M89'  THEN M89  ELSE NULL END) AS F89   --���� �ִ�������(�÷�)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M90'  THEN M90  ELSE NULL END) AS F90   --���� ������(�����÷�)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M91'  THEN M91  ELSE NULL END) AS F91   --���� �ִ�������(�����÷�)                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M92'  THEN M92  ELSE NULL END) AS F92   --���� �������ⷮ(�÷�)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M93'  THEN M93  ELSE NULL END) AS F93   --���� �������ⷮ(�����÷�)                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M94'  THEN M94  ELSE NULL END) AS F94   --ä������ ��������                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M95'  THEN M95  ELSE NULL END) AS F95   --���췮                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M96'  THEN M96  ELSE NULL END) AS F96   --������������                                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M97'  THEN M97  ELSE NULL END) AS F97   --������������                                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M98'  THEN M98  ELSE NULL END) AS F98   --�������Ծз�                                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M99'  THEN M99  ELSE NULL END) AS F99   --����                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M100' THEN M100 ELSE NULL END) AS F100  --���2                                                                            \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M101' THEN M101 ELSE NULL END) AS F101  --Factor_Chl-a                                                                    \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M105' THEN M105 ELSE NULL END) AS F105  --������                                                                           \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M106' THEN M106 ELSE NULL END) AS F106  --���������� R��                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M107' THEN M107 ELSE NULL END) AS F107  --���������� R��                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M108' THEN M108 ELSE NULL END) AS F108  --���������� R��                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M109' THEN M109 ELSE NULL END) AS F109  --���������� ���Լ�                                                             \n\r";
	sql+="  FROM (                                                                                                                                                                                      \n\r";
	sql+="        SELECT DECODE(A.RIVER_ID, 'R01', '�Ѱ�', 'R02', '������', 'R03', '�ݰ�', '���갭') AS RIVER_ID                                                                      \n\r";
	sql+="             , A.SITE_ID                                                                                                                                                                       \n\r";
	sql+="             , SITE_NAME                                                                                                                                                                    \n\r";
	sql+="             , TO_CHAR(TO_DATE(MSR_DATE,'YYYY.MM.DD HH24:MI:SS'),'YYYY.MM.DD HH24:MI') AS MSR_DATE                                                     \n\r";
	sql+="             , M01, M02, M03, M04, M05, M06, M07, M08, M09, M10, M11, M12, M13, M14, M15, M16,                                                             \n\r";
	sql+="			 M17, M18, M19, M20, M21, M22, M23, M24, M25, M26, M27, M28, M29, M30, M31, M32,                                                               \n\r";
	sql+="			 M33, M34, M35, M36, M37, M38, M39, M40, M41, M42, M43, M44, M45, M46, M47, M48,                                                               \n\r";
	sql+="			 M49, M50, M51, M52, M53, M54, M55, M56, M57, M58, M59, M60, M61, M62, M63, M64,                                                               \n\r";
	sql+="			 M65, M66, M67, M68, M69, M70, M71, M72, M73, M74, M75, M76, M77, M78, M79, M80,                                                               \n\r";
	sql+="			 M81, M82, M83, M84, M85, M86, M87, M88, M89, M90, M91, M92, M93, M94, M95, M96,                                                               \n\r";
	sql+="			 M97, M98, M99, M100, M101, M105, M106, M107, M108, M109                                                                                                 \n\r";
	sql+="          FROM SITEINFO_TB A                                                                                                                                                            \n\r";
	sql+="             , MAN_FIVEDATA_TB B                                                                                                                                                       \n\r";
	sql+="         WHERE A.SITE_ID = B.SITE_ID                                                                                                                                                   \n\r";
	sql+="           AND A.SITE_ID IN (" + siteIds + ") -- �����ڵ�                                                                                                                  \n\r";
	sql+="           AND SUBSTR(MSR_DATE,1,6) >= '" + startYYYYMM + "'                                                                                                                          \n\r";
	sql+="           AND SUBSTR(MSR_DATE,1,6) <= '" + endYYYYMM + "'                                                                                                                          \n\r";
	sql+="       ) AA                                                                                                                                                                                     \n\r";
	sql+="     , (                                                                                                                                                                                          \n\r";
	sql+="        SELECT SITE_ID, ITEM_ID                                                                                                                                                          \n\r";
	sql+="          FROM SITEITEMLIST2_TB                                                                                                                                                        \n\r";
	sql+="         WHERE USE_YN = '1'                                                                                                                                                              \n\r";
	sql+="       ) BB                                                                                                                                                                                     \n\r";
	sql+=" WHERE AA.SITE_ID = BB.SITE_ID                                                                                                                                                        \n\r";
	sql+=" GROUP BY RIVER_ID, SITE_NAME, MSR_DATE                                                                                                                                        \n\r";
	sql+=")                                                                                                                                                                                                \n\r";
	sql+="SELECT RIVER_ID -- ��ǿ�                                                                                                                                                                \n\r";
	sql+="     , SITE_NAME -- �����Ҹ�                                                                                                                                                              \n\r";
	sql+="     , MSR_DATE -- �����Ͻ�                                                                                                                                                               \n\r";
	sql+="     , CASE WHEN F02 IS NOT NULL THEN F02                                                                                                                                       \n\r";
	sql+="            WHEN F38 IS NOT NULL THEN F38                                                                                                                                        \n\r";
	sql+="            ELSE F69                                                                                                                                                                          \n\r";
	sql+="       END F02 --����(��)                                                                                                                                                                   \n\r";
	sql+="     , CASE WHEN F03 IS NOT NULL THEN F03                                                                                                                                       \n\r";
	sql+="            WHEN F39 IS NOT NULL THEN F39                                                                                                                                        \n\r";
	sql+="            ELSE F70                                                                                                                                                                          \n\r";
	sql+="       END F03 --�����̿³�                                                                                                                                                             \n\r";
	sql+="     , CASE WHEN F04 IS NOT NULL THEN F04                                                                                                                                       \n\r";
	sql+="            WHEN F40 IS NOT NULL THEN F40                                                                                                                                        \n\r";
	sql+="            ELSE F71                                                                                                                                                                          \n\r";
	sql+="       END F04 --����������(��S/cm)                                                                                                                                                     \n\r";
	sql+="     , CASE WHEN F05 IS NOT NULL THEN F05                                                                                                                                       \n\r";
	sql+="            WHEN F41 IS NOT NULL THEN F41                                                                                                                                        \n\r";
	sql+="            ELSE F72                                                                                                                                                                          \n\r";
	sql+="       END F05 --�������(mg/L)                                                                                                                                                         \n\r";
	sql+="     , CASE WHEN F06 IS NOT NULL THEN F06                                                                                                                                       \n\r";
	sql+="            ELSE F81                                                                                                                                                                          \n\r";
	sql+="       END F06 --������ź��(mg/L)                                                                                                                                                       \n\r";
	sql+="     , CASE WHEN F79 IS NOT NULL THEN F79                                                                                                                                       \n\r";
	sql+="            WHEN F80 IS NOT NULL THEN F80                                                                                                                                        \n\r";
	sql+="            ELSE F73                                                                                                                                                                          \n\r";
	sql+="       END F05 --Ź��                                                                                                                                                                       \n\r";
	sql+="     , F27  --������(mg/L)                                                                                                                                                                  \n\r";
	sql+="     , F28  --����(mg/L)                                                                                                                                                                    \n\r";
	sql+="     , F36  --�ϸ�ϾƼ�����(mg/L)                                                                                                                                                       \n\r";
	sql+="     , F37  --���꼺����(mg/L)                                                                                                                                                            \n\r";
	sql+="     , F35  --�λ꿰��(mg/L)                                                                                                                                                               \n\r";
	sql+="     , F29  --Ŭ�η���-a(mg/��)                                                                                                                                                           \n\r";
	sql+="     , F14  --����(��g/L)                                                                                                                                                                     \n\r";
	sql+="     , F17  --��翣(��g/L)                                                                                                                                                                  \n\r";
	sql+="     , F19  --��ƿ����(��g/L)                                                                                                                                                                \n\r";
	sql+="     , F56  --���Ϸ�                                                                                                                                                                          \n\r";
	sql+="     , F20  --m,p-���Ϸ�(��g/L)                                                                                                                                                             \n\r";
	sql+="     , F21  --o-���Ϸ�(��g/L)                                                                                                                                                                \n\r";
	sql+="     , F22  --��ȭ��ƿ��(��g/L)                                                                                                                                                             \n\r";
	sql+="     , F23  --1.1.1-Ʈ��Ŭ�ηο�����(��g/L)                                                                                                                                              \n\r";
	sql+="     , F24  --�翰ȭź��(��g/L)                                                                                                                                                             \n\r";
	sql+="     , F25  --Ʈ��Ŭ�ηο�ƿ��(��g/L)                                                                                                                                                     \n\r";
	sql+="     , F26  --��Ʈ��Ŭ�ηο�ƿ��(��g/L)                                                                                                                                                   \n\r";
	sql+="     , F74  --ī���(mg/L)                                                                                                                                                                  \n\r";
	sql+="     , F75  --��(mg/L)                                                                                                                                                                       \n\r";
	sql+="     , F76  --����(mg/L)                                                                                                                                                                    \n\r";
	sql+="     , F77  --�ƿ�(mg/L)                                                                                                                                                                    \n\r";
	sql+="     , CASE WHEN F78 IS NOT NULL THEN F78                                                                                                                                       \n\r";
	sql+="            ELSE F100                                                                                                                                                                        \n\r";
	sql+="       END F06 --���(mg/L)                                                                                                                                                              \n\r";
	sql+="     , F07  --���޽�(pulse)                                                                                                                                                                  \n\r";
	sql+="     , F12  --��ȭ��ƿ��(��g/L)                                                                                                                                                             \n\r";
	sql+="     , F13  --1.1.1-Ʈ��Ŭ�ηο�����(��g/L)                                                                                                                                              \n\r";
	sql+="     , F15  --�翰ȭź��(��g/L)                                                                                                                                                             \n\r";
	sql+="     , F16  --Ʈ��Ŭ�ηο�ƿ��(��g/L)                                                                                                                                                     \n\r";
	sql+="     , F18  --��Ʈ��Ŭ�ηο�ƿ��(��g/L)                                                                                                                                                   \n\r";
	sql+="     , F31  --���޽�(��)(pulse)                                                                                                                                                             \n\r";
	sql+="     , F32  --���޽�(��)(pulse)                                                                                                                                                             \n\r";
	sql+="     , F57  --��������(��)                                                                                                                                                                   \n\r";
	sql+="     , F58  --�����ӵ�(��)                                                                                                                                                                   \n\r";
	sql+="     , F59  --��ü��(��)                                                                                                                                                                      \n\r";
	sql+="     , F63  --��������(��)                                                                                                                                                                   \n\r";
	sql+="     , F64  --�����ӵ�(��)                                                                                                                                                                   \n\r";
	sql+="     , F65  --��ü��(��)                                                                                                                                                                      \n\r";
	sql+="     , F84  --�̻��� ��������                                                                                                                                                               \n\r";
	sql+="     , F87  --���� ��������                                                                                                                                                                 \n\r";
	sql+="     , F105 --������                                                                                                                                                                          \n\r";
	sql+="     , F106 --���������� R1                                                                                                                                                                \n\r";
	sql+="     , F107 --���������� R2                                                                                                                                                                \n\r";
	sql+="     , F108 --���������� R3                                                                                                                                                                \n\r";
	sql+="     , F109 --���������� ���Լ�                                                                                                                                                            \n\r";
	sql+="  FROM TBL_TEMP                                                                                                                                                                          \n\r";
	sql+=" ORDER BY RIVER_ID, MSR_DATE, SITE_NAME                                                                                                                                        \n\r";
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		jsonRecord.put("RIVER_ID" , rs.getString("RIVER_ID"));
		jsonRecord.put("SITE_NAME" , rs.getString("SITE_NAME"));
		jsonRecord.put("MSR_DATE" , rs.getString("MSR_DATE"));
		jsonRecord.put("F02" , rs.getFloat("F02"));
		
		jsonRecord.put("F03" , rs.getFloat("F03"));
		jsonRecord.put("F04" , rs.getFloat("F04"));
		jsonRecord.put("F05" , rs.getFloat("F05"));
		jsonRecord.put("F06" , rs.getFloat("F06"));
		jsonRecord.put("F05" , rs.getFloat("F05"));
		jsonRecord.put("F27" , rs.getFloat("F27"));
		jsonRecord.put("F28" , rs.getFloat("F28"));
		jsonRecord.put("F36" , rs.getFloat("F36"));
		jsonRecord.put("F37" , rs.getFloat("F37"));
		jsonRecord.put("F35" , rs.getFloat("F35"));
		
		jsonRecord.put("F29" , rs.getFloat("F29"));
		jsonRecord.put("F14" , rs.getFloat("F14"));
		jsonRecord.put("F17" , rs.getFloat("F17"));
		jsonRecord.put("F19" , rs.getFloat("F19"));
		jsonRecord.put("F56" , rs.getFloat("F56"));
		jsonRecord.put("F20" , rs.getFloat("F20"));
		jsonRecord.put("F21" , rs.getFloat("F21"));
		jsonRecord.put("F22" , rs.getFloat("F22"));
		jsonRecord.put("F23" , rs.getFloat("F23"));
		jsonRecord.put("F24" , rs.getFloat("F24"));
		jsonRecord.put("F25" , rs.getFloat("F25"));
		jsonRecord.put("F26" , rs.getFloat("F26"));
		jsonRecord.put("F74" , rs.getFloat("F74"));
		jsonRecord.put("F75" , rs.getFloat("F75"));
		jsonRecord.put("F76" , rs.getFloat("F76"));
		jsonRecord.put("F77" , rs.getFloat("F77"));
		jsonRecord.put("F06" , rs.getFloat("F06"));
		
		jsonRecord.put("F07" , rs.getFloat("F07"));
		jsonRecord.put("F12" , rs.getFloat("F12"));
		jsonRecord.put("F13" , rs.getFloat("F13"));
		jsonRecord.put("F15" , rs.getFloat("F15"));
		jsonRecord.put("F16" , rs.getFloat("F16"));
		jsonRecord.put("F18" , rs.getFloat("F18"));
		jsonRecord.put("F31" , rs.getFloat("F31"));
		jsonRecord.put("F32" , rs.getFloat("F32"));
		jsonRecord.put("F57" , rs.getFloat("F57"));
		jsonRecord.put("F58" , rs.getFloat("F58"));
		jsonRecord.put("F59" , rs.getFloat("F59"));
		jsonRecord.put("F63" , rs.getFloat("F63"));
		jsonRecord.put("F64" , rs.getFloat("F64"));
		jsonRecord.put("F65" , rs.getFloat("F65"));
		
		jsonRecord.put("F84" , rs.getFloat("F84"));
		jsonRecord.put("F87" , rs.getFloat("F87"));
		jsonRecord.put("F105" , rs.getFloat("F105"));
		jsonRecord.put("F106" , rs.getFloat("F106"));
		jsonRecord.put("F107" , rs.getFloat("F107"));
		jsonRecord.put("F108" , rs.getFloat("F108"));
		jsonRecord.put("F109" , rs.getFloat("F109"));
	
		

		
  		jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("data", jsonArr);
   
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	//out.print(ex);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>
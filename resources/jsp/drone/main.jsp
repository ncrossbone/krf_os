<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%
	/* 
		�߿�!!!
		Json ���·� ����ϴ� jsp�������� ��� html ��ҵ� ������� �ʾƾ� �Ѵ�.
		<!DOCTYPE, <html ���
	*/
	try{
	String id = request.getParameter("id");
//String pw = request.getParameter("pw");

//out.println(id);
//out.println(pw);

Calendar oCalendar = Calendar.getInstance( );  // ���� ��¥/�ð� ���� ���� ���� ���

/*
    out.println("���� ��: " +  oCalendar.get(Calendar.YEAR));
    out.println("���� ��: " + (oCalendar.get(Calendar.MONTH) + 1));
    out.println("���� ��: " +  oCalendar.get(Calendar.DAY_OF_MONTH));
    out.println(); // �����ٷ� �థ�� �ϱ�

    out.println("���� ��: " +  oCalendar.get(Calendar.HOUR_OF_DAY)); // 24�ð���
    out.println("���� ��: " +  oCalendar.get(Calendar.MINUTE));
    out.println("���� ��: " +  oCalendar.get(Calendar.SECOND));
    out.println();

    // 12�ð����� ���� ��
    out.print("���� ��: " +  oCalendar.get(Calendar.HOUR));
    if (oCalendar.get(Calendar.AM_PM) == 0) out.println("am");
    else out.println("pm");

    out.println("���� ���� 1000����1��: " +  oCalendar.get(Calendar.MILLISECOND));

    out.println("���� ����: " +  oCalendar.get(Calendar.DAY_OF_WEEK)); // �Ͽ��� = 1
    out.println("���� �� ��° ��: " + oCalendar.get(Calendar.DAY_OF_YEAR)); // 1�� 1�� = 1
    out.println("���� �� ��° ��: " + oCalendar.get(Calendar.WEEK_OF_YEAR)); // 1�� 1���� = 1

    out.println("�̹� ���� �� ��° ��: " + oCalendar.get(Calendar.WEEK_OF_MONTH)); // ù° �� = 1
    */
    
    String month = "";
    String day = "";
    String hour = "";
    String min = "";
    String sec = "";
    
    if((oCalendar.get(Calendar.MONTH) + 1) < 10)
    	month = "0" + (oCalendar.get(Calendar.MONTH) + 1);
    else
    	month = "" + (oCalendar.get(Calendar.MONTH) + 1);
    
    if(oCalendar.get(Calendar.DAY_OF_MONTH) < 10)
    	day = "0" + oCalendar.get(Calendar.DAY_OF_MONTH);
    else
    	day = "" + oCalendar.get(Calendar.DAY_OF_MONTH);
    
    if(oCalendar.get(Calendar.HOUR_OF_DAY) < 10)
    	hour = "0" + oCalendar.get(Calendar.HOUR_OF_DAY);
    else
    	hour = "" + oCalendar.get(Calendar.HOUR_OF_DAY);
    
    if(oCalendar.get(Calendar.MINUTE) < 10)
    	min = "0" + oCalendar.get(Calendar.MINUTE);
    else
    	min = "" + oCalendar.get(Calendar.MINUTE);
    
    if(oCalendar.get(Calendar.SECOND) < 10)
    	sec = "0" + oCalendar.get(Calendar.SECOND);
    else
    	sec = "" + oCalendar.get(Calendar.SECOND);
    	
    String currDate = oCalendar.get(Calendar.YEAR) + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    //out.println(currDate);
    
//sql="select * from MINE_INFO"; //���� �κ�
   //sql="select * from KRF_DRONE_LOG"; //���� �κ�
   sql="INSERT INTO KRF_DRONE_LOG (ID, MAIN_OP_DT) VALUES ('" + id + "', '" + currDate + "')"; //���� �κ�
   //out.println(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
/*
 	JSONArray array = new JSONArray();
 	JSONObject obj  = new JSONObject();
 	JSONObject empinfo = null;
 */	
 	 /*	
 	while(rs.next()) {
		//empinfo = new JSONObject();	 
		
		//empinfo.put("rnum" 				, rs.getString("rnum")); 
  		//empinfo.put("MINE_CODE" 			, rs.getString("MINE_CODE"));
  		//empinfo.put("INQUIRY_AREA" 	, rs.getString("INQUIRY_AREA"));
  		//empinfo.put("INQUIRY_YEAR" 			, rs.getString("INQUIRY_YEAR"));
  		//empinfo.put("MINE_NAME" 		, rs.getString("MINE_NAME"));
  		
  		//array.add(empinfo);
  		out.println(rs.getString("ID"));
 	}
 */
 //out.println(rs);
	//obj.put("data",array);
   	//obj.put("totalCount",totalCount);
 	//out.println(obj);
 	//out.flush();

   if(rs != null) rs.close();
   if(stmt != null)stmt.close();
   if(con != null)con.close();
   
   session.setAttribute("id", id);
   session.setAttribute("currDate", currDate);
   
   out.print("success");
}catch(Exception ex){
	System.out.println(ex);
	out.print("error");
} 
 %>
<%@ include file="dbClose.jsp" %>
<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ page import="java.util.*,java.text.*"%>
<%
/* 
	�߿�!!!
	Json ���·� ����ϴ� jsp�������� ��� html ��ҵ� ������� �ʾƾ� �Ѵ�.
	<!DOCTYPE, <html ���
*/
try{
	//HttpSession session = request.getSession(false);
	//session.setAttribute("id", "ddd");
	//out.println(session.getAttribute("id"));
	
	Object id = session.getAttribute("id");
	Object currDate = session.getAttribute("currDate");
	
	//out.print(id);
	if(id == null){
		
		out.print("false");
	}
	else{
		out.print("true");
	}
}
catch(Exception ex){
	out.println("false");
}
%>
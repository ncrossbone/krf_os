<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.clipsoft.clipreport.server.service.admin.serviceconfig.util.ParameterConverter" %>
<%
	String create = ParameterConverter.valueParameter(request.getParameter("Create"));
	String dbName = ParameterConverter.valueParameter((String) request.getAttribute("dbName"));
	String encoding = ParameterConverter.valueParameter((String) request.getAttribute("encoding"));
	String client = ParameterConverter.valueParameter((String) request.getAttribute("client"));
	String user = ParameterConverter.valueParameter((String) request.getAttribute("user"));
	String password = ParameterConverter.valueParameter((String) request.getAttribute("password"));
	String language = ParameterConverter.valueParameter((String) request.getAttribute("language"));
	String hostName = ParameterConverter.valueParameter((String) request.getAttribute("hostName"));
	String systemNumber = ParameterConverter.valueParameter((String) request.getAttribute("systemNumber"));
	String group = ParameterConverter.valueParameter((String) request.getAttribute("group"));
	String gateway = ParameterConverter.valueParameter((String) request.getAttribute("gateway"));
%>
<script type="text/javascript">
	function addSAPDataConnection(form) {
		if (!form.dbName.value) {
			alert("디비이름을 입력하세요.");
			form.dbName.focus();
			return;
		}
		
		if (!form.client.value) {
			alert("Client명을 입력하세요.");
			form.client.focus();
			return;
		}

		if (!form.user.value) {
			alert("User명을 입력하세요.");
			form.user.focus();
			return;
		}

		if (!form.password.value) {
			alert("Password를 입력하세요.");
			form.password.focus();
			return;
		}

		if (!form.language.value) {
			alert("Language를 입력하세요.");
			form.language.focus();
			return;
		}

		if (!form.hostName.value) {
			alert("HostName을 입력하세요.");
			form.hostName.focus();
			return;
		}

		if (!form.systemNumber.value) {
			alert("SystemNumber를 입력하세요.");
			form.systemNumber.focus();
			return;
		}
		
		form.submit();
	}
</script>
<div class="container">
	<div class="page-header">
		<h3>엔진 SAP 커넥션추가 페이지</h3>
	</div>
	<div style="width:1200px; margin:0px auto;">
		<form style="padding-left:50px; padding-top:50px;" class="form-horizontal" action="index.jsp" method="post">
			<input type="hidden" name="ClipID" value="L56">
			<input type="hidden" name="dataConnectionType">
			
			<div class="control-group">
			    <label class="control-label">Database Name</label>
			    <div class="controls">
			      <input type="text" class="input-xxlarge" id="dbName" name="dbName" placeholder="Database Name" value="<%=dbName%>">
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">Client</label>
			    <div class="controls">
			      <input type="text" class="input-xxlarge" id="client" name="client" placeholder="Client" value="<%=client%>">
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">User</label>
			    <div class="controls">
			      <input type="text" class="input-xxlarge" id="user" name="user" placeholder="User" value="<%=user%>">
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">Password</label>
			    <div class="controls">
			      <input type="password" class="input-xxlarge" id="password" name="password" maxlength="15" placeholder="Password" value="<%=password%>">
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">Language</label>
			    <div class="controls">
			      <input type="text" class="input-xxlarge" id="language" name="language" placeholder="Language" value="<%=language%>">
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">HostName</label>
			    <div class="controls">
			      <input type="text" class="input-xxlarge" id="hostName" name="hostName" placeholder="HostName" value="<%=hostName%>">
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">SystemNumber</label>
			    <div class="controls">
			      <input type="text" class="input-xxlarge" id="systemNumber" name="systemNumber" placeholder="SystemNumber" value="<%=systemNumber%>">
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">Group</label>
			    <div class="controls">
			      <input type="text" class="input-xxlarge" id="group" name="group" placeholder="Group" value="<%=group%>">
			    </div>
			</div>
			
			<div class="control-group">
			    <label class="control-label">Gateway</label>
			    <div class="controls">
			      <input type="text" class="input-xxlarge" id="gateway" name="gateway" placeholder="Gateway" value="<%=gateway%>">
			    </div>
			</div>
			  
			<div class="control-group">
			    <div class="controls">
			      	<button type="button" class="btn btn-primary" onclick="addSAPDataConnection(this.form)">확인</button>
			      	<a class="btn" type="button" href="index.jsp?ClipID=L103">취소</a>
			    </div>
			</div>
			  
		</form>
	</div>
</div>

<script type="text/javascript">
	<% if (create != null && create.equals("false")) { %>
		alert("같은 이름의 커넥션을 추가하실수 없습니다.");
	<% } %>
</script>

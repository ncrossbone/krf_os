<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.clipsoft.clipreport.common.server.beans.printer.*" %>
<%
	ArrayList<Printer> printerList = (ArrayList<Printer>) request.getAttribute("printerList");
%>
<script type="text/javascript">
	function deletePrinter(form) {
		var isDelete = confirm("Are you sure that you want to delete ?");
		if (isDelete) {
			form.submit();
		} else {
			alert("It has been canceled.")
		}
	}
</script>
<div class="container">
	<div class="page-header">
		<h3>Printer Settings Page</h3>
	</div>
	
	<div style="width:100%; margin:0px auto;">
		<div class="table-responsive">
			<table class="table table-hover">
				
				<thead>
					<tr>
						<th colspan="4"></th>
					</tr>	
				</thead> <!-- thead -->
				
				<tfoot>
					<tr>
						<td colspan="5">
							<a href="index.jsp?ClipID=E50">
								<button class="btn btn-primary"><i class="icon-edit icon-white"></i> Add Printer</button>
							</a>
						</td>
					</tr>
				</tfoot> <!-- tfoot -->
				
				<tbody>
					<tr>
						<th width="5%"style="text-align:center">No</th>
						<th width="35%" style="text-align:center">Printer Name</th>
						<th width="50%" style="text-align:center">Driver Name</th>
						<th width="10%" style="text-align:center"></th>
					</tr>
					
					<% int count = printerList.size(); if (count > 0) { for (int index = 0; index < count; index++) {%>
					<tr>
						<td width="5%" style="text-align:center"><%=index+1%> </td>
						<td width="35%" style="text-align:center"><%=printerList.get(index).getName() %></td>
						<td width="50%" style="text-align:center"><%=printerList.get(index).getDriver() %></td>
						<td width="10%" style="text-align:center">
							<form style="display:inline" action="index.jsp" method="post">
								<input type="hidden" name="ClipID" value="E200">
								<input type="hidden" name="printerName" value="<%=printerList.get(index).getName()%>"> 
								<button type="button" class="btn btn-link" onclick="deletePrinter(this.form)">Delete</button>
							</form>
						</td>
					</tr>
					<% } } else {%>
					<tr>
						<td colspan="4" style="text-align:center">Printer information does not exist, please add a new printer</td>
					</tr>	
					<% } %>	
				</tbody> <!-- tbody -->
				
			</table> <!-- table -->
		</div>
	</div>
</div> <!-- container -->

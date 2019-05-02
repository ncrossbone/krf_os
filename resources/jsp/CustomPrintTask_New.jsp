<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
	<%@page import="java.util.UUID"%>
		<%@page import="java.util.HashMap"%>
			<%@page import="com.google.gson.Gson"%>

				<%@page import="java.awt.Color"%>
					<%@page import="java.awt.Graphics2D"%>
						<%@page import="java.awt.image.BufferedImage"%>
							<%@page import="java.io.*"%>
								<%@page import="java.net.URL"%>
									<%@page import="java.nio.file.Paths"%>
										<%@page import="javax.imageio.ImageIO"%>
											<%@page import="java.awt.*"%>
												<%@page import="org.apache.batik.transcoder.image.PNGTranscoder"%>
													<%@page import="org.apache.batik.transcoder.TranscoderInput"%>
														<%@page import="org.apache.batik.transcoder.TranscoderOutput"%>

															<%
	/* url로 받아서 이미지 변환/저장하는 로직.. */

	response.setHeader("Access-Control-Allow-Origin","*");
	response.setHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept");
	try{
		Gson gson = new Gson();
		String fileName = request.getParameter("fileName");
		String arcServiceUrl = request.getParameter("arcServiceUrl");
		String mode = request.getParameter("mode");
		String imgSaveUrl = request.getParameter("imgSaveUrl");
		
		// 맵 이미지 저장 폴더
		String imgSavePath = request.getSession().getServletContext().getRealPath(imgSaveUrl);
		
		if(fileName==null){
			
			String svgInfo = request.getParameter("svgInfo");
			
			String legendInfo = request.getParameter("legendInfo");

			int start = svgInfo.indexOf("<svg");
			int end = svgInfo.indexOf("</svg");
			svgInfo = svgInfo.substring(start, end+6);
			svgInfo = svgInfo.replace("xmlns=\"http://www.w3.org/2000/svg\"", "");
			svgInfo = svgInfo.replaceAll("<svg", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?> <svg xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" ");
			
			svgInfo = svgInfo.replaceAll("./resources/","http://112.217.167.123:40003/KRF_DEV/resources/");
			int width = Integer.parseInt(request.getParameter("width"));
			int height = Integer.parseInt(request.getParameter("height"));
			ImageInfo[] imageInfos = gson.fromJson(request.getParameter("imageInfos"), ImageInfo[].class);
			
			String randomId =  UUID.randomUUID().toString();
			String svgFileName = "svg_" + randomId + ".svg";
			String svgPngFileName = "svg_" + randomId + ".png";
			String legendSvgFileName = "le_svg_" + randomId + ".svg";
			String legendPngFileName = "le_svg_" + randomId + ".png";

			String resultPngFileName = "result_" + randomId + ".png";
			
			File desti = new File(imgSavePath);
			if(!desti.exists()){
				desti.mkdirs(); 
			}
		    
			
			BufferedWriter writer =
				new BufferedWriter(
					new OutputStreamWriter(
						new FileOutputStream(imgSavePath + "\\" + svgFileName), "UTF8"));
		    writer.write(svgInfo);
		    writer.flush();
			writer.close();
		    
		    BufferedImage newImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
			Graphics2D graphic = newImage.createGraphics();
			
		    Color color = graphic.getColor();
		    graphic.setPaint(Color.WHITE);
		    graphic.fillRect(0, 0, width, height);
		    graphic.setColor(color);
		    
		    for(int i=0; i<imageInfos.length; i++){
		    	
		    	String imgSrc = imageInfos[i].src;
		    	
		    	URL imgURL = new URL(imgSrc);
		    	
	            BufferedImage baseImage = ImageIO.read(imgURL);
	            
	            // 투명도 설정
	            AlphaComposite alpha = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, imageInfos[i].opacity);
	            graphic.setComposite(alpha);
	            
	            // 그래픽 그리기
	            graphic.drawImage(baseImage, imageInfos[i].translateX, imageInfos[i].translateY, null);
			}
			
			try{
				String svg_URI_input = Paths.get(imgSavePath + "\\" + svgFileName).toUri().toURL().toString();
	        	TranscoderInput input_svg_image = new TranscoderInput(svg_URI_input);     
		    
		    	OutputStream png_ostream = new FileOutputStream(imgSavePath + "\\" + svgPngFileName);
				TranscoderOutput output_png_image = new TranscoderOutput(png_ostream);  
			
				PNGTranscoder my_converter = new PNGTranscoder();  
				my_converter.transcode(input_svg_image, output_png_image);
				png_ostream.flush();
				png_ostream.close();  
				
				BufferedImage svgImg = ImageIO.read(new File(imgSavePath + "\\" + svgPngFileName));
				graphic.drawImage(svgImg, null, 0, 0);

				if(legendInfo != null && !"null".equals(legendInfo)){
					int leHeight = Integer.parseInt(request.getParameter("legendHeight"));

					legendInfo = legendInfo.replace("xmlns=\"http://www.w3.org/2000/svg\"", "");
					legendInfo = legendInfo.replaceAll("<svg", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?> <svg xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" ");
					BufferedWriter writer2 = new BufferedWriter( new OutputStreamWriter( new FileOutputStream(imgSavePath + "\\" + legendSvgFileName), "UTF8"));
					writer2.write(legendInfo);
					writer2.flush();
					writer2.close();

					String le_svg_URI_input = Paths.get(imgSavePath + "\\" + legendSvgFileName).toUri().toURL().toString();
					TranscoderInput le_input_svg_image = new TranscoderInput(le_svg_URI_input);     
					
					OutputStream le_png_ostream = new FileOutputStream(imgSavePath + "\\" + legendPngFileName);
					TranscoderOutput le_output_png_image = new TranscoderOutput(le_png_ostream);  

					PNGTranscoder my_converter2 = new PNGTranscoder();  

					my_converter2.transcode(le_input_svg_image, le_output_png_image);
					le_png_ostream.flush();
					le_png_ostream.close();  

					BufferedImage le_svgImg = ImageIO.read(new File(imgSavePath + "\\" + legendPngFileName));
					graphic.drawImage(le_svgImg, null, 10, (height-leHeight-10));
				}
		    }catch(Exception e){ 
				System.out.println("error");
				e.printStackTrace();
			}
		    
		    graphic.dispose();
			
		    File outputfile = new File(imgSavePath + "\\" + resultPngFileName);
		    ImageIO.write(newImage, "png", outputfile);
		    
		    HashMap hashMap = new HashMap();
		    
		    if(mode.equals("print")){
		    	hashMap.put("url", arcServiceUrl + "/rest/directories/arcgisoutput/customPrintTask/" + resultPngFileName);
		    }else if(mode.equals("capture")){
		    	hashMap.put("url", "http://" + request.getServerName()+ ":" + request.getServerPort() + request.getContextPath() + request.getServletPath() + "?fileName=" + resultPngFileName + "&imgSaveUrl=" + imgSaveUrl);
		    }else if(mode.equals("report")){
				
		    	hashMap.put("url", imgSaveUrl + "/" + resultPngFileName);
		    	hashMap.put("path", imgSavePath + "\\" + resultPngFileName);
			}
			out.println(gson.toJson(hashMap));
			File file = null;
			
			file = new File(imgSavePath + "\\" + svgFileName);
			if( file.exists() ){
				file.delete();
			}
			file = new File(imgSavePath + "\\" + svgPngFileName);
			if( file.exists() ){
				file.delete();
			}
			file = new File(imgSavePath + "\\" + legendSvgFileName);
			if( file.exists() ){
				file.delete();
			}
			file = new File(imgSavePath + "\\" + legendPngFileName);
			if( file.exists() ){
				file.delete();
			}
		}else{
			File file = new File(imgSavePath + "\\" + fileName);
			FileInputStream fin = new FileInputStream(file);
			int ifilesize = (int)file.length();
			byte b[] = new byte[ifilesize];
			response.setContentLength(ifilesize);
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition","attachment; filename="+fileName+";");
			out.clear();
			out = pageContext.pushBody();

			ServletOutputStream oout = response.getOutputStream();
			fin.read(b);
			oout.write(b,0,ifilesize);
			oout.flush();
			oout.close();
			fin.close();
			fin = null;
			oout = null;
			
			// 파일 삭제
			
			file = new File(imgSavePath + "\\" + fileName);
			if( file.exists() ){
				file.delete();
			}
				//Runtime.getRuntime().gc();	
		}
	}catch(Exception e){
		System.out.println(e);
		//e.printStackTrace();
	}
%>

																<%!
	class ImageInfo{
		public String src;
		public String base64;
		public int translateX;
		public int translateY;
		public float opacity;
	}
%>
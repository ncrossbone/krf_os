<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html manifest="">

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title>물환경 지리정보</title>

	<!-- The line below must be kept intact for Sencha Cmd to build your application -->
	<link rel="shortcut icon" href="./resources/images/mainico.ico" />
	<link rel="stylesheet" href="./resources/css/layer.css">
	<link rel="stylesheet" href="./resources/css/drone.css">
	<link rel="stylesheet" href="./resources/Desktop-all.css">

	<link rel="stylesheet" href="./resources/css/gis.css">

	<!-- <link rel="stylesheet" href="http://js.arcgis.com/3.23/esri/css/esri.css">
	<link rel="stylesheet" href="http://js.arcgis.com/3.23/dijit/themes/claro/claro.css"> -->

	<link rel="stylesheet" href="http://js.arcgis.com/3.15/esri/css/esri.css">
	<link rel="stylesheet" href="http://js.arcgis.com/3.15/dijit/themes/claro/claro.css">

	<!-- 프린트  -->
	<!-- 	<script type="text/javascript" src="./resources/js/CustomPrintTask.js"></script> -->

	<style type="text/css">
		/* 처음 로딩시 window 화면 못잡음 임의적으로 height 지정 */

		#chromePop-innerCt .x-autocontainer-innerCt {
			height: 335px !important;
		}


		#west_container-splitter {
			background-color: #ede5dc !important;
		}

		.x-btn-icon .refreshbutton {
			background-image: url(./resources/images/button/refresh1.jpeg) !important;
			height: 32px;
			width: 32px;
		}

		.x-toolbar-default-west-khLee {
			background: #003873 !important;
			padding: 0px !important;
		}

		.x-toolbar-default-west-khLee img {
			left: 0px !important;
		}

		.khLee-box-inner .x-box-inner {
			background-image: url(./resources/images/button/top_bg.png) !important;
			padding: 0px !important;
		}

		.khLee-x-north-right {
			position: absolute !important;
			top: 11px !important;
			width: 267px !important;
			left: 0px !important;
			margin-left: 85% !important;
		}

		.khLee-x-north-right .x-box-inner {
			width: 267px !important;
		}

		.khLee-x-north-right .x-box-target {
			width: 267px !important;
		}

		.khLee-x-north-right img {
			float: left;
			left: 0px !important;
			position: relative !important;
			text-align: right !important;
		}

		/* .khLee-x-header .x-panel-header .x-box-inner { */

		/* 	height: 25px !important; */

		/* } */

		.khLee-x-header .x-panel-header-default-horizontal.x-header-noborder {
			padding: 4px !important;
			/*box-shadow: 0px 3px 2px #777;*/
		}

		.khLee-x-tab-header .x-panel-header-default-horizontal {
			padding: 7px 4px 4px 4px !important;
		}

		.khLee-x-tab-header .x-box-inner {
			height: 22px !important;
		}

		.khLee-x-tab-header .x-panel-default-outer-border-rbl {
			border: 0px !important;
		}

		.khLee-x-serch-btn {
			height: 19px !important;
			width: 34px !important;
			cursor: pointer !important;
		}

		.khLee-x-default-btn {
			height: 19px !important;
			width: 24px !important;
			cursor: pointer !important;
		}

		.khLee-x-tree-node-text-bold {
			font-weight: bold;
			letter-spacing: -1px;
		}

		.khLee-x-tree-node-text-small {
			font-size: 12px;
			color: #0066cc;
			text-decoration: underline;
			letter-spacing: -1px;
		}

		.khLee-x-tree-node-text-small-bold {
			font-size: 13px;
			color: #A52A2A;
			text-decoration: underline;
			letter-spacing: -1px;
		}

		.khLee-x-tree-node-text-small-nounder {
			font-size: 12px;
			letter-spacing: -1px;
		}

		.khLee-window-panel-header .x-window-header-default-top {
			background-image: url('./resources/images/button/pop_bg.gif') !important;
			border-style: none !important;
			height: 35px;
			background-repeat: repeat-x;
			padding: 8px 0px 0px 5px;
		}

		.khLee-x-window-default {
			/*
			border: 0px !important;
			border-width: 0px !important;
		*/
			/*border-color: #999 !important;*/
			border-style: none !important;
		}

		/*
		 .x-window-body-default {
		 background-image: url('./resources/images/button/pop_bg.gif') !important;
		 	border-style: none !important;
		 }
		*/

		.khLee-x-reachtoolbar .x-box-inner {
			border: 0px !important;
			background-color: #043264 !important;
		}

		.khLee-x-reachtollbar-default .x-border-item x-box-item x-toolbar-default x-box-layout-ct {
			padding: 0px;
		}

		.khLee-x-button-move {
			cursor: pointer;
			border: 0px !important;
			background: transparent url(./resources/images/button/btn_move.gif) 0 0 no-repeat !important;
			width: 48px;
			height: 25px;
			border-radius: 0px !important;
		}

		.khLee-x-button-search {
			cursor: pointer;
			border: 0px !important;
			background: transparent url(./resources/images/button/icon_seah2.gif) 0 0 no-repeat !important;
			width: 55px;
			height: 25px;
		}

		.khLee-x-button-select {
			cursor: pointer;
			border: 0px !important;
			background: transparent url(./resources/images/button/btn_select.gif) 0 0 no-repeat !important;
			width: 132px;
			height: 32px;
			border-radius: 0px !important;
		}

		.khLee-x-button-reset {
			cursor: pointer;
			border: 0px !important;
			background: transparent url(./resources/images/button/btn_reset.gif) 0 0 no-repeat !important;
			width: 132px;
			height: 32px;
			border-radius: 0px !important;
		}

		/*
		.khLee-x-box-target .x-box-target {
			position: relative;
		}
		*/

		.khLee-x-box-target .x-box-target img {
			position: relative;
			float: left;
			margin: 0px;
		}

		.khLee-x-searcharea-water .x-panel {
			margin: 10px;
			padding: 10px;
			background: #f8f8f8;
			border: 1px solid #d8d8d8;
			color: #000000 !important;
		}

		.sub-panel-x-header {
			background-color: #ecf1f5 !important;
			border-bottom: 1px solid #e6e6e6 !important;
		}

		.sub-panel-x-header>.x-panel-header-title-default {
			color: #000000 !important;
		}

		.sub-panel-header-text {
			color: #000000 !important;
			font-size: 13px !important;
			font-weight: bold !important;
			padding: 10px;
			letter-spacing: -1px;
		}

		.sub-panel-x-header>.x-tool-img {
			background-color: #405166 !important;
		}

		.khLee-x-form .x-panel-body {
			background: #f8f6f9;
			right: auto;
			left: 5px;
			top: 5px;
			margin: 0px;
			width: 312px;
			height: 131px;
		}

		.khLee-infowin-title {
			padding: 4px 5px;
			font-size: 12px;
			font-weight: bold;
			height: 24px;
		}

		.khLee-infowin-cont {
			font-size: 12px;
			padding: 4px 5px;
			border-bottom: 1px solid #999;
			height: 25px;
		}

		.khLee-x-column-header-text .x-column-header-text,
		.x-column-header {

			color: #000 !important;
			font-weight: bold !important;
			font-size: 13px !important;
			text-align: center;
		}

		.khLee-x-column-header-text {
			padding: 0px 10px 10px 10px;

		}

		.khLee-x-column-header-text>div>div>div {
			border-top: 2px solid #2f4054;
		}

		.khLee-x-grid-locked .x-grid-locked .x-grid-inner-locked,
		.x-column-header {
			border-right: 1px dotted #c1c1c1 !important;
		}

		.khLee-x-label-default {
			padding-top: 2px;
			min-height: 24px;
			position: relative;
		}

		.khLee-x-label-default b {
			letter-spacing: -1px;
			position: absolute;
			top: 4px;
			left: 14px;

		}

		.khLee-x-form-item-label-default .x-form-item-label-default {
			padding-top: 2px;
		}

		.x-tree-icon .x-tree-icon-leaf.abc {
			background: url(abc) x y no-repat !important;
		}

		.ux-custom-title-close-icon .x-tool-close {
			background-image: url('./resources/images/button/icon_close2.gif');
			background-position: 0 0;
		}

		.ux-custom-title-close-icon .x-tool-over .x-tool-close {
			background-image: url('./resources/images/button/icon_close2.gif');
			background-position: 0 0;
		}

		.khLee-x-grid-cell .x-grid-cell-inner-action-col {
			padding: 4px 4px 1px 4px !important;
		}

		.khLee-datePanel-body1 .x-window-body .x-window-body-default {
			height: 25px !important;
		}

		.khLee-datePanel-body1 .x-window .x-layer .x-window-default {
			height: 25px !important;
		}

		.khLee-datePanel-body1 .x-css-shadow {
			height: 21px !important;
		}

		.khLee-tab-active .x-tab-active {
			background-color: #004a93 !important;
			
			width: 135px;
			height: 35px;
		}

		.x-tab-bar-strip-default {
			background-color: transparent;
		}

		.x-tab.x-tab-active.x-tab-default {
			border: none;
		}

		.x-tab.x-tab-active.x-tab-default .x-tab-inner-default{
			color: #ffffff !important;
			font-size: 14px;
		}
		.x-tab-over{
			background: #fff !important;
		}

		.x-tab.x-tab-default .x-tab-inner-default{
			color: #808080 !important;
			font-size: 14px;
		}

		.khLee-tab-unselectable .x-tab-top {
			background: #ffffff;
			width: 135px;
			height: 35px;
			border: 1px solid #d7d7d7;
		}

		.khLee-tab .x-tab {
			margin-right: 2px;

		}

		.khLee-checkboxgroup-body .x-form-checkboxgroup-body table {
			border-top: 2px solid #2b343d;
		}

		/*20151208-위치찾기*/

		table.dj_result {
			width: 100%;
			border-bottom: 1px dashed #d5d5d5;
		}

		table.dj_result>tbody>tr>th {
			width: 25px;
		}

		table.dj_result>tbody>tr>td {
			font-size: 12px;
			color: #555;
			text-indent: 5px;
		}

		table.dj_result>tbody>tr>td span {
			font-size: 12px;
			color: #0066FF;
			text-indent: 5px;
			text-decoration: underline;
		}

		/* table.dj_result> tbody> tr> td span { font-weight: bold; color: #000; } */

		.dj_result_info {
			width: 290px;
			margin-top: 10px;
			margin-left: 11px;
		}

		.dj_reach_list_title {
			color: #555;
		}

		.dj_reach_list_title span {
			font-weight: bold;
			color: #0b4a7f;
			padding-left: 5px;
		}

		.dj_accordion .x-accordion-item .x-accordion-hd {
			background-color: #eef5fb;
			border-top: 1px solid #bfd6e4;
			border-bottom: 1px solid #bfd6e4;
			color: #000;

		}

		.x-panel-body .x-accordion-body {
			overflow: hidden !important;
		}


		.dj_layer_nm .x-title-text {
			color: #000;
		}


		/* 시작위치 */

		.dj_stextfield .x-form-trigger-wrap-default {
			border: 2px solid #f5bf32;
		}

		/* 끝위치 */

		.dj_etextfield .x-form-trigger-wrap-default {
			border: 2px solid #3eaf0e;
		}

		#reach_close {
			top: 0px !important;
			cursor: pointer;
		}

		.dj_toolbarConf {
			border-style: none !important;
			box-shadow: 0px 0px 0px #777;
			width: 99px !important;
			height: 27px !important;
			background: url('./resources/images/popup/confBoxBg.png') !important;
			position: absolute;
		}

		dj_toolbarConf_1 {
			height: 52px !important;
		}

		.dj_spottextfield2 .x-form-item {
			top: 3px !important;
		}

		.dj_spottextfield2 .x-form-text-default {
			padding: 2px 0px 1px 0px;
			min-height: 16px;
			text-align: center;
			font-size: 12px;

		}

		#searchConfig_header {
			border-width: 2px !important;
		}


		.dj-mask-withimg .x-mask-msg-text {
			padding: 21px 0 0 !important;
			background-image: url(./resources/images/button/loading.gif) !important;
			background-repeat: no-repeat !important;
			background-position: center 0 !important;
		}

		.dj-mask-noneimg .x-mask-msg-text {
			padding: 0 0 0 !important;
			background-image: none !important;
			background-repeat: no-repeat !important;
			background-position: center 0 !important;
		}

		.dj-searchAreaList #searchAreaList-body {
			/*height: 630px !important;*/
			overflow: overlay !important;
		}

		.x-grid-item-alt {
			background-color: white !important;
		}

		.x-grid-item-selected {
			background-color: white !important;
		}

		.pdj_subTotal {
			background-color: #feb24c !important;
		}

		.pdj_total {
			font: bold 13px/15px helvetica, arial, verdana, sans-serif !important;
		}

		.pdj_total_subTotal {
			background-color: #feb24c !important;
			font: bold 13px/15px helvetica, arial, verdana, sans-serif !important;
		}

		.icon_app {
			background-image: url(./resources/images/button/btn_app.gif) !important;
		}

		.icon_point {
			width: 7px !important;
			height: 11px !important;
			background: url(./resources/images/button/guide01.png) left 4px no-repeat;
		}

		.icon_line {
			width: 10px !important;
			height: 9px !important;
			background: url(./resources/images/button/guide02.png) left 7px no-repeat;
		}

		.pdj_kradText {
			font-size: 12px;
			letter-spacing: -1px;
		}

		.subWindow-x-form-item-label-default {
			border-color: #405166 !important;
			background-color: #405166 !important;
			font-size: 16px !important;
			font-weight: bold !important;
		}

		.metaWindow-x-form-item-label-default {
			padding: 10px;
			border-color: #405166 !important;
			font-size: 16px !important;
			font-weight: bold !important;
		}

		#threeDim-win_header {
			border: none !important;
			background: url('./resources/images/button/top_bg.jpg')
		}

		#threeDim-win {
			border-color: #c6dffd !important;
		}

		.krf-os-parentwin-header {
			border: none !important;
			background: url('./resources/images/button/top_bg.jpg')
		}

		#map-win,
		#report-win,
		#status-win,
		#admin-win,
		#threeDim-win,
		#login-win {
			border-color: #c6dffd !important;
		}

		#subMapWindow {
			border-color: #043264 !important;
		}

		.x-tool-maximize {
			background: url('./resources/images/button/header-maximize.png');
			width: 23px;
			height: 15px;
		}

		.x-tool-restore {
			background: url('./resources/images/button/header-restore.png');
			width: 23px;
			height: 15px;
		}

		.x-tool-minimize {
			background: url('./resources/images/button/header-minimize.png');
			width: 23px;
			height: 15px;
		}

		.x-tool-close {
			background: url('./resources/images/button/header-close.png');
			width: 23px;
			height: 15px;
		}

		.krf_desktop-start-button-icon {
			background-image: url(./resources/images/button/start.png) !important;
			background-color: #000000 !important;
			border-color: #000000 !important;
			top: 4px !important;
		}

		.krf_taskbar-ux-taskbar {
			background-color: #000000 !important;
			padding: 0px 0px 0px 0px !important;
		}

		.x-window-header-default .x-tool-img {
			background-color: transparent !important;
		}

		.cmbBlit {
			position: relative;
			top: -4px;
		}

		.krf-os-krf-icon {
			background-image: url(./resources/images/button/icon_1.png);
		}

		.krf-os-status-icon {
			background-image: url(./resources/images/button/icon_2.png);
		}

		.krf-os-report-icon {
			background-image: url(./resources/images/button/icon_3.png);
		}

		.krf-os-threedim-icon {
			background-image: url(./resources/images/button/icon_4.png);
		}

		.krf-os-admin-icon {
			background-image: url(./resources/images/button/icon_7.png);
		}

		.krf-os-win-title-krf-icon {
			background-image: url(./resources/images/button/tit1.png) !important;
			width: 113px !important;
			height: 20px !important;
		}

		.krf-os-win-title-status-icon {
			background-image: url(./resources/images/button/tit2.png) !important;
			width: 64px !important;
			height: 20px !important;
		}

		.krf-os-win-title-report-icon {
			background-image: url(./resources/images/button/tit3.png) !important;
			width: 62px !important;
			height: 20px !important;
		}

		.krf-os-win-title-threedim-icon {
			background-image: url(./resources/images/button/tit4.png) !important;
			width: 70px !important;
			height: 20px !important;
		}

		.krf-os-win-title-admin-icon {
			background-image: url(./resources/images/button/tit7.png) !important;
			width: 50px !important;
			height: 20px !important;
		}

		.gradient {
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #3a3f4f), color-stop(1, #22262f));
			background: -moz-linear-gradient(top, #3a3f4f 0%, #22262f 100%);
			background: -webkit-linear-gradient(top, #3a3f4f 0%, #22262f 100%);
			background: -o-linear-gradient(top, #3a3f4f 0%, #22262f 100%);
			background: -ms-linear-gradient(top, #3a3f4f 0%, #22262f 100%);
			background: linear-gradient(top, #3a3f4f 0%, #22262f 100%);
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#3a3f4f', endColorstr='#22262f', gradientType=0);
			border-radius: 5px;
		}

		.krf-os-startmenu-text {
			color: #fff !important;
		}

		.krf-os-startmenu-item {
			padding: 8px 20px;
			margin: 5px;
		}

		.krf-os-startmenu-krf-icon {
			background: url(./resources/images/button/icon_1s.png) no-repeat;
			width: 32px;
			height: 32px;
		}

		.krf-os-startmenu-status-icon {
			background: url(./resources/images/button/icon_2s.png) no-repeat;
			width: 32px;
			height: 32px;
		}

		.krf-os-startmenu-report-icon {
			background: url(./resources/images/button/icon_3s.png) no-repeat;
			width: 32px;
			height: 32px;
		}

		.krf-os-startmenu-threedim-icon {
			background: url(./resources/images/button/icon_4s.png) no-repeat;
			width: 32px;
			height: 32px;
		}

		.krf-os-startmenu-admin-icon {
			background: url(./resources/images/button/icon_7s.png) no-repeat;
			width: 32px;
			height: 32px;
		}

		.krf-os-reachname-close {
			background-image: url(./resources/images/button/btn_close2.png) !important;
			height: 28px;
		}

		.patient-source {
			cursor: pointer;
			outline: none !important;
		}

		.patient-view table {
			border-collapse: separate;
			border-spacing: 2px;
			height: 50px;

		}

		.patient-view td {
			font-family: verdana, arial, sans-serif;
			font-size: 12px;
		}

		td.patient-label {
			background-color: #ddd;
			border: 1px solid #bbb;
			font-weight: bold;
			text-align: right;
			width: 100px;
			padding: 0px 3px 0px 0px;
		}

		.patient-over {
			cursor: pointer;
		}

		.patient-selected {
			background-color: #DFE8F6;
			cursor: pointer;
		}

		.report,
		.report>li {
			list-style: none;
			margin: 0px;
			padding: 0px;
		}

		.report>li:after {
			content: "";
			display: block;
			clear: both;
		}

		.report {
			padding: 10px;
		}

		.report li {
			margin-bottom: 10px;
		}

		.report .tit {
			background: url(./resources/images/rpt/report_blit.png) no-repeat right center;
			padding-right: 15px;
			margin-right: 10px;
			font-weight: bold;
			float: left;
		}

		.report .name {
			color: #032d67 !important;
			font-weight: bold !important;
		}

		.report .cont {
			float: left;
			width: 88%;
		}

		.ux-desktop-shortcut-text{
			font-size: 12px;
		}

		.metaDataBtn{
			margin-left:5px; 
			top:5px; 
			position:absolute;
			cursor: pointer;
		}

		.metaDataTbl01, .metaDataTbl02{
			border-collapse: separate;
			border-spacing:0;
			border:0 none;
			border-top: 2px solid #2f4054;
		}

		.metaDataTbl01 td, .metaDataTbl02 td{
			background: #ffffff;
			padding: 10px;
			text-align: left;
			border-right: 1px solid #cccccc;
			border-bottom: 1px solid #cccccc;
		}
		
		.metaDataTbl01 td:last-child, .metaDataTbl02 td:last-child{
			border-right: none;
		}

		.metaDataTbl01 th, .metaDataTbl02 th{
			background: #f8f8f8;
			padding: 10px;
			text-align: left;
			border-right: 1px solid #cccccc;
			border-bottom: 1px solid #cccccc;
		}
		.metaDataTbl01 th:last-child, .metaDataTbl02 th:last-child{
			border-right: none;
		}

		.metaDataTbl02 th{
			width: 105px;
		}

		.dijitPopup {
			z-index: 99999 !important;
		}
	</style>
	
	<%
		String stationType = request.getParameter("stationType");
		String station = request.getParameter("station");
		String p1 = request.getParameter("p1");
	%>

	<script>
		var _ParamObj = {
			stationType : '<%=stationType%>',
			station : '<%=station%>',
			p1 : '<%=p1%>'
		};
	</script>
</head>

<body class="drone-toolbar drone-combolist">
	<div style="width:100%; height:100%;" id="pageloaddingDiv">
		<div style="margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
			<img src="./resources/images/loading_2.gif">
		</div>
	</div>
	<iframe id="rptHidden" width="0px" height="0px" style="border:none;"></iframe>
</body>

<!-- <script type="text/javascript" src="http://js.arcgis.com/3.23/"></script> -->
<script defer type="text/javascript" src="http://js.arcgis.com/3.15/"></script>

<script defer type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script defer id="microloader" type="text/javascript" src="bootstrap.js"></script>

<!-- 	<script type="text/javascript" src="./resources/include-ext.js"></script> -->

<!-- 공통 스크립트 -->
<script defer type="text/javascript" src="./resources/js/common.js"></script>
<!-- 주제도 관련 공통 스크립트 -->
<script defer type="text/javascript" src="./resources/js/commonTM.js"></script>

<!-- KRAD 관련 공통 스크립트 -->
<script defer type="text/javascript" src="./resources/js/commonKRAD.js"></script>

</html>
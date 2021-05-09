<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html manifest="">
<head>
    <meta charset="UTF-8">
    <title>Praxis</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/ext-6.5.3/packages/theme-gray/resources/theme-gray-all.css" />">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/ext-6.5.3/packages/charts/classic/classic/resources/charts-all.css" />">

    <link href="<c:url value="/resources/css/inicio.css" />" rel="stylesheet" />
    <link href="<c:url value="/resources/css/extjs.css" />" rel="stylesheet" />

    <link href="<c:url value="/resources/css/Master.css" />" rel="stylesheet" />
    <link href="<c:url value="/resources/css/iconos.css" />" rel="stylesheet" />
    <link href="<c:url value="/resources/js/SimpleViewer/css/jquery.verySimpleImageViewer.css" />" rel="stylesheet" />
    <link href="<c:url value="/resources/js/praxis.ui-1.0/css/praxis.ui-1.0.css" />" rel="stylesheet" />
    <!--[if IE 8]> <link href="<c:url value="/resources/js/praxis.ui-1.0/css/praxis.ui-1.0-ie8.css" />" rel="stylesheet" type="text/css"> <![endif]-->
    <link href="<c:url value="/resources/css/fontawesome/css/all.min.css" />" rel="stylesheet" />
    <link href="<c:url value="/resources/css/mt-calendar.css" />" rel="stylesheet" />

    <!--link href="<c:url value="/resources/fonts/css/font-awesome.css" />" rel="stylesheet" /-->
    <link href="<c:url value="/resources/css/mt-calendar.css" />" rel="stylesheet" />
    <link href="<c:url value="/resources/img/sprites/images.sprite.css" />" rel="stylesheet" />
    <link rel="Shortcut Icon" href="<c:url value="/resources/img/login/favicon_2.png" />"  />

    <script type="text/javascript">
        var Ext = Ext || {};
        var CONTEXTPATH = '<%=request.getContextPath()%>';
        var gloServerDate = '${vp_serverDate}';
        var gloServerTime = '${vp_serverTime}';
        
        var gloUsr = '', isDashboard = false, extLoaded = false;
        var lg  = function(s){ console.log(s); };
        var clr = function(){ console.clear(); };
        var me;

        Ext.beforeLoad = function(tags){
            Ext.manifest = 'classic';
        }

    </script>

    <script type="text/javascript" src="<c:url value="/resources/js/ext-6.5.3/ext-all.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/ext-6.5.3/packages/charts/classic/charts.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/ext-6.5.3/packages/locale/locale-en.js" />"></script>
    <!? [if lt IE 11]>
    <script type="text/javascript" src="<c:url value="/resources/js/praxis.ui-1.0/praxis.utils-1.0.js" />" />"></script>
    <![endif]?>
    <script src="<c:url value="/resources/js/jquery.min.1.11.2.js" />"></script>
    <script src="<c:url value="/resources/js/SimpleViewer/js/jquery.verySimpleImageViewer.min.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/global.js" />"></script>

    <script type="text/javascript">       
            
        Ext.Loader.setConfig({
            enabled: true,
            paths: {
                'Ext.Praxis': CONTEXTPATH + '/apps/praxis/app',
                'Ext.ux': CONTEXTPATH + '/resources/js/ext-6.5.3/ux',
                'Ext.global': CONTEXTPATH + '/resources/js/global',
                'Ext.ux.window': CONTEXTPATH + '/resources/js/global'
            }
        });

        Ext.require([
            '*',
            'Ext.global.ControlData',
            'Ext.global.Paginator',
            'Ext.global.MtCalendar',
            'Ext.ux.window.Notification',
            'Ext.global.BrowserTicket'
        ]);

        Ext.tip.QuickTipManager.init();
        Ext.Ajax.timeout = 18000000;
    </script>

    <script type="text/javascript" src="<c:url value="/resources/js/rainbow/rainbow-custom.min.js" />"></script>
    <script type="text/javascript" src="<c:url value="/apps/praxis/app.js" />"></script>
</head>
<body>

</body>
</html>
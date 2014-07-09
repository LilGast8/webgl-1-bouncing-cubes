<!DOCTYPE html>
<?php include_once('init.php'); ?>
<html lang="fr">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
	
	<title>R&amp;D - Gaston Bouchayer</title>
	<meta name="description" content="R&amp;D - Gaston Bouchayer" />
	<meta name="keywords" content="" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Gaston Bouchayer" />
	<meta name="designer" content="Gaston Bouchayer" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="shortcut icon" href="<?php echo WEB_ROOT; ?>img/logos/favicons/favicon.ico" />
	
	<link media="screen" rel="stylesheet" type="text/css" href="<?php echo WEB_ROOT; ?>assets/css/styles.min.css" />
	
	<!--[if lt IE 9]><script src="<?php echo WEB_ROOT; ?>js/lib/html5shiv.js"></script><![endif]-->
	<?php if(!PROD) { ?>
	<script src="<?php echo WEB_ROOT; ?>src/js/lib/modernizr.min.js"></script>
	<script src="<?php echo WEB_ROOT; ?>src/js/lib/detectizr-2.0.0.min.js"></script>
	<?php } else { ?>
	<script src="<?php echo WEB_ROOT; ?>assets/js/lib/modern-detect-izr.min.js"></script>
	<?php } ?>
</head>


<!--[if lt IE 7]> <body class="ie6 lt-ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 7]> <body class="ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 8]> <body class="ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]> <body class="ie9 lt-ie10"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <body> <!--<![endif]-->



<!-- Main container -->
<div id="main-container" class="preload">
	
	<!-- Loader -->
	<div id="loader">
		
	</div>
	
	<!-- Page container -->
	<div id="page-container">
		
		<section id="page-content" class="index">
			
			<div id="scene-container"></div>
			
		</section>
		
	</div>
	
</div>



<!-- Scripts -->
<script>
	var LOCALHOST = '<?php echo LOCALHOST; ?>';
	var PROD  = '<?php echo PROD; ?>';
	var WEB_ROOT = '<?php echo WEB_ROOT; ?>';
</script>
<?php if(!PROD) { ?>

<script src="<?php echo WEB_ROOT; ?>src/js/lib/zepto-1.1.3.min.js"></script>

<script src="<?php echo WEB_ROOT; ?>src/js/lib/greensock/TweenMax.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/preloadjs-0.4.1.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/signals-1.0.0.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/stats.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/three.min.js"></script>

<!-- Init -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/InitApp.js"></script>

<!-- Config -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/config/Config.js"></script>

<!-- Events -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/events/EventDispatcher.class.js"></script>

<!-- Views -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/View.class.js"></script>

<!-- Partials views -->
<!-- <script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/partials/View.Example.js"></script> -->

<!-- Page views -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/pages/View.Index.js"></script>

<!-- Main -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/Main.js"></script>

<?php } else { ?>
<script src="<?php echo WEB_ROOT; ?>assets/js/scripts.min.js"></script>
<?php } ?>


</body>
</html>
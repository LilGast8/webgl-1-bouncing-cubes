<?php



/* -------- Prod -------- */
define('PROD', false);
//define('PROD', true);



/* -------- Localhost -------- */
$localhost = strpos($_SERVER['HTTP_HOST'], 'localhost') !== false ? true : false;
define('LOCALHOST', $localhost);



/* -------- Assets -------- */
$assets = PROD ? 'assets/' : 'src/';
define('ASSETS', $assets);



/* -------- Roots -------- */
define('SITE_URL', 'http://www.SITE_URL.COM');
define('SITE_ROOT', realpath(dirname(__FILE__)).'/');
//define('WEB_ROOT', substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], substr($_SERVER['SCRIPT_FILENAME'], strlen(SITE_ROOT)))));
$web_root = LOCALHOST ? './' : SITE_URL.'/';
define('WEB_ROOT', $web_root);



/* -------- Erreur -------- */
if(LOCALHOST) error_reporting(E_ALL);



?>
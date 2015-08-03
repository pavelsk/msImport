<?php
ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

/** @noinspection PhpIncludeInspection */
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
}
else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var msImport $msImport */
$msImport = $modx->getService('msimport', 'msImport', $modx->getOption('msimport_core_path', null, $modx->getOption('core_path') . 'components/msimport/') . 'model/msimport/');
$modx->lexicon->load('msimport:default');

// handle request
$corePath = $modx->getOption('msimport_core_path', null, $modx->getOption('core_path') . 'components/msimport/');
$path = $modx->getOption('processorsPath', $msImport->config, $corePath . 'processors/');
$modx->request->handleRequest(array(
	'processors_path' => $path,
	'location' => '',
));
<?php

/**
 * Class msImportMainController
 */
abstract class msImportMainController extends modExtraManagerController {
	/** @var msImport $msImport */
	public $msImport;


	/**
	 * @return void
	 */
	public function initialize() {
		$corePath = $this->modx->getOption('msimport_core_path', null, $this->modx->getOption('core_path') . 'components/msimport/');
		require_once $corePath . 'model/msimport/msimport.class.php';

		$this->msImport = new msImport($this->modx);
		$this->addCss($this->msImport->config['cssUrl'] . 'mgr/main.css');
		$this->addJavascript($this->msImport->config['jsUrl'] . 'mgr/msimport.js');
		$this->addHtml('
		<script type="text/javascript">
			msImport.config = ' . $this->modx->toJSON($this->msImport->config) . ';
			msImport.config.connector_url = "' . $this->msImport->config['connectorUrl'] . '";
		</script>
		');

		parent::initialize();
	}


	/**
	 * @return array
	 */
	public function getLanguageTopics() {
		return array('msimport:default');
	}


	/**
	 * @return bool
	 */
	public function checkPermissions() {
		return true;
	}
}


/**
 * Class IndexManagerController
 */
class IndexManagerController extends msImportMainController {

	/**
	 * @return string
	 */
	public static function getDefaultController() {
		return 'home';
	}
}
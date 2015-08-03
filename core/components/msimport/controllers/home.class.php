<?php

/**
 * The home manager controller for msImport.
 *
 */
class msImportHomeManagerController extends msImportMainController {
	/* @var msImport $msImport */
	public $msImport;


	/**
	 * @param array $scriptProperties
	 */
	public function process(array $scriptProperties = array()) {
	}


	/**
	 * @return null|string
	 */
	public function getPageTitle() {
		return $this->modx->lexicon('msimport');
	}


	/**
	 * @return void
	 */
	public function loadCustomCssJs() {
        $mgrUrl = $this->modx->getOption('manager_url',null,MODX_MANAGER_URL);
        $this->addJavascript($mgrUrl.'assets/modext/widgets/element/modx.panel.tv.renders.js');

		$this->addCss($this->msImport->config['cssUrl'] . 'mgr/main.css');
		$this->addCss($this->msImport->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
		$this->addJavascript($this->msImport->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->msImport->config['jsUrl'] . 'mgr/misc/ms.combo.js');
		$this->addJavascript($this->msImport->config['jsUrl'] . 'mgr/widgets/home.panel.js');
		$this->addJavascript($this->msImport->config['jsUrl'] . 'mgr/sections/home.js');
		$this->addHtml('<script type="text/javascript">
		Ext.onReady(function() {
			MODx.load({ xtype: "msimport-page-home"});
		});
		</script>');
	}


	/**
	 * @return string
	 */
	public function getTemplateFile() {
		return $this->msImport->config['templatesPath'] . 'home.tpl';
	}
}
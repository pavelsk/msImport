<?php

/**
 * Create an Item
 */
class msImportItemCreateProcessor extends modObjectCreateProcessor {
	public $objectType = 'msImportItem';
	public $classKey = 'msImportItem';
	public $languageTopics = array('msimport');
	//public $permission = 'create';


	/**
	 * @return bool
	 */
	public function beforeSet() {
		$name = trim($this->getProperty('name'));
		if (empty($name)) {
			$this->modx->error->addField('name', $this->modx->lexicon('msimport_item_err_name'));
		}
		elseif ($this->modx->getCount($this->classKey, array('name' => $name))) {
			$this->modx->error->addField('name', $this->modx->lexicon('msimport_item_err_ae'));
		}

		return parent::beforeSet();
	}

}

return 'msImportItemCreateProcessor';
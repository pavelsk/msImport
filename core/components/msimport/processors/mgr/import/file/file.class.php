<?php

class msImportFileStructureProcessor extends modProcessor
{

    /**
     * Run the processor and return the result. Override this in your derivative class to provide custom functionality.
     * Used here for pre-2.2-style processors.
     *
     * @return mixed
     */
    public function process()
    {
        unset($_SESSION['msImport']);

        $source = $this->getProperty('tvbrowsersource', '');
        $delimeter = $this->getProperty('delimeter', '');
        $hasHead = $this->getProperty('has_head', 0);

        if (!$source) {
            $this->modx->error->addField('tvbrowsersource', 'Нужно указать файл');
        }

        if (!$delimeter) {
            $this->modx->error->addField('delimeter', 'Нужно указать разделитель полей');
        }

        if($hasHead){
            $hasHead = 1;
        }

        if ($this->hasErrors()) {
            return $this->failure();
        } else {

            $_SESSION['msImport'] = compact('source', 'delimeter', 'hasHead');

            return $this->success();
        }
    }
}

return 'msImportFileStructureProcessor';
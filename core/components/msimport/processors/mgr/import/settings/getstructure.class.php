<?php

class msImportGetFileExample extends modProcessor
{

    /**
     * Run the processor and return the result. Override this in your derivative class to provide custom functionality.
     * Used here for pre-2.2-style processors.
     *
     * @return mixed
     */
    public function process()
    {

        if (!isset($_SESSION['msImport']['source'])) {
            return $this->failure('Файл для примера не найден');
        }

        /** @var FileReader $handler */
        $handler = msImport::getFileHandler($_SESSION['msImport']['source']);
        if ($handler == null) {
            return $this->failure('Данный файл не поддерживается');
        }

        $examples = $handler->getExamples($_SESSION['msImport']['hasHead']);

        $columns = array();
        $fields = array();
        $data = array();

        foreach ($examples as $k => $example) {

            if ($k == 0) {
                foreach ($example as $key => $field) {
                    $i = $key + 1;

                    $h = ($_SESSION['msImport']['hasHead']==1) ? $field : 'Поле #' . $i;

                    $columns[] = array(
                        'header' => $h,
                        'dataIndex' => 'field_' . $key
                    );

                    $fields[] = array(
                        'name' => 'field_' . $key
                    );
                }
            }

            $data[] = $example;
        }

        return $this->modx->toJSON(array(
            'success' => true,
            'data' => array(
                'fields' => $fields,
                'data' => $data,
                'columns' => $columns
            )
        ));

    }
}

return 'msImportGetFileExample';
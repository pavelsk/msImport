<?php

class msImportGetProductFields extends modProcessor
{
    /** @var  miniShop2 $ms2 */
    protected $ms2;

    public function process()
    {
        $this->ms2 = $this->modx->getService('miniShop2');

        $data = array();

        $mainFields = explode(",",$this->modx->getOption('ms2_product_main_fields'));
        $additionalFields = explode(",",$this->modx->getOption('ms2_product_extra_fields'));

        foreach($mainFields as $column){
            $data[] = array(
                'name' => $column,
                'title' => $this->modx->lexicon('ms2_product_'.$column)
            );
        }
        foreach($additionalFields as $column){
            $data[] = array(
                'name' => $column,
                'title' => $this->modx->lexicon('ms2_product_'.$column)
            );
        }

        return $this->outputArray($data);
    }

    public function getLanguageTopics()
    {
        return array('minishop2:product');
    }

}

return 'msImportGetProductFields';
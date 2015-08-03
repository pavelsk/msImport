<?php

/**
 * The base class for msImport.
 */
class msImport
{
    /* @var modX $modx */
    public $modx;


    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config = array())
    {
        $this->modx =& $modx;

        $corePath = $this->modx->getOption('msimport_core_path', $config, $this->modx->getOption('core_path') . 'components/msimport/');
        $assetsUrl = $this->modx->getOption('msimport_assets_url', $config, $this->modx->getOption('assets_url') . 'components/msimport/');
        $connectorUrl = $assetsUrl . 'connector.php';

        $this->config = array_merge(array(
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/',
            'imagesUrl' => $assetsUrl . 'images/',
            'connectorUrl' => $connectorUrl,

            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'chunksPath' => $corePath . 'elements/chunks/',
            'templatesPath' => $corePath . 'elements/templates/',
            'chunkSuffix' => '.chunk.tpl',
            'snippetsPath' => $corePath . 'elements/snippets/',
            'processorsPath' => $corePath . 'processors/'
        ), $config);

        $this->modx->addPackage('msimport', $this->config['modelPath']);
        $this->modx->lexicon->load('msimport:default');
    }

    public static function  getFileHandler($file)
    {
        include_once dirname(__FILE__) . '/lib/FileReader.php';

        $fileInfo = new SplFileInfo($file);
        $ext = $fileInfo->getExtension();
        $readerClass = strtoupper($ext) . 'Reader';
        $fileClass = dirname(__FILE__) . '/lib/' . $ext . '/' . $readerClass . '.php';
        if (!file_exists($fileClass)) {
            return null;
        }


        include_once $fileClass;
        $resultClass = new $readerClass($file);
        if (!$resultClass instanceof FileReader) {
            return null;
        }

        return $resultClass;

    }

}
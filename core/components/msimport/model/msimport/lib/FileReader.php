<?php

abstract class FileReader
{

    protected $file;

    function __construct($file)
    {
        $this->file = $file;
    }

    public abstract function getExamples($headHead = false);
}
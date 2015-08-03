<?php

class CSVReader extends FileReader
{

    public function getExamples($headHead = false)
    {
        $result = array();
        if (($handle = fopen(MODX_BASE_PATH . $this->file, "r")) !== false) {
            $i = 0;
            $limit = $_SESSION['msImport']['hasHead'] ? 3 : 2;
            while (($data = fgetcsv($handle, 1000, $_SESSION['msImport']['delimeter'])) !== false) {
                $result[] = $data;
                $i++;

                if ($i >= $limit) {
                    break;
                }
            }
            fclose($handle);
        }
        return $result;
    }
}
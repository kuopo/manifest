<?php 
    header("Access-Control-Allow-Origin: *");

    $qs = $_SERVER['QUERY_STRING']; 
    $qs = explode("&", $qs);
    
    $kvsCounter = count($qs);
    $kvs = array();
    
    foreach ($qs as $value)
    {
        #echo "Value: $value<br />\n";
        $value = explode("=", $value);
        $kvs[$value[0]] =$value[1];
    }
    $keyA = 'keyA';
    $keyB = 'keyB';
    $keyC = 'keyC';
    
    $retText = <<<EOT
CACHE MANIFEST
    http://Manifest2.kuopo.twbbs.org/testPage1.html?keyA=$kvs[$keyA]&keyB=$kvs[$keyB]
    http://Manifest2.kuopo.twbbs.org/testPage2.html?keyC=$kvs[$keyC]
    http://Manifest2.kuopo.twbbs.org/jsfunc.js
NETWORK: 
*

FALLBACK:
EOT;

    echo $retText;
?>
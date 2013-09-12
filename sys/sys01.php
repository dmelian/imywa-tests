<?php

$doc= new DOMDocument();
$doc->loadHTML('<div id="buttonbar">Mi sección</div>');
print_r($doc);
echo $doc->saveXML();


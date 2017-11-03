<?php

function replaceBraces($html) {
    $html = str_replace('<', '&lt;', $html);
    $html = str_replace('>', '&gt;', $html);
    return $html;
}

 ?>
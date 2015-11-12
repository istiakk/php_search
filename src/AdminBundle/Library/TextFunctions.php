<?php

namespace AdminBundle\Library;

class TextFunctions
{
    public static function mb_truncate($str, $maxLength = 40) {
        $strlen = mb_strlen($str, $encoding = 'UTF-8');
        $res = $str;
        if($strlen > $maxLength) {
            $res = mb_substr($str, 0, $maxLength - 3, $encoding = 'UTF-8') . '...';
        }

        return $res;
    }
    
    // User friendly selective url encoding of strings for api requests etc.
    public static function url_encode_selective($str) {
        $return = '';
        $illegalChars = array(
            '{' => true,
            '}' => true
        );
        $len = mb_strlen($str, $encoding = 'UTF-8');
        for($i = 0; $i < $len; $i++) {
            $char = $str[$i];
            if(isset($illegalChars[$char])) {
                $char = urlencode($char);
            }
            $return .= $char;
        }
        return $return;
    }
}
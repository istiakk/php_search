<?php

namespace AdminBundle\Library;

class ArrayFunctions
{
    public static function array_diff_key_recursive(array $arr1, array $arr2) {
        $diff = array_diff_key($arr1, $arr2);
        $intersect = array_intersect_key($arr1, $arr2);

        foreach ($intersect as $k => $v) {
            if (is_array($arr1[$k]) && is_array($arr2[$k])) {
                $d = self::array_diff_key_recursive($arr1[$k], $arr2[$k]);

                if ($d) {
                    $diff[$k] = $d;
                }
            }
        }

        return $diff;
    }
    
    public static function deep_search(array $haystack, array $keys, $value) {
        $tmp = $haystack;
        foreach($keys as $key) {
            if (isset($tmp[$key]))
                $tmp = $tmp[$key];
            else
                return false;
        }
        return ($tmp == $value);
    }
    
    public static function array2csv(array &$csvHeaders, array &$arr)
    {
        if (count($arr) == 0 && count($csvHeaders) == 0) {
            return null;
        }
        ob_start();
        $df = fopen("php://output", 'w');
        reset($arr);
        fputcsv($df, $csvHeaders, ';');
        if(count($arr) > 1) {
            foreach ($arr as $row) {
                if(is_array($row))
                    fputcsv($df, $row, ';');
            }
        }
        fclose($df);
        return ob_get_clean();
    }
    
    // Function that adds numbers from two multidimensional arrays (structure needs to be corresponding - either nothing or array)
    public static function array_add_fill_recursive(array $arr1, array $arr2) {
        $ret = array();
        if(count($arr2) > count($arr1)) {
            return self::array_add_fill_recursive($arr2, $arr1);
        }
        foreach($arr1 as $k => $v) {
            if(isset($arr2[$k])) {
                if (is_array($arr1[$k]) && is_array($arr2[$k])) {
                    $arr1[$k] = self::array_add_fill_recursive($arr1[$k], $arr2[$k]);
                } elseif (is_int($v)) {
                    $arr1[$k] = $v + $arr2[$k];
                }
            }
        }
        return $arr1;
    }
    
    public static function first($array) {
        if (!is_array($array)) return $array;
        if (!count($array)) return null;
        reset($array);
        return $array[key($array)];
    }

    public static function last($array) {
        if (!is_array($array)) return $array;
        if (!count($array)) return null;
        end($array);
        return $array[key($array)];
    } 
}
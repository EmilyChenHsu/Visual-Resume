<?php
  function set_tagID($tag)
  {
    $unwanted[0] = '/\+/';
    $unwanted[1] = '/\#/';
    $unwanted[2] = '/\./';
    
    $replacements[0] = '1plus1';
    $replacements[1] = '1sharp1';
    $replacements[2] = '1dot1';
    
    $tag = preg_replace($unwanted,$replacements,$tag);
    
    return $tag;
  }
?>
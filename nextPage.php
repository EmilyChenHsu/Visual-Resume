<?php

    function nextPage($header)
    {
        $parsed = http_parse_headers($header);
        $symbols = array("<",">");
        $output = str_replace($symbols, "", $parsed['Link']);
		$array = explode(" ", $output);
		$next = $array[0];
		$rel = $array[1];
		$output = substr($next, 0, -1);
		
		if($output == "" || $found = strstr($rel,'first'))
		{
			return null;
		}
        return $output;
    }

	// From anonymous comment: http://php.net/manual/en/function.http-parse-headers.php
	function http_parse_headers( $headerPARAM )
	{
		$retVal = array();
		$fields = explode("\r\n", preg_replace('/\x0D\x0A[\x09\x20]+/', ' ', $headerPARAM));
		foreach( $fields as $field ) {
			if( preg_match('/([^:]+): (.+)/m', $field, $match) ) {
				$match[1] = preg_replace('/(?<=^|[\x09\x20\x2D])./e', 'strtoupper("\0")', strtolower(trim($match[1])));
				if( isset($retVal[$match[1]]) ) {
					$retVal[$match[1]] = array($retVal[$match[1]], $match[2]);
				} else {
					$retVal[$match[1]] = trim($match[2]);
				}
			}
		}
		return $retVal;
	}
	// end
?>
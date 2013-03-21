<?php
	require('nextPage.php');
	
    function gh_curl($url, $credentials, $page = null, $perPage = null)
    {
		$headers = array(
			"Authorization: Basic " . base64_encode($credentials)
		);
		
		if(func_num_args() != 2 && func_num_args() != 4)
		{
			echo '<p>Incorrect number of arguments passed to gh_curl()...</p>';
			return null;
		}
		else if($page == null && $perPage == null)
        {
			$paging = '?page=1&per_page100';
			$url = $url . $paging;

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			curl_setopt($ch, CURLOPT_VERBOSE, true);
			curl_setopt($ch, CURLOPT_HEADER, true);
			
			$response = curl_exec($ch);
			$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
			$header = substr($response, 0, $header_size);
			$body = substr($response, $header_size);
			curl_close($ch);
			
			$count = 0;
			$tempURL = nextPage($header);
			while($tempURL != null && $count < 11)
			{
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $tempURL);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
				curl_setopt($ch, CURLOPT_VERBOSE, true);
				curl_setopt($ch, CURLOPT_HEADER, true);
				
				$response = curl_exec($ch);
				$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
				$tempHeader = substr($response, 0, $header_size);
				$tempBody = substr($response, $header_size);
				
				curl_close($ch);
				$tempURL = nextPage($tempHeader);
				$body = substr($body, 0, -1) . ',' . substr($tempBody, 1);
				$count++;
			}
			
			return $body;
		}
		else if($page == null)
		{
			$paging = '?page=1&per_page' . $perPage;
		}
		else if($perPage == null)
		{
			$paging = '?page=' . $page . '&per_page=100';
		}
		else
		{
			$paging = '?page=' . $page . '&per_page=' . $perPage;
		}
		
        $url = $url . $paging;
	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_VERBOSE, true);
		
		$response = curl_exec($ch);
		curl_close($ch);
		
		return $response;
    }

?>
<?php

	class gh_event
	{
		public $type = null;
		public $created_at = null;
		public $commits = null;
	}

	require('gh_curl.php');
	
	$credentials = "muffintheman:servethe1";
	
	// ===== ===== ===== ===== ===== //
	// Save https://api.github.com/users/andrew as JSON //
	// ===== ===== ===== ===== ===== //
	$user = 'andrew';
	
	$myFile = "Data/" . $user . ".json"; 
	if($fh = @fopen($myFile, 'x'))
	{
		$url = "https://api.github.com/users/" . $user;
		$data = gh_curl($url,$credentials);

		fwrite($fh, $data);
		fclose($fh);
		chmod($myFile,0777);
	}
	else
	{
		$data = file_get_contents($myFile);
	}
	
	$data = json_decode($data, true);
	$url = $data['repos_url'];
	$myFile = "Data/" . $user . "_repos.json"; 
	if($fh = @fopen($myFile, 'x'))
	{
		$data = gh_curl($url,$credentials);

		fwrite($fh, $data);
		fclose($fh);
		chmod($myFile,0777);
	}
	else
	{
		$data = file_get_contents($myFile);
	}

	$data = json_decode($data, true);
	$repoData = $data;
	
	$languages = array();
	$tempLanguages = array();
	foreach($data as $repo_key=>&$value)
	{
		if(!array_key_exists('languages',$value))
		{
			$url = $value['languages_url'];
			
			$tempData = gh_curl($url,$credentials,1,100);
			$tempData = json_decode($tempData, true);
			
			foreach($tempData as $language_key=>&$value)
			{
				$languages[$language_key] += $value;
				$tempLanguages[$language_key] += $value;
			}
			$repoData[$repo_key]['languages'] = $tempLanguages;
			$tempLanguages = array();
		}
		else
		{
			array_push($languages,$data[$repo_key]['languages']);
		}
	}
	
	// ===== ===== ===== ===== ===== //
	// Update repos JSON file to include 'languages' //
	// ===== ===== ===== ===== ===== //
	if($fh = @fopen($myFile, 'w'))
	{
		$repoData = json_encode($repoData);
		$repoData = stripslashes($repoData);
		fwrite($fh, $repoData);
		fclose($fh);
		chmod($myFile,0777);
	}
	else
	{
		echo 'ERROR trying to open file ' . $myFile . '!';
	}
	// ===== ===== ===== ===== ===== //
	// END //
	// ===== ===== ===== ===== ===== //
	
	// ===== ===== ===== ===== ===== //
	// Update user JSON file to include 'languages' //
	// ===== ===== ===== ===== ===== //
	$myFile = "Data/" . $user . ".json"; 
	$data = file_get_contents($myFile);
	$data = json_decode($data, true);
	
	if(!array_key_exists('languages',$data))
	{
		$data['languages'] = $languages;
	
		if($fh = fopen($myFile, 'w'))
		{
			$data = json_encode($data);
			$data = stripslashes($data);
			fwrite($fh, $data);
			fclose($fh);
			chmod($myFile,0777);
		}
		else
		{
			echo 'ERROR trying to open file ' . $myFile . '!';
		}
	}
	// ===== ===== ===== ===== ===== //
	// END //
	// ===== ===== ===== ===== ===== //
	
	$myFile = "Data/" . $user . "_events.json"; 
	if($fh = @fopen($myFile, 'x'))
	{
		$url = "https://api.github.com/users/" . $user . '/events';
		$data = gh_curl($url,$credentials);

		$shortData = array();
		$sdata = json_decode($data, true);
		foreach($sdata as &$value)
		{
			if($value['type'] == 'PushEvent' || $value['type'] == 'PullRequestEvent' || $value['type'] == 'CommitCommentEvent' || $value['type'] == 'IssueCommentEvent' || $value['type'] == 'IssuesEvent' || $value['type'] == 'PullRequestReviewCommentEvent')
			{
				$event = new gh_event();
				$event->type = $value['type'];
				$event->created_at = $value['created_at'];
				if($value['type'] == 'PushEvent')
				{
					$event->commits = $value['payload']['size'];
				}
				array_push($shortData, $event);
			}
		}
		
		$shortData = json_encode($shortData);
		
		fwrite($fh, $shortData);
		fclose($fh);
		chmod($myFile,0777);
	}

?>
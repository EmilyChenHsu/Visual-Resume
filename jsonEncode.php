<!DOCTYPE HTML>
<html>
    
    <body>
        
        <?php
            require('set_tagID.php');
            class so_user
            {
                public $displayName = 'Click';
                public $id = null;
                public $avatar = '';
                public $creationDate = '';
                public $reputation = 0;
                public $questionCount = 0;
                public $answerCount = 0;
                public $commentCount = 0;
                public $activity = '';
                public $tags = null;
            }
            
            $user = new so_user();
            
            $server = "cse.unl.edu";
            $username = "stackoverflow";
            $password = "BU}uE@";
            $database = "stackoverflow";
            
            if(isset($_POST['userID']))
            {
                $user_id = $_POST['userID'];
            
                $mysqli = new mysqli($server,$username,$password,$database);
                
                $query = "SELECT * FROM se_users WHERE id=$user_id;";
                if($result = $mysqli->query($query))
                {
                    $row = $result->fetch_assoc();
                
                    $user->displayName = $row["display_name"];
                    $user->id = $row["id"];
                    $user->avatar = $row["email_hash"];
                    $user->creationDate = $row["creation_date"];
                    $user->reputation = $row["reputation"];
                
                }
                
                $myFile = "Data/so_data_" . $user_id . ".json"; 
                if($fh = fopen($myFile, 'x'))
                {
            
                // ============== //
                // BEGIN COMMENTS //
                //=============== //
                $query = "SELECT * FROM se_comments WHERE user_id=$user_id;";
                if($result = $mysqli->query($query))
                {
                    $user->commentCount = $result->num_rows;
                    
                    while($row = $result->fetch_assoc())
                    {
                        $i = substr($row['creation_date'],0,7);
                        
                        $activity[$i]['commentCount']++;
                        
                        // ========== //
                        // BEGIN TAGS //
                        // ========== //
                        $query = "SELECT * FROM se_posts WHERE id='" . $row['post_id'] . "';";
                        if($temp_result = $mysqli->query($query))
                        {
                            $temp_post = $temp_result->fetch_assoc();
                            
                            if($temp_post['post_type_id'] == 1)
                            {
                                // ========== //
                                // BEGIN TAGS //
                                // ========== //
                                if($temp_post['tags'] != null)
                                {
                                    $array = explode('<',$temp_post['tags']);
                                    
                                    foreach($array as $key=>&$value)
                                    {
                                        if($value != '')
                                        {
                                            if(substr($value,-1) == '>')
                                            {
                                                $value = substr($value,0,-1);
                                            }
                                            
                                            $tags[$value]['activity'][$i]['commentCount']++;
                                            $tags[$value]['commentCount']++;
                                            
                                            foreach($array as &$otherTag)
                                            {                                                
                                                if(substr($otherTag,-1) == '>')
                                                {
                                                    $otherTag = substr($otherTag,0,-1);
                                                }
                                                
                                                if($otherTag != $value)
                                                {
                                                    $tags[$value]['relatedTags'][$otherTag]++;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            unset($array[$key]);
                                        }
                                    }
                                }
                                // ======== //
                                // END TAGS //
                                // ======== //
                            }
                        
                            else if($temp_post['post_type_id'] == 2)
                            {   
                                // ========== //
                                // BEGIN TAGS //
                                // ========== //
                                $query = "SELECT * FROM se_posts WHERE id='" . $temp_post['parent_id'] . "';";
                                if($temp_result_alt = $mysqli->query($query))
                                {
                                    $temp_post_alt = $temp_result_alt->fetch_assoc();
                                    
                                    if($temp_post_alt['tags'] != null)
                                    {
                                        $array = explode('<',$temp_post_alt['tags']);
                                        
                                        foreach($array as $key=>&$value)
                                        {
                                            if($value != '')
                                            {
                                                if(substr($value,-1) == '>')
                                                {
                                                    $value = substr($value,0,-1);
                                                }
                                                
                                                $tags[$value]['activity'][$i]['commentCount']++;
                                                $tags[$value]['commentCount']++;
                                                
                                                foreach($array as &$otherTag)
                                                {                                                    
                                                    if(substr($otherTag,-1) == '>')
                                                    {
                                                        $otherTag = substr($otherTag,0,-1);
                                                    }
                                                    
                                                    if($otherTag != $value)
                                                    {
                                                        $tags[$value]['relatedTags'][$otherTag]++;
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                unset($array[$key]);
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    echo '<p>error</p>';
                                }
                                // ======== //
                                // END TAGS //
                                // ======== //
                            }
                        }
                        else
                        {
                            echo '<p>error</p>';
                        }
                        // ======== //
                        // END TAGS //
                        // ======== //
                    }
                }
                // ============ //
                // END COMMENTS //
                //============= //
                
                // ========================= //
                // BEGIN QUESTIONS & ANSWERS //
                // ========================= //
                $query = "SELECT * FROM se_posts WHERE owner_user_id=$user_id;";
                if($result = $mysqli->query($query))
                {   
                    while($row = $result->fetch_assoc())
                    {
                        $i = substr($row['creation_date'],0,7);
    
                        // =============== //
                        // BEGIN QUESTIONS //
                        // =============== //
                        if($row['post_type_id'] == 1)
                        {
                            $user->questionCount++;
    
                            $activity[$i]['questionCount']++;
                            
                            // ========== //
                            // BEGIN TAGS //
                            // ========== //
                            if($row['tags'] != null)
                            {
                                $array = explode('<',$row['tags']);
                                
                                foreach($array as $key=>&$value)
                                {
                                    if($value != '')
                                    {
                                        if(substr($value,-1) == '>')
                                        {
                                            $value = substr($value,0,-1);
                                        }
                                        
                                        $tags[$value]['activity'][$i]['questionCount']++;
                                        $tags[$value]['questionCount']++;
                                        
                                        foreach($array as &$otherTag)
                                        {
                                            if(substr($otherTag,-1) == '>')
                                            {
                                                $otherTag = substr($otherTag,0,-1);
                                            }
                                            
                                            if($otherTag != $value)
                                            {
                                                $tags[$value]['relatedTags'][$otherTag]++;
                                            }
                                        }
                                    }
                                    else
                                    {
                                        unset($array[$key]);
                                    }
                                }
                            }
                            
                            // ======== //
                            // END TAGS //
                            // ======== //
                            // ============= //
                            // END QUESTIONS //
                            // ============= //
                        }
                        else if($row['post_type_id'] == 2)
                        {
                            $user->answerCount++;
    
                            $activity[$i]['answerCount']++;
                            
                            // ========== //
                            // BEGIN TAGS //
                            // ========== //
                            $query = "SELECT * FROM se_posts WHERE id='" . $row['parent_id'] . "';";
                            if($temp_result = $mysqli->query($query))
                            {
                                $temp_post = $temp_result->fetch_assoc();
                                
                                if($temp_post['tags'] != null)
                                {
                                    $array = explode('<',$temp_post['tags']);
                                    
                                    foreach($array as $key=>&$value)
                                    {
                                        if($value != '')
                                        {
                                            if(substr($value,-1) == '>')
                                            {
                                                $value = substr($value,0,-1);
                                            }
                                            
                                            $tags[$value]['activity'][$i]['answerCount']++;
                                            $tags[$value]['answerCount']++;

                                            foreach($array as &$otherTag)
                                            {
                                                if(substr($otherTag,-1) == '>')
                                                {
                                                    $otherTag = substr($otherTag,0,-1);
                                                }
                                                
                                                if($otherTag != $value)
                                                {
                                                    $tags[$value]['relatedTags'][$otherTag]++;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            unset($array[$key]);
                                        }
                                    }
                                }
                            }
                            else
                            {
                                echo '<p>error</p>';
                            }
                            // ======== //
                            // END TAGS //
                            // ======== //
                        }
                    }
                }
                else
                {
                    echo '<p>error</p>';
                }
                // ======================= //
                // END QUESTIONS & ANSWERS //
                // ======================= //
                
                $user->activity = $activity;
                $user->tags = $tags;
                
                $mysqli->close();
                $new_json = json_encode($user);
                
                fwrite($fh, $new_json);
                fclose($fh);
                echo 'Done!';
                }
                else
                {
                    echo 'We already have data for that user...';
                }
                
                echo    "<form name='show_user' action='vr.php' method='post'>
                           <input type='hidden' name='userID' value='$user_id'>
                           <input type='hidden' name='displayName' value='$user->displayName'>	
                           <input type='submit' value='Show me his record!'>
                        </form>";
            }
            else
            {
                echo 'No users match your query :/';
                echo '<p><a href="vr.php">Return</a>';
            }
            
        ?>
        
        
    </body>
    
</html>
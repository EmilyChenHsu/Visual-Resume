<!DOCTYPE HTML>
<html>
    
    <body>
        
        <?php
            
            function unset_url($tag)
            {
                $unwanted[0] = '/\%2B/';
                $unwanted[1] = '/\%23/';
                
                $replacements[0] = '+';
                $replacements[1] = '#';
                
                $tag = preg_replace($unwanted,$replacements,$tag);
                
                return $tag;
            }
        
            date_default_timezone_set('America/Chicago');
            
            $date = $_GET['month1'];
                
            $mon = intval(substr($date,5,2));
            $yr = intval(substr($date,0,4));
            $datetime1 = date('Y-m-d H:i:s',mktime(0,0,0,$mon,1,$yr));
            
            $date = $_GET['month2'];
                
            $mon = intval(substr($date,5,2));
            $yr = intval(substr($date,0,4));
            $datetime2 = date('Y-m-d H:i:s',mktime(0,0,0,$mon,1,$yr));
            
            $output = '';
            $user_id = $_GET['user'];

            $server = "cse.unl.edu";
            $username = "stackoverflow";
            $password = "BU}uE@";
            $database = "stackoverflow";
            
            $mysqli = new mysqli($server,$username,$password,$database);
            
            $tag = null;
            if($_GET['tag'] != null)
            {
                $tag = unset_url($_GET['tag']);
            }
            
            if($_GET['type'] == 'question')
            {       
                $query = "SELECT * FROM se_posts WHERE (owner_user_id=$user_id) AND (post_type_id=1) AND (creation_date between '$datetime1' AND '$datetime2');";
                //$query = "SELECT * FROM se_posts WHERE (owner_user_id=$user_id) AND (post_type_id=1);";
                
                if($result = $mysqli->query($query))
                {
                    while($row = $result->fetch_assoc())
                    {
                        // ========== //
                        // BEGIN TAGS //
                        // ========== //
                        $array = array();
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
                                        $array[$key] = $value;
                                    }
                                }
                                else
                                {
                                    unset($array[$key]);
                                }
                            }
                            //var_dump($array);
                        }
                        
                        if($tag != null)
                        {
                            if (in_array($tag, $array))
                            {
                                //$output = $output . $row['title'] . '<br>';
                                $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank">' . $row['title'] . '</a></p>';
                                //echo '<br>' . $tag . '<br>';
                            }   
                        }
                        else
                        {
                            //$output = $output . $row['title'] . '<br>';
                            $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank">' . $row['title'] . '</a></p><hr>';
                        }
                        // ======== //
                        // END TAGS //
                        // ======== //
                    }
                }
                
                //echo $query . ' ' . $output . ' ' . $datetime;
                //echo $query . '<br>' . $output;
                echo $output;
            }
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            // Begin ANSWERS ==>
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            else if($_GET['type'] == 'answer')
            { 
                $query = "SELECT * FROM se_posts WHERE (owner_user_id=$user_id) AND (post_type_id=2) AND (creation_date between '$datetime1' AND '$datetime2');";
                $output = '';
                if($result = $mysqli->query($query))
                {
                    while($row = $result->fetch_assoc())
                    {
                        // ========== //
                        // BEGIN TAGS //
                        // ========== //
                        if($tag != null)
                        {
                            /*
                            $array = array();
                            $temp_id = $row['parent_id'];
                            $temp_query = "SELECT * FROM se_posts WHERE parent_id='$temp_id';";
                            
                            if($temp_result = $mysqli->query($temp_query))
                            {
                                $temp_row = $temp_result->fetch_assoc();
                                if($temp_row['tags'] != null)
                                {
                                    $array = explode('<',$temp_row['tags']);
                                    
                                    foreach($array as $key=>&$value)
                                    {
                                        if($value != '')
                                        {
                                            if(substr($value,-1) == '>')
                                            {
                                                $value = substr($value,0,-1);
                                                $array[$key] = $value;
                                            }
                                        }
                                        else
                                        {
                                            unset($array[$key]);
                                        }
                                    }
                                }
                            }
                            */
                            if (in_array($tag, $array))
                            {
                                //$output = $output . $row['title'] . '<br>';
                                //$output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank">' . $row['title'] . '</a></p>';
                                $output = $output . $row['body'] . '</p><hr>';
                            }
                        }
                        else
                        {
                            //$output = $output . $row['title'] . '<br>';
                            $output = $output . '<p><a href="http://stackoverflow.com/a/' . $row['id'] . '" target="_blank"><b>View Answer</b><br></a>' . $row['body'] . '</p><hr>';
                            //$output = $output . $row['body'] . '</p><hr>';
                        }
                        // ======== //
                        // END TAGS //
                        // ======== //
                    }
                }

                //echo $query . '<br>' . $output;
                echo $output;
            }
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            // End ANSWERS <==
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            //
            //
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            // Begin COMMENTS ==>
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            else if($_GET['type'] == 'comment')
            {
                $query = "SELECT * FROM se_comments WHERE (user_id=$user_id) AND (creation_date between '$datetime1' AND '$datetime2');";
                $output = '';
                
                if($result = $mysqli->query($query))
                {
                    while($row = $result->fetch_assoc())
                    {
                        if($row['text'] != null)
                        {
                            //echo $row['text'] . '<br>';
                            $output = $output . $row['text'] . '</p></b></i><hr>';
                            //$output = $output . '<p><a href="http://stackoverflow.com/a/' . $row['id'] . '" target="_blank"><b>View Answer</b><br></a>' . $row['body'] . '</p><hr>';
                        }
                    }
                }

                //echo $_GET['tag'] . ' ' . $query . '<br>' . $output;
                echo $output;
            }
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            // End COMMENTS <==
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            else
            {
                echo 'invalid type';
            }
            
            $mysqli->close();
        ?>
        
        
    </body>
    
</html>
<!DOCTYPE HTML>
<html>

    <body>

        <?php
            class so_post
            {
                public $parent_id = null;
                public $id = null;
                public $tags = null;
                public $body = null;
                public $type = null;
                public $score = 0;
                public $commentCount = 0;
            }

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

            $mod_tag = '<' . $tag . '>';

            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            // Begin QUESTIONS ==>
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            if($_GET['type'] == 'question')
            {
                $query = "SELECT * FROM se_posts WHERE (owner_user_id=$user_id) AND (post_type_id=1) AND (creation_date between '$datetime1' AND '$datetime2');";

                if($result = $mysqli->query($query))
                {
                    while($row = $result->fetch_assoc())
                    {
                        // Determine if there are comments present
                        $commentPresence = ($row['comment_count'] > 0) ? ' ' . $row['comment_count'] . ' <img src="media/comment_bubble.png" class="comment-bubble">' : '';

                        // ========== //
                        // BEGIN TAGS //
                        // ========== //
                        if($tag != null)
                        {
                            if (strpos($row['tags'], $mod_tag) !== false)
                            {
                                $temp_score = $row['score'];
                                if($temp_score > 0)
                                {
                                    $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank"><b>View Question</b></a> (+' . $temp_score . ')' . $commentPresence . '</p><p>' . $row['title'] . '</p><hr>';
                                }
                                else if($temp_score < 0)
                                {
                                    $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank"><b>View Question</b></a> (' . $temp_score . ')' . $commentPresence . '</p><p>' . $row['title'] . '</p><hr>';
                                }
                                else
                                {
                                    $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank"><b>View Question</b></a> (0)' . $commentPresence . '</p><p>' . $row['title'] . '</p><hr>';
                                }
                            }
                        }
                        else
                        {
                            $temp_score = $row['score'];
                            if($temp_score > 0)
                            {
                                $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank"><b>View Question</b></a> (+' . $temp_score . ')' . $commentPresence . '</p><p>' . $row['title'] . '</p><hr>';
                            }
                            else if($temp_score < 0)
                            {
                                $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank"><b>View Question</b></a> (' . $temp_score . ')' . $commentPresence . '</p><p>' . $row['title'] . '</p><hr>';
                            }
                            else
                            {
                                $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $row['id'] . '" target="_blank"><b>View Question</b></a> (0)' . $commentPresence . '</p><p>' . $row['title'] . '</p><hr>';
                            }
                        }
                        // ======== //
                        // END TAGS //
                        // ======== //
                    }
                }

                echo $output;
            }
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            // End QUESTIONS <==
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            //
            //
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            // Begin ANSWERS ==>
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            else if($_GET['type'] == 'answer')
            {
                $query = "SELECT * FROM se_posts WHERE (owner_user_id=$user_id) AND (post_type_id=2) AND (creation_date between '$datetime1' AND '$datetime2');";
                $output = '';
                if($result = $mysqli->query($query))
                {
                    //
                    // ========== //
                    // BEGIN TAGS //
                    // ========== //
                    //
                    if($tag != null)
                    {
                        $id_array = array();
                        $question_array = array();
                        $answer_array = array();

                        while($row = $result->fetch_assoc())
                        {
                            array_push($id_array, $row['parent_id']);
                            $answer = new so_post();
                            $answer->id = $row['id'];
                            $answer->parent_id = $row['parent_id'];
                            $answer->body = $row['body'];
                            $answer->score = $row['score'];
                            $answer->commentCount = $row['comment_count'];
                            array_push($answer_array, $answer);
                        }

                        $post_implode = '(' . implode(',', array_map('intval', $id_array)) . ')';

                        $temp_query = "SELECT * FROM se_posts WHERE id IN $post_implode;";

                        if($temp_result = $mysqli->query($temp_query))
                        {
                            while($temp_row = $temp_result->fetch_assoc())
                            {
                                // This way indexes by the post's id
                                $question = new so_post();
                                $question->id = $temp_row['id'];
                                $question->tags = $temp_row['tags'];
                                $question_array[$temp_row['id']] = $question;
                            }
                        }

                        foreach($answer_array as $key=>&$value)
                        {
                            // Determine if there are comments present
                            $commentPresence = ($value->commentCount > 0) ? ' ' . $value->commentCount . ' <img src="media/comment_bubble.png" class="comment-bubble">' : '';
                            if (strpos($question_array[$value->parent_id]->tags, $mod_tag) !== false)
                            {
                                if($value->score > 0)
                                {
                                    $output = $output . '<p><a href="http://stackoverflow.com/a/' . $value->id . '" target="_blank"><b>View Answer</b></a> (+' . $value->score . ')' . $commentPresence . '<br>' . $value->body . '</p><hr>';
                                }
                                else if($value->score < 0)
                                {
                                    $output = $output . '<p><a href="http://stackoverflow.com/a/' . $value->id . '" target="_blank"><b>View Answer</b></a> (' . $value->score . ')' . $commentPresence . '<br>' . $value->body . '</p><hr>';
                                }
                                else
                                {
                                    $output = $output . '<p><a href="http://stackoverflow.com/a/' . $value->id . '" target="_blank"><b>View Answer</b></a> (0)' . $commentPresence . '<br>' . $value->body . '</p><hr>';
                                }
                            }
                        }
                    }
                    //
                    // ======== //
                    // END TAGS //
                    // ======== //
                    //
                    else
                    {
                        while($row = $result->fetch_assoc())
                        {
                            // Determine if there are comments present
                            $commentPresence = ($row['comment_count'] > 0) ? ' ' . $row['comment_count'] . ' <img src="media/comment_bubble.png" class="comment-bubble">' : '';
                            $temp_score = $row['score'];
                            if($temp_score > 0)
                            {
                                $output = $output . '<p><a href="http://stackoverflow.com/a/' . $row['id'] . '" target="_blank"><b>View Answer</b></a> (+' . $temp_score . ')' . $commentPresence . '<br>' . $row['body'] . '</p><hr>';
                            }
                            else if($temp_score < 0)
                            {
                                $output = $output . '<p><a href="http://stackoverflow.com/a/' . $row['id'] . '" target="_blank"><b>View Answer</b></a> (' . $temp_score . ')' . $commentPresence . '<br>' . $row['body'] . '</p><hr>';
                            }
                            else
                            {
                                $output = $output . '<p><a href="http://stackoverflow.com/a/' . $row['id'] . '" target="_blank"><b>View Answer</b></a> (0)' . $commentPresence . '<br>' . $row['body'] . '</p><hr>';
                            }
                        }
                    }
                }

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
                    //
                    // ========== //
                    // BEGIN TAGS //
                    // ========== //
                    //
                    $map = array();
                    $id_array = array();
                    $alt_id_array = array();
                    $question_array = array();
                    $answer_array = array();
                    $comment_array = array();

                    while($row = $result->fetch_assoc())
                    {
                        array_push($id_array, $row['post_id']);
                        $comment = new so_post();
                        $comment->id = $row['id'];
                        $comment->parent_id = $row['post_id'];
                        $comment->body = $row['text'];
                        array_push($comment_array, $comment);
                    }

                    $post_implode = '(' . implode(',', array_map('intval', $id_array)) . ')';

                    $temp_query = "SELECT * FROM se_posts WHERE id IN $post_implode;";

                    if($temp_result = $mysqli->query($temp_query))
                    {
                        while($temp_row = $temp_result->fetch_assoc())
                        {

                            if($temp_row['post_type_id'] == 2)
                            {
                                $map[$temp_row['id']] = $temp_row['parent_id'];
                                array_push($alt_id_array, $temp_row['parent_id']);
                            }
                            else
                            {
                                $map[$temp_row['id']] = $temp_row['id'];
                                // This way indexes by the post's id
                                $question = new so_post();
                                $question->id = $temp_row['id'];
                                $question->tags = $temp_row['tags'];
                                $question_array[$temp_row['id']] = $question;
                            }
                        }
                    }

                    unset($post_implode);
                    $post_implode = '(' . implode(',', array_map('intval', $alt_id_array)) . ')';
                    unset($temp_query);
                    $temp_query = "SELECT * FROM se_posts WHERE id IN $post_implode;";
                    unset($temp_result);
                    if($temp_result = $mysqli->query($temp_query))
                    {
                        while($temp_row = $temp_result->fetch_assoc())
                        {
                            // This way indexes by the post's id
                            $question = new so_post();
                            $question->id = $temp_row['id'];
                            $question->tags = $temp_row['tags'];
                            $question_array[$temp_row['id']] = $question;
                        }
                    }

                    foreach($comment_array as $key=>&$value)
                    {

                        if($tag != null)
                        {
                            if(strpos($question_array[$map[$value->parent_id]]->tags, $mod_tag) !== false)
                            {
                                $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $map[$value->parent_id] . '/#comment' . $value->id . '_' . $value->parent_id . '" target="_blank"><b>View Comment</b></p></a>' . $value->body . '</p><hr>';
                            }
                        }
                        else
                        {
                            $output = $output . '<p><a href="http://stackoverflow.com/questions/' . $map[$value->parent_id] . '/#comment' . $value->id . '_' . $value->parent_id . '" target="_blank"><b>View Comment</b></p></a>' . $value->body . '</p><hr>';
                        }

                    }
                    //
                    // ======== //
                    // END TAGS //
                    // ======== //
                    //
                }

                echo $output;
            }
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            // End COMMENTS <==
            // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
            //
            else
            {
                echo 'invalid type';
            }

            $mysqli->close();
        ?>


    </body>

</html>
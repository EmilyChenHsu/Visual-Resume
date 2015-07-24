<?php
    $server = "cse.unl.edu";
    $username = "stackoverflow";
    $password = "BU}uE@";
    $database = "stackoverflow";
    
    if(isset($_POST['search_input']))
    {
        $mysqli = new mysqli($server,$username,$password,$database);
        $input = $_POST['search_input'];
        $query = "select * from se_users where display_name like '%$input%' order by creation_date;";
        if($result = $mysqli->query($query))
        {
            echo "<form name='user_select' action='jsonEncode.php' method='post'>";
            
            while($row = $result->fetch_assoc())
            {
                echo "<img class='avatar' src='http://www.gravatar.com/avatar/" . $row['email_hash'] . "'>" . $row['display_name'] . ' ' . $row['creation_date'] . ' ' . $row['reputation'] . ' ' . '<input type="radio" name="userID" value="' . $row['id'] . '">' . '<p>';
            }
            
            if($result->num_rows > 0)
            {
                echo "<input type='submit' value='JSON-ify (this could take several minutes)'></form>";
            }
            else
            {
                echo 'No users match your query :/';
                echo '<p><a href="vr.php">Return</a>';
            }
        }
        $mysqli->close();
    }
?>
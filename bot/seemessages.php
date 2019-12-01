<?php
require "../incl/lib/connection.php";
if (!empty($_GET['user']) and !empty($_GET['page']) and is_numeric($_GET['page'])) {
    $page = $_GET['page'] - 1;
    $user = preg_replace('/[^a-zA-Z0-9\s]/', '', $_GET['user']);
    $query = $db->prepare("
        SELECT userName FROM accounts
        WHERE userName = '$user'
    ");
	$query->execute();
	$result = $query->fetchAll(PDO::FETCH_ASSOC);
	$output = "";
	if (empty($result)) {
	    $query = $db->prepare("
            SELECT a.userName FROM accounts a
            INNER JOIN users b
            ON a.userName = b.userName AND a.userName LIKE '%$user%'
            ORDER BY a.isAdmin DESC, b.stars DESC
            LIMIT 10
        ");
    	$query->execute();
    	$result = $query->fetchAll(PDO::FETCH_ASSOC);
    	$output .= "0~";
    	foreach ($result as $r) {
    	    $output .= $r['userName'] . ",";
    	}
    	exit(substr($output, 0, -1));
	} else {
	    $output .= $result[0]['userName'] . "~";
	    $query = $db->prepare("
    	    SELECT comment, timestamp, likes FROM acccomments
    	    WHERE userName = '$user'
    	    ORDER BY timestamp DESC
    	    LIMIT 10 OFFSET " . $page * 10
    	);
    	$query->execute();
	    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    	foreach ($result as $re) {
    	    foreach ($re as $r) {
    	        $output .= $r . ",";
    	    }
    	    $output = substr($output, 0, -1) . ";";
    	}
    	exit(substr($output, 0, -1));
	}
}    
?>

<?php
require "../incl/lib/connection.php";
if (isset($_GET['page']) and is_numeric($_GET['page']) and isset($_GET['type'])) {
    if ($_GET['type'] == "creator") {
        $type = "creatorPoints";
    } else {
        $type = "stars";
    }
	$sql = "
	    SELECT
	        CONCAT(userName, ',', $type, ';')
	    FROM users
	    WHERE isBanned = 0 and isRegistered = 1 and $type > 0
	    ORDER BY $type DESC, userName ASC
	    LIMIT 20 OFFSET " . $_GET['page'] * 20
	;
	$result = $db->query($sql)->fetchAll(PDO::FETCH_COLUMN);
    echo substr(implode("", $result), 0, -1);
}
?>
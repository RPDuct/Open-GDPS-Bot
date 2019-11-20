<?php
require "../incl/lib/connection.php";
if (isset($_GET['time']) and is_numeric($_GET['time'])) {
    $sql = "
        SELECT
        	CONCAT(
                a.value2,',', c.levelName,',', a.value3,',', b.userName,',', a.timestamp,',', 
            	CASE
                	WHEN (
        				SELECT value2 FROM modactions
        				WHERE type = 1 AND value3 = a.value3 AND timestamp < a.timestamp - 50
                    	ORDER BY timestamp DESC
                    	LIMIT 1
                	) IS NOT NULL THEN (
                		SELECT value2 FROM modactions
                    	WHERE type = 1 AND value3 = a.value3 AND timestamp < a.timestamp - 50
                    	ORDER BY timestamp DESC
                    	LIMIT 1
                	) ELSE 0
                END,
                ';'
        	) AS output
        FROM modactions a
        INNER JOIN accounts b
        ON b.accountID = a.account
        INNER JOIN levels c
        ON c.levelID = a.value3 AND a.timestamp > " . $_GET['time'] / 1000 . " AND a.type = 1
        ORDER BY a.timestamp ASC, a.value3 ASC
    ";
    $result = $db->query($sql)->fetchAll(PDO::FETCH_COLUMN);
    echo substr(implode("", $result), 0, -1);
}
?>
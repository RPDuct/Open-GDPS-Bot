<?php
require "../incl/lib/connection.php";
if (isset($_GET['levelname'])) {
    $level = preg_replace('/[^a-zA-Z0-9\s!?]/', '', $_GET['levelname']);
    if (is_numeric($level)) {
        $search = "levelID = " . $level;
    } else {
        $search = "levelName = '" . $level . "'";
    }
	$sql = "
        SELECT
        	CASE
            	WHEN (SELECT COUNT(*) FROM levels WHERE $search AND unlisted = 0) != 0 THEN
                    (SELECT
                        CONCAT (
                            levelName,':',levelID,'~',levelDesc,'~',objects,'~',levelVersion,'~',levelLength,'~',userName,'~',
                            coins,'~',downloads,'~',likes,'~',originalReup,'~',
                            starStars,'~',starFeatured,'~',starEpic,'~',uploadDate
                        ) AS output
                    FROM levels
                    WHERE $search AND unlisted = 0
                    ORDER BY starStars DESC, downloads DESC
                    LIMIT 1)
                ELSE
                    '-'
            END AS output
        FROM levels
        LIMIT 1
    ";
	$output = $db->query($sql)->fetchAll(PDO::FETCH_COLUMN)[0];
	if ($output == '-') {
	    $sql = "
    	    SELECT levelname
           	FROM levels
           	WHERE levelName LIKE '%$level%' AND unlisted = 0
           	ORDER BY starStars DESC, downloads DESC
           	LIMIT 10
	    ";
	    $output = $db->query($sql)->fetchAll(PDO::FETCH_COLUMN);
	    echo "0:" . implode(";", $output);
	} else {
	    echo $output;
	}
}
?>
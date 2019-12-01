<?php
require "../incl/lib/connection.php";
if (!empty($_GET['user'])) {
    $user = preg_replace('/[^a-zA-Z0-9\s]/', '', $_GET['user']);
    if (is_numeric($user)) {
        $search = "a.extID = $user";
    } else {
        $search = "a.userName LIKE '%$user%'";
    }
    $sql = "
        SELECT
        	CONCAT (
                a.userName,',',a.userID,',',a.extID,',',a.stars,',',a.diamonds,',',a.coins,',',a.userCoins,',',a.demons,',',a.creatorPoints,',',a.isBanned,',',
                CASE
                    WHEN b.youtubeurl =  '' THEN
                        '-'
                    ELSE
                        b.youtubeurl
                END,',',
                CASE
                    WHEN b.twitch =  '' THEN
                        '-'
                    ELSE
                        b.twitch
                END,',',
                CASE
                    WHEN b.twitter =  '' THEN
                        '-'
                    ELSE
                        b.twitter
                END,',',
                CASE
                    WHEN a.isBanned = 0 THEN (
                        SELECT count(*)+1 FROM users
                        WHERE stars > a.stars and isBanned = 0
                    ) ELSE
                        '-'
                END
            ) AS output
        FROM users a
        INNER JOIN accounts b
        ON a.extID IS NOT NULL AND a.extID * 1 = a.extID AND b.accountID = a.extID AND $search
        LIMIT 1
    ";
    $result = $db->query($sql)->fetchAll(PDO::FETCH_COLUMN);
    echo $result[0];
}
?>

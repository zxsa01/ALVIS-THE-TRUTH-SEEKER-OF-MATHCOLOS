<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $search_id_player = $DecodedData['search_id_player'];
    $search_id_level = $DecodedData['search_id_level'];

    $SQ = "SELECT * FROM score WHERE id_player = $search_id_player AND id_level = $search_id_level";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $Row = mysqli_fetch_assoc($Table);
        $score = $Row['score'];
    } else {
        $score = -1;
    }

    $Response[] = array("score" => $score);
    echo json_encode($Response);
    
?>
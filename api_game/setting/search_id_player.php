<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $search_id_player = $DecodedData['search_id_player'];

    $SQ = "SELECT * FROM setting WHERE id_player = $search_id_player";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $Row = mysqli_fetch_assoc($Table);
        $sound = $Row['sound'];
        $music = $Row['music'];
        $loudness_of_music = $Row['loudness_of_music'];
    } else {
        $sound = -1;
        $music = -1;
        $loudness_of_music = -1;
    }

    $Response[] = array("sound" => $sound, "music" => $music, "loudness_of_music" => $loudness_of_music);
    echo json_encode($Response);
    
?>
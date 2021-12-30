<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $search_id_player = $DecodedData['search_id_player'];

    $SQ = "SELECT * FROM player WHERE id_player = $search_id_player";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $Row = mysqli_fetch_assoc($Table);
        $name_player = $Row['name_player'];
    } else {
        $name_player = "";
    }

    $Response[] = array("name_player" => $name_player);
    echo json_encode($Response);
    
?>
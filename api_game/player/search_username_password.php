<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $search_username = $DecodedData['search_username'];
    $search_password = $DecodedData['search_password'];

    $SQ = "SELECT * FROM player WHERE username LIKE '".$search_username."' AND password LIKE '".$search_password."'";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $Row = mysqli_fetch_assoc($Table);
        $id_player = $Row['id_player'];
    } else {
        $id_player = 0;
    }

    $Response[] = array("id_player" => $id_player);
    echo json_encode($Response);

?>
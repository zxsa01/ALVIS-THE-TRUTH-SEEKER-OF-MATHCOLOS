<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $delete_id_player = $DecodedData['delete_id_player'];

    $DQ = "DELETE FROM player WHERE id_player = $delete_id_player";

    $R = mysqli_query($CN, $DQ);

    if ($R) {
        $Message = "Delete player account successfully.";
    } else {
        $Message = "Delete player account unsuccessfully.";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);
    
?>
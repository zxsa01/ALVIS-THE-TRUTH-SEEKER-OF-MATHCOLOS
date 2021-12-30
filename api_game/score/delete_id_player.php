<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $delete_id_player = $DecodedData['delete_id_player'];

    $DQ = "DELETE FROM score WHERE id_player = $delete_id_player";

    $R = mysqli_query($CN, $DQ);

    if ($R) {
        $Message = "Delete score of player account successfully.";
    } else {
        $Message = "Delete score of player account unsuccessfully.";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);

?>
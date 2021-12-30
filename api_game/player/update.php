<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $update_id_player = $DecodedData['update_id_player'];
    $update_name_player = $DecodedData['update_name_player'];

    $UQ = "UPDATE player SET name_player = '$update_name_player', update_date = current_timestamp() WHERE id_player = $update_id_player";

    $R = mysqli_query($CN,$UQ);

    if ($R) {
        $Message = "Update name player successfully.";
    }else{
        $Message = "Update name player unsuccessfully.";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);

?>
<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $update_id_player = $DecodedData['update_id_player'];
    $update_id_level = $DecodedData['update_id_level'];
    $score = $DecodedData['score'];

    $UQ = "UPDATE score SET score = $score, update_date = current_timestamp() WHERE id_player = $update_id_player AND id_level = $update_id_level";

    $R = mysqli_query($CN,$UQ);

    if ($R) {
        $Message = "Update score successfully.";
    }else{
        $Message = "Update score unsuccessfully.";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);

?>
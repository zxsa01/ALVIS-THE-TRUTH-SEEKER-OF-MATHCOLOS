<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $sound = $DecodedData['sound'];
    $music = $DecodedData['music'];
    $loudness_of_music = $DecodedData['loudness_of_music'];
    $update_id_player = $DecodedData['update_id_player'];

    $UQ = "UPDATE setting SET sound = $sound, music = $music, loudness_of_music = $loudness_of_music, update_date = current_timestamp() WHERE id_player = $update_id_player";

    $R = mysqli_query($CN,$UQ);

    if ($R) {
        $Message = "Setting successfully.";
    }else{
        $Message = "Setting unsuccessfully.";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);

?>
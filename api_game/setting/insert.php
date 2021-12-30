<?php

    $CN = mysqli_connect("localhost", "root","");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $id_player = $DecodedData['id_player'];
    
    $IQ = "INSERT INTO setting(sound, music, loudness_of_music, id_player) VALUES(1, 1, 10, $id_player)";

    $R = mysqli_query($CN,$IQ);

    if ($R) {
        $Message = "Insert setting successfully.";
    } else {
        $Message = "Insert setting unsuccessfully.";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);

?>
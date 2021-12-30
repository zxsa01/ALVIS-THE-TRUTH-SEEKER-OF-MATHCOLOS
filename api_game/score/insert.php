<?php

    $CN = mysqli_connect("localhost", "root","");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $id_player = $DecodedData['id_player'];
    $id_level = $DecodedData['id_level'];
    $score = $DecodedData['score'];
    
    $IQ = "INSERT INTO score(id_player, id_level, score) VALUES('$id_player', '$id_level', '$score')";

    $R = mysqli_query($CN,$IQ);

    if ($R) {
        $Message = "Create Score of player account successfully.";
    } else {
        $Message = "Create score of player account unsuccessfully.";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);

?>
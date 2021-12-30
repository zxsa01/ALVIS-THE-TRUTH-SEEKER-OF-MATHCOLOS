<?php

    $CN = mysqli_connect("localhost", "root","");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $username = $DecodedData['username'];
    $password = $DecodedData['password'];
    $name_player = $DecodedData['name_player'];
    
    $IQ = "INSERT INTO player(username, password, name_player) VALUES('$username', '$password', '$name_player')";

    $R = mysqli_query($CN,$IQ);

    if ($R) {
        $Message = "Create player account successfully.";
    } else {
        $Message = "Duplicate username.";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);

?>
<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $search_id_subject = $DecodedData['search_id_subject'];

    $SQ = "SELECT * FROM level WHERE id_subject = $search_id_subject";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $temp = mysqli_num_rows($Table);
        while($temp > 0){
            $Row = mysqli_fetch_assoc($Table);
            $id_level[] = $Row['id_level'];
            $level_number[] = $Row['level_number'];
            $minute[] = $Row['minute'];
            $second[] = $Row['second'];
            $temp = $temp - 1;
        }
    }else{
        $id_level = 0;
        $level_number = 0;
        $minute = 0;
        $second = 0;
    }

    $Response[] = array("id_level" => $id_level, "level_number" => $level_number, "minute" => $minute, "second" => $second);
    echo json_encode($Response);
    
?>
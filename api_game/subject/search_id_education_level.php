<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $search_id_education_level = $DecodedData['search_id_education_level'];

    $SQ = "SELECT * FROM subject WHERE id_education_level = $search_id_education_level";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $temp = mysqli_num_rows($Table);
        while($temp > 0){
            $Row = mysqli_fetch_assoc($Table);
            $name_subject[] = $Row['name_subject'];
            $id_subject[] = $Row['id_subject'];
            $temp = $temp - 1;
        }
    }else{
        $name_subject = "";
        $id_subject = 0;
    }

    $Response[] = array("name_subject" => $name_subject, "id_subject" => $id_subject);
    echo json_encode($Response);
    
?>
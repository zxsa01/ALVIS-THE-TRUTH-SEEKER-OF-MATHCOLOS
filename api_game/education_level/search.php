<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $SQ = "SELECT * FROM education_level";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $temp = mysqli_num_rows($Table);
        while ($temp > 0) {
            $Row = mysqli_fetch_assoc($Table);
            $name_education_level[] = $Row['name_education_level'];
            $id_education_level[] = $Row['id_education_level'];
            $temp = $temp - 1;
        }
    }else{
        $name_education_level = "";
        $id_education_level = 0;
    }

    $Response[] = array("name_education_level" => $name_education_level, "id_education_level" => $id_education_level);
    echo json_encode($Response);
    
?>
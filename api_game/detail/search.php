<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $SQ = "SELECT * FROM detail";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $temp = mysqli_num_rows($Table);
        while ($temp > 0) {
            $Row = mysqli_fetch_assoc($Table);
            $name_detail[] = $Row['name_detail'];
            $information_detail[] = $Row['information_detail'];
            $temp = $temp - 1;
        }
    }else{
        $name_detail = "";
        $information_detail = "";
    }

    $Response[] = array("name_detail" => $name_detail, "information_detail" => $information_detail);
    echo json_encode($Response);
    
?>
<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $search_id_question_answer = $DecodedData['search_id_question_answer'];

    $SQ = "SELECT * FROM choice WHERE id_question_answer = $search_id_question_answer";
    
    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $temp = mysqli_num_rows($Table);
        while($temp > 0){
            $Row = mysqli_fetch_assoc($Table);
            $choice_number[] = $Row['choice_number'];
            $choice_question_answer[] = $Row['choice_question_answer'];
            $temp = $temp - 1;
        }
    }else{
        $choice_number = 0;
        $choice_question_answer = "";
    }

    $Response[] = array("choice_number" => $choice_number, "choice_question_answer" => $choice_question_answer);
    echo json_encode($Response);
    
?>
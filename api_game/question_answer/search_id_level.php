<?php

    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "game");

    mysqli_set_charset($CN, "utf8");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $search_level_number = $DecodedData['search_level_number'];
    $search_id_subject = $DecodedData['search_id_subject'];

    $SQ = "SELECT * FROM question_answer WHERE level_number = $search_level_number AND id_subject = $search_id_subject";

    $Table = mysqli_query($CN, $SQ);
    
    if (mysqli_num_rows($Table) > 0) {
        $Row = mysqli_fetch_assoc($Table);
        $id_question_answer = $Row['id_question_answer'];
        $question = $Row['question'];
        $answer = $Row['answer'];
    } else {
        $id_question_answer = 0;
        $question = "";
        $answer = 0;
    }

    $Response[] = array("id_question_answer" => $id_question_answer, "question" => $question, "answer" => $answer); 
    echo json_encode($Response);

?>
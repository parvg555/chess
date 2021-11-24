<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("database.php");

    $Board_ID = $_GET['ID'];
    
    $query1 = mysqli_query($con,"select * from board where ID = '$Board_ID'");

    $response = array();
    
    if(mysqli_num_rows($query1) > 0){
        $response["Success"] = 1;
        $row = $query1 -> fetch_assoc();
        $response["Game_Status"] = $row['Game_Status'];
        $response["Move_Status"] = $row['Move_Status'];
        $response["Move"] = $row['Move'];
        $response["Board_Status"] = $row['Board_Status'];
    }else{
        $response["Success"] = 0;
    }

    echo json_encode($response);

?>
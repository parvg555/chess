<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("database.php");

    $Board_ID = $_GET['ID'];
    
    $query1 = mysqli_query($con,"select * from board where ID = '$Board_ID'");

    $response = array();
    
    if(mysqli_num_rows($query1) > 0){
        $query2 = mysqli_query($con, "update board set Last_Online = NOW() where ID = '$Board_ID'");
        $response["Status"] = 1;
    }else{
        $response["Status"] = 0;
    }

    echo json_encode($response);

?>
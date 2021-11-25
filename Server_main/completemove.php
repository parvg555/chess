<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("database.php");

    $Board_ID = $_GET['ID'];
    
    $query1 = mysqli_query($con,"select * from board where ID = '$Board_ID'");

    $response = array();
    
    if(mysqli_num_rows($query1) > 0){
        $row1 = $query1 -> fetch_assoc();
        if($row1['Last_Move'] == "player1"){
            $query2 = mysqli_query($con, "update board set (Last_Move='player2',Move_Status='player2')  where ID = '$Board_ID'");
        }else{
            $query2 = mysqli_query($con, "update board set (Last_Move='player1',Move_Status='player1')  where ID = '$Board_ID'");
        }
        $response["Status"] = 1;
    }else{
        $response["Status"] = 0;
    }

    echo json_encode($response);

?>
<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("database.php");

    $led_id = $_GET['id'];
    
    $res = array();
    $response = mysqli_query($con,"select * from led where id = '$led_id' ");
    
    if(mysqli_num_rows($response) > 0){
        
        $row = $response->fetch_assoc();
        $res["success"] = 1;
        $res["status"] = $row['status'];
    }else{
        $res["success"] = 0;
        $res["message"] = "invalid led id";
    }

    
    echo json_encode($res);

?>
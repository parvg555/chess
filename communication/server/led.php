<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("database.php");

    $led_id = $_GET['id'];
    $led_status = $_GET['status'];

    $response = mysqli_query($con,"select * from led where id = '$led_id' ");

    if(mysqli_num_rows($response) > 0){
        $response = mysqli_query($con,"update led set status = '$led_status' where id = '$led_id'") or die("error updating the led status");
    }else{
        $response = mysqli_query($con,"insert into led (id,status) VALUES ('$led_id','$led_status')") or die("error inserting the new led");
    } 

    $res = array();
    $res["success"] = 1;
    $res["message"] = "update success";

    echo json_encode($res);


?>
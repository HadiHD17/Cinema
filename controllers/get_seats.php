<?php 
require("../models/Seat.php");
require_once("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $seats = Seat::findAll();

    $response["seats"] = []; 
    foreach($seats as $s){
        $response["seats"][] = $s->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$seats = Seat::find( $id);
$response["seats"] = $seats->toArray();

echo json_encode($response);
return;
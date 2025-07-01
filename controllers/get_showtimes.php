<?php 
require("../models/Showtime.php");
require_once("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $showtimes = Showtime::findAll();

    $response["showtimes"] = []; 
    foreach($showtimes as $s){
        $response["showtimes"][] = $s->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$showtimes = Showtime::find( $id);
$response["showtimes"] = $showtimes->toArray();

echo json_encode($response);
return;
<?php 
require("../models/Booking.php");
require_once("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $bookings = Booking::findAll();

    $response["bookings"] = []; 
    foreach($bookings as $b){
        $response["bookings"][] = $b->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$bookings = Booking::find( $id);
$response["bookings"] = $bookings->toArray();

echo json_encode($response);
return;
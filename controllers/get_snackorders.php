<?php 
require("../models/SnackOrder.php");
require_once("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $orders = SnackOrder::findAll();

    $response["orders"] = []; 
    foreach($orders as $o){
        $response["orders"][] = $o->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$orders = SnackOrder::find( $id);
$response["orders"] = $orders->toArray();

echo json_encode($response);
return;
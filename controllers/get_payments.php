<?php 
require("../models/Payment.php");
require_once("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $payments = Payment::findAll();

    $response["payments"] = []; 
    foreach($payments as $p){
        $response["payments"][] = $p->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$payments = Payment::find( $id);
$response["payments"] = $payments->toArray();

echo json_encode($response);
return;
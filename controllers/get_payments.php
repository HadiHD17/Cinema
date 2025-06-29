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
$payment = Payment::find( $id);
$response["payment"] = $payment->toArray();

echo json_encode($response);
return;
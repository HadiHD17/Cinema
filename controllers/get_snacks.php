<?php 
require("../models/Snack.php");
require_once("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $snacks = Snack::findAll();

    $response["snacks"] = []; 
    foreach($snacks as $s){
        $response["snacks"][] = $s->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$snacks = Snack::find( $id);
$response["snacks"] = $snacks->toArray();

echo json_encode($response);
return;
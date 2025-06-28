<?php 
require("../models/Admin.php");
require_once("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $admins = Admin::findAll();

    $response["admins"] = []; 
    foreach($admins as $a){
        $response["admins"][] = $a->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$admins = Admin::find( $id);
$response["admins"] = $admins->toArray();

echo json_encode($response);
return;
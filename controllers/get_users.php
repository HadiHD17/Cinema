<?php 
require("../models/User.php");
require("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $users = User::findAll();

    $response["users"] = []; 
    foreach($users as $u){
        $response["users"][] = $u->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$users = User::find( $id);
$response["users"] = $users->toArray();

echo json_encode($response);
return;
<?php 
require("../models/User.php");
require_once("../connection/connection.php");

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
$user = User::find($id);

if ($user) {
    $response["users"] = $user->toArray();
} else {
    $response["status"] = 404;
    $response["message"] = "User not found";
    $response["users"] = null;
}
echo json_encode($response);
return;
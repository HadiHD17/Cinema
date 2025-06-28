<?php 
require("../models/Movie.php");
require_once("../connection/connection.php");

$response = [];
$response["status"] = 200;

if(!isset($_GET["id"])){
    $movies = Movie::findAll();

    $response["movies"] = []; 
    foreach($movies as $m){
        $response["movies"][] = $m->toArray(); 
    }
    echo json_encode($response); 
    return;
}

$id = $_GET["id"];
$movies = Movie::find( $id);
$response["movies"] = $movies->toArray();

echo json_encode($response);
return;
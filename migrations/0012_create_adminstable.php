<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(100)
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
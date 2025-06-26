<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS snacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(5,2),
    image VARCHAR(255)
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
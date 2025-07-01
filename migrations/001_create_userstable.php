<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255),
    BDay DATE,
    is_verified BOOLEAN DEFAULT 0,
    id_document VARCHAR(255), 
    favorite_genres TEXT,
    comm_pref ENUM('email', 'sms', 'both') DEFAULT 'email',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
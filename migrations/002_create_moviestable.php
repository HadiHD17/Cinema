<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150),
    description TEXT,
    genre VARCHAR(100),
    age_rating VARCHAR(10), 
    trailer_url VARCHAR(255),
    cast TEXT,
    release_date DATE,
    end_date DATE,
    poster_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS cinema_nights (
    night_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    genre VARCHAR(100),
    preferred_day ENUM('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
    auto_booking_enabled BOOLEAN DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS  seats (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    showtime_id INT,
    seat_label VARCHAR(10), 
    status ENUM('available', 'locked', 'booked') DEFAULT 'available',
    locked_by INT NULL, 
    FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id)
        ON DELETE CASCADE
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
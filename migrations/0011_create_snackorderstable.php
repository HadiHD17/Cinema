<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS snack_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    snack_id INT,
    quantity INT,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (snack_id) REFERENCES snacks(id)
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(8,2),
    payment_method ENUM('card', 'paypal', 'split', 'wallet'),
    payer_user_id INT,
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (payer_user_id) REFERENCES users(id)
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
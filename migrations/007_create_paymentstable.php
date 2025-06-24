<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(8,2),
    payment_method ENUM('card', 'paypal', 'split', 'wallet'),
    payer_user_id INT,
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (payer_user_id) REFERENCES users(user_id)
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
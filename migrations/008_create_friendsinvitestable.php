<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS friends_invites (
    invite_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    invited_user_id INT,
    rsvp_status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (invited_user_id) REFERENCES users(user_id)
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
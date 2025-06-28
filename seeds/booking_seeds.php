<?php
require("../connection/connection.php");


$bookings = [
    ['user_id' => 3, 'showtime_id' => 1, 'total_price' => 80, 'status' => 'confirmed'],
    ['user_id' => 3, 'showtime_id' => 2, 'total_price' => 100, 'status' => 'cancelled'],
    ['user_id' => 5, 'showtime_id' => 1, 'total_price' => 120, 'status' => 'confirmed'],
    ['user_id' => 2, 'showtime_id' => 3, 'total_price' => 60, 'status' => 'pending'],
    ['user_id' => 4, 'showtime_id' => 2, 'total_price' => 90, 'status' => 'confirmed']
];

$stmt = $mysqli->prepare("INSERT INTO bookings (
    user_id, 
    showtime_id, 
    total_price, 
    booking_time, 
    status
) VALUES (?, ?, ?, ?, ?)");

foreach ($bookings as $booking) {
    $bookingTime = date('Y-m-d H:i:s');
    
    $stmt->bind_param("iidss", 
        $booking['user_id'],
        $booking['showtime_id'],
        $booking['total_price'],
        $bookingTime,
        $booking['status']
    );
    
    if ($stmt->execute()) {
        echo "Inserted booking for user {$booking['user_id']} at " . $bookingTime . "<br>";
    } else {
        echo "Error inserting booking: " . $stmt->error . "<br>";
    }
}

$stmt->close();
$mysqli->close();
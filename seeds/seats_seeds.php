<?php
require("../connection/connection.php");


$seats = [
    ['showtime_id' => 1, 'seat_label' => '1C', 'status' => 'available'],
    ['showtime_id' => 2, 'seat_label' => '2D', 'status' => 'booked'],
    ['showtime_id' => 1, 'seat_label' => '3C', 'status' => 'booked'],
    ['showtime_id' => 3, 'seat_label' => '1A', 'status' => 'available'],
    ['showtime_id' => 2, 'seat_label' => '5B', 'status' => 'available']
];

$stmt = $mysqli->prepare("INSERT INTO seats (
    showtime_id, 
    seat_label,  
    status
) VALUES (?, ?, ?)");

foreach ($seats as $seat) {
    
    $stmt->bind_param("iss", 
        $seat['showtime_id'],
        $seat['seat_label'],
        $seat['status']
    );
    
    if ($stmt->execute()) {
        echo "Inserted seat for showtime {$seat['showtime_id']} <br>";
    } else {
        echo "Error inserting seat: " . $stmt->error . "<br>";
    }
}

$stmt->close();
$mysqli->close();
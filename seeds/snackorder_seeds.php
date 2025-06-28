<?php
require("../connection/connection.php");

$orders = [
    [
        'booking_id' => 3,
        'snack_id' => 1,
        'quantity' => 5,
        
    ],
    [
        'booking_id' => 3,
        'snack_id' => 2,
        'quantity' => 5,

    ]
];

$stmt = $mysqli->prepare("INSERT INTO snack_orders (
    booking_id,snack_id,quantity
) VALUES (?, ?, ?)");

foreach ($orders as $order) {
    $stmt->bind_param(
        "iii",
        $order['booking_id'],
        $order['snack_id'],
        $order['quantity']
    );
    
    $stmt->execute();
}

$stmt->close();
$mysqli->close();
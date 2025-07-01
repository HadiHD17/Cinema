<?php
require("../connection/connection.php");

$payments = [
    [
        'booking_id' => 6,
        'amount' => 50,
        'payment_method' => 'card',
        'payer_user_id'=>8,
        
    ],
    [
        'booking_id' => 7,
        'amount' => 100,
        'payment_method' => 'paypal',
        'payer_user_id'=>9,
        
    ]
];

$stmt = $mysqli->prepare("INSERT INTO payments (
    booking_id,amount,payment_method,payer_user_id,payment_time
) VALUES (?, ?, ?, ?, ?)");

foreach ($payments as $payment) {
    $payedat = date('Y-m-d H:i:s');
    $stmt->bind_param(
        "iisis",
        $payment['booking_id'],
        $payment['amount'],
        $payment['payment_method'],
        $payment['payer_user_id'],
        $payedat
    );
    
    $stmt->execute();
}

$stmt->close();
$mysqli->close();
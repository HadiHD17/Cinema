<?php
require("../connection/connection.php");

$snacks = [
    [
        'name' => 'popcorn',
        'price' => 20,
        'image' => 'popcorn.jpg',
        
    ],
    [
        'name' => 'soda',
        'price' => 10,
        'image' => 'soda.jpg',

    ]
];

$stmt = $mysqli->prepare("INSERT INTO snacks (
    name,price,image
) VALUES (?, ?, ?)");

foreach ($snacks as $snack) {
    $stmt->bind_param(
        "sds",
        $snack['name'],
        $snack['price'],
        $snack['image']
    );
    
    $stmt->execute();
}

$stmt->close();
$mysqli->close();
<?php
require("../connection/connection.php");

$admins = [
    [
        'username' => 'Hadi',
        'email' => 'hadi@example.com',
        'password' => 'password123',
        
    ],
    [
        'username' => 'Abass',
        'email' => 'abass@example.com',
        'password' => 'securepass',

    ]
];

$stmt = $mysqli->prepare("INSERT INTO admins (
    username, email,password
) VALUES (?, ?, ?)");

foreach ($admins as $admin) {
    $hashedPassword = password_hash($admin['password'], PASSWORD_DEFAULT);
    
    
    $stmt->bind_param(
        "sss",
        $admin['username'],
        $admin['email'],
        $hashedPassword
    );
    
    $stmt->execute();
}

$stmt->close();
$mysqli->close();
<?php
require("../connection/connection.php");

$users = [
    [
        'full_name' => 'Alice Smith',
        'email' => 'alice@example.com',
        'phone' => '70123456',
        'password' => 'password123',
        'BDay' => '1995-06-20',
        'is_verified' => 1,
        'id_document' => 'alice_id.png',
        'favorite_genres' => 'Action,Comedy',
        'comm_pref' => 'email'
    ],
    [
        'full_name' => 'Bob Jones',
        'email' => 'bob@example.com',
        'phone' => '71123456',
        'password' => 'securepass',
        'BDay' => '1990-03-15',
        'is_verified' => 0,
        'id_document' => 'bob_id.jpg',
        'favorite_genres' => 'Horror,Thriller',
        'comm_pref' => 'sms'
    ]
];

$stmt = $mysqli->prepare("INSERT INTO users (
    full_name, email, phone, password, BDay, is_verified, 
    id_document, favorite_genres, comm_pref, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

foreach ($users as $user) {
    $hashedPassword = password_hash($user['password'], PASSWORD_DEFAULT);
    $createdAt = date('Y-m-d H:i:s');
    
    $stmt->bind_param(
        "sssssissss",
        $user['full_name'],
        $user['email'],
        $user['phone'],
        $hashedPassword,
        $user['BDay'],
        $user['is_verified'],
        $user['id_document'],
        $user['favorite_genres'],
        $user['comm_pref'],
        $createdAt
    );
    
    $stmt->execute();
}

$stmt->close();
$mysqli->close();
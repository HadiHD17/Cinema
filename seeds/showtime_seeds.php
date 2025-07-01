<?php
require("../connection/connection.php");

// Sample showtimes data
$showtimes = [
    ['movie_id' => 3, 'auditorium' => 'The Vortex', 'show_date' => '2010-07-16', 'show_time' => '19:00', 'is_peak' => 1],
    ['movie_id' => 1, 'auditorium' => 'Starlight Arena', 'show_date' => '2020-09-02', 'show_time' => '21:00', 'is_peak' => 0],
    ['movie_id' => 2, 'auditorium' => 'Pulse Point', 'show_date' => '2011-07-10', 'show_time' => '14:00', 'is_peak' => 1],
    ['movie_id' => 3, 'auditorium' => 'Cascade Theatre', 'show_date' => '2016-02-02', 'show_time' => '17:00', 'is_peak' => 0]
];

// Prepare the SQL statement
$stmt = $mysqli->prepare("INSERT INTO showtimes (
    movie_id, 
    auditorium, 
    show_date, 
    show_time, 
    is_peak
) VALUES (?, ?, ?, ?, ?)");

if (!$stmt) {
    die("Error preparing statement: " . $mysqli->error);
}

// Insert each showtime
foreach ($showtimes as $showtime) {
    // Validate data (optional but recommended)
    if (!isset($showtime['movie_id']) || $showtime['movie_id'] === null) {
        echo "Error: movie_id is required for showtime<br>";
        continue;
    }

    // Format time to ensure consistency (HH:MM:SS)
    $formatted_time = (strlen($showtime['show_time']) == 5) 
        ? $showtime['show_time'] . ':00' 
        : $showtime['show_time'];

    // Bind parameters
    $stmt->bind_param("isssi", 
        $showtime['movie_id'],
        $showtime['auditorium'],
        $showtime['show_date'],
        $formatted_time,
        $showtime['is_peak']
    );
    
    if ($stmt->execute()) {
        echo "Successfully inserted showtime for movie {$showtime['movie_id']} at {$showtime['show_time']}<br>";
    } else {
        echo "Error inserting showtime: " . $stmt->error . "<br>";
    }
}

$stmt->close();
$mysqli->close();
<?php
require("../connection/connection.php");


$showtimes = [
    ['movie_id' => 3, 'auditorium' => 'The Vortex', 'show_date' => '2010-07-16', 'show_time' => '19:00','is_peak'=>'true'],
    ['movie_id' => 1, 'auditorium' => 'Starlight Arena', 'show_date' => '2020-9-2', 'show_time' => '21:00','is_peak'=>'true'],
    ['movie_id' => 2, 'auditorium' => 'Pulse Point', 'show_date' => '2011-07-10', 'show_time' => '14:00','is_peak'=>'false'],
    ['movie_id' => 3, 'auditorium' => 'Cascade Theatre', 'show_date' => '2016-02-02', 'show_time' => '17:00','is_peak'=>'false']
];

$stmt = $mysqli->prepare("INSERT INTO showtimes (
    movie_id, 
    auditorium, 
    show_date, 
    show_time, 
    is_peak
) VALUES (?, ?, ?, ?, ?)");

foreach ($showtimes as $showtime) {

    $stmt->bind_param("isdtb", 
        $showtime['user_id'],
        $showtime['auditorium'],
        $showtime['show_date'],
        $showtime['show_time'],
        $showtime['is_peak']
    );
    
    if ($stmt->execute()) {
        echo "Inserted showtime for movie {$showtime['movie_id']} <br>";
    } else {
        echo "Error inserting showtime: " . $stmt->error . "<br>";
    }
}

$stmt->close();
$mysqli->close();
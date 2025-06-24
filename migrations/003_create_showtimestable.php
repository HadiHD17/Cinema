<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS showtimes (
    showtime_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    auditorium VARCHAR(50),
    show_date DATE,
    show_time TIME,
    is_peak BOOLEAN DEFAULT 0,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
        ON DELETE CASCADE
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
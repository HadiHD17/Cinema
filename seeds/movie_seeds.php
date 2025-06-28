<?php
require("../connection/connection.php");


$movies = [
    [
        'title' => 'The Shawshank Redemption',
        'description' => 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        'genre' => 'Drama',
        'age_rating' => 'R',
        'trailer_url' => 'https://www.youtube.com/watch?v=6hB3S9bIaco',
        'cast' => 'Tim Robbins, Morgan Freeman, Bob Gunton',
        'release_date' => '1994-09-23',
        'end_date' => '1995-03-23',
        'poster_image' => 'shawshank_poster.jpg'
    ],
    [
        'title' => 'The Dark Knight',
        'description' => 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        'genre' => 'Action, Crime, Drama',
        'age_rating' => 'PG-13',
        'trailer_url' => 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
        'cast' => 'Christian Bale, Heath Ledger, Aaron Eckhart',
        'release_date' => '2008-07-18',
        'end_date' => '2008-12-18',
        'poster_image' => 'dark_knight_poster.jpg'
    ],
    [
        'title' => 'Inception',
        'description' => 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        'genre' => 'Action, Adventure, Sci-Fi',
        'age_rating' => 'PG-13',
        'trailer_url' => 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        'cast' => 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
        'release_date' => '2010-07-16',
        'end_date' => '2010-12-16',
        'poster_image' => 'inception_poster.jpg'
    ]
];


$query = "INSERT INTO movies (
    title, description, genre, age_rating, trailer_url, 
    cast, release_date, end_date, poster_image,created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

$stmt = $mysqli->prepare($query);

foreach ($movies as $movie) {
    $createdAt = date('Y-m-d H:i:s');
    $stmt->bind_param(
        "ssssssssss",
        $movie['title'],
        $movie['description'],
        $movie['genre'],
        $movie['age_rating'],
        $movie['trailer_url'],
        $movie['cast'],
        $movie['release_date'],
        $movie['end_date'],
        $movie['poster_image'],
        $createdAt
    );
    
    if ($stmt->execute()) {
        echo "Successfully inserted: " . $movie['title'] . "<br>";
    } else {
        echo "Error inserting " . $movie['title'] . ": " . $stmt->error . "<br>";
    }
}

$stmt->close();
$mysqli->close();
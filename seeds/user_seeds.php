<?php
require("../connection/connection.php");



$mysqli->query("INSERT INTO users (full_name, email, phone, password, BDay, is_verified, id_document, favorite_genres, comm_pref) 
VALUES ('Alice Smith', 'alice@example.com', '70123456', 'password123', '1995-06-20', 1, 'alice_id.png', 'Action,Comedy', 'email'),
 ('Bob Jones', 'bob@example.com', '71123456', 'securepass', '1990-03-15', 0, 'bob_id.jpg', 'Horror,Thriller', 'sms')");
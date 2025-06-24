<?php
$host = 'localhost';
$dbname = 'cinemadb';
$username = 'root';
$password = 'treble23';

$mysqli=mysqli_connect($host,$username,$password,$dbname);

if(!$mysqli){
    die("connection failed".mysqli_connect_error());
}
?>
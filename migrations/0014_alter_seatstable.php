<?php
require("../connection/connection.php");

$query = "ALTER TABLE seats DROP COLUMN locked_by";

$execute=$mysqli->prepare($query);
$execute->execute();

$execute->close();
$mysqli->close();
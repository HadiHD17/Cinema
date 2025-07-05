<?php

require(__DIR__."/../models/Admin.php");
require(__DIR__."/../models/User.php");
require(__DIR__."/../connection/connection.php");
require(__DIR__."/../models/Booking.php");
require(__DIR__."/../models/Movie.php");
require(__DIR__."/../models/Payment.php");
require(__DIR__."/../models/Seat.php");
require(__DIR__."/../models/Showtime.php");
require(__DIR__."/../models/SnackOrder.php");
require(__DIR__."/../models/Snack.php");
require(__DIR__."/../models/User.php");
require(__DIR__."/../services/ResponseService.php");

$json = file_get_contents('php://input');
$input = json_decode($json, true);
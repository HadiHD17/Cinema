<?php

$apis=[
    '/All_Users' => ['controller'=>'UserController', 'method'=>'GetAllUsers'],
    '/User' => ['controller'=>'UserController', 'method'=>'GetUser'],
    '/Delete_User' => ['controller'=>'UserController', 'method'=>'DeleteUser'],
    '/Update_User' => ['controller'=>'UserController', 'method'=>'UpdateUser'],
    '/Create_User' => ['controller'=>'UserController', 'method'=>'CreateUser'],

    '/All_Movies' => ['controller'=>'MovieController', 'method'=>'GetAllMovies'],
    '/Movie' => ['controller'=>'MovieController', 'method'=>'GetMovie'],
    '/Delete_Movie' => ['controller'=>'MovieController', 'method'=>'DeleteMovie'],
    '/Update_Movie' => ['controller'=>'MovieController', 'method'=>'UpdateMovie'],
    '/Create_Movie' => ['controller'=>'MovieController', 'method'=>'CreateMovie'],
    
    '/All_Showtimes' => ['controller'=>'ShowtimeController', 'method'=>'GetAllShowtimes'],
    '/Showtime' => ['controller'=>'ShowtimeController', 'method'=>'GetShowtime'],
    '/Delete_Showtime' => ['controller'=>'ShowtimeController', 'method'=>'DeleteShowtime'],
    '/Update_Showtime' => ['controller'=>'ShowtimeController', 'method'=>'UpdateShowtime'],
    '/Create_Showtime' => ['controller'=>'ShowtimeController', 'method'=>'CreateShowtime'],

    '/All_Snacks' => ['controller'=>'SnackController', 'method'=>'GetAllSnacks'],
    '/Snack' => ['controller'=>'SnackController', 'method'=>'GetSnack'],
    '/Delete_Snack' => ['controller'=>'SnackController', 'method'=>'DeleteSnack'],
    '/Update_Snack' => ['controller'=>'SnackController', 'method'=>'UpdateSnack'],
    '/Create_Snack' => ['controller'=>'SnackController', 'method'=>'CreateSnack'],

    '/All_SnackOrders' => ['controller'=>'SnackOrderController', 'method'=>'GetAllSnackOrders'],
    '/SnackOrder' => ['controller'=>'SnackOrderController', 'method'=>'GetSnackOrder'],
    '/Delete_SnackOrder' => ['controller'=>'SnackOrderController', 'method'=>'DeleteSnackOrder'],
    '/Update_SnackOrder' => ['controller'=>'SnackOrderController', 'method'=>'UpdateSnackOrder'],
    '/Create_SnackOrder' => ['controller'=>'SnackOrderController', 'method'=>'CreateSnackOrder'],

    '/All_Seats' => ['controller'=>'SeatController', 'method'=>'GetAllSeats'],
    '/Seat' => ['controller'=>'SeatController', 'method'=>'GetSeat'],
    '/Delete_Seat' => ['controller'=>'SeatController', 'method'=>'DeleteSeat'],
    '/Update_Seat' => ['controller'=>'SeatController', 'method'=>'UpdateSeat'],
    '/Create_Seat' => ['controller'=>'SeatController', 'method'=>'CreateSeat'],

    '/All_Payments' => ['controller'=>'PaymentController', 'method'=>'GetAllPayments'],
    '/Payment' => ['controller'=>'PaymentController', 'method'=>'GetPayment'],
    '/Delete_Payment' => ['controller'=>'PaymentController', 'method'=>'DeletePayment'],
    '/Update_Payment' => ['controller'=>'PaymentController', 'method'=>'UpdatePayment'],
    '/Create_Payment' => ['controller'=>'PaymentController', 'method'=>'CreatePayment'],

    '/All_Bookings' => ['controller'=>'BookingController', 'method'=>'GetAllBookings'],
    '/Booking' => ['controller'=>'BookingController', 'method'=>'GetBooking'],
    '/Delete_Booking' => ['controller'=>'BookingController', 'method'=>'DeleteBooking'],
    '/Update_Booking' => ['controller'=>'BookingController', 'method'=>'UpdateBooking'],
    '/Create_Booking' => ['controller'=>'BookingController', 'method'=>'CreateBooking'],

    '/Create_SeatBooking' => ['controller'=>'BookSeatController', 'method'=>'CreateSeatBooking'],

    '/Login' => ['controller'=>'AuthController', 'method'=>'Login'],
    '/Register' => ['controller'=>'AuthController', 'method'=>'Register'],

];
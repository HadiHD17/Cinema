<?php

$apis=[
    '/All_Users' => ['controller'=>'UserController', 'method'=>'GetAllUsers'],
    '/User?{id}' => ['controller'=>'UserController', 'method'=>'GetUser'],
    '/Delete_User?{id}' => ['controller'=>'UserController', 'method'=>'DeleteUser'],
    '/Update_User?{id}' => ['controller'=>'UserController', 'method'=>'UpdateUser'],
    '/Create_User' => ['controller'=>'UserController', 'method'=>'CreateUser'],

    '/All_Movies' => ['controller'=>'MovieController', 'method'=>'GetAllMovies'],
    '/Movie?{id}' => ['controller'=>'MovieController', 'method'=>'GetMovie'],
    '/Delete_Movie?{id}' => ['controller'=>'MovieController', 'method'=>'DeleteMovie'],
    '/Update_Movie?{id}' => ['controller'=>'MovieController', 'method'=>'UpdateMovie'],
    '/Create_Movie' => ['controller'=>'MovieController', 'method'=>'CreateMovie'],
    
    '/All_Showtimes' => ['controller'=>'ShowtimeController', 'method'=>'GetAllShowtimes'],
    '/Showtime?{id}' => ['controller'=>'ShowtimeController', 'method'=>'GetShowtime'],
    '/Delete_Showtime?{id}' => ['controller'=>'ShowtimeController', 'method'=>'DeleteShowtime'],
    '/Update_Showtime?{id}' => ['controller'=>'ShowtimeController', 'method'=>'UpdateShowtime'],
    '/Create_Showtime' => ['controller'=>'ShowtimeController', 'method'=>'CreateShowtime'],

    '/All_Snacks' => ['controller'=>'SnackController', 'method'=>'GetAllSnacks'],
    '/Snack?{id}' => ['controller'=>'SnackController', 'method'=>'GetSnack'],
    '/Delete_Snack?{id}' => ['controller'=>'SnackController', 'method'=>'DeleteSnack'],
    '/Update_Snack?{id}' => ['controller'=>'SnackController', 'method'=>'UpdateSnack'],
    '/Create_Snack' => ['controller'=>'SnackController', 'method'=>'CreateSnack'],

    '/All_SnackOrders' => ['controller'=>'SnackOrderController', 'method'=>'GetAllSnackOrders'],
    '/SnackOrder?{id}' => ['controller'=>'SnackOrderController', 'method'=>'GetSnackOrder'],
    '/Delete_SnackOrder?{id}' => ['controller'=>'SnackOrderController', 'method'=>'DeleteSnackOrder'],
    '/Update_SnackOrder?{id}' => ['controller'=>'SnackOrderController', 'method'=>'UpdateSnackOrder'],
    '/Create_SnackOrder' => ['controller'=>'SnackOrderController', 'method'=>'CreateSnackOrder'],

    '/All_Seats' => ['controller'=>'SeatController', 'method'=>'GetAllSeats'],
    '/Seat?{id}' => ['controller'=>'SeatController', 'method'=>'GetSeat'],
    '/Delete_Seat?{id}' => ['controller'=>'SeatController', 'method'=>'DeleteSeat'],
    '/Update_Seat?{id}' => ['controller'=>'SeatController', 'method'=>'UpdateSeat'],
    '/Create_Seat' => ['controller'=>'SeatController', 'method'=>'CreateSeat'],

    '/All_Payments' => ['controller'=>'PaymentController', 'method'=>'GetAllPayments'],
    '/Payment?{id}' => ['controller'=>'PaymentController', 'method'=>'GetPayment'],
    '/Delete_Payment?{id}' => ['controller'=>'PaymentController', 'method'=>'DeletePayment'],
    '/Update_Payment?{id}' => ['controller'=>'PaymentController', 'method'=>'UpdatePayment'],
    '/Create_Payment' => ['controller'=>'PaymentController', 'method'=>'CreatePayment'],

    '/All_Bookings' => ['controller'=>'BookingController', 'method'=>'GetAllBookings'],
    '/Booking?{id}' => ['controller'=>'BookingController', 'method'=>'GetBooking'],
    '/Delete_Booking?{id}' => ['controller'=>'BookingController', 'method'=>'DeleteBooking'],
    '/Update_Booking?{id}' => ['controller'=>'BookingController', 'method'=>'UpdateBooking'],
    '/Create_Booking' => ['controller'=>'BookingController', 'method'=>'CreateBooking'],

    '/Update_SeatBooking?{id}' => ['controller'=>'BookSeatController', 'method'=>'UpdateSeatBooking'],
    '/Create_SeatBooking' => ['controller'=>'BookSeatController', 'method'=>'CreateSeatBooking'],

    '/Login' => ['controller'=>'AuthController', 'method'=>'Login'],
    '/Register' => ['controller'=>'AuthController', 'method'=>'Register'],

];
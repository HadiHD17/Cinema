<?php 

class BookingService {

    public static function bookingsToArray($bookings_db){
        $results = [];
        foreach($bookings_db as $b){
            $results[] = $b->toArray();
        }
        return $results;
    }
}
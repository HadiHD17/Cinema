<?php 

class ShowtimeService {

    public static function showtimesToArray($showtimes_db){
        $results = [];
        foreach($showtimes_db as $s){
            $results[] = $s->toArray();
        }
        return $results;
    }
}
<?php 

class MovieService {

    public static function moviesToArray($movies_db){
        $results = [];
        foreach($movies_db as $m){
            $results[] = $m->toArray();
        }
        return $results;
    }
}
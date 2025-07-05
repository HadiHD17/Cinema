<?php 

class SnackService {

    public static function snacksToArray($snacks_db){
        $results = [];
        foreach($snacks_db as $s){
            $results[] = $s->toArray();
        }
        return $results;
    }
}
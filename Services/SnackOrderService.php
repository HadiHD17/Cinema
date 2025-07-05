<?php 

class SnackOrderService {

    public static function snackordersToArray($snackorders_db){
        $results = [];
        foreach($snackorders_db as $so){
            $results[] = $so->toArray();
        }
        return $results;
    }
}
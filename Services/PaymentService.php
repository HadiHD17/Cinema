<?php 

class PaymentService {

    public static function paymentsToArray($payments_db){
        $results = [];
        foreach($payments_db as $p){
            $results[] = $p->toArray();
        }
        return $results;
    }
}
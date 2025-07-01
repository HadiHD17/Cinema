<?php
require_once("Model.php");
class BookingSeat extends Model{
    private int $id;
    private int $seat_id;
    private int $booking_id;

    protected static string $table="booking_seats";

    public function __construct(array $data)
    {
        $this->id=$data["id"];
        $this->seat_id=$data["seat_id"];
        $this->booking_id=$data["booking_id"];

        
    }

    public function getId():int{
        return $this->id;
    }
     public function getseatId():int{
        return $this->seat_id;
    }
     public function getbookingId():int{
        return $this->booking_id;
    }


    public function setseatId(int $seatId){
        $this->seat_id=$seatId;
    }
       public function setbookingId(int $bookingId){
        $this->booking_id=$bookingId;
    }

     public function toArray(){
         return [   
        "id" => $this->id,
        "seat_id" => $this->seat_id,
        "booking_id" => $this->booking_id,
    ];
    }

}
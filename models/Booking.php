<?php
require_once("Model.php");
class Booking extends Model{
    private int $id;
    private int $user_id;
    private int $showtime_id;
    private float $total_price;
    private string $booking_time;
    private string $status;
    protected static string $table="bookings";

    public function __construct(array $data)
    {
        $this->id=$data["id"];
        $this->user_id=$data["user_id"];
        $this->showtime_id=$data["showtime_id"];
        $this->total_price=$data["total_price"];
        $this->booking_time=$data["booking_time"];
        $this->status=$data["status"];
        
    }

    public function getId():int{
        return $this->id;
    }
     public function getuserId():int{
        return $this->user_id;
    }
     public function getshowtimeId():int{
        return $this->showtime_id;
    }
     public function gettotalprice():float{
        return $this->total_price;
    }
     public function getbookingtime():string{
        return $this->booking_time;
    }
    public function getstatus():string{
        return $this->status;
    }

    public function setuserId(int $userId){
        $this->user_id=$userId;
    }
       public function setshowtimeId(int $showtimeId){
        $this->showtime_id=$showtimeId;
    }
       public function settotalprice(float $totalprice){
        $this->total_price=$totalprice;
    }
       public function setbookingtime(string $bookingtime){
        $this->booking_time=$bookingtime;
    }
       public function setstatus(string $status){
        $this->status=$status;
    }
     public function toArray(){
        return [$this->id, $this->user_id, $this->showtime_id, $this->total_price,$this->booking_time,$this->status];
    }

}
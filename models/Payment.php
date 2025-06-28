<?php
require_once("Model.php");
class Payment extends Model {
    private int $id;
    private int $user_id;
    private float $amount;
    private string $method;
    private int $booking_id;
    private DateTime $created_at;

    protected static string $table = "payments";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->user_id = $data["user_id"];
        $this->amount = $data["amount"];
        $this->method = $data["method"];
        $this->booking_id = $data["booking_id"];
        $this->created_at = $data["created_at"];
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getuser(): int { 
        return $this->user_id; 
    }
    public function getamount(): float { 
        return $this->amount; 
    }
    public function getmethod(): string {
         return $this->method;
    }
    public function getbooking_id(): int { 
        return $this->booking_id; 
    }
    public function getcreated(): DateTime { 
        return $this->created_at; 
    }

    public function setuser(int $uid) { 
        $this->user_id = $uid; 
    }
    public function setamount(float $amt) { 
        $this->amount = $amt; 
    }
    public function setmethod(string $m) { 
        $this->method = $m; 
    }
    public function setbooking(string $b) { 
        $this->booking_id = $b; 
    }
    public function setcreated(DateTime $c){
        $this->created_at=$c;
    }

    public function toArray() {
        return [
            $this->id,
            $this->user_id,
            $this->amount,
            $this->method,
            $this->booking_id,
            $this->created_at
        ];
    }
}

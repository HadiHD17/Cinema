<?php
require_once("Model.php");
class Payment extends Model {
    private int $id;
    private int $payer_user_id;
    private float $amount;
    private string $payment_method;
    private int $booking_id;
    private string $payment_time;

    protected static string $table = "payments";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->payer_user_id = $data["payer_user_id"];
        $this->amount = $data["amount"];
        $this->payment_method = $data["payment_method"];
        $this->booking_id = $data["booking_id"];
        $this->payment_time = $data["payment_time"];
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getuser(): int { 
        return $this->payer_user_id; 
    }
    public function getamount(): float { 
        return $this->amount; 
    }
    public function getmethod(): string {
         return $this->payment_method;
    }
    public function getbooking_id(): int { 
        return $this->booking_id; 
    }
    public function getcreated(): string { 
        return $this->payment_time; 
    }

    public function setuser(int $uid) { 
        $this->payer_user_id = $uid; 
    }
    public function setamount(float $amt) { 
        $this->amount = $amt; 
    }
    public function setmethod(string $m) { 
        $this->payment_method = $m; 
    }
    public function setbooking(string $b) { 
        $this->booking_id = $b; 
    }
    public function setcreated(string $c){
        $this->payment_time=$c;
    }

    public function toArray() {
        return [
            $this->id,
            $this->payer_user_id,
            $this->amount,
            $this->payment_method,
            $this->booking_id,
            $this->payment_time
        ];
    }
}

<?php
require_once("Model.php");
class SnackOrder extends Model {
    private int $id;
    private int $booking_id;
    private int $snack_id;
    private int $quantity;
    

    protected static string $table = "snackorders";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->booking_id = $data["booking_id"];
        $this->snack_id = $data["snack_id"];  
        $this->quantity = $data["quantity"];
        
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getbooking(): int { 
        return $this->booking_id; 
    }
    public function getsnack(): int { 
        return $this->snack_id; 
    }
    public function getquantity(): int { 
        return $this->quantity; 
    }


    public function setbooking(int $id) { 
        $this->booking_id = $id; 
    }
    public function setsnack(int $id) { 
        $this->snack_id = $id; 
    }
    public function setquantity(int $q) { 
        $this->quantity = $q; 
    }
    

    public function toArray() {
        return [
            $this->id,
            $this->booking_id,
            $this->snack_id,
            $this->quantity
        ];
    }
}

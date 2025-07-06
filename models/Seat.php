<?php
require_once("Model.php");
class Seat extends Model {
    private int $id;
    private int $showtime_id;
    private string $seat_label;
    private string $status;
    

    protected static string $table = "seats";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->showtime_id = $data["showtime_id"];
        $this->seat_label = $data["seat_label"];
        $this->status = $data["status"];
        
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getshowtime(): int {
        return $this->showtime_id; 
    }
    public function getlabel(): string { 
        return $this->seat_label; 
    }
    public function getstatus(): string { 
        return $this->status; 
    }
    

    public function setshowtime(int $id) { 
        $this->showtime_id = $id; 
    }
    public function setlabel(string $L) { 
        $this->seat_label = $L; 
    }
    public function setstatus(string $s) { 
        $this->status = $s; 
    }
    

    public function toArray() {
        return [
            "id"=>$this->id,
            "showtime_id"=>$this->showtime_id,
            "seat_label"=>$this->seat_label,
            "status"=>$this->status
            
        ];
    }

    public static function updateStatus(int $seat_id, string $status="booked"){
        $sql = "UPDATE seats SET status = ? WHERE id = ?";
        $query = static::$db->prepare($sql);
        if (!$query) throw new Exception(static::$db->error);
        $query->bind_param("si", $status, $seat_id);
        $query->execute();
        $query->close();
    }


}

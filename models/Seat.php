<?php
require_once("Model.php");
class Seat extends Model {
    private int $id;
    private int $showtime_id;
    private string $label;
    private string $status;
    private int $locked_by;

    protected static string $table = "seats";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->showtime_id = $data["showtime_id"];
        $this->label = $data["label"];
        $this->status = $data["status"];
        $this->locked_by = $data["locked_by"];
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getshowtime(): int {
        return $this->showtime_id; 
    }
    public function getlabel(): string { 
        return $this->label; 
    }
    public function getstatus(): string { 
        return $this->status; 
    }
    public function getlocked_by(): int { 
        return $this->locked_by; 
    }

    public function setshowtime(int $id) { 
        $this->showtime_id = $id; 
    }
    public function setlabel(string $L) { 
        $this->label = $L; 
    }
    public function setstatus(string $s) { 
        $this->status = $s; 
    }
    public function setlocked(int $lock) { 
        $this->locked_by = $lock; 
    }

    public function toArray() {
        return [
            $this->id,
            $this->showtime_id,
            $this->label,
            $this->status,
            $this->locked_by
        ];
    }
}

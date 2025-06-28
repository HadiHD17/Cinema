<?php
require_once("Model.php");
class Pricerule extends Model {
    private int $id;
    private string $rule_type;
    private string $value_type;
    private float $amount;
    private string $condition;

    protected static string $table = "pricelist";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->rule_type = $data["rule_type"];
        $this->value_type = $data["value_type"];
        $this->amount = $data["amount"];
        $this->condition=$data["condition"];
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getrule(): string { 
        return $this->rule_type; 
    }
    public function getvalue(): string { 
        return $this->value_type; 
    }
    public function getamount(): float { 
        return $this->amount; 
    }
    public function getcondition(): string{ 
        return $this->condition;
    }

    public function setrule(string $r) { 
        $this->rule_type = $r; 
    }
    public function setvalue(string $v) {
        $this->value_type = $v; 
    }
    public function setamount(float $a) { 
        $this->amount = $a; 
    }
    public function setcondition(string $c){ 
        $this->condition=$c;
    }

    public function toArray() {
        return [
            $this->id,
            $this->rule_type,
            $this->value_type,
            $this->amount,
            $this->condition
        ];
    }
}

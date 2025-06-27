<?php
class Snack extends Model {
    private int $id;
    private string $name;
    private float $price;
    private string $image;

    protected static string $table = "snacks";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->name = $data["name"];
        $this->price = $data["price"];
        $this->image = $data["image"];
    }

    public function getid(): int { return $this->id; }
    public function getname(): string { return $this->name; }
    public function getprice(): float { return $this->price; }
    public function getimage(): string { return $this->image; }

    public function setname(string $n) { $this->name = $n; }
    public function setprice(float $p) { $this->price = $p; }
    public function setimage(string $i) { $this->image = $i; }

    public function toArray() {
        return [
            $this->id,
            $this->name,
            $this->price,
            $this->image
        ];
    }
}

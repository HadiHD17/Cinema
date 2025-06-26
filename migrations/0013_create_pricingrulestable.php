<?php
require("../connection/connection.php");

$query="CREATE TABLE IF NOT EXISTS pricing_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rule_type ENUM('peak', 'offpeak', 'coupon', 'member', 'lastminute'),
    value_type ENUM('percent', 'fixed'),
    amount DECIMAL(6,2),
    `condition` TEXT
)";

$execute=$mysqli->prepare($query);
$execute->execute();
?>
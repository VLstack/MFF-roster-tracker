<?php

$rnd = rand(0,100);

// 90-100 => error
if ( $rnd >= 90 )
{
 $arr = array("success" => FALSE, "error" => rand(1,3));
}
// 50+ => gear
else if ( $rnd >= 50 )
{
 $char_list = array("warwolf" => 4);
 // ambigous 50%
 if ( rand(0, 100) > 50 ) { $char_list["hulk"] = 2; }
 $arr = array("content" => array("gear_val" => array(array("val" => 8.0, "type" => "critical_damage"),
                                                     array("val" => 34.0, "type" => "critical_rate"),
                                                     array("val" => 66.0, "type" => "critical_rate"),
                                                     array("val" => 99.0, "type" => "skill_cooldown"),
                                                     array("val" => 143.0, "type" => "critical_damage"),
                                                     array("val" => 194.0, "type" => "critical_damage"),
                                                     array("val" => 257.0, "type" => "critical_damage"),
                                                     array("val" => 331.0, "type" => "defense_penetration")),
                                 "char_list" => $char_list),
              "type" => "gear",
              "success" => TRUE);
}
// else => details
else
{
 $arr = array("content" => array("tier" => 2, "uniform" => "cacw",
                                 "phys_att" => 12060, "phys_def" => 6239,
                                 "id" => "agent_13", "energy_att" => 5729,
                                 "defpen" => 32.92, "hp" => 24225,
                                 "energy_def" => 5293, "atkspeed" => 109.69,
                                 "debuff" => 4.83, "crit_rate" => 69.83,
                                 "dodge" => 14.3, "recorate" => 212.25,
                                 "scd" => 24.9, "critdamage" => 166.86,
                                 "ignore_dodge" => 10.0, "movspeed" => 100.0),
              "success" => TRUE,
              "type" => "details");
}

sleep(rand(1,5));
echo json_encode($arr);
?>
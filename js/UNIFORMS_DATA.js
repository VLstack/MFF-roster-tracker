/* global MFF */
MFF.UNIFORMS.DATA =
{
 "aaou" : "Avengers: Age of Ultron",
 "aaou_blast" : "Avengers: Age of Ultron (blast)",
 "aaou_combat" : "Avengers: Age of Ultron (combat)",
 "aaou_speed" : "Avengers: Age of Ultron (speed)",
 "annihilation" : "Annihilation",
 "armored" : "Armored",
 "an" : "All-new",
 "anad" : "All-new, All-different",
 "anca" : "All-new Captain America",
 "ati" : "Avengers: The initiative",
 "avengers" : "The avengers",
 "ca" : "Captain America",
 "ca_75" : "Captain America 75th anniversary",
 "cacw" : "Captain America: Civil war",
 "capdoc" : "Capdoc",
 "catfa" : "Captain America: The first avenger",
 "catws" : "Captain America: The winter soldier",
 "classic" : "Classic",
 "classic_70" : "70's classic",
 "claws" : "Claws",
 "doc_strange" : "Doctor Strange",
 "dohk" : "Devil of Hell's kitchen",
 "gg" : "Guardians of the galaxy",
 "hda" : "Heavy duty armor",
 "ha" : "Heroic age",
 "howling" : "The howling commandos of S.H.I.E.L.D.",
 "infinity" : "Infinity",
 "iar" : "Inhumans : Attilan rising",
 "ip" : "Iron Patriot",
 "karachi" : "Karachi costume",
 "ll" : "Lady Loki",
 "mam" : "Marvel's Ant-man",
 "maos" : "Marvel's agents of S.H.I.E.L.D.",
 "maosq" : "Marvel's agents of S.H.I.E.L.D. (Quake)",
 "md" : "Marvel's Daredevil",
 "mif" : "Marvel's Iron Fist",
 "mlc" : "Marvel's Luke Cage",
 "modern" : "Modern",
 "modern2" : "Modern",
 "ms_marvel" : "Ms. Marvel",
 "na" : "New Avengers",
 "noir" : "Noir",
 "now" : "Marvel now!",
 "prometheus" : "Prometheus",
 "sa" : "Space armor",
 "spidoc" : "Spidoc",
 "ssm" : "Superior Spider-man",
 "sw_armor_wars" : "Secret wars: Armor wars",
 "sw_a_force" : "Secret wars: A-force",
 "sw_carol_corp" : "Secret wars: Captain Marvel & The Carol corp",
 "sw_future" : "Secret wars: Future imperfect",
 "sw_red_skull" : "Secret wars: Red skull",
 "sw_renew" : "Secret wars: Renew your vows",
 "sw_thors" : "Secret wars: Thors",
 "sw_zombies" : "Secret wars: Marvel zombies",
 "sw_1602" : "Secret wars: 1602 witch hunter angela",
 "sw_1872" : "Secret wars: 1872",
 "sw_2099" : "Secret wars: 2099",
 "tah" : "Totally awesome Hulk",
 "ttdw" : "Thor: The dark world",
 "ultimate" : "Ultimate",
 "unleashed" : "Monsters unleashed!",
 "unworthy" : "Unworthy",
 "websuit" : "Web suit",
 "wj" : "War journal",
 "warofking" : "War of king",
 "wwh" : "World War Hulk"
};

MFF.UNIFORMS.RANKS =
{
 "unowned" :   { "order" : -1, "label" : "not owned", "percent" : 0 },
 "normal" :    { "order" : 0, "label" : "normal", "percent" : 10 },
 "advanced" :  { "order" : 1, "label" : "advanced", "percent" : 18 },
 "rare" :      { "order" : 2, "label" : "rare", "percent" : 26 },
 "heroic" :    { "order" : 3, "label" : "heroic", "percent" : 34 },
 "legendary" : { "order" : 4, "label" : "legendary", "percent" : 42 },
 "mythical" :  { "order" : 5, "label" : "mythical", "percent" : 50 }
};

MFF.UNIFORMS.RANKS_PROGRESSIONS =
{
 "A" : { "normal" : 0, "advanced" : 249, "rare" : 418, "heroic" : 572, "legendary" : 741, "mythical" : 1067 },
 "B" : { "normal" : 0, "advanced" : 84,  "rare" : 140, "heroic" : 191, "legendary" : 248, "mythical" : 357 },
 "C" : { "normal" : 0, "advanced" : 76,  "rare" : 123, "heroic" : 171, "legendary" : 225, "mythical" : 329 },
 "D" : { "normal" : 0, "advanced" : 292, "rare" : 490, "heroic" : 671, "legendary" : 868, "mythical" : 1251 }
};

MFF.UNIFORMS.RANKS_OPTIONS =
[
 // 0 : advanced
 {
  "atkspeed" : { "min" : 448,  "max" : 522, "progress" : "A" },
  "movspeed" : { "min" : 448,  "max" : 522, "progress" : "A" },
  "scd" :      { "min" : 448,  "max" : 522, "progress" : "A" },
  // QUESTION : debuf == crowd control time ??
  "debuff" :   { "min" : 448,  "max" : 522, "progress" : "A" },
  "dodge" :    { "min" : 448,  "max" : 522, "progress" : "A" }
 },
 // 1 : rare
 {
  "attack_physical" :  { "min" : 180, "max" : 210, "progress" : "B" },
  "attack_energy" :    { "min" : 180, "max" : 210, "progress" : "B" },
  "defense_physical" : { "min" : 157, "max" : 183, "progress" : "C" },
  "defense_energy" :   { "min" : 157, "max" : 183, "progress" : "C" },
  "hp" :               { "min" : 630, "max" : 735, "progress" : "D" }
 },
 // 2 : heroic
 {
  "recorate" : { "min" : 571,  "max" : 666, "progress" : "A" },
  "defpen" :   { "min" : 571,  "max" : 666, "progress" : "A" },
  "scd" :      { "min" : 571,  "max" : 666, "progress" : "A" },
  "hp" :       { "min" : 670,  "max" : 782, "progress" : "D" },
  "atkspeed" : { "min" : 571,  "max" : 666, "progress" : "A" }
 },
 // 3 : legendary
 {
  "defense_physical" : { "min" : 183, "max" : 214, "progress" : "C" },
  "defense_energy" :   { "min" : 183, "max" : 214, "progress" : "C" },
  "defense_all" :      { "min" : 183, "max" : 214, "progress" : "C" },
  "dodge" :            { "min" : 605, "max" : 706, "progress" : "A" },
  "movspeed" :         { "min" : 605, "max" : 706, "progress" : "A" }
 },
 // 4 : mythical
 {
  "attack_physical" : { "min" : 214, "max" : 249, "progress" : "B" },
  "attack_energy" :   { "min" : 214, "max" : 249, "progress" : "B" },
  "attack_all" :      { "min" : 214, "max" : 249, "progress" : "B" },
  "critrate" :        { "min" : 639, "max" : 747, "progress" : "A" },
  "critdamage" :      { "min" : 639, "max" : 747, "progress" : "A" }
 }
];

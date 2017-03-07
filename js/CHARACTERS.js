/* global MFF */
MFF.UNIFORMS =
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
 "ati" : "Avengers : The initiative",
 "attilanrising" : "Inhumans: Attilan rising",
 "avengers" : "The avengers",
 "ca" : "Captain America",
 "ca_75" : "Captain America 75th anniversary",
 "cacw" : "Captain America : Civil war",
 "capdoc" : "Capdoc",
 "catfa" : "Captain America : The first avenger",
 "catws" : "Captain America : The winter soldier",
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
 "mam" : "Marvel's ant-man",
 "maos" : "Marvel's agents of shield",
 "maosq" : "Marvel's agents of shield (Quake)",
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
 "sw_armor_wars" : "Secret wars : Armor wars",
 "sw_a_force" : "Secret wars : A-force",
 "sw_carol_corp" : "Secret wars : Captain Marvel & The carol corp",
 "sw_future" : "Secret wars : Future imperfect",
 "sw_red_skull" : "Secret wars : Red skull",
 "sw_renew" : "Secret wars : Renew your vows",
 "sw_thors" : "Secret wars : Thors",
 "sw_zombies" : "Secret wars : Marvel zombies",
 "sw_1602" : "Secret wars: 1602 witch hunter angela",
 "sw_1872" : "Secret wars: 1872",
 "sw_2099" : "Secret wars: 2099",
 "tah" : "Totally awesome Hulk",
 "ttdw" : "Thor : The dark world",
 "ultimate" : "Ultimate",
 "unleashed" : "Monsters unleashed!",
 "unworthy" : "Unworthy",
 "websuit" : "Web suit",
 "wj" : "War journal",
 "warofking" : "War of king",
 "wwh" : "World War Hulk"
};


MFF.CHARACTERS =
{
"_all" : {},
"set" : function(character, data)
{
 if ( !data ) { data = MFF.CHARACTERS.getEmpty(); }
 MFF.CHARACTERS._all[character] = data;
},
"getEmpty" : function(character)
{
 return {
         "id" : character,
         "uniform" : MFF.CHARACTERS.DATA[character].uniform,
         "level" : 0,
         "tier" : MFF.CHARACTERS.DATA[character].tiers[0],
         "attack" : { "physical" : 0, "energy" : 0 }, // 1.9 transformation
         "defense" : { "physical" : 0, "energy" : 0 }, // 1.7 addition
         "hp" : 0, // 1.7 addition
         "dodge" : 0, // 1.7 addition
         "ignore_dodge" : 0, // 1.7 addition
         "defpen" : 0, // 1.7 addition
         "scd" : 0, // 1.7 addition
         "critrate" : 0, // 1.7 addition
         "critdamage" : 0, // 1.7 addition
         "atkspeed" : 0, // 1.8 addition
         "recorate" : 0, // 1.8 addition
         "movspeed" : 0, // 1.8 addition
         "debuff" : 0, // 1.8 addition
         "skills" : [0, 0, 0, 0, 0],
         // NB : ES6 not activated yet until IE11 support drop
         //"gear" : Array(4).fill(Array(8).fill({ "type" : "", "val" : 0, "pref" : false, "percent" : 0 }))
         "gear" : [0, 0, 0, 0].map(function()
                                   {
                                    return [0, 0, 0, 0, 0, 0, 0, 0].map(function()
                                                                        {
                                                                         return { "type" : "", "val" : 0, "pref" : false, "percent" : 0 };
                                                                        });
                                   })
        };
},
"get" : function(character)
{
 var data, physical, energy;
 if ( !(character in MFF.CHARACTERS._all) ) { return MFF.CHARACTERS.getEmpty(character); }
 data = MFF.CHARACTERS._all[character];
 data.id = character;
 if ( !("defense" in data) ) { data.defense = { "physical" : 0, "energy" : 0 }; } // compatibility 1.6 to 1.7
 if ( !("hp" in data) ) { data.hp = 0; } // compatibility 1.6 to 1.7
 if ( !("critrate" in data) ) { data.critrate = 0; } // compatibility 1.6 to 1.7
 if ( !("critdamage" in data) ) { data.critdamage = 0; } // compatibility 1.6 to 1.7
 if ( !("dodge" in data) ) { data.dodge = 0; } // compatibility 1.6 to 1.7
 if ( !("ignore_dodge" in data) ) { data.ignore_dodge = 0; } // compatibility 1.6 to 1.7
 if ( !("defpen" in data) ) { data.defpen = 0; } // compatibility 1.6 to 1.7
 if ( !("scd" in data) ) { data.scd = 0; } // compatibility 1.6 to 1.7
 if ( !("atkspeed" in data) ) { data.atkspeed = 0; } // compatibility 1.7 to 1.8
 if ( !("recorate" in data) ) { data.recorate = 0; } // compatibility 1.7 to 1.8
 if ( !("movspeed" in data) ) { data.movspeed = 0; } // compatibility 1.7 to 1.8
 if ( !("debuff" in data) ) { data.debuff = 0; } // compatibility 1.7 to 1.8
 if ( data.attack && !("physical" in data.attack) ) // compatibility 1.8 to 1.9
 {
  physical = 0;
  energy = 0;
  if ( ("total" in data.attack) && data.attack.total )
  {
   physical = MFF.CHARACTERS.DATA[character].uniforms[data.uniform].attackBase == "physical" ? parseInt(data.attack.total) || 0 : 0;
   energy = MFF.CHARACTERS.DATA[character].uniforms[data.uniform].attackBase == "energy" ? parseInt(data.attack.total) || 0 : 0;
  }
  data.attack = { "physical" : physical, "energy" : energy };
 }
 return data;
},
"getAll" : function() { return MFF.CHARACTERS._all; },
"setAll" : function(all) { MFF.CHARACTERS._all = all; },
"setProperty" : function(character, data)
{
 if ( !(character in MFF.CHARACTERS._all) ) { MFF.CHARACTERS.set(character); }
 switch ( data.mode )
 {
  case "gear" :
   MFF.CHARACTERS._all[character].gear[data.gear][data.gearIndex] = { "type" : data.type, "val" : data.val, "pref" : data.pref, "percent" : data.percent };
  break;
  case "level" :
   MFF.CHARACTERS._all[character].level = parseInt(data.level) || 0;
  break;
  case "tier" :
   MFF.CHARACTERS._all[character].tier = parseInt(data.tier) || 1;
  break;
  case "attack" :
   MFF.CHARACTERS._all[character].attack.physical = parseInt(data.physical) || 0;
   MFF.CHARACTERS._all[character].attack.energy = parseInt(data.energy) || 0;
  break;
  case "defense" :
   MFF.CHARACTERS._all[character].defense.physical = parseInt(data.physical) || 0;
   MFF.CHARACTERS._all[character].defense.energy = parseInt(data.energy) || 0;
  break;
  case "skill" :
   MFF.CHARACTERS._all[character].skills[parseInt(data.skill)] = parseInt(data.lvl) || 0;
  break;
  case "uniform" :
   MFF.CHARACTERS._all[character].uniform = data.uniform;
  break;
  case "attribute" :
   MFF.CHARACTERS._all[character][data.type] = data.value;
  break;
 }
}
};

MFF.CHARACTERS.DATA =
{
"agent_13" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Agent 13", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Sliding Kick", "Back flip attack", "Covering Fire", "Backup", "Extreme Diversion"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "cacw" :   { "name" : "Agent 13", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Sliding Kick", "Air Bullets", "Covering Fire", "Backup", "Extreme Diversion"], "bonus" : ["Apply to: Self","Increase chain hit damage by 10% when you attack"] }
                      }
                     },
"ancient_one" :      {
                       "uniform" : "modern",
                       "tiers" : [1, 2],
                       "uniforms" :
                       {
                        // TODO : image need to be recreated from game
                         "modern" :      { "name" : "Ancient One", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Mystic discharge", "Mystic energy", "Ancient cure", "Inner self", "Ancient enchantment"], "bonus" : null },
                        // TODO : image need to be recreated from game
                         "doc_strange" : { "name" : "Ancient One", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Mystic discharge", "Mystic energy", "Ancient cure", "Inner self", "Ancient enchantment"], "bonus" : ["Apply to: Self", "Increase all debuffs effect by 15%", "Increase all buffs effect by 15%"] }
                        }
                      },
"angela" :           {
                      "uniform" : "modern",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :  { "name" : "Angela", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Angel's War Rage", "Blades of Ichor", "Sword blow", "Avenging angel", "Entangle"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_1602" : { "name" : "Angela", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Angel's War Rage", "Blades of Ichor", "Sword blow", "Avenging angel", "Entangle"], "bonus" : ["Apply to: Self", "20% damage boost against BLAST type"] },
                       // TODO : image need to be recreated from game
                       "anad" :    { "name" : "Angela", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Angel's War Rage", "Blades of Ichor", "Sword blow", "Avenging angel", "Entangle"], "bonus" : ["Apply to: Self", "Increase fire damage by 10%"] }
                      }
                     },
"ant_man" :          {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Ant man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Pym punch", "Speeding bullet", "Bug squash", "Flying rush", "Pym discs"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "mam" :    { "name" : "Ant man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Pym punch", "Speeding bullet", "Bug squash", "Flying rush", "Pym discs"], "bonus" : ["Activation rate: when using MINIATURIZE buff", "Apply to: Self", "Dodge +5% (20 sec.)", "All attack +10% (20 sec.)", "Cooldown time 30 seconds"] },
                       // TODO : image need to be recreated from game
                       "cacw" :   { "name" : "Ant man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Pym punch", "Speeding bullet", "Bug squash", "Flying rush", "Size matters"], "bonus" : ["Apply to: Self", "All attack +3%", "Immune to guard break"] }
                      }
                     },
"black_bolt" :       {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :        { "name" : "Black bolt", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Electron channeling", "Anti-gravitational dash", "Power word", "Brutal whisper", "Quasi-sonic scream"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" :          { "name" : "Black bolt", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Electron channeling", "Anti-gravitational dash", "Power word", "Brutal whisper", "Quasi-sonic scream"], "bonus" : ["Activation rate: when skill (normal attack excluded) is used", "Apply to: Self", "1 attacks activate guard break (3 sec.)", "Cooldown time 7 seconds"] },
                       "attilanrising" : { "name" : "Black bolt", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Electron channeling", "King's order", "Power word", "Brutal whisper", "Quasi-sonic scream"], "bonus" : ["Activation rate: when skill (normal attack excluded) is used", "Apply to: Self", "Increase damage by 120% for 1 attack (5 sec.)", "Cooldown time 8 seconds"] }
                      }
                     },
"black_cat" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Black cat", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "speed", "skills" : ["Cat scratch", "Acrobatic kick", "Catlike reflex", "Cat hunt", "Cat lash"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "claws" :  { "name" : "Black cat", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "speed", "skills" : ["Cat scratch", "Acrobatic kick", "Catlike reflex", "Cat hunt", "Cat lash"], "bonus" : ["Apply to: Self", "Increase chain hit damage by 5% when you attack"] },
                       // TODO : image need to be recreated from game
                       "anad" :   { "name" : "Black cat", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "speed", "skills" : ["Cat scratch", "Heel kick", "Lucky streak", "Nine lives", "Cat lash"], "bonus" : ["Apply to: Self", "Increase chain hit damage by 3% when you attack", "Increased effect of misfortune skill"] }
                      }
                     },
"black_dwarf" :      {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" : { "name" : "Black dwarf", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Axe Lunge", "Executioner", "Axe Slam", "Wind Blade", "Eviscerator"], "bonus" : null }
                      }
                     },
"black_panther" :    {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Black panther", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Energy spear", "Claw slash", "Energy dagger", "Essence of the panther", "Unseen predator"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "cacw" :   { "name" : "Black panther", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Energy spear", "Claw slash", "Energy dagger", "Essence of the panther", "Unseen predator"], "bonus" : ["Increase bleed damage"] }
                      }
                     },
"black_widow" :      {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" : { "name" : "Black widow", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Widow's bite", "Acrobatic assault", "Infiltrator", "Systema", "Coup de grâce"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "aaou" :     { "name" : "Black widow", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Widow's bite", "Acrobatic assault", "Infiltrator", "Systema", "Coup de grâce"], "bonus" : ["Activation rate: when dodging", "Apply to: Self", "Critical damage +25% (10 sec.)", "Critical rate +25% (10 sec.)", "Cooldown time 20 seconds"] },
                       // TODO : image need to be recreated from game
                       "sw_2099" :  { "name" : "Black widow", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Widow's bite", "Acrobatic assault", "Infiltrator", "Systema", "Coup de grâce"], "bonus" : ["Activation rate: when dodging", "Apply to: Self", "Critical damage +20% (10 sec.)", "Critical rate +20% (10 sec.)", "Range increase for skill: Widow's bite", "Cooldown time 20 seconds"] },
                       // TODO : image need to be recreated from game
                       "cacw" :     { "name" : "Black widow", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Widow's bite", "Acrobatic assault", "Pistol strafe", "Systema", "Coup de grâce"], "bonus" : ["Activation rate: when dodging", "Apply to: Self", "Critical damage +20% (10 sec.)", "Critical rate +20% (10 sec.)", "Add paralysis effect to Widow's bite skill", "Cooldown time 20 seconds"] }
                      }
                     },
"blade" :            {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :     { "name" : "Blade", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Sword edge", "Sword of storm", "Catching weak point", "Blood haze", "Hemorrhage"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "classic_70" : { "name" : "Blade", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Sword edge", "Sword of storm", "Catching weak point", "Blood haze", "Hemorrhage"], "bonus" : ["Sword edge reduce enemies physical defense"] }
                      }
                     },
"bullseye" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :  { "name" : "Bullseye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Trick of card", "Storm of sword", "Assassination", "Card storm", "Madness knife"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_1872" : { "name" : "Bullseye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Trick of card", "Storm of sword", "Assassination", "Deadeye", "Madness knife"], "bonus" : ["Apply to: Self", "Ignore dodge 50%"] }
                      }
                     },
"captain_america" :  {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" : { "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "aaou" :     { "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"], "bonus" : ["Activation rate: 25% when hit", "Apply to: Self", "Immune to all damage (5 sec.)", "Cooldown time 20 seconds"] },
                       // TODO : image need to be recreated from game
                       "sw_2099" :  { "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"], "bonus" : ["Activation rate: 15% when hit", "Apply to: Self", "Immune to all damage (5 sec.)", "More ricochet for skill: Shield throw", "Cooldown time 20 seconds"] },
                       // TODO : image need to be recreated from game
                       "catws" :    { "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"], "bonus" : ["Activation rate: 25% when hit", "Apply to: Self", "Immune to all damage (5 sec.)", "Add guard break effect on skill: Valor", "Cooldown time 20 seconds"] },
                       // TODO : image need to be recreated from game
                       "cacw" :     { "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"], "bonus" : ["Activation rate: 25% when hit", "Apply to: Self", "Immune to all damage (5 sec.)", "Add guard break effect on skill: Valor", "When using Ready for battle, summon Winter solder", "Cooldown time 20 seconds"] },
                       // TODO : image need to be recreated from game
                       "now" :      { "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Shield throw", "Valor", "Shield of valor", "Shield strike", "Heroic fury"], "bonus" : ["Activation rate: 45% when hit", "Apply to: Self", "Immune to all damage (3 sec.)", "Add guard break effect on skill: Valor", "Cooldown time 7 seconds"] }
                      }
                     },
"captain_marvel" :   {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :        { "name" : "Captain marvel", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Mighty straight", "Backflip blast", "Photon blast", "Binary explosion", "Radiant form"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_carol_corp" : { "name" : "Captain marvel", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Mighty straight", "Backflip blast", "Photon blast", "Binary explosion", "Radiant form"], "bonus" : ["Add guard break effect on skill: Might straight", "7 second increase to duration of Radiant form"] },
                       // TODO : image need to be recreated from game
                       "ms_marvel" :     { "name" : "Captain marvel", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Mighty straight", "Backflip blast", "Photon blast", "Binary explosion", "Radiant form"], "bonus" : ["Add 1 extra hit attack to the Backflip blast skill", "3 second increase to duration of Radiant form"] }
                      }
                     },
"carnage" :          {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Carnage", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Weapon Manipulation", "Devouring Maniac", "Camouflage Strike", "Carnage Strike", "Insanity Strike"], "bonus" : null }
                      }
                     },
"clea" :             {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Clea", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "universal", "skills" : ["Mystic radiance", "Mystic dragon", "Mystic shuffle", "Mystic storm", "Mystic mirage"], "bonus" : null }
                      }
                     },
"corvus_glaive" :    {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" : { "name" : "Corvus glaive", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Boogeyman", "Pain Wheel", "Piercing Strike", "Deadly Charge", "Peek-a-boo"], "bonus" : null }
                      }
                     },
"crossbones" :       {
                      "uniform" : "cacw",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "cacw" :   { "name" : "Crossbones", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Gauntlet punch", "Hitman", "Air combo", "Specialist", "Air strike"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Crossbones", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Gauntlet punch", "Mercenary stash", "Air combo", "Specialist", "Light'em up"], "bonus" : ["Apply to: Self", "Critical rate +15%"] }
                      }
                     },
"crystal" :          {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "anad" : { "name" : "Crystal", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Cyclone", "Flame manipulation", "Waterspout", "Elemental fusion", "Veil of the Earth"], "bonus" : null }
                      }
                     },
"daisy_johnson" :    {
                      "uniform" : "maos",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :   { "name" : "Daisy Johnson", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Pulse punch", "A real stunner", "More bang for your punch", "Vibrations", "Quake"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Quake", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Pulse punch", "A real stunner", "More bang for your punch", "Vibrations", "Quake"], "bonus" : ["Apply to: Self", "Mind damage immune"] },
                       // TODO : image need to be recreated from game
                       "maosq" :  { "name" : "Daisy Johnson", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Pulse punch", "A real stunner", "More bang for your punch", "Vibrations", "Quake"], "bonus" : ["Additional strike for skill: More bang for your punch"] }
                      }
                     },
"daredevil" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Daredevil", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Billy club shot", "Blind strike", "Club swing", "Staff splash", "Blind sided"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "dohk" :   { "name" : "Daredevil", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Billy club shot", "Blind strike", "Club swing", "Staff splash", "Blind sided"], "bonus" : ["Activation rate: when enemies are within 3m range", "Apply to: Enemy", "Blind (5 sec.)", "20% chance for melee enemy to miss"] },
                       // TODO : image need to be recreated from game
                       "anad" :   { "name" : "Daredevil", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Billy club shot", "Blind strike", "Billy club", "Staff splash", "Blind sided"], "bonus" : ["Activation rate: when dodging", "Apply to: Self", "All speed +20% (10 sec.)", "Cooldown time 15 seconds"] }
                      }
                     },
"deathlok" :         {
                      "uniform" : "maos",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :   { "name" : "Deathlok", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Tactical shoot-out", "Covering fire", "S.H.I.E.L.D. soldier", "Upgraded missile", "Perfect shot"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Deathlok", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Tactical shoot-out", "Covering fire", "S.H.I.E.L.D. soldier", "Upgraded missile", "Perfect shot"], "bonus" : ["Activation rate: 10% when attacking", "Physical attack 30% physical damage", "Cooldown time 10 seconds"] }
                      }
                     },
"destroyer" :        {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :    { "name" : "Destroyer", "attackBase" : "energy", "species" : "creature", "gender" : "neutral", "side" : "neutral", "type" : "universal", "skills" : ["Disintegration beam", "Crush", "Electromagnetic wave", "Obliteration wave", "Asgardian armament"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "prometheus" : { "name" : "Destroyer", "attackBase" : "energy", "species" : "creature", "gender" : "neutral", "side" : "neutral", "type" : "universal", "skills" : ["Disintegration beam", "Crush", "Electromagnetic wave", "Obliteration wave", "Asgardian armament"], "bonus" : ["Activation rate: 30% when attacking", "Apply to: Self", "Increase damage by 170% for 2 times. (10 sec.)", "Cooldown time 15 seconds"] }
                      }
                     },
"doctor_strange" :  {
                      "uniform" : "anad",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :        { "name" : "Doctor Strange", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Crimson bands of Cyttorak", "Demons of Denak", "Eye of Agamotto", "All-seeing eye", "Sorcerer supreme"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "doc_strange" : { "name" : "Doctor Strange", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Crimson bands of Cyttorak", "Demons of Denak", "Eye of Agamotto", "All-seeing eye", "Sorcerer supreme"], "bonus" : ["Activation rate: when Demons of Denak skill is used", "Apply to: Self", "Max HP recovery 8% (1 sec.)", "Reflect 40% of incoming damage (50% of max attack power) (5 sec.)", "Cooldown time 1 second"] }
                      }
                     },
"dormammu" :        {
                      "uniform" : "classic",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" : { "name" : "Dormammu", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Lava extrusion", "Dread flame", "Deadly laser", "Flame shield", "Dark dimension"], "bonus" : null }
                      }
                     },
"drax" :             {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :   { "name" : "Drax", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Dagger fall", "Takedown", "Cry for blood", "Obliterate", "Blade retribution"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Drax", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Dagger fall", "Takedown", "Cry for blood", "Obliterate", "Blade retribution"], "bonus" : ["Apply to: Self", "Defense penetration 10%"] }
                      }
                     },
"ebony_maw" :        {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" : { "name" : "Ebony maw", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Stone columns", "Stones storm", "Dark reinforcement", "Shadow attack", "Dark meteor"], "bonus" : null }
                      }
                     },
"elektra" :          {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" : { "name" : "Elektra", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Blood rush", "Harsh strike", "Throwing sais", "Silent ambush", "Red assassin"], "bonus" : null }
                      }
                     },
"elsa_bloodstone" :  {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :     { "name" : "Elsa Bloodstone", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Bloodstone training", "Filled with hate", "Nowhere to hide", "No mercy", "No escape"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_zombies" : { "name" : "Elsa Bloodstone", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Bloodstone training", "Filled with hate", "Nowhere to hide", "No mercy", "Red flame"], "bonus" : ["Activation rate: 10% when attacking", "Apply to: Self", "Skill cooltime 35% (15 sec.)", "All attack +30% (15 sec.)", "All speed +8% (15 sec.)", "Critical rate +35% (15 sec.)", "Cooldown time 20 seconds"] },
                       "unleashed" :  { "name" : "Elsa Bloodstone", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Bloodstone training", "Retribution", "Nowhere to hide", "No mercy", "Force of Bloodstone"], "bonus" : ["Activation rate: 10% when attacking", "Apply to: Self", "Skill cooltime 35% (15 sec.)", "All attack +30% (15 sec.)", "All speed +8% (15 sec.)", "Critical rate +35% (15 sec.)", "Cooldown time 20 seconds"] }
                      }
                     },
"enchantress" :      {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Enchantress", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "blast", "skills" : ["Sorceress whip", "Maiden's farewell", "Sorceress sphere", "Fatal illusion", "Enchanted entrapment"], "bonus" : null }
                      }
                     },
"falcon" :           {
                      "uniform" : "catws",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "catws" : { "name" : "Falcon", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Vertical descent", "Swoop", "Raptor strafe", "Sky-high", "Air superiority"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anca" :  { "name" : "Falcon", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Shield throw", "Swoop", "Raptor strafe", "Sky-high", "Air superiority"], "bonus" : ["Activation Rate: 25% when attacking", "Physical attack 58% physical damage", "Cooldown time 5 seconds"] },
                       // TODO : image need to be recreated from game
                       "cacw" :  { "name" : "Falcon", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Vertical descent", "Swoop", "Raptor strafe", "Sky-high", "Air superiority"], "bonus" : ["Activation Rate: 25% when attacking", "Physical attack 58% physical damage", "Cooldown time 5 seconds"] }
                      }
                     },
"fandral" :          {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Fandral", "attackBase" : "physical`", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Dashing strike", "Handsome blade", "Side-step slice", "Dancing blade", "Fandral's formation"], "bonus" : null }
                      }
                     },
"gamora" :           {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :   { "name" : "Gamora", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Dagger throw", "Death dealer", "Godslayer", "Spinning slash", "Slide n'slice"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Gamora", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Dagger throw", "Death dealer", "Godslayer", "Spinning slash", "Slide n'slice"], "bonus" : ["Increase bleed damage"] }
                      }
                     },
"ghost_rider" :      {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :    { "name" : "Ghost rider", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Chains ablaze", "Highway to hell", "Hellfire", "Damnation chains", "Penance stare"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "classic_70" : { "name" : "Ghost rider", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Chains ablaze", "Highway to hell", "Hellfire", "Damnation chains", "Penance stare"], "bonus" : ["Energy attack 15% fire damage add fire damage 13", "Increase skill duration for Chains ablaze"] },
                       // TODO : image need to be recreated from game
                       "iar" :        { "name" : "Ghost rider", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Chains ablaze", "Getaway car", "Hellfire", "Damnation chains", "Hit and run"], "bonus" : ["Energy attack 15% fire damage add fire damage 13", "Increase skill duration for Chains ablaze"] }
                      }
                     },
"giant_man" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :  { "name" : "Giant man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Jump kick", "Giant stomp", "Growing pains", "Crashing foot falls", "Giant jackhammer"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "modern2" : { "name" : "Goliath", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Jump kick", "Giant stomp", "Growing pains", "Crashing foot falls", "Giant jackhammer"], "bonus" : ["Activation rate: when using Enlarge buff", "Apply to: Self", "All defense +10% (20 sec.)", "All attack +10% (20 sec.)", "Cooldown time 30 seconds"] }
                      }
                     },
"green_goblin" :     {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :  { "name" : "Green goblin", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "speed", "skills" : ["Pumpkin bombs", "Bag of tricks", "Pumpkin barrage", "Bombing run", "Aerial charge"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "ultimate" : { "name" : "Green goblin", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Goblin's strike", "Fiery smash", "Fiery bolts", "Fiery quake", "Goblin's rage"], "bonus" : ["Activation rate: 82% when hit", "Apply to: Self", "Immune to all damage (4 sec.)", "Cooldown time 8 seconds"] }
                      }
                     },
"groot" :            {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :       { "name" : "Groot", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Branch crunch", "Root swipe", "Spore", "Groot smash", "We are Groot!"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_thors" : { "name" : "Groot", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Branch crunch", "Electrics roots", "Spore", "I am Thor", "We are Groot!"], "bonus" : ["Apply to: Self", "Lightning damage immune"] }
                      }
                     },
"gwenpool" :         {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Gwenpool", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Katana kick", "Figure skate", "Bombs 'n bullets", "Bullet rain", "Gift special"], "bonus" : null }
                      }
                     },
"gorgon" :           {
                      "uniform" : "warofking",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "warofking" : { "name" : "Gorgon", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Storming party", "Mace throw", "War cry", "Seismic shocks", "War stomp"], "bonus" : null }
                      }
                     },
"hawkeye" :          {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" : { "name" : "Hawkeye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Arrow barrage", "Sure shot", "Trick shot", "Piercing arrow", "Evasive shot"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "aaou" :     { "name" : "Hawkeye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Arrow barrage", "Sure shot", "Trick shot", "Piercing arrow", "Evasive shot"], "bonus" : ["Activation rate: when dealing critical attack", "Apply to: Enemy", "Stun (1 sec.)", "Cooldown time 5 seconds"] },
                       // TODO : image need to be recreated from game
                       "cacw" :     { "name" : "Hawkeye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Arrow barrage", "Sure shot", "Trick shot", "Piercing arrow", "Evasive shot"], "bonus" : ["Activation rate: when dealing critical attack", "Apply to: Enemy", "Stun (1 sec.)", "Increase the number of projectiles when using the Piercing arrow skill", "Cooldown time 5 seconds"] }
                      }
                     },
"hawkeye_kate" :     {
                      "uniform" : "now",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "now" : { "name" : "Hawkeye - Kate Bishop", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Explosion shot", "Trick arrows", "Swift archer", "Last one-shot", "Fuse shot"], "bonus" : null }
                      }
                     },
"hela" :             {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Hela", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "universal", "skills" : ["Fires of Hel", "Nightsword stab", "Merciless Queen", "Nightsword's glow", "Goddess of death"], "bonus" : null }
                      }
                     },
"hogun" :            {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Hogun", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Grim dagger", "Iron mace", "Mace enchantment", "Iron fury", "Hogun's formation"], "bonus" : null }
                      }
                     },
"hellstrom" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Hellstrom", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Ring of fire", "Trident thrust", "Eternal punishment", "Cult following", "Fire burst"], "bonus" : null }
                      }
                     },
"hulk" :             {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" :  { "name" : "Hulk", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Hulk charge", "Thunder clap", "Hulk smash", "Hulk stomp", "Hulk slam"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_future" : { "name" : "Maestro", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Hulk charge", "Thunder clap", "Hulk smash", "Hulk stomp", "Hulk slam"], "bonus" : ["Activation rate: 20% when attacking", "Physical attack 42% poison damage", "Cooldown time 10 seconds"] },
                       // TODO : image need to be recreated from game
                       "wwh" :       { "name" : "Hulk", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Hulk charge", "Shield bash", "Lunge strike", "Raging charge", "Hulk slam"], "bonus" : ["Apply to: Self", "Immune to guard break"] }
                      }
                     },
"hulk_cho" :         {
                      "uniform" : "tah",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "tah" :       { "name" : "Hulk Cho", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Tornado punch", "Counter slam", "Meteor drop", "Gamma stomp", "Tectonic toss"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "unleashed" : { "name" : "Hulk Cho", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Tornado punch", "Counter slam", "Chain collision", "Gamma stomp", "Gamma explosion"], "bonus" : ["Apply to: Self", "Super armor, all defense +20%"] }
                      }
                     },
"hulkbuster" :       {
                      "uniform" : "avengers",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" : { "name" : "Hulkbuster - Mark 44", "attackBase" : "physical", "species" : "creature", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Repulsor smash", "Hydraulic boom", "Jet-assisted takedown", "Arc reactor burst", "Barrage strike"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "hda" :      { "name" : "Hulkbuster - Mark 43", "attackBase" : "physical", "species" : "creature", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Bullet punch", "Hydraulic boom", "Jet-assisted takedown", "Arc reactor burst", "Barrage strike"], "bonus" : ["Activation rate: 5% when attacking", "Apply to: Self", "Skill cooltime 50% (10 sec.)", "Cooldown time 20 seconds."] }
                      }
                     },
"hulkling" :         {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" : { "name" : "Hulkling", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Shape-shift slam", "Excelsior", "Shape-shift scrape", "Sky-dive swoop", "Ruler of the sword"], "bonus" : null }
                      }
                     },
"hyperion" :         {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Hyperion", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Soaring Uppercut", "Heat Blast", "Sun God", "Solar Flare", "Atomic Vision"], "bonus" : null }
                      }
                     },
"inferno" :          {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "anad" : { "name" : "Inferno", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Burning fist", "Incineration", "Blazing storm", "Ignition", "Volcano burst"], "bonus" : null }
                      }
                     },
"iron_fist" :        {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" : { "name" : "Iron fist", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Chi of flying crane", "Pressure point jab", "K'un-Lun focus", "The iron fist", "Chi strike"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "na" :      { "name" : "Iron fist", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Chi of flying crane", "Pressure point jab", "K'un-Lun focus", "The iron fist", "Chi strike"], "bonus" : ["Activation rate: when HP is below 30%", "Apply to: Self", "Max HP recovery 10%", "Invincible (5 sec.)", "Cooldown time 30 seconds"] },
                       // TODO : image need to be recreated from game
                       "anad" :    { "name" : "Iron fist", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Chi of flying crane", "Pressure point jab", "K'un-Lun focus", "The iron fist", "Chi strike"], "bonus" : ["Activation rate: when HP is below 30%", "Apply to: Self", "Max HP recovery 10%", "Invincible (5 sec.)", "Cooldown time 30 seconds"] }
                      }
                     },
"iron_man" :         {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" : { "name" : "Iron man", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Repulsor Blast", "Repulsor ray", "Unibeam", "Missile Barrage", "The One-Off"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "aaou" :    { "name" : "Iron man", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Repulsor Blast", "Repulsor ray", "Unibeam", "Missile Barrage", "The One-Off"], "bonus" : ["Activation rate: 25% when hit", "Energy attack 66% physical damage", "Cooldown time 5 seconds"] },
                       // TODO : image need to be recreated from game
                       "sw_2099" : { "name" : "Iron man", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Repulsor Blast", "Repulsor ray", "Unibeam", "Missile Barrage", "The One-Off"], "bonus" : ["Fires more ammos with skill: Missile barrage"] },
                       // TODO : image need to be recreated from game
                       "cacw" :    { "name" : "Iron man", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Repulsor Blast", "Crash landing", "Unibeam", "Missile Barrage", "The One-Off"], "bonus" : ["Fires more ammos with skill: Missile barrage"] }
                      }
                     },
"ironheart" :        {
                      "uniform" : "now",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "now" : { "name" : "Ironheart", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Iron blade", "Air raid mode", "Ambush fire", "Barrage fire", "Prime cannon"], "bonus" : null }
                      }
                     },
"jessica_jones" :    {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Jessica Jones", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Coming for you", "Bum-rush", "Smack down", "Powerhouse", "Collateral damage"], "bonus" : null }
                      }
                     },
"kaecilius" :        {
                      "uniform" : "doc_strange",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "doc_strange" : { "name" : "Kaecilius", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Summon stone", "Falling rock", "Earth cutter", "Dagger summon", "Mystical avalanche"], "bonus" : null }
                      }
                     },
"karnak" :           {
                      "uniform" : "warofking",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "warofking" : { "name" : "Karnak", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Side-splitter", "Gale", "Composure", "Charging strike", "Death chop"], "bonus" : null }
                      }
                     },
"kingpin" :          {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :        { "name" : "Kingpin", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Stick shot", "Jump strike", "Knock-out", "Body slam", "Criminal mastermind"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_armor_wars" : { "name" : "Kingpin", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Blast barrage", "Jump strike", "Channeled beams", "Body slam", "Criminal mastermind"], "bonus" : ["Activation rate: 10% when hit", "Apply to: Self", "Generate a physical shield with 20% of maximum health (10 sec.)", "Cooldown time 30 seconds"] }
                      }
                     },
"lash" :             {
                      "uniform" : "maos",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :   { "name" : "Lash", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Found wanting", "Disintegrate", "Knock out", "Undeserving", "Cull the weak"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Lash", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Found wanting", "Disintegrate", "Knock out", "Undeserving", "Cull the weak"], "bonus" : ["Activation rate: 10% when attacking", "Energy attack 54% energy damage", "Cooldown time 10 seconds"] }
                      }
                     },
"lincoln_campbell" : {
                      "uniform" : "maos",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" : { "name" : "Lincoln Campbell", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Electromagnetism", "Electro-blast", "Protective dome", "Magnetic repulsion", "Electrical field"], "bonus" : null }
                      }
                     },
"loki" :             {
                      "uniform" : "avengers",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" : { "name" : "Loki", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Scepter bolt", "Arcane blast", "Energy barrier", "Astral projection", "Mind games"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "ll" :       { "name" : "Loki", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "universal", "skills" : ["Scepter bolt", "Arcane blast", "Energy barrier", "Astral projection", "Mind games"], "bonus" : ["Add freeze effect to Scepter bolt skill"] }
                      }
                     },
"luke_cage" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Luke Cage", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Dempsey roll", "Street style", "Screaming", "Sweet christmas", "Tactical offense"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" :   { "name" : "Luke Cage", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Dempsey roll", "Street style", "Screaming", "Sweet christmas", "Tactical offense"], "bonus" : null }
                      }
                     },
"malekith" :         {
                      "uniform" : "ttdw",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "ttdw" : { "name" : "Malekith", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Aether bolt", "Shadow flurry", "Extinguish darkness", "Storm of the aether", "The accursed"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Malekith", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Aether bolt", "Shadow flurry", "Ether blade", "Storm of the aether", "The accursed"], "bonus" : ["Activation rate: 12% when hit", "Apply to: Self", "Max HP recovery 10% (1 sec.)", "Cooldown time 7 seconds"] }
                      }
                     },
"maximus" :          {
                      "uniform" : "warofking",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "warofking" : { "name" : "Maximus", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Deadly invention", "Lunatic control", "Electric barrier", "Ultimate weapon", "Evil trick"], "bonus" : null }
                      }
                     },
"medusa" :           {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Medusa", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Hair drill", "Hair constrictor", "Hair blossom", "Split ends", "Queen's embrace"], "bonus" : null }
                      }
                     },
"miles_morales" :    {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Miles Morales", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Foe flip", "Back bite", "Wild web", "Shock and awe", "Blasting burst"], "bonus" : null }
                      }
                     },
"misty_knight" :     {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Misty Knight", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Frost wave", "Freeze strike", "Spark burst", "Cold shoulder", "Bionic bomber"], "bonus" : null }
                      }
                     },
"mockingbird" :      {
                      "uniform" : "ha",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "ha" :   { "name" : "Mocking bird", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Twin stave attack", "Bo-staff kick", "Concentration", "Bo-staff strike", "Bo-staff take down"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "maos" : { "name" : "Bobbi Morse", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Twin stave attack", "Bo-staff kick", "Concentration", "Bo-staff strike", "Bo-staff take down"], "bonus" : ["Activate rate: 30% when attacking", "Apply to: Self", "1 attack activate guard break (2 sec.)", "Cooldown time 3 seconds"] },
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Mocking bird", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Twin stave attack", "Bo-staff kick", "Baton throw", "Bo-staff barrage", "Bo-staff take down"], "bonus" : ["Activate rate: 30% when attacking", "Apply to: Self", "1 attack activate guard break (2 sec.)", "Cooldown time 3 seconds"] }
                      }
                     },
"modok" :            {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" : { "name" : "M.O.D.O.K.", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Dominance of spirit", "Doomsday chair shot", "Impending doom", "Telekinetic force blast", "Head-on"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "spidoc" :  { "name" : "M.O.D.O.K.", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Puppet master", "Pulling strings", "Designed to web", "Telekinetic force blast", "Head-on"], "bonus" : ["Decrease ennemies all speed with Regular attack"] },
                       // TODO : image need to be recreated from game
                       "capdoc" :  { "name" : "M.O.D.O.K.", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Dominance of spirit", "Doomsday chair shot", "Impending doom", "Telekinetic force blast", "Head-on"], "bonus" : ["Activation rate: 25% when hit", "Apply to: Self", "Immune to all damage (2 sec.)", "Cooldown time 20 seconds"] }
                      }
                     },
"moon_girl" :        {
                      "uniform" : "now",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "now" : { "name" : "Moon Girl", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Air raid siren", "Taser punch", "Soda bomb", "Moon beam", "Bubble pop"], "bonus" : null }
                      }
                     },
"moon_knight" :      {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :  { "name" : "Moon knight", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Moon strike", "Crescent bommerang", "Staff slam", "Full moon", "Lunar eclipse"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "armored" : { "name" : "Moon knight", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Midnight combo", "Crescent darts", "Staff slam", "Full moon", "Lunar eclipse"], "bonus" : ["Increased no. of projectiles on Crescent dart skill"] }
                      }
                     },
"mordo" :            {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :     { "name" : "Baron Mordo", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Energy sphere", "Energy whip", "Energy shock", "Seeking spear", "Flame pillar"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "doc_strange" : { "name" : "Mordo", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Serpent staff", "Chain staff", "Sacred staff", "Heaven strike", "Maelstrom staff"], "bonus" : ["Activate rate: 10% when attacking", "Apply to: Self", "All speed +10% (10 sec.)", "Energy damage immune (5 sec.)", "Cooldown time 30 seconds"] }
                      }
                     },
"ms_marvel" :        {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :    { "name" : "Ms marvel - Kamala Khan", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Enlarge hook", "Shifting punch", "Morphing stomp", "Party smash", "Polymorph"], "bonus" : null },
                       "karachi" : { "name" : "Ms marvel - Kamala Khan", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Enlarge hook", "Shifting punch", "Morphing stomp", "Party smash", "Polymorph"], "bonus" : ["Apply to: Self", "Increase all speeds by 10%", "Increase HP by 20%"] }
                      }
                     },
"nebula" :           {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :      { "name" : "Nebula", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "combat", "skills" : ["Elegant kick", "Sudden strike", "Vicious spree", "Dagger dance", "Shooting star"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "classic" : { "name" : "Nebula", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "combat", "skills" : ["Elegant kick", "Sudden strike", "Vicious spree", "Dagger dance", "Shooting star"], "bonus" : ["Add stun effect to skill Sudden strike"] }
                      }
                     },
"octopus" :          {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" : { "name" : "Doctor Octopus", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Tentacle sling", "Rock throw", "Tentacle block", "Tentacle punch", "Armed and dangerous"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "ssm" :     { "name" : "Doctor Octopus", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Web caught", "Final embrace", "Spiderlings", "From the sky", "Arachnophobia"], "bonus" : ["Activate rate: when dodging", "Apply to: Self", "Increase damage by 120% for 1 times (5 sec.)", "Cooldown time 8 seconds"] }
                      }
                     },
"odin" :             {
                      "uniform" : "modern",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Odin", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["King slash", "Odin charge", "Asgardian barrier", "Odin's wrath", "Odinforce"], "bonus" : null }
                      }
                     },
"phil_coulson" :     {
                      "uniform" : "maos",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" : { "name" : "Phil Coulson", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Coulson's revenge", "Harnessing the destroyer", "Agent Melinda May", "Coulson special", "The captain card"], "bonus" : null }
                      }
                     },
"proxima_midnight" : {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" : { "name" : "Proxima midnight", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "universal", "skills" : ["Impact Blow", "Midnight Blow", "Velocity Strike", "Piercing Abyss", "Midnight Sky"], "bonus" : null }
                      }
                     },
"punisher" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Punisher", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Grenade throw", "Flare", "Killer instinct", "Punish the guilty", "Incendiary rocket"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "noir" :   { "name" : "Punisher", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Grenade throw", "Flare", "Killer instinct", "Punish the guilty", "Incendiary rocket"], "bonus" : ["Activation rate: when dealing critical attack", "Apply to: Self", "Physical attack +10% (20 sec.)", "Cooldown time 30 seconds"] },
                       // TODO : image need to be recreated from game
                       "wj" :     { "name" : "Punisher", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Grenade throw", "Flare", "Perfect aim", "Rocket shower", "Incendiary rocket"], "bonus" : ["Activation rate: when dealing critical attack", "Apply to: Self", "Physical attack +10% (20 sec.)", "Cooldown time 30 seconds"] }
                      }
                     },
"red_hulk" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Red hulk", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Burning fury", "Hulk blast", "Irradiate", "Blazing leap", "Avalanche smash"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "now" :    { "name" : "Red hulk", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Burning fury", "Hulk blast", "Gunfire", "Blazing leap", "Avalanche smash"], "bonus" : ["Activation rate: when hp is below 50%", "Apply to: Self", "Max hp recovery 15% (1 sec)", "Cooldown time 7 seconds"] }
                      }
                     },
"red_skull" :        {
                      "uniform" : "catfa",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "catfa" :        { "name" : "Red skull", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Rapid fire", "Fatal blow", "Strategist", "Cosmic cube destruction", "Legion of Hydra"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_red_skull" : { "name" : "Red skull", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "speed", "skills" : ["Rifle shield", "Skull cyclone", "Quick draw", "Cosmic cube destruction", "Legion of Hydra"], "bonus" : ["Activation rate: 30% when attacking", "Apply to: Self", "Deals 30% bleed damage every 1 sec. (3 sec.)", "All speed -10% (10 sec.)", "Cooldown time 15 seconds"] }
                      }
                     },
"rocket_raccoon" :   {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :   { "name" : "Rocket racoon", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Heavy machine gun", "Covering fire", "Trip mine", "Ion cannon", "I've got a plan"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Rocket racoon", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Heavy machine gun", "Covering fire", "Trip mine", "Ion cannon", "I've got a plan"], "bonus" : ["Increase number of mines"] }
                      }
                     },
"ronan" :            {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :           { "name" : "Ronan", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Tip the scales", "Universal weapon", "Arbitration", "Law enforcer", "Judgement call"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "annihilation" : { "name" : "Ronan", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Hammer charge", "Universal weapon", "Merciless gavel", "Law enforcer", "Judgement call"], "bonus" : ["Add stun effect to Hammer charge skill"] }
                      }
                     },
"satana" :           {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Satana", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "universal", "skills" : ["Dancing flame", "Flamethrower", "Little minion", "Fire barrier", "Succubus army"], "bonus" : null }
                      }
                     },
"sharon_rogers" :    {
                      "uniform" : "ca_75",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "ca_75" : { "name" : "Sharon Rogers", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Riposte strike", "Sky dragoon", "Javelin blast", "Paladin blast", "Freedom strike"], "bonus" : null }
                      }
                     },
"shang_chi" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Shang-Chi", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Nunchaku knockout", "Mystic clone", "Chi charge", "Mystic barrage", "Mystic army"], "bonus" : null }
                      }
                     },
"she_hulk" :         {
                      "uniform" : "sw_a_force",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "sw_a_force" : { "name" : "She-hulk", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Opening statement", "Move to strike", "Cross examination", "Objection !", "Exhibit A"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "an" :         { "name" : "She-hulk", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Opening statement", "Move to strike", "Cross examination", "Objection !", "Exhibit A"], "bonus" : ["Apply to: Self", "Immune to guard break", "Cooldown time 10 seconds"] }
                      }
                     },
"sif" :              {
                      "uniform" : "maos",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :   { "name" : "Sif", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Sudden stab", "Combat strike", "Attack edge", "For glory !", "For honor!"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Sif", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Stunning slash", "Asgardian grace", "Attack edge", "Goddess of war", "For honor!"], "bonus" : ["Apply to: Self", "All speed +10%"] }
                      }
                     },
"silk" :             {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :    { "name" : "Silk", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Spider and fly", "Look behind you", "Shield smash", "Web rebound", "The yo-yo"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "websuit" : { "name" : "Silk", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Spider and fly", "Look behind you", "Shield smash", "Silk spinner", "The yo-yo"], "bonus" : ["Apply to: self", "2 sec increase to duration time of web"] }
                      }
                     },
"sin" :              {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Sin", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "speed", "skills" : ["Pistol whip", "Strafe shot", "Rapid handgun", "Rocket launcher", "Eternal sin"], "bonus" : null }
                      }
                     },
"singularity" :      {
                      "uniform" : "sw_a_force",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "sw_a_force" : { "name" : "Singularity", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Ablation", "Space fold", "Supernova", "Meteorite", "Dimensional tear"], "bonus" : null }
                      }
                     },
"sister_grimm" :     {
                      "uniform" : "sw_a_force",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "sw_a_force" : { "name" : "Sister Grimm", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Float on", "Punish", "Angry like a wolf", "Now you see mee", "Rock and roll"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" :       { "name" : "Sister Grimm", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Float on", "Punish", "Avian fury", "Now you see mee", "Rock and roll"], "bonus" : ["Float on, Punish and Angry like a wolf skills inflicts burn damage"] }
                      }
                     },
"songbird" :         {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" : { "name" : "Songbird", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Sonic wall", "Sonic flash", "Sonic shield", "Sonic armory", "Sonic maelstrom"], "bonus" : null }
                      }
                     },
"spider_gwen" :      {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Spider-Gwen", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Kick-tock", "Spin n'pin", "What goes up", "The blender", "One-two kick"], "bonus" : null }
                      }
                     },
"spider_man" :       {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :  { "name" : "Spider-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Web shot", "Web swing kick", "Webslinger", "Web fling", "Wrecking web"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_renew" : { "name" : "Spider-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Web shot", "Web swing kick", "Webslinger", "Web fling", "Wrecking web"], "bonus" : ["Soot more shots for skill: Web shot"] },
                       // TODO : image need to be recreated from game
                       "anad" :     { "name" : "Spider-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Web shot", "Web swing kick", "Webslinger", "Web fling", "Wrecking web"], "bonus" : ["Web shot and Webslinger inflict shock damage"] },
                       // TODO : image need to be recreated from game
                       "cacw" :     { "name" : "Spider-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Web blast", "Web swing kick", "Webslinger", "Web fling", "Wrecking web"], "bonus" : ["Spider web effect added to the Spider kick skill"] }
                      }
                     },
"squirrel_girl" :    {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" :  { "name" : "Squirrel girl", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Squirrel bombs", "Scurry roll", "Tail whip", "Squirrel army", "Squirrel sidekick"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "now" : { "name" : "Squirrel girl", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed", "skills" : ["Squirrel bombs", "Scurry roll", "Tail whip", "Squirrel army", "Squirrel sidekick"], "bonus" : ["Activation rate: 20% when attacking", "Apply to: Self", "Increase damage by 110% for 1 time (5 sec.)", "Cooldown time 15 seconds"] }
                      }
                     },
"star_lord" :        {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" : { "name" : "Star-lord", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Gravity grenade", "Hadron enforcer", "I have a plan", "Power of orb", "Come and get it"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sa" : { "name" : "Star-lord", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Gravity grenade", "Star moves", "I have a plan", "Power of orb", "Come and get it"], "bonus" : ["Apply to: Self", "Critical damage +15%"] }
                      }
                     },
"supergiant" :       {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" : { "name" : "Supergiant", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "universal", "skills" : ["Energy strike", "Mental trap", "Battle mentality", "Puppeteer", "Giant illusions"], "bonus" : null }
                      }
                     },
"thanos" :           {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" : { "name" : "Thanos", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Titan Punch", "Titan Beam", "Cosmic Shift", "Cosmic Rain", "Cosmic Drop"], "bonus" : null }
                      }
                     },
"thor" :             {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" : { "name" : "Thor", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Thunderstrike", "Hammer throw", "Call the lightning", "Battle rage", "Thundering maelstrom"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "aaou" :     { "name" : "Thor", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Thunderstrike", "Hammer throw", "Call the lightning", "Battle rage", "Thundering maelstrom"], "bonus" : ["Activation rate: 25% when hit", "Energy attack 80% lightning damage", "Cooldown time 5 seconds"] },
                       // TODO : image need to be recreated from game
                       "unworthy" : { "name" : "Thor", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Thunder axe", "Thunder roar", "Call the lightning", "Celestial breaker", "Thundering maelstrom"], "bonus" : ["Apply to: Self", "All damage received reduced by 15%"] }
                      }
                     },
"thor_jane_foster" : {
                      "uniform" : "anad",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Thor - Jane Foster", "attackBase" : "energy", "species" : "human" ,"gender" : "female", "side" : "hero", "type" : "universal", "skills" : ["Thunderous wind", "Mjolnir's toss", "Mjolnir's rage", "Thor's rage", "Goddess of thunder"], "bonus" : null }
                      }
                     },
"ulik" :             {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Ulik", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Knuckle pound", "Boulder toss", "Trolls's roar", "Knuckle barrage", "Troll stomp"], "bonus" : null }
                      }
                     },
"ultron" :           {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :      { "name" : "Ultron", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Chest beam", "Robotic slam", "Encephalo-ray", "Electronic field", "No strings"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "aaou_blast" :  { "name" : "Ultron prime", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Chest beam", "Robotic slam", "Encephalo-ray", "Electronic field", "No strings"], "bonus" : ["Apply to: Self", "10% damage boost againt blast type", "10% incoming damage reduction from blast type"] },
                       // TODO : image need to be recreated from game
                       "aaou_combat" : { "name" : "Ultron mark 1", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Chest beam", "Robotic slam", "Encephalo-ray", "Electronic field", "No strings"], "bonus" : ["Apply to: Self", "10% damage boost againt combat type", "10% incoming damage reduction from combat type"] },
                       // TODO : image need to be recreated from game
                       "aaou_speed" :  { "name" : "Ultron mark 3", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "vilain", "type" : "universal", "skills" : ["Chest beam", "Robotic slam", "Encephalo-ray", "Electronic field", "No strings"], "bonus" : ["Apply to: Self", "10% damage boost againt speed type", "10% incoming damage reduction from speed type"] }
                      }
                     },
"venom" :            {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :    { "name" : "Venom", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Symbiote surge", "Tendril spike", "Parastic shot", "Deadly maw", "Lethal Symbiosis"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "sw_zombies" : { "name" : "Venom", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat", "skills" : ["Symbiote surge", "Tendril spike", "Parastic shot", "Deadly maw", "Lethal Symbiosis"], "bonus" : ["Activation rate: 10% when hit", "Apply to: Self", "Super armor, all defense +5% (10 sec.)", "Cooldown time 20 seconds"] }
                      }
                     },
"vision" :           {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Vision", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Physical disruption", "Solar energy beam", "Density shift", "Microwave pulse", "Dimensional attack"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "aaou" :   { "name" : "Vision", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "hero", "type" : "universal", "skills" : ["Physical disruption", "Solar energy beam", "Density shift", "Microwave pulse", "Dimensional attack"], "bonus" : ["Apply to: Self", "Crowd control time 15%", "All resistance +15% boost"] }
                      }
                     },
"volstagg" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Volstagg", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Valiant volley", "Valiant slash", "Voluminous blow", "Enormous eathquake", "Volstagg's formation"], "bonus" : null }
                      }
                     },
"war_machine" :      {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "War machine", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Suppression fire", "Armored clash", "Repulsor shot", "Minigun barrage", "Missile strafe"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "ip" :     { "name" : "War machine", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Suppression fire", "Armored clash", "Repulsor shot", "Minigun barrage", "Missile strafe"], "bonus" : ["Add stun effect to Armored clash skill"] },
                       // TODO : image need to be recreated from game
                       "ati" :    { "name" : "War machine", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Suppression fire", "Armored clash", "Repulsor shot", "Minigun barrage", "Missile strafe"], "bonus" : ["Add stun effect to Armored clash skill"] },
                       // TODO : image need to be recreated from game
                       "cacw" :   { "name" : "War machine", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Suppression fire", "Armored clash", "Repulsor shot", "Minigun barrage", "Heavy metal"], "bonus" : ["Add stun effect to Armored clash skill"] }
                      }
                     },
"warwolf" :          {
                      "uniform" : "howling",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "howling" : { "name" : "Warworlf", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat", "skills" : ["Vicious strike", "Bury them", "Ambush", "Blood frenzy", "Howl to Mars"], "bonus" : null }
                      }
                     },
"wasp" :             {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" : { "name" : "Wasp", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Disrupting shot", "Blinding flash", "Encouragement", "Target rush", "Swarm shield"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" :   { "name" : "Wasp", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast", "skills" : ["Disrupting shot", "Blinding flash", "Encouragement", "Target rush", "Swarm shield"], "bonus" : ["Activation rate: 5% when attacking", "Apply to: Self", "Apply to: Enemy", "Paralyze (2 sec.)", "Cooldown time 20 seconds"] }
                      }
                     },
"white_tiger" :      {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" : { "name" : "White tiger", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat", "skills" : ["Tiger pounce", "Tiger spirit", "Amulet shield", "Tiger claw", "Tiger ambush"], "bonus" : null }
                      }
                     },
"wiccan" :           {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" : { "name" : "Wiccan", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast", "skills" : ["Spell bomb", "Spell concentration", "Dispel zone", "Kinetic chain", "Spell wave"], "bonus" : null }
                      }
                     },
"winter_soldier" :   {
                      "uniform" : "catws",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "catws" : { "name" : "Winter soldier", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Suppressing fire", "Bionic combat", "Sensory array", "Snarpshooter", "Explosive sabotage"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "cacw" :  { "name" : "Winter soldier", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Suppressing fire", "Bionic combat", "Sensory array", "Snarpshooter", "Explosive sabotage"], "bonus" : ["Use Sensory array to summon Captain America and enhance the Sensory array skill"] },
                       // TODO : image need to be recreated from game
                       "ca" :    { "name" : "Winter soldier", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Winter shield", "Bionic combat", "Cover fire", "Shock value", "Explosive sabotage"], "bonus" : ["Activation rate: when skill Cover fire is used", "Apply to: Self", "Immune to all damage (2 sec.)", "Cooldown time 1 second"] }
                      }
                     },
"wong" :             {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :        { "name" : "Wong", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Wandering staff", "Scimitar spin", "Mystic shield", "Mystic wave", "Scimitar cyclone"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "doc_strange" : { "name" : "Wong", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Wandering staff", "Scimitar spin", "Mystic shield", "Mystic wave", "Scimitar cyclone"], "bonus" : ["Activation rate: 45% when dealing critical attack", "Apply to: Self", "Skill cooltime 50% (10 sec.)", "Cooldown time 20 seconds"] }
                      }
                     },
"yellow_jacket" :    {
                      "uniform" : "mam",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "mam" : { "name" : "Yellow jacket", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Stinger", "Flying barrage", "Now you see me", "Swarm shot", "Laser burst"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "now" : { "name" : "Yellow jacket", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast", "skills" : ["Stinger", "Flying barrage", "Now you see me", "Swarm shot", "Laser burst"], "bonus" : ["Apply to: Self", "25% damage increase to hero type"] }
                      }
                     },
"yondu" :            {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :   { "name" : "Yondu", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Leap kick", "Barrage of arrows", "Arrow call", "Yaka arrow", "Ravager strike"], "bonus" : null },
                       // TODO : image need to be recreated from game
                       "anad" : { "name" : "Yondu", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "speed", "skills" : ["Leap kick", "Ravager assault", "Quantum detonator", "Bounty hunter", "Ravager strike"], "bonus" : ["Activation rate: 5% when attacking", "Apply to: Self", "Skill cooltime 50% (10 sec.)", "Cooldown time 20 seconds"] }
                      }
                     }
};
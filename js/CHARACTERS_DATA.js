/* global MFF */
MFF.CHARACTERS.DATA =
{
"agent_13" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Agent 13", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Sliding Kick", "Back flip attack", "Covering Fire", "Backup", "Extreme Diversion"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Agent 13", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Sliding Kick", "Air Bullets", "Covering Fire", "Backup", "Extreme Diversion"],
                        "bonus" : ["Apply to: Self","Increase chain hit damage by 10% when you attack"],
                        "links" : ["anad/iron_fist", "anad/drax", "sw_future/hulk", "cacw/hawkeye", "modern/crossbones"]
                       }
                      }
                     },
"ancient_one" :      {
                       "uniform" : "modern",
                       "tiers" : [1, 2],
                       "uniforms" :
                       {
                        // TODO : image need to be recreated from game
                         "modern" :
                         {
                          "name" : "Ancient One", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                          "skills" : ["Mystic discharge", "Mystic energy", "Ancient cure", "Inner self", "Ancient enchantment"]
                         },
                        // TODO : image need to be recreated from game
                         "doc_strange" :
                         {
                          "name" : "Ancient One", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                          "skills" : ["Mystic discharge", "Mystic energy", "Ancient cure", "Inner self", "Ancient enchantment"],
                          "bonus" : ["Apply to: Self", "Increase all debuffs effect by 15%", "Increase all buffs effect by 15%"],
                          "links" : ["cacw/black_panther", "anad/angela", "catws/captain_america", "sw_1872/bullseye", "maos/mockingbird"]
                         }
                        }
                      },
"angela" :           {
                      "uniform" : "modern",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Angela", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Angel's War Rage", "Blades of Ichor", "Sword blow", "Avenging angel", "Entangle"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_1602" :
                       {
                        "name" : "Angela", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Angel's War Rage", "Blades of Ichor", "Sword blow", "Avenging angel", "Entangle"],
                        "bonus" : ["Apply to: Self", "20% damage boost against BLAST type"] ,
                        "links" : ["now/red_hulk", "anad/mockingbird", "anad/sister_grimm", "modern/daisy_johnson", "ll/loki"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Angela", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Angel's War Rage", "Blades of Ichor", "Sword blow", "Avenging angel", "Entangle"],
                        "bonus" : ["Apply to: Self", "Increase fire damage by 10%"],
                        "links" : ["unworthy/thor", "capdoc/modok", "cacw/war_machine", "modern/crossbones", "maos/mockingbird"]
                       }
                      }
                     },
"ant_man" :          {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Ant-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Pym punch", "Speeding bullet", "Bug squash", "Flying rush", "Pym discs"],
                        "gears" : ["Pym particles", "Ant-man suit", "Cybernetic helmet", "Toolbot"]
                       },
                       // TODO : image need to be recreated from game
                       "mam" :
                       {
                        "name" : "Ant-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Pym punch", "Speeding bullet", "Bug squash", "Flying rush", "Pym discs"],
                        "bonus" : ["Activation rate: when using MINIATURIZE buff", "Apply to: Self", "Dodge +5% (20 sec.)", "All attack +10% (20 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["spidoc/modok", "classic_70/ghost_rider", "armored/moon_knight", "anad/angela", "aaou_speed/ultron"],
                        "gears" : ["Pym particles", "Ant-man suit", "Cybernetic helmet", "Toolbot"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Ant-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Pym punch", "Speeding bullet", "Bug squash", "Flying rush", "Size matters"],
                        "bonus" : ["Apply to: Self", "All attack +3%", "Immune to guard break"],
                        "links" : ["cacw/black_widow", "sa/star_lord", "sw_armor_wars/kingpin", "cacw/falcon", "cacw/winter_soldier"],
                        "gears" : ["Pym particles", "Ant-man suit", "Cybernetic helmet", "Toolbot"]
                       }
                      }
                     },
"black_bolt" :       {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Black bolt", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Electron channeling", "Anti-gravitational dash", "Power word", "Brutal whisper", "Quasi-sonic scream"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Black bolt", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Electron channeling", "Anti-gravitational dash", "Power word", "Brutal whisper", "Quasi-sonic scream"],
                        "bonus" : ["Activation rate: when skill (normal attack excluded) is used", "Apply to: Self", "1 attacks activate guard break (3 sec.)", "Cooldown time 7 seconds"],
                        "links" : ["cacw/ant_man", "anad/yondu", "cacw/captain_america", "anad/black_cat", "cacw/falcon"]
                       },
                       "attilanrising" :
                       {
                        "name" : "Black bolt", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Electron channeling", "King's order", "Power word", "Brutal whisper", "Quasi-sonic scream"],
                        "bonus" : ["Activation rate: when skill (normal attack excluded) is used", "Apply to: Self", "Increase damage by 120% for 1 attack (5 sec.)", "Cooldown time 8 seconds"],
                        "links" : ["anad/black_bolt", "cacw/black_panther", "anad/black_cat", "aaou/iron_man", "wwh/hulk"]
                       }
                      }
                     },
"black_cat" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Black cat", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "speed",
                        "skills" : ["Cat scratch", "Acrobatic kick", "Catlike reflex", "Cat hunt", "Cat lash"]
                       },
                       // TODO : image need to be recreated from game
                       "claws" :
                       {
                        "name" : "Black cat", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "speed",
                        "skills" : ["Cat scratch", "Acrobatic kick", "Catlike reflex", "Cat hunt", "Cat lash"],
                        "bonus" : ["Apply to: Self", "Increase chain hit damage by 5% when you attack"],
                        "links" : ["sw_red_skull/red_skull", "sw_zombies/elsa_bloodstone", "ati/war_machine", "cacw/winter_soldier", "prometheus/destroyer"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Black cat", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "speed",
                        "skills" : ["Cat scratch", "Heel kick", "Lucky streak", "Nine lives", "Cat lash"],
                        "bonus" : ["Apply to: Self", "Increase chain hit damage by 3% when you attack", "Increased effect of misfortune skill"],
                        "links" : ["aaou/thor", "aaou/vision", "hda/hulkbuster", "anad/spider_man", "sw_zombies/venom"]
                       }
                      }
                     },
"black_dwarf" :      {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" :
                       {
                        "name" : "Black dwarf", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Axe Lunge", "Executioner", "Axe Slam", "Wind Blade", "Eviscerator"],
                        "gears" : ["Black dwarf axe", "Black order pauldron", "Black battle shorts", "Battle mace"]
                       }
                      }
                     },
"black_panther" :    {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Black panther", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Energy spear", "Claw slash", "Energy dagger", "Essence of the panther", "Unseen predator"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Black panther", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Energy spear", "Claw slash", "Energy dagger", "Essence of the panther", "Unseen predator"],
                        "bonus" : ["Increase bleed damage"],
                        "links" : ["ll/loki", "classic_70/ghost_rider", "dohk/daredevil", "anad/yondu", "sw_red_skull/red_skull"]
                       }
                      }
                     },
"black_widow" :      {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" :
                       {
                        "name" : "Black widow", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Widow's bite", "Acrobatic assault", "Infiltrator", "Systema", "Coup de grâce"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou" :
                       {
                        "name" : "Black widow", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Widow's bite", "Acrobatic assault", "Infiltrator", "Systema", "Coup de grâce"],
                        "bonus" : ["Activation rate: when dodging", "Apply to: Self", "Critical damage +25% (10 sec.)", "Critical rate +25% (10 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["cacw/captain_america", "unworthy/thor", "wj/punisher", "cacw/iron_man", "aaou_blast/ultron"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_2099" :
                       {
                        "name" : "Black widow", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Widow's bite", "Acrobatic assault", "Infiltrator", "Systema", "Coup de grâce"],
                        "bonus" : ["Activation rate: when dodging", "Apply to: Self", "Critical damage +20% (10 sec.)", "Critical rate +20% (10 sec.)", "Range increase for skill: Widow's bite", "Cooldown time 20 seconds"],
                        "links" : ["maosq/daisy_johnson", "sw_thors/groot", "sw_renew/spider_man", "doc_strange/ancient_one", "cacw/agent_13"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Black widow", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Widow's bite", "Acrobatic assault", "Pistol strafe", "Systema", "Coup de grâce"],
                        "bonus" : ["Activation rate: when dodging", "Apply to: Self", "Critical damage +20% (10 sec.)", "Critical rate +20% (10 sec.)", "Add paralysis effect to Widow's bite skill", "Cooldown time 20 seconds"],
                        "links" : ["now/red_hulk", "ip/war_machine", "anad/daredevil", "spidoc/modok", "anad/malekith"]
                       }
                      }
                     },
"blade" :            {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Blade", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Sword edge", "Sword of storm", "Catching weak point", "Blood haze", "Hemorrhage"]
                       },
                       // TODO : image need to be recreated from game
                       "classic_70" :
                       {
                        "name" : "Blade", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Sword edge", "Sword of storm", "Catching weak point", "Blood haze", "Hemorrhage"],
                        "bonus" : ["Skill Sword edge reduce enemies physical defense"],
                        "links" : ["cacw/winter_soldier", "dohk/daredevil", "aaou/thor", "sw_zombies/elsa_bloodstone", "sw_1872/bullseye"]
                       }
                      }
                     },
"bullseye" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Bullseye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Trick of card", "Storm of sword", "Assassination", "Card storm", "Madness knife"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_1872" :
                       {
                        "name" : "Bullseye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Trick of card", "Storm of sword", "Assassination", "Deadeye", "Madness knife"],
                        "bonus" : ["Apply to: Self", "Ignore dodge 50%"],
                        "links" : ["cacw/ant_man", "wj/punisher", "cacw/hawkeye", "websuit/silk", "ll/loki"]
                       }
                      }
                     },
"captain_america" :  {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" :
                       {
                        "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou" :
                       {
                        "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"],
                        "bonus" : ["Activation rate: 25% when hit", "Apply to: Self", "Immune to all damage (5 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["sw_red_skull/red_skull", "now/captain_america", "now/squirrel_girl", "classic_70/blade", "sw_2099/captain_america"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_2099" :
                       {
                        "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"],
                        "bonus" : ["Activation rate: 15% when hit", "Apply to: Self", "Immune to all damage (5 sec.)", "More ricochet for skill: Shield throw", "Cooldown time 20 seconds"],
                        "links" : ["anad/spider_man", "aaou/black_widow", "sw_2099/black_widow", "sw_1602/angela", "sw_armor_wars/kingpin"]
                       },
                       // TODO : image need to be recreated from game
                       "catws" :
                       {
                        "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"],
                        "bonus" : ["Activation rate: 25% when hit", "Apply to: Self", "Immune to all damage (5 sec.)", "Add guard break effect on skill: Valor", "Cooldown time 20 seconds"],
                        "links" : ["anad/gamora", "iar/ghost_rider", "anad/wasp", "sw_thors/groot", "ms_marvel/captain_marvel"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Shield throw", "Valor", "Ready for battle", "Shield strike", "Heroic fury"],
                        "bonus" : ["Activation rate: 25% when hit", "Apply to: Self", "Immune to all damage (5 sec.)", "Add guard break effect on skill: Valor", "When using Ready for battle, summon Winter solder", "Cooldown time 20 seconds"],
                        "links" : ["anad/wasp", "cacw/falcon", "cacw/black_panther", "annihilation/ronan", "cacw/iron_man"]
                       },
                       // TODO : image need to be recreated from game
                       "now" :
                       {
                        "name" : "Captain america", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Shield throw", "Valor", "Shield of valor", "Shield strike", "Heroic fury"],
                        "bonus" : ["Activation rate: 45% when hit", "Apply to: Self", "Immune to all damage (3 sec.)", "Add guard break effect on skill: Valor", "Cooldown time 7 seconds"],
                        "links" : ["armored/moon_knight", "modern/daisy_johnson", "ssm/octopus", "anad/luke_cage", "cacw/iron_man"]
                       }
                      }
                     },
"captain_marvel" :   {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Captain marvel", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Mighty straight", "Backflip blast", "Photon blast", "Binary explosion", "Radiant form"],
                        "gears" : ["Binary power", "Captain Marvel costume", "Battle boots", "Red fabric belt"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_carol_corp" :
                       {
                        "name" : "Captain marvel", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Mighty straight", "Backflip blast", "Photon blast", "Binary explosion", "Radiant form"],
                        "bonus" : ["Add guard break effect on skill: Mighty straight", "7 seconds increase to duration of Radiant form"],
                        "links" : ["aaou/iron_man", "cacw/war_machine", "sw_thors/groot", "aaou/vision", "sw_future/hulk"],
                        "gears" : ["Unknwon gear 1", "Unknwon gear 2", "Unknown gear 3", "Uniform gear 4"]
                       },
                       // TODO : image need to be recreated from game
                       "ms_marvel" :
                       {
                        "name" : "Captain marvel", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Mighty straight", "Backflip blast", "Photon blast", "Binary explosion", "Radiant form"],
                        "bonus" : ["Add 1 extra hit attack to the Backflip blast skill", "3 second increase to duration of Radiant form"],
                        "links" : ["ultimate/green_goblin", "aaou/iron_man", "cacw/iron_man", "capdoc/modok", "sw_2099/captain_america"],
                        "gears" : ["Binary power", "Combat suit", "Combar boots", "Red fabric belt"]
                       }
                      }
                     },
"carnage" :          {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Carnage", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Weapon Manipulation", "Devouring Maniac", "Camouflage Strike", "Carnage Strike", "Insanity Strike"],
                        "gears" : ["Claws", "Carnage symbiote", "Detachable weapon", "Insanity"]
                       }
                      }
                     },
"clea" :             {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Clea", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "universal",
                        "skills" : ["Mystic radiance", "Mystic dragon", "Mystic shuffle", "Mystic storm", "Mystic mirage"]
                       }
                      }
                     },
"corvus_glaive" :    {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" :
                       {
                        "name" : "Corvus glaive", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Boogeyman", "Pain Wheel", "Piercing Strike", "Deadly Charge", "Peek-a-boo"],
                        "gears" : ["Corvus' halberd", "Black hood", "Black battle pants", "Black gauntlets"]
                       }
                      }
                     },
"crossbones" :       {
                      "uniform" : "cacw",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Crossbones", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Gauntlet punch", "Hitman", "Air combo", "Specialist", "Air strike"]
                       },
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Crossbones", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Gauntlet punch", "Mercenary stash", "Air combo", "Specialist", "Light'em up"],
                        "bonus" : ["Apply to: Self", "Critical rate +15%"],
                        "links" : ["anad/black_cat", "cacw/black_panther", "anad/gamora", "now/yellow_jacket", "anad/iron_fist"]
                       }
                      }
                     },
"crystal" :          {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "anad" :
                       {
                        "name" : "Crystal", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Cyclone", "Flame manipulation", "Waterspout", "Elemental fusion", "Veil of the Earth"]
                       }
                      }
                     },
"daisy_johnson" :    {
                      "uniform" : "maos",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :
                       {
                        "name" : "Daisy Johnson", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Pulse punch", "A real stunner", "More bang for your punch", "Vibrations", "Quake"]
                       },
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Quake", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Pulse punch", "A real stunner", "More bang for your punch", "Vibrations", "Quake"],
                        "bonus" : ["Apply to: Self", "Mind damage immune"],
                        "links" : ["claws/black_cat", "wj/punisher", "aaou/captain_america", "classic_70/ghost_rider", "ultimate/green_goblin"]
                       },
                       // TODO : image need to be recreated from game
                       "maosq" :
                       {
                        "name" : "Daisy Johnson", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Pulse punch", "A real stunner", "More bang for your punch", "Vibrations", "Quake"],
                        "bonus" : ["Additional strike for skill: More bang for your punch"],
                        "links" : ["anad/black_bolt", "cacw/captain_america", "aaou_speed/ultron", "sa/star_lord", "anad/sister_grimm"]
                       }
                      }
                     },
"daredevil" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Daredevil", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Billy club shot", "Blind strike", "Club swing", "Staff splash", "Blind sided"]
                       },
                       // TODO : image need to be recreated from game
                       "dohk" :
                       {
                        "name" : "Daredevil", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Billy club shot", "Blind strike", "Club swing", "Staff splash", "Blind sided"],
                        "bonus" : ["Activation rate: when enemies are within 3m range", "Apply to: Enemy", "Blind (5 sec.)", "20% chance for melee enemy to miss"],
                        "links" : ["anca/falcon", "capdoc/modok", "websuit/silk", "aaou/thor", "classic/nebula"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Daredevil", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Billy club shot", "Blind strike", "Billy club", "Staff splash", "Blind sided"],
                        "bonus" : ["Activation rate: when dodging", "Apply to: Self", "All speed +20% (10 sec.)", "Cooldown time 15 seconds"],
                        "links" : ["aaou/iron_man", "aaou/hawkeye", "sw_zombies/venom", "doc_strange/mordo", "anca/falcon"]
                       }
                      }
                     },
"deathlok" :         {
                      "uniform" : "maos",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :
                       {
                        "name" : "Deathlok", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Tactical shoot-out", "Covering fire", "S.H.I.E.L.D. soldier", "Upgraded missile", "Perfect shot"]
                       },
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Deathlok", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Tactical shoot-out", "Covering fire", "S.H.I.E.L.D. soldier", "Upgraded missile", "Perfect shot"],
                        "bonus" : ["Activation rate: 10% when attacking", "Physical attack 30% physical damage", "Cooldown time 10 seconds"],
                        "links" : ["sa/star_lord", "aaou_combat/ultron", "sw_renew/spider_man", "aaou/iron_man", "aaou/captain_america"]
                       }
                      }
                     },
"destroyer" :        {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Destroyer", "attackBase" : "energy", "species" : "creature", "gender" : "neutral", "side" : "neutral", "type" : "universal",
                        "skills" : ["Disintegration beam", "Crush", "Electromagnetic wave", "Obliteration wave", "Asgardian armament"]
                       },
                       // TODO : image need to be recreated from game
                       "prometheus" :
                       {
                        "name" : "Destroyer", "attackBase" : "energy", "species" : "creature", "gender" : "neutral", "side" : "neutral", "type" : "universal",
                        "skills" : ["Disintegration beam", "Crush", "Electromagnetic wave", "Obliteration wave", "Asgardian armament"],
                        "bonus" : ["Activation rate: 30% when attacking", "Apply to: Self", "Increase damage by 170% for 2 times. (10 sec.)", "Cooldown time 15 seconds"],
                        "links" : ["mam/ant_man", "now/captain_america", "aaou_blast/ultron", "hda/hulkbuster", "cacw/black_panther"]
                       }
                      }
                     },
"doctor_strange" :  {
                      "uniform" : "anad",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Doctor Strange", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Crimson bands of Cyttorak", "Demons of Denak", "Eye of Agamotto", "All-seeing eye", "Sorcerer supreme"]
                       },
                       // TODO : image need to be recreated from game
                       "doc_strange" :
                       {
                        "name" : "Doctor Strange", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Crimson bands of Cyttorak", "Demons of Denak", "Eye of Agamotto", "All-seeing eye", "Sorcerer supreme"],
                        "bonus" : ["Activation rate: when Demons of Denak skill is used", "Apply to: Self", "Max HP recovery 8% (1 sec.)", "Reflect 40% of incoming damage (50% of max attack power) (5 sec.)", "Cooldown time 1 second"],
                        "links" : ["an/she_hulk", "ca/winter_soldier", "modern/deathlok", "ultimate/green_goblin", "claws/black_cat"]
                       }
                      }
                     },
"dormammu" :        {
                      "uniform" : "classic",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Dormammu", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Lava extrusion", "Dread flame", "Deadly laser", "Flame shield", "Dark dimension"]
                       }
                      }
                     },
"drax" :             {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :
                       {
                        "name" : "Drax", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Dagger fall", "Takedown", "Cry for blood", "Obliterate", "Blade retribution"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Drax", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Dagger fall", "Takedown", "Cry for blood", "Obliterate", "Blade retribution"],
                        "bonus" : ["Apply to: Self", "Defense penetration 10%"],
                        "links" : ["aaou_speed/ultron", "cacw/winter_soldier", "prometheus/destroyer", "modern/sif", "claws/black_cat"]
                       }
                      }
                     },
"ebony_maw" :        {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" :
                       {
                        "name" : "Ebony maw", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Stone columns", "Stones storm", "Dark reinforcement", "Shadow attack", "Dark meteor"],
                        "gears" : ["Conspiracy", "Gold insignia", "Black pants", "Black order pattern"]
                       }
                      }
                     },
"elektra" :          {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "classic" :
                       {
                        "name" : "Elektra", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Blood rush", "Harsh strike", "Throwing sais", "Silent ambush", "Red assassin"]
                       },
                       "md" :
                       {
                        "name" : "Elektra", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Blood rush", "Harsh strike", "Throwing sais", "Silent ambush", "Red assassin"],
                        "bonus" : ["Activation rate: when skill Throwing sais is used", "Apply to: Self", "Increase critical damage by 15% (5 sec.)", "Increase all speeds by 10% (5 sec.)", "Cooldown time 2 seconds"],
                        "links" : ["md/punisher", "unleashed/elsa_bloodstone", "capdoc/modok", "doc_strange/mordo", "sw_future/hulk"]
                       }
                      }
                     },
"elsa_bloodstone" :  {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Elsa Bloodstone", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Bloodstone training", "Filled with hate", "Nowhere to hide", "No mercy", "No escape"],
                        "gears" : ["Hunting rifle", "Leather coat", "Enhanced tights", "Bloodstone choker"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_zombies" :
                       {
                        "name" : "Elsa Bloodstone", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Bloodstone training", "Filled with hate", "Nowhere to hide", "No mercy", "Red flame"],
                        "bonus" : ["Activation rate: 10% when attacking", "Apply to: Self", "Skill cooltime 35% (15 sec.)", "All attack +30% (15 sec.)", "All speed +8% (15 sec.)", "Critical rate +35% (15 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["websuit/silk", "ca/winter_soldier", "annihilation/ronan", "anad/rocket_raccoon", "cacw/war_machine"],
                        "gears" : ["Hunting rifle", "Trench coat", "S.H.I.E.L.D. enhanced tights", "Bloodstone"]
                       },
                       "unleashed" :
                       {
                        "name" : "Elsa Bloodstone", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Bloodstone training", "Retribution", "Nowhere to hide", "No mercy", "Force of Bloodstone"],
                        "bonus" : ["Activation rate: 10% when attacking", "Apply to: Self", "Skill cooltime 35% (15 sec.)", "All attack +30% (15 sec.)", "All speed +8% (15 sec.)", "Critical rate +35% (15 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["unleashed/hulk_cho", "sw_red_skull/red_skull", "anad/sister_grimm", "sw_1602/angela", "classic_70/blade"],
                        "gears" : ["Spell converting handgun", "Blue trench coat", "Tech pants", "Bloodstone choker"]
                       }
                      }
                     },
"enchantress" :      {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Enchantress", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "blast",
                        "skills" : ["Sorceress whip", "Maiden's farewell", "Sorceress sphere", "Fatal illusion", "Enchanted entrapment"],
                        "gears" : ["Asgard magic", "Charming dress", "Goddess attire", "Green long gloves"]
                       }
                      }
                     },
"falcon" :           {
                      "uniform" : "catws",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "catws" :
                       {
                        "name" : "Falcon", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Vertical descent", "Swoop", "Raptor strafe", "Sky-high", "Air superiority"]
                       },
                       // TODO : image need to be recreated from game
                       "anca" :
                       {
                        "name" : "Falcon", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Shield throw", "Swoop", "Raptor strafe", "Sky-high", "Air superiority"],
                        "bonus" : ["Activation Rate: 25% when attacking", "Physical attack 58% physical damage", "Cooldown time 5 seconds"],
                        "links" : ["iar/ghost_rider", "sw_future/hulk", "unworthy/thor", "anad/iron_fist", "cacw/ant_man"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Falcon", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Vertical descent", "Swoop", "Raptor strafe", "Sky-high", "Air superiority"],
                        "bonus" : ["Activation Rate: 25% when attacking", "Physical attack 58% physical damage", "Cooldown time 5 seconds"],
                        "links" : ["cacw/black_panther", "modern2/giant_man", "cacw/agent_13", "aaou/black_widow", "cacw/iron_man"]
                       }
                      }
                     },
"fandral" :          {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Fandral", "attackBase" : "physical`", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Dashing strike", "Handsome blade", "Side-step slice", "Dancing blade", "Fandral's formation"]
                       }
                      }
                     },
"gamora" :           {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :
                       {
                        "name" : "Gamora", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Dagger throw", "Death dealer", "Godslayer", "Spinning slash", "Slide n'slice"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Gamora", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Dagger throw", "Death dealer", "Godslayer", "Spinning slash", "Slide n'slice"],
                        "bonus" : ["Increase bleed damage"],
                        "links" : ["dohk/daredevil", "catws/captain_america", "ssm/octopus", "cacw/hawkeye", "anad/daredevil"]
                       }
                      }
                     },
"ghost_rider" :      {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Ghost rider", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Chains ablaze", "Highway to hell", "Hellfire", "Damnation chains", "Penance stare"]
                       },
                       // TODO : image need to be recreated from game
                       "classic_70" :
                       {
                        "name" : "Ghost rider", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Chains ablaze", "Highway to hell", "Hellfire", "Damnation chains", "Penance stare"],
                        "bonus" : ["Energy attack 15% fire damage add fire damage 13", "Increase skill duration for Chains ablaze"],
                        "links" : ["maosq/daisy_johnson", "doc_strange/doctor_strange", "sw_thors/groot", "doc_strange/ancient_one", "annihilation/ronan"]
                       },
                       // TODO : image need to be recreated from game
                       "iar" :
                       {
                        "name" : "Ghost rider", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Chains ablaze", "Getaway car", "Hellfire", "Damnation chains", "Hit and run"],
                        "bonus" : ["Energy attack 15% fire damage add fire damage 13", "Increase skill duration for Chains ablaze"],
                        "links" : ["modern/sif", "classic_70/ghost_rider", "ca/winter_soldier", "sw_1872/bullseye", "anad/yondu"]
                       }
                      }
                     },
"ghostrider_reyes" : {
                      "uniform" : "now",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "now" :
                       {
                        "name" : "Ghost rider - Robbie Reyes", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Chain lash", "Torque chain", "Demon bind", "Tire scorcher", "Hell racer"]
                       }
                      }
                     },
"giant_man" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Giant man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Jump kick", "Giant stomp", "Growing pains", "Crashing foot falls", "Giant jackhammer"]
                       },
                       // TODO : image need to be recreated from game
                       "modern2" :
                       {
                        "name" : "Goliath", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Jump kick", "Giant stomp", "Growing pains", "Crashing foot falls", "Giant jackhammer"],
                        "bonus" : ["Activation rate: when using Enlarge buff", "Apply to: Self", "All defense +10% (20 sec.)", "All attack +10% (20 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["aaou_combat/ultron", "unworthy/thor", "doc_strange/wong", "aaou/captain_america", "doc_strange/mordo"]
                       }
                      }
                     },
"green_goblin" :     {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Green goblin", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "speed",
                        "skills" : ["Pumpkin bombs", "Bag of tricks", "Pumpkin barrage", "Bombing run", "Aerial charge"]
                       },
                       // TODO : image need to be recreated from game
                       "ultimate" :
                       {
                        "name" : "Green goblin", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Goblin's strike", "Fiery smash", "Fiery bolts", "Fiery quake", "Goblin's rage"],
                        "bonus" : ["Activation rate: 82% when hit", "Apply to: Self", "Immune to all damage (4 sec.)", "Cooldown time 8 seconds"],
                        "links" : ["aaou_combat/ultron", "aaou/iron_man", "aaou_speed/ultron", "anad/daredevil", "anad/mockingbird"]
                       }
                      }
                     },
"groot" :            {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :
                       {
                        "name" : "Groot", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Branch crunch", "Root swipe", "Spore", "Groot smash", "We are Groot!"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_thors" :
                       {
                        "name" : "Groot", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Branch crunch", "Electrics roots", "Spore", "I am Thor", "We are Groot!"],
                        "bonus" : ["Apply to: Self", "Lightning damage immune"],
                        "links" : ["now/captain_america", "modern/sif", "doc_strange/wong", "an/she_hulk", "modern/daisy_johnson"]
                       }
                      }
                     },
"gwenpool" :         {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Gwenpool", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Katana kick", "Figure skate", "Bombs 'n bullets", "Bullet rain", "Gift special"],
                        "gears" : ["Twin swords", "Gwenpool suit", "Gwenpool mask", "Submachine gun"]
                       }
                      }
                     },
"gorgon" :           {
                      "uniform" : "warofking",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "warofking" :
                       {
                        "name" : "Gorgon", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Storming party", "Mace throw", "War cry", "Seismic shocks", "War stomp"]
                       }
                      }
                     },
"hawkeye" :          {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" :
                       {
                        "name" : "Hawkeye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Arrow barrage", "Sure shot", "Trick shot", "Piercing arrow", "Evasive shot"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou" :
                       {
                        "name" : "Hawkeye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Arrow barrage", "Sure shot", "Trick shot", "Piercing arrow", "Evasive shot"],
                        "bonus" : ["Activation rate: when dealing critical attack", "Apply to: Enemy", "Stun (1 sec.)", "Cooldown time 5 seconds"],
                        "links" : ["anca/falcon", "doc_strange/ancient_one", "sw_zombies/elsa_bloodstone", "noir/punisher", "modern/lash"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Hawkeye", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Arrow barrage", "Sure shot", "Trick shot", "Piercing arrow", "Evasive shot"],
                        "bonus" : ["Activation rate: when dealing critical attack", "Apply to: Enemy", "Stun (1 sec.)", "Increase the number of projectiles when using the Piercing arrow skill", "Cooldown time 5 seconds"],
                        "links" : ["aaou_combat/ultron", "cacw/winter_soldier", "aaou/captain_america", "unleashed/hulk_cho", "sw_thors/groot"]
                       }
                      }
                     },
"hawkeye_kate" :     {
                      "uniform" : "now",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "now" :
                       {
                        "name" : "Hawkeye - Kate Bishop", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Explosion shot", "Trick arrows", "Swift archer", "Last one-shot", "Fuse shot"]
                       }
                      }
                     },
"hela" :             {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Hela", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "universal",
                        "skills" : ["Fires of Hel", "Nightsword stab", "Merciless Queen", "Nightsword's glow", "Goddess of death"]
                       }
                      }
                     },
"hellcat" :          {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "anad" :
                       {
                        "name" : "Hellcat", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Cat's cradle", "Leaping cat", "Sharp claw", "Cat's grudge", "Fierce claw"]
                       }
                      }
                     },
"hellstrom" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Hellstrom", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Ring of fire", "Trident thrust", "Eternal punishment", "Cult following", "Fire burst"]
                       }
                      }
                     },
"hogun" :            {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Hogun", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Grim dagger", "Iron mace", "Mace enchantment", "Iron fury", "Hogun's formation"]
                       }
                      }
                     },
"hulk" :             {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" :
                       {
                        "name" : "Hulk", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Hulk charge", "Thunder clap", "Hulk smash", "Hulk stomp", "Hulk slam"],
                        "gears" : ["Rage", "Ripped pants", "Gamma radiation", "Dr. Banner glass"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_future" :
                       {
                        "name" : "Maestro", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Hulk charge", "Thunder clap", "Hulk smash", "Hulk stomp", "Hulk slam"],
                        "bonus" : ["Activation rate: 20% when attacking", "Physical attack 42% poison damage", "Cooldown time 10 seconds"],
                        "links" : ["modern/lash", "anad/malekith", "wwh/hulk", "modern/deathlok", "anad/drax"],
                        "gears" : ["Rage", "Maestro pants", "Gamma radiation", "Ornament necklace"]
                       },
                       // TODO : image need to be recreated from game
                       "wwh" :
                       {
                        "name" : "Hulk", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Hulk charge", "Shield bash", "Lunge strike", "Raging charge", "Hulk slam"],
                        "bonus" : ["Apply to: Self", "Immune to guard break"],
                        // TODO : check if the linked uniform to ultron is the correct ultron uniform
                        "links" : ["aaou/hawkeye", "aaou/black_widow", "aaou_blast/ultron", "now/squirrel_girl", "aaou/thor"],
                        "gears" : ["Hulk blade", "Shoulder phase", "Gamma radiation", "Defender shield"]
                       }
                      }
                     },
"hulk_cho" :         {
                      "uniform" : "tah",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "tah" :
                       {
                        "name" : "Hulk Cho", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Tornado punch", "Counter slam", "Meteor drop", "Gamma stomp", "Tectonic toss"]
                       },
                       // TODO : image need to be recreated from game
                       "unleashed" :
                       {
                        "name" : "Hulk Cho", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Tornado punch", "Counter slam", "Chain collision", "Gamma stomp", "Gamma explosion"],
                        "bonus" : ["Apply to: Self", "Super armor, all defense +20%"],
                        "links" : ["armored/moon_knight", "doc_strange/ancient_one", "an/she_hulk", "anad/gamora", "cacw/falcon"]
                       }
                      }
                     },
"hulkbuster" :       {
                      "uniform" : "avengers",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" :
                       {
                        "name" : "Hulkbuster - Mark 44", "attackBase" : "physical", "species" : "creature", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Repulsor smash", "Hydraulic boom", "Jet-assisted takedown", "Arc reactor burst", "Barrage strike"]
                       },
                       // TODO : image need to be recreated from game
                       "hda" :
                       {
                        "name" : "Hulkbuster - Mark 43", "attackBase" : "physical", "species" : "creature", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Bullet punch", "Hydraulic boom", "Jet-assisted takedown", "Arc reactor burst", "Barrage strike"],
                        "bonus" : ["Activation rate: 5% when attacking", "Apply to: Self", "Skill cooltime 50% (10 sec.)", "Cooldown time 20 seconds."],
                        "links" : ["ms_marvel/captain_marvel", "cacw/spider_man", "ssm/octopus", "anad/rocket_raccoon", "anad/drax"]
                       }
                      }
                     },
"hulkling" :         {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" :
                       {
                        "name" : "Hulkling", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Shape-shift slam", "Excelsior", "Shape-shift scrape", "Sky-dive swoop", "Ruler of the sword"]
                       }
                      }
                     },
"hyperion" :         {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Hyperion", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Soaring Uppercut", "Heat Blast", "Sun God", "Solar Flare", "Atomic Vision"],
                        "gears" : ["Atomic vision", "Black compression shirt", "Atomic belt", "Golden cape"]
                       }
                      }
                     },
"inferno" :          {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "anad" :
                       {
                        "name" : "Inferno", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Burning fist", "Incineration", "Blazing storm", "Ignition", "Volcano burst"]
                       }
                      }
                     },
"iron_fist" :        {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "classic" :
                       {
                        "name" : "Iron fist", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Chi of flying crane", "Pressure point jab", "K'un-Lun focus", "The iron fist", "Chi strike"]
                       },
                       "na" :
                       {
                        "name" : "Iron fist", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Chi of flying crane", "Pressure point jab", "K'un-Lun focus", "The iron fist", "Chi strike"],
                        "bonus" : ["Activation rate: when HP is below 30%", "Apply to: Self", "Max HP recovery 10%", "Invincible (5 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["sw_1602/angela", "claws/black_cat", "doc_strange/wong", "anad/black_cat", "cacw/black_widow"]
                       },
                       "anad" :
                       {
                        "name" : "Iron fist", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Chi of flying crane", "Pressure point jab", "K'un-Lun focus", "The iron fist", "Chi strike"],
                        "bonus" : ["Activation rate: when HP is below 30%", "Apply to: Self", "Max HP recovery 10%", "Invincible (5 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["anad/yondu", "sw_armor_wars/kingpin", "anad/black_bolt", "anad/malekith", "modern/lash"]
                       },
                       "mif" :
                       {
                        "name" : "Iron fist", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Chi of flying crane", "Pressure point jab", "K'un-Lun focus", "The iron fist", "Immortal iron fist"],
                        "bonus" : ["Activation rate: when HP is below 30%", "Apply to: Self", "Max HP recovery 10%", "Invincible (5 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["mlc/luke_cage", "ca/winter_soldier", "karachi/ms_marvel", "sw_2099/black_widow", "ip/war_machine"]
                       }
                      }
                     },
"iron_man" :         {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Iron man", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Repulsor Blast", "Repulsor ray", "Unibeam", "Missile Barrage", "The One-Off"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou" :
                       {
                        "name" : "Iron man", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Repulsor Blast", "Repulsor ray", "Unibeam", "Missile Barrage", "The One-Off"],
                        "bonus" : ["Activation rate: 25% when hit", "Energy attack 66% physical damage", "Cooldown time 5 seconds"],
                        "links" : ["anad/wasp", "noir/punisher", "maosq/daisy_johnson", "anad/rocket_raccoon", "sw_renew/spider_man"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_2099" :
                       {
                        "name" : "Iron man", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Repulsor Blast", "Repulsor ray", "Unibeam", "Missile Barrage", "The One-Off"],
                        "bonus" : ["Fires more ammos with skill: Missile barrage"],
                        "links" : ["maos/daisy_johnson", "ca/winter_soldier", "sw_red_skull/red_skull", "wwh/hulk", "noir/punisher"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Iron man", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Repulsor Blast", "Crash landing", "Unibeam", "Missile Barrage", "The One-Off"],
                        "bonus" : ["Fires more ammos with skill: Missile barrage"],
                        "links" : ["sa/star_lord", "cacw/agent_13", "anad/iron_fist", "spidoc/modok", "classic/nebula"]
                       }
                      }
                     },
"ironheart" :        {
                      "uniform" : "now",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "now" :
                       {
                        "name" : "Ironheart", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Iron blade", "Air raid mode", "Ambush fire", "Barrage fire", "Prime cannon"],
                        "gears" : ["Repulsors", "Model-prime armor", "All-in-one tool set", "STARK A.I."]
                       }
                      }
                     },
"jessica_jones" :    {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Jessica Jones", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Coming for you", "Bum-rush", "Smack down", "Powerhouse", "Collateral damage"]
                       }
                      }
                     },
"kaecilius" :        {
                      "uniform" : "doc_strange",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "doc_strange" :
                       {
                        "name" : "Kaecilius", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Summon stone", "Falling rock", "Earth cutter", "Dagger summon", "Mystical avalanche"]
                       }
                      }
                     },
"karnak" :           {
                      "uniform" : "warofking",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "warofking" :
                       {
                        "name" : "Karnak", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Side-splitter", "Gale", "Composure", "Charging strike", "Death chop"]
                       },
                       "anad" :
                       {
                        "name" : "Karnak", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Side-splitter", "Gale", "Wave of wisdom", "Charging strike", "Death chop"],
                        "bonus" : ["Activation rate: 35% when debuffed", "Apply to: Self", "Remove all debuffs (2 sec.)", "Cooldown time 15 seconds"],
                        "links" : ["unleashed/elsa_bloodstone", "attilanrising/black_bolt", "iar/ghost_rider", "anad/daredevil", "sw_2099/iron_man"]
                       }
                      }
                     },
"kidkaiju" :         {
                      "uniform" : "unleashed",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "unleashed" :
                       {
                        "name" : "Kid Kaiju", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Fireclaw summon", "Slizzik summon", "Sketch up", "Tag-team titan", "Monter Mayhem"]
                       }
                      }
                     },
"kingpin" :          {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Kingpin", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Stick shot", "Jump strike", "Knock-out", "Body slam", "Criminal mastermind"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_armor_wars" :
                       {
                        "name" : "Kingpin", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Blast barrage", "Jump strike", "Channeled beams", "Body slam", "Criminal mastermind"],
                        "bonus" : ["Activation rate: 10% when hit", "Apply to: Self", "Generate a physical shield with 20% of maximum health (10 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["now/red_hulk", "doc_strange/wong", "sw_2099/iron_man", "sw_future/hulk", "anad/daredevil"]
                       }
                      }
                     },
"lash" :             {
                      "uniform" : "maos",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :
                       {
                        "name" : "Lash", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Found wanting", "Disintegrate", "Knock out", "Undeserving", "Cull the weak"]
                       },
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Lash", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Found wanting", "Disintegrate", "Knock out", "Undeserving", "Cull the weak"],
                        "bonus" : ["Activation rate: 10% when attacking", "Energy attack 54% energy damage", "Cooldown time 10 seconds"],
                        "links" : ["anad/malekith", "aaou/captain_america", "sw_2099/iron_man", "sw_armor_wars/kingpin", "modern2/giant_man"]
                       }
                      }
                     },
"lincoln_campbell" : {
                      "uniform" : "maos",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :
                       {
                        "name" : "Lincoln Campbell", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Electromagnetism", "Electro-blast", "Protective dome", "Magnetic repulsion", "Electrical field"]
                       }
                      }
                     },
"loki" :             {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" :
                       {
                        "name" : "Loki", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Scepter bolt", "Arcane blast", "Energy barrier", "Astral projection", "Mind games"]
                       },
                       // TODO : image need to be recreated from game
                       "ll" :
                       {
                        "name" : "Loki", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "universal",
                        "skills" : ["Scepter bolt", "Arcane blast", "Energy barrier", "Astral projection", "Mind games"],
                        "bonus" : ["Add freeze effect to Scepter bolt skill"],
                        "links" : ["hda/hulkbuster", "na/iron_fist", "sw_renew/spider_man", "anad/luke_cage", "sw_red_skull/red_skull"]
                       }
                      }
                     },
"luke_cage" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "modern" :
                       {
                        "name" : "Luke Cage", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Dempsey roll", "Street style", "Screaming", "Sweet christmas", "Tactical offense"]
                       },
                       "anad" :
                       {
                        "name" : "Luke Cage", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Dempsey roll", "Street style", "Screaming", "Sweet christmas", "Tactical offense"],
                        "bonus" : ["Increase skill duration of Heroes for Hire, reduce cooldown time"],
                        "links" : ["aaou_combat/ultron", "now/captain_america", "ca/winter_soldier", "sw_2099/iron_man", "cacw/black_widow"]
                       },
                       "mlc" :
                       {
                        "name" : "Luke Cage", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Dempsey roll", "Street style", "Backup call", "Sweet christmas", "Tactical offense"],
                        "bonus" : ["Increase skill duration of Heroes for Hire, reduce cooldown time", "Add guard break effect on skill Street style"],
                        "links" : ["mif/iron_fist", "anad/malekith", "ll/loki", "sw_renew/spider_man", "mam/ant_man"]
                       }
                      }
                     },
"malekith" :         {
                      "uniform" : "ttdw",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "ttdw" :
                       {
                        "name" : "Malekith", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Aether bolt", "Shadow flurry", "Extinguish darkness", "Storm of the aether", "The accursed"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Malekith", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Aether bolt", "Shadow flurry", "Ether blade", "Storm of the aether", "The accursed"],
                        "bonus" : ["Activation rate: 12% when hit", "Apply to: Self", "Max HP recovery 10% (1 sec.)", "Cooldown time 7 seconds"],
                        "links" : ["cacw/falcon", "modern2/giant_man", "ati/war_machine", "unleashed/hulk_cho", "aaou/vision"]
                       }
                      }
                     },
"maximus" :          {
                      "uniform" : "warofking",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "warofking" :
                       {
                        "name" : "Maximus", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Deadly invention", "Lunatic control", "Electric barrier", "Ultimate weapon", "Evil trick"]
                       }
                      }
                     },
"medusa" :           {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Medusa", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Hair drill", "Hair constrictor", "Hair blossom", "Split ends", "Queen's embrace"]
                       }
                      }
                     },
"miles_morales" :    {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Miles Morales", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Foe flip", "Back bite", "Wild web", "Shock and awe", "Blasting burst"]
                       }
                      }
                     },
"misty_knight" :     {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Misty Knight", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Frost wave", "Freeze strike", "Spark burst", "Cold shoulder", "Bionic bomber"]
                       }
                      }
                     },
"mockingbird" :      {
                      "uniform" : "ha",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "ha" :
                       {
                        "name" : "Mocking bird", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Twin stave attack", "Bo-staff kick", "Concentration", "Bo-staff strike", "Bo-staff take down"]
                       },
                       // TODO : image need to be recreated from game
                       "maos" :
                       {
                        "name" : "Bobbi Morse", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Twin stave attack", "Bo-staff kick", "Concentration", "Bo-staff strike", "Bo-staff take down"],
                        "bonus" : ["Activate rate: 30% when attacking", "Apply to: Self", "1 attack activate guard break (2 sec.)", "Cooldown time 3 seconds"],
                        "links" : ["ati/war_machine", "unleashed/hulk_cho", "doc_strange/wong", "sw_2099/black_widow", "anad/luke_cage"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Mocking bird", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Twin stave attack", "Bo-staff kick", "Baton throw", "Bo-staff barrage", "Bo-staff take down"],
                        "bonus" : ["Activate rate: 30% when attacking", "Apply to: Self", "1 attack activate guard break (2 sec.)", "Cooldown time 3 seconds"],
                        "links" : ["dohk/daredevil", "ip/war_machine", "maos/mockingbird", "now/red_hulk", "capdoc/modok"]
                       }
                      }
                     },
"modok" :            {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "M.O.D.O.K.", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Dominance of spirit", "Doomsday chair shot", "Impending doom", "Telekinetic force blast", "Head-on"]
                       },
                       // TODO : image need to be recreated from game
                       "spidoc" :
                       {
                        "name" : "M.O.D.O.K.", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Puppet master", "Pulling strings", "Designed to web", "Telekinetic force blast", "Head-on"],
                        "bonus" : ["Decrease enemies all speed with Regular attack"],
                        "links" : ["doc_strange/doctor_strange", "modern/lash", "ll/loki", "wwh/hulk", "aaou/vision"]
                       },
                       // TODO : image need to be recreated from game
                       "capdoc" :
                       {
                        "name" : "M.O.D.O.K.", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Dominance of spirit", "Doomsday chair shot", "Impending doom", "Telekinetic force blast", "Head-on"],
                        "bonus" : ["Activation rate: 25% when hit", "Apply to: Self", "Immune to all damage (2 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["classic_70/blade", "ip/war_machine", "anad/daredevil", "iar/ghost_rider", "mam/ant_man"]
                       }
                      }
                     },
"moon_girl" :        {
                      "uniform" : "now",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "now" :
                       {
                        "name" : "Moon Girl", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Air raid siren", "Taser punch", "Soda bomb", "Moon beam", "Bubble pop"]
                       }
                      }
                     },
"moon_knight" :      {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Moon knight", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Moon strike", "Crescent bommerang", "Staff slam", "Full moon", "Lunar eclipse"],
                        "gears" : ["Truncheon", "Chest armor", "Silver cloak", "Crescent dart"]
                       },
                       // TODO : image need to be recreated from game
                       "armored" :
                       {
                        "name" : "Moon knight", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Midnight combo", "Crescent darts", "Staff slam", "Full moon", "Lunar eclipse"],
                        "bonus" : ["Increased no. of projectiles on Crescent dart skill"],
                        "links" : ["doc_strange/mordo", "websuit/silk", "sw_armor_wars/kingpin", "sw_1872/bullseye", "maosq/daisy_johnson"],
                        "gears" : ["Truncheon", "Chest armor", "Silver cloak", "Crescent dart"]
                       }
                      }
                     },
"mordo" :            {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Baron Mordo", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Energy sphere", "Energy whip", "Energy shock", "Seeking spear", "Flame pillar"]
                       },
                       // TODO : image need to be recreated from game
                       "doc_strange" :
                       {
                        "name" : "Mordo", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Serpent staff", "Chain staff", "Sacred staff", "Heaven strike", "Maelstrom staff"],
                        "bonus" : ["Activate rate: 10% when attacking", "Apply to: Self", "All speed +10% (10 sec.)", "Energy damage immune (5 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["aaou_blast/ultron", "aaou/black_widow", "ip/war_machine", "noir/punisher", "doc_strange/doctor_strange"]
                       }
                      }
                     },
"ms_marvel" :        {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Ms marvel - Kamala Khan", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Enlarge hook", "Shifting punch", "Morphing stomp", "Party smash", "Polymorph"]
                       },
                       "karachi" :
                       {
                        "name" : "Ms marvel - Kamala Khan", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Enlarge hook", "Shifting punch", "Morphing stomp", "Party smash", "Polymorph"],
                        "bonus" : ["Apply to: Self", "Increase all speeds by 10%", "Increase HP by 20%"],
                        "links" : ["now/captain_america", "unleashed/hulk_cho", "aaou/captain_america", "ms_marvel/captain_marvel", "capdoc/modok"]
                       }
                      }
                     },
"nebula" :           {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :
                       {
                        "name" : "Nebula", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "combat",
                        "skills" : ["Elegant kick", "Sudden strike", "Vicious spree", "Dagger dance", "Shooting star"]
                       },
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Nebula", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "combat",
                        "skills" : ["Elegant kick", "Sudden strike", "Vicious spree", "Dagger dance", "Shooting star"],
                        "bonus" : ["Add stun effect to skill Sudden strike"],
                        "links" : ["doc_strange/doctor_strange", "an/she_hulk", "sa/star_lord", "now/captain_america", "iar/ghost_rider"]
                       }
                      }
                     },
"octopus" :          {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Doctor Octopus", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Tentacle sling", "Rock throw", "Tentacle block", "Tentacle punch", "Armed and dangerous"]
                       },
                       // TODO : image need to be recreated from game
                       "ssm" :
                       {
                        "name" : "Doctor Octopus", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Web caught", "Final embrace", "Spiderlings", "From the sky", "Arachnophobia"],
                        "bonus" : ["Activate rate: when dodging", "Apply to: Self", "Increase damage by 120% for 1 times (5 sec.)", "Cooldown time 8 seconds"],
                        "links" : ["doc_strange/mordo", "aaou/hawkeye", "ultimate/green_goblin", "anad/sister_grimm", "spidoc/modok"]
                       }
                      }
                     },
"odin" :             {
                      "uniform" : "modern",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Odin", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["King slash", "Odin charge", "Asgardian barrier", "Odin's wrath", "Odinforce"],
                        "gears" : ["Odinsword", "Battle armor of the all-father", "Eye patch of Odin", "Odinforce"]
                       }
                      }
                     },
"phil_coulson" :     {
                      "uniform" : "maos",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :
                       {
                        "name" : "Phil Coulson", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Coulson's revenge", "Harnessing the destroyer", "Agent Melinda May", "Coulson special", "The captain card"]
                       }
                      }
                     },
"proxima_midnight" : {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" :
                       {
                        "name" : "Proxima midnight", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "universal",
                        "skills" : ["Impact Blow", "Midnight Blow", "Velocity Strike", "Piercing Abyss", "Midnight Sky"],
                        "gears" : ["Collapsing star spear", "Black combat uniform", "Golden pauldron and gauntlet", "Proxima mask"]
                       }
                      }
                     },
"punisher" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       "modern" :
                       {
                        "name" : "Punisher", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Grenade throw", "Flare", "Killer instinct", "Punish the guilty", "Incendiary rocket"]
                       },
                       "noir" :
                       {
                        "name" : "Punisher", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Grenade throw", "Flare", "Killer instinct", "Punish the guilty", "Incendiary rocket"],
                        "bonus" : ["Activation rate: when dealing critical attack", "Apply to: Self", "Physical attack +10% (20 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["sw_2099/captain_america", "classic/nebula", "anad/drax", "now/yellow_jacket", "aaou/black_widow"]
                       },
                       "wj" :
                       {
                        "name" : "Punisher", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Grenade throw", "Flare", "Perfect aim", "Rocket shower", "Incendiary rocket"],
                        "bonus" : ["Activation rate: when dealing critical attack", "Apply to: Self", "Physical attack +10% (20 sec.)", "Cooldown time 30 seconds"],
                        "links" : ["cacw/hawkeye", "ms_marvel/captain_marvel", "classic/nebula", "anca/falcon", "now/red_hulk"]
                       },
                       "md" :
                       {
                        "name" : "Punisher", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Grenade throw", "Flare", "Wild shot", "Rocket shower", "Smoke operation"],
                        "bonus" : ["Activation rate: 5% when attacking", "Apply to: Self", "Decrease skill cooldown by 30% (10 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["md/elektra", "anad/iron_fist", "attilanrising/black_bolt", "modern/crossbones", "modern2/giant_man"]
                       }
                      }
                     },
"red_hulk" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Red hulk", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Burning fury", "Hulk blast", "Irradiate", "Blazing leap", "Avalanche smash"]
                       },
                       // TODO : image need to be recreated from game
                       "now" :
                       {
                        "name" : "Red hulk", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Burning fury", "Hulk blast", "Gunfire", "Blazing leap", "Avalanche smash"],
                        "bonus" : ["Activation rate: when hp is below 50%", "Apply to: Self", "Max hp recovery 15% (1 sec)", "Cooldown time 7 seconds"],
                        "links" : ["anad/wasp", "doc_strange/doctor_strange", "cacw/captain_america", "cacw/black_widow", "noir/punisher"]
                       }
                      }
                     },
"red_skull" :        {
                      "uniform" : "catfa",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "catfa" :
                       {
                        "name" : "Red skull", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Rapid fire", "Fatal blow", "Strategist", "Cosmic cube destruction", "Legion of Hydra"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_red_skull" :
                       {
                        "name" : "Red skull", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "speed",
                        "skills" : ["Rifle shield", "Skull cyclone", "Quick draw", "Cosmic cube destruction", "Legion of Hydra"],
                        "bonus" : ["Activation rate: 30% when attacking", "Apply to: Self", "Deals 30% bleed damage every 1 sec. (3 sec.)", "All speed -10% (10 sec.)", "Cooldown time 15 seconds"],
                        "links" : ["classic/nebula", "modern/sif", "sw_2099/captain_america", "cacw/spider_man", "sw_1602/angela"]
                       }
                      }
                     },
"rocket_raccoon" :   {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :
                       {
                        "name" : "Rocket racoon", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Heavy machine gun", "Covering fire", "Trip mine", "Ion cannon", "I've got a plan"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Rocket racoon", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Heavy machine gun", "Covering fire", "Trip mine", "Ion cannon", "I've got a plan"],
                        "bonus" : ["Increase number of mines"],
                        "links" : ["cacw/spider_man", "aaou/thor", "aaou_combat/ultron", "anad/mockingbird", "modern/crossbones"]
                       }
                      }
                     },
"ronan" :            {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :
                       {
                        "name" : "Ronan", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Tip the scales", "Universal weapon", "Arbitration", "Law enforcer", "Judgement call"]
                       },
                       // TODO : image need to be recreated from game
                       "annihilation" :
                       {
                        "name" : "Ronan", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Hammer charge", "Universal weapon", "Merciless gavel", "Law enforcer", "Judgement call"],
                        "bonus" : ["Add stun effect to Hammer charge skill"],
                        "links" : ["now/yellow_jacket", "iar/ghost_rider", "websuit/silk", "anad/angela", "sw_future/hulk"]
                       }
                      }
                     },
"satana" :           {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Satana", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Dancing flame", "Flamethrower", "Little minion", "Fire barrier", "Succubus army"]
                       }
                      }
                     },
"sharon_rogers" :    {
                      "uniform" : "ca_75",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "ca_75" :
                       {
                        "name" : "Sharon Rogers", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Riposte strike", "Sky dragoon", "Javelin blast", "Paladin blast", "Freedom strike"],
                        "gears" : ["Energy blast lance", "Kevlar-titanium uniform", "Helmet", "Vibranium shield"]
                       }
                      }
                     },
"shang_chi" :        {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Shang-Chi", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Nunchaku knockout", "Mystic clone", "Chi charge", "Mystic barrage", "Mystic army"],
                        "gears" : ["Nunchaku", "Red tights", "Gold shoes", "Metal bracelets"]
                       }
                      }
                     },
"she_hulk" :         {
                      "uniform" : "sw_a_force",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "sw_a_force" :
                       {
                        "name" : "She-hulk", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Opening statement", "Move to strike", "Cross examination", "Objection !", "Exhibit A"]
                       },
                       // TODO : image need to be recreated from game
                       "an" :
                       {
                        "name" : "She-hulk", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Opening statement", "Move to strike", "Cross examination", "Objection !", "Exhibit A"],
                        "bonus" : ["Apply to: Self", "Immune to guard break", "Cooldown time 10 seconds"],
                        "links" : ["cacw/black_widow", "ms_marvel/captain_marvel", "annihilation/ronan", "cacw/ant_man", "sw_2099/black_widow"]
                       }
                      }
                     },
"sif" :              {
                      "uniform" : "maos",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "maos" :
                       {
                        "name" : "Sif", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Sudden stab", "Combat strike", "Attack edge", "For glory !", "For honor!"]
                       },
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Sif", "attackBase" : "physical", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Stunning slash", "Asgardian grace", "Attack edge", "Goddess of war", "For honor!"],
                        "bonus" : ["Apply to: Self", "All speed +10%"],
                        "links" : ["unleashed/hulk_cho", "sw_zombies/elsa_bloodstone", "modern/crossbones", "anad/gamora", "wwh/hulk"]
                       }
                      }
                     },
"silk" :             {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Silk", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Spider and fly", "Look behind you", "Shield smash", "Web rebound", "The yo-yo"],
                        "gears" : ["Organic web", "Red hood", "Silk costume", "Silk sense"]
                       },
                       // TODO : image need to be recreated from game
                       "websuit" :
                       {
                        "name" : "Silk", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Spider and fly", "Look behind you", "Shield smash", "Silk spinner", "The yo-yo"],
                        "bonus" : ["Apply to: self", "2 sec increase to duration time of web"],
                        "links" : ["anad/wasp", "anad/iron_fist", "sw_zombies/venom", "anad/luke_cage", "anad/rocket_raccoon"],
                        "gears" : ["Organic web", "Web hood", "Web costume", "Silk sense"]
                       }
                      }
                     },
"sin" :              {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Sin", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "vilain", "type" : "speed",
                        "skills" : ["Pistol whip", "Strafe shot", "Rapid handgun", "Rocket launcher", "Eternal sin"]
                       }
                      }
                     },
"singularity" :      {
                      "uniform" : "sw_a_force",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "sw_a_force" :
                       {
                        "name" : "Singularity", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Ablation", "Space fold", "Supernova", "Meteorite", "Dimensional tear"],
                        "gears" : ["Dimensional power", "Star field", "Cat collar bracelet", "Purple ribbon"]
                       }
                      }
                     },
"sister_grimm" :     {
                      "uniform" : "sw_a_force",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "sw_a_force" :
                       {
                        "name" : "Sister Grimm", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Float on", "Punish", "Angry like a wolf", "Now you see me", "Rock and roll"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Sister Grimm", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Float on", "Punish", "Avian fury", "Now you see me", "Rock and roll"],
                        "bonus" : ["Adds burn damage to skills, Float on, Punish, and Angry like a wolf"],
                        "links" : ["na/iron_fist", "anad/black_bolt", "anad/mockingbird", "maosq/daisy_johnson", "sw_renew/spider_man"]
                       }
                      }
                     },
"songbird" :         {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" :
                       {
                        "name" : "Songbird", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Sonic wall", "Sonic flash", "Sonic shield", "Sonic armory", "Sonic maelstrom"]
                       }
                      }
                     },
"spider_gwen" :      {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Spider-Gwen", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Kick-tock", "Spin n'pin", "What goes up", "The blender", "One-two kick"]
                       }
                      }
                     },
"spider_man" :       {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Spider-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Web shot", "Web swing kick", "Webslinger", "Web fling", "Wrecking web"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_renew" :
                       {
                        "name" : "Spider-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Web shot", "Web swing kick", "Webslinger", "Web fling", "Wrecking web"],
                        "bonus" : ["Shoot more shots for skill: Web shot"],
                        "links" : ["cacw/hawkeye", "sw_2099/iron_man", "doc_strange/ancient_one", "modern/crossbones", "maos/mockingbird"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Spider-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Web shot", "Web swing kick", "Webslinger", "Web fling", "Wrecking web"],
                        "bonus" : ["Web shot and Webslinger inflict shock damage"],
                        "links" : ["anad/sister_grimm", "ssm/octopus", "cacw/war_machine", "mam/ant_man", "cacw/spider_man"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Spider-man", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Web blast", "Web swing kick", "Webslinger", "Web fling", "Wrecking web"],
                        "bonus" : ["Spider web effect added to the Spider kick skill"],
                        "links" : ["unleashed/hulk_cho", "na/iron_fist", "cacw/agent_13", "sw_2099/black_widow", "prometheus/destroyer"]
                       }
                      }
                     },
"squirrel_girl" :    {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" :
                       {
                        "name" : "Squirrel girl", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Squirrel bombs", "Scurry roll", "Tail whip", "Squirrel army", "Squirrel sidekick"]
                       },
                       // TODO : image need to be recreated from game
                       "now" :
                       {
                        "name" : "Squirrel girl", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "speed",
                        "skills" : ["Squirrel bombs", "Scurry roll", "Tail whip", "Squirrel army", "Squirrel sidekick"],
                        "bonus" : ["Activation rate: 20% when attacking", "Apply to: Self", "Increase damage by 110% for 1 time (5 sec.)", "Cooldown time 15 seconds"],
                        "links" : ["sw_2099/black_widow", "capdoc/modok", "modern/deathlok", "cacw/captain_america", "ll/loki"]
                       }
                      }
                     },
"star_lord" :        {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :
                       {
                        "name" : "Star Lord", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Gravity grenade", "Hadron enforcer", "I have a plan", "Power of orb", "Come and get it"]
                       },
                       // TODO : image need to be recreated from game
                       "sa" :
                       {
                        "name" : "Star Lord", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Gravity grenade", "Star moves", "I have a plan", "Power of orb", "Come and get it"],
                        "bonus" : ["Apply to: Self", "Critical damage +15%"],
                        "links" : ["hda/hulkbuster", "cacw/spider_man", "sw_2099/iron_man", "classic_70/blade", "modern/daisy_johnson"]
                       }
                      }
                     },
"supergiant" :       {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" :
                       {
                        "name" : "Supergiant", "attackBase" : "energy", "species" : "alien", "gender" : "female", "side" : "vilain", "type" : "universal",
                        "skills" : ["Energy strike", "Mental trap", "Battle mentality", "Puppeteer", "Giant illusions"],
                        "gears" : ["Mind control", "White cloak", "Black order battle suite", "Black long boots"]
                       }
                      }
                     },
"thanos" :           {
                      "uniform" : "infinity",
                      "tiers" : [2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "infinity" :
                       {
                        "name" : "Thanos", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Titan Punch", "Titan Beam", "Cosmic Shift", "Cosmic Rain", "Cosmic Drop"]
                       }
                      }
                     },
"thor" :             {
                      "uniform" : "avengers",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "avengers" :
                       {
                        "name" : "Thor", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Thunderstrike", "Hammer throw", "Call the lightning", "Battle rage", "Thundering maelstrom"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou" :
                       {
                        "name" : "Thor", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Thunderstrike", "Hammer throw", "Call the lightning", "Battle rage", "Thundering maelstrom"],
                        "bonus" : ["Activation rate: 25% when hit", "Energy attack 80% lightning damage", "Cooldown time 5 seconds"],
                        "links" : ["sw_zombies/venom", "unworthy/thor", "modern/deathlok", "wj/punisher", "na/iron_fist"]
                       },
                       // TODO : image need to be recreated from game
                       "unworthy" :
                       {
                        "name" : "Thor", "attackBase" : "energy", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Thunder axe", "Thunder roar", "Call the lightning", "Celestial breaker", "Thundering maelstrom"],
                        "bonus" : ["Apply to: Self", "All damage received reduced by 15%"],
                        "links" : ["anad/black_bolt", "hda/hulkbuster", "anad/black_cat", "sw_1872/bullseye", "anad/malekith"]
                       }
                      }
                     },
"thor_jane_foster" : {
                      "uniform" : "anad",
                      "tiers" : [1],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Thor - Jane Foster", "attackBase" : "energy", "species" : "human" ,"gender" : "female", "side" : "hero", "type" : "universal",
                        "skills" : ["Thunderous wind", "Mjolnir's toss", "Mjolnir's rage", "Thor's rage", "Goddess of thunder"]
                       }
                      }
                     },
"ulik" :             {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Ulik", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Knuckle pound", "Boulder toss", "Trolls's roar", "Knuckle barrage", "Troll stomp"]
                       }
                      }
                     },
"ultron" :           {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Ultron", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Chest beam", "Robotic slam", "Encephalo-ray", "Electronic field", "No strings"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou_blast" :
                       {
                        "name" : "Ultron prime", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Chest beam", "Robotic slam", "Encephalo-ray", "Electronic field", "No strings"],
                        "bonus" : ["Apply to: Self", "10% damage boost againt blast type", "10% incoming damage reduction from blast type"],
                        "links" : ["anad/angela", "annihilation/ronan", "anad/spider_man", "anad/gamora", "modern/daisy_johnson"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou_combat" :
                       {
                        "name" : "Ultron mark 1", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Chest beam", "Robotic slam", "Encephalo-ray", "Electronic field", "No strings"],
                        "bonus" : ["Apply to: Self", "10% damage boost againt combat type", "10% incoming damage reduction from combat type"],
                        "links" : ["prometheus/destroyer", "catws/captain_america", "anad/black_cat", "ms_marvel/captain_marvel", "modern/daisy_johnson"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou_speed" :
                       {
                        "name" : "Ultron mark 3", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "vilain", "type" : "universal",
                        "skills" : ["Chest beam", "Robotic slam", "Encephalo-ray", "Electronic field", "No strings"],
                        "bonus" : ["Apply to: Self", "10% damage boost againt speed type", "10% incoming damage reduction from speed type"],
                        "links" : ["wj/punisher", "wwh/hulk", "now/yellow_jacket", "modern/lash", "catws/captain_america"]
                       }
                      }
                     },
"venom" :            {
                      "uniform" : "classic",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "classic" :
                       {
                        "name" : "Venom", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Symbiote surge", "Tendril spike", "Parastic shot", "Deadly maw", "Lethal Symbiosis"]
                       },
                       // TODO : image need to be recreated from game
                       "sw_zombies" :
                       {
                        "name" : "Venom", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "combat",
                        "skills" : ["Symbiote surge", "Tendril spike", "Parastic shot", "Deadly maw", "Lethal Symbiosis"],
                        "bonus" : ["Activation rate: 10% when hit", "Apply to: Self", "Super armor, all defense +5% (10 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["ultimate/green_goblin", "now/squirrel_girl", "anad/rocket_raccoon", "ati/war_machine", "aaou/hawkeye"]
                       }
                      }
                     },
"vision" :           {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Vision", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Physical disruption", "Solar energy beam", "Density shift", "Microwave pulse", "Dimensional attack"]
                       },
                       // TODO : image need to be recreated from game
                       "aaou" :
                       {
                        "name" : "Vision", "attackBase" : "energy", "species" : "creature", "gender" : "male", "side" : "hero", "type" : "universal",
                        "skills" : ["Physical disruption", "Solar energy beam", "Density shift", "Microwave pulse", "Dimensional attack"],
                        "bonus" : ["Apply to: Self", "Crowd control time 15%", "All resistance +15% boost"],
                        "links" : ["anad/black_bolt", "dohk/daredevil", "classic_70/ghost_rider", "now/yellow_jacket", "anad/mockingbird"]
                       }
                      }
                     },
"volstagg" :         {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Volstagg", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Valiant volley", "Valiant slash", "Voluminous blow", "Enormous eathquake", "Volstagg's formation"]
                       }
                      }
                     },
"war_machine" :      {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "War machine", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Suppression fire", "Armored clash", "Repulsor shot", "Minigun barrage", "Missile strafe"]
                       },
                       // TODO : image need to be recreated from game
                       "ip" :
                       {
                        "name" : "War machine", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Suppression fire", "Armored clash", "Repulsor shot", "Minigun barrage", "Missile strafe"],
                        "bonus" : ["Add stun effect to Armored clash skill"],
                        "links" : ["aaou/captain_america", "ssm/octopus", "now/squirrel_girl", "ati/war_machine", "classic_70/blade"]
                       },
                       // TODO : image need to be recreated from game
                       "ati" :
                       {
                        "name" : "War machine", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Suppression fire", "Armored clash", "Repulsor shot", "Minigun barrage", "Missile strafe"],
                        "bonus" : ["Add stun effect to Armored clash skill"],
                        "links" : ["claws/black_cat", "aaou/iron_man", "anad/sister_grimm", "aaou/black_widow", "aaou/vision"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "War machine", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Suppression fire", "Armored clash", "Repulsor shot", "Minigun barrage", "Heavy metal"],
                        "bonus" : ["Add stun effect to Armored clash skill"],
                        "links" : ["anad/luke_cage", "prometheus/destroyer", "sw_1602/angela", "modern/sif", "mam/ant_man"]
                       }
                      }
                     },
"warwolf" :          {
                      "uniform" : "howling",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "howling" :
                       {
                        "name" : "Warworlf", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "combat",
                        "skills" : ["Vicious strike", "Bury them", "Ambush", "Blood frenzy", "Howl to Mars"],
                        "gears" : ["Mini gatling gun", "S.H.I.E.L.D. battle suit", "A.O.S. bandolier", "Tactical backpack"]
                       }
                      }
                     },
"wasp" :             {
                      "uniform" : "modern",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "modern" :
                       {
                        "name" : "Wasp", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Disrupting shot", "Blinding flash", "Encouragement", "Target rush", "Swarm shield"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Wasp", "attackBase" : "energy", "species" : "human", "gender" : "female", "side" : "hero", "type" : "blast",
                        "skills" : ["Disrupting shot", "Blinding flash", "Encouragement", "Target rush", "Swarm shield"],
                        "bonus" : ["Activation rate: 5% when attacking", "Apply to: Self", "Apply to: Enemy", "Paralyze (2 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["na/iron_fist", "armored/moon_knight", "doc_strange/mordo", "classic_70/blade", "anad/drax"]
                       }
                      }
                     },
"white_tiger" :      {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" :
                       {
                        "name" : "White tiger", "attackBase" : "physical", "species" : "human", "gender" : "female", "side" : "hero", "type" : "combat",
                        "skills" : ["Tiger pounce", "Tiger spirit", "Amulet shield", "Tiger claw", "Tiger ambush"]
                       }
                      }
                     },
"wiccan" :           {
                      "uniform" : "na",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "na" :
                       {
                        "name" : "Wiccan", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "hero", "type" : "blast",
                        "skills" : ["Spell bomb", "Spell concentration", "Dispel zone", "Kinetic chain", "Spell wave"]
                       }
                      }
                     },
"winter_soldier" :   {
                      "uniform" : "catws",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "catws" :
                       {
                        "name" : "Winter soldier", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Suppressing fire", "Bionic combat", "Sensory array", "Snarpshooter", "Explosive sabotage"]
                       },
                       // TODO : image need to be recreated from game
                       "cacw" :
                       {
                        "name" : "Winter soldier", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Suppressing fire", "Bionic combat", "Sensory array", "Snarpshooter", "Explosive sabotage"],
                        "bonus" : ["Use Sensory array to summon Captain America and enhance the Sensory array skill"],
                        "links" : ["mam/ant_man", "modern2/giant_man", "aaou_combat/ultron", "cacw/ant_man", "aaou/hawkeye"]
                       },
                       // TODO : image need to be recreated from game
                       "ca" :
                       {
                        "name" : "Winter soldier", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Winter shield", "Bionic combat", "Cover fire", "Shock value", "Explosive sabotage"],
                        "bonus" : ["Activation rate: when skill Cover fire is used", "Apply to: Self", "Immune to all damage (2 sec.)", "Cooldown time 1 second"],
                        "links" : ["armored/moon_knight", "anad/spider_man", "spidoc/modok", "anad/yondu", "sw_2099/captain_america"]
                       }
                      }
                     },
"wong" :             {
                      "uniform" : "anad",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Wong", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Wandering staff", "Scimitar spin", "Mystic shield", "Mystic wave", "Scimitar cyclone"]
                       },
                       // TODO : image need to be recreated from game
                       "doc_strange" :
                       {
                        "name" : "Wong", "attackBase" : "physical", "species" : "human", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Wandering staff", "Scimitar spin", "Mystic shield", "Mystic wave", "Scimitar cyclone"],
                        "bonus" : ["Activation rate: 45% when dealing critical attack", "Apply to: Self", "Skill cooltime 50% (10 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["catws/captain_america", "ip/war_machine", "anad/angela", "aaou_speed/ultron", "an/she_hulk"]
                       }
                      }
                     },
"yellow_jacket" :    {
                      "uniform" : "mam",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "mam" :
                       {
                        "name" : "Yellow jacket", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Stinger", "Flying barrage", "Now you see me", "Swarm shot", "Laser burst"],
                        "gears" : ["Robotic arms", "Yellow jacket suit", "Yellow jacked helmet", "Pym particles"]
                       },
                       // TODO : image need to be recreated from game
                       "now" :
                       {
                        "name" : "Yellow jacket", "attackBase" : "energy", "species" : "human", "gender" : "male", "side" : "vilain", "type" : "blast",
                        "skills" : ["Stinger", "Flying barrage", "Now you see me", "Swarm shot", "Laser burst"],
                        "bonus" : ["Apply to: Self", "25% damage increase to hero type"],
                        "links" : ["doc_strange/doctor_strange", "sw_zombies/elsa_bloodstone", "modern/deathlok", "cacw/war_machine", "anca/falcon"],
                        "gears" : ["Robotic arms", "Yellow jacket suit", "Yellow jacket helmet", "Pym particles"]
                       }
                      }
                     },
"yondu" :            {
                      "uniform" : "gg",
                      "tiers" : [1, 2],
                      "uniforms" :
                      {
                       // TODO : image need to be recreated from game
                       "gg" :
                       {
                        "name" : "Yondu", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Leap kick", "Barrage of arrows", "Arrow call", "Yaka arrow", "Ravager strike"]
                       },
                       // TODO : image need to be recreated from game
                       "anad" :
                       {
                        "name" : "Yondu", "attackBase" : "physical", "species" : "alien", "gender" : "male", "side" : "hero", "type" : "speed",
                        "skills" : ["Leap kick", "Ravager assault", "Quantum detonator", "Bounty hunter", "Ravager strike"],
                        "bonus" : ["Activation rate: 5% when attacking", "Apply to: Self", "Skill cooltime 50% (10 sec.)", "Cooldown time 20 seconds"],
                        "links" : ["cacw/agent_13", "anad/spider_man", "sw_zombies/venom", "sw_1602/angela", "modern2/giant_man"]
                       }
                      }
                     }
};
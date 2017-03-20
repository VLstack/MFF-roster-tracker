/* global MFF */
MFF.CHARACTERS =
{
"_all" : {},
"set" : function(character, data)
{
 if ( !data ) { data = MFF.CHARACTERS.getEmpty(character); }
 MFF.CHARACTERS._all[character] = data;
},
"getEmpty" : function(character)
{
 return {
         "id" : character,
         "uniform" : MFF.CHARACTERS.DATA[character].uniform,
         "uniforms" : {}, // 2.2 addition
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
"getNameForUniform" : function(character, uniform) { return MFF.CHARACTERS.DATA[character].uniforms[uniform].name; },
"getAttackBaseForUniform" : function(character, uniform) { return MFF.CHARACTERS.DATA[character].uniforms[uniform].attackBase; },
"isAttackBaseForUniformIsEnergy" : function(character, uniform) { return MFF.CHARACTERS.getAttackBaseForUniform(character, uniform) == "energy"; },
"isAttackBaseForUniformIsPhysical" : function(character, uniform) { return MFF.CHARACTERS.getAttackBaseForUniform(character, uniform) == "physical"; },
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
   physical = MFF.CHARACTERS.isAttackBaseForUniformIsPhysical(character, data.uniform) ? parseInt(data.attack.total) || 0 : 0;
   energy = MFF.CHARACTERS.isAttackBaseForUniformIsEnergy(character, data.uniform) ? parseInt(data.attack.total) || 0 : 0;
  }
  data.attack = { "physical" : physical, "energy" : energy };
 }
 if ( !("uniforms" in data) ) { data.uniforms = {}; } // compatibility any to 2.2
 return data;
},
"getAll" : function() { return MFF.CHARACTERS._all; },
"setAll" : function(all) { MFF.CHARACTERS._all = all; },
"setProperty" : function(character, data)
{
 var percent;
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
   percent = MFF.axisItems[data.type].callback(data).percent;
   MFF.CHARACTERS._all[character][data.type] = percent ? parseFloat(data.value) : parseInt(data.value);
  break;
  case "uniformRank" :
   if ( !(data.uniform in MFF.CHARACTERS._all[character].uniforms) ) { MFF.CHARACTERS._all[character].uniforms[data.uniform] = { "rank" : "unowned", "options" : [null, null, null, null, null] }; }
   MFF.CHARACTERS._all[character].uniforms[data.uniform].rank = data.rank;
  break;
  case "uniformOptions" :
   if ( !(data.uniform in MFF.CHARACTERS._all[character].uniforms) ) { MFF.CHARACTERS._all[character].uniforms[data.uniform] = { "rank" : "unowned", "options" : [null, null, null, null, null] }; }
   if ( !("options" in MFF.CHARACTERS._all[character].uniforms[data.uniform]) ) { MFF.CHARACTERS._all[character].uniforms[data.uniform].options = [null, null, null, null, null]; }
   MFF.CHARACTERS._all[character].uniforms[data.uniform].options[data.index] = [data.attribute, parseInt(data.value) || 0];
  break;
  case "combatPower" :
   MFF.CHARACTERS._all[character].combatPower = data.combatPower;
  break;
 }
 MFF.CHARACTERS._all[character].lastUpdate = (new Date()).valueOf();
}
};
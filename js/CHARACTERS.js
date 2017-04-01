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
"getNameForUniform" : function(character, uniform) { return (character in MFF.CHARACTERS.DATA) && (uniform in MFF.CHARACTERS.DATA[character].uniforms) ? MFF.CHARACTERS.DATA[character].uniforms[uniform].name : character; },
"getImageUrlForUniform" : function(character, uniform) { return "images/characters/{0}/{1}.png".format(uniform, character); },
"getImageForUniform" : function(character, uniform)
{
 var img = document.createElement("img");
 img.title = MFF.CHARACTERS.getNameForUniform(character, uniform);
 img.src = MFF.CHARACTERS.getImageUrlForUniform(character, uniform);
 return img;
},
"getTypeForUniform" : function(character, uniform) { return MFF.CHARACTERS.DATA[character].uniforms[uniform].type; },
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
"isValidData" : function(id, data)
{
 var i, name;
 if ( !(id in MFF.CHARACTERS.DATA) ) { return "The character \"{0}\" is not a known character".format(id); }
 if ( !data.uniform ) { return "The uniform of the character \"{0}\" is not defined".format(id); }
 if ( id == "hulkbuster" && data.uniform == "avengers" ) { data.uniform = "aaou"; } // fix data error corrected in 2.3
 if ( id == "black_bolt" && data.uniform == "attilanrising" ) { data.uniform = "iar"; } // fix data error corrected in 2.3
 if ( !(data.uniform in MFF.CHARACTERS.DATA[id].uniforms) ) { return "The uniform \"{0}\" of the character \"{1}\" is not a known uniform".format(data.uniform, id); }
 name = MFF.CHARACTERS.getNameForUniform(id, data.uniform);
 if ( !("gear" in data) ) { return "Gears for the character \"{0}\" are not defined".format(name); }
 if ( !Array.isArray(data.gear) || data.gear.length != 4 ) { return "Gears for the character \"{0}\" is not a valid array of 4 items".format(name); }
 for ( i = 0; i < 4; i++ ) { if ( !Array.isArray(data.gear[i]) || data.gear[i].length != 8 ) { return "Gear {0} for the character \"{1}\" is not a valid array of 8 items".format(i + 1, name); } }
 return true;
},
"getAll" : function() { return MFF.CHARACTERS._all; },
"setAll" : function(all)
{
 var k, kk, v, toDelete,
     toImport = {};
 for ( k in all )
 {
  if ( all.hasOwnProperty(k) && MFF.CHARACTERS.isValidData(k, all[k]) === true )
  {
   v = parseInt(all[k].level, 10);
   if ( isNaN(v) ) { v = 0; }
   if ( v > 60 ) { v = 60; }
   all[k].level = v;
   if ( !("tier" in all[k]) || (all[k].tier != 1 && all[k].tier != 2) ) { all[k].tier = MFF.CHARACTERS.DATA[k].tiers[0]; }
   if ( !("attack" in all[k]) ) { all[k].attack = { "physical" : 0, "energy" : 0 }; }
   if ( !("physical" in all[k].attack) ) { all[k].attack.pysical = 0; }
   if ( !("energy" in all[k].attack) ) { all[k].attack.energy = 0; }
   if ( !("defense" in all[k]) ) { all[k].defense = { "physical" : 0, "energy" : 0 }; }
   if ( !("physical" in all[k].defense) ) { all[k].defense.pysical = 0; }
   if ( !("energy" in all[k].defense) ) { all[k].defense.energy = 0; }
   if ( !("skills" in all[k]) || !Array.isArray(all[k].skills) || all[k].skills.length != 5 ) { all[k].skills = [0, 0, 0, 0, 0]; }
   if ( k == "hulkbuster" && all[k].uniform == "avengers" ) { all[k].uniform = "aaou"; } // fix data error corrected in 2.3
   if ( k == "black_bolt" && all[k].uniform == "attilanrising" ) { all[k].uniform = "iar"; } // fix data error corrected in 2.3
   if ( "uniforms" in all[k] )
   {
    if ( k == "black_bolt" && ("attilanrising" in all[k].uniforms) ) // fix data error corrected in 2.3
    {
     all[k].uniforms.iar = all[k].uniforms.attilanrising;
     delete all[k].uniforms.attilanrising;
    }
    // fix invalid uniforms
    toDelete = [];
    for ( kk in all[k].uniforms )
    {
     if ( all[k].uniforms.hasOwnProperty(kk) )
     {
      if ( !("rank" in all[k].uniforms[kk]) || !(all[k].uniforms[kk].rank in MFF.UNIFORMS.RANKS) )
      {
       toDelete.push(kk);
      }
     }
    }
    if ( toDelete.length ) { toDelete.forEach(function(uniform) { delete all[k].uniforms[uniform]; }); }
   }
   all[k].id = k;
   toImport[k] = all[k];
  }
 }
 MFF.CHARACTERS._all = toImport;
},
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
  case "rank" :
   MFF.CHARACTERS._all[character].rank = data.rank;
  break;
 }
 MFF.CHARACTERS._all[character].lastUpdate = (new Date()).valueOf();
}
};
/* global MFF, API */
MFF.IMMUNITIES =
{
 "filters" : [],
 "states" :
 {
  "all" : "All damage",
  "all_energy" : "All energy damage",
  "all_physical" : "All physical damage",
  "bleed" : "Bleed",
  "burn" : "Burn",
  "cancel" : "Cancel",
  "charm" : "Charm",
  "cold" : "Cold damage",
  "fear" : "Fear",
  "fire" : "Fire damage",
  "guard_break" : "Guard break",
  "invincible" : "Invincible",
  "lightning" : "Lightning damage",
  "mind" : "Mind damage",
  "movement" : "Movement speed",
  "paralyze" : "Paralyze",
  "poison" : "Poison damage",
  "snare" : "Snare",
  "stun" : "Stun",
  "web" : "Web"
 },
 "types" :
 {
  "P" : "Passive",
  "T2" : "Tier2",
  "U" : "Uniform",
  "S" : "Skill",
  "L" : "Leadership"
 },
 "draw" : function(container, characterId)
 {
  var tr, td, h2,
      div = container.appendChild(document.createElement("div")),
      table = div.appendChild(document.createElement("table")),
      thead = table.appendChild(document.createElement("thead")),
      tbody = table.appendChild(document.createElement("tbody"));
  MFF.IMMUNITIES._node = tbody;
  div.className = "forms bgOpaque immunities";
  tr = thead.appendChild(document.createElement("tr"));
  td = tr.appendChild(document.createElement("td"));
  td.colSpan = 2;
  td.className = "title";
  h2 = td.appendChild(document.createElement("h2"));
  h2.innerHTML = "Immunities";

  API.EVT.on("refreshImmunities", MFF.IMMUNITIES.refresh);
  MFF.IMMUNITIES.refresh(characterId);
 },
 "get" : function(characterId)
 {
  var all = [],
      data = MFF.CHARACTERS.get(characterId),
      uData = (data.id in MFF.CHARACTERS.DATA) && (data.uniform in MFF.CHARACTERS.DATA[data.id].uniforms) ? MFF.CHARACTERS.DATA[data.id].uniforms[data.uniform] : {};
  if ( "immunities" in uData )
  {
   all = uData.immunities.map(function(immunity)
                              {
                               var tmp = immunity.split("/"),
                                   type = tmp[0],
                                   state = tmp[1],
                                   line = { "type" : type, "state" : state, "when" : "permanent" };
                               if ( tmp[2] == "skill" )
                               {
                                line.when = "skill";
                                line.skill = tmp[3];
                                line.skill_name = MFF.CHARACTERS.DATA[data.id].uniforms[data.uniform].skills[tmp[3] - 1];
                                line.percent = tmp[4];
                                line.duration = tmp[5];
                               }
                               else if ( tmp[2] == "hit" || tmp[2] == "attack" )
                               {
                                line.when = tmp[2];
                                line.rate = tmp[3];
                                line.percent = tmp[4];
                                line.duration = tmp[5];
                               }
                               else if ( tmp[2] == "hpB" )
                               {
                                line.when = tmp[2];
                                line.hp = tmp[3];
                                line.percent = tmp[4];
                                line.duration = tmp[5];
                               }
                               else if ( tmp[2] && Number.isNumeric(tmp[2]) )
                               {
                                if ( tmp[3] && tmp[3] == "rng" && tmp[4] && Number.isNumeric(tmp[4]) )
                                {
                                 line.random = tmp[4];
                                }
                                line.percent = tmp[2];
                               }
                               return line;
                              });
  }
  return all;
 },
 "hasFilteredImmunities" : function(characterId)
 {
  var i,
      immunities = MFF.IMMUNITIES.get(characterId);
  for (i = 0; i < immunities.length; i++ )
  {
   if ( MFF.IMMUNITIES.filters.indexOf(immunities[i].state) != -1 )
   {
    return true;
   }
  }
  return false;
 },
 "refresh" : function(characterId)
 {
  var tr, td,
      all = MFF.IMMUNITIES.get(characterId);
  API.DOM.flush(MFF.IMMUNITIES._node);
  if ( all.length )
  {
   all.forEach(function(immunity)
               {
                var tr = MFF.IMMUNITIES._node.appendChild(document.createElement("tr")),
                    th = tr.appendChild(document.createElement("th")),
                    td = tr.appendChild(document.createElement("th"));
                th.innerHTML = MFF.IMMUNITIES.types[immunity.type];
                td.innerHTML = MFF.IMMUNITIES.states[immunity.state];
                switch ( immunity.when )
                {
                 case "skill":
                  tr.title = "When skill \"{0}\" is used\n{1}% immunity for {2} seconds".format(immunity.skill_name, immunity.percent, immunity.duration);
                 break;
                 case "hit":
                  tr.title = "{0}% when hit\n{1}% immunity for {2} seconds".format(immunity.rate, immunity.percent, immunity.duration);
                 break;
                 case "attack":
                  tr.title = "{0}% when attacking\n{1}% immunity for {2} seconds".format(immunity.rate, immunity.percent, immunity.duration);
                 break;
                 case "hpB":
                  tr.title = "When HP below {0}%\n{1}% immunity for {2} seconds".format(immunity.hp, immunity.percent, immunity.duration);
                 break;
                 default:
                  if ( immunity.percent )
                  {
                   if ( immunity.random )
                   {
                    td.innerHTML = "{0}% {1} (RNG {2}%)".format(immunity.percent, MFF.IMMUNITIES.states[immunity.state], immunity.random);
                    tr.title = "{0}% immunity (RNG {2}%)".format(immunity.percent, immunity.random);
                   }
                   else
                   {
                    td.innerHTML = "{0}% {1}".format(immunity.percent, MFF.IMMUNITIES.states[immunity.state]);
                    tr.title = "{0}% immunity".format(immunity.percent);
                   }
                  }
                  else
                  {
                   tr.title = "Permanent immunity";
                  }
                 break;
                }
               });
  }
  else
  {
   tr = MFF.IMMUNITIES._node.appendChild(document.createElement("tr"));
   td = tr.appendChild(document.createElement("th"));
   td.colSpan = 2;
   td.style.textAlign = "center";
   td.innerHTML = "none";
  }
 }
};
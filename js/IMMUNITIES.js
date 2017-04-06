/* global MFF, API */
MFF.IMMUNITIES =
{
 "filters" : [],
 "states" :
 {
  "bleed" : "Bleed",
  "burn" : "Burn",
  "cancel" : "Cancel",
  "charm" : "Charm",
  "fear" : "Fear",
  "guard_break" : "Guard break",
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
  "U" : "Uniform"
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
      cData = data.id in MFF.CHARACTERS.DATA ? MFF.CHARACTERS.DATA[data.id] : {},
      uData = (data.id in MFF.CHARACTERS.DATA) && (data.uniform in MFF.CHARACTERS.DATA[data.id].uniforms) ? MFF.CHARACTERS.DATA[data.id].uniforms[data.uniform] : {};
  if ( "immunities" in cData )
  {
   cData.immunities.forEach(function(immunity)
                            {
                             var tmp = immunity.split("/");
                             all.push({ "type" : tmp[0], "state" : tmp[1] });
                            });
  }
  if ( "immunities" in uData )
  {
   uData.immunities.forEach(function(immunity)
                            {
                             var tmp = immunity.split("/");
                             all.push({ "type" : tmp[0], "state" : tmp[1] });
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
                var tr = MFF.IMMUNITIES._node.appendChild(document.createElement("tr"));
                    td = tr.appendChild(document.createElement("th"));
                td.innerHTML = MFF.IMMUNITIES.types[immunity.type];
                td = tr.appendChild(document.createElement("th"));
                td.innerHTML = MFF.IMMUNITIES.states[immunity.state];
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
var DETAIL =
{
"draw":function(container, character, persistant)
{
 var k,
     data = MFF.loadCharacter(character);

 function getAtk(valueWhenNaN)
 {
  var physical = parseInt(document.getElementById("detailattribute_atk_physical").value),
      energy = parseInt(document.getElementById("detailattribute_atk_energy").value);
  if ( isNaN(physical) ) { physical = valueWhenNaN; }
  if ( isNaN(energy) ) { energy = valueWhenNaN; }
  return {"physical":physical, "energy":energy};
 }

 function saveAtk()
 {
  return function()
  {
   var err = [],
       data = getAtk("NaN");
   if ( data.physical == "NaN" ) { err.push("Invalid physical attack"); }
   if ( data.energy == "NaN" ) { err.push("Invalid energy attack"); }
   if ( err.length ) { alert(err.join("\n")); }
   else
   {
    MFF.saveCharacter({"mode":"attack", "physical":data.physical, "energy":data.energy});
   }
  };
 }

 function getDef(valueWhenNaN)
 {
  var physical = parseInt(document.getElementById("detailattribute_def_physical").value),
      energy = parseInt(document.getElementById("detailattribute_def_energy").value);
  if ( isNaN(physical) ) { physical = valueWhenNaN; }
  if ( isNaN(energy) ) { energy = valueWhenNaN; }
  return {"physical":physical, "energy":energy};
 }

 function saveDef()
 {
  return function()
  {
   var err = [],
       data = getDef("NaN");
   if ( data.physical == "NaN" ) { err.push("Invalid physical defense"); }
   if ( data.energy == "NaN" ) { err.push("Invalid energy defense"); }
   if ( err.length ) { alert(err.join("\n")); }
   else
   {
    MFF.saveCharacter({"mode":"defense", "physical":data.physical, "energy":data.energy});
   }
  };
 }

 function showAvgDef()
 {
  return function()
  {
   var data = getDef(0);
   document.getElementById("average_defense").innerHTML = parseInt((data.physical + data.energy) / 2);
  };
 }

 // ATTACK
 DETAIL.drawFormTable(container, character, data, "Attacks",
                      [
                       [
                        {"key":"atk_base", "label":"Base", "tag":"span", "attributes":{"id":"attack_base", "innerHTML":CHARACTERS[character].uniforms[data.uniform].attackBase == "physical" ? "Physical" : "Energy"}},
                        {"key":"atkspeed", "label":"Attack speed", "tabindex":200},
                        {"key":"defpen", "label":"Ignore defense", "tabindex":300}
                       ],
                       [
                        {"key":"atk_physical", "label":"Physical", "onchange":saveAtk, "value":data.attack.physical || 0, "tabindex":100},
                        {"key":"critrate", "label":"Critical rate", "tabindex":201},
                        {"key":"ignore_dodge", "label":"Ignore dodge", "tabindex":301}
                       ],
                       [
                        {"key":"atk_energy", "label":"Energy", "onchange":saveAtk, "value":data.attack.energy || 0, "tabindex":101},
                        {"key":"critdamage", "label":"Critical damage", "tabindex":202},
                        null
                       ]
                      ]);
 // DEFENSE
 DETAIL.drawFormTable(container, character, data, "Defenses",
                      [
                       [
                        {"key":"def_physical", "label":"Physical", "onchange":saveDef, "onkeyup":showAvgDef, "value":data.defense.physical || 0, "tabindex":400},
                        {"key":"hp", "label":"HP", "tabindex":500}
                       ],
                       [
                        {"key":"def_energy", "label":"Energy", "onchange":saveDef, "onkeyup":showAvgDef, "value":data.defense.energy || 0, "tabindex":401},
                        {"key":"recorate", "label":"Recovery rate", "tabindex":501}
                       ],
                       [
                        {"key":"average_defense", "label":"Average", "tag":"span", "attributes":{"id":"average_defense", "innerHTML":"0", "tabindex":402}},
                        {"key":"dodge", "label":"Dodge", "tabindex":502}
                       ]
                      ]);
 // misc
 DETAIL.drawFormTable(container, character, data, "Debuff",
                      [
                       [
                        {"key":"movspeed", "label":"Movement speed", "tabindex":600}
                       ],
                       [
                        {"key":"debuff", "label":"Debuff duration", "tabindex":601}
                       ],
                       [
                        {"key":"scd", "label":"Skill cooldown", "tabindex":602}
                       ]
                      ]);
 DETAIL.drawSkills(container, character, data);

 // compute values
 showAvgDef()();
},
"drawFormTable":function(container, character, data, tableLabel, items)
{
 var tr, td, th, input, i, j,
    maxCells = 0,
    div = container.appendChild(document.createElement("div")),
    table = div.appendChild(document.createElement("table")),
    tbody = table.appendChild(document.createElement("tbody"));

 function cell(tr, data, item)
 {
  var td, th, k, input;
  function save(key)
  {
   return function()
   {
    var input = document.getElementById("detailattribute_" + key),
        value = input ? input.value : 0;
    MFF.saveCharacter({"mode":"attribute", "type":key, "value":value});
   }
  }

  if ( item )
  {
   th = tr.appendChild(document.createElement("th"));
   th.appendChild(document.createTextNode(item.label));
   td = tr.appendChild(document.createElement("td"));
   if ( "tag" in item )
   {
    input = td.appendChild(document.createElement(item.tag));
    for ( k in item.attributes )
    {
     if ( item.attributes.hasOwnProperty(k) )
     {
      input[k] = item.attributes[k];
     }
    }
   }
   else
   {
    input = td.appendChild(document.createElement("input"));
    input.type = "text";
    input.id = "detailattribute_" + item.key;
    if ( item.onchange ) { input.onchange = item.onchange(item.key); }
    else { input.onchange = save(item.key); }
    if ( item.onkeyup ) { input.onkeyup = item.onkeyup(item.key); }
    input.value = "value" in item ? item.value : data[item.key] || 0;
    if ( item.tabindex ) { input.setAttribute("tabindex", item.tabindex); }
   }
  }
  else
  {
   td = tr.appendChild(document.createElement("td"));
   td.colSpan = 2;
  }
 }
 div.className = "forms bgOpaque";

 tr = tbody.appendChild(document.createElement("tr"));
 td = tr.appendChild(document.createElement("td"));
 td.className = "title";
 input = td.appendChild(document.createElement("h2"));
 input.appendChild(document.createTextNode(tableLabel));

 for ( i = 0; i < items.length; i++ )
 {
  tr = tbody.appendChild(document.createElement("tr"));
  maxCells = Math.max(maxCells, items[i].length);
  for ( j = 0; j < items[i].length; j++ )
  {
   cell(tr, data, items[i][j]);
  }
 }
 td.colSpan = maxCells * 2;
}

};
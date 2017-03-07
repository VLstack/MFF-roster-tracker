/* global MFF, Panel */
MFF.LAYOUT.DETAIL =
{
 "_panel" : null,
 "init" : function()
 {
  MFF.LAYOUT.DETAIL._panel = new Panel({ "id" : "panelDetail" });
  MFF.LAYOUT.DETAIL.randomBackground();
 },
 "randomBackground" : function()
 {
  var nbBackground = 16;
  MFF.LAYOUT.DETAIL._panel.getNode().style.backgroundImage = "url(images/background/{0}.jpg)".format(1 + parseInt(Math.random() * nbBackground, 10));
 },
"draw" : function(container, character)
{
 var data = MFF.CHARACTERS.get(character);

 function getAtk(valueWhenNaN)
 {
  var physical = parseInt(document.getElementById("detailattribute_atk_physical").value),
      energy = parseInt(document.getElementById("detailattribute_atk_energy").value);
  if ( isNaN(physical) ) { physical = valueWhenNaN; }
  if ( isNaN(energy) ) { energy = valueWhenNaN; }
  return { "physical" : physical, "energy" : energy };
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
    MFF.saveCharacter({ "mode" : "attack", "physical" : data.physical, "energy" : data.energy });
   }
  };
 }

 function getDef(valueWhenNaN)
 {
  var physical = parseInt(document.getElementById("detailattribute_def_physical").value),
      energy = parseInt(document.getElementById("detailattribute_def_energy").value);
  if ( isNaN(physical) ) { physical = valueWhenNaN; }
  if ( isNaN(energy) ) { energy = valueWhenNaN; }
  return { "physical" : physical, "energy" : energy };
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
    MFF.saveCharacter({ "mode" : "defense", "physical" : data.physical, "energy" : data.energy });
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
 MFF.DETAIL.drawFormTable(container, character, data, "Attacks",
                          [
                           [
                            { "key" : "atk_base", "label" : "Base", "tag" : "span", "attributes" : { "id" : "attack_base", "innerHTML" : MFF.CHARACTERS.DATA[character].uniforms[data.uniform].attackBase == "physical" ? "Physical" : "Energy" } },
                            { "key" : "atkspeed", "label" : "Attack speed", "tabindex" : 200 },
                            { "key" : "defpen", "label" : "Ignore defense", "tabindex" : 300 }
                           ],
                           [
                            { "key" : "atk_physical", "label" : "Physical", "onchange" : saveAtk, "value" : data.attack.physical || 0, "tabindex" : 100 },
                            { "key" : "critrate", "label" : "Critical rate", "tabindex" : 201 },
                            { "key" : "ignore_dodge", "label" : "Ignore dodge", "tabindex" : 301 }
                           ],
                           [
                            { "key" : "atk_energy", "label" : "Energy", "onchange" : saveAtk, "value" : data.attack.energy || 0, "tabindex" : 101 },
                            { "key" : "critdamage", "label" : "Critical damage", "tabindex" : 202 },
                            null
                           ]
                          ]);
 // DEFENSE
 MFF.DETAIL.drawFormTable(container, character, data, "Defenses",
                          [
                           [
                            { "key" : "def_physical", "label" : "Physical", "onchange" : saveDef, "onkeyup" : showAvgDef, "value" : data.defense.physical || 0, "tabindex" : 400 },
                            { "key" : "hp", "label" : "HP", "tabindex" : 500 }
                           ],
                           [
                            { "key" : "def_energy", "label" : "Energy", "onchange" : saveDef, "onkeyup" : showAvgDef, "value" : data.defense.energy || 0, "tabindex" : 401 },
                            { "key" : "recorate", "label" : "Recovery rate", "tabindex" : 501 }
                           ],
                           [
                            { "key" : "average_defense", "label" : "Average", "tag" : "span", "attributes" : { "id" : "average_defense", "innerHTML" : "0", "tabindex" : 402 } },
                            { "key" : "dodge", "label" : "Dodge", "tabindex" : 502 }
                           ]
                          ]);
 // DEBUFF
 MFF.DETAIL.drawFormTable(container, character, data, "Debuff",
                          [
                           [
                            { "key" : "movspeed", "label" : "Movement speed", "tabindex" : 600 }
                           ],
                           [
                            { "key" : "debuff", "label" : "Debuff duration", "tabindex" : 601 }
                           ],
                           [
                            { "key" : "scd", "label" : "Skill cooldown", "tabindex" : 602 }
                           ]
                          ]);
 MFF.DETAIL.drawSkills(container, character, data);

 // compute values
 showAvgDef()();
},
"drawSkills" : function(container, character, data)
{
 var i, j, select, option,
     div = container.appendChild(document.createElement("div"));
 div.id = "skills";
 for ( i = 0; i < 5; i++ )
 {
  select = div.appendChild(document.createElement("select"));
  select.className = "skill_lvl";
  for ( j = 0; j < 7; j++ )
  {
   option = select.appendChild(document.createElement("option"));
   option.value = j;
   option.text = "{0}: #{1}".format(MFF.CHARACTERS.DATA[character].uniforms[data.uniform].skills[i], j);
  }
  select.selectedIndex = data.skills[i];
  select.dataset.skill = i;
  select.onchange = function() { MFF.saveCharacter({ "mode" : "skill", "skill" : this.dataset.skill, "lvl" : this.options[this.selectedIndex].value }); };
 }
},
"drawFormTable" : function(container, character, data, tableLabel, items)
{
 var tr, td, input, i, j,
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
    MFF.saveCharacter({ "mode" : "attribute", "type" : key, "value" : value });
   };
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
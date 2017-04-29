/* global MFF, Panel, API, ToggleSwitch */
MFF.LAYOUT.DETAIL =
{
 "init" : function()
 {
  var node;
  MFF.LAYOUT.DETAIL._panel = new Panel({ "id" : "panelDetail" });
  node = MFF.LAYOUT.DETAIL._panel.getNode();
  MFF.LAYOUT.DETAIL.randomBackground();
  MFF.LAYOUT.DETAIL._panelContent = new Panel({ "id" : "panelDetailContent", "parent" : node, "relative" : true });
  MFF.LAYOUT.DETAIL.GEARS.init(node);
  MFF.LAYOUT.DETAIL.drawEmpty();
  API.EVT.on("refreshPercentGlobal", function(characterId)
                                     {
                                      var div = document.getElementById("dev_percent_gbl");
                                      if ( div ) { div.innerHTML = MFF.PERCENT.get(characterId, true) + "%"; }
                                     });
  API.EVT.on("refreshPercentGears", function(characterId)
                                    {
                                     var div = document.getElementById("dev_percent_gears");
                                     if ( div ) { div.innerHTML = MFF.PERCENT.getGears(characterId, true) + "%"; }
                                    });
  API.EVT.on("refreshPercentSkills", function(characterId)
                                     {
                                      var div = document.getElementById("dev_percent_skills");
                                      if ( div ) { div.innerHTML = MFF.PERCENT.getSkills(characterId, true) + "%"; }
                                     });
  API.EVT.on("refreshPercentUniform", function(characterId)
                                      {
                                       var tmp, div = document.getElementById("dev_percent_uniform");
                                       if ( div )
                                       {
                                        tmp = MFF.PERCENT.getUniform(characterId, true, true);
                                        div.innerHTML = tmp === null ? "n/a" : tmp + "%";
                                       }
                                      });
 },
 "randomBackground" : function()
 {
  var nbBackground = 17;
  MFF.LAYOUT.DETAIL._panel.getNode().style.backgroundImage = "url(images/background/{0}.jpg)".format(1 + parseInt(Math.random() * nbBackground, 10));
 },
 "drawAttributes" : function(container, character)
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

  function htmlCb(item)
  {
   new ToggleSwitch({
                     "renderTo" : this, "content" : MFF.PERCENT.map[item.key].label,
                     "checked" : MFF.PERCENT.isActive(item.key),
                     "data" : item,
                     "callback" : function(checked, data)
                     {
                      MFF.PERCENT.setActive(data.key, checked);
                      MFF.PERCENT.recomputeAll(data.key, data.character);
                      API.EVT.dispatch(MFF.PERCENT.map[data.key].compute, data.character);
                     }
                    });
  }

  // ATTACK
  MFF.LAYOUT.DETAIL.drawFormTable(container, character, data, "Attacks",
                                  [
                                   [
                                    { "key" : "atk_base", "label" : "Base", "tag" : "span", "attributes" : { "id" : "attack_base", "innerHTML" : MFF.CHARACTERS.DATA[character].uniforms[data.uniform].attackBase == "physical" ? "Physical" : "Energy" } },
                                    { "key" : "critrate", "type" : "float", "label" : "Critical rate", "tabindex" : 200 }
                                   ],
                                   [
                                    { "key" : "atk_physical", "type" : "int", "label" : "Physical", "onchange" : saveAtk, "value" : data.attack.physical || 0, "tabindex" : 100 },
                                    { "key" : "critdamage", "type" : "float", "label" : "Critical damage", "tabindex" : 201 }
                                   ],
                                   [
                                    { "key" : "atk_energy", "type" : "int", "label" : "Energy", "onchange" : saveAtk, "value" : data.attack.energy || 0, "tabindex" : 101 },
                                    { "key" : "defpen", "type" : "float", "label" : "Ignore defense", "tabindex" : 202 }
                                   ],
                                   [
                                    { "key" : "atkspeed", "type" : "float", "label" : "Attack speed", "tabindex" : 102 },
                                    { "key" : "ignore_dodge", "type" : "float", "label" : "Ignore dodge", "tabindex" : 203 }
                                   ]
                                  ]);
  // DEFENSE
  MFF.LAYOUT.DETAIL.drawFormTable(container, character, data, "Defenses",
                                  [
                                   [
                                    { "key" : "def_physical", "type" : "int", "label" : "Physical", "onchange" : saveDef, "onkeyup" : showAvgDef, "value" : data.defense.physical || 0, "tabindex" : 400 },
                                    { "key" : "hp", "type" : "int", "label" : "HP", "tabindex" : 500 }
                                   ],
                                   [
                                    { "key" : "def_energy", "type" : "int", "label" : "Energy", "onchange" : saveDef, "onkeyup" : showAvgDef, "value" : data.defense.energy || 0, "tabindex" : 401 },
                                    { "key" : "recorate", "type" : "float", "label" : "Recovery rate", "tabindex" : 501 }
                                   ],
                                   [
                                    { "key" : "average_defense", "label" : "Average", "tag" : "span", "attributes" : { "id" : "average_defense", "innerHTML" : "0", "tabindex" : 402 } },
                                    { "key" : "dodge", "type" : "float", "label" : "Dodge", "tabindex" : 502 }
                                   ],
                                   [null, null]
                                  ]);
  // DEBUFF
  MFF.LAYOUT.DETAIL.drawFormTable(container, character, data, "Debuff",
                                  [
                                   [
                                    { "key" : "movspeed", "type" : "float", "label" : "Movement speed", "tabindex" : 600 }
                                   ],
                                   [
                                    { "key" : "debuff", "type" : "float", "label" : "Debuff duration", "tabindex" : 601 }
                                   ],
                                   [
                                    { "key" : "scd", "type" : "float", "label" : "Skill cooldown", "tabindex" : 602 }
                                   ],
                                   [null]
                                  ]);
  // DEVELOPMENT
  MFF.LAYOUT.DETAIL.drawFormTable(container, character, data, "Developments %",
                                  [
                                   [
                                    { "key" : "percent_global", "label" : "Global", "tag" : "span", "attributes" : { "id" : "dev_percent_gbl" } }//,
                                    //null
                                   ],
                                   [
                                    { "key" : "gears", "htmlCb" : htmlCb, "character" : character, "tag" : "span", "attributes" : { "id" : "dev_percent_gears" } }//,
                                    //{ "key" : "percent_uru", "label" : "Uru", "tag" : "span", "attributes" : { "id" : "dev_percent_uru", "innerHTML" : "0%" } }
                                   ],
                                   [
                                    { "key" : "skills", "htmlCb" : htmlCb, "character" : character, "tag" : "span", "attributes" : { "id" : "dev_percent_skills" } }//,
                                    //{ "key" : "percent_obelisk", "label" : "Obelisk", "tag" : "span", "attributes" : { "id" : "dev_percent_obelisk", "innerHTML" : "0%" } }
                                   ],
                                   [
                                    { "key" : "uniform", "htmlCb" : htmlCb, "character" : character, "tag" : "span", "attributes" : { "id" : "dev_percent_uniform" } }//,
                                  //  null
                                   ]
                                  ]);
  // IMMUNTIIES
  MFF.IMMUNITIES.draw(container, character);
  // compute values
  showAvgDef()();
  API.EVT.dispatch("refreshPercentGlobal", character);
  API.EVT.dispatch("refreshPercentGears", character);
  API.EVT.dispatch("refreshPercentSkills", character);
  API.EVT.dispatch("refreshPercentUniform", character);
 },
 "drawSkills" : function(container, data)
 {
  var i, j, select, option;
  container.id = "skills";
  for ( i = 0; i < 5; i++ )
  {
   select = container.appendChild(document.createElement("select"));
   select.className = "skill_lvl";
   for ( j = 0; j < 7; j++ )
   {
    option = select.appendChild(document.createElement("option"));
    option.value = j;
    option.text = "{0}: #{1}".format(MFF.CHARACTERS.DATA[data.id].uniforms[data.uniform].skills[i], j);
   }
   select.selectedIndex = data.skills[i];
   select.dataset.skill = i;
   select.dataset.character = data.id;
   select.onchange = function()
                     {
                      MFF.saveCharacter({ "mode" : "skill", "skill" : this.dataset.skill, "lvl" : this.options[this.selectedIndex].value });
                      API.EVT.dispatch("computePercentSkills", this.dataset.character);
                     };
  }
 },
 "drawFormTable" : function(container, character, data, tableLabel, items)
 {
  var tr, td, input, i, j, v,
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
    if ( ("html" in item) && Array.isArray(item.html) ) { item.html.forEach(function(html) { this.appendChild(html); }, th); }
    else if ( "html" in item ) { th.innerHTML = item.html; }
    else if ( "htmlCb" in item ) { item.htmlCb.call(th, item); }
    else { th.appendChild(document.createTextNode(item.label)); }
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
     v = "value" in item ? item.value : data[item.key] || 0;
     if ( item.type == "int" )
     {
      v = parseInt(v, 10);
      if ( isNaN(v) ) { v = 0; }
     }
     else if ( item.type == "float" )
     {
      v = parseFloat(v);
      if ( isNaN(v) ) { v = "0.00"; }
      else { v = API.numberToFixed(v, 2); }
      if ( v === 0 ) { v = "0.00"; }
     }
     input.value = v;
     if ( item.tabindex ) { input.setAttribute("tabindex", item.tabindex); }
    }
   }
   else
   {
    td = tr.appendChild(document.createElement("td"));
    td.colSpan = 2;
    td.innerHTML = "&nbsp;";
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
 },
 "drawEmpty" : function()
 {
  var msg = "<div class=\"choose_character\"><span class=\"bgOpaque\">Select a character</span></div><div class=\"copyright bgOpaque\">The Marvel Logo, images and all characters that appear on this website and the distinctive likeness(es) thereof are Trademarks of Marvel Entertainment, LLC and Netmarble Games. This site is not affiliated with Marvel Entertainment or Netmarble Games.</div>";
  if ( MFF.currentCharacter ) { document.getElementById(MFF.currentCharacter).classList.remove("active"); }
  MFF.currentCharacter = null;
  MFF.LAYOUT.DETAIL._panelContent.setHTML(msg);
  MFF.LAYOUT.DETAIL.GEARS._tab.hide();
  MFF.LAYOUT.DETAIL.GEARS._content.hide();
 },
 "drawCharacter" : function(character, persistant, keep, scrollIntoView, focusUniform)
 {
  var h1, img, table, tbody, tr, td, div, input, select, option, data, span, src, node;

  function choosePreviousNextCharacter(sens)
  {
   return function()
   {
    var self = document.getElementById(MFF.currentCharacter),
        node = self[sens];
    if ( !node && sens == "nextSibling" ) { node = self.parentNode.firstChild; }
    else if ( !node && sens == "previousSibling" ) { node = self.parentNode.lastChild; }
    while ( !node || node.style.display == "none" )
    {
     node = node[sens];
     if ( !node && sens == "nextSibling" ) { node = self.parentNode.firstChild; }
     else if ( !node && sens == "previousSibling" ) { node = self.parentNode.lastChild; }
     if ( node == self ) { return ; }
    }
    if ( node ) { MFF.LAYOUT.DETAIL.drawCharacter(node.id, true, null, true); }
    MFF.googleAnalytics(sens == "nextSibling" ? "goto-next-character" : "goto-previous-character");
   };
  }

  if ( !character || !(character in MFF.CHARACTERS.DATA) )
  {
   MFF.LAYOUT.DETAIL.drawEmpty();
   return ;
  }
  MFF.LAYOUT.DETAIL._panelContent.flush();
  if ( MFF.toid2 ) { MFF.toid2 = clearTimeout(MFF.toid2); }
  if ( MFF.toid ) { MFF.toid = clearTimeout(MFF.toid); }
  if ( MFF.currentCharacter ) { document.getElementById(MFF.currentCharacter).classList.remove("active"); }
  if ( persistant )
  {
   API.EVT.dispatch("globalChart", "hide");
   if ( MFF.currentCharacter )
   {
    // MFF.LAYOUT.LIST.synchroDetailGear(MFF.currentCharacter);
    //MFF.LAYOUT.LIST.synchroDevelomment(MFF.currentCharacter);
    MFF.LAYOUT.LIST.setClassType(MFF.currentCharacter);
    MFF.LAYOUT.LIST.setTier(MFF.currentCharacter);
    if ( MFF.currentCharacter == character && !keep )
    {
     MFF.LAYOUT.DETAIL.drawEmpty();
     return ;
    }
   }
   MFF.currentCharacter = character;
   if ( MFF.currentCharacter )
   {
    node = document.getElementById(MFF.currentCharacter);
    if (node )
    {
     node.classList.add("active");
     if ( scrollIntoView && node.scrollIntoView ) { node.scrollIntoView(); }
    }
   }
  }

  data = MFF.CHARACTERS.get(character);
  MFF.LAYOUT.DETAIL.setTier(data.tier);

  table = MFF.LAYOUT.DETAIL._panelContent.appendChild(document.createElement("table"));
  tbody = table.appendChild(document.createElement("tbody"));

  tr = tbody.appendChild(document.createElement("tr"));
  td = tr.appendChild(document.createElement("td"));
  td.className = "picture";
  img = td.appendChild(document.createElement("img"));
  img.className = "character";
  img.src = "images/characters/{0}/{1}.png".format(data.uniform, character);
  span = td.appendChild(document.createElement("img"));
  span.className = "tier2";
  span.src = "images/tier2.png";
  if ( persistant )
  {
   span = td.appendChild(document.createElement("i"));
   span.className = "fa fa-chevron-right";
   span.onclick = choosePreviousNextCharacter("nextSibling");
   span = td.appendChild(document.createElement("i"));
   span.className = "fa fa-chevron-left";
   span.onclick = choosePreviousNextCharacter("previousSibling");
  }
  div = td.appendChild(document.createElement("div"));
  div.id = "current_percent";
  div.className = "bgOpaque";
  div.innerHTML = MFF.PERCENT.get(character, true) + "%";

  div = td.appendChild(document.createElement("div"));
  div.id = "attributes";
  div.className = "bgOpaque";
  img = div.appendChild(document.createElement("img"));
  img.src = "images/{0}.png".format(MFF.CHARACTERS.DATA[character].uniforms[data.uniform].type);

  img = div.appendChild(document.createElement("img"));
  src = MFF.CHARACTERS.DATA[character].uniforms[data.uniform].gender;
  if ( src == "neutral" ) { src = "neutral_gender"; }
  img.src = "images/{0}.png".format(src);

  img = div.appendChild(document.createElement("img"));
  src = MFF.CHARACTERS.DATA[character].uniforms[data.uniform].side;
  if ( src == "neutral" ) { src = "neutral_side"; }
  img.src = "images/{0}.png".format(src);

  td = tr.appendChild(document.createElement("td"));
  td.className = "content";
  h1 = td.appendChild(document.createElement("h1"));
  h1.className = "bgOpaque";

  span = h1.appendChild(document.createElement("label"));
  span.id = "lblRank";
  span.appendChild(document.createTextNode("Rank"));
  input = span.appendChild(document.createElement("input"));
  input.type = "text";
  input.setAttribute("tabindex", 4);
  input.value = data.rank || "";
  input.placeholder = "unranked";
  input.onchange = function()
                   {
                    var v = parseInt(this.value, 10);
                    if ( isNaN(v) ) { v = 0; }
                    this.value = v || "";
                    // set value twice to fix Safari placeholder bug not showing if set only once
                    this.value = v || "";
                    MFF.saveCharacter({ "mode" : "rank", "rank" : v });
                   };

  span = h1.appendChild(document.createElement("label"));
  span.id = "lblCombatPower";
  span.appendChild(document.createTextNode("Combat power"));
  input = span.appendChild(document.createElement("input"));
  input.type = "text";
  input.setAttribute("tabindex", 3);
  input.value = data.combatPower || 0;
  input.onchange = function()
                   {
                    var v = parseInt(this.value, 10);
                    if ( isNaN(v) ) { v = 0; }
                    this.value = v || "";
                    // set value twice to fix Safari placeholder bug not showing if set only once
                    this.value = v || "";
                    MFF.saveCharacter({ "mode" : "combatPower", "combatPower" : v });
                   };

  span = h1.appendChild(document.createElement("img"));
  span.src = "images/star_{0}.png".format(data.favorite ? "yellow" : "grey");
  span.id = "character_favorite";
  span.title = "Toggle favorite";
  span.onclick = function()
  {
   var checked = this.src.indexOf("yellow") != -1;
   this.src = "images/star_{0}.png".format(checked ? "grey" : "yellow");
   MFF.saveCharacter({ "mode" : "favorite", "favorite" : !checked });
   MFF.filters();
  };

  span = h1.appendChild(document.createElement("label"));
  span.htmlFor = "character_level";
  span.appendChild(document.createTextNode("#"));
  input = span.appendChild(document.createElement("input"));
  input.type = "text";
  input.setAttribute("tabindex", 1);
  input.id = "character_level";
  input.onchange = function() { MFF.saveCharacter({ "mode" : "level", "level" : this.value }); };
  input.value = data.level;
  select = h1.appendChild(document.createElement("select"));
  select.id = "character_tier";
  select.setAttribute("tabindex", 2);
  select.onchange = function()
  {
   var tier = this.options[this.selectedIndex].value;
   MFF.LAYOUT.DETAIL.setTier(tier);
   MFF.saveCharacter({ "mode" : "tier", "tier" : tier });
  };
  option = select.appendChild(document.createElement("option"));
  option.value = "1";
  option.text = "Tier 1";
  option = select.appendChild(document.createElement("option"));
  option.value = "2";
  option.text = "Tier 2";
  select.selectedIndex = data.tier - 1;
  if ( MFF.CHARACTERS.DATA[character].tiers[0] != 1 ) { select.removeChild(select.firstChild); }
  if ( MFF.CHARACTERS.DATA[character].tiers.indexOf(2) === -1 ) { select.removeChild(select.lastChild); }

  h1.appendChild(document.createTextNode(MFF.CHARACTERS.DATA[character].uniforms[data.uniform].name));

  MFF.LAYOUT.DETAIL.drawSkills(td, data);
  MFF.LAYOUT.DETAIL.drawAttributes(td, character, persistant);

  if ( persistant ) { MFF.googleAnalytics("draw-character-" + MFF.currentCharacter); }
  MFF.LAYOUT.DETAIL.GEARS.synchroCurrentTab(focusUniform);
 },
 "setTier" : function(tier)
 {
  MFF.LAYOUT.DETAIL._panelContent.removeClass("tier1");
  MFF.LAYOUT.DETAIL._panelContent.removeClass("tier2");
  MFF.LAYOUT.DETAIL._panelContent.addClass(tier == 2 ? "tier2" : "tier1");
 }

};
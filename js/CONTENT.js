/* global MFF, Panel, API */
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

  // ATTACK
  MFF.LAYOUT.DETAIL.drawFormTable(container, character, data, "Attacks",
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
  MFF.LAYOUT.DETAIL.drawFormTable(container, character, data, "Defenses",
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
  MFF.LAYOUT.DETAIL.drawFormTable(container, character, data, "Debuff",
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

  // compute values
  showAvgDef()();
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
 },
 "drawEmpty" : function()
 {
  var msg = "<div class=\"choose_character\"><span class=\"bgOpaque\">Select a character</span></div><div class=\"copyright bgOpaque\">The Marvel Logo, images and all characters that appear on this website and the distinctive likeness(es) thereof are Trademarks of Marvel Entertainment, LLC and Netmarble Games. This site is not affiliated with Marvel Entertainment or Netmarble Games.</div>";
  MFF.currentCharacter = null;
  MFF.LAYOUT.DETAIL._panelContent.setHTML(msg);
  MFF.LAYOUT.DETAIL.GEARS._tab.hide();
  MFF.LAYOUT.DETAIL.GEARS._content.hide();
 },
 "drawCharacter" : function(character, persistant, keep)
 {
  var h1, img, table, tbody, tr, td, k, i, div, input, select, option, data, span, src, node;

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
    if ( node ) { MFF.LAYOUT.DETAIL.drawCharacter(node.id, true); }
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
    // k = document.getElementById(MFF.currentCharacter + "_percent");
    // percent = MFF.computePercent(MFF.currentCharacter);
    // k.innerHTML = API.numberToFixed(percent, 2) + "%";
    MFF.LAYOUT.LIST.synchroDetailGear(MFF.currentCharacter);
    MFF.LAYOUT.LIST.synchroDevelomment(MFF.currentCharacter);
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
     if ( node.scrollIntoView ) { node.scrollIntoView(); }
    }
   }
  }

  data = MFF.CHARACTERS.get(character);
  MFF.LAYOUT.DETAIL.setTier(data.tier);

  table = MFF.LAYOUT.DETAIL._panelContent.appendChild(document.createElement("table"));
  tbody = table.appendChild(document.createElement("tbody"));

  tr = tbody.appendChild(document.createElement("tr"));

  td = tr.appendChild(document.createElement("td"));
  select = td.appendChild(document.createElement("select"));
  select.id = "uniform";
  select.title = "Uniform";
  i = 0;
  for ( k in MFF.CHARACTERS.DATA[character].uniforms )
  {
   if ( MFF.CHARACTERS.DATA[character].uniforms.hasOwnProperty(k) )
   {
    option = select.appendChild(document.createElement("option"));
    option.value = k;
    option.text = MFF.UNIFORMS[k];
    if ( data.uniform == k ) { select.selectedIndex = i;}
    i++;
   }
  }
  select.onchange = function() { MFF.saveCharacter({ "mode" : "uniform", "uniform" : this.options[this.selectedIndex].value }); };

  td = tr.appendChild(document.createElement("td"));
  td.id = "skills";
  MFF.LAYOUT.DETAIL.drawSkills(td, data);

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
  div.innerHTML = API.numberToFixed(MFF.computePercent(character), 2) + "%";

  td = tr.appendChild(document.createElement("td"));
  td.className = "content";
  h1 = td.appendChild(document.createElement("h1"));
  h1.className = "bgOpaque";

  img = h1.appendChild(document.createElement("img"));
  img.src = "images/{0}.png".format(MFF.CHARACTERS.DATA[character].uniforms[data.uniform].type);

  img = h1.appendChild(document.createElement("img"));
  src = MFF.CHARACTERS.DATA[character].uniforms[data.uniform].gender;
  if ( src == "neutral" ) { src = "neutral_gender"; }
  img.src = "images/{0}.png".format(src);

  img = h1.appendChild(document.createElement("img"));
  src = MFF.CHARACTERS.DATA[character].uniforms[data.uniform].side;
  if ( src == "neutral" ) { src = "neutral_side"; }
  img.src = "images/{0}.png".format(src);

  span = h1.appendChild(document.createElement("label"));
  span.htmlFor = "character_level";
  span.appendChild(document.createTextNode("#"));
  input = span.appendChild(document.createElement("input"));
  input.type = "text";
  input.id = "character_level";
  input.onchange = function() { MFF.saveCharacter({ "mode" : "level", "level" : this.value }); };
  input.value = data.level;
  select = h1.appendChild(document.createElement("select"));
  select.id = "character_tier";
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

  MFF.LAYOUT.DETAIL.drawAttributes(td, character, persistant);

  if ( persistant ) { MFF.googleAnalytics("draw-character-" + MFF.currentCharacter); }
  MFF.LAYOUT.DETAIL.GEARS.synchroCurrentTab(character);
 },
 "setTier" : function(tier)
 {
  MFF.LAYOUT.DETAIL._panelContent.removeClass("tier1");
  MFF.LAYOUT.DETAIL._panelContent.removeClass("tier2");
  MFF.LAYOUT.DETAIL._panelContent.addClass(tier == 2 ? "tier2" : "tier1");
 }

};
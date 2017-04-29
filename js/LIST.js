/* global MFF, Panel, Button, API */
MFF.LAYOUT.LIST =
{
 "init" : function()
 {
  var node;
  function cb(format) { return function() { API.EVT.dispatch("switchList", format); }; }
  function listener(format)
  {
   function fn(param) { this.setActive(format == param); }
   return { "method" : "switchList", "callback" : fn };
  }

  MFF.LAYOUT.LIST._panel = new Panel({ "id" : "panelList" });
  node = MFF.LAYOUT.LIST._panel.getNode();
  MFF.LAYOUT.LIST._tab = new Panel({ "id" : "panelListTab", "parent" : node });
  MFF.LAYOUT.LIST._content = new Panel({ "id" : "panelListContent", "parent" : node, "tag" : "ul" });
  node = MFF.LAYOUT.LIST._tab.getNode();
  MFF.LAYOUT.LIST._btnList = new Button({ "small" : true, "renderTo" : node, "fa" : "bars", "callback" : cb("list"), "listener" : listener("list") });
  MFF.LAYOUT.LIST._btnIcon = new Button({ "small" : true, "renderTo" : node, "fa" : "th", "callback" : cb("icon"), "listener" : listener("icon") });
  MFF.LAYOUT.LIST.filteredCharacters = node.appendChild(document.createElement("span"));
  MFF.LAYOUT.LIST.filteredCharacters.id = "filteredCharacters";

  API.EVT.on("totalFiltered", MFF.LAYOUT.LIST.totalFiltered);

  MFF.LAYOUT.LIST.draw();

  API.EVT.on("refreshPercentGlobal", MFF.LAYOUT.LIST.synchroDevelomment);
  API.EVT.on("refreshPercentGears", MFF.LAYOUT.LIST.synchroDetailGear);

  API.EVT.on("switchList", MFF.LAYOUT.LIST.switchTo);
  API.EVT.on("sortList", MFF.LAYOUT.LIST.sort);

  API.EVT.dispatch("switchList", localStorage.getItem("list") || "list");
  API.EVT.dispatch("sortList");
 },
 "totalFiltered" : function(params)
 {
  MFF.LAYOUT.LIST.filteredCharacters.innerHTML = params.nb == params.total ? params.total + " characters" : "{0} / {1} characters".format(params.nb, params.total);
 },
 "switchTo" : function(format)
 {
  localStorage.setItem("list", format);
  MFF.LAYOUT.LIST._content.removeClass("render-list");
  MFF.LAYOUT.LIST._content.removeClass("render-icon");
  MFF.LAYOUT.LIST._content.addClass("render-" + format);
  MFF.googleAnalytics("switch-to-list-" + format);
 },
 "draw" : function()
 {
  var character, li,
      ul = MFF.LAYOUT.LIST._content.getNode();
  for ( character in MFF.CHARACTERS.DATA )
  {
   if ( MFF.CHARACTERS.DATA.hasOwnProperty(character) )
   {
    li = ul.appendChild(document.createElement("li"));
    li.id = character;
    MFF.LAYOUT.LIST.drawCharacter(character);
   }
  }
  API.EVT.dispatch("totalFiltered", { "nb" : ul.childNodes.length, "total" : ul.childNodes.length });
  ul.onclick = function(evt)
  {
   var target = API.EVT.getParentTarget(evt, "li");
   if ( target ) { MFF.LAYOUT.DETAIL.drawCharacter(target.id, true); }
  };
  ul.onmousemove = function(evt)
  {
   var target;
   if ( !MFF.currentCharacter && (target = API.EVT.getParentTarget(evt, "li")) )
   {
    if ( MFF.lastTarget != target.id )
    {
     MFF.lastTarget = target.id;
     MFF.LAYOUT.DETAIL.drawCharacter(target.id, false);
    }
   }
   else if ( !target && !MFF.currentCharacter )
   {
    MFF.lastTarget = null;
    MFF.LAYOUT.DETAIL.drawCharacter(null, false);
   }
  };
  ul.onmouseleave = function()
  {
   if ( !MFF.currentCharacter )
   {
    MFF.lastTarget = null;
    MFF.LAYOUT.DETAIL.drawCharacter(null, false);
   }
  };
  MFF.googleAnalytics("render-list");
 },
 "drawCharacter" : function(character)
 {
  var img, p, span, lineGear, i, progressBar, name,
      li = document.getElementById(character),
      data = MFF.CHARACTERS.get(character);
  name = MFF.CHARACTERS.getNameForUniform(character, data.uniform);
  API.DOM.flush(li);
  MFF.LAYOUT.LIST.setClassType(character);
  MFF.LAYOUT.LIST.setTier(character);
  progressBar = li.appendChild(document.createElement("div"));
  progressBar.className = "progressBar";
  /*
  img = li.appendChild(document.createElement("img"));
  img.className = "characterPicture";
  img.src = MFF.CHARACTERS.getImageUrlForUniform(data.id, data.uniform);
  img.title = name,
  */
  img = li.appendChild(MFF.CHARACTERS.getImageForUniform(data.id, data.uniform));
  img.className = "characterPicture";
  img = li.appendChild(document.createElement("img"));
  img.src = "images/tier2.png";
  img.title = name,
  img.className = "tier2";
  p = li.appendChild(document.createElement("p"));
  img = p.appendChild(document.createElement("span"));
  img.className = "character_type";
  p.appendChild(document.createTextNode(name));
  p.appendChild(document.createElement("br"));
  span = p.appendChild(document.createElement("span"));
  span.id = character + "_sub";
  span.className = "character_sub";
  for ( i = 0; i < 4; i++ )
  {
   lineGear = li.appendChild(document.createElement("div"));
   lineGear.id = "{0}_lineDetailGear_{1}".format(character, i + 1);
   lineGear.className = "lineDetailGear lineDetailGear{0}".format(i + 1);
  }
  MFF.PERCENT.init(character);
  MFF.LAYOUT.LIST.synchroDetailGear(character);
  MFF.LAYOUT.LIST.synchroDevelomment(character);
 },
 "setSortAttribute" : function(attribute) { localStorage.setItem("sorterAttribute", attribute); },
 "setSortDirection" : function(direction) { localStorage.setItem("sorterDirection", direction); },
 "getSortAttribute" : function() { var v = localStorage.getItem("sorterAttribute"); return v === undefined || v === null || v === "undefined" || v === "null" || v == "" || !(v in MFF.axisItems) ? "name" : v; },
 "getSortDirection" : function() { var v = localStorage.getItem("sorterDirection"); return v === undefined || v === null || v === "undefined" || v === "null" || v == "" ? "asc" : v; },
 "sort" : function()
 {
  var charsId = Object.keys(MFF.CHARACTERS.DATA),
      attribute = MFF.LAYOUT.LIST.getSortAttribute(),
      direction = MFF.LAYOUT.LIST.getSortDirection(),
      cb = MFF.axisItems[attribute].callback,
      sorted = charsId.sort(function(a, b)
                            {
                             var A, B, tmp;
                             a = MFF.CHARACTERS.get(a);
                             b = MFF.CHARACTERS.get(b);
                             if ( direction != "asc" )
                             {
                              tmp = a;
                              a = b;
                              b = tmp;
                             }
                             A = cb(a).value;
                             B = cb(b).value;
                             if ( attribute != "name" )
                             {
                              if ( a != b ) { return B - A; }
                              A = MFF.axisItems.name.callback(a).value;
                              B = MFF.axisItems.name.callback(b).value;
                             }
                             return A.localeCompare(B);
                            });
  sorted.forEach(function(character)
                 {
                  MFF.LAYOUT.LIST._content.getNode().appendChild(document.getElementById(character));
                  MFF.LAYOUT.LIST.setSub(character);
                 });
  MFF.googleAnalytics("sort-list-by-" + attribute + "-" + direction);
 },
 "synchroDetailGear" : function(character)
 {
  var lineGear, i, j, cName, span, percent, min, max,
      data = MFF.CHARACTERS.get(character);
      //TODO : vérifier si ca existe encore ça
  if ( (span = document.getElementById("{0}_level".format(character))) ) { span.innerHTML = "#" + data.level; }
  if ( (span = document.getElementById("{0}_tier".format(character))) ) { span.innerHTML = "/T" + data.tier; }
  for ( i = 0; i < 4; i++ )
  {
   lineGear = document.getElementById("{0}_lineDetailGear_{1}".format(character, i + 1));
   API.DOM.flush(lineGear);
   for ( j = 0; j < data.gear[i].length; j++ )
   {
    cName = "";
    if ( data.gear[i][j].type )
    {
     if ( !data.gear[i][j].pref ) { cName = "undef"; }
     else
     {
      min = MFF.GEARS[i][data.gear[i][j].type].range[j].min;
      max = MFF.GEARS[i][data.gear[i][j].type].range[j].max;
      percent = MFF.PERCENT.individual(data.gear[i][j].val, min, max);
      if ( percent == 100 ) { cName = "max"; }
      else if ( percent > 50 ) { cName = "sup"; }
      else if ( percent == 50 ) { cName = "moy"; }
      else if ( percent > 0 ) { cName = "inf"; }
      else if ( percent == 0 ) { cName = "min"; }
     }
     // else if ( data.gear[i][j].percent == 100 ) { cName = "max"; }
     // else if ( data.gear[i][j].percent > 50 ) { cName = "sup"; }
     // else if ( data.gear[i][j].percent == 50 ) { cName = "moy"; }
     // else if ( data.gear[i][j].percent > 0 ) { cName = "inf"; }
     // else if ( data.gear[i][j].percent == 0 ) { cName = "min"; }
    }
    span = lineGear.appendChild(document.createElement("span"));
    span.className = cName;
   }
  }
 },
 "synchroDevelomment" : function(character)
 {
  var cName = "undef",
      li = document.getElementById(character),
      percent = MFF.PERCENT.get(character);
  if ( percent == 100 ) { cName = "max"; }
  else if ( percent > 50 ) { cName = "sup"; }
  else if ( percent == 50 ) { cName = "moy"; }
  else if ( percent > 25 ) { cName = "inf"; }
  else if ( percent != 0 ) { cName = "min"; }
  li.classList.remove("undef");
  li.classList.remove("max");
  li.classList.remove("sup");
  li.classList.remove("moy");
  li.classList.remove("inf");
  li.classList.remove("min");
  if ( cName ) { li.classList.add(cName); }
  li.querySelector("div.progressBar").style.width = percent + "%";
 },
 "setClassType" : function(character)
 {
  var li = document.getElementById(character),
      data = MFF.CHARACTERS.get(character);
  li.classList.remove("combat");
  li.classList.remove("speed");
  li.classList.remove("blast");
  li.classList.remove("universal");
  li.classList.add(MFF.CHARACTERS.DATA[character].uniforms[data.uniform].type);
 },
 "setTier" : function(character)
 {
  var li = document.getElementById(character),
      data = MFF.CHARACTERS.get(character);
  li.classList.remove("tier1");
  li.classList.remove("tier2");
  li.classList.add("tier" + data.tier);
 },
 "setSub" : function(character)
 {
  var tmp, Y, M, D,
      v = null,
      attribute = MFF.LAYOUT.LIST.getSortAttribute(),
      span = document.getElementById(character + "_sub");
  if ( span ) { span.innerHTML = ""; span.title = ""; }
  if ( span && attribute != "name" )
  {
   tmp = MFF.axisItems[attribute].callback(MFF.CHARACTERS.get(character));
   switch ( attribute )
   {
    case "lastUpdate":
     if ( tmp.value )
     {
      tmp = new Date(tmp.value);
      if ( tmp )
      {
       Y = tmp.getFullYear();
       M = 1 + tmp.getMonth();
       D = tmp.getDate();
       if ( M < 10 ) { M = "0" + M; }
       if ( D < 10 ) { D = "0" + D; }
       v = "{0}-{1}-{2}".format(Y, M, D);
      }
      else { v = "Invalid"; }
     }
     else { v = "Unknown"; }
    break;
    case "combat_power":
     v = parseInt(tmp.value, 10);
     if ( isNaN(v) ) { v = 0; }
    break;
    default:
     if ( tmp.percent ) { v = API.numberToFixed(tmp.value, 2) + "%"; }
     else { v = parseInt(tmp.value, 10); }
    break;
   }
   if ( v !== null )
   {
    span.innerHTML = MFF.axisItems[attribute].label + ": " + v;
    span.title = MFF.axisItems[attribute].label;
   }
  }
 }
};
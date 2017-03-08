/* global MFF, Panel, Button, API */
MFF.LAYOUT.LIST =
{
 "_panel" : null,
 "_tab" : null,
 "_content" : null,
 "init" : function()
 {
  var node, data;
  function cb(format) { return function() { API.EVT.dispatch("switchList", format); }; }
  function listener(format)
  {
   function fn(param) { this.setActive(format == param); }
   return { "method" : "switchList", "callback" : fn };
  }

  if ( (data = localStorage.getItem("sorter")) && data != null && (typeof data == "string") && (data = JSON.parse(data)) )
  {
   MFF.LAYOUT.LIST._currentSort = { "key" : data.key, "order" : data.order == "desc" ? "asc" : "desc" };
  }

  MFF.LAYOUT.LIST._panel = new Panel({ "id" : "panelList" });
  node = MFF.LAYOUT.LIST._panel.getNode();
  MFF.LAYOUT.LIST._tab = new Panel({ "id" : "panelListTab", "parent" : node });
  MFF.LAYOUT.LIST._content = new Panel({ "id" : "panelListContent", "parent" : node, "tag" : "ul" });
  node = MFF.LAYOUT.LIST._tab.getNode();
  MFF.LAYOUT.LIST._btnList = new Button({ "small" : true, "renderTo" : node, "fa" : "bars", "callback" : cb("list"), "listener" : listener("list") });
  MFF.LAYOUT.LIST._btnIcon = new Button({ "small" : true, "renderTo" : node, "fa" : "th", "callback" : cb("icon"), "listener" : listener("icon") });

  MFF.LAYOUT.LIST.draw();

  API.EVT.on("switchList", MFF.LAYOUT.LIST.switchTo);
  API.EVT.on("sortList", MFF.LAYOUT.LIST.sort);

  API.EVT.dispatch("switchList", localStorage.getItem("list") || "list");
  API.EVT.dispatch("sortList", MFF.LAYOUT.LIST._currentSort.key);
 },
 "switchTo" : function(format)
 {
  //alert("switch To " + format);
  // localStorage.setItem("list", format);
  MFF.LAYOUT.LIST._content.removeClass("render-list");
  MFF.LAYOUT.LIST._content.removeClass("render-icon");
  MFF.LAYOUT.LIST._content.addClass("render-" + format);
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
    MFF.LAYOUT.LIST.drawCharacter(character); //MFF.drawContentLI(character);
   }
  }
  ul.onclick = function(evt)
  {
   var target = API.EVT.getParentTarget(evt, "li");
   if ( target ) { MFF.drawCharacter(target.id, true); }
  };
  ul.onmousemove = function(evt)
  {
   var target;
   if ( !MFF.currentCharacter && (target = API.EVT.getParentTarget(evt, "li")) )
   {
    if ( MFF.lastTarget != target.id )
    {
     MFF.lastTarget = target.id;
     MFF.drawCharacter(target.id, false);
    }
   }
   else if ( !target && !MFF.currentCharacter )
   {
    MFF.lastTarget = null;
    MFF.drawCharacter(null, false);
   }
  };
 },
 "drawCharacter" : function(character)
 {
  var img, p, span, percent, lineGear, i, progressBar,
      li = document.getElementById(character),
      data = MFF.CHARACTERS.get(character);
  API.DOM.flush(li);
  MFF.setClassTypeLI(character);
  MFF.setTierLI(character);
  progressBar = li.appendChild(document.createElement("div"));
  progressBar.className = "progressBar";
  img = li.appendChild(document.createElement("img"));
  img.className = "characterPicture";
  img.src = "images/characters/{0}/{1}.png".format(data.uniform, character);
  img = li.appendChild(document.createElement("img"));
  img.src = "images/tier2.png";
  img.className = "tier2";
  p = li.appendChild(document.createElement("p"));
  img = p.appendChild(document.createElement("span"));
  img.className = "character_type";
  p.appendChild(document.createTextNode(MFF.CHARACTERS.DATA[character].uniforms[data.uniform].name));
  p.appendChild(document.createElement("br"));
  span = p.appendChild(document.createElement("span"));
  span.id = character + "_level";
  span.className = "chiffre";
  span.innerHTML = "#?";
  span = p.appendChild(document.createElement("span"));
  span.className = "chiffre";
  span.id = character + "_tier";
  span.innerHTML = "?";
  span = p.appendChild(document.createElement("span"));
  span.className = "chiffre";
  span.id = character + "_percent";
  span.style.marginLeft = "5px";
  percent = MFF.computePercent(character);
  span.innerHTML = API.numberToFixed(percent, 2) + "%";
  for ( i = 0; i < 4; i++ )
  {
   lineGear = li.appendChild(document.createElement("div"));
   lineGear.id = "{0}_lineDetailGear_{1}".format(character, i + 1);
   lineGear.className = "lineDetailGear lineDetailGear{0}".format(i + 1);
  }
  MFF.setColorLineDetail(character);
  MFF.setColorLI(character, percent);
 },
 "_currentSort" : { "key" : "", "order" : "desc" },
 "sort" : function(by)
 {
  var sorted,
      groupButton = MFF.LAYOUT.ACTION._panel.getNode().querySelector(".groupButton.sorter"),
      active = groupButton.querySelector(".active"),
      btn = groupButton.querySelector("." + by),
      charsId = Object.keys(MFF.CHARACTERS.DATA);
  if ( active )
  {
   active.classList.remove("asc");
   active.classList.remove("desc");
   active.classList.remove("active");
  }
  if ( MFF.LAYOUT.LIST._currentSort.key == by ) { MFF.LAYOUT.LIST._currentSort.order = MFF.LAYOUT.LIST._currentSort.order == "asc" ? "desc" : "asc"; }
  else { MFF.LAYOUT.LIST._currentSort = { "key" : by, "order" : "asc" }; }
  localStorage.setItem("sorter", JSON.stringify(MFF.LAYOUT.LIST._currentSort));
  btn.classList.add("active");
  btn.classList.add(MFF.LAYOUT.LIST._currentSort.order);

  sorted = charsId.sort(function(a, b)
                        {
                         var A, B, tmp, dataA, dataB, nameA, nameB;
                         if ( MFF.LAYOUT.LIST._currentSort.order != "asc" )
                         {
                          tmp = a;
                          a = b;
                          b = tmp;
                         }
                         dataA = MFF.CHARACTERS.get(a);
                         dataB = MFF.CHARACTERS.get(b);
                         nameA = MFF.CHARACTERS.DATA[a].uniforms[dataA.uniform].name;
                         nameB = MFF.CHARACTERS.DATA[b].uniforms[dataB.uniform].name;
                         switch ( MFF.LAYOUT.LIST._currentSort.key )
                         {
                          case "sortByPercent" :
                           A = MFF.computePercent(a);
                           B = MFF.computePercent(b);
                           if ( A != B ) { return B - A; }
                          break;
                          case "sortByLevel" :
                           A = dataA.level;
                           B = dataB.level;
                           if ( A != B ) { return B - A; }
                          break;
                          case "sortByAttack" :
                           A = MFF.CHARACTERS.DATA[a].uniforms[dataA.uniform].attackBase == "physical" ? dataA.attack.physical : dataA.attack.energy;
                           B = MFF.CHARACTERS.DATA[b].uniforms[dataB.uniform].attackBase == "physical" ? dataB.attack.physical : dataB.attack.energy;
                           if ( A != B ) { return B - A; }
                          break;
                         }
                         return nameA.localeCompare(nameB);
                        });

  sorted.forEach(function(character) { MFF.LAYOUT.LIST._content.getNode().appendChild(document.getElementById(character)); });
 },
 "synchroDetailGear" : function(character)
 {
  var lineGear, i, j, cName, span,
      data = MFF.CHARACTERS.get(character);
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
     else if ( data.gear[i][j].percent == 100 ) { cName = "max"; }
     else if ( data.gear[i][j].percent > 50 ) { cName = "sup"; }
     else if ( data.gear[i][j].percent == 50 ) { cName = "moy"; }
     else if ( data.gear[i][j].percent > 0 ) { cName = "inf"; }
     else if ( data.gear[i][j].percent == 0 ) { cName = "min"; }
    }
    span = lineGear.appendChild(document.createElement("span"));
    span.className = cName;
   }
  }
 },
 "synchroDevelomment" : function(elt, percent)
 {
  var cName = "undef",
      li = API.DOM.parent(elt, "li");
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
  li.firstChild.style.width = percent + "%";
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
 }


};

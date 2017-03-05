/* global ga, CHARACTERS, API, FOOTER, Highcharts, UNIFORMS, GEARS, DETAIL, MODAL, Button, ImageButton, GroupButton */
// localStorage.removeItem("characters");
// localStorage.removeItem("sorter");

var MFF =
{
 "googleAnalyticsUID":"UA-92278331-1",
 "version":"2.0",
 "versionMFF":"2.9",
 "nbBackground":16,
 "characters":{},
 "layout":
 {
  "action":null,
  "list":null,
  "detail":null,
  "charts":null,
  "detail_charts":null
 },
 "panels":
 {
 },
 "localStorageKeys":
 {
  "main":"characters",
  "chartRender":"globalChartRender",
  "sorter":"sorter"
 },
 "toid":null,
 "currentCharacter":null,
 "googleAnalytics":function(page)
 {
  ga("set", "page", "/" + page + ".html");
  ga("send", "pageview");
 },
 "shownClassType":["combat", "speed", "blast", "universal"],
 "shownClassSide":["hero", "vilain", "neutral"],
 "shownClassGender":["male", "female", "neutral"],
 "toggleClass":function(reference)
 {
  return function(checked, type)
  {
   var idx,
       ref = {"type":"shownClassType", "side":"shownClassSide", "gender":"shownClassGender"}[reference];
   document.getElementById("query").value = "";
   if ( checked )
   {
    if ( MFF[ref].indexOf(type) == -1 ) { MFF[ref].push(type); }
   }
   else
   {
    idx = MFF[ref].indexOf(type);
    if ( idx != -1 ) { MFF[ref].splice(idx, 1); }
   }
   MFF.filters();
  };
 },
 "filters":function()
 {
  var i, j, showHide, data, gender, side,
      reduce = function(str) { return str.trim().toLowerCase().replace(/[^a-z]/g, ""); },
      query = reduce(document.getElementById("query").value),
      childs = document.getElementById("allCharacters").childNodes;
  for ( i = 0; i < childs.length; i++ )
  {
   data=MFF.loadCharacter(childs[i].id);
   showHide = "hide";
   for ( j = 0; j < MFF.shownClassType.length; j++ )
   {
    if ( childs[i].classList.contains(MFF.shownClassType[j]) )
    {
     showHide = "show";
     break;
    }
   }
   if ( showHide == "show" )
   {
    gender = CHARACTERS[childs[i].id].uniforms[data.uniform].gender;
    if ( MFF.shownClassGender.indexOf(gender) == -1 ) { showHide = "hide"; }
   }
   if ( showHide == "show" )
   {
    side = CHARACTERS[childs[i].id].uniforms[data.uniform].side;
    if ( MFF.shownClassSide.indexOf(side) == -1 ) { showHide = "hide"; }
   }
   if ( showHide == "show" && query && reduce(CHARACTERS[childs[i].id].uniforms[data.uniform].name).indexOf(query) == -1 )
   {
    showHide = "hide";
   }
   childs[i].style.display = showHide == "show" ? "" : "none";
  }
  if ( MFF.globalChart ) { MFF.renderChart(); }
 },
 "queryToid":null,
 "queryOnSearch":function()
 {
  if ( MFF.queryToid ) { MFF.queryToid = clearTimeout(MFF.queryToid); }
  MFF.queryToid = setTimeout(MFF.filters, 150);
  MFF.googleAnalytics("search");
 },
 "axisItems":
 {
  "attack" :           {"label":"Attack", "callback":function(character, id) { var v = character.attack[CHARACTERS[id].uniforms[character.uniform].attackBase]; return {"value":v, "percent":false}; } },
  "attack_energy" :    {"label":"Energy attack", "callback":function(character) { var v = character.attack.physical; return {"value":v, "percent":false}; } },
  "attack_physical" :  {"label":"Physical attack", "callback":function(character) { var v = character.attack.physical; return {"value":v, "percent":false}; } },
  "atkspeed" :         {"label":"Attack speed", "callback":function(character) { var v = character.atkspeed; return {"value":v, "percent":true}; } },
  "critdamage" :       {"label":"Critical damage", "callback":function(character) { var v = character.critdamage; return {"value":v, "percent":true}; } },
  "critrate" :         {"label":"Critical rate", "callback":function(character) { var v = character.critrate; return {"value":v, "percent":true}; } },
  "debuff" :           {"label":"Debuff duration", "callback":function(character) { var v = character.debuff; return {"value":v, "percent":true}; } },
  "completion" :       {"label":"Development completion", "callback":function(character, id) { var v = MFF.computePercent(id); return {"value":v, "percent":true}; } },
  "defense_average" :  {"label":"Defense average", "callback":function(character) { var v = (character.defense.physical + character.defense.energy) / 2; return {"value":v, "percent":false}; } },
  "defense_energy" :   {"label":"Defense energy", "callback":function(character) { var v = character.defense.energy; return {"value":v, "percent":false}; } },
  "defense_physical" : {"label":"Defense physical", "callback":function(character) { var v = character.defense.physical; return {"value":v, "percent":false}; } },
  "dodge" :            {"label":"Dodge", "callback":function(character) { var v = character.dodge; return {"value":v, "percent":true}; } },
  "hp" :               {"label":"Hit points", "callback":function(character) { var v = character.hp; return {"value":v, "percent":false}; } },
  "defpen" :           {"label":"Ignore defense", "callback":function(character) { var v = character.defpen; return {"value":v, "percent":true}; } },
  "ignore_dodge" :     {"label":"Ignore dodge", "callback":function(character) { var v = character.ignore_dodge; return {"value":v, "percent":true}; } },
  "level" :            {"label":"Level", "callback":function(character) { var v = character.level; return {"value":v, "percent":false}; } },
  "movspeed" :         {"label":"Movement speed", "callback":function(character) { var v = character.movspeed; return {"value":v, "percent":true}; } },
  "recorate" :         {"label":"Recovery rate", "callback":function(character) { var v = character.recorate; return {"value":v, "percent":true}; } },
  "scd" :              {"label":"Skill cooldown", "callback":function(character) { var v = character.scd; return {"value":v, "percent":true}; } }
 },
 "createActions":function()
 {
  var span, input;
  function axis(type)
  {
   var option, select, k, i,
       span = MFF.layout.action.appendChild(document.createElement("span")),
       defSelected = type == "x" ? "attack_total" : "completion",
       storageKey = type == "x" ? "XAxis" : "YAxis",
       selected = localStorage.getItem(storageKey) || defSelected;
   span.className = "chartAxis button";
   span.innerHTML = type == "x" ? "X-Axis" : "Y-Axis";
   select = span.appendChild(document.createElement("select"));
   select.id = storageKey;
   i = 0;
   for ( k in MFF.axisItems )
   {
    if ( MFF.axisItems.hasOwnProperty(k) )
    {
     option = select.appendChild(document.createElement("option"));
     option.value = k;
     option.text = MFF.axisItems[k].label;
     if ( k == selected )
     {
      select.selectedIndex = i;
     }
    }
    i++;
   }
   select.onchange = (function(storageKey)
                      {
                       return function()
                       {
                        localStorage.setItem(storageKey, this.value);
                        MFF.renderChart();
                       };
                      })(storageKey);
  }
  new Button({"renderTo":MFF.layout.action, "label":"Import / Export", "callback":MFF.cbImportExport, "styles":{"float":"right"}});
  new ImageButton({"renderTo":MFF.layout.action, "type":"combat", "image":"combat.png", "checked":true, "callback":MFF.toggleClass("type")});
  new ImageButton({"renderTo":MFF.layout.action, "type":"speed", "image":"speed.png", "checked":true, "callback":MFF.toggleClass("type")});
  new ImageButton({"renderTo":MFF.layout.action, "type":"blast", "image":"blast.png", "checked":true, "callback":MFF.toggleClass("type")});
  new ImageButton({"renderTo":MFF.layout.action, "type":"universal", "image":"universal.png", "checked":true, "callback":MFF.toggleClass("type")});
  new ImageButton({"renderTo":MFF.layout.action, "type":"hero", "image":"hero.png", "checked":true, "callback":MFF.toggleClass("side")});
  new ImageButton({"renderTo":MFF.layout.action, "type":"vilain", "image":"vilain.png", "checked":true, "callback":MFF.toggleClass("side")});
  new ImageButton({"renderTo":MFF.layout.action, "type":"male", "image":"male.png", "checked":true, "callback":MFF.toggleClass("gender")});
  new ImageButton({"renderTo":MFF.layout.action, "type":"female", "image":"female.png", "checked":true, "callback":MFF.toggleClass("gender")});
  new Button({"renderTo":MFF.layout.action, "label":"Chart", "callback":MFF.renderChart, "className":"showCharts"});
  new Button({"renderTo":MFF.layout.action, "label":"List", "callback":MFF.renderList, "className":"showList"});
  new GroupButton({
                   "renderTo":MFF.layout.action, "className":"sorter",
                   "items":[
                            {"label":"Sort by name <i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>", "callback":MFF.cbSort("sortByName"), "className":"sortByName"},
                            {"label":"by percent <i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>", "callback":MFF.cbSort("sortByPercent"), "className":"sortByPercent"},
                            {"label":"by level <i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>", "callback":MFF.cbSort("sortByLevel"), "className":"sortByLevel"},
                            {"label":"by attack <i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>", "callback":MFF.cbSort("sortByAttack"), "className":"sortByAttack"}
                           ]
                  }
                 );

  axis("x");
  axis("y");

  input = MFF.layout.action.appendChild(document.createElement("input"));
  input.type = "text";
  input.id = "query";
  input.placeholder = "Search";
  input.onkeyup = MFF.queryOnSearch;
  span = MFF.layout.action.appendChild(document.createElement("i"));
  span.id = "clearQuery";
  span.className = "fa fa-close";
  span.onclick = function() { document.getElementById("query").value = ""; MFF.queryOnSearch(); };
 },
 "currentSort":{"key":"", "order":""},
 "cbSort":function(by)
 {
  return function()
  {
   var i, sorted,
       groupButton = MFF.layout.action.querySelector(".groupButton.sorter"),
       active = groupButton.querySelector(".active"),
       btn = groupButton.querySelector("." + by),
       charsId = Object.keys(CHARACTERS);
   if ( active )
   {
    active.classList.remove("asc");
    active.classList.remove("desc");
    active.classList.remove("active");
   }
   if ( MFF.currentSort.key == by )
   {
    MFF.currentSort.order = MFF.currentSort.order == "asc" ? "desc" : "asc";
   }
   else
   {
    MFF.currentSort = {"key":by, "order":"asc"};
   }
   localStorage.setItem(MFF.localStorageKeys.sorter, JSON.stringify(MFF.currentSort));
   btn.classList.add("active");
   btn.classList.add(MFF.currentSort.order);

   sorted = charsId.sort(function(a, b)
                         {
                          var A, B, tmp, dataA, dataB, nameA, nameB;
                          if ( MFF.currentSort.order != "asc" )
                          {
                           tmp = a;
                           a = b;
                           b = tmp;
                          }
                          dataA = MFF.loadCharacter(a);
                          dataB = MFF.loadCharacter(b);
                          nameA = CHARACTERS[a].uniforms[dataA.uniform].name;
                          nameB = CHARACTERS[b].uniforms[dataB.uniform].name;
                          switch ( MFF.currentSort.key )
                          {
                           case "sortByPercent":
                            A = MFF.computePercent(a);
                            B = MFF.computePercent(b);
                            if ( A != B ) { return B - A; }
                           break;
                           case "sortByLevel":
                            A = dataA.level;
                            B = dataB.level;
                            if ( A != B ) { return B - A; }
                           break;
                           case "sortByAttack":
                            A = CHARACTERS[a].uniforms[dataA.uniform].attackBase == "physical" ? dataA.attack.physical : dataA.attack.energy;
                            B = CHARACTERS[b].uniforms[dataB.uniform].attackBase == "physical" ? dataB.attack.physical : dataB.attack.energy;
                            if ( A != B ) { return B - A; }
                           break;
                          }
                          return nameA.localeCompare(nameB);
                         });

   for ( i = 0; i < sorted.length; i++ )
   {
    MFF.layout.list.firstChild.appendChild(document.getElementById(sorted[i]));
   }
  };
 },
 "cbImportExport":function()
 {
  MODAL.show({
              "title":"Import / Export",
              "body":"<textarea id=\"textareaImportExport\">",
              "buttons":[
                         {"label":"Import", "className":"btnImport", "fa":"download", "callback":MFF.cbImport},
                         {"label":"Export", "className":"btnExport", "fa":"upload", "callback":MFF.cbExport}
                        ]
             });
  MFF.cbExport();
 },
 "cbImport":function()
 {
  var parsed,
      textarea = document.getElementById("textareaImportExport");
  try { parsed = JSON.parse(textarea.value); }
  catch(ex) { alert("The json is not well formed"); }
  if ( parsed )
  {
   localStorage.setItem(MFF.localStorageKeys.main, JSON.stringify(parsed));
   MODAL.hide();
   MFF.init();
   MFF.googleAnalytics("import");
  }
 },
 "cbExport":function()
 {
  var textarea = document.getElementById("textareaImportExport");
  textarea.value = JSON.stringify(MFF.characters, null, 2);
  MFF.googleAnalytics("export");
 },
 "setTierLI":function(character)
 {
  var li = document.getElementById(character),
      data = MFF.loadCharacter(character);
  li.classList.remove("tier1");
  li.classList.remove("tier2");
  li.classList.add("tier" + data.tier);
 },
 "getClassNameColor":function(cName, type)
 {
  var r = {
           "undef":{"background":"F0F0F0", "color":"333333"},
           "min":{"background":"FF0000", "color":"FFFFFF"},
           "inf":{"background":"FFCCCC", "color":"333333"},
           "moy":{"background":"99CCFF", "color":"333333"},
           "sup":{"background":"CCFFCC", "color":"333333"},
           "max":{"background":"00FF00", "color":"333333"}
          };
  return "#" + r[cName][type];
 },
 "createClassNames":function()
 {
  var undef_bg = MFF.getClassNameColor("undef", "background"),
      undef_color = MFF.getClassNameColor("undef", "color"),
      min_bg = MFF.getClassNameColor("min", "background"),
      min_color = MFF.getClassNameColor("min", "color"),
      inf_bg = MFF.getClassNameColor("inf", "background"),
      inf_color = MFF.getClassNameColor("inf", "color"),
      moy_bg = MFF.getClassNameColor("moy", "background"),
      moy_color = MFF.getClassNameColor("moy", "color"),
      sup_bg = MFF.getClassNameColor("sup", "background"),
      sup_color = MFF.getClassNameColor("sup", "color"),
      max_bg = MFF.getClassNameColor("max", "background"),
      max_color = MFF.getClassNameColor("max", "color"),
      css = [
             "ul#allCharacters>li.undef { background-color:{0}; color:{1} }".format(undef_bg, undef_color),
             "ul#allCharacters>li.min>div.progressBar { background-color:{0}; color:{1} }".format(min_bg, min_color),
             "ul#allCharacters>li.inf>div.progressBar { background-color:{0}; color:{1} }".format(inf_bg, inf_color),
             "ul#allCharacters>li.moy>div.progressBar { background-color:{0}; color:{1} }".format(moy_bg, moy_color),
             "ul#allCharacters>li.sup>div.progressBar { background-color:{0}; color:{1} }".format(sup_bg, sup_color),
             "ul#allCharacters>li.max>div.progressBar { background-color:{0}; color:{1} }".format(max_bg, max_color),
             ".lineDetailGear span.undef { background-color:{0} }".format(undef_bg),
             ".lineDetailGear span.min { background-color:{0} }".format(min_bg),
             ".lineDetailGear span.inf { background-color:{0} }".format(inf_bg),
             ".lineDetailGear span.moy { background-color:{0} }".format(moy_bg),
             ".lineDetailGear span.sup { background-color:{0} }".format(sup_bg),
             ".lineDetailGear span.max { background-color:{0} }".format(max_bg),
             "#area_detail td.content tr.undef td { background-color:{0}; color:{1} }".format(undef_bg, undef_color),
             "#area_detail td.content tr.min td { background-color:{0}; color:{1} }".format(min_bg, min_color),
             "#area_detail td.content tr.inf td { background-color:{0}; color:{1} }".format(inf_bg, inf_color),
             "#area_detail td.content tr.moy td { background-color:{0}; color:{1} }".format(moy_bg, moy_color),
             "#area_detail td.content tr.sup td { background-color:{0}; color:{1} }".format(sup_bg, sup_color),
             "#area_detail td.content tr.max td { background-color:{0}; color:{1} }".format(max_bg, max_color)
            ];

  API.DOM.addStyleElement(css.join("\n"));
 },
 "renderList":function()
 {
  document.body.className = "render_list";
  MFF.globalChart = null;
  MFF.googleAnalytics("showList");
 },
 "createLayout":function()
 {
  API.DOM.flush(document.body);
  MFF.layout.action = document.body.appendChild(document.createElement("div"));
  MFF.layout.action.id = "area_action";
  MFF.layout.detail = document.body.appendChild(document.createElement("div"));
  MFF.layout.detail.id = "area_detail";
  MFF.layout.list = document.body.appendChild(document.createElement("div"));
  MFF.layout.list.id = "area_list";
  MFF.layout.charts = document.body.appendChild(document.createElement("div"));
  MFF.layout.charts.id = "area_charts";
  MFF.layout.detail_charts = document.body.appendChild(document.createElement("div"));
  MFF.layout.detail_charts.id = "area_detail_charts";
  FOOTER.init();
  MFF.drawCharacter(null);
  MFF.createActions();
  MFF.setRandomBackground();
  MFF.renderList();
 },
 "drawContentLI":function(character)
 {
  var img, p, span, percent, lineGear, i, progressBar,
      li = document.getElementById(character),
      data = MFF.loadCharacter(character);
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
  p.appendChild(document.createTextNode(CHARACTERS[character].uniforms[data.uniform].name));
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
   lineGear.id = "{0}_lineDetailGear_{1}".format(character, i+1);
   lineGear.className = "lineDetailGear lineDetailGear{0}".format(i+1);
  }
  MFF.setColorLineDetail(character);
  MFF.setColorLI(character, percent);
 },
 "setRandomBackground":function()
 {
  document.body.style.backgroundImage = "url(images/background/{0}.jpg)".format(1 + parseInt(Math.random() * MFF.nbBackground, 10));
 },
 "init":function()
 {
  var ul, li, data, character;
  if ( !window.localStorage ) { alert("localStorage must be enabled in your browser"); return; }
  Highcharts.setOptions({"plotOptions":{"series":{"animation":false}}});
  MFF.createClassNames();
  MFF.createLayout();
  data = localStorage.getItem(MFF.localStorageKeys.main);
  if ( data && data != null && (typeof data == "string") ) { MFF.characters = JSON.parse(data); }
  ul = MFF.layout.list.appendChild(document.createElement("ul"));
  ul.id = "allCharacters";
  for ( character in CHARACTERS )
  {
   if ( CHARACTERS.hasOwnProperty(character) )
   {
    li = ul.appendChild(document.createElement("li"));
    li.id = character;
    MFF.drawContentLI(character);
   }
  }
  ul.onclick = function(evt)
  {
   var target = API.EVT.getParentTarget(evt, "li");
   if ( target )
   {
    MFF.drawCharacter(target.id, true);
   }
  };
  ul.onmousemove = function(evt)
  {
   var target;
   if ( !MFF.currentCharacter && (target=API.EVT.getParentTarget(evt, "li")) )
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
  FOOTER.draw();
  data = localStorage.getItem(MFF.localStorageKeys.sorter);
  if ( data && data != null && (typeof data == "string") )
  {
   data = JSON.parse(data);
   if ( data.order == "desc" ) { MFF.currentSort = {"key":data.key, "order":"asc"}; }
   MFF.cbSort(data.key)();
  }
  else
  {
   MFF.cbSort("sortByName")();
  }
 },
 "setColorLineDetail":function(character)
 {
  var lineGear, i, j, cName, span,
      data = MFF.loadCharacter(character);
  if ( (span=document.getElementById("{0}_level".format(character))) ) { span.innerHTML = "#" + data.level; }
  if ( (span=document.getElementById("{0}_tier".format(character))) ) { span.innerHTML = "/T" + data.tier; }
  for ( i = 0; i < 4; i++ )
  {
   lineGear = document.getElementById("{0}_lineDetailGear_{1}".format(character, i+1));
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
 "setColorLI":function(elt, percent)
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
 "setClassTypeLI":function(character)
 {
  var li = document.getElementById(character),
      data = MFF.loadCharacter(character);
  li.classList.remove("combat");
  li.classList.remove("speed");
  li.classList.remove("blast");
  li.classList.remove("universal");
  li.classList.add(CHARACTERS[character].uniforms[data.uniform].type);
 },
 "loadCharacter":function(character)
 {
  var data, physical, energy;
  if ( character in MFF.characters )
  {
   data = MFF.characters[character];
   data.id = character;
   if ( !("defense" in data) ) { data.defense = {"physical":0, "energy":0}; } // compatibility 1.6 to 1.7
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
   if ( !("physical" in data.attack) ) // compatibility 1.8 to 1.9
   {
    physical = 0;
    energy = 0;
    if ( ("total" in data.attack) && data.attack.total )
    {
     physical = CHARACTERS[character].uniforms[data.uniform].attackBase == "physical" ? data.attack.total : 0;
     energy = CHARACTERS[character].uniforms[data.uniform].attackBase == "energy" ? data.attack.total : 0;
    }
    data.attack = {"physical":physical, "energy":energy};
   }

   return data;
  }
  return {
          "id":character,
          "uniform":CHARACTERS[character].uniform,
          "level":0,
          "tier":CHARACTERS[character].tiers[0],
          "attack":{"physical":0, "energy":0}, // 1.9 transformation
          "defense":{"physical":0, "energy":0}, // 1.7 addition
          "hp":0, // 1.7 addition
          "dodge":0, // 1.7 addition
          "ignore_dodge":0, // 1.7 addition
          "defpen":0, // 1.7 addition
          "scd":0, // 1.7 addition
          "critrate":0, // 1.7 addition
          "critdamage":0, // 1.7 addition
          "atkspeed":0, // 1.8 addition
          "recorate":0, // 1.8 addition
          "movspeed":0, // 1.8 addition
          "debuff":0, // 1.8 addition
          "skills":[0, 0, 0, 0, 0],
          "gear":
          [
           [
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0}
           ],
           [
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0}
           ],
           [
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0}
           ],
           [
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0},
            {"type":"", "val":0, "pref":false, "percent":0}
           ]
          ]
         };
 },
 "getIndividualPercent":function(cur, min, max)
 {
  return cur > 0 ? API.numberToFixed(((cur-min) / (max-min)) * 100, 2) : 0;
 },
 "computePercent":function(character)
 {
  var i, j,
      total = 0,
      maxi = 0,
      data = MFF.loadCharacter(character);
  for ( i = 0; i < data.gear.length; i++ )
  {
   for ( j = 0; j < data.gear[i].length; j++ )
   {
    maxi += 100;
    if ( data.gear[i][j].pref ) { total += data.gear[i][j].percent; }
   }
  }
  return total * 100 / maxi;
 },
 "toid2":null,
 "saveCharacter":function(options)
 {
  if ( !(MFF.currentCharacter in MFF.characters) ) { MFF.characters[MFF.currentCharacter] = MFF.loadCharacter(MFF.currentCharacter); }
  switch ( options.mode )
  {
   case "gear":
    MFF.characters[MFF.currentCharacter].gear[options.gear][options.gearIndex] = {"type":options.type, "val":options.val, "pref":options.pref, "percent":options.percent};
    if ( MFF.toid2 ) { MFF.toid2 = clearTimeout(MFF.toid2); }
   break;
   case "level":
    MFF.characters[MFF.currentCharacter].level = parseInt(options.level) || 0;
   break;
   case "tier":
    MFF.characters[MFF.currentCharacter].tier = parseInt(options.tier) || 1;
    FOOTER.draw();
   break;
   case "attack":
    MFF.characters[MFF.currentCharacter].attack.physical = options.physical;
    MFF.characters[MFF.currentCharacter].attack.energy = options.energy;
   break;
   case "defense":
    MFF.characters[MFF.currentCharacter].defense.physical = options.physical;
    MFF.characters[MFF.currentCharacter].defense.energy = options.energy;
   break;
   case "skill":
    MFF.characters[MFF.currentCharacter].skills[parseInt(options.skill)] = parseInt(options.lvl);
   break;
   case "uniform":
    MFF.characters[MFF.currentCharacter].uniform = options.uniform;
   break;
   case "attribute":
    MFF.characters[MFF.currentCharacter][options.type] = options.value;
   break;
  }
  localStorage.setItem(MFF.localStorageKeys.main, JSON.stringify(MFF.characters));
  if ( options.mode == "gear" || options.mode == "skill" )
  {
   MFF.toid2 = setTimeout(function()
                          {
                           var div = document.getElementById("current_percent");
                           if ( div && MFF.currentCharacter )
                           {
                            div.innerHTML = API.numberToFixed(MFF.computePercent(MFF.currentCharacter), 2) + "%";
                            FOOTER.draw();
                            if ( document.body.className == "render_detail_charts" )
                            {
                             MFF.renderDetailCharts();
                            }
                           }
                          }, 500);
  }
  else if ( options.mode == "uniform" )
  {
   MFF.drawCharacter(MFF.currentCharacter, true, true);
   MFF.drawContentLI(MFF.currentCharacter);
  }
 },
 "drawCharacter":function(character, persistant, keep)
 {
  var h1, img, table, tbody, tr, td, td2, k, i, j, div, input, percent, curStat, select, option, data, idx, span,
      chooseMessage = "<div class=\"choose_character\"><span class=\"bgOpaque\">Select a character</span></div><div class=\"copyright bgOpaque\">The Marvel Logo, images and all characters that appear on this website and the distinctive likeness(es) thereof are Trademarks of Marvel Entertainment, LLC and Netmarble Games. This site is not affiliated with Marvel Entertainment or Netmarble Games.</div>";
  function getMin(select) { return parseFloat(select.options[select.selectedIndex].dataset.rangeMin); }
  function getMax(select) { return parseFloat(select.options[select.selectedIndex].dataset.rangeMax); }
  function checkValues(tr, save)
  {
   var div, gear, type, pref,
       select = tr.childNodes[1].firstChild,
       cur = tr.childNodes[2].firstChild.value,
       min = getMin(select),
       max = getMax(select),
       cName = "invalide",
       moy = (min + max) / 2,
       curPercent = tr.childNodes[8];
   if ( cur == 0 ) { cName = "undef"; }
   else if ( cur == moy ) { cName = "moy"; }
   else if ( cur == min ) { cName = "min"; }
   else if ( cur == max ) { cName = "max"; }
   else if ( cur < moy && cur > min ) { cName = "inf"; }
   else if ( cur > moy && cur < max ) { cName = "sup"; }
   curPercent.innerHTML = "({0}%)".format(parseInt(MFF.getIndividualPercent(cur, min, max)));
   tr.className = cName;
   if ( save )
   {
    div = API.DOM.parent(tr, "div", "gear");
    gear = div.dataset.gearIndex;
    type = select.options[select.selectedIndex].value;
    pref = tr.childNodes[0].firstChild.checked;
    MFF.saveCharacter({"mode":"gear", "gear":gear, "gearIndex":tr.dataset.gearIndex, "type":type, "val":parseFloat(cur), "pref":pref, "percent":MFF.getIndividualPercent(cur, min, max)});
   }
  }
  function changeMinMax(evt)
  {
   var min, moy, max,
       tr = this.parentNode.parentNode,
       cur = tr.childNodes[2].firstChild,
       minSpan = tr.childNodes[3],
       moySpan = tr.childNodes[5],
       maxSpan = tr.childNodes[7];
   min = getMin(this);
   max = getMax(this);
   moy = API.numberToFixed((min+max)/2, 2);
   minSpan.innerHTML = min;
   moySpan.innerHTML = moy;
   maxSpan.innerHTML = max;
   if ( evt !== null ) { cur.value = 0; }
   checkValues(tr, false);
  }

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
    if ( node )
    {
     MFF.drawCharacter(node.id, true);
    }
   };
  }
  API.DOM.flush(MFF.layout.detail);
  if ( !character || !(character in CHARACTERS) )
  {
   MFF.layout.detail.innerHTML = chooseMessage;
   return ;
  }
  if ( MFF.toid2 ) { MFF.toid2 = clearTimeout(MFF.toid2); }
  if ( MFF.toid ) { MFF.toid = clearTimeout(MFF.toid); }
  if ( MFF.currentCharacter ) { document.getElementById(MFF.currentCharacter).classList.remove("active"); }
  if ( persistant )
  {
   if ( MFF.currentCharacter )
   {
    k = document.getElementById(MFF.currentCharacter + "_percent");
    percent = MFF.computePercent(MFF.currentCharacter);
    k.innerHTML = API.numberToFixed(percent, 2) + "%";
    MFF.setColorLineDetail(MFF.currentCharacter);
    MFF.setColorLI(k, percent);
    MFF.setClassTypeLI(MFF.currentCharacter);
    MFF.setTierLI(MFF.currentCharacter);
    if ( MFF.currentCharacter == character && !keep )
    {
     MFF.currentCharacter = null;
     MFF.layout.detail.innerHTML = chooseMessage;
     return ;
    }
   }
   MFF.currentCharacter = character;
   if ( MFF.currentCharacter ) { document.getElementById(MFF.currentCharacter).classList.add("active"); }
  }
  data = MFF.loadCharacter(character);
  MFF.layout.detail.className = data.tier == 2 ? "tier2" : "tier1";
  table = MFF.layout.detail.appendChild(document.createElement("table"));
  tbody = table.appendChild(document.createElement("tbody"));
  tr = tbody.appendChild(document.createElement("tr"));
  td = tr.appendChild(document.createElement("td"));
  td.className = "picture";

  div = td.appendChild(document.createElement("div"));
  div.id = "typeSideGender";
  div.className = "bgOpaque";

  img = div.appendChild(document.createElement("img"));
  img.src = "images/{0}.png".format(CHARACTERS[character].uniforms[data.uniform].type);

  img = div.appendChild(document.createElement("img"));
  img.src = "images/{0}.png".format(CHARACTERS[character].uniforms[data.uniform].gender);

  img = div.appendChild(document.createElement("img"));
  img.src = "images/{0}.png".format(CHARACTERS[character].uniforms[data.uniform].side);

  h1 = td.appendChild(document.createElement("h1"));
  h1.className = "bgOpaque";
  h1.appendChild(document.createTextNode(CHARACTERS[character].uniforms[data.uniform].name));

  h1 = td.appendChild(document.createElement("h2"));
  h1.className = "bgOpaque";
  span = h1.appendChild(document.createElement("label"));
  span.htmlFor = "character_level";
  span.appendChild(document.createTextNode("level : "));
  input = h1.appendChild(document.createElement("input"));
  input.type = "text";
  input.id = "character_level";
  input.onchange = function()
                   {
                    MFF.saveCharacter({"mode":"level", "level":this.value});
                   };
  input.value = data.level;
  select = h1.appendChild(document.createElement("select"));
  select.id = "character_tier";
  select.onchange = function()
  {
   var tier = this.options[this.selectedIndex].value;
   MFF.layout.detail.className = tier == 2 ? "tier2" : "tier1";
   MFF.saveCharacter({"mode":"tier", "tier":tier});
  };
  option = select.appendChild(document.createElement("option"));
  option.value = "1";
  option.text = "Tier 1";
  option = select.appendChild(document.createElement("option"));
  option.value = "2";
  option.text = "Tier 2";
  select.selectedIndex = data.tier - 1;
  if ( CHARACTERS[character].tiers[0] != 1 ) { select.removeChild(select.firstChild); }
  if ( CHARACTERS[character].tiers.indexOf(2) === -1 ) { select.removeChild(select.lastChild); }


  img = td.appendChild(document.createElement("img"));
  img.className = "characterPicture";
  img.src = "images/characters/{0}/{1}.png".format(data.uniform, character);
  img.width = img.height = 194;
  span = td.appendChild(document.createElement("img"));
  span.className = "tier2";
  span.src = "images/tier2.png";
  span.width = span.height = 194;
  if ( persistant )
  {
   span = td.appendChild(document.createElement("i"));
   span.className = "fa fa-line-chart";
   span.title = "Toggle development charts";
   span.onclick = function()
                  {
                   if ( document.body.className == "render_detail_charts" )
                   {
                    MFF.renderList();
                    return ;
                   }
                   document.body.className = "render_detail_charts";
                   MFF.renderDetailCharts();
                  };
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

  select = td.appendChild(document.createElement("select"));
  select.id = "uniform";
  select.title = "Uniform";
  i = 0;
  for ( k in CHARACTERS[character].uniforms )
  {
   if ( CHARACTERS[character].uniforms.hasOwnProperty(k) )
   {
    option = select.appendChild(document.createElement("option"));
    option.value = k;
    option.text = UNIFORMS[k];
    if ( data.uniform == k ) { select.selectedIndex = i;}
    i++;
   }
  }
  select.onchange = function()
                    {
                     MFF.saveCharacter({"mode":"uniform", "uniform":this.options[this.selectedIndex].value});
                    };

  td = tr.appendChild(document.createElement("td"));
  td.className = "content";
  DETAIL.draw(td, character, persistant);
  for ( i = 0; i < GEARS.length; i++ )
  {
   div = td.appendChild(document.createElement("div"));
   div.className = "gear";
   div.dataset.gearIndex = i;
   table = div.appendChild(document.createElement("table"));
   tbody = table.appendChild(document.createElement("tbody"));
   for ( j = 0; j < 8; j++ )
   {
    tr = tbody.appendChild(document.createElement("tr"));
    tr.dataset.gearIndex = j;
    td2 = tr.appendChild(document.createElement("td"));
    input = td2.appendChild(document.createElement("input"));
    input.type = "checkbox";
    input.title = "Set as favorite statistic once checked";
    input.setAttribute("tabindex", -1);
    input.onchange = function() { checkValues(API.DOM.parent(this, "tr"), true); };
    input.checked = data.gear[i][j].pref;
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.width = "100%";
    select = td2.appendChild(document.createElement("select"));
    select.style.width = "100%";
    select.setAttribute("tabindex", -1);
    select.onchange = changeMinMax;
    select.title = "Statistic";
    option = select.appendChild(document.createElement("option"));
    option.value = "";
    option.text = "";
    option.dataset.rangeMin = 0;
    option.dataset.rangeMax = 0;
    option.dataset.statType = "";
    select.selectedIndex = 0;
    idx = 1;
    for ( k in GEARS[i] )
    {
     if ( GEARS[i].hasOwnProperty(k) )
     {
      option = select.appendChild(document.createElement("option"));
      option.value = k;
      if ( k == data.gear[i][j].type ) { select.selectedIndex = idx; }
      idx++;
      option.text = GEARS[i][k].name;
      option.dataset.rangeMin = GEARS[i][k].range[j].min;
      option.dataset.rangeMax = GEARS[i][k].range[j].max;
      option.dataset.statType = GEARS[i][k].type;
     }
    }
    td2 = tr.appendChild(document.createElement("td"));
    curStat = td2.appendChild(document.createElement("input"));
    curStat.title = "Current value";
    curStat.type = "text";
    curStat.style.width = "40px";
    curStat.value = data.gear[i][j].val;
    curStat.onkeyup = function()
    {
     var that = this;
     if ( MFF.toid ) { MFF.toid = clearTimeout(MFF.toid); }
     setTimeout(function()
                {
                 checkValues(API.DOM.parent(that, "tr"), true);
                }, 500);
    };
    curStat.onchange = function()
    {
     if ( MFF.toid ) { MFF.toid = clearTimeout(MFF.toid); }
     checkValues(API.DOM.parent(this, "tr"), true);
    };
    // min
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.title = "Minimum value";
    // >
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.innerHTML = "&gt;";
    // moy
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.title = "Average value";
    // >
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.innerHTML = "&gt;";
    // max
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.title = "Maximum value";
    // (XX%)
    td2 = tr.appendChild(document.createElement("td"));
    td2.style.textAlign = "center";
    td2.title = "Progression from current value to maximum value";

    changeMinMax.call(select, null);
   }
  }
  if ( persistant ) { MFF.googleAnalytics("drawCharacter_" + MFF.currentCharacter); }
  if ( document.body.className == "render_detail_charts" ) { MFF.renderDetailCharts(); }
 },
 "renderDetailCharts":function()
 {
  var i, j, k, val, nb, div, id, color,
      data = MFF.loadCharacter(MFF.currentCharacter),
      categories = [],
      serie = [];
  API.DOM.flush(MFF.layout.detail_charts);
  for ( i = 0; i < GEARS.length; i++ )
  {
   id = "detail_charts_gear{0}".format(i+1);
   div = MFF.layout.detail_charts.appendChild(document.createElement("div"));
   div.id = id;
   categories[i] = [];
   serie[i] = [];
   for ( k in GEARS[i] )
   {
    if ( GEARS[i].hasOwnProperty(k) )
    {
     val = 0; nb = 0;
     categories[i].push(GEARS[i][k].name);
     for ( j = 0; j < GEARS[i][k].range.length; j++ )
     {
      if ( data.gear[i][j].type == k && data.gear[i][j].pref )
      {
       nb++;
       val += data.gear[i][j].percent;
      }
     }
     val = val/nb;
     if ( isNaN(val) ) { val = 0; }
     else { val = parseInt(val); }
     if ( val == 100 ) { color = MFF.getClassNameColor("max", "background"); }
     else if ( val > 50 ) { color = MFF.getClassNameColor("sup", "background"); }
     else if ( val == 50 ) { color = MFF.getClassNameColor("moy", "background"); }
     else { color = MFF.getClassNameColor("inf", "background"); }
     serie[i].push({"y":val, "color":color});
    }
   }
   new Highcharts.Chart({
                         "chart":{"polar":true, "renderTo":id, "type":"bar", "backgroundColor":"#FFFFFF"},
                         "title":{"text":"Gear {0}".format(i+1)},
                         "xAxis":{"categories":categories[i], "lineWidth":0},
                         "yAxis":{"gridLineInterpolation":"circle", "lineWidth":0, "min":0, "max":100, "labels":{"enabled":false}, tickInterval:25},
                         "credits":{"enabled":false},
                         "tooltip":{"pointFormat":"{point.y:,.2f}%"},
                         "legend":{"enabled":false},
                         "series":[{"name":"Current", "data":serie[i]}]
                        });
  }
  categories = CHARACTERS[MFF.currentCharacter].uniforms[data.uniform].skills;
  id = "detail_charts_skill";
  div = MFF.layout.detail_charts.appendChild(document.createElement("div"));
  div.id = id;
  new Highcharts.Chart({
                        "chart":{"polar":true, "renderTo":id, "type":"line", "backgroundColor":"#FFFFFF"},
                        "title":{"text":"Skills"},
                        "xAxis":{"categories":categories, "lineWidth":0},
                        "yAxis":{"gridLineInterpolation":"polygon", "lineWidth":0, "min":0, "max":100, "labels":{"enabled":false}, tickInterval:1},
                        "credits":{"enabled":false},
                        "tooltip":{"pointFormat":"level {point.y}"},
                        "legend":{"enabled":false},
                        "series":[{"name":"Skills", "data":data.skills}]
                       });
  MFF.googleAnalytics("drawCharacterChart");
 }
};


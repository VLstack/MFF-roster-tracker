/* global ga, API, Highcharts, MODAL, Button, ImageButton, GroupButton */
// localStorage.removeItem("characters");
// localStorage.removeItem("sorter");

var MFF =
{
 "googleAnalyticsUID" : "UA-92278331-1",
 "version" : "2.0",
 "versionMFF" : "2.9",
 "layout" :
 {
  "action" : null,
  "list" : null,
  "detail" : null,
  "charts" : null,
  "detail_charts" : null
 },
 "localStorageKeys" :
 {
  "main" : "characters",
  "chartRender" : "globalChartRender",
 },
 "toid" : null,
 "currentCharacter" : null,
 "googleAnalytics" : function(page)
 {
  ga("set", "page", "/" + page + ".html");
  ga("send", "pageview");
 },
 "shownClassType" : ["combat", "speed", "blast", "universal"],
 "shownClassSide" : ["hero", "vilain", "neutral"],
 "shownClassGender" : ["male", "female", "neutral"],
 "toggleClass" : function(reference)
 {
  return function(checked, type)
  {
   var idx,
       ref = { "type" : "shownClassType", "side" : "shownClassSide", "gender" : "shownClassGender" }[reference];
   document.getElementById("query").value = "";
   if ( checked )
   {
    if ( MFF[ref].indexOf(type) == -1 ) { MFF[ref].push(type); }
   }
   else
   {
    // QUESTION : isn't this better ? : MFF[ref] = MFF[ref].filter(function(item) { return item != type; });
    idx = MFF[ref].indexOf(type);
    if ( idx != -1 ) { MFF[ref].splice(idx, 1); }
   }
   MFF.filters();
  };
 },
 "filters" : function()
 {
  var i, j, showHide, data, gender, side,
      reduce = function(str) { return str.trim().toLowerCase().replace(/[^a-z]/g, ""); },
      query = reduce(document.getElementById("query").value),
      childs = document.getElementById("allCharacters").childNodes;
  for ( i = 0; i < childs.length; i++ )
  {
   data = MFF.CHARACTERS.get(childs[i].id);
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
    gender = MFF.CHARACTERS.DATA[childs[i].id].uniforms[data.uniform].gender;
    if ( MFF.shownClassGender.indexOf(gender) == -1 ) { showHide = "hide"; }
   }
   if ( showHide == "show" )
   {
    side = MFF.CHARACTERS.DATA[childs[i].id].uniforms[data.uniform].side;
    if ( MFF.shownClassSide.indexOf(side) == -1 ) { showHide = "hide"; }
   }
   if ( showHide == "show" && query && reduce(MFF.CHARACTERS.DATA[childs[i].id].uniforms[data.uniform].name).indexOf(query) == -1 )
   {
    showHide = "hide";
   }
   childs[i].style.display = showHide == "show" ? "" : "none";
  }
  if ( MFF.globalChart ) { MFF.renderChart(); }
 },
 "queryToid" : null,
 "queryOnSearch" : function()
 {
  if ( MFF.queryToid ) { MFF.queryToid = clearTimeout(MFF.queryToid); }
  MFF.queryToid = setTimeout(MFF.filters, 150);
  MFF.googleAnalytics("search");
 },
 "axisItems" :
 {
  "attack" :           { "label" : "Attack", "callback" : function(character, id) { var v = character.attack[MFF.CHARACTERS.DATA[id].uniforms[character.uniform].attackBase]; return { "value" : v, "percent" : false }; } },
  "attack_energy" :    { "label" : "Energy attack", "callback" : function(character) { var v = character.attack.physical; return { "value" : v, "percent" : false }; } },
  "attack_physical" :  { "label" : "Physical attack", "callback" : function(character) { var v = character.attack.physical; return { "value" : v, "percent" : false }; } },
  "atkspeed" :         { "label" : "Attack speed", "callback" : function(character) { var v = character.atkspeed; return { "value" : v, "percent" : true }; } },
  "critdamage" :       { "label" : "Critical damage", "callback" : function(character) { var v = character.critdamage; return { "value" : v, "percent" : true }; } },
  "critrate" :         { "label" : "Critical rate", "callback" : function(character) { var v = character.critrate; return { "value" : v, "percent" : true }; } },
  "debuff" :           { "label" : "Debuff duration", "callback" : function(character) { var v = character.debuff; return { "value" : v, "percent" : true }; } },
  "completion" :       { "label" : "Development completion", "callback" : function(character, id) { var v = MFF.computePercent(id); return { "value" : v, "percent" : true }; } },
  "defense_average" :  { "label" : "Defense average", "callback" : function(character) { var v = (character.defense.physical + character.defense.energy) / 2; return { "value" : v, "percent" : false }; } },
  "defense_energy" :   { "label" : "Defense energy", "callback" : function(character) { var v = character.defense.energy; return { "value" : v, "percent" : false }; } },
  "defense_physical" : { "label" : "Defense physical", "callback" : function(character) { var v = character.defense.physical; return { "value" : v, "percent" : false }; } },
  "dodge" :            { "label" : "Dodge", "callback" : function(character) { var v = character.dodge; return { "value" : v, "percent" : true }; } },
  "hp" :               { "label" : "Hit points", "callback" : function(character) { var v = character.hp; return { "value" : v, "percent" : false }; } },
  "defpen" :           { "label" : "Ignore defense", "callback" : function(character) { var v = character.defpen; return { "value" : v, "percent" : true }; } },
  "ignore_dodge" :     { "label" : "Ignore dodge", "callback" : function(character) { var v = character.ignore_dodge; return { "value" : v, "percent" : true }; } },
  "level" :            { "label" : "Level", "callback" : function(character) { var v = character.level; return { "value" : v, "percent" : false }; } },
  "movspeed" :         { "label" : "Movement speed", "callback" : function(character) { var v = character.movspeed; return { "value" : v, "percent" : true }; } },
  "recorate" :         { "label" : "Recovery rate", "callback" : function(character) { var v = character.recorate; return { "value" : v, "percent" : true }; } },
  "scd" :              { "label" : "Skill cooldown", "callback" : function(character) { var v = character.scd; return { "value" : v, "percent" : true }; } }
 },
 //"currentSort" : { "key" : "", "order" : "" },
 /*
 "cbSort" : function(by)
 {
  return function()
  {
   var i, sorted,
       groupButton = MFF.layout.action.querySelector(".groupButton.sorter"),
       active = groupButton.querySelector(".active"),
       btn = groupButton.querySelector("." + by),
       charsId = Object.keys(MFF.CHARACTERS.DATA);
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
    MFF.currentSort = { "key" : by, "order" : "asc" };
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
                          dataA = MFF.CHARACTERS.get(a);
                          dataB = MFF.CHARACTERS.get(b);
                          nameA = MFF.CHARACTERS.DATA[a].uniforms[dataA.uniform].name;
                          nameB = MFF.CHARACTERS.DATA[b].uniforms[dataB.uniform].name;
                          switch ( MFF.currentSort.key )
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

   for ( i = 0; i < sorted.length; i++ )
   {
    // MFF.layout.list.firstChild.appendChild(document.getElementById(sorted[i]));
    // MFF.layout.list.appendChild(document.getElementById(sorted[i]));
   }
  };
 },
 */
 "cbImportExport" : function()
 {
  MODAL.show({
              "title" : "Import / Export",
              "body" : "<textarea id=\"textareaImportExport\">",
              "buttons" : [
                           { "label" : "Import", "className" : "btnImport", "fa" : "download", "callback" : MFF.cbImport },
                           { "label" : "Export", "className" : "btnExport", "fa" : "upload", "callback" : MFF.cbExport }
                          ]
             });
  MFF.cbExport();
 },
 "cbImport" : function()
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
 "cbExport" : function()
 {
  var textarea = document.getElementById("textareaImportExport");
  textarea.value = JSON.stringify(MFF.CHARACTERS.getAll(), null, 2);
  MFF.googleAnalytics("export");
 },
 "setTierLI" : function(character)
 {
  MFF.LAYOUT.LIST.setTier(character);
 },
 "getClassNameColor" : function(cName, type)
 {
  var r = {
           "undef" : { "background" : "F0F0F0", "color" : "333333" },
           "min" : { "background" : "FF0000", "color" : "FFFFFF" },
           "inf" : { "background" : "FFCCCC", "color" : "333333" },
           "moy" : { "background" : "99CCFF", "color" : "333333" },
           "sup" : { "background" : "CCFFCC", "color" : "333333" },
           "max" : { "background" : "00FF00", "color" : "333333" }
          };
  return "#" + r[cName][type];
 },
 "createClassNames" : function()
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
/*
             "ul#panelListContent>li.undef { background-color:{0}; color:{1} }".format(undef_bg, undef_color),
             "ul#panelListContent>li.min>div.progressBar { background-color:{0}; color:{1} }".format(min_bg, min_color),
             "ul#panelListContent>li.inf>div.progressBar { background-color:{0}; color:{1} }".format(inf_bg, inf_color),
             "ul#panelListContent>li.moy>div.progressBar { background-color:{0}; color:{1} }".format(moy_bg, moy_color),
             "ul#panelListContent>li.sup>div.progressBar { background-color:{0}; color:{1} }".format(sup_bg, sup_color),
             "ul#panelListContent>li.max>div.progressBar { background-color:{0}; color:{1} }".format(max_bg, max_color),
/*
             ".lineDetailGear span.undef { background-color:{0} }".format(undef_bg),
             ".lineDetailGear span.min { background-color:{0} }".format(min_bg),
             ".lineDetailGear span.inf { background-color:{0} }".format(inf_bg),
             ".lineDetailGear span.moy { background-color:{0} }".format(moy_bg),
             ".lineDetailGear span.sup { background-color:{0} }".format(sup_bg),
             ".lineDetailGear span.max { background-color:{0} }".format(max_bg),
*/
             "#area_detail td.content tr.undef td { background-color:{0}; color:{1} }".format(undef_bg, undef_color),
             "#area_detail td.content tr.min td { background-color:{0}; color:{1} }".format(min_bg, min_color),
             "#area_detail td.content tr.inf td { background-color:{0}; color:{1} }".format(inf_bg, inf_color),
             "#area_detail td.content tr.moy td { background-color:{0}; color:{1} }".format(moy_bg, moy_color),
             "#area_detail td.content tr.sup td { background-color:{0}; color:{1} }".format(sup_bg, sup_color),
             "#area_detail td.content tr.max td { background-color:{0}; color:{1} }".format(max_bg, max_color)
            ];

  API.DOM.addStyleElement(css.join("\n"));
 },
 "renderList" : function()
 {
  document.body.className = "render_list";
  MFF.globalChart = null;
  MFF.googleAnalytics("showList");
 },
 "createLayout" : function()
 {
  MFF.LAYOUT.init();
  MFF.drawCharacter(null);
  // MFF.setRandomBackground();
  // TODO : déplacer
  MFF.renderList();
 },
 "drawContentLI" : function(character)
 {
  MFF.LAYOUT.LIST.drawCharacter(character);
 },
 "init" : function()
 {
  var data;
  if ( !window.localStorage ) { alert("localStorage must be enabled in your browser"); return; }
  data = localStorage.getItem(MFF.localStorageKeys.main);
  if ( data && data != null && (typeof data == "string") ) { MFF.CHARACTERS.setAll(JSON.parse(data)); }
  Highcharts.setOptions({ "plotOptions" : { "series" : { "animation" : false } } });
  MFF.createClassNames();
  MFF.createLayout();
 },
 "setColorLineDetail" : function(character)
 {
  MFF.LAYOUT.LIST.synchroDetailGear(character);
 },
 "setColorLI" : function(elt, percent)
 {
  MFF.LAYOUT.LIST.synchroDevelomment(elt, percent);
 },
 "setClassTypeLI" : function(character)
 {
  MFF.LAYOUT.LIST.setClassType(character);
 },
 "getIndividualPercent" : function(cur, min, max)
 {
  return cur > 0 ? API.numberToFixed(((cur - min) / (max - min)) * 100, 2) : 0;
 },
 "computePercent" : function(character)
 {
  var i, j,
      total = 0,
      maxi = 0,
      data = MFF.CHARACTERS.get(character);
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
 "toid2" : null,
 "saveCharacter" : function(data)
 {
  MFF.CHARACTERS.setProperty(MFF.currentCharacter, data);
  localStorage.setItem(MFF.localStorageKeys.main, JSON.stringify(MFF.CHARACTERS.getAll()));
  if ( data.mode == "tier" ) { MFF.LAYOUT.FOOTER.draw(); }
  else if ( data.mode == "gear" || data.mode == "skill" )
  {
   MFF.toid2 = clearTimeout(MFF.toid2);
   MFF.toid2 = setTimeout(function()
                          {
                           var div = document.getElementById("current_percent");
                           if ( div && MFF.currentCharacter )
                           {
                            div.innerHTML = API.numberToFixed(MFF.computePercent(MFF.currentCharacter), 2) + "%";
                            MFF.LAYOUT.FOOTER.draw();
                            if ( document.body.className == "render_detail_charts" )
                            {
                             MFF.renderDetailCharts();
                            }
                           }
                          }, 250);
  }
  else if ( data.mode == "uniform" )
  {
   MFF.drawCharacter(MFF.currentCharacter, true, true);
   MFF.drawContentLI(MFF.currentCharacter);
  }
 },
 "drawCharacter" : function(character, persistant, keep)
 {
  MFF.LAYOUT.DETAIL.drawCharacter (character, persistant, keep);
 },
 "renderDetailCharts" : function()
 {
  var i, j, k, val, nb, div, id, color,
      data = MFF.CHARACTERS.get(MFF.currentCharacter),
      categories = [],
      serie = [];
  API.DOM.flush(MFF.layout.detail_charts);
  for ( i = 0; i < MFF.GEARS.length; i++ )
  {
   id = "detail_charts_gear{0}".format(i + 1);
   div = MFF.layout.detail_charts.appendChild(document.createElement("div"));
   div.id = id;
   categories[i] = [];
   serie[i] = [];
   for ( k in MFF.GEARS[i] )
   {
    if ( MFF.GEARS[i].hasOwnProperty(k) )
    {
     val = 0; nb = 0;
     categories[i].push(MFF.GEARS[i][k].name);
     for ( j = 0; j < MFF.GEARS[i][k].range.length; j++ )
     {
      if ( data.gear[i][j].type == k && data.gear[i][j].pref )
      {
       nb++;
       val += data.gear[i][j].percent;
      }
     }
     val = val / nb;
     if ( isNaN(val) ) { val = 0; }
     else { val = parseInt(val); }
     if ( val == 100 ) { color = MFF.getClassNameColor("max", "background"); }
     else if ( val > 50 ) { color = MFF.getClassNameColor("sup", "background"); }
     else if ( val == 50 ) { color = MFF.getClassNameColor("moy", "background"); }
     else { color = MFF.getClassNameColor("inf", "background"); }
     serie[i].push({ "y" : val, "color" : color });
    }
   }
   new Highcharts.Chart({
                         "chart" : { "polar" : true, "renderTo" : id, "type" : "bar", "backgroundColor" : "#FFFFFF" },
                         "title" : { "text" : "Gear {0}".format(i + 1) },
                         "xAxis" : { "categories" : categories[i], "lineWidth" : 0 },
                         "yAxis" : { "gridLineInterpolation" : "circle", "lineWidth" : 0, "min" : 0, "max" : 100, "labels" : { "enabled" : false }, "tickInterval" : 25 },
                         "credits" : { "enabled" : false },
                         "tooltip" : { "pointFormat" : "{point.y:,.2f}%" },
                         "legend" : { "enabled" : false },
                         "series" : [{ "name" : "Current", "data" : serie[i] }]
                        });
  }
  categories = MFF.CHARACTERS.DATA[MFF.currentCharacter].uniforms[data.uniform].skills;
  id = "detail_charts_skill";
  div = MFF.layout.detail_charts.appendChild(document.createElement("div"));
  div.id = id;
  new Highcharts.Chart({
                        "chart" : { "polar" : true, "renderTo" : id, "type" : "line", "backgroundColor" : "#FFFFFF" },
                        "title" : { "text" : "Skills" },
                        "xAxis" : { "categories" : categories, "lineWidth" : 0 },
                        "yAxis" : { "gridLineInterpolation" : "polygon", "lineWidth" : 0, "min" : 0, "max" : 100, "labels" : { "enabled" : false }, "tickInterval" : 1 },
                        "credits" : { "enabled" : false },
                        "tooltip" : { "pointFormat" : "level {point.y}" },
                        "legend" : { "enabled" : false },
                        "series" : [{ "name" : "Skills", "data" : data.skills }]
                       });
  MFF.googleAnalytics("drawCharacterChart");
 }
};


/* global ga, API, Highcharts, MODAL, Button, ImageButton, GroupButton */
// localStorage.removeItem("characters");
// localStorage.removeItem("sorter");
var MFF =
{
 "version" : "2.3.0",
 "versionMFF" : "2.9.5",
 "localStorageKey" : "characters",
 "toid" : null,
 "currentCharacter" : null,
 "shownClassType" : ["combat", "speed", "blast", "universal"],
 "shownClassSide" : ["hero", "vilain", "neutral"],
 "shownClassGender" : ["male", "female", "neutral"],
 "shownClassTier" : ["tier1", "tier2"],
 "toggleClass" : function(reference)
 {
  return function(checked, type)
  {
   var idx,
       ref = { "type" : "shownClassType", "side" : "shownClassSide", "gender" : "shownClassGender", "tier" : "shownClassTier" }[reference];
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
      nb = 0,
      reduce = function(str) { return str.trim().toLowerCase().replace(/[^a-z]/g, ""); },
      query = reduce(document.getElementById("query").value),
      childs = document.getElementById("panelListContent").childNodes;
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
   if ( showHide == "show" && MFF.shownClassTier.indexOf("tier" + data.tier) == -1 ) { showHide = "hide"; }
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
   if ( showHide == "show" ) { nb++; }
  }
  API.EVT.dispatch("totalFiltered", { "nb" : nb, "total" : childs.length });
  if ( MFF.LAYOUT.CHARTS._panel.isShown() ) { API.EVT.dispatch("globalChart", "show"); }
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
  "name" :             { "disableChart" : true, "label" : "Name", "callback" : function(character) { return { "value" : MFF.CHARACTERS.DATA[character.id].uniforms[character.uniform].name, "percent" : false }; } },
  "completion" :       { "label" : "% global", "callback" : function(character) { var v = MFF.PERCENT.get(character.id); return { "value" : v, "percent" : true }; } },
  "percent_gears" :    { "label" : "% gears", "callback" : function(character) { var v = MFF.PERCENT.getGears(character.id); return { "value" : v, "percent" : true }; } },
  "percent_skills" :   { "label" : "% skills", "callback" : function(character) { var v = MFF.PERCENT.getSkills(character.id); return { "value" : v, "percent" : true }; } },
  "percent_uniform" :  { "label" : "% uniform", "callback" : function(character) { var v = MFF.PERCENT.getUniform(character.id); return { "value" : v, "percent" : true }; } },
  "attack" :           { "label" : "Attack", "callback" : function(character) { var v = character.attack[MFF.CHARACTERS.DATA[character.id].uniforms[character.uniform].attackBase]; return { "value" : v, "percent" : false }; } },
  "attack_energy" :    { "label" : "Energy attack", "callback" : function(character) { var v = character.attack.energy; return { "value" : v, "percent" : false }; } },
  "attack_physical" :  { "label" : "Physical attack", "callback" : function(character) { var v = character.attack.physical; return { "value" : v, "percent" : false }; } },
  "atkspeed" :         { "label" : "Attack speed", "max" : 130, "callback" : function(character) { var v = character.atkspeed; return { "value" : v, "percent" : true }; } },
  "combat_power" :     { "label" : "Combat power", "callback" : function(character) { var v = character.combatPower || 0; return { "value" : v, "percent" : false }; } },
  "critdamage" :       { "label" : "Critical damage", "max" : 200, "callback" : function(character) { var v = character.critdamage; return { "value" : v, "percent" : true }; } },
  "critrate" :         { "label" : "Critical rate", "max" : 75, "callback" : function(character) { var v = character.critrate; return { "value" : v, "percent" : true }; } },
  // TODO : need max debuff duration
  "debuff" :           { "label" : "Debuff duration", "callback" : function(character) { var v = character.debuff; return { "value" : v, "percent" : true }; } },
  "defense_average" :  { "label" : "Defense average", "callback" : function(character) { var v = (character.defense.physical + character.defense.energy) / 2; return { "value" : v, "percent" : false }; } },
  "defense_energy" :   { "label" : "Defense energy", "callback" : function(character) { var v = character.defense.energy; return { "value" : v, "percent" : false }; } },
  "defense_physical" : { "label" : "Defense physical", "callback" : function(character) { var v = character.defense.physical; return { "value" : v, "percent" : false }; } },
  "dodge" :            { "label" : "Dodge", "max" : 75, "callback" : function(character) { var v = character.dodge; return { "value" : v, "percent" : true }; } },
  "hp" :               { "label" : "Hit points", "callback" : function(character) { var v = character.hp; return { "value" : v, "percent" : false }; } },
  "defpen" :           { "label" : "Ignore defense", "max" : 50, "callback" : function(character) { var v = character.defpen; return { "value" : v, "percent" : true }; } },
  // TODO : check if max ignore dodge is really 75
  "ignore_dodge" :     { "label" : "Ignore dodge", "max" : 75, "callback" : function(character) { var v = character.ignore_dodge; return { "value" : v, "percent" : true }; } },
  "last_update" :      { "disableChart" : true, "label" : "Last update", "callback" : function(character) { return { "value" : character.lastUpdate || null, "percent" : false }; } },
  "level" :            { "label" : "Level", "callback" : function(character) { var v = character.level; return { "value" : v, "percent" : false }; } },
  "movspeed" :         { "label" : "Movement speed", "max" : 130, "callback" : function(character) { var v = character.movspeed; return { "value" : v, "percent" : true }; } },
  "rank" :             { "label" : "Rank", "callback" : function(character) { var v = character.rank || 0; return { "value" : v, "percent" : false }; } },
  "recorate" :         { "label" : "Recovery rate", "max" : 250, "callback" : function(character) { var v = character.recorate; return { "value" : v, "percent" : true }; } },
  "scd" :              { "label" : "Skill cooldown", "max" : 50, "callback" : function(character) { var v = character.scd; return { "value" : v, "percent" : true }; } },
  "defense_all" :      { "disableCharts" : true, "disableSort" : true, "label" : "All defenses" },
  "attack_all" :       { "disableCharts" : true, "disableSort" : true, "label" : "All attacks" }
 },
 "cbImportExport" : function()
 {
  MODAL.show({
              "title" : "Import / Export",
              "body" : "<textarea id=\"textareaImportExport\">",
              "buttons" : [
                           { "content" : "Import", "className" : "btnImport", "fa" : "download", "callback" : MFF.cbImport },
                           { "content" : "Export", "className" : "btnExport", "fa" : "upload", "callback" : MFF.cbExport }
                          ]
             });
  MFF.cbExport();
 },
 "cbImport" : function()
 {
  var parsed;
  try { parsed = JSON.parse(document.getElementById("textareaImportExport").value); }
  catch(ex) { alert("The JSON data is not well formed"); }
  if ( parsed )
  {
   localStorage.setItem(MFF.localStorageKey, JSON.stringify(parsed));
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
 "init" : function()
 {
  var data;
  // TODO : explain how to activate localStorage in main browsers
  if ( !window.localStorage ) { document.body.innerHTML = "<p>localStorage must be enabled in your browser</p>"; return; }
  data = localStorage.getItem(MFF.localStorageKey);
  if ( data && data != null && data != undefined && data != "null" && data != "undefined" && (typeof data == "string") )
  {
   try { data = JSON.parse(data); MFF.CHARACTERS.setAll(data); }
   catch(ex) { }
  }
  /* compatibility 2.1.0 start */
  data = localStorage.getItem("sorter");
  if ( data && data != null && data != undefined && data != "null" && data != "undefined" && (typeof data == "string") )
  {
   localStorage.removeItem("sorter");
   try
   {
    data = JSON.parse(data);
    if ( data && ("order" in data) ) { MFF.LAYOUT.LIST.setSortDirection(data.order); }
    if ( data && ("key" in data) )
    {
     if ( data.key == "sortByName" ) { MFF.LAYOUT.LIST.setSortAttribute("name"); }
     else if ( data.key == "sortByPercent" ) { MFF.LAYOUT.LIST.setSortAttribute("completion"); }
     else if ( data.key == "sortByLevel" ) { MFF.LAYOUT.LIST.setSortAttribute("level"); }
     else if ( data.key == "sortByAttack" ) { MFF.LAYOUT.LIST.setSortAttribute("attack"); }
    }
   }
   catch(ex) { }
  }
  /* compatibility 2.1.0 end */
  Highcharts.setOptions({ "plotOptions" : { "series" : { "animation" : false } } });
  MFF.LAYOUT.init();
  API.EVT.on("refreshPercentGlobal", function(character)
                                     {
                                      var div = document.getElementById("current_percent"),
                                          v = MFF.PERCENT.get(character, true);
                                      if ( div ) { div.innerHTML = v + "%"; }
                                     });
 },
 // "getIndividualPercent" : function(cur, min, max)
 // {
 //  return cur > 0 ? API.numberToFixed(((cur - min) / (max - min)) * 100, 2) : 0;
 // },
 // "computePercent" : function(character)
 // {
 //  return 0;
 //  /*
 //  var i, j,
 //      total = 0,
 //      maxi = 0,
 //      data = MFF.CHARACTERS.get(character);
 //  for ( i = 0; i < data.gear.length; i++ )
 //  {
 //   for ( j = 0; j < data.gear[i].length; j++ )
 //   {
 //    maxi += 100;
 //    if ( data.gear[i][j].pref ) { total += data.gear[i][j].percent; }
 //   }
 //  }
 //  return total * 100 / maxi;
 //  */
 // },
 "toid2" : null,
 "saveCharacter" : function(data)
 {
  MFF.CHARACTERS.setProperty(MFF.currentCharacter || MFF.lastTarget, data);
  localStorage.setItem(MFF.localStorageKey, JSON.stringify(MFF.CHARACTERS.getAll()));
  if ( data.mode == "tier" )
  {
   API.EVT.dispatch("updateTier");
   MFF.LAYOUT.LIST.setTier(MFF.currentCharacter);
  }
//   else if ( data.mode == "gear" || data.mode == "skill" )
//   {
//    MFF.toid2 = clearTimeout(MFF.toid2);
//    MFF.toid2 = setTimeout(function()
//                           {
//                            var div = document.getElementById("current_percent");
//                            if ( div && MFF.currentCharacter )
//                            {
// //                            div.innerHTML = API.numberToFixed(MFF.computePercent(MFF.currentCharacter), 2) + "%";
//                             div.innerHTML = MFF.PERCENT.get(MFF.currentCharacter, true) + "%";
//                             API.EVT.dispatch("updateTier");
//                             if ( MFF.LAYOUT.DETAIL.GEARS._btnDetailCharts.isActive() )
//                             {
//                              MFF.LAYOUT.CHARTS.renderDetail();
//                             }
//                             MFF.LAYOUT.LIST.setSub(MFF.currentCharacter);
//                             MFF.LAYOUT.LIST.synchroDetailGear(MFF.currentCharacter);
//                            }
//                           }, 250);
//   }
  else if ( data.mode == "uniform" )
  {
   MFF.LAYOUT.DETAIL.drawCharacter(MFF.currentCharacter, true, true);
   MFF.LAYOUT.LIST.drawCharacter(MFF.currentCharacter);
  }
  MFF.LAYOUT.LIST.setSub(MFF.currentCharacter);
 }
};


MFF.googleAnalytics = function() { };

var TrackingId = "";
if ( ("" + location).indexOf("localhost") == -1 )
{
 MFF.googleAnalytics = function(page)
 {
  ga("set", "page", "/" + page + ".html");
  ga("send", "pageview");
 };
 if ( ("" + location).indexOf("MFF-beta") != -1 ) { TrackingId = "UA-92278331-3"; }
 else if ( ("" + location).indexOf("MFF-previous") != -1 ) { TrackingId = "UA-92278331-4"; }
 else { TrackingId = "UA-92278331-1"; }
 (function(i,s,o,g,r,a,m)
  {
   i["GoogleAnalyticsObject"] = r;
   i[r] = i[r] || function() { (i[r].q = i[r].q || []).push(arguments); };
   i[r].l = 1 * new Date();
   a = s.createElement(o);
   m = s.getElementsByTagName(o)[0];
   a.async = 1;
   a.src = g;
   m.parentNode.insertBefore(a,m);
  }
 )(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
 ga("create", TrackingId, "auto");
 ga("send", "pageview");
}
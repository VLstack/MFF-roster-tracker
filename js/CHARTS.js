/* global MFF, Highcharts, Panel, API */
MFF.LAYOUT.CHARTS =
{
 "init" : function()
 {
  MFF.LAYOUT.CHARTS._panel = new Panel({ "id" : "panelGlobalChart", "hide" : true });
  API.EVT.on("globalChart", function(param) { MFF.LAYOUT.CHARTS[param == "show" ? "showGlobal" : "hideGlobal"](); });
  API.EVT.on("detailChart", function(param) { MFF.LAYOUT.CHARTS[param == "show" ? "showDetail" : "hideDetail"](); });
 },
 "hideGlobal" : function()
 {
  MFF.LAYOUT.CHARTS._panel.hide();
  MFF.googleAnalytics("hide-global-chart");
 },
 "showGlobal" : function()
 {
  var i, x, y, tmpX, tmpY, id, character, labelX, labelY,
      serie = [],
      xAxis = document.getElementById("XAxis").value,
      yAxis = document.getElementById("YAxis").value,
      childs = document.getElementById("panelListContent").childNodes;
  for ( i = 0; i < childs.length; i++ )
  {
   if ( childs[i].style.display !== "none" )
   {
    id = childs[i].id;
    character = MFF.CHARACTERS.get(id);
    tmpX = MFF.axisItems[xAxis].callback(character);
    tmpY = MFF.axisItems[yAxis].callback(character);
    x = tmpX.percent ? API.numberToFixed(tmpX.value, 2) : parseInt(tmpX.value, 10);
    y = tmpY.percent ? API.numberToFixed(tmpY.value, 2) : parseInt(tmpY.value, 10);
    labelX = MFF.axisItems[xAxis].label;
    labelY = MFF.axisItems[yAxis].label;
    if ( xAxis == "attack" )
    {
     labelX = MFF.CHARACTERS.isAttackBaseForUniformIsPhysical(id, character.uniform) ? "Physical attack" : "Energy attack";
    }
    if ( yAxis == "attack" )
    {
     labelY = MFF.CHARACTERS.isAttackBaseForUniformIsPhysical(id, character.uniform) ? "Physical attack" : "Energy attack";
    }
    serie.push({
                "characterId" : id,
                "name" : MFF.CHARACTERS.getNameForUniform(id, character.uniform),
                "x" : x, "labelX" : labelX,
                "y" : y, "labelY" : labelY,
                "marker" : { "width" : 32, "height" : 32, "symbol" : "url(images/characters/{0}/{1}.png)".format(character.uniform, id) }
               });
   }
  }

  if ( !serie.length ) { tmpX = tmpY = function() { return ""; } ; }

  MFF.LAYOUT.CHARTS._panel.show();
  MFF.LAYOUT.CHARTS._panel.flush();
  new Highcharts.Chart({
                        "chart" : { "renderTo" : MFF.LAYOUT.CHARTS._panel.getNode(), "type" : "scatter", "zoomType" : "xy", "backgroundColor" : "#efefef" },
                        "credits" : { "enabled" : false },
                        "title" : { "text" : "{0} / {1}".format(MFF.axisItems[xAxis].label, MFF.axisItems[yAxis].label) },
                        "xAxis" :
                        {
                         "title" : { "enabled" : true, "text" : MFF.axisItems[xAxis].label },
                         "startOnTick" : true,
                         "endOnTick" : true,
                         "showLastLabel" : true
                        },
                        "yAxis" :
                        {
                         "title" : { "enabled" : true, "text" : MFF.axisItems[yAxis].label },
                         "startOnTick" : true,
                         "alternateGridColor" : "rgba(43, 65, 255, 0.03)"
                        },
                        "legend" : { "enabled" : false },
                        "plotOptions" :
                        {
                         "series" :
                         {
                          "cursor" : "pointer",
                          "events" :
                          {
                           "click" : function(evt)
                           {
                            MFF.LAYOUT.CHARTS.hideGlobal();
                            MFF.LAYOUT.DETAIL.drawCharacter(evt.point.characterId, true, null, true);
                           }
                          }
                         },
                         "scatter" :
                         {
                          "tooltip" :
                          {
                           "headerFormat" : "",
                           "footerFormat" : "",
                           "pointFormat" : "<p style=\"font:12px/16px verdana\"><b>{point.name}</b><br>{point.labelX} = {point.x}{0}<br>{point.labelY} = {point.y}{1}</p>".format(tmpX.percent ? "%" : "", tmpY.percent ? "%" : "")
                          }
                         }
                        },
                        "series" : [{ "data" : serie }]
                       });
  MFF.googleAnalytics("show-global-chart");
  MFF.googleAnalytics("set-global-chart-xaxis-" + xAxis);
  MFF.googleAnalytics("set-global-chart-yaxis-" + yAxis);
 },
 "renderDetail" : function()
 {
  var i, j, k, val, nb, div, id, color,
      data = MFF.CHARACTERS.get(MFF.currentCharacter || MFF.lastTarget),
      categories = [],
      serie = [],
      container = MFF.LAYOUT.DETAIL.GEARS._content.getNode();
  MFF.LAYOUT.DETAIL.GEARS._content.flush();
  for ( i = 0; i < MFF.GEARS.length; i++ )
  {
   id = "detail_charts_gear{0}".format(i + 1);
   div = container.appendChild(document.createElement("div"));
   div.id = id;
   div.className = "chart bgOpaque";
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
     if ( val == 100 ) { color = "#00FF00"; }
     else if ( val > 50 ) { color = "#CCFFCC"; }
     else if ( val == 50 ) { color = "#99CCFF"; }
     else { color = "#FFCCCC"; }
     serie[i].push({ "y" : val, "color" : color });
    }
   }
   new Highcharts.Chart({
                         "chart" : { "polar" : true, "renderTo" : id, "type" : "bar", "backgroundColor" : null },
                         "pane" : { "background" : { "backgroundColor" : "rgba(255, 255, 255, 0.5)", "outerRadius" : "100%" } },
                         "title" : { "useHTML" : true, "text" : "Gear {0}".format(i + 1) },
                         "xAxis" : { "categories" : categories[i], "lineWidth" : 0, "labels" : { "style" : { "color" : "#FFFFFF" } } },
                         "yAxis" : { "gridLineInterpolation" : "circle", "lineWidth" : 0, "min" : 0, "max" : 100, "labels" : { "enabled" : false }, "tickInterval" : 25 },
                         "credits" : { "enabled" : false },
                         "tooltip" : { "pointFormat" : "{point.y:,.2f}%" },
                         "legend" : { "enabled" : false },
                         "series" : [{ "name" : "Current", "data" : serie[i] }]
                        });
  }
  categories = MFF.CHARACTERS.DATA[MFF.currentCharacter || MFF.lastTarget].uniforms[data.uniform].skills;
  id = "detail_charts_skill";
  div = container.appendChild(document.createElement("div"));
  div.id = id;
  div.className = "chart bgOpaque";
  new Highcharts.Chart({
                        "chart" : { "polar" : true, "renderTo" : id, "type" : "line", "backgroundColor" : null },
                        "pane" : { "background" : { "backgroundColor" : "rgba(255, 255, 255, 0.5)", "outerRadius" : "100%" } },
                        "title" : { "useHTML" : true, "text" : "Skills" },
                        "xAxis" : { "categories" : categories, "lineWidth" : 0, "labels" : { "style" : { "color" : "#FFFFFF" } } },
                        "yAxis" : { "gridLineInterpolation" : "polygon", "lineWidth" : 0, "min" : 0, "max" : 6, "labels" : { "enabled" : false }, "tickInterval" : 1 },
                        "credits" : { "enabled" : false },
                        "tooltip" : { "pointFormat" : "level {point.y}" },
                        "legend" : { "enabled" : false },
                        "series" : [{ "name" : "Skills", "data" : data.skills }]
                       });
  MFF.LAYOUT.CHARTS.fixHighchartsTitles();
  MFF.googleAnalytics("show-character-chart");
 },
 "fixHighchartsTitles" : function()
 {
  var i,
      all = document.querySelectorAll("span.highcharts-title");
  for ( i = 0; i < all.length; i++ )
  {
   all[i].style.top = 0;
   all[i].style.left = 0;
   all[i].style.right = 0;
   all[i].style.padding = "3px 0";
   all[i].style.color = "#333";
   all[i].style.backgroundColor = "#FFF";
   all[i].style.textAlign = "center";
   all[i].style.borderTopLeftRadius = "4px";
   all[i].style.borderTopRightRadius = "4px";
   all[i].style.font = "14px/18px verdana";
  }
 }
};